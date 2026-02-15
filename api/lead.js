// ═══════════════════════════════════════════════════════
// SOLW3 Lead API
// POST /api/lead — Recebe dados do chat, gera proposta e envia emails
// ═══════════════════════════════════════════════════════

import { calcularPrecificacao } from "./_lib/pricing.js";
import { gerarPropostaHTML, gerarResumoLead } from "./_lib/proposal.js";
import { enviarPropostaCliente, notificarEquipe } from "./_lib/email.js";
import { gerarPrototipoHTML } from "./_lib/preview-gen.js";
import { salvarPrototipo, construirPreviewURL } from "./_lib/store.js";

// CORS configuration
var ALLOWED_ORIGINS = [
  "https://sw3.tec.br",
  "https://www.sw3.tec.br",
  "http://localhost:5173",
  "http://localhost:3000"
];

function setCORSHeaders(res, origin) {
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function validarPayload(dados) {
  var erros = [];

  if (!dados.cliente || !dados.cliente.email) {
    erros.push("Email do cliente é obrigatório");
  }

  if (!dados.projeto || !dados.projeto.modalidade) {
    erros.push("Modalidade do projeto é obrigatória");
  }

  if (!dados.projeto || !dados.projeto.descricao) {
    erros.push("Descrição do projeto é obrigatória");
  }

  if (!dados.projeto || !dados.projeto.requisitos || dados.projeto.requisitos.length === 0) {
    erros.push("Requisitos do projeto são obrigatórios");
  }

  if (!dados.projeto || typeof dados.projeto.modulos !== "number") {
    erros.push("Número de módulos é obrigatório");
  }

  return erros;
}

function logarLead(dados, pricing, resultado) {
  var timestamp = new Date().toISOString();
  var log = {
    timestamp: timestamp,
    cliente: dados.cliente,
    projeto: {
      modalidade: dados.projeto.modalidade,
      modalidade_nome: pricing.modalidade_nome,
      descricao: dados.projeto.descricao,
      modulos: dados.projeto.modulos
    },
    pricing: {
      preco_total: pricing.preco_total,
      timeline_semanas: pricing.timeline_semanas
    },
    email_cliente: resultado.emailCliente,
    email_equipe: resultado.emailEquipe
  };

  console.log("[LEAD]", JSON.stringify(log));
  return log;
}

async function gerarPrototipoBackground(leadId, dados) {
  console.log("[PREVIEW BACKGROUND] Iniciando geração para:", leadId);

  try {
    var resultado = await gerarPrototipoHTML(dados);

    if (!resultado.success) {
      console.error("[PREVIEW BACKGROUND] Falha na geração:", resultado.error);
      return;
    }

    var metadata = {
      id: leadId,
      cliente: dados.cliente.nome,
      projeto: dados.projeto.descricao,
      gerado_em: new Date().toISOString(),
      tokens_used: resultado.tokens_used
    };

    var salvamento = await salvarPrototipo(leadId, resultado.html, metadata);

    if (salvamento.success) {
      console.log("[PREVIEW BACKGROUND] Protótipo salvo com sucesso:", salvamento.url);
    } else {
      console.error("[PREVIEW BACKGROUND] Falha ao salvar:", salvamento.error);
    }
  } catch (erro) {
    console.error("[PREVIEW BACKGROUND ERROR]", erro);
  }
}

export default async function handler(req, res) {
  var origin = req.headers.origin;
  setCORSHeaders(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    var dados = req.body;

    // 1. Validar payload
    var erros = validarPayload(dados);
    if (erros.length > 0) {
      return res.status(400).json({
        error: "Dados inválidos",
        detalhes: erros
      });
    }

    // 2. Calcular pricing
    var pricing = calcularPrecificacao(
      dados.projeto.modalidade,
      dados.projeto.modulos
    );

    // 3. Gerar ID único para o lead
    var leadId = "lead_" + Date.now();

    // 4. Construir URL do preview (mesmo antes de gerar)
    var previewUrl = await construirPreviewURL(leadId);

    // 5. Disparar geração do protótipo em background (não espera)
    gerarPrototipoBackground(leadId, dados).catch(function(erro) {
      console.error("[PREVIEW BACKGROUND ERROR]", erro);
    });

    // 6. Gerar proposta HTML (com preview URL)
    var htmlProposta = gerarPropostaHTML(dados, pricing, previewUrl);
    var htmlResumoEquipe = gerarResumoLead(dados, pricing, previewUrl);

    // 7. Enviar email para cliente
    var resultadoCliente = await enviarPropostaCliente(
      dados.cliente.email,
      dados.cliente.nome || "Cliente",
      dados.projeto.descricao,
      htmlProposta
    );

    // 8. Notificar equipe
    var resultadoEquipe = await notificarEquipe(dados, htmlResumoEquipe);

    // 9. Logar lead (mesmo se emails falharem)
    var log = logarLead(dados, pricing, {
      emailCliente: resultadoCliente,
      emailEquipe: resultadoEquipe
    });

    // 10. Retornar resposta
    var sucesso = resultadoCliente.success || resultadoEquipe.success;

    if (!sucesso) {
      return res.status(500).json({
        error: "Erro ao enviar emails",
        detalhes: {
          cliente: resultadoCliente.error,
          equipe: resultadoEquipe.error
        },
        lead_id: leadId,
        preview_url: previewUrl
      });
    }

    return res.status(200).json({
      success: true,
      message: "Proposta enviada com sucesso",
      pricing: pricing,
      emails: {
        cliente: resultadoCliente.success,
        equipe: resultadoEquipe.success
      },
      lead_id: leadId,
      preview_url: previewUrl
    });

  } catch (erro) {
    console.error("[LEAD ERROR]", erro);
    return res.status(500).json({
      error: "Erro interno do servidor",
      message: erro.message
    });
  }
}

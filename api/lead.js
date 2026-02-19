// ═══════════════════════════════════════════════════════
// SOLW3 Lead API
// POST /api/lead — Recebe dados do chat, gera proposta e envia emails
// ═══════════════════════════════════════════════════════

import { calcularPrecificacao } from "./_lib/pricing.js";
import { gerarPropostaHTML, gerarResumoLead } from "./_lib/proposal.js";
import { enviarPropostaCliente, notificarEquipe } from "./_lib/email.js";
import { checkRateLimit } from "./_lib/rate-limit.js";
import { trackMetric } from "./_lib/metrics.js";

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

export default async function handler(req, res) {
  var origin = req.headers.origin;
  setCORSHeaders(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting: 3 leads por IP por hora
  var rateCheck = checkRateLimit(req, "lead", 3, 3600);
  if (!rateCheck.allowed) {
    trackMetric("rate_limited", { ip: rateCheck.ip, endpoint: "lead" });
    return res.status(429).json({
      error: "Limite de requisicoes excedido. Tente novamente em breve.",
      retry_after: rateCheck.retryAfter
    });
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

    // 4. Salvar dados do lead para preview on-demand (opcional - não quebra se falhar)
    var previewUrl = null;
    try {
      var storeModule = await import("./_lib/store.js");

      // Salvar dados do lead no Blob (rápido, <1s)
      await storeModule.salvarDadosLead(leadId, dados);

      // Construir URL do preview (geração on-demand no GET)
      previewUrl = await storeModule.construirPreviewURL(leadId);

      console.log("[LEAD] Dados do lead salvos. Preview URL:", previewUrl);
    } catch (erroPreview) {
      console.log("[LEAD] Preview desabilitado ou falhou:", erroPreview.message);
      previewUrl = null;
    }

    // 5. Gerar proposta HTML (com ou sem preview URL)
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

    // Tracking de metricas
    trackMetric("lead_created", {
      modalidade: dados.projeto.modalidade,
      emails: [resultadoCliente, resultadoEquipe]
    });

    // 10. Retornar resposta
    var sucesso = resultadoCliente.success || resultadoEquipe.success;

    if (!sucesso) {
      var errorResponse = {
        error: "Erro ao enviar emails",
        detalhes: {
          cliente: resultadoCliente.error,
          equipe: resultadoEquipe.error
        },
        lead_id: leadId
      };
      if (previewUrl) errorResponse.preview_url = previewUrl;
      return res.status(500).json(errorResponse);
    }

    var successResponse = {
      success: true,
      message: "Proposta enviada com sucesso",
      pricing: pricing,
      emails: {
        cliente: resultadoCliente.success,
        equipe: resultadoEquipe.success
      },
      lead_id: leadId
    };
    if (previewUrl) successResponse.preview_url = previewUrl;

    return res.status(200).json(successResponse);

  } catch (erro) {
    console.error("[LEAD ERROR]", erro);
    return res.status(500).json({
      error: "Erro interno do servidor",
      message: erro.message
    });
  }
}

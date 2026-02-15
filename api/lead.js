// ═══════════════════════════════════════════════════════
// SOLW3 Lead API
// POST /api/lead — Recebe dados do chat, gera proposta e envia emails
// ═══════════════════════════════════════════════════════

import { calcularPrecificacao } from "./_lib/pricing.js";
import { gerarPropostaHTML, gerarResumoLead } from "./_lib/proposal.js";
import { enviarPropostaCliente, notificarEquipe } from "./_lib/email.js";

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

    // 3. Gerar proposta HTML
    var htmlProposta = gerarPropostaHTML(dados, pricing);
    var htmlResumoEquipe = gerarResumoLead(dados, pricing);

    // 4. Enviar email para cliente
    var resultadoCliente = await enviarPropostaCliente(
      dados.cliente.email,
      dados.cliente.nome || "Cliente",
      dados.projeto.descricao,
      htmlProposta
    );

    // 5. Notificar equipe
    var resultadoEquipe = await notificarEquipe(dados, htmlResumoEquipe);

    // 6. Logar lead (mesmo se emails falharem)
    var log = logarLead(dados, pricing, {
      emailCliente: resultadoCliente,
      emailEquipe: resultadoEquipe
    });

    // 7. Retornar resposta
    var sucesso = resultadoCliente.success || resultadoEquipe.success;

    if (!sucesso) {
      return res.status(500).json({
        error: "Erro ao enviar emails",
        detalhes: {
          cliente: resultadoCliente.error,
          equipe: resultadoEquipe.error
        },
        lead_id: log.timestamp
      });
    }

    return res.status(200).json({
      success: true,
      message: "Proposta enviada com sucesso",
      pricing: {
        preco_total: pricing.preco_total,
        timeline_semanas: pricing.timeline_semanas,
        modalidade: pricing.modalidade_nome
      },
      emails: {
        cliente: resultadoCliente.success,
        equipe: resultadoEquipe.success
      },
      lead_id: log.timestamp
    });

  } catch (erro) {
    console.error("[LEAD ERROR]", erro);
    return res.status(500).json({
      error: "Erro interno do servidor",
      message: erro.message
    });
  }
}

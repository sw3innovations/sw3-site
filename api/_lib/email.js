// ═══════════════════════════════════════════════════════
// SOLW3 Email Service
// Envia emails via Resend
// ═══════════════════════════════════════════════════════

import { Resend } from "resend";

var resend = null;

function getResendClient() {
  if (!resend) {
    var apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY não configurada");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function enviarPropostaCliente(emailCliente, nomeCliente, projetoDescricao, htmlProposta) {
  var client = getResendClient();

  var assunto = "Sua proposta SOLW3 — " + projetoDescricao.substring(0, 50);
  if (projetoDescricao.length > 50) {
    assunto = assunto + "...";
  }

  try {
    var resultado = await client.emails.send({
      from: "SOLW3 <solw3@sw3.tec.br>",
      to: [emailCliente],
      subject: assunto,
      html: htmlProposta
    });

    return {
      success: true,
      messageId: resultado.id,
      destinatario: emailCliente
    };
  } catch (erro) {
    console.error("Erro ao enviar proposta para cliente:", erro);
    return {
      success: false,
      error: erro.message
    };
  }
}

export async function notificarEquipe(dadosLead, htmlResumo) {
  var client = getResendClient();

  var emailEquipe = process.env.NOTIFICATION_EMAIL || "admin@sw3.tec.br";
  var assunto = "🔔 Novo lead SOLW3 — " + dadosLead.projeto.modalidade;

  try {
    var resultado = await client.emails.send({
      from: "SOLW3 Sistema <solw3@sw3.tec.br>",
      to: [emailEquipe],
      subject: assunto,
      html: htmlResumo,
      replyTo: dadosLead.cliente.email
    });

    return {
      success: true,
      messageId: resultado.id,
      destinatario: emailEquipe
    };
  } catch (erro) {
    console.error("Erro ao notificar equipe:", erro);
    return {
      success: false,
      error: erro.message
    };
  }
}

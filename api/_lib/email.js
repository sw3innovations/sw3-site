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

  console.log("[EMAIL] Enviando proposta para:", emailCliente);
  console.log("[EMAIL] RESEND_API_KEY existe:", !!process.env.RESEND_API_KEY);

  try {
    var { data, error } = await client.emails.send({
      from: "SOLW3 <solw3@sw3.tec.br>",
      to: [emailCliente],
      subject: assunto,
      html: htmlProposta
    });

    console.log("[EMAIL] Resposta Resend data:", JSON.stringify(data));
    console.log("[EMAIL] Resposta Resend error:", JSON.stringify(error));

    if (error) {
      console.error("[EMAIL] Erro do Resend:", error);
      return {
        success: false,
        error: error.message || JSON.stringify(error)
      };
    }

    console.log("[EMAIL] Email enviado com sucesso. ID:", data.id);

    return {
      success: true,
      messageId: data.id,
      destinatario: emailCliente
    };
  } catch (erro) {
    console.error("[EMAIL] Exceção ao enviar proposta:", erro);
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

  console.log("[EMAIL] Notificando equipe:", emailEquipe);
  console.log("[EMAIL] RESEND_API_KEY existe:", !!process.env.RESEND_API_KEY);

  try {
    var { data, error } = await client.emails.send({
      from: "SOLW3 Sistema <solw3@sw3.tec.br>",
      to: [emailEquipe],
      subject: assunto,
      html: htmlResumo,
      replyTo: dadosLead.cliente.email
    });

    console.log("[EMAIL] Resposta Resend data:", JSON.stringify(data));
    console.log("[EMAIL] Resposta Resend error:", JSON.stringify(error));

    if (error) {
      console.error("[EMAIL] Erro do Resend:", error);
      return {
        success: false,
        error: error.message || JSON.stringify(error)
      };
    }

    console.log("[EMAIL] Notificação enviada com sucesso. ID:", data.id);

    return {
      success: true,
      messageId: data.id,
      destinatario: emailEquipe
    };
  } catch (erro) {
    console.error("[EMAIL] Exceção ao notificar equipe:", erro);
    return {
      success: false,
      error: erro.message
    };
  }
}

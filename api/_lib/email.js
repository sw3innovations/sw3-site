// ═══════════════════════════════════════════════════════
// SOLW3 Email Service
// Primary: Resend | Fallback: SMTP (Nodemailer)
// ═══════════════════════════════════════════════════════

import { Resend } from "resend";
import { enviarEmailViaSMTP } from "./email-fallback.js";

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
  var assunto = "Sua proposta SOLW3 — " + projetoDescricao.substring(0, 50);
  if (projetoDescricao.length > 50) {
    assunto = assunto + "...";
  }

  console.log("[EMAIL] Enviando proposta para:", emailCliente);
  console.log("[EMAIL] Tentando enviar via Resend...");

  try {
    var client = getResendClient();

    var { data, error } = await client.emails.send({
      from: "SOLW3 <solw3@sw3.tec.br>",
      to: [emailCliente],
      subject: assunto,
      html: htmlProposta
    });

    if (error) {
      console.error("[EMAIL] Resend falhou:", error.message || JSON.stringify(error));
      console.log("[EMAIL] Tentando SMTP fallback...");

      var resultadoSMTP = await enviarEmailViaSMTP(emailCliente, assunto, htmlProposta);

      if (resultadoSMTP.success) {
        console.log("[EMAIL-FALLBACK] SMTP OK — enviado para", emailCliente);
        return resultadoSMTP;
      } else {
        console.error("[EMAIL-FALLBACK] SMTP falhou:", resultadoSMTP.error);
        console.error("[EMAIL] TODOS OS PROVIDERS FALHARAM");
        return {
          success: false,
          error: "Resend: " + (error.message || JSON.stringify(error)) + " | SMTP: " + resultadoSMTP.error
        };
      }
    }

    console.log("[EMAIL] Resend OK — ID:", data.id);

    return {
      success: true,
      messageId: data.id,
      provider: "resend",
      destinatario: emailCliente
    };
  } catch (erro) {
    console.error("[EMAIL] Resend falhou:", erro.message);
    console.log("[EMAIL] Tentando SMTP fallback...");

    try {
      var resultadoSMTP = await enviarEmailViaSMTP(emailCliente, assunto, htmlProposta);

      if (resultadoSMTP.success) {
        console.log("[EMAIL-FALLBACK] SMTP OK — enviado para", emailCliente);
        return resultadoSMTP;
      } else {
        console.error("[EMAIL-FALLBACK] SMTP falhou:", resultadoSMTP.error);
        console.error("[EMAIL] TODOS OS PROVIDERS FALHARAM");
        return {
          success: false,
          error: "Resend: " + erro.message + " | SMTP: " + resultadoSMTP.error
        };
      }
    } catch (erroFallback) {
      console.error("[EMAIL-FALLBACK] SMTP falhou:", erroFallback.message);
      console.error("[EMAIL] TODOS OS PROVIDERS FALHARAM");
      return {
        success: false,
        error: "Resend: " + erro.message + " | SMTP: " + erroFallback.message
      };
    }
  }
}

export async function notificarEquipe(dadosLead, htmlResumo) {
  var emailEquipe = process.env.NOTIFICATION_EMAIL || "admin@sw3.tec.br";
  var assunto = "🔔 Novo lead SOLW3 — " + dadosLead.projeto.modalidade;

  console.log("[EMAIL] Notificando equipe:", emailEquipe);
  console.log("[EMAIL] Tentando enviar via Resend...");

  try {
    var client = getResendClient();

    var { data, error } = await client.emails.send({
      from: "SOLW3 Sistema <solw3@sw3.tec.br>",
      to: [emailEquipe],
      subject: assunto,
      html: htmlResumo,
      replyTo: dadosLead.cliente.email
    });

    if (error) {
      console.error("[EMAIL] Resend falhou:", error.message || JSON.stringify(error));
      console.log("[EMAIL] Tentando SMTP fallback...");

      var resultadoSMTP = await enviarEmailViaSMTP(emailEquipe, assunto, htmlResumo, dadosLead.cliente.email);

      if (resultadoSMTP.success) {
        console.log("[EMAIL-FALLBACK] SMTP OK — enviado para", emailEquipe);
        return resultadoSMTP;
      } else {
        console.error("[EMAIL-FALLBACK] SMTP falhou:", resultadoSMTP.error);
        console.error("[EMAIL] TODOS OS PROVIDERS FALHARAM");
        return {
          success: false,
          error: "Resend: " + (error.message || JSON.stringify(error)) + " | SMTP: " + resultadoSMTP.error
        };
      }
    }

    console.log("[EMAIL] Resend OK — ID:", data.id);

    return {
      success: true,
      messageId: data.id,
      provider: "resend",
      destinatario: emailEquipe
    };
  } catch (erro) {
    console.error("[EMAIL] Resend falhou:", erro.message);
    console.log("[EMAIL] Tentando SMTP fallback...");

    try {
      var resultadoSMTP = await enviarEmailViaSMTP(emailEquipe, assunto, htmlResumo, dadosLead.cliente.email);

      if (resultadoSMTP.success) {
        console.log("[EMAIL-FALLBACK] SMTP OK — enviado para", emailEquipe);
        return resultadoSMTP;
      } else {
        console.error("[EMAIL-FALLBACK] SMTP falhou:", resultadoSMTP.error);
        console.error("[EMAIL] TODOS OS PROVIDERS FALHARAM");
        return {
          success: false,
          error: "Resend: " + erro.message + " | SMTP: " + resultadoSMTP.error
        };
      }
    } catch (erroFallback) {
      console.error("[EMAIL-FALLBACK] SMTP falhou:", erroFallback.message);
      console.error("[EMAIL] TODOS OS PROVIDERS FALHARAM");
      return {
        success: false,
        error: "Resend: " + erro.message + " | SMTP: " + erroFallback.message
      };
    }
  }
}

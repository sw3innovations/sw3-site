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

  // TEMPORÁRIO: Usar SMTP direto (Resend com domínio não verificado)
  var usarSMTP = process.env.FORCE_SMTP === "true" || !process.env.RESEND_API_KEY;

  if (usarSMTP) {
    console.log("[EMAIL] FORCE_SMTP ativo - usando SMTP diretamente");
    return await enviarEmailViaSMTP(emailCliente, assunto, htmlProposta);
  }

  console.log("[EMAIL] RESEND_API_KEY existe:", !!process.env.RESEND_API_KEY);

  var client = getResendClient();

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
      console.log("[EMAIL] Tentando fallback via SMTP...");

      // FALLBACK: Tentar enviar via SMTP
      return await enviarEmailViaSMTP(emailCliente, assunto, htmlProposta);
    }

    console.log("[EMAIL] Email enviado com sucesso via Resend. ID:", data.id);

    return {
      success: true,
      messageId: data.id,
      provider: "resend",
      destinatario: emailCliente
    };
  } catch (erro) {
    console.error("[EMAIL] Exceção ao enviar proposta via Resend:", erro);
    console.log("[EMAIL] Tentando fallback via SMTP...");

    // FALLBACK: Tentar enviar via SMTP
    try {
      return await enviarEmailViaSMTP(emailCliente, assunto, htmlProposta);
    } catch (erroFallback) {
      console.error("[EMAIL] Fallback SMTP também falhou:", erroFallback);
      return {
        success: false,
        error: "Resend e SMTP falharam: " + erro.message + " | " + erroFallback.message
      };
    }
  }
}

export async function notificarEquipe(dadosLead, htmlResumo) {
  var emailEquipe = process.env.NOTIFICATION_EMAIL || "admin@sw3.tec.br";
  var assunto = "🔔 Novo lead SOLW3 — " + dadosLead.projeto.modalidade;

  console.log("[EMAIL] Notificando equipe:", emailEquipe);

  // TEMPORÁRIO: Usar SMTP direto (Resend com domínio não verificado)
  var usarSMTP = process.env.FORCE_SMTP === "true" || !process.env.RESEND_API_KEY;

  if (usarSMTP) {
    console.log("[EMAIL] FORCE_SMTP ativo - usando SMTP diretamente");
    return await enviarEmailViaSMTP(emailEquipe, assunto, htmlResumo, dadosLead.cliente.email);
  }

  console.log("[EMAIL] RESEND_API_KEY existe:", !!process.env.RESEND_API_KEY);

  var client = getResendClient();

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
      console.log("[EMAIL] Tentando fallback via SMTP...");

      // FALLBACK: Tentar enviar via SMTP
      return await enviarEmailViaSMTP(emailEquipe, assunto, htmlResumo, dadosLead.cliente.email);
    }

    console.log("[EMAIL] Notificação enviada com sucesso via Resend. ID:", data.id);

    return {
      success: true,
      messageId: data.id,
      provider: "resend",
      destinatario: emailEquipe
    };
  } catch (erro) {
    console.error("[EMAIL] Exceção ao notificar equipe via Resend:", erro);
    console.log("[EMAIL] Tentando fallback via SMTP...");

    // FALLBACK: Tentar enviar via SMTP
    try {
      return await enviarEmailViaSMTP(emailEquipe, assunto, htmlResumo, dadosLead.cliente.email);
    } catch (erroFallback) {
      console.error("[EMAIL] Fallback SMTP também falhou:", erroFallback);
      return {
        success: false,
        error: "Resend e SMTP falharam: " + erro.message + " | " + erroFallback.message
      };
    }
  }
}

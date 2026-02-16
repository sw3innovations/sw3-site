// ═══════════════════════════════════════════════════════
// SOLW3 Email Fallback Service
// Nodemailer + Gmail SMTP (backup quando Resend falha)
// ═══════════════════════════════════════════════════════

import nodemailer from "nodemailer";

var transporter = null;

function getTransporter() {
  if (!transporter) {
    var smtpUser = process.env.SMTP_USER || process.env.SMTP_FROM;
    var smtpPass = process.env.SMTP_PASSWORD;

    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP_USER e SMTP_PASSWORD não configurados");
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    console.log("[EMAIL-FALLBACK] Transporter SMTP configurado:", smtpUser);
  }

  return transporter;
}

export async function enviarEmailViaSMTP(to, subject, html, replyTo) {
  var smtp = getTransporter();

  var fromName = "SOLW3";
  var fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

  console.log("[EMAIL-FALLBACK] Enviando via SMTP para:", to);
  console.log("[EMAIL-FALLBACK] From:", fromEmail);

  try {
    var info = await smtp.sendMail({
      from: fromName + " <" + fromEmail + ">",
      to: to,
      subject: subject,
      html: html,
      replyTo: replyTo || fromEmail
    });

    console.log("[EMAIL-FALLBACK] Email enviado com sucesso via SMTP");
    console.log("[EMAIL-FALLBACK] Message ID:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
      provider: "smtp",
      destinatario: to
    };

  } catch (erro) {
    console.error("[EMAIL-FALLBACK] Erro ao enviar via SMTP:", erro);
    return {
      success: false,
      error: erro.message,
      provider: "smtp"
    };
  }
}

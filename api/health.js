// ═══════════════════════════════════════════════════════
// SOLW3 Health Check
// GET /api/health — Status do sistema
// ═══════════════════════════════════════════════════════

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  var status = {
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "SOLW3 Backend",
    version: "1.0.0",
    endpoints: {
      "/api/lead": "POST - Recebe lead do chat",
      "/api/chat": "POST - Proxy Anthropic API",
      "/api/health": "GET - Health check"
    },
    environment: {
      resend_configured: !!process.env.RESEND_API_KEY,
      anthropic_configured: !!process.env.ANTHROPIC_API_KEY,
      notification_email: process.env.NOTIFICATION_EMAIL || "admin@sw3.tec.br"
    }
  };

  return res.status(200).json(status);
}

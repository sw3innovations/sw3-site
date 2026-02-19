// ═══════════════════════════════════════════════════════
// SOLW3 Stats API
// GET /api/stats?key=STATS_API_KEY
// GET /api/stats?key=STATS_API_KEY&date=2026-02-18
// GET /api/stats?key=STATS_API_KEY&range=7
// ═══════════════════════════════════════════════════════

import { getMetrics } from "./_lib/metrics.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Autenticacao por API key
  var statsKey = process.env.STATS_API_KEY;
  var requestKey = req.query.key;

  if (!statsKey) {
    return res.status(500).json({ error: "STATS_API_KEY nao configurada" });
  }

  if (requestKey !== statsKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    var range = req.query.range ? parseInt(req.query.range, 10) : 0;
    var date = req.query.date;

    // Retornar ultimos N dias
    if (range && range > 0) {
      var results = [];
      for (var i = range - 1; i >= 0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var dateStr = d.toISOString().slice(0, 10);
        var dayMetrics = await getMetrics(dateStr);
        results.push(dayMetrics);
      }

      // Totais agregados do periodo
      var totals = {
        chat_messages: 0,
        leads: 0,
        previews_generated: 0,
        previews_cached: 0,
        rate_limited: 0,
        estimated_cost_usd: 0
      };

      for (var j = 0; j < results.length; j++) {
        var day = results[j];
        totals.chat_messages += day.chat.total_messages;
        totals.leads += day.leads.total;
        totals.previews_generated += day.previews.generated;
        totals.previews_cached += day.previews.served_from_cache;
        totals.rate_limited += day.rate_limits.blocked_requests;
        totals.estimated_cost_usd = Math.round(
          (totals.estimated_cost_usd + day.chat.estimated_cost_usd + day.previews.estimated_cost_usd) * 10000
        ) / 10000;
      }

      return res.status(200).json({ range: range, totals: totals, days: results });
    }

    // Retornar dia especifico ou hoje
    var targetDate = date || new Date().toISOString().slice(0, 10);
    var metrics = await getMetrics(targetDate);
    return res.status(200).json(metrics);

  } catch (e) {
    console.error("[STATS] Erro:", e);
    return res.status(500).json({ error: "Internal server error", message: e.message });
  }
}

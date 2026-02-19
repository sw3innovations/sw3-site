// ═══════════════════════════════════════════════════════
// SOLW3 Metrics
// Tracking de metricas diarias salvas no Vercel Blob
// ═══════════════════════════════════════════════════════

import { put, head } from "@vercel/blob";

var METRICS_PREFIX = "metrics/";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function emptyMetrics(date) {
  return {
    date: date,
    chat: {
      total_messages: 0,
      unique_ips: [],
      estimated_tokens: 0,
      estimated_cost_usd: 0
    },
    leads: {
      total: 0,
      by_modalidade: {},
      emails_sent: 0,
      emails_failed: 0,
      provider_resend: 0,
      provider_smtp: 0
    },
    previews: {
      generated: 0,
      served_from_cache: 0,
      tokens_used: 0,
      estimated_cost_usd: 0
    },
    rate_limits: {
      blocked_requests: 0
    }
  };
}

async function loadMetrics(date) {
  try {
    var path = METRICS_PREFIX + date + ".json";
    var info = await head(path);
    if (!info || !info.url) return emptyMetrics(date);

    var response = await fetch(info.url);
    if (!response.ok) return emptyMetrics(date);

    var data = await response.json();

    var empty = emptyMetrics(date);
    if (!data.chat) data.chat = empty.chat;
    if (!Array.isArray(data.chat.unique_ips)) data.chat.unique_ips = [];
    if (!data.leads) data.leads = empty.leads;
    if (!data.leads.by_modalidade) data.leads.by_modalidade = {};
    if (!data.previews) data.previews = empty.previews;
    if (!data.rate_limits) data.rate_limits = empty.rate_limits;

    return data;
  } catch (e) {
    return emptyMetrics(date);
  }
}

async function saveMetrics(date, data) {
  var path = METRICS_PREFIX + date + ".json";
  await put(path, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

export async function trackMetric(event, data) {
  try {
    var date = getTodayDate();
    var metrics = await loadMetrics(date);

    if (event === "chat_message") {
      metrics.chat.total_messages++;
      if (data && data.ip && metrics.chat.unique_ips.indexOf(data.ip) === -1) {
        metrics.chat.unique_ips.push(data.ip);
      }
      if (data && data.tokens_estimated) {
        metrics.chat.estimated_tokens += data.tokens_estimated;
        // Estimativa conservadora: $5/MTok media (mistura input/output Sonnet)
        metrics.chat.estimated_cost_usd = Math.round(
          (metrics.chat.estimated_cost_usd + data.tokens_estimated * 0.000005) * 10000
        ) / 10000;
      }

    } else if (event === "lead_created") {
      metrics.leads.total++;
      if (data && data.modalidade) {
        metrics.leads.by_modalidade[data.modalidade] =
          (metrics.leads.by_modalidade[data.modalidade] || 0) + 1;
      }
      if (data && data.emails) {
        for (var i = 0; i < data.emails.length; i++) {
          var emailResult = data.emails[i];
          if (emailResult && emailResult.success) {
            metrics.leads.emails_sent++;
            if (emailResult.provider === "resend") metrics.leads.provider_resend++;
            else if (emailResult.provider === "smtp") metrics.leads.provider_smtp++;
          } else {
            metrics.leads.emails_failed++;
          }
        }
      }

    } else if (event === "preview_generated") {
      metrics.previews.generated++;
      if (data && data.tokens_used) {
        metrics.previews.tokens_used += data.tokens_used;
        // Claude Sonnet output: ~$15/MTok
        metrics.previews.estimated_cost_usd = Math.round(
          (metrics.previews.estimated_cost_usd + data.tokens_used * 0.000015) * 10000
        ) / 10000;
      }

    } else if (event === "preview_cached") {
      metrics.previews.served_from_cache++;

    } else if (event === "rate_limited") {
      metrics.rate_limits.blocked_requests++;
    }

    await saveMetrics(date, metrics);
  } catch (e) {
    // Nunca deixar metricas quebrar o fluxo principal
    console.error("[METRICS] Erro ao registrar metrica:", e.message);
  }
}

// Retorna metricas do dia com unique_ips como contagem (nao lista)
export async function getMetrics(date) {
  var metrics = await loadMetrics(date);
  return Object.assign({}, metrics, {
    chat: Object.assign({}, metrics.chat, {
      unique_ips: Array.isArray(metrics.chat.unique_ips)
        ? metrics.chat.unique_ips.length
        : metrics.chat.unique_ips
    })
  });
}

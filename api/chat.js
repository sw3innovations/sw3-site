import { checkRateLimit } from "./_lib/rate-limit.js";
import { trackMetric } from "./_lib/metrics.js";

var MAX_MESSAGES = 20;

function limitHistory(messages) {
  if (messages.length <= MAX_MESSAGES) return messages;
  // Preserva a primeira mensagem (contexto inicial) + ultimas MAX_MESSAGES-1
  var firstMessage = messages[0];
  var recentMessages = messages.slice(-(MAX_MESSAGES - 1));
  return [firstMessage].concat(recentMessages);
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting: 50 mensagens por IP por hora
  var rateCheck = checkRateLimit(req, "chat", 50, 3600);
  if (!rateCheck.allowed) {
    trackMetric("rate_limited", { ip: rateCheck.ip, endpoint: "chat" });
    return res.status(429).json({
      error: "Limite de requisicoes excedido. Tente novamente em breve.",
      retry_after: rateCheck.retryAfter
    });
  }

  var apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    var body = req.body;
    var messages = body.messages || [];
    var system = body.system || "";

    // Limitar historico as ultimas 20 mensagens
    var limitedMessages = limitHistory(messages);

    // Estimativa de tokens: ~1 token por 4 chars
    var estimatedTokens = Math.ceil(JSON.stringify(limitedMessages).length / 4);
    console.log("[CHAT] Mensagens:", limitedMessages.length, "| Tokens estimados:", estimatedTokens);

    // Prompt caching: system como array com cache_control (Anthropic ephemeral cache)
    // Reduz ~90% do custo do system prompt apos o primeiro processamento
    var requestBody = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: limitedMessages
    };

    if (system) {
      requestBody.system = [
        {
          type: "text",
          text: system,
          cache_control: { type: "ephemeral" }
        }
      ];
    }

    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "prompt-caching-2024-07-31"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      var errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return res.status(response.status).json({ error: "API error", status: response.status });
    }

    var data = await response.json();

    // Log de uso e cache stats
    if (data.usage) {
      console.log("[CHAT] Usage:", JSON.stringify(data.usage));
      if (data.usage.cache_read_input_tokens) {
        console.log("[CHAT] Cache HIT! cache_read_input_tokens:", data.usage.cache_read_input_tokens);
      }
      if (data.usage.cache_creation_input_tokens) {
        console.log("[CHAT] Cache MISS (criando cache). cache_creation_input_tokens:", data.usage.cache_creation_input_tokens);
      }
    }

    // Tracking de metricas (nao bloqueia a resposta)
    trackMetric("chat_message", { ip: rateCheck.ip, tokens_estimated: estimatedTokens });

    return res.status(200).json(data);

  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

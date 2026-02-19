// ═══════════════════════════════════════════════════════
// SOLW3 Rate Limiter
// In-memory Map com TTL por janela de tempo
// Nota: state e resetado entre cold-starts em serverless.
// Para persistencia, use Vercel KV.
// ═══════════════════════════════════════════════════════

var rateLimitStore = new Map();

function cleanExpired() {
  var now = Date.now();
  var keys = Array.from(rateLimitStore.keys());
  for (var i = 0; i < keys.length; i++) {
    if (rateLimitStore.get(keys[i]).resetAt < now) {
      rateLimitStore.delete(keys[i]);
    }
  }
}

export function getClientIP(req) {
  var ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
  if (typeof ip === "string" && ip.indexOf(",") !== -1) {
    ip = ip.split(",")[0].trim();
  }
  return ip;
}

// limit: numero maximo de requisicoes
// windowSeconds: tamanho da janela em segundos (3600 = 1h, 86400 = 1 dia)
export function checkRateLimit(req, endpoint, limit, windowSeconds) {
  var ip = getClientIP(req);

  cleanExpired();

  var now = Date.now();
  var windowMs = windowSeconds * 1000;
  var windowKey = Math.floor(now / windowMs);
  var resetAt = (windowKey + 1) * windowMs;
  var key = ip + ":" + endpoint + ":" + windowKey;

  var entry = rateLimitStore.get(key);
  if (!entry) {
    entry = { count: 0, resetAt: resetAt };
    rateLimitStore.set(key, entry);
  }

  entry.count++;

  if (entry.count > limit) {
    var retryAfter = Math.ceil((resetAt - now) / 1000);
    return { allowed: false, retryAfter: retryAfter, ip: ip };
  }

  return { allowed: true, ip: ip };
}

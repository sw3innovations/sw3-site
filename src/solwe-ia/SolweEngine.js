import { SOLW3_SYSTEM, getFallback } from "./SolwePrompts";

var API_URL = "https://api.anthropic.com/v1/messages";
var MODEL = "claude-sonnet-4-20250514";

export async function sendToAPI(messages) {
  try {
    var response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        system: SOLW3_SYSTEM,
        messages: messages,
      }),
    });
    if (!response.ok) throw new Error("API error " + response.status);
    var data = await response.json();
    var reply = data.content
      .map(function(item) { return item.type === "text" ? item.text : ""; })
      .filter(Boolean)
      .join("\n");
    return { ok: true, text: reply };
  } catch (err) {
    return { ok: false, text: null, error: err };
  }
}

export async function getReply(userText, history) {
  var apiMessages = history.concat([{ role: "user", content: userText }]);
  var result = await sendToAPI(apiMessages);
  if (result.ok && result.text) {
    return result.text;
  }
  return getFallback(userText);
}

export function detectModality(text) {
  var lower = text.toLowerCase();
  if (lower.indexOf("novo") !== -1 || lower.indexOf("criar") !== -1 || lower.indexOf("zero") !== -1) return "A";
  if (lower.indexOf("refator") !== -1 || lower.indexOf("moderniz") !== -1 || lower.indexOf("legado") !== -1) return "B";
  if (lower.indexOf("extens") !== -1 || lower.indexOf("plugin") !== -1 || lower.indexOf("feature") !== -1 || lower.indexOf("integra") !== -1) return "C";
  if (lower.indexOf("staff") !== -1 || lower.indexOf("squad") !== -1 || lower.indexOf("dev") !== -1) return "D";
  return null;
}

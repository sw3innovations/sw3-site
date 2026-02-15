import { SOLW3_SYSTEM, getFallback } from "./SolwePrompts";

var API_URL = "/api/chat";

export async function sendToAPI(messages) {
  try {
    var response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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

export function extrairRequisitos(history) {
  var requisitos = [];
  var textoCompleto = "";

  history.forEach(function(msg) {
    if (msg.role === "user") {
      textoCompleto = textoCompleto + " " + msg.content;
    }
  });

  var palavrasChave = ["quero", "preciso", "sistema", "funcionalidade", "integração", "dashboard", "relatório", "pagamento", "cadastro", "chat", "whatsapp", "email"];

  var frases = textoCompleto.split(/[.!?]/);
  frases.forEach(function(frase) {
    var fraseLower = frase.toLowerCase();
    palavrasChave.forEach(function(palavra) {
      if (fraseLower.indexOf(palavra) !== -1 && frase.trim().length > 20 && requisitos.indexOf(frase.trim()) === -1) {
        requisitos.push(frase.trim());
      }
    });
  });

  return requisitos.slice(0, 8);
}

export function gerarResumoConversa(history) {
  var userMessages = [];
  history.forEach(function(msg) {
    if (msg.role === "user") {
      userMessages.push(msg.content);
    }
  });
  return userMessages.join(" | ");
}

export async function enviarLead(dadosLead) {
  try {
    var response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosLead)
    });

    if (!response.ok) {
      var errorData = await response.json();
      throw new Error(errorData.error || "Erro ao enviar proposta");
    }

    var result = await response.json();
    return { ok: true, data: result };
  } catch (err) {
    console.error("Erro ao enviar lead:", err);
    return { ok: false, error: err.message };
  }
}

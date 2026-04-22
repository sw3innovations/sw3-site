// ═══════════════════════════════════════════════════════
// SOLW3 Preview Generator
// Gera protótipos navegáveis usando Claude API
// ═══════════════════════════════════════════════════════

import Anthropic from "@anthropic-ai/sdk";

var SYSTEM_PROMPT = [
  "Você é um gerador de protótipos de UI. Gere um HTML COMPLETO single-file de um dashboard/sistema baseado nos requisitos abaixo.",
  "",
  "REGRAS:",
  "- HTML completo com DOCTYPE, head, body",
  "- Todo CSS inline no head (tag style)",
  "- Todo JS inline no body (tag script)",
  "- Use Tailwind CSS via CDN: https://cdn.tailwindcss.com",
  "- Use Lucide Icons via CDN: <script src=\"https://unpkg.com/lucide@latest\"></script>",
  "- Dashboard profissional com sidebar de navegação",
  "- Dados mock REALISTAS para o negócio do cliente",
  "- Pelo menos 3-4 páginas/seções navegáveis via JS (sem reload)",
  "- Gráficos simples com CSS (barras, indicadores) — não precisa de lib de charts",
  "- Responsivo (mobile-friendly com menu hamburger)",
  "- Visual moderno e limpo",
  "- Paleta: navy #0f172a + cyan #7dd3fc + green #22c55e + slate",
  "- Footer: \"Protótipo gerado por SOLW3 | sw3.tec.br\"",
  "- Botão CTA destacado: \"Aprovar e iniciar projeto\" que abre WhatsApp (+5583981751871)",
  "- A mensagem do WhatsApp deve ser: \"Olá! Gostei do protótipo e quero aprovar o projeto.\"",
  "",
  "IMPORTANTE:",
  "- Crie dados mock que façam sentido para o negócio específico do cliente",
  "- Use nomes, valores e métricas realistas",
  "- Interface deve parecer um sistema real, não um template genérico",
  "",
  "RESPONDA APENAS COM O HTML. Sem markdown, sem explicação, sem backticks. Apenas o HTML puro começando com <!DOCTYPE html>."
].join("\n");

function construirUserPrompt(dados) {
  var linhas = [
    "Gere o protótipo para:",
    "",
    "Cliente: " + dados.cliente.nome + (dados.cliente.empresa ? " — " + dados.cliente.empresa : ""),
    "Projeto: " + dados.projeto.descricao,
    "",
    "Requisitos do sistema:"
  ];

  dados.projeto.requisitos.forEach(function(req) {
    linhas.push("- " + req);
  });

  linhas.push("");
  linhas.push("Stack sugerida: " + dados.projeto.stack_sugerida);
  linhas.push("");
  linhas.push("Crie um dashboard completo com dados mock realistas para este negócio específico.");
  linhas.push("O sistema deve ter navegação funcional entre as seções principais baseadas nos requisitos acima.");

  return linhas.join("\n");
}

export async function gerarPrototipoHTML(dados) {
  var apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY não configurada");
  }

  var client = new Anthropic({ apiKey: apiKey });

  var userPrompt = construirUserPrompt(dados);

  console.log("[PREVIEW-GEN] Iniciando geração de protótipo para:", dados.cliente.nome);

  try {
    var message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userPrompt
        }
      ]
    });

    var html = message.content[0].text;

    console.log("[PREVIEW-GEN] Protótipo gerado com sucesso. Tamanho:", html.length, "bytes");

    return {
      success: true,
      html: html,
      tokens_used: message.usage.input_tokens + message.usage.output_tokens
    };

  } catch (erro) {
    console.error("[PREVIEW-GEN ERROR]", erro);
    return {
      success: false,
      error: erro.message
    };
  }
}

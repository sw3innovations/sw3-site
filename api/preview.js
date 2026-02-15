// ═══════════════════════════════════════════════════════
// SOLW3 Preview API
// GET /api/preview?id=xxx — serve protótipo navegável (gera on-demand)
// POST /api/preview — salva dados do lead (não gera ainda)
// ═══════════════════════════════════════════════════════

export var config = { maxDuration: 120 };

import { gerarPrototipoHTML } from "./_lib/preview-gen.js";
import { salvarPrototipo, construirPreviewURL, buscarURLBlob, salvarDadosLead, buscarDadosLead } from "./_lib/store.js";

var ALLOWED_ORIGINS = [
  "https://sw3.tec.br",
  "https://www.sw3.tec.br",
  "http://localhost:5173",
  "http://localhost:3000"
];

function setCORSHeaders(res, origin) {
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ═══════════════════════════════════════════════════════
// GET — Serve o protótipo HTML
// ═══════════════════════════════════════════════════════

async function handleGET(req, res) {
  var id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "ID do preview é obrigatório" });
  }

  try {
    console.log("[PREVIEW-GET] Buscando preview:", id);

    // 1. Tentar buscar HTML já gerado
    var blobUrl = await buscarURLBlob(id);

    if (blobUrl) {
      console.log("[PREVIEW-GET] HTML encontrado, servindo:", blobUrl);

      var response = await fetch(blobUrl);
      if (response.ok) {
        var html = await response.text();
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "public, max-age=3600");
        return res.status(200).send(html);
      }
    }

    // 2. HTML não existe → buscar dados do lead e gerar on-demand
    console.log("[PREVIEW-GET] HTML não encontrado, buscando dados do lead...");

    var dadosLead = await buscarDadosLead(id);

    if (!dadosLead) {
      throw new Error("Dados do lead não encontrados");
    }

    console.log("[PREVIEW-GET] Gerando protótipo on-demand...");

    // 3. Gerar HTML com Claude API
    var resultado = await gerarPrototipoHTML(dadosLead);

    if (!resultado.success) {
      throw new Error("Falha ao gerar protótipo: " + resultado.error);
    }

    // 4. Salvar HTML gerado no Blob
    var metadata = {
      id: id,
      cliente: dadosLead.cliente.nome,
      projeto: dadosLead.projeto.descricao,
      gerado_em: new Date().toISOString(),
      tokens_used: resultado.tokens_used
    };

    await salvarPrototipo(id, resultado.html, metadata);

    console.log("[PREVIEW-GET] Protótipo gerado e salvo. Servindo HTML.");

    // 5. Servir HTML gerado
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(resultado.html);

  } catch (erro) {
    console.error("[PREVIEW-GET ERROR]", erro);

    // Retorna página de erro
    var errorHTML = [
      "<!DOCTYPE html>",
      "<html lang=\"pt-BR\">",
      "<head>",
      "<meta charset=\"UTF-8\">",
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "<title>Preview Não Encontrado — SOLW3</title>",
      "<script src=\"https://cdn.tailwindcss.com\"></script>",
      "</head>",
      "<body class=\"bg-slate-50 flex items-center justify-center min-h-screen p-4\">",
      "<div class=\"max-w-md text-center\">",
      "<div class=\"bg-white rounded-2xl shadow-lg p-8\">",
      "<div class=\"w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4\">",
      "<svg class=\"w-8 h-8 text-red-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">",
      "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\"></path>",
      "</svg>",
      "</div>",
      "<h1 class=\"text-2xl font-bold text-slate-900 mb-2\">Preview Não Encontrado</h1>",
      "<p class=\"text-slate-600 mb-6\">Não encontramos dados para gerar este protótipo.</p>",
      "<p class=\"text-sm text-slate-500 mb-6\">ID: " + id + "</p>",
      "<div class=\"mt-6\">",
      "<a href=\"https://wa.me/5583981751871\" class=\"inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition\">",
      "Falar com a Equipe",
      "</a>",
      "</div>",
      "</div>",
      "</div>",
      "</body>",
      "</html>"
    ].join("\n");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(404).send(errorHTML);
  }
}

// ═══════════════════════════════════════════════════════
// POST — Gera e salva protótipo
// ═══════════════════════════════════════════════════════

async function handlePOST(req, res) {
  try {
    var dados = req.body;

    if (!dados.id || !dados.projeto || !dados.cliente) {
      return res.status(400).json({
        error: "Dados inválidos",
        required: ["id", "projeto", "cliente"]
      });
    }

    console.log("[PREVIEW-POST] Salvando dados do lead:", dados.id);

    // Salvar dados do lead no Blob como JSON (geração on-demand no GET)
    var salvamento = await salvarDadosLead(dados.id, dados);

    if (!salvamento.success) {
      return res.status(500).json({
        error: "Erro ao salvar dados do lead",
        detalhes: salvamento.error
      });
    }

    // Construir URL do preview (geração acontece quando acessar)
    var previewUrl = await construirPreviewURL(dados.id);

    console.log("[PREVIEW-POST] Dados salvos. Preview disponível em:", previewUrl);

    return res.status(200).json({
      success: true,
      preview_url: previewUrl,
      id: dados.id,
      message: "Dados salvos. Protótipo será gerado ao acessar a URL."
    });

  } catch (erro) {
    console.error("[PREVIEW-POST ERROR]", erro);
    return res.status(500).json({
      error: "Erro interno do servidor",
      message: erro.message
    });
  }
}

// ═══════════════════════════════════════════════════════
// Handler principal
// ═══════════════════════════════════════════════════════

export default async function handler(req, res) {
  var origin = req.headers.origin;
  setCORSHeaders(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return handleGET(req, res);
  }

  if (req.method === "POST") {
    return handlePOST(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

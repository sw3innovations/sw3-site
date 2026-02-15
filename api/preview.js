// ═══════════════════════════════════════════════════════
// SOLW3 Preview API
// GET /api/preview?id=xxx — serve protótipo navegável
// POST /api/preview — gera e salva protótipo
// ═══════════════════════════════════════════════════════

import { gerarPrototipoHTML } from "./_lib/preview-gen.js";
import { salvarPrototipo, construirPreviewURL } from "./_lib/store.js";
import { get } from "@vercel/blob";

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
    var blobPath = "previews/" + id + ".html";

    console.log("[PREVIEW-GET] Buscando:", blobPath);

    var blob = await get(blobPath);

    if (!blob) {
      return res.status(404).json({
        error: "Preview não encontrado",
        id: id
      });
    }

    var html = await blob.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(html);

  } catch (erro) {
    console.error("[PREVIEW-GET ERROR]", erro);

    // Se não encontrou no blob, retorna página de erro amigável
    var errorHTML = [
      "<!DOCTYPE html>",
      "<html lang=\"pt-BR\">",
      "<head>",
      "<meta charset=\"UTF-8\">",
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "<title>Preview em Geração — SOLW3</title>",
      "<script src=\"https://cdn.tailwindcss.com\"></script>",
      "</head>",
      "<body class=\"bg-slate-50 flex items-center justify-center min-h-screen p-4\">",
      "<div class=\"max-w-md text-center\">",
      "<div class=\"bg-white rounded-2xl shadow-lg p-8\">",
      "<div class=\"w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4\">",
      "<svg class=\"w-8 h-8 text-cyan-600 animate-spin\" fill=\"none\" viewBox=\"0 0 24 24\">",
      "<circle class=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"4\"></circle>",
      "<path class=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path>",
      "</svg>",
      "</div>",
      "<h1 class=\"text-2xl font-bold text-slate-900 mb-2\">Protótipo em Geração</h1>",
      "<p class=\"text-slate-600 mb-6\">Nossos agentes estão criando seu protótipo personalizado. Isso pode levar alguns minutos.</p>",
      "<p class=\"text-sm text-slate-500\">Atualize a página em instantes ou aguarde o email de confirmação.</p>",
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
    return res.status(202).send(errorHTML);
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

    console.log("[PREVIEW-POST] Gerando protótipo para lead:", dados.id);

    // 1. Gerar HTML com Claude
    var resultado = await gerarPrototipoHTML(dados);

    if (!resultado.success) {
      return res.status(500).json({
        error: "Erro ao gerar protótipo",
        detalhes: resultado.error
      });
    }

    // 2. Salvar no Blob
    var metadata = {
      id: dados.id,
      cliente: dados.cliente.nome,
      projeto: dados.projeto.descricao,
      gerado_em: new Date().toISOString(),
      tokens_used: resultado.tokens_used
    };

    var salvamento = await salvarPrototipo(dados.id, resultado.html, metadata);

    if (!salvamento.success) {
      return res.status(500).json({
        error: "Erro ao salvar protótipo",
        detalhes: salvamento.error
      });
    }

    // 3. Construir URL pública
    var previewUrl = await construirPreviewURL(dados.id);

    console.log("[PREVIEW-POST] Protótipo salvo com sucesso:", previewUrl);

    return res.status(200).json({
      success: true,
      preview_url: previewUrl,
      blob_url: salvamento.url,
      id: dados.id,
      tokens_used: resultado.tokens_used
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

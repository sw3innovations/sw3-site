// ═══════════════════════════════════════════════════════
// SOLW3 Preview Store
// Gerencia storage de protótipos no Vercel Blob
// ═══════════════════════════════════════════════════════

import { put, head } from "@vercel/blob";

export async function salvarPrototipo(id, html, metadata) {
  try {
    var blobPath = "previews/" + id + ".html";

    var blob = await put(blobPath, html, {
      access: "public",
      contentType: "text/html; charset=utf-8",
      addRandomSuffix: false
    });

    console.log("[STORE] Protótipo salvo:", blob.url);

    // Salvar também os metadados como JSON
    var metadataPath = "previews/" + id + ".json";
    await put(metadataPath, JSON.stringify(metadata), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false
    });

    return {
      success: true,
      url: blob.url,
      id: id
    };

  } catch (erro) {
    console.error("[STORE ERROR]", erro);
    return {
      success: false,
      error: erro.message
    };
  }
}

export async function verificarPrototipoExiste(id) {
  try {
    var blobPath = "previews/" + id + ".html";
    await head(blobPath);
    return true;
  } catch (erro) {
    return false;
  }
}

export async function construirPreviewURL(id) {
  // URL pública do endpoint que serve o preview
  var baseUrl = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "https://sw3.tec.br";

  return baseUrl + "/api/preview?id=" + id;
}

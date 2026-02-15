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

    // Salvar metadados incluindo a URL do HTML
    var metadataCompleta = Object.assign({}, metadata, {
      html_url: blob.url
    });

    var metadataPath = "previews/" + id + ".json";
    var metadataBlob = await put(metadataPath, JSON.stringify(metadataCompleta), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false
    });

    return {
      success: true,
      url: blob.url,
      metadata_url: metadataBlob.url,
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

export async function buscarURLBlob(id) {
  try {
    var metadataPath = "previews/" + id + ".json";

    // Usar head para verificar se existe e pegar a URL
    var metadataInfo = await head(metadataPath);

    if (!metadataInfo || !metadataInfo.url) {
      return null;
    }

    // Fazer fetch do JSON de metadados
    var response = await fetch(metadataInfo.url);

    if (!response.ok) {
      return null;
    }

    var metadata = await response.json();

    // Retornar a URL do HTML armazenada nos metadados
    return metadata.html_url || null;

  } catch (erro) {
    console.error("[STORE] Erro ao buscar URL do blob:", erro);
    return null;
  }
}

export async function construirPreviewURL(id) {
  // URL pública do endpoint que serve o preview
  var baseUrl = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "https://sw3.tec.br";

  return baseUrl + "/api/preview?id=" + id;
}

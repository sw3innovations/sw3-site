// Gera dist/en/index.html a partir do build em PT. O nginx de produção serve
// arquivos estáticos (try_files $uri $uri/), então /en precisa existir em disco.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

var html = readFileSync("dist/index.html", "utf8");

var TITLE_PT = "SW3 Innovations — Software com IA que funciona em produção";
var TITLE_EN = "SW3 Innovations — AI software that holds up in production";
var DESC_PT = "A SW3 constrói e mantém agentes de IA no WhatsApp, integrações com CRM e plataformas sob medida para empresas com operação pesada.";
var DESC_EN = "SW3 builds and runs WhatsApp AI agents, CRM integrations and custom platforms for operations-heavy businesses.";
var OG_PT = "Agentes de IA no WhatsApp, integrações com CRM e plataformas sob medida.";
var OG_EN = "WhatsApp AI agents, CRM integrations and custom platforms.";

var en = html
  .replace('<html lang="pt-BR">', '<html lang="en">')
  .split(TITLE_PT).join(TITLE_EN)
  .split(DESC_PT).join(DESC_EN)
  .split(OG_PT).join(OG_EN)
  .replace('content="pt_BR"', 'content="en_US"')
  .replace('<meta property="og:url" content="https://www.sw3.tec.br/" />', '<meta property="og:url" content="https://www.sw3.tec.br/en" />')
  .replace('<link rel="canonical" href="https://www.sw3.tec.br/" />', '<link rel="canonical" href="https://www.sw3.tec.br/en" />');

if (en.indexOf(TITLE_EN) === -1 || en.indexOf(DESC_EN) === -1) {
  throw new Error("postbuild: textos de index.html mudaram; atualize scripts/postbuild.js");
}

mkdirSync("dist/en", { recursive: true });
writeFileSync("dist/en/index.html", en);
console.log("postbuild: dist/en/index.html gerado");

# SW3 Innovations — Site Institucional

Site institucional da **SW3 Innovations Brasil LTDA** (www.sw3.tec.br), em português (`/`) e inglês (`/en`).

## Stack

- **Vite** + **React 18**, estilos inline
- Fonte: DM Sans (Google Fonts)
- Site 100% estático: sem API, sem chat. Contato por WhatsApp e e-mail.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Conteúdo

Todo o texto (PT e EN), o número de WhatsApp e o e-mail ficam em `src/content.js`. As seções em `src/sections/` só leem de lá.

## Build

```bash
npm run build
```

Gera `dist/` e, via `scripts/postbuild.js`, `dist/en/index.html` (o nginx serve só arquivos estáticos, então `/en` precisa existir em disco).

## Deploy

Produção é o nginx do servidor Itline (`ssh itline`), em `/var/www/sw3.tec.br/html` (dono `sw3innovation`). Deploy manual:

1. `npm run build` e `xattr -cr dist`
2. Backup da pasta atual (`html.bak-AAAAMMDD`) no servidor
3. Copiar `dist/` para `html/`, mantendo `.well-known/` e `demo/` (páginas publicadas fora do build), e apagar arquivos `._*`; com rsync `--delete`, usar `--exclude .well-known --exclude demo`

---

© 2026 SW3 Innovations Brasil LTDA — Campina Grande, PB

# SW3 Innovations — Site Institucional

Site institucional da **SW3 Innovations Brasil LTDA**, laboratório de inovação em automação e IA.

## Stack

- **Vite** + **React 18**
- CSS inline (variáveis CSS)
- Fontes: Outfit + JetBrains Mono (Google Fonts)
- Chat widget SOLW3 (API Anthropic + fallback local)

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Deploy automático via **Vercel** conectado ao repositório GitHub.

## Estrutura

```
sw3-site/
├── index.html          # Entry point + SEO meta tags
├── vite.config.js      # Vite config
├── package.json
├── public/             # Assets estáticos (favicon, OG image)
├── src/
│   ├── main.jsx        # React root
│   └── App.jsx         # Site completo (sw3-esri-v2)
└── .gitignore
```

## Domínio

- Produção: **sw3.tec.br** (Vercel)
- Contato: admin@sw3.tec.br | (83) 98120 0570

---

© 2026 SW3 Innovations Brasil LTDA — Campina Grande, PB

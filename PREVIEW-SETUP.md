# 🎨 Setup: Geração de Protótipos Navegáveis

## Visão Geral

Sistema que gera protótipos interativos automaticamente usando Claude API. Quando o cliente fornece requisitos no chat, ele recebe:
- Proposta comercial (preço + timeline)
- **Link para protótipo navegável do sistema dele**

## Configuração Necessária

### 1. Vercel Blob Storage

Acesse: https://vercel.com/dashboard → seu projeto → Storage → Create Database

1. Escolha **Blob**
2. Nome: `sw3-previews` (ou qualquer nome)
3. Clique em **Create**
4. Copie o token gerado

### 2. Adicionar Environment Variable

No Vercel Dashboard → Settings → Environment Variables:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx
```

**Importante:** Marcar para todos os ambientes (Production, Preview, Development)

### 3. Environment Variables Necessárias (checklist)

- ✅ `ANTHROPIC_API_KEY` — já configurada
- ✅ `RESEND_API_KEY` — já configurada
- 🆕 `BLOB_READ_WRITE_TOKEN` — **CONFIGURAR AGORA**

### 4. Redeploy

Após adicionar a env var:
- Vercel faz redeploy automático
- Ou force: Settings → Deployments → Redeploy

## Como Funciona

### Fluxo Completo

```
Cliente conversa com SOLW3 IA
  ↓
Fornece requisitos e email
  ↓
POST /api/lead dispara:
  ├─ Pricing Engine
  ├─ Preview Generation (background)
  └─ Email com link do preview
  ↓
Email enviado IMEDIATAMENTE
(preview ainda gerando em background)
  ↓
15-30 segundos depois: preview pronto
  ↓
Cliente abre email → clica botão
  ↓
GET /api/preview?id=lead_xxx
  ↓
Dashboard navegável com:
  - Sidebar com páginas
  - Dados mock do negócio dele
  - Gráficos e métricas
  - Botão "Aprovar projeto" → WhatsApp
```

### Endpoints

**POST /api/preview**
- Gera protótipo com Claude API
- Salva no Vercel Blob
- Retorna preview_url

**GET /api/preview?id=xxx**
- Serve HTML do protótipo
- Se ainda não pronto: mostra "em geração"

## Testes

### Local (após configurar env vars)

```bash
# Teste completo (dispara preview)
node test-preview.js

# Deve retornar:
# ✅ preview_url: https://sw3.tec.br/api/preview?id=lead_xxx
```

### Produção

```bash
# 1. Enviar lead de teste
curl -X POST https://sw3.tec.br/api/lead \
  -H "Content-Type: application/json" \
  -d @test-lead-payload.json

# 2. Copiar preview_url da resposta
# 3. Aguardar 30s
# 4. Abrir no browser
```

## Arquitetura

```
api/
  preview.js         # Endpoint GET/POST
  lead.js            # Dispara preview em background
  _lib/
    preview-gen.js   # Geração com Claude API
    store.js         # Vercel Blob storage
    proposal.js      # Email com botão do preview
```

## Custos Estimados

**Claude API:**
- ~8.000-12.000 tokens por preview
- Sonnet 4: $3 / 1M input, $15 / 1M output
- Custo por preview: ~$0.15-0.25

**Vercel Blob:**
- Free tier: 500MB
- HTML médio: 50-100KB
- Capacidade: ~5.000-10.000 protótipos

## Troubleshooting

### Preview não aparece

1. Verificar env var: `BLOB_READ_WRITE_TOKEN`
2. Verificar logs: Vercel Dashboard → Functions → Logs
3. Erro "BLOB_READ_WRITE_TOKEN not found" → configurar env var

### Preview demora muito

- Normal: 15-30 segundos
- Se > 1 minuto: verificar logs da função
- Timeout Vercel: 60s (deve ser suficiente)

### Preview retorna "em geração"

- É esperado se cliente clicar muito rápido
- Página mostra: "Aguarde alguns instantes e recarregue"
- Após 30s, recarregar deve mostrar o dashboard

## Próximas Melhorias (opcional)

1. **Cache:** Reusar preview se cliente pedir proposta novamente
2. **Analytics:** Track quantos clientes abrem o preview
3. **A/B Test:** Preview vs sem preview (taxa de conversão)
4. **Customização:** Permitir cliente escolher cores/layout

## Contato

Dúvidas: admin@sw3.tec.br

# 📧 Configuração de Email - SOLW3

Sistema com **fallback automático**: Resend → SMTP

---

## ✅ **Providers Configurados**

### **1. Primary: Resend** (rápido, profissional)
- API Key: `RESEND_API_KEY`
- Domínio: `sw3.tec.br`
- From: `SOLW3 <solw3@sw3.tec.br>`

### **2. Fallback: SMTP (Nodemailer)** (backup confiável)
- Servidor: Gmail SMTP (ou outro)
- Ativa automaticamente se Resend falhar

---

## 🔧 **Environment Variables**

### **Resend (Primary):**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAIL=admin@sw3.tec.br
```

### **SMTP Fallback (Obrigatório):**

**Opção A - Gmail:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app  # ← Senha de App, NÃO a senha normal!
SMTP_FROM=seu-email@gmail.com
```

**Como gerar senha de app no Gmail:**
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione: App = Mail, Device = Other (SOLW3)
3. Copie a senha gerada (16 caracteres)

**Opção B - Outro SMTP:**
```bash
SMTP_HOST=smtp.seuservidor.com
SMTP_PORT=587
SMTP_USER=usuario@seudominio.com
SMTP_PASSWORD=senha
SMTP_FROM=solw3@sw3.tec.br
```

---

## 🎯 **Como Funciona o Fallback**

```
1. Tenta Resend
   ↓
   ✅ Sucesso? → Email enviado via Resend
   ↓
   ❌ Erro?
   ↓
2. Tenta SMTP automaticamente
   ↓
   ✅ Sucesso? → Email enviado via SMTP
   ↓
   ❌ Erro? → Retorna erro (ambos falharam)
```

---

## 📊 **Logs**

```
[EMAIL] Enviando proposta para: xxx@xxx.com
[EMAIL] Resposta Resend error: {...}           ← Resend falhou
[EMAIL] Tentando fallback via SMTP...
[EMAIL-FALLBACK] Enviando via SMTP para: xxx
[EMAIL-FALLBACK] Email enviado com sucesso
```

---

## 🚀 **Configurar no Vercel**

```bash
# Via Vercel CLI
vercel env add SMTP_USER
vercel env add SMTP_PASSWORD
vercel env add SMTP_FROM

# Ou via Dashboard:
# https://vercel.com/sw3innovations/sw3-site/settings/environment-variables
```

---

## ✅ **Checklist**

- [ ] `RESEND_API_KEY` configurada
- [ ] `SMTP_USER` configurada
- [ ] `SMTP_PASSWORD` configurada (senha de app!)
- [ ] `SMTP_FROM` configurada
- [ ] Testar: `curl -X POST https://sw3.tec.br/api/lead ...`
- [ ] Verificar logs no Vercel
- [ ] Confirmar recebimento de email

---

## 🔍 **Troubleshooting**

**Erro: "SMTP_USER e SMTP_PASSWORD não configurados"**
→ Adicione as env vars no Vercel

**Emails não chegam via SMTP:**
→ Gmail: Verifique se usou "senha de app" (não a senha normal)
→ Outro: Verifique credenciais SMTP

**Ambos falharam:**
→ Verifique logs detalhados no Vercel
→ Teste SMTP manualmente com Nodemailer

---

**Sistema redundante: se um falhar, o outro funciona!** 🛡️

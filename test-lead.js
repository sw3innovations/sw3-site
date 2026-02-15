// ═══════════════════════════════════════════════════════
// Test Script para /api/lead
// Execução: node test-lead.js
// ═══════════════════════════════════════════════════════

var payloadTeste = {
  cliente: {
    email: "teste@example.com",
    nome: "João Silva"
  },
  projeto: {
    modalidade: "A",
    descricao: "Sistema de vendas automatizado para fábrica de vidros com integração WhatsApp e dashboard financeiro",
    requisitos: [
      "Chatbot WhatsApp para pedidos automatizados",
      "Catálogo digital de produtos com fotos",
      "Geração automática de orçamentos em PDF",
      "Integração com Mercado Pago e PagSeguro",
      "Dashboard financeiro com gráficos em tempo real"
    ],
    stack_sugerida: "React, FastAPI, AWS",
    timeline_estimada: "8-12 semanas",
    modulos: 5
  },
  conversa: {
    mensagens: 12,
    resumo: "Cliente tem fábrica de vidros, atualmente vende via WhatsApp manualmente. Quer automatizar todo processo de vendas, eliminar planilhas e ter visão financeira em tempo real. Volume: 50-100 pedidos/mês."
  }
};

async function testarEndpoint() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("TESTE: /api/lead");
  console.log("═══════════════════════════════════════════════════════");
  console.log("");

  console.log("Payload de teste:");
  console.log(JSON.stringify(payloadTeste, null, 2));
  console.log("");

  try {
    console.log("Enviando POST para http://localhost:3000/api/lead ...");

    var response = await fetch("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadTeste)
    });

    console.log("Status:", response.status);
    console.log("");

    var data = await response.json();

    if (response.ok) {
      console.log("✅ SUCESSO!");
      console.log("");
      console.log("Resposta:");
      console.log(JSON.stringify(data, null, 2));
      console.log("");
      console.log("Preço total:", "R$", data.pricing.preco_total.toLocaleString("pt-BR"));
      console.log("Timeline:", data.pricing.timeline_semanas, "semanas");
      console.log("Modalidade:", data.pricing.modalidade);
      console.log("Emails enviados:");
      console.log("  - Cliente:", data.emails.cliente ? "✓" : "✗");
      console.log("  - Equipe:", data.emails.equipe ? "✓" : "✗");
    } else {
      console.log("❌ ERRO!");
      console.log("");
      console.log("Resposta:");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (erro) {
    console.log("❌ ERRO DE CONEXÃO!");
    console.log("");
    console.log(erro.message);
    console.log("");
    console.log("Certifique-se de que:");
    console.log("1. O servidor está rodando (npm run dev ou vercel dev)");
    console.log("2. A porta está correta (3000 ou 5173)");
  }

  console.log("");
  console.log("═══════════════════════════════════════════════════════");
}

testarEndpoint();

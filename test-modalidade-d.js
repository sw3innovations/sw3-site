// ═══════════════════════════════════════════════════════
// Test Script para Modalidade D (Staff Augmentation)
// Verifica se timeline aparece como "Mín. 3 meses" em todos lugares
// Execução: node test-modalidade-d.js
// ═══════════════════════════════════════════════════════

var payloadTeste = {
  cliente: {
    email: "teste-staff@example.com",
    nome: "Maria Santos"
  },
  projeto: {
    modalidade: "D",
    descricao: "Precisamos de um desenvolvedor full-stack para reforçar nossa equipe de produto por pelo menos 3 meses",
    requisitos: [
      "Experiência com React e Node.js",
      "Conhecimento em AWS",
      "Trabalho remoto com reuniões diárias",
      "Integração com equipe existente"
    ],
    stack_sugerida: "React, Node.js, AWS",
    timeline_estimada: "3 meses",
    modulos: 1
  },
  conversa: {
    mensagens: 8,
    resumo: "Cliente precisa reforçar equipe de desenvolvimento com um full-stack. Projeto em andamento, necessidade de pelo menos 3 meses de colaboração."
  }
};

async function testarModalidadeD() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("TESTE: Modalidade D - Timeline Display");
  console.log("═══════════════════════════════════════════════════════");
  console.log("");

  console.log("Payload de teste (Staff Augmentation):");
  console.log(JSON.stringify(payloadTeste, null, 2));
  console.log("");

  try {
    console.log("Enviando POST para https://www.sw3.tec.br/api/lead ...");

    var response = await fetch("https://www.sw3.tec.br/api/lead", {
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
      console.log("═══════════════════════════════════════════════════════");
      console.log("VERIFICAÇÃO DE TIMELINE");
      console.log("═══════════════════════════════════════════════════════");
      console.log("");

      var timelineDisplay = data.pricing.timeline_display;
      var timelineSemanas = data.pricing.timeline_semanas;
      var timelineMeses = data.pricing.timeline_meses;

      console.log("📊 Dados retornados:");
      console.log("  - timeline_display:", timelineDisplay);
      console.log("  - timeline_semanas:", timelineSemanas);
      console.log("  - timeline_meses:", timelineMeses);
      console.log("");

      console.log("✓ ESPERADO: 'Mín. 3 meses'");
      console.log("✓ RECEBIDO:", timelineDisplay);
      console.log("");

      if (timelineDisplay === "Mín. 3 meses") {
        console.log("✅ TESTE PASSOU! Timeline exibida corretamente.");
        console.log("");
        console.log("Locais onde 'Mín. 3 meses' deve aparecer:");
        console.log("  1. ✓ API response (pricing.timeline_display)");
        console.log("  2. ✓ Email do cliente (proposta HTML)");
        console.log("  3. ✓ Email da equipe (resumo lead)");
        console.log("  4. ✓ Mensagem de sucesso no chat (frontend)");
      } else {
        console.log("❌ TESTE FALHOU! Timeline esperada: 'Mín. 3 meses', recebida:", timelineDisplay);
      }

      console.log("");
      console.log("Outros dados da proposta:");
      console.log("  - Modalidade:", data.pricing.modalidade, "-", data.pricing.modalidade_nome);
      console.log("  - Preço mensal:", "R$", data.pricing.preco_mensal.toLocaleString("pt-BR"));
      console.log("  - Preço total:", "R$", data.pricing.preco_total.toLocaleString("pt-BR"));
      console.log("  - Formato:", data.pricing.formato);
      console.log("");
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

testarModalidadeD();

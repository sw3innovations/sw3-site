// ═══════════════════════════════════════════════════════
// Test Script para geração de Preview
// Execução: node test-preview.js
// ═══════════════════════════════════════════════════════

var payloadTeste = {
  cliente: {
    email: "teste-preview@example.com",
    nome: "Carlos Mendes",
    empresa: "Fábrica de Vidros Premium"
  },
  projeto: {
    modalidade: "A",
    descricao: "Sistema de vendas automatizado para fábrica de vidros com integração WhatsApp e dashboard financeiro",
    requisitos: [
      "Chatbot WhatsApp para pedidos automatizados",
      "Catálogo digital de produtos com fotos e preços",
      "Geração automática de orçamentos em PDF",
      "Integração com Mercado Pago e PagSeguro",
      "Dashboard financeiro com gráficos em tempo real",
      "Gestão de estoque e produtos",
      "Relatórios de vendas e performance"
    ],
    stack_sugerida: "React, FastAPI, PostgreSQL, AWS",
    timeline_estimada: "8-12 semanas",
    modulos: 7
  },
  conversa: {
    mensagens: 15,
    resumo: "Cliente possui fábrica de vidros temperados, atualmente vende via WhatsApp manualmente. Quer automatizar todo processo de vendas desde o primeiro contato até pagamento, eliminar planilhas Excel e ter visão financeira em tempo real com gráficos. Volume esperado: 80-150 pedidos/mês."
  }
};

async function testarPreview() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("TESTE: Geração de Protótipo Navegável");
  console.log("═══════════════════════════════════════════════════════");
  console.log("");

  console.log("📋 Payload de teste:");
  console.log(JSON.stringify(payloadTeste, null, 2));
  console.log("");

  try {
    console.log("📤 Enviando POST para https://www.sw3.tec.br/api/lead ...");
    console.log("");

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
      console.log("RESULTADO");
      console.log("═══════════════════════════════════════════════════════");
      console.log("");

      console.log("💰 Pricing:");
      console.log("  - Preço total:", "R$", data.pricing.preco_total.toLocaleString("pt-BR"));
      console.log("  - Timeline:", data.pricing.timeline_display || data.pricing.timeline_semanas + " semanas");
      console.log("  - Modalidade:", data.pricing.modalidade_nome);
      console.log("");

      console.log("📧 Emails:");
      console.log("  - Cliente:", data.emails.cliente ? "✅ Enviado" : "❌ Falhou");
      console.log("  - Equipe:", data.emails.equipe ? "✅ Enviado" : "❌ Falhou");
      console.log("");

      console.log("🎨 Protótipo:");
      if (data.preview_url) {
        console.log("  - URL:", data.preview_url);
        console.log("");
        console.log("═══════════════════════════════════════════════════════");
        console.log("PRÓXIMOS PASSOS");
        console.log("═══════════════════════════════════════════════════════");
        console.log("");
        console.log("1. Aguarde 15-30 segundos para o protótipo ser gerado");
        console.log("2. Acesse no browser:", data.preview_url);
        console.log("3. Verifique se o dashboard navegável aparece");
        console.log("4. Confira o email em", payloadTeste.cliente.email);
        console.log("5. Clique no botão 'Abrir Protótipo Navegável' no email");
        console.log("");
        console.log("💡 Se o preview ainda não estiver pronto, você verá:");
        console.log("   'Protótipo em Geração - aguarde alguns instantes'");
        console.log("");
      } else {
        console.log("  - ⚠️ Preview URL não retornada (feature pode estar desabilitada)");
      }

      console.log("Lead ID:", data.lead_id);

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
    console.log("1. O endpoint está acessível");
    console.log("2. As env vars estão configuradas no Vercel:");
    console.log("   - ANTHROPIC_API_KEY");
    console.log("   - RESEND_API_KEY");
    console.log("   - BLOB_READ_WRITE_TOKEN");
  }

  console.log("");
  console.log("═══════════════════════════════════════════════════════");
}

testarPreview();

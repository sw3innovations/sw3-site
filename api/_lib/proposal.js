// ═══════════════════════════════════════════════════════
// SOLW3 Proposal Generator
// Gera HTML profissional da proposta
// ═══════════════════════════════════════════════════════

import { formatarPreco, formatarTimeline } from "./pricing.js";

export function gerarPropostaHTML(dados, pricing) {
  var html = [
    '<!DOCTYPE html>',
    '<html lang="pt-BR">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>Proposta SOLW3</title>',
    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">',
    '<style>',
    '* { margin: 0; padding: 0; box-sizing: border-box; }',
    'body { font-family: "Outfit", sans-serif; background: #fafafa; color: #1e293b; line-height: 1.6; }',
    '.container { max-width: 680px; margin: 0 auto; background: #fff; }',
    '.header { background: #0f172a; padding: 32px 40px; text-align: center; }',
    '.logo { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }',
    '.subtitle { font-size: 11px; color: #7dd3fc; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px; }',
    '.content { padding: 40px; }',
    '.section { margin-bottom: 32px; }',
    '.section-title { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; font-weight: 600; }',
    '.section-value { font-size: 16px; color: #1e293b; line-height: 1.7; }',
    '.requirements { list-style: none; }',
    '.requirements li { padding: 8px 0; padding-left: 24px; position: relative; }',
    '.requirements li:before { content: "✓"; position: absolute; left: 0; color: #22c55e; font-weight: 700; }',
    '.highlight-box { background: #f8fafc; border-left: 4px solid #7dd3fc; padding: 20px 24px; border-radius: 8px; margin: 16px 0; }',
    '.highlight-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }',
    '.highlight-value { font-size: 24px; font-weight: 800; color: #0f172a; }',
    '.price-box { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 28px 32px; border-radius: 12px; text-align: center; margin: 24px 0; }',
    '.price-label { font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }',
    '.price-value { font-size: 36px; font-weight: 800; color: #7dd3fc; margin-bottom: 8px; }',
    '.price-detail { font-size: 13px; color: #cbd5e1; }',
    '.timeline-box { background: #ecfdf5; border: 1px solid #86efac; padding: 16px 20px; border-radius: 8px; text-align: center; margin: 16px 0; }',
    '.timeline-value { font-size: 18px; font-weight: 700; color: #15803d; }',
    '.cta-box { background: #7dd3fc; color: #0f172a; padding: 24px 32px; border-radius: 12px; text-align: center; margin: 32px 0; }',
    '.cta-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; }',
    '.cta-text { font-size: 14px; margin-bottom: 8px; }',
    '.footer { background: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e2e8f0; }',
    '.footer-title { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }',
    '.footer-text { font-size: 13px; color: #64748b; margin-bottom: 4px; }',
    '.footer-link { color: #7dd3fc; text-decoration: none; }',
    '</style>',
    '</head>',
    '<body>',
    '<div class="container">',

    // Header
    '<div class="header">',
    '<div class="logo">SOLW3</div>',
    '<div class="subtitle">Proposta Técnica e Comercial</div>',
    '</div>',

    // Content
    '<div class="content">',

    // Saudação
    '<div class="section">',
    '<p class="section-value">Olá' + (dados.cliente.nome ? ', ' + dados.cliente.nome : '') + '!</p>',
    '<p class="section-value" style="margin-top: 12px;">Obrigado por conversar com a SOLW3 IA. Segue sua proposta personalizada baseada no que conversamos.</p>',
    '</div>',

    // Resumo do Projeto
    '<div class="section">',
    '<div class="section-title">Resumo do Projeto</div>',
    '<div class="section-value">' + dados.projeto.descricao + '</div>',
    '</div>',

    // Escopo
    '<div class="section">',
    '<div class="section-title">Escopo Funcional</div>',
    '<ul class="requirements">'
  ];

  // Add requirements
  dados.projeto.requisitos.forEach(function(req) {
    html.push('<li>' + req + '</li>');
  });

  html = html.concat([
    '</ul>',
    '</div>',

    // Modalidade e Stack
    '<div class="highlight-box">',
    '<div class="highlight-label">Modalidade Identificada</div>',
    '<div class="highlight-value">' + pricing.modalidade_nome + '</div>',
    '<p style="font-size: 13px; color: #64748b; margin-top: 8px;">' + dados.projeto.stack_sugerida + '</p>',
    '</div>',

    // Timeline
    '<div class="timeline-box">',
    '<div class="timeline-value">⏱ Timeline Estimada: ' + (pricing.timeline_display || formatarTimeline(pricing.timeline_semanas)) + '</div>',
    '</div>',

    // Investimento
    '<div class="price-box">',
    '<div class="price-label">Investimento Total</div>',
    '<div class="price-value">' + formatarPreco(pricing.preco_total) + '</div>'
  ]);

  if (pricing.formato === "projeto" && pricing.preco_por_modulo) {
    html.push('<div class="price-detail">' + formatarPreco(pricing.preco_por_modulo) + ' por módulo × ' + pricing.modulos + ' módulos</div>');
  } else if (pricing.formato === "mensal") {
    html.push('<div class="price-detail">' + formatarPreco(pricing.preco_mensal) + ' por mês × ' + pricing.timeline_meses + ' meses</div>');
  }

  html = html.concat([
    '</div>',

    // Próximos Passos
    '<div class="cta-box">',
    '<div class="cta-title">Próximos Passos</div>',
    '<div class="cta-text">1. Revise a proposta e tire dúvidas</div>',
    '<div class="cta-text">2. Agende uma call de alinhamento</div>',
    '<div class="cta-text">3. Assine o contrato e iniciamos o projeto</div>',
    '<div style="margin-top: 16px; font-size: 13px; font-weight: 600;">📱 WhatsApp: +55 83 8175-1871</div>',
    '<div style="font-size: 13px; font-weight: 600;">✉️ admin@sw3.tec.br</div>',
    '</div>',

    '</div>',

    // Footer
    '<div class="footer">',
    '<div class="footer-title">SW3 Innovations Brasil LTDA</div>',
    '<div class="footer-text">Campina Grande — PB</div>',
    '<div class="footer-text"><a href="https://sw3.tec.br" class="footer-link">sw3.tec.br</a> • <a href="mailto:admin@sw3.tec.br" class="footer-link">admin@sw3.tec.br</a></div>',
    '<div class="footer-text" style="margin-top: 16px; font-size: 11px;">Proposta gerada automaticamente pela SOLW3 IA</div>',
    '</div>',

    '</div>',
    '</body>',
    '</html>'
  ]);

  return html.join('\n');
}

export function gerarResumoLead(dados, pricing) {
  var linhas = [
    '<div style="font-family: Outfit, sans-serif; color: #1e293b;">',
    '<h2 style="color: #0f172a;">🔔 Novo Lead SOLW3</h2>',
    '<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">',
    '<p><strong>Cliente:</strong> ' + dados.cliente.nome + '</p>',
    '<p><strong>Email:</strong> ' + dados.cliente.email + '</p>',
    '<p><strong>Modalidade:</strong> ' + pricing.modalidade_nome + '</p>',
    '<p><strong>Investimento:</strong> ' + formatarPreco(pricing.preco_total) + '</p>',
    '<p><strong>Timeline:</strong> ' + (pricing.timeline_display || formatarTimeline(pricing.timeline_semanas)) + '</p>',
    '</div>',
    '<h3 style="margin-top: 20px;">Projeto</h3>',
    '<p>' + dados.projeto.descricao + '</p>',
    '<h3 style="margin-top: 20px;">Requisitos</h3>',
    '<ul>'
  ];

  dados.projeto.requisitos.forEach(function(req) {
    linhas.push('<li>' + req + '</li>');
  });

  linhas = linhas.concat([
    '</ul>',
    '<h3 style="margin-top: 20px;">Conversa</h3>',
    '<p><strong>Mensagens trocadas:</strong> ' + dados.conversa.mensagens + '</p>',
    '<p><strong>Resumo:</strong> ' + dados.conversa.resumo + '</p>',
    '<div style="margin-top: 24px; padding: 16px; background: #ecfdf5; border-left: 4px solid #22c55e; border-radius: 4px;">',
    '<p style="margin: 0;"><strong>Próxima ação:</strong> Entrar em contato com o cliente pelo WhatsApp ou email</p>',
    '</div>',
    '</div>'
  ]);

  return linhas.join('\n');
}

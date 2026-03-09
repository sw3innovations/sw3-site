import { useState } from "react";

var cases = [
  {
    id: "vidros",
    label: "Indústria de Vidro",
    icon: "⬡",
    modalidade: "A",
    modalidadeLabel: "Projeto Novo",
    tagline: "De planilha a sistema completo em semanas",
    challenge:
      "Operação comercial rodava em planilhas e WhatsApp manual. Pedidos se perdiam, sem visibilidade de pipeline, horas por dia em tarefas repetitivas.",
    solution:
      "Sistema web com automação de pedidos via n8n, dashboard de vendas em tempo real e fluxos automatizados de notificação por WhatsApp.",
    stack: ["React", "Node.js", "n8n", "PostgreSQL", "WhatsApp API"],
    results: [
      { value: "100%", detail: "pedidos automatizados" },
      { value: "Tempo real", detail: "dashboard vendas" },
      { value: "~8 sem", detail: "kick-off ao deploy" },
    ],
    outcome:
      "Projeto virou base do AutoVendas — nosso produto B2B para automação de vendas industriais. Validou o modelo de transformar projeto sob demanda em solução replicável.",
    color: "#7dd3fc",
  },
  {
    id: "plataforma",
    label: "Geração de Conteúdo Didático",
    icon: "◈",
    modalidade: "A",
    modalidadeLabel: "Projeto Novo",
    tagline: "Plataforma de conteúdo com IA entregue em produção",
    challenge:
      "Produção de conteúdo didático era manual, lenta e cara. Sem padronização, sem escala, e com gargalo total na equipe de criação.",
    solution:
      "Plataforma web com geração assistida por IA, fluxo de revisão e publicação automatizada. Conteúdo padronizado com escala e qualidade consistente.",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "AWS"],
    results: [
      { value: "Entregue", detail: "em produção" },
      { value: "Pipeline", detail: "novas demandas 2026" },
      { value: "Recorrente", detail: "cliente voltou" },
    ],
    outcome:
      "Primeiro case da SW3. Validou capacidade de entrega e abriu pipeline de novos projetos — o cliente retornou com demandas adicionais.",
    color: "#34d399",
  },
  {
    id: "ecommerce",
    label: "E-commerce de Automação",
    icon: "◆",
    modalidade: "A",
    modalidadeLabel: "Projeto Novo",
    tagline: "Compra via WhatsApp com entrega express em 1 hora",
    challenge:
      "Distribuidor de automação residencial e comercial operava vendas por telefone e balcão. Sem canal digital, sem controle de estoque em tempo real, e logística de entrega sem rastreamento.",
    solution:
      "E-commerce completo (PWA) com jornada de compra iniciada via WhatsApp, catálogo digital com 5 linhas de produto, pagamento integrado (Pix/cartão/boleto), emissão automática de NF-e, gestão de estoque em tempo real e sistema de alertas com escalação automática para garantir entrega em até 1h.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "WhatsApp API"],
    results: [
      { value: "1 hora", detail: "entrega express" },
      { value: "5 linhas", detail: "catálogo completo" },
      { value: "12 sem", detail: "kick-off ao go-live" },
    ],
    outcome:
      "Sistema end-to-end: do WhatsApp ao rastreamento de entrega. Integra pagamento, NF-e automática, estoque real-time e alertas inteligentes para a operação.",
    color: "#f59e0b",
  },
];

export default function Cases() {
  var _expanded = useState(null);
  var expanded = _expanded[0];
  var setExpanded = _expanded[1];

  return (
    <section id="cases" style={{ padding: "80px 32px 100px", background: "#0F2132" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "#94A3B8", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
            CASES
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: 8 }}>
            Projetos que já entregamos
          </h2>
          <p style={{ color: "#E2E8F0", fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>
            Cada projeto valida uma parte do modelo — e vira base para o próximo produto.
          </p>
        </div>

        <div className="cases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {cases.map(function(c) {
            var isOpen = expanded === c.id;
            return (
              <div key={c.id} style={{ background: "#1B2838", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                onMouseEnter={function(e) { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ height: 3, background: "linear-gradient(90deg, " + c.color + ", " + c.color + "60)" }} />
                <div style={{ padding: "28px 28px 24px" }}>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: c.color + "18", border: "1px solid " + c.color + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: c.color }}>{c.icon}</div>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{c.label}</h3>
                        <span style={{ fontSize: 10, color: "#94A3B8", fontFamily: "var(--mono)" }}>Modalidade {c.modalidade}: {c.modalidadeLabel}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, color: "#94A3B8", fontWeight: 500, lineHeight: 1.5, marginBottom: 20, fontStyle: "italic" }}>{c.tagline}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
                    {c.results.map(function(r, i) {
                      return (
                        <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "14px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 17, fontWeight: 800, color: c.color, letterSpacing: "-0.02em", marginBottom: 2 }}>{r.value}</div>
                          <div style={{ fontSize: 9, color: "#94A3B8", fontFamily: "var(--mono)", fontWeight: 500 }}>{r.detail}</div>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={function() { setExpanded(isOpen ? null : c.id); }} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 11, cursor: "pointer", fontFamily: "var(--mono)", padding: "6px 0", width: "100%", textAlign: "left", transition: "color 0.2s" }}
                    onMouseEnter={function(e) { e.target.style.color = c.color; }}
                    onMouseLeave={function(e) { e.target.style.color = "#94A3B8"; }}
                  >{isOpen ? "▾ Menos detalhes" : "▸ Ver detalhes"}</button>

                  <div style={{ maxHeight: isOpen ? 420 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>DESAFIO</div>
                        <p style={{ fontSize: 12.5, color: "#E2E8F0", lineHeight: 1.6 }}>{c.challenge}</p>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>SOLUÇÃO</div>
                        <p style={{ fontSize: 12.5, color: "#E2E8F0", lineHeight: 1.6 }}>{c.solution}</p>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>STACK</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {c.stack.map(function(s, i) {
                            return (
                              <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 9.5, padding: "3px 8px", borderRadius: 4, background: "rgba(255,255,255,0.08)", color: "#94A3B8", fontWeight: 500 }}>{s}</span>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ background: c.color + "12", border: "1px solid " + c.color + "25", borderRadius: 8, padding: "12px 14px" }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: c.color, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>RESULTADO</div>
                        <p style={{ fontSize: 12.5, color: "#E2E8F0", lineHeight: 1.6 }}>{c.outcome}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 36, padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 12, color: "#94A3B8", fontFamily: "var(--mono)", marginBottom: 16 }}>Próximo case pode ser o seu.</p>
          <button onClick={function() { window.dispatchEvent(new Event("sw3:openWidget")); }} style={{ background: "#00D4FF", color: "#0D1B2A", padding: "11px 26px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Contar minha ideia →</button>
        </div>

      </div>
    </section>
  );
}

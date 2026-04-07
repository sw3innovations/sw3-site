import { useState } from "react";

var cases = [
  {
    id: "vidros",
    index: "01",
    label: "Indústria de Vidro",
    tagline: "De planilha a sistema completo em semanas",
    challenge: "Operação comercial rodava em planilhas e WhatsApp manual. Pedidos se perdiam, sem visibilidade de pipeline, horas por dia em tarefas repetitivas.",
    solution: "Sistema web com automação de pedidos via n8n, dashboard de vendas em tempo real e fluxos automatizados de notificação por WhatsApp.",
    stack: ["React", "Node.js", "n8n", "PostgreSQL", "WhatsApp API"],
    results: [
      { value: "100%", detail: "pedidos automatizados" },
      { value: "Real-time", detail: "dashboard vendas" },
      { value: "~8 sem", detail: "kick-off ao deploy" },
    ],
    outcome: "Projeto virou base do AutoVendas — nosso produto B2B para automação de vendas industriais.",
    sector: "Indústria",
  },
  {
    id: "plataforma",
    index: "02",
    label: "Geração de Conteúdo Didático",
    tagline: "Plataforma de conteúdo com IA entregue em produção",
    challenge: "Produção de conteúdo didático era manual, lenta e cara. Sem padronização, sem escala, e com gargalo total na equipe de criação.",
    solution: "Plataforma web com geração assistida por IA, fluxo de revisão e publicação automatizada com qualidade consistente.",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "AWS"],
    results: [
      { value: "Prod", detail: "em produção" },
      { value: "2026", detail: "novas demandas" },
      { value: "Recorrente", detail: "cliente voltou" },
    ],
    outcome: "Primeiro case da SW3. Validou capacidade de entrega e abriu pipeline de novos projetos.",
    sector: "EdTech",
  },
  {
    id: "ecommerce",
    index: "03",
    label: "E-commerce de Automação",
    tagline: "Compra via WhatsApp com entrega express em 1 hora",
    challenge: "Distribuidor operava vendas por telefone e balcão. Sem canal digital, sem controle de estoque em tempo real.",
    solution: "E-commerce completo (PWA) com jornada via WhatsApp, pagamento integrado, emissão automática de NF-e e entrega em até 1h.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "WhatsApp API"],
    results: [
      { value: "1h", detail: "entrega express" },
      { value: "5 linhas", detail: "catálogo completo" },
      { value: "12 sem", detail: "kick-off ao go-live" },
    ],
    outcome: "Sistema end-to-end: do WhatsApp ao rastreamento de entrega, com NF-e automática.",
    sector: "Varejo",
  },
];

var STYLE = `
  @media (max-width: 768px) {
    .cases-master { grid-template-columns: 1fr !important; }
    .cases-list-panel { border-right: none !important; border-bottom: 1px solid #141417; }
    .cases-detail-panel { padding: 28px 20px !important; }
    .cases-metrics { grid-template-columns: repeat(3,1fr) !important; }
    .cases-challenge-grid { grid-template-columns: 1fr !important; }
    .cases-header { flex-direction: column !important; align-items: flex-start !important; }
    .cases-header p { text-align: left !important; max-width: 100% !important; }
  }
  @media (max-width: 480px) {
    .cases-metrics { grid-template-columns: 1fr 1fr !important; }
  }
`;

export default function Cases() {
  var _active = useState(cases[0].id);
  var active = _active[0];
  var setActive = _active[1];

  var activeCase = cases.find(function(c) { return c.id === active; });

  return (
    <section id="cases" style={{ padding: "100px 40px", background: "#0c0c0c", borderTop: "1px solid #141417", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLE}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div className="cases-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 18 }}>
              <span style={{ fontSize: 11, color: "#949494", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>cases</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 44px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.1 }}>
              Projetos que já entregamos
            </h2>
          </div>
          <p style={{ color: "#949494", fontSize: 14, maxWidth: 300, lineHeight: 1.65, textAlign: "right" }}>
            Cada projeto valida uma parte do modelo — e vira base para o próximo produto.
          </p>
        </div>

        {/* Master-detail */}
        <div className="cases-master" style={{ display: "grid", gridTemplateColumns: "300px 1fr", border: "1px solid #141417", borderRadius: 12, overflow: "hidden" }}>

          {/* Left list */}
          <div className="cases-list-panel" style={{ borderRight: "1px solid #141417" }}>
            {cases.map(function(c, i) {
              var isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={function() { setActive(c.id); }}
                  style={{
                    width: "100%", background: isActive ? "#0d0d0d" : "transparent",
                    border: "none", borderBottom: i < cases.length - 1 ? "1px solid #141417" : "none",
                    padding: "24px 24px 24px 28px", textAlign: "left",
                    cursor: "pointer", display: "flex", alignItems: "flex-start",
                    gap: 16, transition: "background 0.15s", position: "relative",
                  }}
                  onMouseEnter={function(e) { if (!isActive) e.currentTarget.style.background = "#0a0a0a"; }}
                  onMouseLeave={function(e) { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  {isActive && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "#5a8caa" }} />}

                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: isActive ? "#5a8caa" : "#2a2a2a", fontWeight: 600, marginTop: 2, flexShrink: 0, transition: "color 0.15s" }}>
                    {c.index}
                  </span>

                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                      {c.sector}
                    </span>
                    <h3 style={{ fontSize: 14, fontWeight: 500, color: isActive ? "#f5f5f7" : "#555", letterSpacing: "-0.01em", marginBottom: 4, transition: "color 0.15s", lineHeight: 1.3 }}>
                      {c.label}
                    </h3>
                    <p style={{ fontSize: 11.5, color: "#333", lineHeight: 1.5 }}>{c.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right detail */}
          <div key={activeCase.id} className="cases-detail-panel" style={{ padding: "36px 36px", background: "#0a0a0a", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Case title row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#5a8caa", letterSpacing: "0.12em", textTransform: "uppercase" }}>{activeCase.sector}</span>
                <h3 style={{ fontSize: 20, fontWeight: 500, color: "#f5f5f7", letterSpacing: "-0.02em", marginTop: 4 }}>{activeCase.label}</h3>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#222" }}>{activeCase.index} / 03</span>
            </div>

            {/* Metrics */}
            <div className="cases-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {activeCase.results.map(function(r, i) {
                return (
                  <div key={i} style={{ background: "#0c0c0c", border: "1px solid #141417", borderRadius: 8, padding: "16px 14px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 600, color: "#f5f5f7", letterSpacing: "-0.03em", marginBottom: 4, lineHeight: 1 }}>{r.value}</div>
                    <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{r.detail}</div>
                  </div>
                );
              })}
            </div>

            {/* Challenge + Solution */}
            <div className="cases-challenge-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["DESAFIO", activeCase.challenge], ["SOLUÇÃO", activeCase.solution]].map(function(item) {
                return (
                  <div key={item[0]} style={{ background: "#0c0c0c", border: "1px solid #141417", borderRadius: 8, padding: "16px 16px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#5a8caa", letterSpacing: "0.14em", marginBottom: 10 }}>{item[0]}</div>
                    <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.7 }}>{item[1]}</p>
                  </div>
                );
              })}
            </div>

            {/* Stack + Outcome side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {/* Stack */}
              <div style={{ background: "#0c0c0c", border: "1px solid #141417", borderRadius: 8, padding: "16px 16px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#949494", letterSpacing: "0.14em", marginBottom: 12 }}>STACK</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {activeCase.stack.map(function(s, i) {
                    return (
                      <span key={i} style={{ fontSize: 10.5, padding: "3px 10px", borderRadius: 999, background: "#111", border: "1px solid #1e1e1e", color: "#949494", fontFamily: "'DM Sans', sans-serif" }}>
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Outcome */}
              <div style={{ background: "#0c0c0c", border: "1px solid #141417", borderLeft: "2px solid #5a8caa", borderRadius: 8, padding: "16px 16px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#5a8caa", letterSpacing: "0.14em", marginBottom: 10 }}>RESULTADO</div>
                <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.7 }}>{activeCase.outcome}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 36, paddingTop: 28, borderTop: "1px solid #141417", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "#444" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#222", marginRight: 10 }}>//</span>
            Próximo case pode ser o seu.
          </p>
          <button
            onClick={function() { window.dispatchEvent(new Event("sw3:openWidget")); }}
            style={{ background: "#5a8caa", color: "#fff", padding: "11px 26px", borderRadius: 8, fontWeight: 500, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#4a7a96"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#5a8caa"; }}
          >Contar minha ideia →</button>
        </div>

      </div>
    </section>
  );
}

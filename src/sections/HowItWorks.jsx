var STYLE = `
  .hiw-bento { display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: auto; gap: 1px; }
  .hiw-cell-01 { grid-column: span 5; }
  .hiw-cell-02 { grid-column: span 7; }
  .hiw-cell-03 { grid-column: span 7; }
  .hiw-cell-04 { grid-column: span 5; }
  .hiw-cell-bottom { grid-column: span 12; }
  @media (max-width: 900px) {
    .hiw-bento { grid-template-columns: 1fr 1fr; gap: 1px; }
    .hiw-cell-01, .hiw-cell-02, .hiw-cell-03, .hiw-cell-04 { grid-column: span 1; }
    .hiw-cell-bottom { grid-column: span 2; }
  }
  @media (max-width: 560px) {
    .hiw-bento { grid-template-columns: 1fr; }
    .hiw-cell-01, .hiw-cell-02, .hiw-cell-03, .hiw-cell-04, .hiw-cell-bottom { grid-column: span 1; }
  }
`;

function TerminalBlock() {
  var lines = [
    { prompt: true, text: "solw3 init --project meu-sistema" },
    { prompt: false, text: "✓ Analisando requisitos..." },
    { prompt: false, text: "✓ Stack selecionada: React · Node · Postgres" },
    { prompt: false, text: "✓ Timeline estimada: 6 semanas" },
    { prompt: false, text: "✓ Proposta gerada em 12s" },
    { prompt: true, text: "solw3 build --start" },
    { prompt: false, text: "⟳ Agentes IA iniciados [14 ativos]" },
  ];

  return (
    <div style={{ background: "#060606", border: "1px solid #1a1a1a", borderRadius: 8, padding: "16px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, lineHeight: 1.8 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {["#ff5f57","#ffbd2e","#28ca41"].map(function(c, i) {
          return <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />;
        })}
      </div>
      {lines.map(function(l, i) {
        return (
          <div key={i} style={{ display: "flex", gap: 8, opacity: i > 4 ? 0.5 : 1 }}>
            <span style={{ color: l.prompt ? "#5a8caa" : "#2a2a2a", flexShrink: 0 }}>{l.prompt ? "→" : " "}</span>
            <span style={{ color: l.prompt ? "#e8e8e8" : "#555" }}>{l.text}</span>
          </div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <span style={{ color: "#2a2a2a" }}> </span>
        <span style={{ width: 7, height: 14, background: "#5a8caa", display: "inline-block", animation: "blink 1.1s step-end infinite" }} />
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

function AgentPulse() {
  var agents = ["Arquitetura", "Frontend", "Backend", "Database", "QA", "Deploy"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {agents.map(function(a, i) {
        var active = i < 4;
        return (
          <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: active ? "rgba(90,140,170,0.1)" : "#0d0d0d", border: "1px solid " + (active ? "rgba(90,140,170,0.3)" : "#141417") }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: active ? "#5a8caa" : "#222" }} />
            <span style={{ fontSize: 11, color: active ? "#5a8caa" : "#333", fontFamily: "'DM Sans', sans-serif" }}>{a}</span>
          </div>
        );
      })}
    </div>
  );
}

function MetricBadge({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 600, color: "#f5f5f7", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#444", marginTop: 5, letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
}

function TimelineStrip() {
  var steps = [
    { num: "01", title: "Conversa", time: "15–30 min" },
    { num: "02", title: "Proposta", time: "Instantâneo" },
    { num: "03", title: "Build", time: "Semanas" },
    { num: "04", title: "Entrega", time: "Contínuo" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
      {steps.map(function(s, i) {
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#5a8caa" : "#141417", border: "1px solid " + (i === 0 ? "#5a8caa" : "#1e1e1e"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: i === 0 ? "#fff" : "#333" }}>{s.num}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: i === 0 ? "#f5f5f7" : "#444" }}>{s.title}</div>
                  <div style={{ fontSize: 10, color: "#333", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{s.time}</div>
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 32, height: 1, background: "linear-gradient(to right, #1e1e1e, #141417)", flexShrink: 0, margin: "0 8px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function HowItWorks() {
  var cellBase = {
    background: "#080808",
    padding: "32px 28px",
    position: "relative",
    overflow: "hidden",
    transition: "background 0.2s",
  };

  return (
    <section id="como-funciona" style={{ padding: "100px 40px", background: "#080808", borderTop: "1px solid #141417", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLE}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>Processo</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.12, marginBottom: 14 }}>De conversa a sistema</h2>
          <p style={{ color: "#949494", fontSize: 16, maxWidth: 420, margin: "0 auto", lineHeight: 1.6 }}>Proposta completa em minutos, não meses.</p>
        </div>

        {/* Bento grid */}
        <div className="hiw-bento" style={{ border: "1px solid #141417", borderRadius: 12, overflow: "hidden" }}>

          {/* 01 — Conversa */}
          <div className="hiw-cell-01" style={{ ...cellBase, borderRight: "1px solid #141417" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#0d0d0d"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5a8caa", letterSpacing: "0.1em" }}>01 · CONVERSA</span>
              <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Sans', sans-serif", padding: "3px 10px", background: "#0d0d0d", border: "1px solid #141417", borderRadius: 999 }}>15–30 min</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 400, color: "#f5f5f7", letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.2 }}>Descreva o que precisa</h3>
            <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>IA mapeia requisitos, faz perguntas inteligentes e entende o contexto do seu negócio.</p>
            {/* Chat bubble visual */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ alignSelf: "flex-end", background: "#5a8caa", borderRadius: "14px 14px 4px 14px", padding: "9px 14px", maxWidth: "80%" }}>
                <span style={{ fontSize: 12, color: "#fff", lineHeight: 1.5 }}>Preciso de um sistema de vendas integrado com WhatsApp</span>
              </div>
              <div style={{ alignSelf: "flex-start", background: "#111", border: "1px solid #1a1a1a", borderRadius: "14px 14px 14px 4px", padding: "9px 14px", maxWidth: "85%" }}>
                <span style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>Entendido. Quantos vendedores? Usa NF-e hoje?</span>
              </div>
            </div>
          </div>

          {/* 02 — Proposta */}
          <div className="hiw-cell-02" style={{ ...cellBase, borderBottom: "1px solid #141417" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#0d0d0d"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5a8caa", letterSpacing: "0.1em" }}>02 · PROPOSTA</span>
              <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Sans', sans-serif", padding: "3px 10px", background: "#0d0d0d", border: "1px solid #141417", borderRadius: 999 }}>Instantâneo</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 400, color: "#f5f5f7", letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.2 }}>Escopo e preço em segundos</h3>
            <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7, marginBottom: 22 }}>Stack, timeline e proposta gerados automaticamente — sem reuniões de alinhamento.</p>

            <div style={{ display: "flex", gap: 16 }}>
              {/* Documento simulado */}
              <div style={{ flex: "1 1 0", background: "#060606", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 18px", minWidth: 0 }}>
                {/* Doc header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #141417" }}>
                  <div style={{ width: 18, height: 22, borderRadius: 3, border: "1px solid #5a8caa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ height: 1, background: "#5a8caa", borderRadius: 1 }} />
                      <div style={{ height: 1, background: "#5a8caa", borderRadius: 1, width: "60%" }} />
                      <div style={{ height: 1, background: "#5a8caa", borderRadius: 1 }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#f5f5f7", letterSpacing: "0.02em" }}>proposta_v1.pdf</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, color: "#333", marginTop: 1 }}>Gerado automaticamente</div>
                  </div>
                </div>
                {/* Doc line items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Stack", value: "React · Node · Postgres" },
                    { label: "Timeline", value: "6 semanas" },
                    { label: "Integrações", value: "WhatsApp · NF-e · Stripe" },
                  ].map(function(item, i) {
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.06em" }}>{item.label}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: "#888" }}>{item.value}</span>
                      </div>
                    );
                  })}
                  {/* Valor destaque */}
                  <div style={{ marginTop: 4, paddingTop: 10, borderTop: "1px solid #141417", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5a8caa", letterSpacing: "0.06em" }}>Investimento</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#f5f5f7", fontWeight: 500 }}>R$ 28.400</span>
                  </div>
                </div>
              </div>

              {/* Métricas verticais */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0, width: 130 }}>
                {[
                  { value: "12s", label: "Geração", accent: true },
                  { value: "R$0", label: "Custo p/ proposta", accent: false },
                  { value: "100%", label: "Automatizado", accent: false },
                ].map(function(m, i) {
                  return (
                    <div key={i} style={{ background: "#060606", border: "1px solid " + (m.accent ? "rgba(90,140,170,0.25)" : "#1a1a1a"), borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 600, color: m.accent ? "#5a8caa" : "#f5f5f7", letterSpacing: "-0.04em", lineHeight: 1 }}>{m.value}</div>
                      <div style={{ fontSize: 9.5, color: "#444", marginTop: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 03 — Build */}
          <div className="hiw-cell-03" style={{ ...cellBase, borderRight: "1px solid #141417" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#0d0d0d"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5a8caa", letterSpacing: "0.1em" }}>03 · EXECUÇÃO</span>
              <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Sans', sans-serif", padding: "3px 10px", background: "#0d0d0d", border: "1px solid #141417", borderRadius: 999 }}>Semanas</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 400, color: "#f5f5f7", letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.2 }}>Agentes constroem. Você valida.</h3>
            <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>14 agentes IA trabalhando em paralelo. Staging contínuo para revisão.</p>
            <AgentPulse />
          </div>

          {/* 04 — Entrega */}
          <div className="hiw-cell-04" style={{ ...cellBase }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#0d0d0d"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5a8caa", letterSpacing: "0.1em" }}>04 · ENTREGA</span>
              <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Sans', sans-serif", padding: "3px 10px", background: "#0d0d0d", border: "1px solid #141417", borderRadius: 999 }}>Contínuo</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 400, color: "#f5f5f7", letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.2 }}>Em produção, no seu repo</h3>
            <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>Sistema live com docs, código e suporte pós-entrega.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {["✓  Deploy automatizado", "✓  GitHub entregue", "✓  Documentação gerada", "✓  Suporte pós-lançamento"].map(function(item, i) {
                return (
                  <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: i === 0 ? "#5a8caa" : "#333" }}>{item}</div>
                );
              })}
            </div>
          </div>

          {/* Bottom full-width — Terminal + timeline */}
          <div className="hiw-cell-bottom" style={{ ...cellBase, borderTop: "1px solid #141417", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#0a0a0a"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
          >
            <TerminalBlock />
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.14em", marginBottom: 24 }}>PIPELINE COMPLETO</div>
              <TimelineStrip />
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #141417" }}>
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
                  Do primeiro chat até o sistema em produção — sem burocracia, sem reuniões intermináveis.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

var FEATURES = [
  "IA consultiva",
  "Constitution Library",
  "Agentes autônomos",
  "Deploy automatizado",
  "Audit contínuo",
  "Rastreabilidade total",
];

export default function ConhecaSolw3() {
  return (
    <section style={{ background: "#0B1628", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
        {/* Left — copy */}
        <div style={{ flex: "1 1 320px", minWidth: 280 }}>
          <p style={{ color: "#22D3EE", fontWeight: 700, fontSize: 11.5, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 14, fontFamily: "var(--mono)" }}>
            Conheça a SOLW3
          </p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#fff", lineHeight: 1.18, marginBottom: 18 }}>
            Do briefing ao software<br />
            <span style={{ color: "#22D3EE" }}>sem perder contexto</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 15.5, lineHeight: 1.65, marginBottom: 28, maxWidth: 420 }}>
            Nossa IA conduz a conversa de levantamento técnico, enquanto agentes autônomos geram especificação, plano e código — tudo rastreável e auditável.
          </p>

          {/* Feature pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {FEATURES.map(function (f) {
              return (
                <span key={f} style={{ padding: "5px 12px", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.18)", borderRadius: 20, color: "#94A3B8", fontSize: 12 }}>
                  {f}
                </span>
              );
            })}
          </div>

          <a
            href="https://solw3.tec.br"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", padding: "13px 26px", background: "transparent", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 10, color: "#22D3EE", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={function (e) { e.currentTarget.style.background = "rgba(34,211,238,0.08)"; }}
            onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}
          >
            Acessar plataforma completa →
          </a>
        </div>

        {/* Right — embedded chat demo */}
        <div style={{ flex: "1 1 320px", minWidth: 300, maxWidth: 420 }}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(34,211,238,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)", height: 440 }}>
            <iframe
              src="https://solw3.tec.br/chat/embed"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="SOLW3 IA — Demo"
              allow="clipboard-write"
            />
          </div>
          <p style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "#475569" }}>
            Teste agora — sem criar conta
          </p>
        </div>
      </div>
    </section>
  );
}

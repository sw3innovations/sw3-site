var MODALITIES = [
  { icon: "✦", title: "Projeto Novo", desc: "Sistema do zero. IA mapeia requisitos e precifica.", ticket: "Sob consulta", time: "2–20 semanas" },
  { icon: "⟳", title: "Refatoração", desc: "Modernizar sistema existente. Diagnóstico automático.", ticket: "Sob consulta", time: "4–16 semanas" },
  { icon: "⊕", title: "Extensão", desc: "Adicionar features ou integrações.", ticket: "Sob consulta", time: "1–8 semanas" },
  { icon: "⊞", title: "Squad IA", desc: "Time sob demanda no seu repo. 2-3x output.", ticket: "Sob consulta", time: "Mín. 3 meses" },
];

export default function Solutions() {
  return (
    <section id="solucoes" style={{ padding: "100px 40px", background: "#0c0c0c", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>O que fazemos</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.12, marginBottom: 14 }}>4 formas de trabalhar</h2>
          <p style={{ color: "#949494", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>Nossa equipe + IA conduzem do diagnóstico à entrega.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, border: "1px solid #141417", borderRadius: 12, overflow: "hidden" }}>
          {MODALITIES.map(function(mod, i) {
            return (
              <div key={i}
                style={{ background: "#0c0c0c", borderRight: i < 3 ? "1px solid #141417" : "none", padding: "32px 28px", transition: "background 0.2s", cursor: "default" }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#111111"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#0c0c0c"; }}
              >
                <div style={{ fontSize: 22, marginBottom: 20, color: "#f5f5f7", opacity: 0.5 }}>{mod.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 500, marginBottom: 10, color: "#f5f5f7", letterSpacing: "-0.02em" }}>{mod.title}</h3>
                <p style={{ fontSize: 14, color: "#949494", lineHeight: 1.65, marginBottom: 24 }}>{mod.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #141417", fontSize: 12 }}>
                  <span style={{ color: "#949494" }}>{mod.time}</span>
                  <span style={{ color: "#949494" }}>{mod.ticket}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

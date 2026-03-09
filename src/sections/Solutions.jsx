var MODALITIES = [
  { icon: "✦", title: "Projeto Novo", desc: "Sistema do zero. IA mapeia requisitos e precifica.", ticket: "Sob consulta", time: "2–20 semanas", color: "#7dd3fc" },
  { icon: "⟳", title: "Refatoração", desc: "Modernizar sistema existente. Diagnóstico automático.", ticket: "Sob consulta", time: "4–16 semanas", color: "#a78bfa" },
  { icon: "⊕", title: "Extensão", desc: "Adicionar features ou integrações.", ticket: "Sob consulta", time: "1–8 semanas", color: "#34d399" },
  { icon: "⊞", title: "Squad IA", desc: "Time sob demanda no seu repo. 2-3x output.", ticket: "Sob consulta", time: "Mín. 3 meses", color: "#fbbf24" },
];

export default function Solutions() {

  return (
    <section id="solucoes" style={{ padding: "80px 40px 100px", background: "#0F2132" }}>
      <div style={{ margin: "0 auto" }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "#94A3B8", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>O QUE FAZEMOS</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "#FFFFFF" }}>4 formas de trabalhar</h2>
          <p style={{ color: "#E2E8F0", fontSize: 14.5, maxWidth: 580, lineHeight: 1.6 }}>Chat com IA conduz do diagnóstico à entrega.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {MODALITIES.map(function(mod, i) {
            return (
              <div key={i} style={{ background: "#1B2838", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "28px 22px", transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", position: "relative", overflow: "hidden" }}
                onMouseEnter={function(e) { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = mod.color + "40"; }}
                onMouseLeave={function(e) { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 16, color: mod.color, opacity: 0.7 }}>{mod.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em", color: "#FFFFFF" }}>{mod.title}</h3>
                <p style={{ fontSize: 12.5, color: "#E2E8F0", lineHeight: 1.6, marginBottom: 18 }}>{mod.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 10.5, fontFamily: "var(--mono)" }}>
                  <span style={{ color: "#94A3B8" }}>{mod.time}</span>
                  <span style={{ color: "#94A3B8", fontWeight: 600 }}>{mod.ticket}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

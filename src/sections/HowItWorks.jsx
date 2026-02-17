var STEPS = [
  { num: "01", title: "Conversa", desc: "Descreva o que precisa. IA mapeia requisitos.", time: "15–30 min" },
  { num: "02", title: "Proposta", desc: "Escopo, stack, timeline e preço automáticos.", time: "Instantâneo" },
  { num: "03", title: "Execução", desc: "Agentes IA constroem. Você valida em staging.", time: "Semanas" },
  { num: "04", title: "Entrega", desc: "Sistema em produção, docs e código no GitHub.", time: "Contínuo" },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" style={{ padding: "100px 40px", background: "var(--bg-dark)", color: "#fff" }}>
      <div style={{ margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>COMO FUNCIONA</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>De conversa a sistema</h2>
          <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 560, lineHeight: 1.6 }}>Proposta completa em minutos, não meses.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {STEPS.map(function(s, i) {
            return (
              <div key={i} style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)", borderRadius: 12, padding: "28px 22px", transition: "all 0.3s" }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = "rgba(125,211,252,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 32, fontWeight: 700, color: "var(--accent)", opacity: 0.35, letterSpacing: "-0.02em" }}>{s.num}</div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{s.time}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text-light)" }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-light2)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

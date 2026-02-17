var INFO = [
  { label: "Sede", value: "Campina Grande — PB" },
  { label: "Foco", value: "IA, Automação e Software" },
  { label: "Modelo", value: "Projetos + Suporte contínuo" },
];

export default function About() {
  return (
    <section style={{ padding: "80px 40px", background: "var(--bg)" }}>
      <div style={{ margin: "0 auto" }}>
        <div className="quem-somos-card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "44px 48px", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>QUEM SOMOS</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.25 }}>Tecnologia que resolve</h3>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>Laboratório de tecnologia em Campina Grande-PB. IA + automação para criar e entregar sistemas completos.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 260 }}>
            {INFO.map(function(item, i) {
              return (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", fontWeight: 600, letterSpacing: "0.06em", minWidth: 48 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

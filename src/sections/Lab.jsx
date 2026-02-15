var PROJECTS = [
  { name: "AVM Brasil", desc: "Avaliação de imóveis com IA geoespacial. Laudos automatizados compatíveis com editais Caixa.", status: "Em desenvolvimento", color: "#7dd3fc" },
  { name: "Chat GIS", desc: "Interface conversacional para dados geoespaciais. Pergunte ao mapa em linguagem natural.", status: "Pesquisa", color: "#a78bfa" },
  { name: "OTW Health", desc: "Plataforma de saúde digital com IA para triagem, acompanhamento e integração hospitalar.", status: "Em desenvolvimento", color: "#34d399" },
];

export default function Lab() {
  return (
    <section id="lab" style={{ padding: "80px 40px", background: "var(--bg-dark)", color: "#fff" }}>
      <div style={{ margin: "0 auto" }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>SOLW3 LAB</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Pesquisa e produtos de IA avançada</h2>
          <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>Soluções de IA avançada que podem ser integradas como feature no seu projeto.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PROJECTS.map(function(p, i) {
            return (
              <div key={i} style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)", borderRadius: 12, padding: "28px 22px", transition: "all 0.3s" }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = p.color + "30"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: p.color }}>{p.name}</h3>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "3px 8px", borderRadius: 4, background: p.color + "15", border: "1px solid " + p.color + "25", color: p.color, fontWeight: 600, textTransform: "uppercase" }}>{p.status}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--text-light2)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

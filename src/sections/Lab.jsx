var PROJECTS = [
  { name: "AVM Brasil", setor: "Fintech · Imobiliário", desc: "Avaliação de imóveis com IA geoespacial. Laudos automatizados.", status: "Em dev" },
  { name: "Chat GIS", setor: "GeoTech", desc: "Conversa com mapas em linguagem natural.", status: "Pesquisa" },
  { name: "OTW Health", setor: "Saúde", desc: "Saúde digital com IA para triagem e acompanhamento.", status: "Em dev" },
];

var FEATURES = [
  "IA consultiva",
  "Constitution Library",
  "Agentes autônomos",
  "Deploy automatizado",
  "Audit contínuo",
  "Rastreabilidade total",
];

export default function Lab() {
  return (
    <section id="lab" style={{ padding: "100px 40px", background: "#080808", borderTop: "1px solid #141417", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>SOLW3 Lab</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.12, marginBottom: 14 }}>Produtos de IA avançada</h2>
          <p style={{ color: "#949494", fontSize: 16, maxWidth: 420, margin: "0 auto", lineHeight: 1.6 }}>Soluções que podem ser integradas no seu projeto.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: "1px solid #141417", borderRadius: 12, overflow: "hidden", marginBottom: 56 }}>
          {PROJECTS.map(function(p, i) {
            return (
              <div key={i} style={{ background: "#080808", borderRight: i < 2 ? "1px solid #141417" : "none", padding: "32px 28px", transition: "background 0.2s" }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#0e0e0e"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 500, color: "#f5f5f7", letterSpacing: "-0.02em" }}>{p.name}</h3>
                  <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, background: "#111", border: "1px solid #141417", color: "#949494", whiteSpace: "nowrap", marginLeft: 8 }}>{p.status}</span>
                </div>
                <div style={{ fontSize: 11, color: "#5a8caa", marginBottom: 12, fontWeight: 400 }}>{p.setor}</div>
                <p style={{ fontSize: 14, color: "#949494", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* SOLW3 platform block */}
        <div style={{ border: "1px solid #141417", borderRadius: 12, padding: "48px 40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 10px", borderRadius: 999, border: "1px solid #141417", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5a8caa" }} />
            <span style={{ fontSize: 11, color: "#949494", letterSpacing: "0.08em", fontWeight: 400 }}>PLATAFORMA EM PRODUÇÃO · 14 AGENTES IA · PIPELINE SDD</span>
          </div>

          <h3 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 400, color: "#f5f5f7", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.03em" }}>Conheça a SOLW3</h3>
          <p style={{ color: "#949494", fontSize: 15, lineHeight: 1.7, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            Nossa AI Software Factory que entrega sistemas completos com Constitution, Spec, Arquitetura, Código e Auditoria.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36 }}>
            {FEATURES.map(function(f) {
              return (
                <span key={f} style={{ padding: "5px 14px", background: "#111", border: "1px solid #141417", borderRadius: 999, color: "#949494", fontSize: 13 }}>{f}</span>
              );
            })}
          </div>

          <a href="https://solw3.tec.br" target="_blank" rel="noreferrer"
            style={{ display: "inline-block", padding: "13px 32px", background: "#5a8caa", borderRadius: 10, color: "#fff", fontWeight: 500, fontSize: 15, textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#4a7a96"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#5a8caa"; }}
          >Acessar plataforma →</a>
        </div>

      </div>
    </section>
  );
}

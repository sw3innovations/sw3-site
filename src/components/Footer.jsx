import { Logo } from "./Logo";

var NAV_GROUPS = [
  {
    title: "Serviços",
    links: [
      { l: "Soluções", h: "#solucoes" },
      { l: "Como Funciona", h: "#como-funciona" },
      { l: "Cases", h: "#cases" },
      { l: "Pós-Entrega", h: "#planos" },
    ],
  },
  {
    title: "Produto",
    links: [
      { l: "Lab", h: "#lab" },
      { l: "SOLW3", h: "https://solw3.tec.br" },
      { l: "Portfólio", h: "#solw3" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { l: "Contato", h: "#contato" },
      { l: "admin@sw3.tec.br", h: "mailto:admin@sw3.tec.br" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0c0c0c", borderTop: "1px solid #141417", padding: "64px 40px 40px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, auto)", gap: 64, marginBottom: 64, flexWrap: "wrap" }}>

          {/* Brand */}
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#f5f5f7", marginBottom: 14 }}>
              <Logo size={26} />
              <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em" }}>SW3</span>
            </a>
            <p style={{ fontSize: 13, color: "#949494", lineHeight: 1.65, maxWidth: 220 }}>
              Tecnologia que resolve. Sistemas construídos pela SW3 com processos de IA.
            </p>
          </div>

          {/* Link groups */}
          {NAV_GROUPS.map(function(group) {
            return (
              <div key={group.title}>
                <div style={{ fontSize: 12, color: "#f5f5f7", fontWeight: 500, marginBottom: 16, letterSpacing: "0.02em" }}>{group.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {group.links.map(function(link) {
                    return (
                      <a key={link.l} href={link.h} style={{ fontSize: 14, color: "#949494", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={function(e) { e.target.style.color = "#f5f5f7"; }}
                        onMouseLeave={function(e) { e.target.style.color = "#949494"; }}
                      >{link.l}</a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ borderTop: "1px solid #141417", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#949494" }}>© 2026 SW3 Innovations Brasil LTDA.</p>
          <p style={{ fontSize: 12, color: "#949494" }}>CNPJ 64.948.554/0001-06</p>
        </div>

      </div>
    </footer>
  );
}

var PORTFOLIO = [
  { name: "AutoVendas", setor: "Indústria", desc: "Automação de vendas B2B para distribuidores industriais.", status: "Em produção" },
  { name: "AVM Brasil", setor: "Fintech · Imobiliário", desc: "Avaliação de imóveis com IA geoespacial e laudos automatizados.", status: "Em desenvolvimento" },
  { name: "ContentHub", setor: "Marketing", desc: "Geração e publicação de conteúdo didático com IA.", status: "Entregue" },
  { name: "SmartCommerce", setor: "Varejo", desc: "E-commerce inteligente com pedidos via WhatsApp e entrega express.", status: "Entregue" },
  { name: "OTW", setor: "Saúde", desc: "Saúde digital com triagem por IA.", status: "Em desenvolvimento" },
  { name: "OTW Health", setor: "Saúde Ocupacional", desc: "Monitoramento e acompanhamento de saúde ocupacional com IA.", status: "Em desenvolvimento" },
];

function statusColor(s) {
  if (s === "Em produção") return "#5a8caa";
  if (s === "Entregue") return "#34d399";
  return "#949494";
}

export default function ConhecaSolw3() {
  return (
    <section id="solw3" style={{ padding: "100px 40px", background: "#080808", borderTop: "1px solid #141417", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>Portfólio</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.12, marginBottom: 14 }}>Como entregamos com essa qualidade?</h2>
          <p style={{ color: "#949494", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Nossos próprios produtos passam pelo mesmo pipeline SDD com 7 gates de qualidade.
          </p>
        </div>

        <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: "1px solid #141417", borderRadius: 12, overflow: "hidden" }}>
          {PORTFOLIO.map(function(p, i) {
            var sc = statusColor(p.status);
            var isLastRow = i >= 3;
            var isLastCol = i % 3 === 2;
            return (
              <div key={p.name} style={{
                background: "#080808",
                borderRight: !isLastCol ? "1px solid #141417" : "none",
                borderTop: isLastRow ? "1px solid #141417" : "none",
                padding: "28px 24px",
                transition: "background 0.2s",
              }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#0e0e0e"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#080808"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 500, color: "#f5f5f7", letterSpacing: "-0.02em" }}>{p.name}</h4>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, border: "1px solid " + sc + "40", color: sc, whiteSpace: "nowrap", marginLeft: 8 }}>{p.status}</span>
                </div>
                <div style={{ fontSize: 11, color: "#5a8caa", marginBottom: 10 }}>{p.setor}</div>
                <p style={{ fontSize: 13, color: "#949494", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

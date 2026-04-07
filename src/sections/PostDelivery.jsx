var CATEGORIES = [
  {
    title: "Suporte & Manutenção",
    plans: [
      { name: "Básico", price: "Sob consulta", feat: "Bugs + monitoramento · SLA 48h" },
      { name: "Pro", price: "Sob consulta", feat: "Bugs + segurança + melhorias · SLA 24h" },
      { name: "Enterprise", price: "Sob consulta", feat: "Suporte dedicado · SLA 4h" },
    ],
  },
  {
    title: "Managed Service",
    plans: [
      { name: "Basic", price: "Sob consulta", feat: "Hosting + backups" },
      { name: "Pro", price: "Sob consulta", feat: "Hosting + evoluções + relatório" },
      { name: "Full", price: "Sob consulta", feat: "Operação completa" },
    ],
  },
  {
    title: "Retainer",
    plans: [
      { name: "10h / mês", price: "Sob consulta", feat: "Features e integrações" },
      { name: "20h / mês", price: "Sob consulta", feat: "Features + refatoração" },
      { name: "40h / mês", price: "Sob consulta", feat: "Meio dev dedicado" },
    ],
  },
];

export default function PostDelivery() {
  return (
    <section id="planos" style={{ padding: "100px 40px", background: "#0c0c0c", borderTop: "1px solid #141417", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>Após a entrega</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.12, marginBottom: 14 }}>Sistema sempre atualizado</h2>
          <p style={{ color: "#949494", fontSize: 16, maxWidth: 420, margin: "0 auto", lineHeight: 1.6 }}>Manutenção, operação ou evolução contínua.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: "1px solid #141417", borderRadius: 12, overflow: "hidden" }}>
          {CATEGORIES.map(function(cat, i) {
            return (
              <div key={i} style={{ background: "#0c0c0c", borderRight: i < 2 ? "1px solid #141417" : "none", padding: "36px 28px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "#f5f5f7", marginBottom: 24, letterSpacing: "-0.02em" }}>{cat.title}</h3>
                {cat.plans.map(function(p, j) {
                  return (
                    <div key={j} style={{ padding: "16px 0", borderTop: j > 0 ? "1px solid #141417" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7" }}>{p.name}</span>
                        <span style={{ fontSize: 11, color: "#5a8caa", fontWeight: 500 }}>{p.price}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#949494", lineHeight: 1.5 }}>{p.feat}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={function() { window.dispatchEvent(new Event("sw3:openWidget")); }}
            style={{ background: "transparent", color: "#f5f5f7", padding: "12px 32px", borderRadius: 10, fontWeight: 400, fontSize: 15, border: "1px solid #141417", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#f5f5f7"; }}
            onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#141417"; }}
          >Falar sobre plano →</button>
        </div>

      </div>
    </section>
  );
}

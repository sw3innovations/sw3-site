var CATEGORIES = [
  { title: "Suporte & Manutenção", plans: [{ name: "Básico", price: "Sob consulta", feat: "Bugs + monitoramento • SLA 48h" }, { name: "Pro", price: "Sob consulta", feat: "Bugs + segurança + melhorias • SLA 24h" }, { name: "Enterprise", price: "Sob consulta", feat: "Suporte dedicado • SLA 4h" }] },
  { title: "Managed Service", plans: [{ name: "Basic", price: "Sob consulta", feat: "Hosting + backups" }, { name: "Pro", price: "Sob consulta", feat: "Hosting + evoluções + relatório" }, { name: "Full", price: "Sob consulta", feat: "Operação completa" }] },
  { title: "Retainer", plans: [{ name: "10h", price: "Sob consulta", feat: "Features e integrações" }, { name: "20h", price: "Sob consulta", feat: "Features + refatoração" }, { name: "40h", price: "Sob consulta", feat: "Meio dev dedicado" }] },
];

export default function PostDelivery() {
  return (
    <section id="planos" style={{ padding: "80px 40px", background: "var(--bg)" }}>
      <div style={{ margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>APÓS A ENTREGA</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Sistema sempre atualizado</h2>
          <p style={{ color: "var(--text2)", fontSize: 14.5, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>Manutenção, operação ou evolução contínua.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {CATEGORIES.map(function(cat, i) {
            return (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, letterSpacing: "-0.01em" }}>{cat.title}</h3>
                {cat.plans.map(function(p, j) {
                  return (
                    <div key={j} style={{ padding: "12px 0", borderTop: j > 0 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                        <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--navy)", fontWeight: 600 }}>{p.price}</span>
                      </div>
                      <p style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5 }}>{p.feat}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

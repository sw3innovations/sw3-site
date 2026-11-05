import SectionHeader from "../components/SectionHeader";
import { whatsappUrl } from "../content";

export default function PostDelivery({ t }) {
  return (
    <section id="planos" style={{ padding: "100px 40px", background: "#0c0c0c", borderTop: "1px solid #1f1f23", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#1f1f23", border: "1px solid #1f1f23", borderRadius: 12, overflow: "hidden" }}>
          {t.categories.map(function(cat, i) {
            return (
              <div key={i} style={{ background: "#0c0c0c", padding: "36px 28px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "#f5f5f7", marginBottom: 24, letterSpacing: "-0.02em" }}>{cat.title}</h3>
                {cat.plans.map(function(p, j) {
                  return (
                    <div key={j} style={{ padding: "16px 0", borderTop: j > 0 ? "1px solid #1f1f23" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7" }}>{p.name}</span>
                        <span style={{ fontSize: 11, color: "#5a8caa", fontWeight: 500 }}>{t.price}</span>
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
          <a href={whatsappUrl(t.ctaText)} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "transparent", color: "#f5f5f7", padding: "12px 32px", borderRadius: 10, fontWeight: 400, fontSize: 15, border: "1px solid #2a2a2e", textDecoration: "none", transition: "border-color 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#f5f5f7"; }}
            onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#2a2a2e"; }}
          >{t.cta} →</a>
        </div>
      </div>
    </section>
  );
}

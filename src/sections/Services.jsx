import SectionHeader from "../components/SectionHeader";

export default function Services({ t }) {
  return (
    <section id="servicos" style={{ padding: "100px 40px", background: "#0c0c0c", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#1f1f23", border: "1px solid #1f1f23", borderRadius: 12, overflow: "hidden" }}>
          {t.items.map(function(item, i) {
            return (
              <div key={i} style={{ background: "#0c0c0c", padding: "36px 28px", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 12, color: "#5a8caa", fontWeight: 600, marginBottom: 18 }}>{"0" + (i + 1)}</span>
                <h3 style={{ fontSize: 19, fontWeight: 500, marginBottom: 12, color: "#f5f5f7", letterSpacing: "-0.02em" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#949494", lineHeight: 1.65, marginBottom: 24 }}>{item.desc}</p>
                <ul style={{ listStyle: "none", marginTop: "auto", paddingTop: 18, borderTop: "1px solid #1f1f23", display: "flex", flexDirection: "column", gap: 9 }}>
                  {item.points.map(function(p, j) {
                    return (
                      <li key={j} style={{ fontSize: 13, color: "#b4b4b8", display: "flex", gap: 8 }}>
                        <span style={{ color: "#5a8caa" }}>✓</span>{p}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

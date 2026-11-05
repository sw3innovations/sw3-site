import SectionHeader from "../components/SectionHeader";

export default function Cases({ t }) {
  return (
    <section id="casos" style={{ padding: "100px 40px", background: "#0c0c0c", borderTop: "1px solid #1f1f23", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {t.items.map(function(c) {
            return (
              <article key={c.id} style={{ background: "#0f0f11", border: "1px solid #1f1f23", borderRadius: 12, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <span style={{ fontSize: 11, color: "#5a8caa", letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.sector}</span>
                  <h3 style={{ fontSize: 19, fontWeight: 500, color: "#f5f5f7", letterSpacing: "-0.02em", marginTop: 6, marginBottom: 4 }}>{c.label}</h3>
                  <p style={{ fontSize: 13.5, color: "#949494" }}>{c.tagline}</p>
                </div>

                {[[t.challengeLabel, c.challenge], [t.solutionLabel, c.solution]].filter(function(item) { return item[1]; }).map(function(item) {
                  return (
                    <div key={item[0]}>
                      <div style={{ fontSize: 11, color: "#6b6b70", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{item[0]}</div>
                      <p style={{ fontSize: 14, color: "#b4b4b8", lineHeight: 1.65 }}>{item[1]}</p>
                    </div>
                  );
                })}

                <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid #1f1f23", display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {c.stack.map(function(s) {
                    return (
                      <span key={s} style={{ fontSize: 11.5, padding: "3px 10px", borderRadius: 999, background: "#141417", border: "1px solid #24242a", color: "#949494" }}>{s}</span>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

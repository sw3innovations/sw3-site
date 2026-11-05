import SectionHeader from "../components/SectionHeader";

export default function HowWeWork({ t }) {
  return (
    <section id="como-trabalhamos" style={{ padding: "100px 40px", background: "#0c0c0c", borderTop: "1px solid #1f1f23", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader badge={t.badge} title={t.title} />

        <ol className="grid-5" style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "#1f1f23", border: "1px solid #1f1f23", borderRadius: 12, overflow: "hidden" }}>
          {t.steps.map(function(s, i) {
            return (
              <li key={i} style={{ background: "#0c0c0c", padding: "28px 22px" }}>
                <span style={{ fontSize: 12, color: "#5a8caa", fontWeight: 600 }}>{"0" + (i + 1)}</span>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "#f5f5f7", margin: "12px 0 8px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: "#949494", lineHeight: 1.6 }}>{s.desc}</p>
              </li>
            );
          })}
        </ol>

        <p style={{ textAlign: "center", marginTop: 36, fontSize: 14, color: "#b4b4b8" }}>{t.principle}</p>
      </div>
    </section>
  );
}

export default function SectionHeader({ badge, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #1f1f23", marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>{badge}</span>
      </div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.12, marginBottom: subtitle ? 14 : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: "#949494", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

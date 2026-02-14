import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--border-dark)", padding: "20px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={18} />
          <span style={{ fontWeight: 700, fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>SW3 INNOVATIONS BRASIL LTDA</span>
        </div>
        <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)", fontFamily: "var(--mono)" }}>© 2026 SW3 Innovations. Powered by SOLW3.</p>
      </div>
    </footer>
  );
}

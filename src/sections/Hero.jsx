import TerminalAnimation from "./TerminalAnimation";

export default function Hero() {
  return (
    <section style={{ background: "var(--bg-dark)", color: "#fff", position: "relative", overflow: "hidden", padding: "140px 40px 100px", minHeight: 560 }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(125,211,252,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)" }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(125,211,252,0.08), transparent 60%)", pointerEvents: "none" }} />

      <div style={{ margin: "0 auto", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
        <div className="hero-text" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20, opacity: 0.9 }}>TECNOLOGIA QUE RESOLVE</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 20 }}>Descreva sua ideia.<br /><span style={{ color: "var(--accent)" }}>A IA constrói o sistema.</span></h1>
          <p style={{ fontSize: 16, color: "var(--text-light2)", lineHeight: 1.7, marginBottom: 36, maxWidth: 560 }}>Converse com a IA, receba proposta em tempo real, acompanhe agentes construindo.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://wa.me/5583981751871?text=Oi%2C%20vim%20do%20site%20SOLW3" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, textDecoration: "none", border: "none", display: "inline-block" }}>WhatsApp</a>
          </div>
          <div className="pipeline-badges" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 40 }}>
            {["Conversa", "Proposta", "Execução", "Entrega", "Suporte"].map(function(s, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 14px", borderRadius: 5, fontSize: 10, color: i < 4 ? "var(--accent)" : "rgba(255,255,255,0.35)", fontFamily: "var(--mono)", fontWeight: 600, whiteSpace: "nowrap" }}>{s}</div>
                  {i < 4 && <div style={{ width: 16, height: 1, background: "rgba(125,211,252,0.2)" }} />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="hero-terminal" style={{ flex: "0 0 480px", minWidth: 320 }}>
          <TerminalAnimation />
        </div>
      </div>
    </section>
  );
}

import { Logo } from "../components/Logo";
import { whatsappUrl } from "../content";

export default function Hero({ t, whatsappText }) {
  return (
    <section style={{
      background: "#0c0c0c",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 40px 80px",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Glow orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-18%", left: "-10%", width: "55%", height: "60%", background: "radial-gradient(circle, rgba(90,140,170,0.28) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "-12%", width: "50%", height: "55%", background: "radial-gradient(circle, rgba(90,140,170,0.20) 0%, transparent 70%)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "25%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(140,120,180,0.15) 0%, transparent 70%)", filter: "blur(90px)" }} />
      </div>

      {/* Edge fades */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom, #0c0c0c, transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top, #0c0c0c, transparent)", pointerEvents: "none", zIndex: 1 }} />

      <div style={{ maxWidth: 760, width: "100%", margin: "0 auto", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          padding: "7px 18px 7px 10px",
        }}>
          <Logo size={22} />
          <span style={{ fontSize: 13.5, fontWeight: 400, letterSpacing: "0.01em", color: "rgba(255,255,255,0.6)" }}>{t.eyebrow}</span>
        </div>

        <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 400, lineHeight: 1.07, letterSpacing: "-0.03em", marginBottom: 24, color: "#f5f5f7" }}>
          {t.title[0]}<br />{t.title[1]}
        </h1>

        <p style={{ fontSize: 17, color: "#949494", lineHeight: 1.6, marginBottom: 44, maxWidth: 560, fontWeight: 400 }}>{t.subtitle}</p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <a href={whatsappUrl(whatsappText)} target="_blank" rel="noopener noreferrer"
            style={{ background: "#5a8caa", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 500, fontSize: 16, textDecoration: "none", transition: "background 0.2s", boxShadow: "0 0 40px rgba(90,140,170,0.15)" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#4a7a96"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#5a8caa"; }}
          >{t.cta}</a>
          <a href="#casos"
            style={{ background: "transparent", color: "#f5f5f7", padding: "14px 32px", borderRadius: 10, fontWeight: 400, fontSize: 16, textDecoration: "none", border: "1px solid #2a2a2e", transition: "border-color 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#f5f5f7"; }}
            onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#2a2a2e"; }}
          >{t.secondary}</a>
        </div>

        <p style={{ fontSize: 13, color: "#6b6b70" }}>{t.note}</p>
      </div>
    </section>
  );
}

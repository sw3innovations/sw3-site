import { Logo } from "../components/Logo";

var PARTNERS = ["AutoVendas", "ContentHub", "SmartCommerce", "AVM Brasil", "OTW Health"];

export default function Hero() {
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
        {/* Top-left — azul accent */}
        <div style={{
          position: "absolute",
          top: "-18%",
          left: "-10%",
          width: "55%",
          height: "60%",
          background: "radial-gradient(circle, rgba(90,140,170,0.28) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Center-right — azul frio */}
        <div style={{
          position: "absolute",
          top: "20%",
          right: "-12%",
          width: "50%",
          height: "55%",
          background: "radial-gradient(circle, rgba(90,140,170,0.20) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />
        {/* Bottom-center — sutil warm */}
        <div style={{
          position: "absolute",
          bottom: "-15%",
          left: "25%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle, rgba(140,120,180,0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />
        {/* Noise grain overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }} />
      </div>

      {/* Edge fades */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom, #0c0c0c, transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top, #0c0c0c, transparent)", pointerEvents: "none", zIndex: 1 }} />

      {/* Content */}
      <div style={{ maxWidth: 760, width: "100%", margin: "0 auto", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        {/* Eyebrow badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          padding: "7px 18px 7px 10px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}>
          <Logo size={22} />
          <span style={{ fontSize: 13.5, fontWeight: 400, letterSpacing: "0.01em", color: "rgba(255,255,255,0.6)" }}>
            SW3 Innovations · Software e Soluções com IA
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 5.5vw, 64px)",
          fontWeight: 400,
          lineHeight: 1.07,
          letterSpacing: "-0.03em",
          marginBottom: 24,
          color: "#f5f5f7",
        }}>
          Descreva sua ideia.<br />
          Nós construímos o sistema.
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 17, color: "#949494", lineHeight: 1.6, marginBottom: 48, maxWidth: 500, fontWeight: 400 }}>
          Fale com a SW3, receba proposta em tempo real e acompanhe a construção do seu sistema.
        </p>

        {/* CTA */}
        <button
          onClick={function() { window.dispatchEvent(new Event("sw3:openWidget")); }}
          style={{
            background: "#5a8caa",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: 10,
            fontWeight: 500,
            fontSize: 16,
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.01em",
            marginBottom: 96,
            transition: "background 0.2s",
            boxShadow: "0 0 40px rgba(90,140,170,0.15)",
          }}
          onMouseEnter={function(e) { e.currentTarget.style.background = "#4a7a96"; }}
          onMouseLeave={function(e) { e.currentTarget.style.background = "#5a8caa"; }}
        >
          Falar com a SW3
        </button>

        {/* Trust */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13.5, color: "#f5f5f7", fontWeight: 400 }}>Projetos entregues</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {[0,1,2,3,4].map(function(i) {
              return (
                <svg key={i} width="16" height="16" viewBox="0 0 20 19" fill="white">
                  <path d="M10 0L12.35 6.18H19L13.82 10.01L15.88 16.18L10 12.35L4.12 16.18L6.18 10.01L1 6.18H7.65L10 0Z"/>
                </svg>
              );
            })}
            <span style={{ fontSize: 14, color: "#949494", marginLeft: 8 }}>4.8 / 5</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {PARTNERS.map(function(p, i) {
              return (
                <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>{p}</span>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

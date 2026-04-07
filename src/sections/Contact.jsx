export default function Contact() {
  return (
    <section id="contato" style={{ padding: "120px 40px", background: "#0c0c0c", borderTop: "1px solid #141417", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #141417", marginBottom: 28 }}>
          <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>Contato</span>
        </div>

        <h2 style={{ fontSize: "clamp(30px, 4.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16, color: "#f5f5f7" }}>
          Descreva sua ideia.<br />A SW3 constrói.
        </h2>

        <p style={{ color: "#949494", fontSize: 16, marginBottom: 48, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 48px" }}>
          Fale com a SW3 agora ou converse direto pelo WhatsApp.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          <button
            onClick={function() { window.dispatchEvent(new Event("sw3:openWidget")); }}
            style={{ background: "#5a8caa", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 500, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#4a7a96"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#5a8caa"; }}
          >Falar com a SW3</button>

          <a href="https://wa.me/5583981751871?text=Oi%2C%20vim%20do%20site%20SW3" target="_blank" rel="noopener noreferrer"
            style={{ background: "transparent", color: "#f5f5f7", padding: "14px 32px", borderRadius: 10, fontWeight: 400, fontSize: 15, border: "1px solid #141417", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "border-color 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#f5f5f7"; }}
            onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#141417"; }}
          >WhatsApp</a>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", fontSize: 12, color: "#949494" }}>
          <span>SW3 Innovations Brasil LTDA</span>
          <span style={{ color: "#141417" }}>·</span>
          <span>CNPJ 64.948.554/0001-06</span>
          <span style={{ color: "#141417" }}>·</span>
          <span>Campina Grande — PB</span>
        </div>

      </div>
    </section>
  );
}

import { whatsappUrl, WHATSAPP_EXIBICAO, EMAIL_CONTATO } from "../content";

export default function Contact({ t, whatsappText }) {
  var channels = [
    { label: t.whatsapp, value: WHATSAPP_EXIBICAO, href: whatsappUrl(whatsappText), external: true, primary: true },
    { label: t.email, value: EMAIL_CONTATO, href: "mailto:" + EMAIL_CONTATO },
  ];

  return (
    <section id="contato" style={{ padding: "120px 40px", background: "#0c0c0c", borderTop: "1px solid #1f1f23", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid #1f1f23", marginBottom: 28 }}>
          <span style={{ fontSize: 12, color: "#949494", fontWeight: 400 }}>{t.badge}</span>
        </div>

        <h2 style={{ fontSize: "clamp(30px, 4.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16, color: "#f5f5f7" }}>{t.title}</h2>

        <p style={{ color: "#949494", fontSize: 16, lineHeight: 1.6, maxWidth: 460, margin: "0 auto 48px" }}>{t.subtitle}</p>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 56 }}>
          {channels.map(function(c) {
            return (
              <a key={c.label} href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined}
                style={{ display: "block", padding: "20px 18px", borderRadius: 12, textDecoration: "none", background: c.primary ? "#5a8caa" : "transparent", border: c.primary ? "1px solid #5a8caa" : "1px solid #2a2a2e", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#f5f5f7"; }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = c.primary ? "#5a8caa" : "#2a2a2e"; }}
              >
                <div style={{ fontSize: 12, color: c.primary ? "rgba(255,255,255,0.8)" : "#949494", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#fff", wordBreak: "break-word" }}>{c.value}</div>
              </a>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", fontSize: 12, color: "#949494" }}>
          {t.company.map(function(line, i) {
            return <span key={i}>{line}</span>;
          })}
        </div>
      </div>
    </section>
  );
}

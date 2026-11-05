import { Logo } from "./Logo";
import { EMAIL_CONTATO, WHATSAPP_EXIBICAO, whatsappUrl } from "../content";

export default function Footer({ t, whatsappText }) {
  var linkStyle = { fontSize: 14, color: "#949494", textDecoration: "none" };

  return (
    <footer style={{ background: "#0c0c0c", borderTop: "1px solid #1f1f23", padding: "64px 40px 40px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 64, marginBottom: 56 }}>
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#f5f5f7", marginBottom: 14 }}>
              <Logo size={26} />
              <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em" }}>SW3</span>
            </a>
            <p style={{ fontSize: 13, color: "#949494", lineHeight: 1.65, maxWidth: 240 }}>{t.footer.tagline}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.nav.map(function(n) {
              return <a key={n.h} href={n.h} style={linkStyle}>{n.l}</a>;
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href={whatsappUrl(whatsappText)} target="_blank" rel="noopener noreferrer" style={linkStyle}>{WHATSAPP_EXIBICAO}</a>
            <a href={"mailto:" + EMAIL_CONTATO} style={linkStyle}>{EMAIL_CONTATO}</a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1f1f23", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#949494" }}>{t.footer.rights}</p>
          <p style={{ fontSize: 12, color: "#949494" }}>CNPJ 64.948.554/0001-06</p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { whatsappUrl } from "../content";

export default function Navbar({ t }) {
  var _m = useState(false);
  var showMenu = _m[0];
  var setShowMenu = _m[1];

  var langLinkStyle = { color: "#949494", textDecoration: "none", fontSize: 14, fontWeight: 500, border: "1px solid #2a2a2e", borderRadius: 6, padding: "4px 10px" };
  var whatsappBtnStyle = { background: "#f5f5f7", color: "#0c0c0c", padding: "8px 20px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none" };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 40px", background: "rgba(8,8,8,0.6)", backdropFilter: "blur(13px)", WebkitBackdropFilter: "blur(13px)", borderBottom: "1px solid #1f1f23", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#fff" }}>
            <Logo size={38} />
            <div>
              <div style={{ fontWeight: 500, fontSize: 15, letterSpacing: "-0.03em", lineHeight: 1, color: "#f5f5f7" }}>SW3</div>
              <div style={{ fontSize: 7.5, color: "#949494", letterSpacing: "0.14em", fontWeight: 500, textTransform: "uppercase" }}>Innovations</div>
            </div>
          </a>
          <div className="nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {t.nav.map(function(n) {
              return (
                <a key={n.h} href={n.h} style={{ color: "#949494", textDecoration: "none", fontSize: 15, fontWeight: 400, transition: "color 0.2s" }}
                  onMouseEnter={function(e) { e.target.style.color = "#f5f5f7"; }}
                  onMouseLeave={function(e) { e.target.style.color = "#949494"; }}
                >{n.l}</a>
              );
            })}
            <Link to={t.langSwitch.href} style={langLinkStyle}>{t.langSwitch.label}</Link>
            <a href={whatsappUrl(t.whatsappText)} target="_blank" rel="noopener noreferrer" style={whatsappBtnStyle}>WhatsApp</a>
          </div>
          <button className="nav-hamburger" aria-label="Menu" onClick={function() { setShowMenu(!showMenu); }} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 1002 }}>
            <div style={{ width: 20, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.3s", transform: showMenu ? "rotate(45deg) translate(2.5px, 2.5px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.3s", opacity: showMenu ? 0 : 1 }} />
            <div style={{ width: 20, height: 2, background: "#fff", transition: "all 0.3s", transform: showMenu ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {showMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#0c0c0c", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, fontFamily: "'DM Sans', sans-serif" }}>
          {t.nav.map(function(n) {
            return <a key={n.h} href={n.h} onClick={function() { setShowMenu(false); }} style={{ color: "#b4b4b8", textDecoration: "none", fontSize: 22, fontWeight: 400 }}>{n.l}</a>;
          })}
          <Link to={t.langSwitch.href} onClick={function() { setShowMenu(false); }} style={langLinkStyle}>{t.langSwitch.label}</Link>
          <a href={whatsappUrl(t.whatsappText)} target="_blank" rel="noopener noreferrer" style={Object.assign({}, whatsappBtnStyle, { padding: "12px 32px" })}>WhatsApp</a>
        </div>
      )}
    </>
  );
}

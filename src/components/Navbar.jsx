import { useState } from "react";
import { Logo } from "./Logo";

var NAV_LINKS = [
  { l: "Soluções", h: "#solucoes" },
  { l: "Como Funciona", h: "#como-funciona" },
  { l: "Cases", h: "#cases" },
  { l: "Pós-Entrega", h: "#planos" },
  { l: "Lab", h: "#lab" },
  { l: "Contato", h: "#contato" },
];

export default function Navbar({ scrollY }) {
  var _m = useState(false);
  var showMenu = _m[0];
  var setShowMenu = _m[1];
  var navSolid = scrollY > 60;

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 40px", background: navSolid ? "rgba(13,27,42,0.95)" : "rgba(15,23,42,0.0)", backdropFilter: navSolid ? "blur(20px)" : "none", borderBottom: navSolid ? "1px solid rgba(255,255,255,0.08)" : "none", transition: "all 0.4s ease" }}>
        <div style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#fff" }}>
            <Logo size={30} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14.5, letterSpacing: "-0.03em", lineHeight: 1 }}>SW3</div>
              <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", fontFamily: "var(--mono)", letterSpacing: "0.14em", fontWeight: 500 }}>INNOVATIONS</div>
            </div>
          </a>
          <div className="nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map(function(n) {
              return (
                <a key={n.l} href={n.h} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 12.5, fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={function(e) { e.target.style.color = "#fff"; }}
                  onMouseLeave={function(e) { e.target.style.color = "rgba(255,255,255,0.65)"; }}
                >{n.l}</a>
              );
            })}
          </div>
          <button className="nav-hamburger" onClick={function() { setShowMenu(!showMenu); }} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 1002 }}>
            <div style={{ width: 20, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.3s", transform: showMenu ? "rotate(45deg) translate(2.5px, 2.5px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.3s", opacity: showMenu ? 0 : 1 }} />
            <div style={{ width: 20, height: 2, background: "#fff", transition: "all 0.3s", transform: showMenu ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {showMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "var(--bg-dark)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          {NAV_LINKS.map(function(n) {
            return <a key={n.l} href={n.h} onClick={function() { setShowMenu(false); }} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 20, fontWeight: 600, transition: "color 0.2s" }}>{n.l}</a>;
          })}
        </div>
      )}
    </>
  );
}

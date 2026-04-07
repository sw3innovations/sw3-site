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
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 40px", background: "rgba(8,8,8,0.3)", backdropFilter: "blur(13px)", WebkitBackdropFilter: "blur(13px)", borderBottom: "1px solid #141417", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#fff" }}>
            <Logo size={38} />
            <div>
              <div style={{ fontWeight: 500, fontSize: 15, letterSpacing: "-0.03em", lineHeight: 1, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif" }}>SW3</div>
              <div style={{ fontSize: 7.5, color: "#949494", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em", fontWeight: 500, textTransform: "uppercase" }}>Innovations</div>
            </div>
          </a>
          <div className="nav-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(function(n) {
              return (
                <a key={n.l} href={n.h} style={{ color: "#949494", textDecoration: "none", fontSize: 16, fontWeight: 400, transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={function(e) { e.target.style.color = "#f5f5f7"; }}
                  onMouseLeave={function(e) { e.target.style.color = "#949494"; }}
                >{n.l}</a>
              );
            })}
            <a href="https://solw3.tec.br/login" style={{ background: "#f5f5f7", color: "#0c0c0c", padding: "8px 20px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, textDecoration: "none", marginLeft: "8px", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s" }}
              onMouseOver={function(e) { e.target.style.background = "#ffffff"; }}
              onMouseOut={function(e) { e.target.style.background = "#f5f5f7"; }}
            >Acessar</a>
          </div>
          <button className="nav-hamburger" onClick={function() { setShowMenu(!showMenu); }} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 1002 }}>
            <div style={{ width: 20, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.3s", transform: showMenu ? "rotate(45deg) translate(2.5px, 2.5px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.3s", opacity: showMenu ? 0 : 1 }} />
            <div style={{ width: 20, height: 2, background: "#fff", transition: "all 0.3s", transform: showMenu ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {showMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#0c0c0c", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, fontFamily: "'DM Sans', sans-serif" }}>
          {NAV_LINKS.map(function(n) {
            return <a key={n.l} href={n.h} onClick={function() { setShowMenu(false); }} style={{ color: "#949494", textDecoration: "none", fontSize: 22, fontWeight: 400, transition: "color 0.2s" }}
              onMouseEnter={function(e) { e.target.style.color = "#f5f5f7"; }}
              onMouseLeave={function(e) { e.target.style.color = "#949494"; }}
            >{n.l}</a>;
          })}
          <a href="https://solw3.tec.br/login" onClick={function() { setShowMenu(false); }} style={{ background: "#f5f5f7", color: "#0c0c0c", padding: "12px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, textDecoration: "none", marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>Acessar</a>
        </div>
      )}
    </>
  );
}

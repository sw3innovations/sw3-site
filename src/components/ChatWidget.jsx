/**
 * ChatWidget — botão flutuante SOLW3 + iframe do chat.
 *
 * Auto-contido: gerencia seu próprio estado open/close.
 * Para abrir de fora, disparar: window.dispatchEvent(new CustomEvent('sw3:openWidget'))
 * Ouve postMessage 'solw3:upgrade' do iframe para mostrar banner de cadastro.
 */
import { useState, useEffect } from "react";
import { SolweLogo } from "./Logo";

const SOLW3_EMBED_URL = "https://solw3.tec.br/chat/embed";

export default function ChatWidget() {
  var _open = useState(false);
  var open = _open[0];
  var setOpen = _open[1];

  var _upgraded = useState(false);
  var upgraded = _upgraded[0];
  var setUpgraded = _upgraded[1];

  var _sessionId = useState(null);
  var sessionId = _sessionId[0];
  var setSessionId = _sessionId[1];

  // Abre o widget via evento global — usado por Hero, Navbar, CTAs
  useEffect(function() {
    var handler = function() { setOpen(true); };
    window.addEventListener("sw3:openWidget", handler);
    return function() { window.removeEventListener("sw3:openWidget", handler); };
  }, []);

  // Recebe postMessage do iframe quando SD atinge maturidade (N2/N3)
  useEffect(function() {
    var handler = function(event) {
      if (event.data && event.data.type === "solw3:upgrade") {
        setUpgraded(true);
        setSessionId(event.data.session_id || null);
      }
    };
    window.addEventListener("message", handler);
    return function() { window.removeEventListener("message", handler); };
  }, []);

  var upgradeHref = "https://solw3.tec.br/cadastro" + (sessionId ? "?session_id=" + sessionId : "");

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={function() { setOpen(function(v) { return !v; }); }}
        title={open ? "Fechar chat" : "Falar com a SOLW3 IA"}
        style={{
          position: "fixed", bottom: 20, right: 20,
          width: 50, height: 50, borderRadius: 13,
          background: open ? "#22D3EE" : "var(--bg-dark)",
          border: "1px solid " + (open ? "transparent" : "var(--border-dark)"),
          cursor: "pointer", zIndex: 9998,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          transition: "all 0.2s",
        }}
        onMouseEnter={function(e) { e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={function(e) { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open
          ? <span style={{ color: "#0B1628", fontSize: 16, fontWeight: 800 }}>✕</span>
          : <SolweLogo size={26} />
        }
      </button>

      {/* Painel do widget */}
      {open && (
        <div style={{
          position: "fixed", bottom: 80, right: 20,
          width: 370, height: 560,
          background: "#0B1628", borderRadius: 16,
          zIndex: 9999, display: "flex", flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
          border: "1px solid rgba(34,211,238,0.2)",
        }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 14px",
            background: "rgba(0,0,0,0.25)",
            borderBottom: "1px solid rgba(34,211,238,0.12)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22D3EE", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "var(--mono, monospace)", letterSpacing: "0.04em" }}>SOLW3 IA</span>
              <span style={{ fontSize: 10, color: "#22D3EE", fontFamily: "var(--mono, monospace)" }}>· Online</span>
            </div>
            <button
              onClick={function() { setOpen(false); }}
              title="Fechar"
              style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", padding: "3px 7px", borderRadius: 5 }}
            >
              ✕
            </button>
          </div>

          {/* Banner de upgrade N2/N3 */}
          {upgraded && (
            <div style={{
              padding: "10px 14px",
              background: "rgba(34,211,238,0.1)",
              borderBottom: "1px solid rgba(34,211,238,0.2)",
              flexShrink: 0,
            }}>
              <p style={{ margin: "0 0 6px", fontSize: 11.5, color: "#22D3EE", fontWeight: 600 }}>
                Seu projeto está tomando forma!
              </p>
              <a
                href={upgradeHref}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block", textAlign: "center", padding: "7px",
                  borderRadius: 6, background: "#22D3EE", color: "#0B1628",
                  textDecoration: "none", fontSize: 11.5, fontWeight: 700,
                }}
              >
                Criar conta e continuar no portal SOLW3 →
              </a>
            </div>
          )}

          {/* iframe do ChatEmbed — único ponto de entrada da IA */}
          <iframe
            src={SOLW3_EMBED_URL}
            style={{ flex: 1, border: "none", width: "100%" }}
            title="SOLW3 IA"
            allow="clipboard-write"
          />
        </div>
      )}
    </>
  );
}

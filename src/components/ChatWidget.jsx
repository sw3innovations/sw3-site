/**
 * ChatWidget — botão flutuante centralizado + iframe do chat.
 *
 * Auto-contido: gerencia seu próprio estado open/close.
 * Nenhuma lógica de chat local, nenhuma API call.
 * Ouve postMessage 'solw3:upgrade' do iframe (SDD §7.3).
 */
import { useState, useEffect } from "react";

const SOLW3_EMBED_URL = "https://solw3.tec.br/chat/embed";

export default function ChatWidget() {
  var _open = useState(false);
  var open = _open[0];
  var setOpen = _open[1];

  // Recebe postMessage do iframe quando SD atinge maturidade (N2/N3)
  useEffect(function() {
    var handler = function(e) {
      if (e.data && e.data.type === "solw3:upgrade") {
        // Futuro: mostrar banner de upgrade
      }
      if (e.type === "sw3:openWidget" || (e.data && e.data.type === "sw3:openWidget")) {
        setOpen(true);
      }
    };
    window.addEventListener("message", handler);
    window.addEventListener("sw3:openWidget", handler);
    return function() {
      window.removeEventListener("message", handler);
      window.removeEventListener("sw3:openWidget", handler);
    };
  }, []);

  return (
    <>
      {/* Botão flutuante bottom-right */}
      <button
        onClick={function() { setOpen(function(v) { return !v; }); }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 24px",
          borderRadius: 999,
          background: open ? "rgba(255,255,255,0.15)" : "#ffffff",
          border: open ? "1px solid rgba(255,255,255,0.4)" : "none",
          color: open ? "#ffffff" : "#0D1B2A",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: open ? "none" : "0 8px 32px rgba(255,255,255,0.3)",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
          fontFamily: "inherit",
        }}
        onMouseEnter={function(e) { e.currentTarget.style.transform = "scale(1.05)"; }}
        onMouseLeave={function(e) { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open
          ? <><span style={{ fontSize: 13 }}>✕</span> Fechar</>
          : <><span style={{ fontSize: 15 }}>💬</span> Fale com a SOLW3</>
        }
      </button>

      {/* Painel do widget */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: 80,
          right: 24,
          width: 420,
          height: 620,
          borderRadius: 16,
          zIndex: 9999,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          border: "1px solid rgba(100,116,139,0.3)",
        }}>
          <iframe
            src={SOLW3_EMBED_URL}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            title="SOLW3 IA"
            allow="clipboard-write"
          />
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { SolweLogo } from "./Logo";

const SOLW3_EMBED_URL = "https://solw3.tec.br/chat/embed";

export default function ChatWidget({ show, onClose, onOpen }) {
  var _upgraded = useState(false);
  var upgraded = _upgraded[0];
  var setUpgraded = _upgraded[1];

  var _sessionId = useState(null);
  var sessionId = _sessionId[0];
  var setSessionId = _sessionId[1];

  useEffect(function () {
    var handler = function (event) {
      if (event.data && event.data.type === "solw3:upgrade") {
        setUpgraded(true);
        setSessionId(event.data.session_id);
      }
    };
    window.addEventListener("message", handler);
    return function () { window.removeEventListener("message", handler); };
  }, []);

  if (!show) {
    return (
      <button
        onClick={onOpen}
        style={{ position: "fixed", bottom: 20, right: 20, width: 50, height: 50, borderRadius: 13, background: "var(--bg-dark)", border: "1px solid var(--border-dark)", cursor: "pointer", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", transition: "all 0.2s" }}
        onMouseEnter={function (e) { e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={function (e) { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <SolweLogo size={26} />
      </button>
    );
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, width: 370, height: 520, background: "#0B1628", borderRadius: 16, zIndex: 9999, display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.35)", overflow: "hidden", border: "1px solid rgba(34,211,238,0.2)" }}>
      {/* Close */}
      <button
        onClick={onClose}
        style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", padding: "3px 7px", borderRadius: 5, zIndex: 1 }}
      >
        ✕
      </button>

      {/* Upgrade banner */}
      {upgraded && (
        <div style={{ padding: "10px 14px", background: "rgba(34,211,238,0.1)", borderBottom: "1px solid rgba(34,211,238,0.2)", flexShrink: 0 }}>
          <p style={{ margin: "0 0 6px", fontSize: 11.5, color: "#22D3EE", fontWeight: 600 }}>
            Seu projeto está tomando forma! 🚀
          </p>
          <a
            href={"https://solw3.tec.br/cadastro" + (sessionId ? "?session_id=" + sessionId : "")}
            target="_blank"
            rel="noreferrer"
            style={{ display: "block", textAlign: "center", padding: "7px", borderRadius: 6, background: "#22D3EE", color: "#0B1628", textDecoration: "none", fontSize: 11.5, fontWeight: 700 }}
          >
            Criar conta e continuar no portal SOLW3 →
          </a>
        </div>
      )}

      {/* Embedded chat */}
      <iframe
        src={SOLW3_EMBED_URL}
        style={{ flex: 1, border: "none", width: "100%" }}
        title="SOLW3 IA"
        allow="clipboard-write"
      />
    </div>
  );
}

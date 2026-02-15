import { useState, useEffect, useRef } from "react";
import { SolweLogo } from "./Logo";
import { getReply } from "../solwe-ia/SolweEngine";
import { WELCOME_MESSAGE, QUICK_REPLIES } from "../solwe-ia/SolwePrompts";

export default function ChatWidget({ show, onClose, onOpen }) {
  var _input = useState("");
  var chatInput = _input[0];
  var setChatInput = _input[1];

  var _msgs = useState([{ role: "assistant", text: WELCOME_MESSAGE }]);
  var messages = _msgs[0];
  var setMessages = _msgs[1];

  var _typing = useState(false);
  var isTyping = _typing[0];
  var setIsTyping = _typing[1];

  var chatEndRef = useRef(null);
  var historyRef = useRef([]);

  useEffect(function() {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  var sendMessage = async function(text) {
    if (!text.trim() || isTyping) return;
    var u = text.trim();
    setChatInput("");
    setMessages(function(p) { return p.concat([{ role: "user", text: u }]); });
    setIsTyping(true);

    var reply = await getReply(u, historyRef.current);
    historyRef.current.push({ role: "user", content: u });
    historyRef.current.push({ role: "assistant", content: reply });
    setMessages(function(p) { return p.concat([{ role: "assistant", text: reply }]); });
    setIsTyping(false);
  };

  var userMsgCount = messages.filter(function(m) { return m.role === "user"; }).length;

  if (!show) {
    return (
      <button onClick={onOpen} style={{ position: "fixed", bottom: 20, right: 20, width: 50, height: 50, borderRadius: 13, background: "var(--bg-dark)", border: "1px solid var(--border-dark)", cursor: "pointer", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", transition: "all 0.2s" }}
        onMouseEnter={function(e) { e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={function(e) { e.currentTarget.style.transform = "scale(1)"; }}>
        <SolweLogo size={26} />
      </button>
    );
  }

  return (
    <div className="chat-widget" style={{ position: "fixed", bottom: 20, right: 20, width: 370, maxHeight: 500, background: "#fff", border: "1px solid var(--border)", borderRadius: 16, zIndex: 9999, display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.15)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-dark)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SolweLogo size={24} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>SOLW3 IA</div>
            <div style={{ fontSize: 8.5, color: "var(--accent)", fontFamily: "var(--mono)" }}>● Online</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 14, cursor: "pointer", padding: "3px 7px", borderRadius: 5 }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px 12px 4px", display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, background: "var(--bg)" }}>
        {messages.map(function(msg, i) {
          return (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "84%", padding: "8px 12px", borderRadius: 11, background: msg.role === "user" ? "var(--bg-dark)" : "#fff", color: msg.role === "user" ? "#fff" : "var(--text)", fontSize: 12, lineHeight: 1.5, border: msg.role === "user" ? "none" : "1px solid var(--border)", borderBottomRightRadius: msg.role === "user" ? 3 : 11, borderBottomLeftRadius: msg.role === "user" ? 11 : 3 }}>{msg.text}</div>
            </div>
          );
        })}
        {isTyping && (
          <div style={{ display: "flex" }}>
            <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: 11, borderBottomLeftRadius: 3, fontSize: 12, color: "var(--text3)" }}>...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick replies OR expand link */}
      {userMsgCount >= 4 ? (
        <div style={{ padding: "8px 12px 6px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <a href="/ia" style={{ display: "block", textAlign: "center", padding: "6px 12px", borderRadius: 6, background: "var(--bg-dark)", color: "#fff", textDecoration: "none", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>Continuar em tela cheia →</a>
        </div>
      ) : messages.length <= 2 ? (
        <div style={{ padding: "0 12px 6px", display: "flex", flexWrap: "wrap", gap: 4, background: "var(--bg)" }}>
          {QUICK_REPLIES.map(function(qr, i) {
            return (
              <button key={i} onClick={function() { sendMessage(qr); }} style={{ background: "#fff", border: "1px solid var(--border)", color: "var(--text2)", padding: "4px 9px", borderRadius: 5, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}
                onMouseEnter={function(e) { e.target.style.borderColor = "var(--navy)"; e.target.style.color = "var(--text)"; }}
                onMouseLeave={function(e) { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}
              >{qr}</button>
            );
          })}
        </div>
      ) : null}

      {/* Input */}
      <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 7, background: "#fff" }}>
        <input value={chatInput} onChange={function(e) { setChatInput(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") sendMessage(chatInput); }} placeholder="Descreva o que precisa..." style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 7, padding: "8px 11px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit" }} />
        <button onClick={function() { sendMessage(chatInput); }} disabled={isTyping} style={{ background: "var(--bg-dark)", border: "none", borderRadius: 7, width: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: isTyping ? "not-allowed" : "pointer", fontSize: 14, color: "#fff", opacity: isTyping ? 0.4 : 1, fontWeight: 700 }}>→</button>
      </div>
    </div>
  );
}

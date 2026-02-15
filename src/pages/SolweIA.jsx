import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SolweLogo, Logo } from "../components/Logo";
import { getReply, detectModality, enviarLead, extrairRequisitos, gerarResumoConversa } from "../solwe-ia/SolweEngine";
import { WELCOME_MESSAGE, QUICK_REPLIES, WHATSAPP_URL } from "../solwe-ia/SolwePrompts";

var MODALITY_INFO = {
  A: { label: "Projeto Novo", color: "#7dd3fc", icon: "✦", stack: "React, FastAPI, AWS", time: "2–20 semanas" },
  B: { label: "Refatoração", color: "#a78bfa", icon: "⟳", stack: "Análise + Migração", time: "4–16 semanas" },
  C: { label: "Extensão", color: "#34d399", icon: "⊕", stack: "API + Integração", time: "1–8 semanas" },
  D: { label: "Braço de Dev", color: "#fbbf24", icon: "⊞", stack: "Squad dedicado", time: "Mín. 3 meses" },
};

var STAGE_REPLIES = {
  initial: ["Criar sistema novo", "Melhorar meu sistema", "Preciso de devs", "Quanto custa?"],
  A: ["Tenho um briefing pronto", "Ainda é só uma ideia", "Quero ver exemplos"],
  B: ["Meu sistema é legado", "Quero migrar de stack", "Preciso de diagnóstico"],
  C: ["Quero adicionar IA", "Preciso de integração", "Nova feature específica"],
  D: ["Preciso de frontend", "Preciso de backend", "Full-stack"],
  deep: ["Gerar protótipo", "Ver cases entregues", "Continuar mapeando"],
};

function getQuickReplies(modality, msgCount) {
  if (msgCount >= 8) return STAGE_REPLIES.deep;
  if (modality && STAGE_REPLIES[modality]) return STAGE_REPLIES[modality];
  return STAGE_REPLIES.initial;
}

function shouldShowWhatsApp(text) {
  var lower = text.toLowerCase();
  return lower.indexOf("botão abaixo") !== -1 || lower.indexOf("falar direto") !== -1 || lower.indexOf("equipe pelo") !== -1;
}

function detectarEmail(text) {
  var emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  var match = text.match(emailRegex);
  return match ? match[0] : null;
}

function extrairNome(text) {
  var palavrasChave = ["meu nome é", "me chamo", "sou o", "sou a"];
  var textLower = text.toLowerCase();

  for (var i = 0; i < palavrasChave.length; i++) {
    var idx = textLower.indexOf(palavrasChave[i]);
    if (idx !== -1) {
      var resto = text.substring(idx + palavrasChave[i].length).trim();
      var primeiroNome = resto.split(" ")[0].replace(/[^a-zA-Z]/g, "");
      if (primeiroNome.length > 2) {
        return primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
      }
    }
  }
  return null;
}

function MessageBubble({ msg }) {
  var isUser = msg.role === "user";
  var showWA = !isUser && shouldShowWhatsApp(msg.text);

  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", animation: "fadeIn 0.3s ease" }}>
      {!isUser && (
        <div style={{ width: 28, height: 28, borderRadius: 8, overflow: "hidden", marginRight: 10, flexShrink: 0, marginTop: 2 }}>
          <SolweLogo size={28} />
        </div>
      )}
      <div style={{ maxWidth: "75%" }}>
        <div style={{ padding: "10px 16px", borderRadius: 14, background: isUser ? "var(--bg-dark)" : "var(--surface)", color: isUser ? "#fff" : "var(--text)", fontSize: 13.5, lineHeight: 1.6, border: isUser ? "none" : "1px solid var(--border)", borderBottomRightRadius: isUser ? 4 : 14, borderBottomLeftRadius: isUser ? 14 : 4, boxShadow: isUser ? "none" : "0 1px 3px rgba(0,0,0,0.04)" }}>{msg.text}</div>
        {showWA && (
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, padding: "8px 16px", borderRadius: 8, background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: "var(--display)", transition: "opacity 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={function(e) { e.currentTarget.style.opacity = "1"; }}
          >
            <span style={{ fontSize: 16 }}>{"💬"}</span> Falar no WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function SolweIA() {
  var _input = useState("");
  var chatInput = _input[0];
  var setChatInput = _input[1];

  var _msgs = useState([{ role: "assistant", text: WELCOME_MESSAGE }]);
  var messages = _msgs[0];
  var setMessages = _msgs[1];

  var _typing = useState(false);
  var isTyping = _typing[0];
  var setIsTyping = _typing[1];

  var _mod = useState(null);
  var modality = _mod[0];
  var setModality = _mod[1];

  var _sidebar = useState(false);
  var showSidebar = _sidebar[0];
  var setShowSidebar = _sidebar[1];

  var _email = useState(null);
  var clienteEmail = _email[0];
  var setClienteEmail = _email[1];

  var _nome = useState(null);
  var clienteNome = _nome[0];
  var setClienteNome = _nome[1];

  var _propostaEnviada = useState(false);
  var propostaEnviada = _propostaEnviada[0];
  var setPropostaEnviada = _propostaEnviada[1];

  var chatEndRef = useRef(null);
  var historyRef = useRef([]);
  var inputRef = useRef(null);

  useEffect(function() {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(function() {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  var sendMessage = async function(text) {
    if (!text.trim() || isTyping) return;
    var u = text.trim();
    setChatInput("");
    setMessages(function(p) { return p.concat([{ role: "user", text: u }]); });
    setIsTyping(true);

    var detected = detectModality(u);
    if (detected && !modality) setModality(detected);

    var nomeDetectado = extrairNome(u);
    if (nomeDetectado && !clienteNome) {
      setClienteNome(nomeDetectado);
    }

    var emailDetectado = detectarEmail(u);
    if (emailDetectado && !clienteEmail && !propostaEnviada) {
      setClienteEmail(emailDetectado);
    }

    var reply = await getReply(u, historyRef.current);
    historyRef.current.push({ role: "user", content: u });
    historyRef.current.push({ role: "assistant", content: reply });

    if (!detected && !modality) {
      var replyDetected = detectModality(reply);
      if (replyDetected) setModality(replyDetected);
    }

    setMessages(function(p) { return p.concat([{ role: "assistant", text: reply }]); });

    if (emailDetectado && modality && !propostaEnviada) {
      setTimeout(async function() {
        setMessages(function(p) { return p.concat([{ role: "assistant", text: "Gerando sua proposta personalizada..." }]); });

        var requisitos = extrairRequisitos(historyRef.current);
        var resumo = gerarResumoConversa(historyRef.current);
        var modulos = Math.max(requisitos.length, 3);

        var projetoDescricao = resumo.substring(0, 200);

        var dadosLead = {
          cliente: {
            email: emailDetectado,
            nome: clienteNome || "Cliente"
          },
          projeto: {
            modalidade: modality,
            descricao: projetoDescricao,
            requisitos: requisitos.length > 0 ? requisitos : ["Sistema personalizado conforme conversado"],
            stack_sugerida: MODALITY_INFO[modality].stack,
            timeline_estimada: MODALITY_INFO[modality].time,
            modulos: modulos
          },
          conversa: {
            mensagens: messages.length,
            resumo: resumo.substring(0, 500)
          }
        };

        var resultado = await enviarLead(dadosLead);

        if (resultado.ok) {
          setPropostaEnviada(true);
          setMessages(function(p) { return p.concat([{
            role: "assistant",
            text: "Proposta enviada com sucesso! Verifique seu email (" + emailDetectado + "). O investimento estimado é de " + resultado.data.pricing.preco_total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + " com timeline de " + resultado.data.pricing.timeline_semanas + " semanas. Em breve nossa equipe entrará em contato!"
          }]); });
        } else {
          setMessages(function(p) { return p.concat([{
            role: "assistant",
            text: "Ops, tive um problema ao enviar a proposta. Por favor, entre em contato direto com a equipe pelo botão abaixo."
          }]); });
        }
      }, 2000);
    }

    setIsTyping(false);
  };

  var modInfo = modality ? MODALITY_INFO[modality] : null;
  var quickReplies = getQuickReplies(modality, messages.length);
  var userMsgCount = messages.filter(function(m) { return m.role === "user"; }).length;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", fontFamily: "var(--display)", "--accent": "#7dd3fc", "--accent2": "#94a3b8", "--navy": "#475569", "--bg": "#fafafa", "--bg-dark": "#0f172a", "--bg-dark2": "#1e293b", "--surface": "#ffffff", "--surface-dark": "#1e293b", "--border": "rgba(0,0,0,0.08)", "--border-dark": "rgba(255,255,255,0.08)", "--text": "#1e293b", "--text2": "#64748b", "--text3": "#94a3b8", "--text-light": "#e2e8f0", "--text-light2": "#94a3b8", "--mono": "'JetBrains Mono', monospace", "--display": "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "var(--bg-dark)", borderBottom: "1px solid var(--border-dark)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SolweLogo size={28} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>SOLW3 IA</div>
            <div style={{ fontSize: 8, color: "var(--accent)", fontFamily: "var(--mono)", fontWeight: 500 }}>● Online — Consultora de projetos</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {modInfo && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 6, background: modInfo.color + "15", border: "1px solid " + modInfo.color + "30" }}>
              <span style={{ fontSize: 12 }}>{modInfo.icon}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: modInfo.color, fontWeight: 600 }}>{modInfo.label}</span>
            </div>
          )}
          <button onClick={function() { setShowSidebar(!showSidebar); }} className="sidebar-toggle" style={{ display: "none", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: 11, padding: "5px 10px", borderRadius: 5, cursor: "pointer", fontFamily: "var(--mono)" }}>{showSidebar ? "✕" : "≡ Info"}</button>
          <Link to="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={function(e) { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            <span style={{ fontSize: 14 }}>{"←"}</span> Voltar ao site
          </Link>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

          {/* Messages */}
          <div style={{ flex: 1, overflow: "auto", padding: "24px 24px 8px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map(function(msg, i) {
                return <MessageBubble key={i} msg={msg} />;
              })}
              {isTyping && (
                <div style={{ display: "flex", animation: "fadeIn 0.3s ease" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, overflow: "hidden", marginRight: 10, flexShrink: 0 }}>
                    <SolweLogo size={28} />
                  </div>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "10px 16px", borderRadius: 14, borderBottomLeftRadius: 4, fontSize: 13.5, color: "var(--text3)" }}>
                    <span style={{ animation: "blink 1s infinite" }}>...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Quick replies */}
          <div style={{ padding: "0 24px 8px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {quickReplies.map(function(qr, i) {
                return (
                  <button key={i} onClick={function() { sendMessage(qr); }} style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text2)", padding: "6px 14px", borderRadius: 20, fontSize: 11.5, cursor: "pointer", fontFamily: "inherit", fontWeight: 400, transition: "all 0.2s" }}
                    onMouseEnter={function(e) { e.target.style.borderColor = "var(--navy)"; e.target.style.color = "var(--text)"; }}
                    onMouseLeave={function(e) { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}
                  >{qr}</button>
                );
              })}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "12px 24px 20px", borderTop: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10 }}>
              <input ref={inputRef} value={chatInput} onChange={function(e) { setChatInput(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") sendMessage(chatInput); }} placeholder="Descreva o que precisa..." style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", color: "var(--text)", fontSize: 13.5, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={function(e) { e.target.style.borderColor = "var(--navy)"; }}
                onBlur={function(e) { e.target.style.borderColor = "var(--border)"; }}
              />
              <button onClick={function() { sendMessage(chatInput); }} disabled={isTyping || !chatInput.trim()} style={{ background: "var(--bg-dark)", border: "none", borderRadius: 10, width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", cursor: (isTyping || !chatInput.trim()) ? "not-allowed" : "pointer", fontSize: 16, color: "#fff", opacity: (isTyping || !chatInput.trim()) ? 0.3 : 1, fontWeight: 700, transition: "opacity 0.2s", flexShrink: 0 }}>{"→"}</button>
            </div>
          </div>
        </div>

        {/* Sidebar desktop */}
        <div className="ia-sidebar" style={{ width: 280, borderLeft: "1px solid var(--border)", background: "#fff", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20, overflow: "auto", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>STATUS</div>
            {modInfo ? (
              <div style={{ background: modInfo.color + "08", border: "1px solid " + modInfo.color + "20", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{modInfo.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{modInfo.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: "var(--text3)" }}>Stack sugerida</span>
                    <span style={{ color: "var(--text)", fontWeight: 500, fontFamily: "var(--mono)", fontSize: 10 }}>{modInfo.stack}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: "var(--text3)" }}>Timeline</span>
                    <span style={{ color: "var(--text)", fontWeight: 500, fontFamily: "var(--mono)", fontSize: 10 }}>{modInfo.time}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: "var(--text3)" }}>Mensagens</span>
                    <span style={{ color: "var(--text)", fontWeight: 500, fontFamily: "var(--mono)", fontSize: 10 }}>{userMsgCount}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
                <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.5 }}>Descreva seu projeto. A modalidade e stack serão detectadas automaticamente.</p>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>MODALIDADES</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["A", "B", "C", "D"].map(function(k) {
                var m = MODALITY_INFO[k];
                var active = modality === k;
                return (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: active ? m.color + "10" : "transparent", border: active ? "1px solid " + m.color + "25" : "1px solid transparent", transition: "all 0.2s" }}>
                    <span style={{ fontSize: 12, opacity: active ? 1 : 0.4 }}>{m.icon}</span>
                    <span style={{ fontSize: 11, color: active ? "var(--text)" : "var(--text3)", fontWeight: active ? 600 : 400 }}>{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: "auto" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#25D366", color: "#fff", textDecoration: "none", padding: "10px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "var(--display)", marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{"💬"}</span> WhatsApp
            </a>
            <a href="mailto:admin@sw3.tec.br" style={{ display: "block", background: "var(--bg)", color: "var(--text2)", textDecoration: "none", padding: "10px 16px", borderRadius: 8, fontSize: 12, fontWeight: 500, textAlign: "center", border: "1px solid var(--border)", fontFamily: "var(--display)" }}>admin@sw3.tec.br</a>
          </div>
          <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Logo size={14} />
              <span style={{ fontSize: 9, color: "var(--text3)", fontFamily: "var(--mono)" }}>SW3 INNOVATIONS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)" }} onClick={function() { setShowSidebar(false); }}>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 280, background: "#fff", padding: "24px 20px", overflow: "auto", boxShadow: "-8px 0 32px rgba(0,0,0,0.1)" }} onClick={function(e) { e.stopPropagation(); }}>
            {modInfo ? (
              <div style={{ background: modInfo.color + "08", border: "1px solid " + modInfo.color + "20", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{modInfo.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{modInfo.label}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                  <div>Stack: {modInfo.stack}</div>
                  <div>Timeline: {modInfo.time}</div>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 16 }}>Descreva seu projeto para detectar a modalidade.</p>
            )}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#25D366", color: "#fff", textDecoration: "none", padding: "10px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "var(--display)" }}>
              <span style={{ fontSize: 14 }}>{"💬"}</span> WhatsApp
            </a>
          </div>
        </div>
      )}

      <style>{"@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } } @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } } @media (max-width: 768px) { .ia-sidebar { display: none !important; } .sidebar-toggle { display: block !important; } }"}</style>
    </div>
  );
}

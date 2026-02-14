import { useState, useEffect } from "react";

var LINES = [
  { delay: 800, tag: ">", tagColor: "rgba(255,255,255,0.3)", text: "solw3 build --projeto \"CRM para clínica\"", textColor: "rgba(255,255,255,0.5)" },
  { delay: 1200, tag: "[ARCH]", tagColor: "#7dd3fc", text: "Analisando requisitos...", textColor: "rgba(255,255,255,0.5)" },
  { delay: 900, tag: "[ARCH]", tagColor: "#7dd3fc", text: "3 módulos identificados", textColor: "rgba(255,255,255,0.5)" },
  { delay: 1100, tag: "[BACK]", tagColor: "#a78bfa", text: "Gerando FastAPI + PostgreSQL...", textColor: "rgba(255,255,255,0.5)" },
  { delay: 800, tag: "[BACK]", tagColor: "#a78bfa", text: "Auth JWT + RBAC configurado", textColor: "rgba(255,255,255,0.5)" },
  { delay: 1000, tag: "[FRONT]", tagColor: "#34d399", text: "React + Dashboard criado", textColor: "rgba(255,255,255,0.5)" },
  { delay: 900, tag: "[FRONT]", tagColor: "#34d399", text: "Módulo Agenda integrado", textColor: "rgba(255,255,255,0.5)" },
  { delay: 700, tag: "[QA]", tagColor: "#fbbf24", text: "12 testes gerados... 12/12 passed", textColor: "#34d399" },
  { delay: 1200, tag: "[DEPLOY]", tagColor: "#7dd3fc", text: "staging.cliente.sw3.tec.br", textColor: "rgba(255,255,255,0.5)" },
  { delay: 600, tag: "---", tagColor: "none", text: "", textColor: "none" },
  { delay: 800, tag: "ok", tagColor: "#34d399", text: "Sistema entregue em 6 semanas", textColor: "rgba(255,255,255,0.6)" },
  { delay: 600, tag: "ok", tagColor: "#34d399", text: "Código no GitHub + docs gerados", textColor: "rgba(255,255,255,0.6)" },
];

export default function TerminalAnimation() {
  var _s = useState(0);
  var step = _s[0];
  var setStep = _s[1];

  useEffect(function() {
    if (step >= LINES.length) {
      var t = setTimeout(function() { setStep(0); }, 3000);
      return function() { clearTimeout(t); };
    }
    var t = setTimeout(function() { setStep(function(s) { return s + 1; }); }, LINES[step].delay);
    return function() { clearTimeout(t); };
  }, [step]);

  var cursor = (
    <div style={{ marginTop: step >= LINES.length ? 12 : 6, display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ color: "var(--accent)" }}>{">"}</span>
      <span style={{ display: "inline-block", width: 7, height: 14, background: "var(--accent)", opacity: 0.7, animation: "blink 1s infinite" }} />
    </div>
  );

  return (
    <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>solw3-agent</span>
      </div>
      <div style={{ padding: "16px 18px", fontFamily: "var(--mono)", fontSize: 11.5, lineHeight: 1.8, minHeight: 280 }}>
        {LINES.slice(0, step).map(function(line, i) {
          if (line.tag === "---") return <div key={i} style={{ color: "rgba(255,255,255,0.15)", marginTop: 8 }}>{"────────────────────────────"}</div>;
          return (
            <div key={i} style={{ opacity: 0, animation: "fadeIn 0.3s ease forwards", marginTop: line.tag === "ok" ? 2 : (i > 0 && LINES[i - 1].tag !== line.tag ? 6 : 0) }}>
              {line.tag === "ok" ? (
                <span><span style={{ color: line.tagColor }}>{"✓ "}</span><span style={{ color: line.textColor }}>{line.text}</span></span>
              ) : (
                <span><span style={{ color: line.tagColor }}>{line.tag} </span><span style={{ color: line.textColor }}>{line.text}</span></span>
              )}
            </div>
          );
        })}
        {cursor}
      </div>
    </div>
  );
}

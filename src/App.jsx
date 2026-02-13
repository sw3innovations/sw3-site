import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// SOLW3 — PLATAFORMA DE AUTOMAÇÃO DE PROJETOS COM IA
// SW3 Innovations Brasil LTDA
// Navy + Soft Cyan palette | Esri-inspired
// ═══════════════════════════════════════════════════════

const LOGO_SRC = "/logo.png";
const SOLW3_LOGO = "/solw3-logo.png";

// ——— SOLW3 IA Chat System ———
const SOLW3_SYSTEM = "Você é SOLW3 (pronuncia-se solve), a IA da SW3 Innovations Brasil LTDA — empresa de tecnologia especializada em automação e IA em Campina Grande-PB.\n\nModalidades de serviço:\nA) Projeto Novo — criar sistema do zero (sob consulta, 2-20 semanas)\nB) Refatoração — modernizar sistema existente (sob consulta, 4-16 semanas)\nC) Extensão/Plugin — adicionar features a sistema existente (sob consulta, 1-8 semanas)\nD) Braço de Capacidade — squad sob demanda (sob consulta, mín. 3 meses)\n\nPós-entrega: Manutenção, Managed Service e Retainer — todos sob consulta.\n\nLab: AVM Brasil (avaliação imobiliária com IA), OTW Health (saúde digital).\n\nStack: React, Python, FastAPI, AWS, Claude API, WhatsApp Business API.\nWhatsApp: (83) 98690-3799. Email: admin@sw3.tec.br. Site: sw3.tec.br.\n\nResponda em português brasileiro, máximo 3 frases, tom profissional e direto. Identifique a modalidade do prospect e guie para próximo passo.";

const FALLBACK = {
  "projeto novo": "Criamos sistemas do zero com assistência de agentes IA — do chat à entrega. Me conta: qual problema quer resolver?",
  "refatorar": "Modernizamos sistemas existentes. Oferecemos diagnóstico técnico gratuito do seu código. Quer experimentar?",
  "extensão": "Adicionamos features e integrações a sistemas existentes com escopo cirúrgico. Qual sistema quer estender?",
  "staff": "Nossos devs trabalham com agentes IA — output de 2-3x um dev solo. Qual perfil precisa?",
  "preço": "Cada projeto é único — o valor depende do escopo, complexidade e prazo. Descreva o que precisa e gero uma estimativa personalizada na hora.",
  default: "Sou a SOLW3, IA da SW3 Innovations. Posso te ajudar a criar um sistema novo, melhorar um existente, ou reforçar seu time de dev. O que você precisa?"
};

function getFallback(t) { const l = t.toLowerCase(); for (const [k, v] of Object.entries(FALLBACK)) { if (k !== "default" && l.includes(k)) return v; } return FALLBACK.default; }

// ——— Components ———
function Logo({ size = 32, style = {} }) {
  return <img src={LOGO_SRC} alt="SOLW3" style={{ width: size, height: size, borderRadius: size * 0.15, objectFit: "contain", ...style }} />;
}

function SolweLogo({ size = 32, style = {} }) {
  return <img src={SOLW3_LOGO} alt="SOLW3 IA" style={{ width: size, height: size, borderRadius: size * 0.2, objectFit: "cover", ...style }} />;
}

// ——— Main ———
export default function SOLW3Site() {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Olá! Sou a SOLW3. Posso te ajudar a criar um sistema novo, melhorar um que já existe, ou reforçar seu time. O que você precisa?" }]);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const chatEndRef = useRef(null);
  const chatHistoryRef = useRef([]);

  useEffect(() => { const fn = () => setScrollY(window.scrollY); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return;
    const u = text.trim(); setChatInput(""); setMessages(p => [...p, { role: "user", text: u }]); setIsTyping(true);
    chatHistoryRef.current.push({ role: "user", content: u });
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SOLW3_SYSTEM, messages: chatHistoryRef.current }) });
      if (!r.ok) throw new Error(); const d = await r.json(); const reply = d.content.map(i => i.type === "text" ? i.text : "").filter(Boolean).join("\n");
      chatHistoryRef.current.push({ role: "assistant", content: reply }); setMessages(p => [...p, { role: "assistant", text: reply }]);
    } catch { const reply = getFallback(u); chatHistoryRef.current.push({ role: "assistant", content: reply }); setMessages(p => [...p, { role: "assistant", text: reply }]); }
    setIsTyping(false);
  };

  const navSolid = scrollY > 60;

  return (
    <div style={{
      "--accent": "#7dd3fc", "--accent2": "#94a3b8", "--navy": "#475569",
      "--bg": "#fafafa", "--bg-dark": "#0f172a", "--bg-dark2": "#1e293b",
      "--surface": "#ffffff", "--surface-dark": "#1e293b",
      "--border": "rgba(0,0,0,0.08)", "--border-dark": "rgba(255,255,255,0.08)",
      "--text": "#1e293b", "--text2": "#64748b", "--text3": "#94a3b8",
      "--text-light": "#e2e8f0", "--text-light2": "#94a3b8",
      "--mono": "'JetBrains Mono', monospace", "--display": "'Outfit', sans-serif",
      fontFamily: "var(--display)", background: "var(--bg)", color: "var(--text)", minHeight: "100vh",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ════════ NAVBAR ════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 32px", background: navSolid ? "rgba(255,255,255,0.95)" : "rgba(15,23,42,0.0)", backdropFilter: navSolid ? "blur(20px)" : "none", borderBottom: navSolid ? "1px solid var(--border)" : "none", transition: "all 0.4s ease" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: navSolid ? "var(--text)" : "#fff" }}>
            <Logo size={30} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14.5, letterSpacing: "-0.03em", lineHeight: 1 }}>SOLW3</div>
              <div style={{ fontSize: 7.5, color: navSolid ? "var(--text3)" : "rgba(255,255,255,0.5)", fontFamily: "var(--mono)", letterSpacing: "0.14em", fontWeight: 500 }}>by SW3 INNOVATIONS</div>
            </div>
          </a>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[{ l: "Soluções", h: "#solucoes" }, { l: "Como Funciona", h: "#como-funciona" }, { l: "Pós-Entrega", h: "#planos" }, { l: "Lab", h: "#lab" }, { l: "Contato", h: "#contato" }].map(n => (
              <a key={n.l} href={n.h} style={{ color: navSolid ? "var(--text2)" : "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 12.5, fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = navSolid ? "var(--text)" : "#fff"}
                onMouseLeave={e => e.target.style.color = navSolid ? "var(--text2)" : "rgba(255,255,255,0.65)"}
              >{n.l}</a>
            ))}
            <button onClick={() => setShowChat(true)} style={{ background: navSolid ? "var(--bg-dark)" : "rgba(255,255,255,0.12)", color: "#fff", padding: "7px 16px", borderRadius: 7, fontWeight: 600, fontSize: 11, border: navSolid ? "none" : "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontFamily: "var(--display)", transition: "all 0.3s" }}>Falar com IA</button>
          </div>
        </div>
      </nav>

      {/* ════════ HERO ════════ */}
          <section style={{ background: "var(--bg-dark)", color: "#fff", position: "relative", overflow: "hidden", padding: "140px 32px 100px", minHeight: 560 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(125,211,252,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)" }} />
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(125,211,252,0.08), transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20, opacity: 0.9 }}>
              TECNOLOGIA QUE RESOLVE
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 20 }}>
              Descreva sua ideia.<br /><span style={{ color: "var(--accent)" }}>A IA transforma em sistema.</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-light2)", lineHeight: 1.7, marginBottom: 36, maxWidth: 560 }}>
              Crie do zero, melhore o que já existe, ou reforce seu time. Converse com a SOLW3 IA, receba uma proposta completa, e acompanhe agentes de IA construindo cada etapa.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => setShowChat(true)} style={{ background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, border: "none", cursor: "pointer", fontFamily: "var(--display)" }}>Começar conversa</button>
              <a href="https://wa.me/5583986903799?text=Quero%20conversar%20sobre%20meu%20projeto" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8, fontWeight: 500, fontSize: 13.5, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>WhatsApp</a>
            </div>

            {/* Pipeline badges */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 40 }}>
              {["Conversa", "Proposta", "Execução", "Entrega", "Suporte"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 14px", borderRadius: 5, fontSize: 10, color: i < 4 ? "var(--accent)" : "rgba(255,255,255,0.35)", fontFamily: "var(--mono)", fontWeight: 600 }}>{s}</div>
                  {i < 4 && <div style={{ width: 16, height: 1, background: "rgba(125,211,252,0.2)" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal animation */}
          <div style={{ flex: "0 0 420px", minWidth: 320 }}>
            <TerminalAnimation />
          </div>
        </div>
      </section>

      {/* ════════ O QUE FAZEMOS — 4 Modalidades ════════ */}
      <section id="solucoes" style={{ padding: "80px 32px 100px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>O QUE FAZEMOS</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>4 formas de transformar seu negócio</h2>
            <p style={{ color: "var(--text2)", fontSize: 14.5, maxWidth: 580, lineHeight: 1.6 }}>Cada modalidade abre o chat na SOLW3 IA, que conduz o processo do diagnóstico à entrega.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { icon: "✦", title: "Projeto Novo", desc: "Criar sistema do zero a partir de uma ideia. IA conduz requisitos, precifica e propõe.", ticket: "Sob consulta", time: "2–20 semanas", color: "#7dd3fc" },
              { icon: "⟳", title: "Refatoração", desc: "Modernizar sistema existente. Diagnóstico técnico automático com score de saúde 0–100.", ticket: "Sob consulta", time: "4–16 semanas", color: "#a78bfa" },
              { icon: "⊕", title: "Extensão / Plugin", desc: "Adicionar features ou integrações a sistema existente com escopo cirúrgico.", ticket: "Sob consulta", time: "1–8 semanas", color: "#34d399" },
              { icon: "⊞", title: "Braço de Dev", desc: "Squad sob demanda dentro do seu repo e processos. Devs com agentes IA = 2-3x output.", ticket: "Sob consulta", time: "Mín. 3 meses", color: "#fbbf24" },
            ].map((mod, i) => (
              <div key={i} onClick={() => setShowChat(true)} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 22px", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = mod.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 16, color: mod.color, opacity: 0.7 }}>{mod.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>{mod.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, marginBottom: 18 }}>{mod.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 10.5, fontFamily: "var(--mono)" }}>
                  <span style={{ color: "var(--text3)" }}>{mod.time}</span>
                  <span style={{ color: "var(--navy)", fontWeight: 600 }}>{mod.ticket}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ COMO FUNCIONA — Pipeline ════════ */}
      <section id="como-funciona" style={{ padding: "100px 32px", background: "var(--bg-dark)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>COMO FUNCIONA</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>De conversa a sistema em horas, não meses</h2>
            <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 560, lineHeight: 1.6 }}>O mercado tradicional leva 2-3 meses antes de ver qualquer coisa. Com SOLW3, você sai do chat com proposta completa.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { num: "01", title: "Conversa com IA", desc: "Descreva o que precisa. A SOLW3 IA identifica a modalidade, faz perguntas inteligentes e mapeia requisitos em 15-30 minutos.", time: "15–30 min" },
              { num: "02", title: "Proposta Completa", desc: "Escopo, stack técnica, timeline e preço — tudo gerado automaticamente. Você vê o preço ajustar em tempo real conforme seleciona features.", time: "Instantâneo" },
              { num: "03", title: "Execução por Agentes", desc: "Agentes de IA (ARCH, BACK, FRONT, QA, DEPLOY) constroem o sistema. Você acompanha e valida cada entrega em staging.", time: "Semanas" },
              { num: "04", title: "Entrega + Suporte", desc: "Sistema em produção, documentação gerada por IA, código no GitHub. Planos de manutenção e evolução contínua.", time: "Contínuo" },
            ].map((step, i) => (
              <div key={i} style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)", borderRadius: 12, padding: "28px 22px", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(125,211,252,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 32, fontWeight: 700, color: "var(--accent)", opacity: 0.35, letterSpacing: "-0.02em" }}>{step.num}</div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{step.time}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text-light)" }}>{step.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-light2)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PLANOS PÓS-ENTREGA ════════ */}
      <section id="planos" style={{ padding: "80px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>APÓS A ENTREGA</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Seu sistema nunca fica parado</h2>
            <p style={{ color: "var(--text2)", fontSize: 14.5, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>Manutenção, operação gerenciada ou evolução contínua, escolha o plano que mantém seu sistema seguro e atualizado.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {[
              { title: "Suporte & Manutenção", plans: [{ name: "Básico", price: "Sob consulta", feat: "Bugs + monitoramento • SLA 48h" }, { name: "Profissional", price: "Sob consulta", feat: "Bugs + segurança + melhorias mensais • SLA 24h" }, { name: "Enterprise", price: "Sob consulta", feat: "Tudo + suporte dedicado • SLA 4h" }] },
              { title: "Managed Service", plans: [{ name: "Basic", price: "Sob consulta", feat: "Hosting + monitoramento + backups" }, { name: "Pro", price: "Sob consulta", feat: "Tudo + evoluções mensais + relatório" }, { name: "Full", price: "Sob consulta", feat: "Tudo + operação do sistema completa" }] },
              { title: "Retainer (Evolução)", plans: [{ name: "10 horas", price: "Sob consulta", feat: "Novas features e integrações" }, { name: "20 horas", price: "Sob consulta", feat: "Features + refatoração + performance" }, { name: "40 horas", price: "Sob consulta", feat: "Equivale a meio dev dedicado" }] },
            ].map((cat, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, letterSpacing: "-0.01em" }}>{cat.title}</h3>
                {cat.plans.map((p, j) => (
                  <div key={j} style={{ padding: "12px 0", borderTop: j > 0 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                      <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--navy)", fontWeight: 600 }}>{p.price}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5 }}>{p.feat}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ LAB ════════ */}
      <section id="lab" style={{ padding: "80px 32px", background: "var(--bg-dark)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>SOLW3 LAB</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Pesquisa e produtos de IA avançada</h2>
            <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>Soluções de IA avançada que podem ser integradas como feature no seu projeto.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { name: "AVM Brasil", desc: "Avaliação de imóveis com IA geoespacial. Laudos automatizados compatíveis com editais Caixa.", status: "Em desenvolvimento", color: "#7dd3fc" },
              { name: "Chat GIS", desc: "Interface conversacional para dados geoespaciais. Pergunte ao mapa em linguagem natural.", status: "Pesquisa", color: "#a78bfa" },
              { name: "OTW Health", desc: "Plataforma de saúde digital com IA para triagem, acompanhamento e integração hospitalar.", status: "Em desenvolvimento", color: "#34d399" },
            ].map((p, i) => (
              <div key={i} style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)", borderRadius: 12, padding: "28px 22px", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "30"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: p.color }}>{p.name}</h3>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "3px 8px", borderRadius: 4, background: p.color + "15", border: "1px solid " + p.color + "25", color: p.color, fontWeight: 600, textTransform: "uppercase" }}>{p.status}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--text-light2)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ QUEM SOMOS ════════ */}
      <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "44px 48px", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>QUEM SOMOS</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.25 }}>Tecnologia que resolve problemas reais</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>Somos a SW3 Innovations, um laboratório de tecnologia em Campina Grande-PB. Usamos IA e automação para criar, precificar, prototipar e entregar sistemas completos, com agentes inteligentes acelerando cada etapa e humanos garantindo qualidade.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 260 }}>
              {[
                { label: "Sede", value: "Campina Grande — PB" },
                { label: "Foco", value: "IA, Automação e Software" },
                { label: "Stack", value: "React, Python, AWS, Claude" },
                { label: "Modelo", value: "Projetos + Suporte contínuo" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", fontWeight: 600, letterSpacing: "0.06em", minWidth: 48 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CONTATO ════════ */}
      <section id="contato" style={{ padding: "100px 32px", background: "var(--bg-dark)", color: "#fff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <SolweLogo size={48} style={{ margin: "0 auto 20px", display: "block" }} />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>Descreva sua ideia. A gente constrói.</h2>
          <p style={{ color: "var(--text-light2)", fontSize: 13.5, marginBottom: 36, lineHeight: 1.6 }}>Converse com a SOLW3 IA agora ou fale direto com a equipe pelo WhatsApp.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => setShowChat(true)} style={{ background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, border: "none", cursor: "pointer", fontFamily: "var(--display)" }}>Falar com IA</button>
            <a href="https://wa.me/5583981751871" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8, fontWeight: 500, fontSize: 13.5, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>WhatsApp</a>
            <a href="mailto:admin@sw3.tec.br" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8, fontWeight: 500, fontSize: 13.5, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>admin@sw3.tec.br</a>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--mono)" }}>
            <span>Campina Grande — PB</span><span>(83) 98690-3799</span><span>sw3.tec.br</span>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--border-dark)", padding: "20px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={18} />
            <span style={{ fontWeight: 700, fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>SW3 INNOVATIONS BRASIL LTDA</span>
          </div>
          <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)", fontFamily: "var(--mono)" }}>© 2026 SW3 Innovations. Powered by SOLW3.</p>
        </div>
      </footer>

      {/* ════════ SOLW3 CHAT WIDGET ════════ */}
      {showChat && (
        <div style={{ position: "fixed", bottom: 20, right: 20, width: 370, maxHeight: 500, background: "#fff", border: "1px solid var(--border)", borderRadius: 16, zIndex: 9999, display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.15)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-dark)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SolweLogo size={24} />
              <div><div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>SOLW3 IA</div><div style={{ fontSize: 8.5, color: "var(--accent)", fontFamily: "var(--mono)" }}>● Online</div></div>
            </div>
            <button onClick={() => setShowChat(false)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 14, cursor: "pointer", padding: "3px 7px", borderRadius: 5 }}>✕</button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "12px 12px 4px", display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, background: "var(--bg)" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "84%", padding: "8px 12px", borderRadius: 11, background: msg.role === "user" ? "var(--bg-dark)" : "#fff", color: msg.role === "user" ? "#fff" : "var(--text)", fontSize: 12, lineHeight: 1.5, border: msg.role === "user" ? "none" : "1px solid var(--border)", borderBottomRightRadius: msg.role === "user" ? 3 : 11, borderBottomLeftRadius: msg.role === "user" ? 11 : 3 }}>{msg.text}</div>
              </div>
            ))}
            {isTyping && <div style={{ display: "flex" }}><div style={{ background: "#fff", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: 11, borderBottomLeftRadius: 3, fontSize: 12, color: "var(--text3)" }}>...</div></div>}
            <div ref={chatEndRef} />
          </div>
          {messages.length <= 2 && (
            <div style={{ padding: "0 12px 6px", display: "flex", flexWrap: "wrap", gap: 4, background: "var(--bg)" }}>
              {["Criar sistema novo", "Melhorar meu sistema", "Preciso de devs"].map((qr, i) => (
                <button key={i} onClick={() => sendMessage(qr)} style={{ background: "#fff", border: "1px solid var(--border)", color: "var(--text2)", padding: "4px 9px", borderRadius: 5, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--navy)"; e.target.style.color = "var(--text)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}
                >{qr}</button>
              ))}
            </div>
          )}
          <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 7, background: "#fff" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage(chatInput)} placeholder="Descreva o que precisa..." style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 7, padding: "8px 11px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => sendMessage(chatInput)} disabled={isTyping} style={{ background: "var(--bg-dark)", border: "none", borderRadius: 7, width: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: isTyping ? "not-allowed" : "pointer", fontSize: 14, color: "#fff", opacity: isTyping ? 0.4 : 1, fontWeight: 700 }}>→</button>
          </div>
        </div>
      )}

      {!showChat && (
        <button onClick={() => setShowChat(true)} style={{ position: "fixed", bottom: 20, right: 20, width: 50, height: 50, borderRadius: 13, background: "var(--bg-dark)", border: "1px solid var(--border-dark)", cursor: "pointer", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", transition: "all 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <SolweLogo size={26} />
        </button>
      )}

      <style>{"* { margin: 0; padding: 0; box-sizing: border-box; } html { scroll-behavior: smooth; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; } ::selection { background: rgba(125,211,252,0.2); } @media (max-width: 768px) { nav > div > div:last-child > a { display: none !important; } div[style*='repeat(4'] { grid-template-columns: 1fr 1fr !important; } div[style*='repeat(3'] { grid-template-columns: 1fr !important; } }"}</style>
    </div>
  );
}

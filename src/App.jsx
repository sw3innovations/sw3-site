import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// SOLW3 — PLATAFORMA DE AUTOMAÇÃO DE PROJETOS COM IA
// SW3 Innovations Brasil LTDA
// Navy + Soft Cyan palette | Esri-inspired
// ═══════════════════════════════════════════════════════

const LOGO_SRC = "data:image/png;base64,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AAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCC+f8B3qo3N/Dl0a4AAAAASUVORK5CYII=";

// ——— SOLW3 IA Chat System ———
const SOLW3_SYSTEM = `Você é SOLW3 (pronuncia-se "solve"), a IA da SW3 Innovations Brasil LTDA — empresa de tecnologia especializada em automação e IA em Campina Grande-PB.

Modalidades de serviço:
A) Projeto Novo — criar sistema do zero (R$3k-150k, 2-20 semanas)
B) Refatoração — modernizar sistema existente (R$5k-80k, 4-16 semanas)
C) Extensão/Plugin — adicionar features a sistema existente (R$2k-40k, 1-8 semanas)
D) Braço de Capacidade — squad sob demanda (R$4-15k/mês, mín. 3 meses)

Pós-entrega: Manutenção (R$299-4.999/mês), Managed Service (R$499-9.999/mês), Retainer (R$2.500-12k/mês).

Lab: AVM Brasil (avaliação imobiliária com IA), OTW Health (saúde digital).

Stack: React, Python, FastAPI, AWS, Claude API, WhatsApp Business API.
WhatsApp: (83) 98690-3799. Email: admin@sw3.tec.br. Site: sw3.tec.br.

Responda em português brasileiro, máximo 3 frases, tom profissional e direto. Identifique a modalidade do prospect e guie para próximo passo.`;

const FALLBACK = {
  "projeto novo": "Criamos sistemas do zero com assistência de agentes IA — do chat à entrega. Me conta: qual problema quer resolver?",
  "refatorar": "Modernizamos sistemas existentes. Oferecemos diagnóstico técnico gratuito do seu código. Quer experimentar?",
  "extensão": "Adicionamos features e integrações a sistemas existentes com escopo cirúrgico. Qual sistema quer estender?",
  "staff": "Nossos devs trabalham com agentes IA — output de 2-3x um dev solo. Qual perfil precisa?",
  "preço": "Projetos novos: R$3k-150k. Refatoração: R$5k-80k. Extensão: R$2k-40k. Staff: R$4-15k/mês. Quer um orçamento personalizado?",
  default: "Sou a SOLW3, IA da SW3 Innovations. Posso te ajudar a criar um sistema novo, melhorar um existente, ou reforçar seu time de dev. O que você precisa?"
};

function getFallback(t) { const l = t.toLowerCase(); for (const [k, v] of Object.entries(FALLBACK)) { if (k !== "default" && l.includes(k)) return v; } return FALLBACK.default; }

// ——— Components ———
function Logo({ size = 32, style = {} }) {
  return <img src={LOGO_SRC} alt="SOLW3" style={{ width: size, height: size, borderRadius: size * 0.15, objectFit: "contain", ...style }} />;
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
            {[{ l: "Soluções", h: "#solucoes" }, { l: "Como Funciona", h: "#como-funciona" }, { l: "Planos", h: "#planos" }, { l: "Lab", h: "#lab" }, { l: "Contato", h: "#contato" }].map(n => (
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

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
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
          </div>

          {/* Pipeline badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 60 }}>
            {["Conversa", "Proposta", "Execução", "Entrega", "MRR"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 14px", borderRadius: 5, fontSize: 10, color: i < 4 ? "var(--accent)" : "rgba(255,255,255,0.35)", fontFamily: "var(--mono)", fontWeight: 600 }}>{s}</div>
                {i < 4 && <div style={{ width: 16, height: 1, background: "rgba(125,211,252,0.2)" }} />}
              </div>
            ))}
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
              { icon: "✦", title: "Projeto Novo", desc: "Criar sistema do zero a partir de uma ideia. IA conduz requisitos, precifica e propõe.", ticket: "R$3k–150k", time: "2–20 semanas", color: "#7dd3fc" },
              { icon: "⟳", title: "Refatoração", desc: "Modernizar sistema existente. Diagnóstico técnico automático com score de saúde 0–100.", ticket: "R$5k–80k", time: "4–16 semanas", color: "#a78bfa" },
              { icon: "⊕", title: "Extensão / Plugin", desc: "Adicionar features ou integrações a sistema existente com escopo cirúrgico.", ticket: "R$2k–40k", time: "1–8 semanas", color: "#34d399" },
              { icon: "⊞", title: "Braço de Dev", desc: "Squad sob demanda dentro do seu repo e processos. Devs com agentes IA = 2-3x output.", ticket: "R$4–15k/mês", time: "Mín. 3 meses", color: "#fbbf24" },
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
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>PLANOS PÓS-ENTREGA</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Cada projeto vira receita recorrente</h2>
            <p style={{ color: "var(--text2)", fontSize: 14.5, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>Manutenção, managed service ou evolução contínua — escolha o que faz sentido.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {[
              { title: "Suporte & Manutenção", plans: [{ name: "Básico", price: "R$299–799/mês", feat: "Bugs + monitoramento • SLA 48h" }, { name: "Profissional", price: "R$799–1.999/mês", feat: "Bugs + segurança + 4h/mês melhorias • SLA 24h" }, { name: "Enterprise", price: "R$1.999–4.999/mês", feat: "Tudo + 12h/mês + suporte dedicado • SLA 4h" }] },
              { title: "Managed Service", plans: [{ name: "Basic", price: "R$499–1.499/mês", feat: "Hosting + monitoramento + backups" }, { name: "Pro", price: "R$1.499–3.999/mês", feat: "Tudo + evoluções 8h/mês + relatório" }, { name: "Full", price: "R$3.999–9.999/mês", feat: "Tudo + operação do sistema + 20h/mês" }] },
              { title: "Retainer (Evolução)", plans: [{ name: "10 horas", price: "R$2.500–4.000/mês", feat: "Novas features e integrações" }, { name: "20 horas", price: "R$4.500–7.000/mês", feat: "Features + refatoração + performance" }, { name: "40 horas", price: "R$8.000–12.000/mês", feat: "Equivale a meio dev dedicado" }] },
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
            <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>Propriedade intelectual que pode ser integrada como feature nos projetos do Motor 2.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { name: "AVM Brasil", desc: "Avaliação de imóveis com IA geoespacial. Laudos automatizados compatíveis com editais Caixa. Mercado de R$312bi.", status: "Em desenvolvimento", color: "#7dd3fc" },
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
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>Somos a SW3 Innovations, um laboratório de tecnologia em Campina Grande-PB. Usamos IA e automação para criar, precificar, prototipar e entregar sistemas completos — com agentes inteligentes acelerando cada etapa e humanos garantindo qualidade.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 260 }}>
              {[
                { label: "Sede", value: "Campina Grande — PB" },
                { label: "Foco", value: "IA, Automação e Software" },
                { label: "Stack", value: "React, Python, AWS, Claude" },
                { label: "Modelo", value: "4 modalidades + MRR pós-entrega" },
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
          <Logo size={48} style={{ margin: "0 auto 20px", display: "block" }} />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>Descreva sua ideia. A gente constrói.</h2>
          <p style={{ color: "var(--text-light2)", fontSize: 13.5, marginBottom: 36, lineHeight: 1.6 }}>Converse com a SOLW3 IA agora ou fale direto com a equipe pelo WhatsApp.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => setShowChat(true)} style={{ background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, border: "none", cursor: "pointer", fontFamily: "var(--display)" }}>Falar com IA</button>
            <a href="https://wa.me/5583986903799" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8, fontWeight: 500, fontSize: 13.5, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>WhatsApp</a>
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
              <Logo size={24} />
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
          <Logo size={26} />
        </button>
      )}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
        ::selection { background: rgba(125,211,252,0.2); }
        @media (max-width: 768px) {
          nav > div > div:last-child > a { display: none !important; }
          div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
// SW3 INNOVATIONS — ESRI-INSPIRED CLEAN LAYOUT
// Innovation Lab + Corporate polish
// Navy + Soft Cyan palette
// ═══════════════════════════════════════════════════

const LOGO_SRC = "data:image/png;base64,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AAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCCEQABAIIRAAEAghEAAQCC+f8B3qo3N/Dl0a4AAAAASUVORK5CYII=";

// ─── Solutions Data ───
const solutions = [
  {
    id: "customer-intelligence",
    category: "Produtos",
    name: "Customer Intelligence",
    status: "prototype",
    statusLabel: "Protótipo",
    headline: "Preveja churn. Retenha clientes automaticamente.",
    description: "Restaurantes perdem clientes sem perceber. Nosso sistema integra dados de iFood, PDV e WhatsApp, usa Machine Learning para prever quem vai parar de comprar e dispara campanhas automáticas de retenção via WhatsApp.",
    longDesc: "A plataforma analisa padrões de compra, frequência e comportamento para gerar um score de risco (0-100) por cliente. Quando o risco sobe, campanhas personalizadas são disparadas automaticamente — sem intervenção humana. O restaurante recupera receita que estava saindo pela porta sem ninguém perceber.",
    features: ["Churn Prediction com ML proprietário", "Segmentação RFM automática", "Automação WhatsApp", "Insights narrativos com IA generativa", "Dashboard em tempo real", "Integrações: iFood, PDV, Instagram"],
    techStack: ["Python", "React", "AWS", "GPT-4", "WhatsApp API"],
    market: "1M+ restaurantes no Brasil",
    pricing: "R$ 199/mês",
    videoUrl: "",
    prototypeUrl: "",
    color: "#7dd3fc",
  },
  {
    id: "solw3-ai",
    category: "Produtos",
    name: "SOLW3 AI — Chatbot Empresarial",
    status: "live",
    statusLabel: "Ativo",
    headline: "Atendimento inteligente 24/7 para o seu negócio.",
    description: "Melhore as interações com seus clientes automatizando respostas com chatbots inteligentes. IA generativa treinada no contexto do seu negócio — responde dúvidas, qualifica leads e direciona prospects sem equipe.",
    longDesc: "O SOLW3 é treinado com informações específicas do seu negócio, entende contexto e responde em linguagem natural. Quando não sabe a resposta, usa fallback inteligente. Funciona embarcado no site ou conectado ao WhatsApp Business. Ideal para empresas que querem atendimento consistente sem aumentar equipe.",
    features: ["IA generativa contextualizada", "Integração WhatsApp + Web", "Qualificação automática de leads", "Respostas em linguagem natural", "Fallback inteligente offline", "Treinamento por contexto customizado"],
    techStack: ["Claude API", "React", "Node.js"],
    market: "PMEs — qualquer segmento",
    pricing: "Sob consulta",
    videoUrl: "",
    prototypeUrl: "",
    color: "#94a3b8",
  },
  {
    id: "dev-sob-medida",
    category: "Serviços",
    name: "Desenvolvimento sob Medida",
    status: "live",
    statusLabel: "Ativo",
    headline: "Sua ideia, nossa engenharia. Resultado rápido.",
    description: "Desenvolvimento de sistemas, apps e automações customizadas para resolver problemas específicos do seu negócio. Stack moderna, equipe dedicada, entregas reais — não promessas.",
    longDesc: "Do escopo ao deploy. Desenvolvemos software customizado com stack moderna e código limpo. Já entregamos projetos em produção para clientes reais e temos equipe dedicada. Se você já sabe o que precisa, vamos direto ao código.",
    features: ["Apps web e mobile — React + Python", "Automação de processos com IA", "Integração de sistemas e APIs", "Dashboards e painéis customizados", "Infraestrutura AWS escalável", "Consultoria técnica e arquitetura"],
    techStack: ["React", "Python", "AWS", "Node.js", "PostgreSQL"],
    market: "Empresas com demanda específica",
    pricing: "Sob consulta",
    videoUrl: "",
    prototypeUrl: "",
    color: "#cbd5e1",
  },
  {
    id: "insights-dados",
    category: "Serviços",
    name: "Insights de Dados",
    status: "live",
    statusLabel: "Ativo",
    headline: "Transforme dados em decisões inteligentes.",
    description: "Extraímos insights práticos de conjuntos de dados complexos para impulsionar decisões informadas e acelerar o crescimento do seu negócio. Dashboards, relatórios automatizados e análises sob demanda.",
    longDesc: "Seus dados contam uma história — mas você precisa das ferramentas certas para ouvi-la. Criamos pipelines de dados, dashboards interativos e relatórios automatizados que transformam números brutos em direcionamento estratégico. De planilhas desorganizadas a inteligência de negócio.",
    features: ["Dashboards interativos customizados", "Pipelines de dados automatizados", "Relatórios com IA generativa", "Análise preditiva e tendências", "Integração com suas fontes de dados", "Visualizações claras para tomada de decisão"],
    techStack: ["Python", "SQL", "Power BI", "AWS", "GPT-4"],
    market: "Empresas com dados subutilizados",
    pricing: "Sob consulta",
    videoUrl: "",
    prototypeUrl: "",
    color: "#7dd3fc",
  },
  {
    id: "consultoria-ia",
    category: "Serviços",
    name: "Consultoria em IA",
    status: "live",
    statusLabel: "Ativo",
    headline: "Estratégia de IA sob medida para sua operação.",
    description: "Trabalhamos junto com sua equipe para identificar onde a IA gera mais valor, desenvolver estratégias personalizadas e implementar soluções que otimizem operações e gerem resultados mensuráveis.",
    longDesc: "Nem toda empresa precisa de um produto pronto — às vezes o caminho é entender onde a IA se encaixa na sua operação. Fazemos diagnóstico, mapeamento de oportunidades, prova de conceito e implementação. Do brainstorm à produção, com acompanhamento contínuo.",
    features: ["Diagnóstico de oportunidades com IA", "Mapeamento de processos automatizáveis", "Prova de conceito (PoC) rápida", "Implementação e integração", "Treinamento da equipe", "Acompanhamento pós-implementação"],
    techStack: ["LLMs", "Python", "Automação", "APIs"],
    market: "Empresas em transformação digital",
    pricing: "Sob consulta",
    videoUrl: "",
    prototypeUrl: "",
    color: "#94a3b8",
  },
];

const categories = [...new Set(solutions.map(s => s.category))];

const statusStyles = {
  idea: { bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.25)", text: "#64748b" },
  prototype: { bg: "rgba(125,211,252,0.1)", border: "rgba(125,211,252,0.25)", text: "#7dd3fc" },
  validating: { bg: "rgba(203,213,225,0.1)", border: "rgba(203,213,225,0.25)", text: "#cbd5e1" },
  live: { bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)", text: "#94a3b8" },
};

// ─── SOLW3 Chat ───
const SOLW3_SYSTEM = `Você é SOLW3 (pronuncia-se "solve"), a IA assistente da SW3 Innovations Brasil LTDA, um laboratório de inovação e desenvolvimento de software em Campina Grande-PB. 

Produtos: Customer Intelligence (churn prediction para restaurantes, R$199/mês, 14 dias grátis), SOLW3 AI (chatbot empresarial inteligente).

Serviços: Desenvolvimento sob Medida (React, Python, AWS, IA), Insights de Dados (dashboards, relatórios, análise preditiva), Consultoria em IA (diagnóstico, PoC, implementação).

WhatsApp: (83) 98690-3799. Email: admin@sw3.tec.br. Site: sw3.tec.br.

Responda em português brasileiro, máximo 3 frases, tom profissional e direto. Guie o prospect para o serviço mais adequado à necessidade dele.`;

const FALLBACK = {
  "customer intelligence": "O Customer Intelligence prevê churn de clientes usando ML e automatiza retenção via WhatsApp. Acesse a seção de soluções para ver o protótipo. Quer agendar uma demo?",
  "testar": "Você pode explorar nossos protótipos direto no site ou agendar uma demo pelo WhatsApp (83) 98690-3799.",
  "preço": "Customer Intelligence: R$ 199/mês com 14 dias grátis. Dev sob Medida e SOLW3 AI: orçamento sob consulta.",
  default: "Sou a SOLW3, IA da SW3 Innovations. Posso te explicar sobre nossas soluções ou agendar uma demonstração. Como posso ajudar?"
};

function getFallback(t) { const l = t.toLowerCase(); for (const [k, v] of Object.entries(FALLBACK)) { if (k !== "default" && l.includes(k)) return v; } return FALLBACK.default; }

// ─── Components ───
function Logo({ size = 32, style = {} }) {
  return <img src={LOGO_SRC} alt="SW3" style={{ width: size, height: size, borderRadius: size * 0.15, objectFit: "contain", ...style }} />;
}

function Badge({ status, label }) {
  const s = statusStyles[status] || statusStyles.idea;
  return <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, padding: "3px 10px", borderRadius: 4, fontSize: 9.5, fontWeight: 600, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>;
}

// ─── Main ───
export default function SW3Site() {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Olá! Sou a SOLW3. Como posso ajudar?" }]);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [expandedSolution, setExpandedSolution] = useState(null);
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
  const filtered = solutions.filter(s => s.category === activeTab);
  const expanded = solutions.find(s => s.id === expandedSolution);

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
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 32px",
        background: navSolid ? "rgba(255,255,255,0.95)" : "rgba(15,23,42,0.0)",
        backdropFilter: navSolid ? "blur(20px)" : "none",
        borderBottom: navSolid ? "1px solid var(--border)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: navSolid ? "var(--text)" : "#fff" }}>
            <Logo size={30} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14.5, letterSpacing: "-0.03em", lineHeight: 1 }}>SW3</div>
              <div style={{ fontSize: 7.5, color: navSolid ? "var(--text3)" : "rgba(255,255,255,0.5)", fontFamily: "var(--mono)", letterSpacing: "0.14em", fontWeight: 500 }}>INNOVATION LAB</div>
            </div>
          </a>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[{ l: "Soluções", h: "#solucoes" }, { l: "Processo", h: "#processo" }, { l: "Benefícios", h: "#beneficios" }, { l: "Contato", h: "#contato" }].map(n => (
              <a key={n.l} href={n.h} style={{ color: navSolid ? "var(--text2)" : "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 12.5, fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = navSolid ? "var(--text)" : "#fff"}
                onMouseLeave={e => e.target.style.color = navSolid ? "var(--text2)" : "rgba(255,255,255,0.65)"}
              >{n.l}</a>
            ))}
            <button onClick={() => setShowChat(true)} style={{
              background: navSolid ? "var(--bg-dark)" : "rgba(255,255,255,0.12)",
              color: navSolid ? "#fff" : "#fff",
              padding: "7px 16px", borderRadius: 7, fontWeight: 600, fontSize: 11, border: navSolid ? "none" : "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer", fontFamily: "var(--display)", transition: "all 0.3s",
            }}>Falar com SOLW3</button>
          </div>
        </div>
      </nav>

      {/* ════════ HERO — Dark, Esri-style ════════ */}
      <section style={{
        background: "var(--bg-dark)", color: "#fff", position: "relative", overflow: "hidden",
        padding: "140px 32px 100px", minHeight: 560,
      }}>
        {/* Background grid + gradient */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(125,211,252,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
        }} />
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(125,211,252,0.08), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(71,85,105,0.15), transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20, opacity: 0.9 }}>
              Inovação, soluções e pesquisa para a sua empresa
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 20 }}>
              Automação e IA que<br />transformam negócios
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-light2)", lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Ajudamos empresas a automatizar operações e escalar resultados com tecnologia de ponta. <strong style={{ color: "#e2e8f0" }}>Teste cada solução como protótipo antes que ela vire produto</strong> — ou vá direto ao desenvolvimento da sua demanda.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#solucoes" style={{
                background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8,
                fontWeight: 700, fontSize: 13.5, textDecoration: "none",
              }}>Nossos serviços</a>
              <a href="https://wa.me/5583986903799?text=Quero%20conversar%20sobre%20meu%20projeto" target="_blank" rel="noopener noreferrer" style={{
                background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8,
                fontWeight: 500, fontSize: 13.5, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)",
              }}>Conversar sobre meu projeto</a>
            </div>
          </div>

          {/* Dual path badges */}
          <div style={{ display: "flex", gap: 24, marginTop: 60, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>PRODUTOS</span>
              {["Ideia", "Protótipo", "Validação", "Produto"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 12px", borderRadius: 5, fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "var(--mono)", fontWeight: 500 }}>{s}</div>
                  {i < 3 && <div style={{ width: 12, height: 1, background: "rgba(255,255,255,0.1)" }} />}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>SERVIÇOS</span>
              {["Escopo", "Desenvolvimento", "Entrega"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 12px", borderRadius: 5, fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "var(--mono)", fontWeight: 500 }}>{s}</div>
                  {i < 2 && <div style={{ width: 12, height: 1, background: "rgba(255,255,255,0.1)" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SOLUÇÕES — Tabs + Cards (Esri pattern) ════════ */}
      <section id="solucoes" style={{ padding: "80px 32px 100px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>SOLUÇÕES E SERVIÇOS</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Serviços inovadores para o seu crescimento
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 14.5, maxWidth: 580, lineHeight: 1.6 }}>
              Produtos próprios com protótipos que você pode testar agora, e serviços sob medida para quem já sabe o que precisa.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderBottom: "2px solid var(--border)", marginBottom: 40, marginTop: 32 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} style={{
                padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "var(--display)", background: "none",
                color: activeTab === cat ? "var(--text)" : "var(--text3)",
                borderBottom: activeTab === cat ? "2px solid var(--navy)" : "2px solid transparent",
                border: "none", borderBottomWidth: 2, borderBottomStyle: "solid",
                borderBottomColor: activeTab === cat ? "var(--navy)" : "transparent",
                marginBottom: -2, transition: "all 0.2s",
              }}>{cat}</button>
            ))}
          </div>

          {/* Solution Cards */}
          <div style={{ display: "grid", gridTemplateColumns: filtered.length > 1 ? "repeat(auto-fill, minmax(340px, 1fr))" : "1fr", gap: 20 }}>
            {filtered.map(sol => (
              <div key={sol.id} style={{
                background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
                overflow: "hidden", transition: "all 0.3s", cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
                onClick={() => setExpandedSolution(sol.id === expandedSolution ? null : sol.id)}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}
              >
                {/* Image / Video area */}
                <div style={{
                  height: 200, background: "var(--bg-dark)", position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backgroundImage: "linear-gradient(135deg, #0f172a, #1e293b)",
                }}>
                  {sol.videoUrl ? (
                    <iframe src={sol.videoUrl} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media" allowFullScreen />
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 40, color: sol.color, opacity: 0.25 }}>▶</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "var(--mono)", marginTop: 6 }}>Demo em breve</div>
                    </div>
                  )}
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <Badge status={sol.status} label={sol.statusLabel} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "22px 24px" }}>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.02em", color: "var(--text)" }}>{sol.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--navy)", fontWeight: 600, marginBottom: 10 }}>{sol.headline}</p>
                  <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, marginBottom: 18 }}>{sol.description}</p>

                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
                    {sol.techStack.map((t, i) => (
                      <span key={i} style={{
                        background: "var(--bg)", border: "1px solid var(--border)",
                        padding: "2px 8px", borderRadius: 4, fontSize: 9.5, color: "var(--text2)",
                        fontFamily: "var(--mono)", fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Footer info */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 11, fontFamily: "var(--mono)" }}>
                    <span style={{ color: "var(--text3)" }}>{sol.market}</span>
                    <span style={{ color: "var(--navy)", fontWeight: 600 }}>{sol.pricing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DETAIL MODAL ════════ */}
      {expanded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, overflowY: "auto" }}
          onClick={() => setExpandedSolution(null)}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 760, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setExpandedSolution(null)} style={{ position: "absolute", top: 16, right: 16, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text2)", fontSize: 16, cursor: "pointer", padding: "4px 10px", borderRadius: 6, zIndex: 10 }}>✕</button>

            {/* Video */}
            <div style={{ height: 340, background: "linear-gradient(135deg, #0f172a, #1e293b)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px 16px 0 0" }}>
              {expanded.videoUrl ? (
                <iframe src={expanded.videoUrl} style={{ width: "100%", height: "100%", border: "none", borderRadius: "16px 16px 0 0" }} allow="autoplay; encrypted-media" allowFullScreen />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 52, color: expanded.color, opacity: 0.2 }}>▶</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "var(--mono)" }}>Vídeo demonstrativo em breve</div>
                </div>
              )}
            </div>

            <div style={{ padding: "28px 36px 36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Badge status={expanded.status} label={expanded.statusLabel} />
                <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>{expanded.market}</span>
              </div>

              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "var(--text)" }}>{expanded.name}</h2>
              <p style={{ fontSize: 14, color: "var(--navy)", fontWeight: 600, marginBottom: 16 }}>{expanded.headline}</p>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, marginBottom: 28 }}>{expanded.longDesc}</p>

              {/* Features */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Funcionalidades</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {expanded.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text)" }}>
                      <span style={{ color: "var(--accent)", fontSize: 8, marginTop: 5 }}>●</span> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Stack</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {expanded.techStack.map((t, i) => (
                    <span key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "5px 14px", borderRadius: 5, fontSize: 11.5, color: "var(--text)", fontFamily: "var(--mono)", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {expanded.prototypeUrl ? (
                  <a href={expanded.prototypeUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "block", padding: "13px 0", borderRadius: 9, textAlign: "center", background: "var(--bg-dark)", color: "#fff", fontWeight: 700, fontSize: 13.5, textDecoration: "none" }}>Testar protótipo →</a>
                ) : (
                  <div style={{ flex: 1, padding: "13px 0", borderRadius: 9, textAlign: "center", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text3)", fontSize: 12.5, fontFamily: "var(--mono)" }}>Protótipo em breve</div>
                )}
                <a href="https://wa.me/5583986903799" target="_blank" rel="noopener noreferrer" style={{ padding: "13px 24px", borderRadius: 9, border: "1px solid var(--border)", color: "var(--text2)", fontWeight: 500, fontSize: 13, textDecoration: "none" }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ DIFERENCIAL — Teste antes de investir ════════ */}
      <section style={{ padding: "80px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: 16,
            padding: "56px 52px", display: "flex", alignItems: "center", gap: 56,
            flexWrap: "wrap", position: "relative", overflow: "hidden",
          }}>
            {/* Background subtle grid */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.03,
              backgroundImage: "linear-gradient(rgba(125,211,252,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px", pointerEvents: "none",
            }} />

            <div style={{ flex: 1, minWidth: 300, position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>NOSSO DIFERENCIAL</div>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.2, marginBottom: 14 }}>
                Teste a ideia antes de investir no produto
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--text-light2)", lineHeight: 1.7, marginBottom: 24 }}>
                Cada solução que criamos nasce como um protótipo funcional e navegável. Você interage, testa com usuários reais e valida antes de comprometer investimento em desenvolvimento completo. Se funcionar, a gente constrói. Se não, o aprendizado custou uma fração do preço.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="#solucoes" style={{
                  background: "#fff", color: "var(--bg-dark)", padding: "11px 24px", borderRadius: 8,
                  fontWeight: 700, fontSize: 13, textDecoration: "none",
                }}>Ver protótipos disponíveis</a>
                <a href="https://wa.me/5583986903799?text=Quero%20prototipar%20uma%20ideia" target="_blank" rel="noopener noreferrer" style={{
                  background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "11px 24px", borderRadius: 8,
                  fontWeight: 500, fontSize: 13, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)",
                }}>Tenho uma ideia para prototipar</a>
              </div>
            </div>

            {/* Visual: pipeline steps */}
            <div style={{ minWidth: 260, position: "relative", zIndex: 1 }}>
              {[
                { num: "1", label: "Prototipamos", desc: "Versão navegável em dias", active: true },
                { num: "2", label: "Você testa", desc: "Interaja e valide com usuários", active: true },
                { num: "3", label: "Decidimos juntos", desc: "Dados reais, não achismos", active: true },
                { num: "4", label: "Desenvolvemos", desc: "Só o que provou valor", active: false },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < 3 ? 6 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: step.active ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${step.active ? "rgba(125,211,252,0.25)" : "rgba(255,255,255,0.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700,
                      color: step.active ? "var(--accent)" : "rgba(255,255,255,0.25)",
                    }}>{step.num}</div>
                    {i < 3 && <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.06)" }} />}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: step.active ? "#fff" : "rgba(255,255,255,0.4)", marginBottom: 1 }}>{step.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--mono)" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROCESSO — Dark section (Esri alternation) ════════ */}
      <section id="processo" style={{ padding: "100px 32px", background: "var(--bg-dark)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>PROCESSO</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Seu caminho para a excelência
            </h2>
            <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>
              Uma abordagem simples e eficaz para entregar resultados. Dois caminhos, o mesmo compromisso com qualidade.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { num: "01", title: "Descoberta e Análise", desc: "Nos aprofundamos nas suas necessidades, explorando ideias e definindo estratégias. Entendemos o problema antes de propor a solução." },
              { num: "02", title: "Desenvolvimento e Teste", desc: "Criamos soluções customizadas — seja um protótipo navegável ou um sistema completo. Testamos rigorosamente para garantir qualidade." },
              { num: "03", title: "Validação e Lançamento", desc: "Coletamos feedback real, medimos resultados e refinamos. Implementamos a solução e garantimos que funcione em produção." },
              { num: "04", title: "Evolução e Suporte", desc: "Acompanhamos o desempenho, mantemos a operação e evoluímos a solução conforme seu negócio cresce." },
            ].map((step, i) => (
              <div key={i} style={{
                background: "var(--surface-dark)", border: "1px solid var(--border-dark)", borderRadius: 12,
                padding: "28px 22px", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(125,211,252,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: 32, fontWeight: 700, color: "var(--accent)", opacity: 0.35, marginBottom: 14, letterSpacing: "-0.02em" }}>{step.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text-light)" }}>{step.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-light2)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ QUEM SOMOS ════════ */}
      <section style={{ padding: "80px 32px 0", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14,
            padding: "44px 48px", display: "flex", alignItems: "center", gap: 48,
            flexWrap: "wrap", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>QUEM SOMOS</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                Ajudamos empresas a automatizar operações com IA
              </h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
                Somos a SW3 Innovations, um laboratório de tecnologia em Campina Grande-PB. Criamos produtos próprios e desenvolvemos soluções customizadas para empresas que querem usar inteligência artificial e automação para crescer de verdade — sem complicação.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 260 }}>
              {[
                { label: "Sede", value: "Campina Grande — PB" },
                { label: "Foco", value: "IA, Automação e Software" },
                { label: "Stack", value: "React, Python, AWS, LLMs" },
                { label: "Modelo", value: "Produtos + Serviços sob medida" },
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

      {/* ════════ BENEFÍCIOS ════════ */}
      <section id="beneficios" style={{ padding: "80px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--navy)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>BENEFÍCIOS</div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Maximize eficiência e impacto
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 14.5, maxWidth: 500, margin: "8px auto 0", lineHeight: 1.6 }}>
              Descubra os benefícios de ser nosso parceiro.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {[
              { title: "Redução de custos", desc: "Otimize processos e simplifique operações com automação inteligente. Menos trabalho manual, menos erro, mais eficiência.", icon: "↓" },
              { title: "Resultados mensuráveis", desc: "Decisões baseadas em dados, não em achismos. Insights práticos que impulsionam o crescimento e melhoram a performance.", icon: "◎" },
              { title: "Aumento de produtividade", desc: "Automatize tarefas repetitivas, acelere processos e libere sua equipe para focar no que realmente importa.", icon: "↑" },
            ].map((b, i) => (
              <div key={i} style={{
                background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
                padding: "32px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ fontSize: 24, color: "var(--navy)", marginBottom: 14, opacity: 0.5 }}>{b.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTATO — Dark ════════ */}
      <section id="contato" style={{ padding: "100px 32px", background: "var(--bg-dark)", color: "#fff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Logo size={48} style={{ margin: "0 auto 20px", display: "block" }} />
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>
            Vamos conversar sobre seu próximo grande passo
          </h2>
          <p style={{ color: "var(--text-light2)", fontSize: 13.5, marginBottom: 36, lineHeight: 1.6 }}>Se você tem dúvidas ou quer conversar sobre o seu negócio, estamos aqui para ajudar. Entre em contato hoje mesmo.</p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <a href="https://wa.me/5583986903799" target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, textDecoration: "none" }}>WhatsApp</a>
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
          <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)", fontFamily: "var(--mono)" }}>© 2026 SW3 Innovations</p>
        </div>
      </footer>

      {/* ════════ CHAT ════════ */}
      {showChat && (
        <div style={{ position: "fixed", bottom: 20, right: 20, width: 370, maxHeight: 500, background: "#fff", border: "1px solid var(--border)", borderRadius: 16, zIndex: 9999, display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.15)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-dark)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Logo size={24} />
              <div><div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>SOLW3</div><div style={{ fontSize: 8.5, color: "var(--accent)", fontFamily: "var(--mono)" }}>● Online</div></div>
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
              {["O que vocês fazem?", "Quero testar", "Dev custom"].map((qr, i) => (
                <button key={i} onClick={() => sendMessage(qr)} style={{ background: "#fff", border: "1px solid var(--border)", color: "var(--text2)", padding: "4px 9px", borderRadius: 5, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--navy)"; e.target.style.color = "var(--text)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}
                >{qr}</button>
              ))}
            </div>
          )}
          <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 7, background: "#fff" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage(chatInput)} placeholder="Pergunte algo..." style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 7, padding: "8px 11px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit" }} />
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
          div[style*="repeat(auto-fill"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

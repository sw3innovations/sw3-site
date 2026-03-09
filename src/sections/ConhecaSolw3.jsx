var FEATURES = [
  "IA consultiva",
  "Constitution Library",
  "Agentes autônomos",
  "Deploy automatizado",
  "Audit contínuo",
  "Rastreabilidade total",
];

var PORTFOLIO = [
  { name: "AutoVendas", setor: "Indústria", sectorColor: "#7dd3fc", desc: "Automação de vendas B2B para distribuidores industriais.", status: "Em produção" },
  { name: "AVM Brasil", setor: "Fintech · Imobiliário", sectorColor: "#a78bfa", desc: "Avaliação de imóveis com IA geoespacial e laudos automatizados.", status: "Em desenvolvimento" },
  { name: "ContentHub", setor: "Marketing", sectorColor: "#34d399", desc: "Geração e publicação de conteúdo didático com IA.", status: "Entregue" },
  { name: "SmartCommerce", setor: "Varejo", sectorColor: "#f59e0b", desc: "E-commerce inteligente com pedidos via WhatsApp e entrega express.", status: "Entregue" },
  { name: "OTW", setor: "Saúde", sectorColor: "#fb7185", desc: "Saúde digital com triagem por IA.", status: "Em desenvolvimento", nupex: true },
  { name: "OTW Health", setor: "Saúde Ocupacional", sectorColor: "#fb923c", desc: "Monitoramento e acompanhamento de saúde ocupacional com IA.", status: "Em desenvolvimento", nupex: true },
];

export default function ConhecaSolw3() {
  return (
    <section id="solw3" style={{ background: "#0D1B2A", padding: "96px 32px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Parte A — Transição */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#64748b", fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>A pergunta que todo cliente faz</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.03em" }}>
            Como entregamos com<br /><span style={{ color: "#22D3EE" }}>essa qualidade?</span>
          </h2>
        </div>

        {/* Parte B — A plataforma SOLW3 */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,211,238,0.12)", borderRadius: 20, padding: "48px 40px", marginBottom: 64 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.22)", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF", display: "inline-block" }} />
              <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#00D4FF", fontWeight: 700, letterSpacing: "0.12em" }}>PLATAFORMA EM PRODUÇÃO · 13 AGENTES IA · PIPELINE SDD</span>
            </div>

            <h3 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, color: "#fff", lineHeight: 1.18, marginBottom: 18 }}>
              Conheça a SOLW3
            </h3>

            <p style={{ color: "#94A3B8", fontSize: 15.5, lineHeight: 1.65, marginBottom: 12, maxWidth: 600 }}>
              Nossa AI Software Factory que entrega sistemas completos com Constitution, Spec, Arquitetura, Código e Auditoria — em conformidade com LGPD, BACEN, CFM e ANVISA.
            </p>
            <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65, marginBottom: 32, maxWidth: 580 }}>
              Nossa IA conduz a conversa de levantamento técnico, enquanto agentes autônomos geram especificação, plano e código — tudo rastreável e auditável.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {FEATURES.map(function(f) {
                return (
                  <span key={f} style={{ padding: "5px 12px", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.18)", borderRadius: 20, color: "#94A3B8", fontSize: 12 }}>
                    {f}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Parte C — Portfólio Via SOLW3 */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 10px" }}>
              Nossos próprios produtos passam pelo mesmo pipeline SDD com 7 gates de qualidade. Dogfooding real — usamos a plataforma para construir a plataforma.
            </p>
          </div>

          <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {PORTFOLIO.map(function(p) {
              var statusColor = p.status === "Em produção" ? "#34d399" : p.status === "Entregue" ? "#60a5fa" : "#f59e0b";
              return (
                <div key={p.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 20px 18px", position: "relative", overflow: "hidden" }}>
                  <div style={{ height: 2, background: "linear-gradient(90deg, " + p.sectorColor + ", " + p.sectorColor + "40)", position: "absolute", top: 0, left: 0, right: 0 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{p.name}</h4>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, padding: "2px 7px", borderRadius: 4, background: statusColor + "20", border: "1px solid " + statusColor + "40", color: statusColor, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>{p.status}</span>
                  </div>
                  <span style={{ display: "inline-block", fontFamily: "var(--mono)", fontSize: 9, padding: "2px 7px", borderRadius: 4, background: p.sectorColor + "15", border: "1px solid " + p.sectorColor + "30", color: p.sectorColor, fontWeight: 600, marginBottom: 10 }}>{p.setor}</span>
                  <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, marginBottom: p.nupex ? 10 : 0 }}>{p.desc}</p>
                  {p.nupex && (
                    <span style={{ fontFamily: "var(--mono)", fontSize: 8.5, padding: "2px 8px", borderRadius: 4, background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.2)", color: "#94a3b8", fontWeight: 600 }}>
                      Projeto NUPEX
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Parte D — CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="https://solw3.tec.br"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", padding: "13px 32px", background: "#00D4FF", borderRadius: 10, color: "#0D1B2A", fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#22D3EE"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#00D4FF"; }}
          >
            Acessar plataforma completa →
          </a>
        </div>

      </div>
    </section>
  );
}

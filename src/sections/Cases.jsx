import { useState } from "react";

var solw3Portfolio = [
  { name: "AutoVendas", setor: "Indústria", sectorColor: "#7dd3fc", desc: "Automação de vendas B2B para distribuidores industriais.", status: "Em produção" },
  { name: "AVM Brasil", setor: "Fintech · Imobiliário", sectorColor: "#a78bfa", desc: "Avaliação de imóveis com IA geoespacial e laudos automatizados.", status: "Em desenvolvimento" },
  { name: "ContentHub", setor: "Marketing", sectorColor: "#34d399", desc: "Geração e publicação de conteúdo didático com IA.", status: "Entregue" },
  { name: "SmartCommerce", setor: "Varejo", sectorColor: "#f59e0b", desc: "E-commerce inteligente com pedidos via WhatsApp e entrega express.", status: "Entregue" },
  { name: "OTW", setor: "Saúde", sectorColor: "#fb7185", desc: "Saúde digital com triagem por IA.", status: "Em desenvolvimento", nupex: true },
  { name: "OTW Health", setor: "Saúde Ocupacional", sectorColor: "#fb923c", desc: "Monitoramento e acompanhamento de saúde ocupacional com IA.", status: "Em desenvolvimento", nupex: true },
];

var cases = [
  {
    id: "vidros",
    label: "Indústria de Vidro",
    icon: "⬡",
    modalidade: "A",
    modalidadeLabel: "Projeto Novo",
    tagline: "De planilha a sistema completo em semanas",
    challenge:
      "Operação comercial rodava em planilhas e WhatsApp manual. Pedidos se perdiam, sem visibilidade de pipeline, horas por dia em tarefas repetitivas.",
    solution:
      "Sistema web com automação de pedidos via n8n, dashboard de vendas em tempo real e fluxos automatizados de notificação por WhatsApp.",
    stack: ["React", "Node.js", "n8n", "PostgreSQL", "WhatsApp API"],
    results: [
      { value: "100%", detail: "pedidos automatizados" },
      { value: "Tempo real", detail: "dashboard vendas" },
      { value: "~8 sem", detail: "kick-off ao deploy" },
    ],
    outcome:
      "Projeto virou base do AutoVendas — nosso produto B2B para automação de vendas industriais. Validou o modelo de transformar projeto sob demanda em solução replicável.",
    color: "#7dd3fc",
  },
  {
    id: "plataforma",
    label: "Geração de Conteúdo Didático",
    icon: "◈",
    modalidade: "A",
    modalidadeLabel: "Projeto Novo",
    tagline: "Plataforma de conteúdo com IA entregue em produção",
    challenge:
      "Produção de conteúdo didático era manual, lenta e cara. Sem padronização, sem escala, e com gargalo total na equipe de criação.",
    solution:
      "Plataforma web com geração assistida por IA, fluxo de revisão e publicação automatizada. Conteúdo padronizado com escala e qualidade consistente.",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "AWS"],
    results: [
      { value: "Entregue", detail: "em produção" },
      { value: "Pipeline", detail: "novas demandas 2026" },
      { value: "Recorrente", detail: "cliente voltou" },
    ],
    outcome:
      "Primeiro case da SW3. Validou capacidade de entrega e abriu pipeline de novos projetos — o cliente retornou com demandas adicionais.",
    color: "#34d399",
  },
  {
    id: "ecommerce",
    label: "E-commerce de Automação",
    icon: "◆",
    modalidade: "A",
    modalidadeLabel: "Projeto Novo",
    tagline: "Compra via WhatsApp com entrega express em 1 hora",
    challenge:
      "Distribuidor de automação residencial e comercial operava vendas por telefone e balcão. Sem canal digital, sem controle de estoque em tempo real, e logística de entrega sem rastreamento.",
    solution:
      "E-commerce completo (PWA) com jornada de compra iniciada via WhatsApp, catálogo digital com 5 linhas de produto, pagamento integrado (Pix/cartão/boleto), emissão automática de NF-e, gestão de estoque em tempo real e sistema de alertas com escalação automática para garantir entrega em até 1h.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "WhatsApp API"],
    results: [
      { value: "1 hora", detail: "entrega express" },
      { value: "5 linhas", detail: "catálogo completo" },
      { value: "12 sem", detail: "kick-off ao go-live" },
    ],
    outcome:
      "Sistema end-to-end: do WhatsApp ao rastreamento de entrega. Integra pagamento, NF-e automática, estoque real-time e alertas inteligentes para a operação.",
    color: "#f59e0b",
  },
];

export default function Cases() {
  var _expanded = useState(null);
  var expanded = _expanded[0];
  var setExpanded = _expanded[1];

  return (
    <section id="cases" style={{ padding: "80px 32px 100px", background: "#fafafa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "#475569", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
            CASES
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#1e293b", marginBottom: 8 }}>
            Projetos que já entregamos
          </h2>
          <p style={{ color: "#64748b", fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>
            Cada projeto valida uma parte do modelo — e vira base para o próximo produto.
          </p>
        </div>

        <div className="cases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {cases.map(function(c) {
            var isOpen = expanded === c.id;
            return (
              <div key={c.id} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, overflow: "hidden", transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={function(e) { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ height: 3, background: "linear-gradient(90deg, " + c.color + ", " + c.color + "60)" }} />
                <div style={{ padding: "28px 28px 24px" }}>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: c.color + "10", border: "1px solid " + c.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: c.color }}>{c.icon}</div>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1e293b", letterSpacing: "-0.02em" }}>{c.label}</h3>
                        <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "var(--mono)" }}>Modalidade {c.modalidade}: {c.modalidadeLabel}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, color: "#475569", fontWeight: 500, lineHeight: 1.5, marginBottom: 20, fontStyle: "italic" }}>{c.tagline}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
                    {c.results.map(function(r, i) {
                      return (
                        <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: "14px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 17, fontWeight: 800, color: c.color, letterSpacing: "-0.02em", marginBottom: 2 }}>{r.value}</div>
                          <div style={{ fontSize: 9, color: "#94a3b8", fontFamily: "var(--mono)", fontWeight: 500 }}>{r.detail}</div>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={function() { setExpanded(isOpen ? null : c.id); }} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 11, cursor: "pointer", fontFamily: "var(--mono)", padding: "6px 0", width: "100%", textAlign: "left", transition: "color 0.2s" }}
                    onMouseEnter={function(e) { e.target.style.color = c.color; }}
                    onMouseLeave={function(e) { e.target.style.color = "#94a3b8"; }}
                  >{isOpen ? "▾ Menos detalhes" : "▸ Ver detalhes"}</button>

                  <div style={{ maxHeight: isOpen ? 420 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>DESAFIO</div>
                        <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6 }}>{c.challenge}</p>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>SOLUÇÃO</div>
                        <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6 }}>{c.solution}</p>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>STACK</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {c.stack.map(function(s, i) {
                            return (
                              <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 9.5, padding: "3px 8px", borderRadius: 4, background: "rgba(0,0,0,0.04)", color: "#64748b", fontWeight: 500 }}>{s}</span>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ background: c.color + "08", border: "1px solid " + c.color + "15", borderRadius: 8, padding: "12px 14px" }}>
                        <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: c.color, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 6 }}>RESULTADO</div>
                        <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.6 }}>{c.outcome}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 36, padding: "24px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: 12, color: "#94a3b8", fontFamily: "var(--mono)" }}>Próximo case pode ser o seu.</p>
        </div>

        {/* Portfólio SOLW3 — produtos próprios via pipeline */}
        <div style={{ marginTop: 72, paddingTop: 56, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", marginBottom: 14 }}>
              <span style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#00D4FF", fontWeight: 700, letterSpacing: "0.12em" }}>PRODUTO SW3 · VIA SOLW3</span>
            </div>
            <h3 style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#1e293b", marginBottom: 8 }}>
              Nossos próprios produtos, construídos via SOLW3
            </h3>
            <p style={{ color: "#64748b", fontSize: 14, maxWidth: 560, lineHeight: 1.65 }}>
              AutoVendas, AVM Brasil e ContentHub passam pelo mesmo pipeline SDD com 7 gates de qualidade. Dogfooding real — usamos a plataforma para construir a plataforma.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
            {solw3Portfolio.map(function(p) {
              var statusColor = p.status === "Em produção" ? "#34d399" : p.status === "Entregue" ? "#60a5fa" : "#f59e0b";
              return (
                <div key={p.name} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "20px 20px 18px", position: "relative", overflow: "hidden" }}>
                  <div style={{ height: 2, background: "linear-gradient(90deg, " + p.sectorColor + ", " + p.sectorColor + "40)", position: "absolute", top: 0, left: 0, right: 0 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", letterSpacing: "-0.02em" }}>{p.name}</h4>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, padding: "2px 7px", borderRadius: 4, background: statusColor + "15", border: "1px solid " + statusColor + "30", color: statusColor, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>{p.status}</span>
                  </div>
                  <span style={{ display: "inline-block", fontFamily: "var(--mono)", fontSize: 9, padding: "2px 7px", borderRadius: 4, background: p.sectorColor + "12", border: "1px solid " + p.sectorColor + "25", color: p.sectorColor, fontWeight: 600, marginBottom: 10 }}>{p.setor}</span>
                  <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: "var(--mono)", fontSize: 8.5, padding: "2px 8px", borderRadius: 4, background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF", fontWeight: 600 }}>
                      ◈ Via SOLW3
                    </span>
                    {p.nupex && (
                      <span style={{ fontFamily: "var(--mono)", fontSize: 8.5, padding: "2px 8px", borderRadius: 4, background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.2)", color: "#94a3b8", fontWeight: 600 }}>
                        Projeto NUPEX
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

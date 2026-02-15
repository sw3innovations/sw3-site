var STEPS = [
  { num: "01", title: "Conversa com IA", desc: "Descreva o que precisa. A SOLW3 IA identifica a modalidade, faz perguntas inteligentes e mapeia requisitos em 15-30 minutos.", time: "15–30 min" },
  { num: "02", title: "Proposta Completa", desc: "Escopo, stack técnica, timeline e preço — tudo gerado automaticamente. Você vê o preço ajustar em tempo real conforme seleciona features.", time: "Instantâneo" },
  { num: "03", title: "Execução por Agentes", desc: "Agentes de IA (ARCH, BACK, FRONT, QA, DEPLOY) constroem o sistema. Você acompanha e valida cada entrega em staging.", time: "Semanas" },
  { num: "04", title: "Entrega + Suporte", desc: "Sistema em produção, documentação gerada por IA, código no GitHub. Planos de manutenção e evolução contínua.", time: "Contínuo" },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" style={{ padding: "100px 20px", background: "var(--bg-dark)", color: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>COMO FUNCIONA</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>De conversa a sistema em horas, não meses</h2>
          <p style={{ color: "var(--text-light2)", fontSize: 14.5, maxWidth: 560, lineHeight: 1.6 }}>O mercado tradicional leva 2-3 meses antes de ver qualquer coisa. Com SOLW3, você sai do chat com proposta completa.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {STEPS.map(function(s, i) {
            return (
              <div key={i} style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)", borderRadius: 12, padding: "28px 22px", transition: "all 0.3s" }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = "rgba(125,211,252,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = "var(--border-dark)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 32, fontWeight: 700, color: "var(--accent)", opacity: 0.35, letterSpacing: "-0.02em" }}>{s.num}</div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{s.time}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text-light)" }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-light2)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

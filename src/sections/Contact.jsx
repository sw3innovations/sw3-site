import { SolweLogo } from "../components/Logo";

export default function Contact() {
  return (
    <section id="contato" style={{ padding: "100px 40px", background: "var(--bg-dark)", color: "#fff" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <SolweLogo size={48} style={{ margin: "0 auto 20px", display: "block" }} />
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>Descreva sua ideia. A gente constrói.</h2>
        <p style={{ color: "var(--text-light2)", fontSize: 13.5, marginBottom: 36, lineHeight: 1.6 }}>Fale com a equipe pelo WhatsApp ou envie um e-mail.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <a href="https://wa.me/5583981751871?text=Oi%2C%20vim%20do%20site%20SOLW3" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8, fontWeight: 500, fontSize: 13.5, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>WhatsApp</a>
          <a href="mailto:admin@sw3.tec.br" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", padding: "12px 28px", borderRadius: 8, fontWeight: 500, fontSize: 13.5, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>admin@sw3.tec.br</a>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--mono)" }}>
          <span>Campina Grande — PB</span><span>sw3.tec.br</span>
        </div>
      </div>
    </section>
  );
}

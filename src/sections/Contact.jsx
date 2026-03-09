import { SolweLogo } from "../components/Logo";

function openWidget() { window.dispatchEvent(new CustomEvent("sw3:openWidget")); }

export default function Contact() {
  return (
    <section id="contato" style={{ padding: "100px 40px", background: "var(--bg-dark)", color: "#fff" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <SolweLogo size={48} style={{ margin: "0 auto 20px", display: "block" }} />
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 14 }}>Descreva sua ideia. A gente constrói.</h2>
        <p style={{ color: "var(--text-light2)", fontSize: 13.5, marginBottom: 36, lineHeight: 1.6 }}>Converse com a SOLW3 IA agora ou fale direto com a equipe pelo WhatsApp.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <button onClick={openWidget} style={{ background: "#fff", color: "var(--bg-dark)", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13.5, border: "none", cursor: "pointer", fontFamily: "var(--display)" }}>Falar com IA</button>
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

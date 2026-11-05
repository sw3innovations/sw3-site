import { whatsappUrl } from "../content";

// Botão flutuante: atalho fixo para o WhatsApp comercial da SW3.
export default function WhatsAppButton({ label, whatsappText }) {
  return (
    <a href={whatsappUrl(whatsappText)} target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 998,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 22px",
        borderRadius: 999,
        background: "#ffffff",
        color: "#0D1B2A",
        fontWeight: 700,
        fontSize: 14,
        textDecoration: "none",
        boxShadow: "0 8px 32px rgba(255,255,255,0.18)",
        fontFamily: "'DM Sans', sans-serif",
        transition: "transform 0.2s",
      }}
      onMouseEnter={function(e) { e.currentTarget.style.transform = "scale(1.05)"; }}
      onMouseLeave={function(e) { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span style={{ fontSize: 15 }}>💬</span> {label}
    </a>
  );
}

export default function GlobalStyles() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{"* { margin: 0; padding: 0; box-sizing: border-box; } html { scroll-behavior: smooth; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; } ::selection { background: rgba(125,211,252,0.2); } @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } } @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } } @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-hamburger { display: block !important; } .hero-terminal { flex: 1 1 100% !important; min-width: 0 !important; } .pipeline-badges { flex-wrap: wrap !important; } .chat-widget { width: calc(100% - 24px) !important; left: 12px !important; right: 12px !important; bottom: 12px !important; max-height: 70vh !important; } .quem-somos-card { padding: 24px 20px !important; } section { padding-left: 16px !important; padding-right: 16px !important; } nav { padding: 0 16px !important; } div[style*='repeat(4'] { grid-template-columns: 1fr 1fr !important; gap: 10px !important; } div[style*='repeat(3'] { grid-template-columns: 1fr !important; gap: 10px !important; } } @media (max-width: 480px) { div[style*='repeat(4'] { grid-template-columns: 1fr !important; } }"}</style>
    </>
  );
}

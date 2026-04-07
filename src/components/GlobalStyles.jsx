export default function GlobalStyles() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; overflow-x: hidden; background: #0c0c0c; }
        body { overflow-x: hidden; font-family: 'DM Sans', sans-serif; background: #0c0c0c; color: #f5f5f7; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #141417; border-radius: 2px; }
        ::selection { background: rgba(124,58,237,0.3); }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .hero-terminal { display: none !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding: 0 20px !important; }
          div[style*='repeat(4'] { grid-template-columns: 1fr 1fr !important; }
          div[style*='repeat(3'] { grid-template-columns: 1fr !important; }
          .cases-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          div[style*='repeat(4'] { grid-template-columns: 1fr !important; }
          div[style*='repeat(2'] { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
          nav { padding: 0 16px !important; }
        }
      `}</style>
    </>
  );
}

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
        ::selection { background: rgba(90,140,170,0.35); }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .grid-5 { grid-template-columns: 1fr 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding: 0 20px !important; }
        }
        @media (max-width: 480px) {
          .grid-5, .grid-2 { grid-template-columns: 1fr !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
          footer { padding-left: 16px !important; padding-right: 16px !important; }
          nav { padding: 0 16px !important; }
        }
      `}</style>
    </>
  );
}

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { cssVars } from "./theme";
import { content } from "./content";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";

function Site({ lang }) {
  var t = content[lang];

  useEffect(function() {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.title = t.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [lang]);

  return (
    <>
      <Navbar t={t} />
      <Home t={t} />
      <Footer t={t} whatsappText={t.whatsappText} />
      <WhatsAppButton label={t.floating} whatsappText={t.whatsappText} />
    </>
  );
}

export default function App() {
  return (
    <div style={Object.assign({}, cssVars, {
      fontFamily: "'DM Sans', sans-serif",
      background: "#0c0c0c",
      color: "var(--text)",
      minHeight: "100vh",
    })}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Site lang="pt" />} />
        <Route path="/en" element={<Site lang="en" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

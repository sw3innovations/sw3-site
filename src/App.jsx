import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { cssVars } from "./theme";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";

function HomeLayout() {
  var _scroll = useState(0);
  var scrollY = _scroll[0];
  var setScrollY = _scroll[1];

  useEffect(function() {
    var fn = function() { setScrollY(window.scrollY); };
    window.addEventListener("scroll", fn, { passive: true });
    return function() { window.removeEventListener("scroll", fn); };
  }, []);

  return (
    <>
      <Navbar scrollY={scrollY} />
      <Home />
      <Footer />
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <div style={Object.assign({}, cssVars, {
      fontFamily: "var(--display)",
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
    })}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        {/* /ia era a IA local legada — agora o widget SOLW3 é o único ponto de entrada */}
        <Route path="/ia" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

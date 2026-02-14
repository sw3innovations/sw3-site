import { useState, useEffect } from "react";
import { cssVars } from "./theme";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";

export default function App() {
  var _chat = useState(false);
  var showChat = _chat[0];
  var setShowChat = _chat[1];

  var _scroll = useState(0);
  var scrollY = _scroll[0];
  var setScrollY = _scroll[1];

  useEffect(function() {
    var fn = function() { setScrollY(window.scrollY); };
    window.addEventListener("scroll", fn, { passive: true });
    return function() { window.removeEventListener("scroll", fn); };
  }, []);

  var openChat = function() { setShowChat(true); };
  var closeChat = function() { setShowChat(false); };

  return (
    <div style={Object.assign({}, cssVars, {
      fontFamily: "var(--display)",
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
    })}>
      <GlobalStyles />
      <Navbar scrollY={scrollY} onOpenChat={openChat} />
      <Home onOpenChat={openChat} />
      <Footer />
      <ChatWidget show={showChat} onClose={closeChat} onOpen={openChat} />
    </div>
  );
}

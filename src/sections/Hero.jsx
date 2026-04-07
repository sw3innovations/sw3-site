import { useEffect, useRef } from "react";
import { Logo } from "../components/Logo";

var PARTNERS = ["AutoVendas", "ContentHub", "SmartCommerce", "AVM Brasil", "OTW Health"];

function GridCanvas() {
  var canvasRef = useRef(null);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W, H;
    var animId;
    var t = 0;

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    var COLS = 28;
    var ROWS = 16;

    // Gentle wave
    function waveY(wx, wz) {
      return Math.sin(wx * 0.55 + wz * 1.1 + t * 0.45) * 0.22
           + Math.sin(wx * 1.3 - wz * 0.6 + t * 0.30) * 0.12
           + Math.sin(wx * 0.25 + wz * 1.9 - t * 0.18) * 0.07;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Flat plane with very mild perspective tilt
      // Rows evenly spaced (nearly no compression) → strong horizontal feel
      // Columns perfectly parallel → no convergence
      // Wave gives the 3D depth illusion instead of perspective distortion

      var gridTop    = H * 0.22;   // grid starts high — behind the headline
      var gridBottom = H * 1.12;   // bleeds past bottom
      var padX       = W * 0.12;   // how far it bleeds past each side

      var grid = [];

      for (var r = 0; r <= ROWS; r++) {
        grid[r] = [];
        var rT = r / ROWS; // 0 = top row, 1 = bottom row

        // Even vertical spacing — barely any perspective compression
        // Just a tiny ease-in so the very top rows are slightly closer together
        var easedT = rT * (0.92 + rT * 0.08);
        var baseY = gridTop + easedT * (gridBottom - gridTop);

        for (var c = 0; c <= COLS; c++) {
          var cT = c / COLS;
          // Columns perfectly parallel — full width + bleed
          var sx = -padX + cT * (W + padX * 2);

          // World coords for wave
          var wx = (cT - 0.5) * 12;
          var wz = rT * 6;
          // Wave amplitude grows from top to bottom → depth illusion
          var waveAmp = 14 + rT * 28;
          var wave = waveY(wx, wz) * waveAmp;

          grid[r][c] = { x: sx, y: baseY - wave, rT: rT };
        }
      }

      // ── Horizontal lines ──────────────────────────────────────
      for (var r2 = 0; r2 <= ROWS; r2++) {
        var rT2 = r2 / ROWS;
        var alpha = 0.05 + rT2 * 0.13;
        var lw = 0.4 + rT2 * 0.5;
        ctx.strokeStyle = "rgba(255,255,255," + alpha.toFixed(3) + ")";
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(grid[r2][0].x, grid[r2][0].y);
        for (var c2 = 1; c2 <= COLS; c2++) {
          var cur = grid[r2][c2];
          var prv = grid[r2][c2 - 1];
          ctx.quadraticCurveTo(prv.x, prv.y, (prv.x + cur.x) * 0.5, (prv.y + cur.y) * 0.5);
        }
        ctx.lineTo(grid[r2][COLS].x, grid[r2][COLS].y);
        ctx.stroke();
      }

      // ── Vertical lines (perfectly parallel) ───────────────────
      for (var c3 = 0; c3 <= COLS; c3++) {
        var edgeT = Math.abs(c3 / COLS - 0.5) * 2;
        var valpha = 0.03 + (1 - edgeT * 0.6) * 0.08;
        ctx.strokeStyle = "rgba(255,255,255," + valpha.toFixed(3) + ")";
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(grid[0][c3].x, grid[0][c3].y);
        for (var rv = 1; rv <= ROWS; rv++) {
          var curV = grid[rv][c3];
          var prvV = grid[rv - 1][c3];
          ctx.quadraticCurveTo(prvV.x, prvV.y, (prvV.x + curV.x) * 0.5, (prvV.y + curV.y) * 0.5);
        }
        ctx.lineTo(grid[ROWS][c3].x, grid[ROWS][c3].y);
        ctx.stroke();
      }

      // ── Dots ──────────────────────────────────────────────────
      for (var rd = 0; rd <= ROWS; rd++) {
        var rdT = rd / ROWS;
        for (var cd = 0; cd <= COLS; cd++) {
          if ((rd + cd) % 2 !== 0) continue;
          var pd = grid[rd][cd];
          if (pd.y < -10 || pd.y > H + 10) continue;
          var da = 0.06 + rdT * rdT * 0.30;
          var dotR = 0.5 + rdT * 1.1;
          ctx.fillStyle = "rgba(255,255,255," + da.toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(pd.x, pd.y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function loop() {
      t += 0.006;
      draw();
      animId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    var ro = new ResizeObserver(function() { resize(); });
    ro.observe(canvas);
    return function() {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
  );
}

export default function Hero() {
  return (
    <section style={{
      background: "#080808",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 40px 80px",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Canvas perspective grid */}
      <GridCanvas />

      {/* Fades */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to bottom, rgba(0,0,0,1), transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, rgba(0,0,0,1), transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "15%", background: "linear-gradient(to right, #080808, transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "15%", background: "linear-gradient(to left, #080808, transparent)", pointerEvents: "none", zIndex: 1 }} />


      {/* Content */}
      <div style={{ maxWidth: 760, width: "100%", margin: "0 auto", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        {/* Eyebrow badge — Logo icon + gradient text (base.html pattern) */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 999,
          padding: "7px 18px 7px 10px",
        }}>
          <Logo size={22} />
          <span style={{ fontSize: 13.5, fontWeight: 400, letterSpacing: "0.01em", color: "rgba(255,255,255,0.6)" }}>
            SW3 Innovations · Software e Soluções com IA
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 5.5vw, 64px)",
          fontWeight: 400,
          lineHeight: 1.07,
          letterSpacing: "-0.03em",
          marginBottom: 24,
          color: "#f5f5f7",
        }}>
          Descreva sua ideia.<br />
          Nós construímos o sistema.
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 17, color: "#949494", lineHeight: 1.6, marginBottom: 48, maxWidth: 500, fontWeight: 400 }}>
          Fale com a SW3, receba proposta em tempo real e acompanhe a construção do seu sistema.
        </p>

        {/* CTA — with purple inset glow from base.html */}
        <button
          onClick={function() { window.dispatchEvent(new Event("sw3:openWidget")); }}
          style={{
            background: "#5a8caa",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: 10,
            fontWeight: 500,
            fontSize: 16,
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.01em",
            marginBottom: 96,
            transition: "background 0.2s",
          }}
          onMouseEnter={function(e) { e.currentTarget.style.background = "#4a7a96"; }}
          onMouseLeave={function(e) { e.currentTarget.style.background = "#5a8caa"; }}
        >
          Falar com a SW3
        </button>

        {/* Trust */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13.5, color: "#f5f5f7", fontWeight: 400 }}>Projetos entregues</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {[0,1,2,3,4].map(function(i) {
              return (
                <svg key={i} width="16" height="16" viewBox="0 0 20 19" fill="white">
                  <path d="M10 0L12.35 6.18H19L13.82 10.01L15.88 16.18L10 12.35L4.12 16.18L6.18 10.01L1 6.18H7.65L10 0Z"/>
                </svg>
              );
            })}
            <span style={{ fontSize: 14, color: "#949494", marginLeft: 8 }}>4.8 / 5</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {PARTNERS.map(function(p, i) {
              return (
                <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>{p}</span>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

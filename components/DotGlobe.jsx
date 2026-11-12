"use client";
import { useEffect, useRef, useState } from "react";
import DOTS from "../lib/globe-dots.json";

const RAD = Math.PI / 180;
// Simple dotted globe that turns slowly. Only the top-left part shows inside its card.
export default function DotGlobe() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, on = false; const t0 = performance.now();
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = (now) => {
      const lon = -10 + ((now - t0) / 1000) * 4, c0 = 24 * RAD, R = w * 0.5, cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = getComputedStyle(cv).color;
      for (let i = 0; i < DOTS.length; i++) {
        const p = DOTS[i][0] * RAD, l = (DOTS[i][1] - lon) * RAD;
        const z = Math.sin(p) * Math.sin(c0) + Math.cos(p) * Math.cos(l) * Math.cos(c0);
        if (z <= 0.02) continue;
        const x = Math.cos(p) * Math.sin(l), y = Math.sin(p) * Math.cos(c0) - Math.cos(p) * Math.cos(l) * Math.sin(c0);
        ctx.globalAlpha = 0.15 + 0.6 * z;
        ctx.beginPath(); ctx.arc(cx + x * R, cy - y * R, 1.15, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (on && !reduce) raf = requestAnimationFrame(draw);
    };
    size(); draw(performance.now());
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); }); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; cancelAnimationFrame(raf); if (on && !reduce) raf = requestAnimationFrame(draw); }); io.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return <canvas ref={ref} className="dg" aria-hidden="true" />;
}

export function LocalClock({ tz = "Europe/Tirane" }) {
  const [t, setT] = useState("");
  useEffect(() => { const f = () => setT(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(new Date())); f(); const id = setInterval(f, 20000); return () => clearInterval(id); }, [tz]);
  return <span suppressHydrationWarning>{t}</span>;
}

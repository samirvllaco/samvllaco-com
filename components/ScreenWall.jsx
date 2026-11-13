"use client";
import { useEffect, useRef } from "react";
import { WALL } from "../lib/wall";

// A wall of screens that starts zoomed in and zooms out as you scroll through the section.
export default function ScreenWall() {
  const sec = useRef(null);
  const grid = useRef(null);
  useEffect(() => {
    const s = sec.current, g = grid.current;
    if (!s || !g) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = s.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      const e = 1 - Math.pow(1 - p, 2);
      const from = parseFloat(getComputedStyle(g).getPropertyValue("--from")) || 2.6;
      g.style.transform = `scale(${(from - (from - 1) * e).toFixed(4)})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="wall" ref={sec} aria-label="A wall of screens from recent projects" data-bg="#000000">
      <div className="wall-stick">
        <ul className="wall-stats">
          <li><i className="ws-lr ws-lr-l" aria-hidden="true" /><div><b>10+</b><span>years of experience</span></div><i className="ws-lr ws-lr-r" aria-hidden="true" /></li>
          <li><i className="ws-lr ws-lr-l" aria-hidden="true" /><div><b>10,000+</b><span>screens designed, and counting</span></div><i className="ws-lr ws-lr-r" aria-hidden="true" /></li>
          <li><i className="ws-lr ws-lr-l" aria-hidden="true" /><div><b>570+</b><span>clients</span></div><i className="ws-lr ws-lr-r" aria-hidden="true" /></li>
        </ul>
        <div className="wall-grid" ref={grid} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {WALL.map((src, i) => <div className="wall-cell" key={src}><img className="wl" src={src} width="960" height="540" alt="" loading="lazy" decoding="async" /><img className="wd" src={src.replace("/wall/", "/wall/dark/").split("?")[0] + "?v=9"} width="960" height="540" alt="" loading={Math.abs(i - 38) < 9 ? "eager" : "lazy"} decoding="async" /></div>)}
        </div>
      </div>
    </section>
  );
}

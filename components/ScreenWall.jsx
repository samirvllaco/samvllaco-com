"use client";
import { useEffect, useRef } from "react";
import { WALL } from "../lib/wall";

// A wall of screens that starts zoomed in, zooms out as you scroll through the section, then pans on through the rows.
// With `cta` it is the closing call at the top of the footer (owner, 27 Nov 2026: "the scroll of projects and work can be
// in footer now ... combined with our already existing cta"): the call sits centred over the dimmed wall while it zooms,
// every screen loads lazily, and the stats row is left out.
export default function ScreenWall({ cta = null }) {
  const sec = useRef(null);
  const grid = useRef(null);
  const lines = useRef(null);
  useEffect(() => {
    const s = sec.current, g = grid.current, ln = lines.current;
    if (!s || !g) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = s.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      // First 60% of the section: zoom out. The rest: pan on down through the rows below the fold.
      const z = Math.min(1, p / 0.6), e = 1 - Math.pow(1 - z, 2);
      const from = parseFloat(getComputedStyle(g).getPropertyValue("--from")) || 2.6;
      const k = p <= 0.6 ? 0 : (p - 0.6) / 0.4, pan = k * k * (3 - 2 * k);
      const room = Math.max(0, (g.offsetHeight - window.innerHeight) / 2 + 48);
      const sc = from - (from - 1) * e, ty = -room * pan;
      g.style.transform = `translateY(${ty.toFixed(1)}px) scale(${sc.toFixed(4)})`;
      // Hairlines between the screens are drawn on a layer that is not scaled, so they stay 1px and crisp
      // through the whole zoom (owner, 27 Nov 2026: "on scroll use thin strokes").
      if (ln) {
        const W = g.offsetWidth, H = g.offsetHeight, cols = getComputedStyle(g).gridTemplateColumns.split(" ").length;
        const cell = g.children[1] || g.children[0];
        const cw = (W / cols) * sc, ch = (cell ? cell.offsetHeight : W / cols * 0.5625) * sc;
        const ox = g.offsetLeft + W / 2 - (W * sc) / 2, oy = g.offsetTop + H / 2 - (H * sc) / 2 + ty;
        // Paint-only: the layer keeps its box (inset 0), only the background and the clip follow the zoom, so nothing
        // shifts in layout (it used to set left/top/width/height every frame, which Google counted as layout shift).
        const Ws = W * sc, Hs = H * sc, SW = ln.offsetWidth, SH = ln.offsetHeight, f = (v) => v.toFixed(1);
        ln.style.backgroundSize = `${cw.toFixed(2)}px ${ch.toFixed(2)}px, ${cw.toFixed(2)}px ${ch.toFixed(2)}px, 1px ${f(Hs)}px, ${f(Ws)}px 1px`;
        ln.style.backgroundPosition = `${f(ox)}px ${f(oy)}px, ${f(ox)}px ${f(oy)}px, ${f(ox + Ws - 1)}px ${f(oy)}px, ${f(ox)}px ${f(oy + Hs - 1)}px`;
        ln.style.clipPath = `inset(${f(Math.max(0, oy))}px ${f(Math.max(0, SW - ox - Ws))}px ${f(Math.max(0, SH - oy - Hs))}px ${f(Math.max(0, ox))}px)`;
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className={cta ? "wall wall-foot" : "wall"} ref={sec} aria-label={cta ? undefined : "A wall of screens from recent projects"} aria-labelledby={cta ? "wall-h" : undefined} data-bg="#0e0e10">
      <div className="wall-stick">
        {cta ? <div className="wall-cta">{cta}</div> : (
        <ul className="wall-stats">
          <li><div><b>10,000+</b><span>screens</span></div></li>
          <li className="ws-main"><i className="ws-lr ws-lr-l" aria-hidden="true" /><div><b>10+</b><span>years of experience</span></div><i className="ws-lr ws-lr-r" aria-hidden="true" /></li>
          <li><div><b>570+</b><span>clients</span></div></li>
        </ul>
        )}
        <div className="wall-lines" ref={lines} aria-hidden="true" />
        <div className="wall-grid" ref={grid} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {WALL.map((src, i) => <div className="wall-cell" key={src}>{cta ? null : <img className="wl" src={src} width="960" height="540" alt="" loading="lazy" decoding="async" />}<img className="wd" src={src.replace("/wall/", "/wall/dark/").split("?")[0] + "?v=9"} width="960" height="540" alt="" loading={!cta && Math.abs(i - 45) < 9 ? "eager" : "lazy"} decoding="async" /></div>)}
        </div>
      </div>
    </section>
  );
}

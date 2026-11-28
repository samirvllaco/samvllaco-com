"use client";
import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapLoad";

// Reading progress across the top of case studies and articles (owner, 28 Nov 2026: "make the top line thicker and
// animated, consistent, use GSAP"): a 4px blue line, the same look as the rails beside the steps and the contents list,
// eased by GSAP so it glides instead of stepping with the scroll. Reduced motion follows the scroll directly.
export default function ReadLine() {
  const bar = useRef(null);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const v = { p: 0 };
    let q = null, raf = 0;
    const paint = () => { el.style.transform = `scaleX(${v.p.toFixed(4)})`; };
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (q) q(t); else { v.p = t; paint(); }
    };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loadGsap().then((g) => { if (g) { q = g.quickTo(v, "p", { duration: 0.5, ease: "power3.out", onUpdate: paint }); update(); } });
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="dl-read" aria-hidden="true"><span ref={bar} /></div>;
}

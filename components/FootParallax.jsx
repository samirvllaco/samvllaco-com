"use client";
import { useEffect } from "react";
import { loadGsap } from "../lib/gsapLoad";

// The footer rises in parallax (owner, 28 Nov 2026, like digitalmakers.nl/about-us): while it enters the screen its
// content trails the scroll, starting 30% of a screen higher and settling at rest by the time the footer reaches the
// top, as if it sat behind the page. The footer clips its top edge so the content slides out from under it. GSAP eases
// the value; without it the value is set straight from the scroll. Only footers with the wall of screens, and never
// with reduced motion.
export default function FootParallax() {
  useEffect(() => {
    const f = document.querySelector(".site-footer");
    if (!f || !f.querySelector(".wall") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = { v: 0 };
    let to = null;
    let raf = 0;
    let asked = false;
    const paint = () => {
      f.style.setProperty("--fp", `${o.v.toFixed(1)}px`);
      f.classList.toggle("fp-on", o.v < -0.5);
    };
    const update = () => {
      raf = 0;
      const r = f.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top > vh * 2) { if (o.v !== 0) { o.v = 0; paint(); } return; }
      if (!asked) { asked = true; loadGsap().then((g) => { if (g) to = g.quickTo(o, "v", { duration: 0.5, ease: "power3.out", onUpdate: paint }); }); }
      const span = Math.max(1, Math.min(r.height, vh));
      const k = Math.min(1, Math.max(0, (vh - r.top) / span));
      const target = -Math.round(Math.min(vh, r.height) * 0.3 * (1 - k));
      if (to) to(target);
      else { o.v = target; paint(); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      f.classList.remove("fp-on");
      f.style.removeProperty("--fp");
    };
  }, []);
  return null;
}

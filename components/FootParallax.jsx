"use client";
import { useEffect } from "react";
import { loadPlugins, reduced, watch } from "../lib/motion";

// The footer rises in parallax (owner, 28 Nov 2026, like digitalmakers.nl/about-us): while it enters the screen its
// content trails the scroll, starting 30% of a screen higher and settling at rest by the time the footer reaches the
// top, as if it sat behind the page. The footer clips its top edge so the content slides out from under it. ScrollTrigger
// scrubs the value over that stretch (owner, 28 Nov 2026: "do all"); it loads when the footer is two screens away.
// Only footers with the wall of screens, and never with reduced motion.
export default function FootParallax() {
  useEffect(() => {
    const f = document.querySelector(".site-footer");
    if (!f || !f.querySelector(".wall") || reduced()) return;
    const o = { v: 0 };
    const paint = () => { f.style.setProperty("--fp", `${o.v.toFixed(1)}px`); f.classList.toggle("fp-on", o.v < -0.5); };
    const span = () => Math.max(1, Math.min(f.offsetHeight, innerHeight));
    let tw = null, gone = false;
    const off = watch(f, (on) => {
      if (!on || tw) return;
      off();
      loadPlugins("ScrollTrigger").then((g) => {
        if (!g || gone) return;
        tw = g.fromTo(o, { v: () => -Math.round(span() * 0.3) }, { v: 0, ease: "none", onUpdate: paint, scrollTrigger: { trigger: f, start: "top bottom", end: () => `+=${span()}`, scrub: 0.5, invalidateOnRefresh: true } });
      });
    }, { rootMargin: "200% 0px 200% 0px" });
    return () => {
      gone = true; off();
      if (tw) { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); }
      f.classList.remove("fp-on");
      f.style.removeProperty("--fp");
    };
  }, []);
  return null;
}

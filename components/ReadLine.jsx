"use client";
import { useEffect, useRef } from "react";
import { loadPlugins, reduced } from "../lib/motion";

// Reading progress across the top of case studies and articles (owner, 28 Nov 2026: "make the top line thicker and
// animated, consistent, use GSAP"): a 4px blue line, the same look as the rails beside the steps and the contents list.
// GSAP ScrollTrigger scrubs it from the top of the page to the end (owner, 28 Nov 2026: "do all"), eased so it glides
// instead of stepping with the scroll; reduced motion follows the scroll directly. Without GSAP a scroll listener sets it.
export default function ReadLine() {
  const bar = useRef(null);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let tw = null, gone = false, raf = 0;
    const plain = () => {
      const update = () => { raf = 0; const end = document.querySelector(".end-mark"); const max = end ? end.getBoundingClientRect().bottom + scrollY - innerHeight : document.documentElement.scrollHeight - innerHeight; el.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0})`; };
      const on = () => { if (!raf) raf = requestAnimationFrame(update); };
      update(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
      return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
    };
    let off = null;
    loadPlugins("ScrollTrigger").then((g) => {
      if (gone) return;
      if (!g) { off = plain(); return; }
      // The line is full when the article or case study ends (its end card), not at the foot of the page (owner, 28 Nov
      // 2026: "don't include More articles in the table of contents and in the animation on top").
      const end = document.querySelector(".end-mark");
      tw = g.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: end ? { start: 0, endTrigger: end, end: "bottom bottom", scrub: reduced() ? true : 0.5 } : { start: 0, end: "max", scrub: reduced() ? true : 0.5 } });
    });
    return () => { gone = true; if (tw) { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); } if (off) off(); };
  }, []);
  return <div className="dl-read" aria-hidden="true"><span ref={bar} /></div>;
}

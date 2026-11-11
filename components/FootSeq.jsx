"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plays a frame sequence as the footer scrolls into view: first frame at the top of the footer, last at the end of the page.
export default function FootSeq({ frames }) {
  const ref = useRef(null);
  useEffect(() => {
    const img = ref.current;
    if (!img || frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    frames.forEach((src) => { const i = new Image(); i.src = src; });
    const state = { f: 0 };
    let shown = 0;
    const tween = gsap.to(state, {
      f: frames.length - 1, ease: "none",
      scrollTrigger: { trigger: img.closest(".foot-stage"), start: "top 85%", end: "bottom bottom", scrub: 0.4 },
      onUpdate: () => { const n = Math.round(state.f); if (n !== shown) { shown = n; img.src = frames[n]; } },
    });
    return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill(); };
  }, [frames]);
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} className="foot-cut foot-seq" src={frames[0]} width="1254" height="1254" alt="" aria-hidden="true" />;
}

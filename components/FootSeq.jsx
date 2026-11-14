"use client";
import { useEffect, useRef } from "react";

// Plays a frame sequence as the footer scrolls into view: first frame at the top of the footer, last at the end of the page.
// No animation library: it reads scroll position only while the footer is near the screen, inside requestAnimationFrame,
// and loads the frames only when the footer gets close.
export default function FootSeq({ frames }) {
  const ref = useRef(null);
  useEffect(() => {
    const img = ref.current;
    if (!img || frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = img.closest(".foot-stage") || img;
    let near = false, raf = 0, shown = 0, cur = 0, loaded = false;
    const last = frames.length - 1;
    const target = () => {
      const r = stage.getBoundingClientRect(), vh = window.innerHeight;
      // 0 when the footer top reaches 85% of the screen, 1 when the page bottom reaches the screen bottom
      const span = Math.max(1, r.height - vh * 0.15);
      return Math.min(1, Math.max(0, (vh * 0.85 - r.top) / span)) * last;
    };
    const tick = () => {
      raf = 0;
      const t = target();
      cur += (t - cur) * 0.35; // a short scrub so frames follow the scroll smoothly
      if (Math.abs(t - cur) < 0.05) cur = t;
      const n = Math.round(cur);
      if (n !== shown) { shown = n; img.src = frames[n]; }
      if (near && cur !== t) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (near && !raf) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => {
      near = e.isIntersecting;
      if (near && !loaded) { loaded = true; frames.forEach((src) => { const i = new Image(); i.src = src; }); }
      onScroll();
    }, { rootMargin: "400px 0px" });
    io.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [frames]);
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} className="foot-cut foot-seq" src={frames[0]} width="1254" height="1254" loading="lazy" decoding="async" alt="" aria-hidden="true" />;
}

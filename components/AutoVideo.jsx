"use client";
import { useEffect, useRef } from "react";

// A muted looping clip that only loads and plays while it is on screen.
export default function AutoVideo({ src, dark, poster, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      if (vis) { pick(); v.play().catch(() => {}); } else v.pause();
    }, { threshold: 0.25 });
    // The dark clip is used unless the site is in light mode.
    let vis = false;
    const want = () => (dark && document.documentElement.dataset.theme !== "light" ? dark : src);
    const pick = () => { const w = want(); if (!v.src.endsWith(w)) { v.src = w; if (vis) v.play().catch(() => {}); } };
    const onTheme = () => { if (v.src) pick(); };
    io.observe(v);
    window.addEventListener("sv:theme", onTheme);
    return () => { io.disconnect(); window.removeEventListener("sv:theme", onTheme); };
  }, [src, dark]);
  return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

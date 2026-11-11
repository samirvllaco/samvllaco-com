"use client";
import { useEffect, useRef } from "react";

/* A screen that shows its still image and plays its build-in animation on hover.
   On touch screens, where there is no hover, it plays while it is on screen. */
export default function HoverVideo({ src, poster, width, height, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const play = () => { v.currentTime = 0; const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const stop = () => { v.pause(); v.load(); };
    if (canHover) {
      v.addEventListener("mouseenter", play);
      v.addEventListener("mouseleave", stop);
      return () => { v.removeEventListener("mouseenter", play); v.removeEventListener("mouseleave", stop); };
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.6 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} width={width} height={height} muted loop playsInline preload="none" aria-label={label} />;
}

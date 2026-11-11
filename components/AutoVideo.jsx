"use client";
import { useEffect, useRef } from "react";

// Muted clips that load and play only while on screen. Several clips play one after another.
export default function AutoVideo({ clips, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.src = clips[0]; return; }
    let i = 0;
    const next = () => { i = (i + 1) % clips.length; v.classList.add("is-swap"); setTimeout(() => { v.src = clips[i]; v.play().catch(() => {}); v.classList.remove("is-swap"); }, 260); };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!v.src) v.src = clips[i]; v.play().catch(() => {}); } else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    v.addEventListener("ended", next);
    return () => { io.disconnect(); v.removeEventListener("ended", next); };
  }, [clips]);
  return <video ref={ref} className={className} muted playsInline preload="none" aria-hidden="true" />;
}

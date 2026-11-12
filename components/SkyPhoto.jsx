"use client";
import { useEffect, useRef } from "react";

// Portrait in two layers: the sky drifts as the page scrolls, Sam stays put.
export default function SkyPhoto({ className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sky = el.querySelector(".sky-bg");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
      sky.style.transform = `translate3d(${(p * -5).toFixed(2)}%, ${(p * 7).toFixed(2)}%, 0) scale(1.22)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <span className={`sky${className ? ` ${className}` : ""}`} ref={ref} role="img" aria-label="Sam Vllaco">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sky-bg" src="/sam-sky-bg.webp" width="1891" height="832" alt="" loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sky-me" src="/sam-sky-cut.webp" width="1891" height="832" alt="" loading="lazy" />
    </span>
  );
}

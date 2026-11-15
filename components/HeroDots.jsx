"use client";
import { useEffect } from "react";

// Hero dot grid follows the pointer. Writes two CSS variables in requestAnimationFrame, only while the pointer is over a hero.
export default function HeroDots() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, el = null, x = 0, y = 0;
    const paint = () => { raf = 0; if (!el) return; const r = el.getBoundingClientRect(); el.style.setProperty("--mx", `${x - r.left + 40}px`); el.style.setProperty("--my", `${y - r.top + 40}px`); };
    const move = (e) => {
      const h = e.target.closest?.(".hero2");
      if (h !== el) { el?.classList.remove("dots-on"); el = h; el?.classList.add("dots-on"); }
      if (!el) return;
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => { el?.classList.remove("dots-on"); el = null; };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, []);
  return null;
}

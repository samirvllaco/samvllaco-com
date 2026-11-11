"use client";
import { useEffect } from "react";

// Marks the page as scrolled so the header can collapse into floating pills.
export default function HeaderScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0, on = null;
    const update = () => { raf = 0; const v = window.scrollY > (on ? 40 : 90); if (v !== on) { on = v; root.classList.toggle("is-scrolled", v); } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); root.classList.remove("is-scrolled"); };
  }, []);
  return null;
}

"use client";
import { useEffect } from "react";

// Marks the page as scrolled so the header can collapse into floating pills.
export default function HeaderScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0, on = null, end = null, dark = null;
    const update = () => { raf = 0; const v = window.scrollY > (on ? 40 : 90); if (v !== on) { on = v; root.classList.toggle("is-scrolled", v); }  let d = false; for (const el of document.querySelectorAll(".site-footer, .book-band")) { const r = el.getBoundingClientRect(); if (r.top <= 64 && r.bottom > 40) { d = true; break; } } if (d !== dark) { dark = d; root.classList.toggle("on-dark", d); } const e = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 220; if (e !== end) { end = e; root.classList.toggle("is-end", e); } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); root.classList.remove("is-scrolled"); };
  }, []);
  return null;
}

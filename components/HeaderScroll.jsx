"use client";
import { useEffect } from "react";

// Marks the page as scrolled so the header can collapse into floating pills.
export default function HeaderScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0, on = null, end = null, dark = null, lastY = window.scrollY, down = null;
    const update = () => { raf = 0; const y = window.scrollY; if (Math.abs(y - lastY) > 6) { const d = y > lastY && y > 90; if (d !== down) { down = d; root.classList.toggle("is-down", d); } lastY = y; } const v = window.scrollY > (on ? 40 : 90); if (v !== on) { on = v; root.classList.toggle("is-scrolled", v); }  let d = false; for (const el of document.querySelectorAll(".site-footer, .book-band")) { const r = el.getBoundingClientRect(); if (r.top <= 64 && r.bottom > 40) { d = true; break; } } if (d !== dark) { dark = d; root.classList.toggle("on-dark", d); } const e = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 220; if (e !== end) { end = e; root.classList.toggle("is-end", e); } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    // Ambient motion (cycling icons, rotating badges, marquees) waits for the first interaction,
    // so the first screen stays still while it loads.
    const live = () => { root.classList.add("is-live"); ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((e) => window.removeEventListener(e, live)); };
    if (window.scrollY > 0) live(); else ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((e) => window.addEventListener(e, live, { passive: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); root.classList.remove("is-scrolled", "is-down"); };
  }, []);
  return null;
}

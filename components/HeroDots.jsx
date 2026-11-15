"use client";
import { useEffect } from "react";

// Hero dot grid: a soft fade in the page's own background colour follows the pointer with easing.
// Writes CSS variables in requestAnimationFrame only while the pointer is over a hero; nothing runs at rest.
const bgOf = (el) => {
  for (let n = el; n; n = n.parentElement) { const c = getComputedStyle(n).backgroundColor; if (c && c !== "transparent" && !c.endsWith(", 0)")) return c; }
  return getComputedStyle(document.body).backgroundColor;
};
export default function HeroDots() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, el = null, tx = 0, ty = 0, x = 0, y = 0, fresh = true;
    const tick = () => {
      raf = 0; if (!el) return;
      if (fresh) { x = tx; y = ty; fresh = false; }
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - r.left + 40}px`); el.style.setProperty("--my", `${y - r.top + 40}px`);
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      const h = e.target.closest?.(".hero2");
      if (h !== el) {
        el?.classList.remove("dots-on"); el = h; fresh = true;
        if (el) { el.style.setProperty("--fade", bgOf(el)); el.classList.add("dots-on"); }
      }
      if (!el) return;
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => { el?.classList.remove("dots-on"); el = null; };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, []);
  return null;
}

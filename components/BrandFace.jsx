"use client";
import { useEffect, useRef } from "react";

// Header avatar: starts as the normal photo, then rotates through Sam doing different things.
// Idle: one change every 10 seconds. Hovering the logo flips through them quickly.
const FACES = ["/sam.jpg", "/me/wave2.webp", "/me/laptop.webp", "/me/coffee2.webp", "/me/sketch2.webp", "/me/think2.webp"];

export default function BrandFace() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const link = el.closest("a");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    FACES.forEach((s) => { const im = new Image(); im.src = s; });
    let i = 0, slow, fast, start;
    const next = () => {
      i = (i + 1) % FACES.length;
      el.src = FACES[i];
      if (!calm && el.animate) el.animate([{ transform: "scale(.78) rotate(-10deg)", filter: "blur(3px)" }, { transform: "none", filter: "none" }], { duration: 460, easing: "cubic-bezier(.3,1.4,.5,1)" });
    };
    if (!calm) slow = setInterval(() => { if (!fast && !document.hidden) next(); }, 10000);
    const over = () => { if (fast) return; next(); fast = setInterval(next, 1000); };
    const out = () => { clearInterval(fast); fast = null; };
    link?.addEventListener("pointerenter", over);
    link?.addEventListener("pointerleave", out);
    return () => { clearTimeout(start); clearInterval(slow); clearInterval(fast); link?.removeEventListener("pointerenter", over); link?.removeEventListener("pointerleave", out); };
  }, []);
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} className="brand-face" src="/sam.jpg" width="72" height="72" alt="" />;
}

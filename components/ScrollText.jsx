"use client";
import { useEffect, useRef } from "react";

// Big text whose words go from dim to full strength as the block scrolls through the screen.
export default function ScrollText({ text, className }) {
  const ref = useRef(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll("span")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { spans.forEach((s) => (s.style.opacity = 1)); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (r.height + vh * 0.42)));
      const at = p * (spans.length + 4);
      for (let i = 0; i < spans.length; i++) spans[i].style.opacity = (0.5 + 0.5 * Math.max(0, Math.min(1, (at - i) / 4))).toFixed(3);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [text]);
  return <p ref={ref} className={className}>{words.map((w, i) => <span key={i}>{w}{i < words.length - 1 ? " " : ""}</span>)}</p>;
}

"use client";
import { useEffect, useState } from "react";

// Apple style pair of round chevron buttons that step through the page sections.
export default function SectionArrows() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);

  useEffect(() => {
    const secs = () => Array.from(document.querySelectorAll("[data-bg]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const s = secs();
      setN(s.length);
      const line = window.innerHeight * 0.4;
      let idx = 0;
      s.forEach((el, k) => { if (el.getBoundingClientRect().top <= line) idx = k; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = s.length - 1;
      setI(idx);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  function go(d) {
    const s = Array.from(document.querySelectorAll("[data-bg]"));
    const el = s[i + d];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  if (n < 2) return null;
  const Chev = ({ up }) => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style={{ transform: up ? "rotate(90deg)" : "rotate(-90deg)" }}>
      <path fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" d="M14.5 5.5L8 12l6.5 6.5" />
    </svg>
  );
  return (
    <div className="sec-arrows" role="group" aria-label="Page sections">
      <button type="button" onClick={() => go(-1)} disabled={i <= 0} aria-label="Previous section"><Chev up /></button>
      <button type="button" onClick={() => go(1)} disabled={i >= n - 1} aria-label="Next section"><Chev /></button>
    </div>
  );
}

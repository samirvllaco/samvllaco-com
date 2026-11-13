"use client";
import { useEffect, useRef, useState } from "react";

// Back to top button. Shows on small screens once the reader is 40 percent down the page.
export default function ToTop() {
  const [show, setShow] = useState(false);
  const me = useRef(null);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(max > 0 && window.scrollY / max >= 0.4);
      // Sit straight above the video avatar, centred on it.
      const bub = document.querySelector(".vid-bubble");
      const el = me.current;
      if (bub && el) {
        const r = bub.getBoundingClientRect();
        if (r.width) {
          const w = el.offsetWidth || 44;
          el.style.setProperty("--tt-r", `${Math.round(window.innerWidth - (r.left + r.width / 2) - w / 2)}px`);
          el.style.setProperty("--tt-b", `${Math.round(window.innerHeight - r.top + 12)}px`);
        }
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const t = setInterval(check, 600);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); clearInterval(t); };
  }, []);
  const up = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button ref={me} type="button" className={`to-top${show ? " is-on" : ""}`} onClick={up} aria-label="Back to top" tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
}

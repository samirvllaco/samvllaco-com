"use client";
import { useEffect } from "react";

// Fades the page background to the color of the section sitting at the 60% line of the screen.
// Works both ways: scrolling back up restores the earlier colors.
export default function SectionColors() {
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-bg]")];
    if (!els.length) return;
    const body = document.body;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    body.style.transition = reduce ? "none" : "background-color 900ms ease";
    let raf = 0;
    let current = "";

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      let pick = els[0];
      if (window.scrollY > 8) {
        for (const el of els) {
          if (el.getBoundingClientRect().top <= line) pick = el;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) pick = els[els.length - 1];
      const c = pick.dataset.bg;
      if (c !== current) {
        current = c;
        body.style.backgroundColor = c;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      body.style.backgroundColor = "";
      body.style.transition = "";
    };
  }, []);
  return null;
}

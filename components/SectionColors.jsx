"use client";
import { useEffect } from "react";

// Fades the page background to each section's data-bg color as it reaches the lower middle of the screen.
export default function SectionColors() {
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-bg]")];
    if (!els.length) return;
    const body = document.body;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    body.style.transition = reduce ? "none" : "background-color 900ms ease";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) body.style.backgroundColor = e.target.dataset.bg;
        }
      },
      { rootMargin: "-55% 0px -35% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      body.style.backgroundColor = "";
      body.style.transition = "";
    };
  }, []);
  return null;
}

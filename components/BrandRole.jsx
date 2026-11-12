"use client";
import { useEffect, useRef } from "react";

// Small badge beside the logo that cycles through what Sam does.
const ROLES = ["UI/UX design", "Product design", "AI de-slop", "Marketing site design", "Application design", "App screenshot design", "Logo and branding", "Microinteraction animation", "UX research", "UX copywriting", "CRO design", "Ecommerce CRO", "Funnel design", "Digital product design"];

export default function BrandRole() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % ROLES.length;
      const out = el.animate([{ opacity: 1, transform: "none", filter: "none" }, { opacity: 0, transform: "translateY(-60%)", filter: "blur(4px)" }], { duration: 260, easing: "ease-in", fill: "forwards" });
      out.onfinish = () => {
        el.textContent = ROLES[i];
        out.cancel();
        el.animate([{ opacity: 0, transform: "translateY(60%)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "none" }], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
      };
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return <span className="brand-role" aria-hidden="true"><span ref={ref}>{ROLES[0]}</span></span>;
}

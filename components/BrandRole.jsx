"use client";
import { useEffect, useRef } from "react";

// Small badge beside the logo that cycles through what Sam does.
export const ROLES = ["UI/UX Designer", "Product Designer", "Web Designer", "Landing Page Designer", "SaaS Designer", "Figma Expert", "UX Designer", "UI Designer", "Website Designer", "Mobile App Designer", "iOS App Designer", "Web App Designer", "Dashboard Designer", "CRO Specialist", "Conversion Designer", "UX Consultant", "Design Systems Expert", "UX Writer", "UX Researcher", "Interaction Designer", "Ecommerce Designer", "Shopify Designer", "Startup Designer", "B2B SaaS Designer", "AI Product Designer", "AI UI Designer", "UX Strategist", "Website Redesign Expert", "Prototyping Expert", "AI Slop Fixer"];

// One shared clock, so every role badge on the page shows the same keyword at the same moment.
const BEAT = 2400;
const subs = new Set();
let timer = 0;
export const roleNow = () => Math.floor(Date.now() / BEAT) % ROLES.length;
export function onRoleTick(fn) {
  subs.add(fn);
  const tick = () => {
    timer = setTimeout(tick, BEAT - (Date.now() % BEAT));
    if (!document.hidden && document.documentElement.classList.contains("is-live")) subs.forEach((f) => f(roleNow()));
  };
  if (!timer) timer = setTimeout(tick, BEAT - (Date.now() % BEAT));
  return () => { subs.delete(fn); if (!subs.size) { clearTimeout(timer); timer = 0; } };
}

export default function BrandRole() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    return onRoleTick((n) => {
      i = n;
      const out = el.animate([{ transform: "none", filter: "none" }, { transform: "translateY(-130%)", filter: "blur(4px)" }], { duration: 260, easing: "ease-in", fill: "forwards" });
      out.onfinish = () => {
        el.textContent = ROLES[i];
        out.cancel();
        el.animate([{ transform: "translateY(130%)", filter: "blur(4px)" }, { transform: "none", filter: "none" }], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
      };
    });
  }, []);
  return <span className="brand-role" aria-hidden="true"><span ref={ref}>{ROLES[0]}</span></span>;
}

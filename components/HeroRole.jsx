"use client";
import { useEffect, useRef } from "react";
import { onRoleTick } from "./BrandRole";

// Hero badge: rotates through the same roles as the header badge.
// Hover or focus swaps it to "Available to start" until the pointer leaves.
const HOVER = "Available to start";
// Same order as ROLES, phrased as the thing Sam helps with, so both badges stay in step.
const HELP = ["UI/UX design", "product design", "web design", "landing pages", "SaaS design", "Figma", "UX design", "UI design", "website design", "mobile app design", "iOS app design", "web app design", "dashboard design", "conversion rate", "conversion design", "UX consulting", "design systems", "UX writing", "UX research", "interaction design", "ecommerce design", "Shopify design", "startup design", "B2B SaaS design", "AI product design", "AI UI design", "UX strategy", "website redesigns", "prototyping", "fixing AI slop"];
const say = (i) => `I help you with ${HELP[i % HELP.length]}`;

export default function HeroRole() {
  const box = useRef(null);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current, wrap = box.current;
    if (!el || !wrap) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, held = false;
    const swap = (text) => {
      if (calm || !el.animate) { el.textContent = text; return; }
      const out = el.animate([{ opacity: 1, transform: "none", filter: "none" }, { opacity: 0, transform: "translateY(-60%)", filter: "blur(4px)" }], { duration: 220, easing: "ease-in", fill: "forwards" });
      out.onfinish = () => {
        el.textContent = text;
        out.cancel();
        el.animate([{ opacity: 0, transform: "translateY(60%)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "none" }], { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" });
      };
    };
    const stop = calm ? () => {} : onRoleTick((n) => { i = n; if (!held) swap(say(i)); });
    const over = () => { if (held) return; held = true; swap(HOVER); };
    const out = () => { if (!held) return; held = false; swap(say(i)); };
    wrap.addEventListener("pointerenter", over);
    wrap.addEventListener("pointerleave", out);
    wrap.addEventListener("focus", over);
    wrap.addEventListener("blur", out);
    return () => { stop(); wrap.removeEventListener("pointerenter", over); wrap.removeEventListener("pointerleave", out); wrap.removeEventListener("focus", over); wrap.removeEventListener("blur", out); };
  }, []);
  return (
    <p className="hero-badge" ref={box} tabIndex={0} aria-label={`${say(0)}. ${HOVER}`}>
      <span className="hero-badge-t" aria-hidden="true"><span ref={ref}>{say(0)}</span></span>
    </p>
  );
}

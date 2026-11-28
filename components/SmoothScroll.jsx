"use client";
import { useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Very light inertia on mouse and trackpad devices (owner, 27 Nov 2026: "super subtle,
// almost unnoticeable"): lerp .2 settles in about a quarter second. Loaded after the page
// is idle, and skipped on touch screens, which already scroll smoothly.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let scroll = null, dead = false;
    const start = () => import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (dead) return;
      document.documentElement.classList.add("has-smooth");
      scroll = new LocomotiveScroll({ lenisOptions: { lerp: 0.2, smoothWheel: true, wheelMultiplier: 1 } });
      window.__smooth = scroll; // for gentle snaps (HowIWorkMotion)
    });
    const id = "requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200);
    return () => {
      dead = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(id); else clearTimeout(id);
      scroll?.destroy();
      document.documentElement.classList.remove("has-smooth");
    };
  }, []);
  return null;
}

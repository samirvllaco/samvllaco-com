"use client";
import { useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Smooth inertia scroll on mouse and trackpad devices. Loaded after the page is idle,
// and skipped on touch screens, which already scroll smoothly.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let scroll = null, dead = false;
    const start = () => import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (dead) return;
      document.documentElement.classList.add("has-smooth");
      scroll = new LocomotiveScroll({ lenisOptions: { lerp: 0.1, smoothWheel: true } });
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

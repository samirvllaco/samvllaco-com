"use client";
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Smooth inertia scroll plus reveal and parallax on [data-scroll] elements.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-smooth");
    const scroll = new LocomotiveScroll({
      lenisOptions: { lerp: 0.1, smoothWheel: true },
    });
    return () => {
      scroll.destroy();
      document.documentElement.classList.remove("has-smooth");
    };
  }, []);
  return null;
}

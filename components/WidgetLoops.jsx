"use client";
import { useEffect } from "react";

// Runs the bento widget loops only while a card is on screen: [data-loop] gets .is-on in view.
export default function WidgetLoops() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-loop]");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((en) => en.forEach((e) => e.target.classList.toggle("is-on", e.isIntersecting)), { rootMargin: "80px 0px" });
    els.forEach((e) => io.observe(e));
    // White bands: tell the page when one sits under the bottom-right corner, so the dark corner glow can hide.
    const bands = document.querySelectorAll(".band-light");
    const on = new Set();
    const io2 = new IntersectionObserver((en) => { en.forEach((e) => (e.isIntersecting ? on.add(e.target) : on.delete(e.target))); document.documentElement.classList.toggle("on-light", on.size > 0); }, { rootMargin: "-70% 0px 0px 0px" });
    bands.forEach((b) => io2.observe(b));
    return () => { io.disconnect(); io2.disconnect(); };
  }, []);
  return null;
}

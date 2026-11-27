"use client";
import { useEffect } from "react";

// Runs the bento widget loops only while a card is on screen: [data-loop] gets .is-on in view.
export default function WidgetLoops() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-loop]");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((en) => en.forEach((e) => e.target.classList.toggle("is-on", e.isIntersecting)), { rootMargin: "80px 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

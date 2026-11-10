"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Appears after some scrolling on a case study: back to the home page, or up to the top.
export default function CaseFab() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function top() {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
  return (
    <div className={`case-fab${on ? " is-on" : ""}`} aria-hidden={!on}>
      <Link href="/" tabIndex={on ? 0 : -1}><span aria-hidden="true">←</span> Home</Link>
      <button type="button" onClick={top} tabIndex={on ? 0 : -1}><span aria-hidden="true">↑</span> Top</button>
    </div>
  );
}

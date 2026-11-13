"use client";
import { useEffect, useState } from "react";
import { BOOK_URL } from "../lib/site";

// Ebook page: a fixed buy bar at the bottom once the hero has scrolled away, hidden again over the footer.
export default function EbookBar() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".eb-hero");
    const foot = document.querySelector(".site-footer");
    if (!hero || !("IntersectionObserver" in window)) return;
    let heroOut = false, footIn = false;
    const sync = () => { const v = heroOut && !footIn; setOn(v); document.documentElement.classList.toggle("eb-bar-on", v); };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.target === hero) heroOut = !e.isIntersecting && e.boundingClientRect.top < 0; else footIn = e.isIntersecting; });
      sync();
    });
    io.observe(hero); if (foot) io.observe(foot);
    return () => { io.disconnect(); document.documentElement.classList.remove("eb-bar-on"); };
  }, []);
  return (
    <div className={`eb-bar${on ? " is-on" : ""}`} aria-hidden={!on}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" />
      <p><b>27 Copy-Paste Prompts to Fix AI Slop UI</b><span><s>$34.95</s> 80% off</span></p>
      <a className="hero2-btn hero2-btn-primary" href={BOOK_URL} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>Get it, $6.99</a>
    </div>
  );
}

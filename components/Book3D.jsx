"use client";
import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapLoad";

// The ebook as a real book on a shelf (owner, 28 Nov 2026, after spectup.com's research shelf): a 3D block with a
// page edge and a spine, standing on a lit ledge in a dark scene. When it comes into view GSAP slides it onto the
// shelf and turns it to a three-quarter view; then it turns a little toward the pointer. Reduced motion and no JS show
// it at rest.
export default function Book3D({ src = "/ebook/cover-520.webp?v=1", srcSet, sizes = "240px", alt = "", className = "" }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const book = el.querySelector(".b3-book"), shadow = el.querySelector(".b3-shadow");
    let g = null, ry = null, rx = null, played = false, armed = false;
    const arm = (gs) => { if (armed) return; armed = true; g = gs; g.set(book, { x: -60, rotationY: -70, opacity: 0 }); g.set(shadow, { scaleX: .3, opacity: 0 }); };
    const play = () => {
      if (!g || played) return; played = true;
      g.timeline({ defaults: { ease: "power3.out" } })
        .to(book, { x: 0, opacity: 1, duration: .5 }, 0)
        .to(book, { rotationY: -24, duration: 1.1, ease: "expo.out" }, 0)
        .to(shadow, { scaleX: 1, opacity: 1, duration: .9 }, .1);
    };
    const move = (e) => {
      if (!g || !played || e.pointerType === "touch") return;
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      if (!ry) { ry = g.quickTo(book, "rotationY", { duration: .7, ease: "power3.out" }); rx = g.quickTo(book, "rotationX", { duration: .7, ease: "power3.out" }); }
      ry(-24 + px * 26); rx(-py * 10);
    };
    const leave = () => { if (ry) { ry(-24); rx(0); } };
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    const near = new IntersectionObserver((en) => { if (en[0].isIntersecting) { near.disconnect(); loadGsap().then((gs) => gs && arm(gs)); } }, { rootMargin: "0px 0px 500px 0px" });
    const seen = new IntersectionObserver((en) => { if (en[0].isIntersecting) { seen.disconnect(); loadGsap().then((gs) => { if (gs) { arm(gs); play(); } }); } }, { threshold: .4 });
    near.observe(el); seen.observe(el);
    return () => { near.disconnect(); seen.disconnect(); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);
  return (
    <div className={`b3${className ? ` ${className}` : ""}`} ref={root}>
      <div className="b3-scene">
        <div className="b3-book">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="b3-front" src={src} srcSet={srcSet} sizes={sizes} width="936" height="1326" alt={alt} loading="lazy" decoding="async" />
          <i className="b3-pages" aria-hidden="true" />
          <i className="b3-spine" aria-hidden="true" />
          <i className="b3-top" aria-hidden="true" />
        </div>
      </div>
      <i className="b3-shadow" aria-hidden="true" />
      <i className="b3-shelf" aria-hidden="true" />
    </div>
  );
}

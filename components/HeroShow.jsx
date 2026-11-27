"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Hero reel on the right (owner, 27 Nov 2026, after designme.agency): Sam's own work plays one project at a time,
// with "Now playing", its tags, progress bars and a link to the case study.
// The first frame is a still image. Videos load and the reel starts only after the first interaction (html.is-live),
// it pauses off screen, and with reduced motion it stays on the chosen project.
// The page passes only the fields this needs (slug, title, sub, small, smallW, w, h, video), so lib/work.js stays out of the bundle.
export default function HeroShow({ items: LIST }) {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const [seen, setSeen] = useState(true);
  const root = useRef(null);

  useEffect(() => {
    const h = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (h.classList.contains("is-live")) { setLive(true); return; }
    const mo = new MutationObserver(() => { if (h.classList.contains("is-live")) { setLive(true); mo.disconnect(); } });
    mo.observe(h, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    root.current?.querySelectorAll("video").forEach((v, k) => {
      if (k === i && seen) {
        if (!v.getAttribute("src")) v.setAttribute("src", v.dataset.src);
        v.play().catch(() => {});
      } else v.pause();
    });
  }, [i, live, seen]);

  const w = LIST[i];
  const next = () => setI((v) => (v + 1) % LIST.length);
  return (
    <div className="hero-show" ref={root} data-live={live ? "" : undefined} data-paused={seen ? undefined : ""}>
      <Link prefetch={false} className="hs-frame" href={`/work/${w.slug}/`} tabIndex={-1} aria-hidden="true">
        {LIST.map((x, k) => (
          <span className={`hs-slide${k === i ? " is-on" : ""}`} key={x.slug}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.small} width={x.smallW} height={Math.round((x.smallW * x.h) / x.w)} alt="" loading={k ? "lazy" : "eager"} fetchPriority={k ? undefined : "high"} decoding="async" />
            {live ? <video muted loop playsInline preload="none" poster={x.small} data-src={x.video} /> : null}
          </span>
        ))}
      </Link>
      <div className="hs-cap">
        <p className="hs-now"><span>Now playing</span> <b>{w.title}</b></p>
        <p className="hs-tags">{w.sub}</p>
        <div className="hs-foot">
          <div className="hs-bars">
            {LIST.map((x, k) => (
              <button type="button" key={x.slug} className={k === i ? "is-on" : undefined} aria-pressed={k === i} aria-label={`Show ${x.title}`} onClick={() => setI(k)}>
                <i onAnimationEnd={k === i ? next : undefined} />
              </button>
            ))}
          </div>
          <Link prefetch={false} className="hs-link" href={`/work/${w.slug}/`}>View case study<span className="sr-only">: {w.title}</span><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
        </div>
      </div>
    </div>
  );
}

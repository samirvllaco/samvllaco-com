"use client";
import { useEffect, useRef, useState } from "react";
import CallIcon from "./CallIcon";
import { loadGsap } from "../lib/gsapLoad";

// Home page, after the hero (owner, 28 Nov 2026: "need section like this", after an agency's "Who we are" block):
// one line with the three verbs as small icon chips, then three cards, each with a live picture of real work.
// 1) Web UI/UX design: the dashboard, with two details that lift out of the screen when the card comes into view.
// 2) Ad design: an ad for the eye care app over the page it leads to, with a pointer that clicks the ad. 3) UX audits:
// a before and after you drag (the law firm homepage, names changed). No invented numbers: every picture is a crop of a case study. Loops wait for the first interaction
// (html.is-live) and pause off screen; reduced motion shows the still end state.
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const ICONS = {
  audit: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  design: <><path d="m12 3.5-8.5 4.75L12 13l8.5-4.75L12 3.5Z" /><path d="m3.5 12.5 8.5 4.75 8.5-4.75" /></>,
  ads: <><path d="M4 10v4h3l6 4V6l-6 4H4Z" /><path d="M16.5 9a4 4 0 0 1 0 6" /></>,
};
const Chip = ({ i, children }) => <span className={`wd-chip wd-chip-${i}`}><Ico d={ICONS[i]} />{children}</span>;

function Compare({ go }) {
  const [v, setV] = useState(50);
  const touched = useRef(false);
  const box = useRef(null);
  useEffect(() => {
    if (!go || touched.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tl;
    loadGsap().then((g) => {
      if (!g || touched.current) return;
      const o = { p: 50 };
      tl = g.timeline({ delay: 0.3, onUpdate: () => { if (!touched.current) setV(Math.round(o.p * 10) / 10); } })
        .to(o, { p: 26, duration: 0.7, ease: "power2.inOut" })
        .to(o, { p: 72, duration: 0.9, ease: "power2.inOut" })
        .to(o, { p: 50, duration: 0.6, ease: "power2.out" });
    });
    return () => tl && tl.kill();
  }, [go]);
  const set = (e) => { touched.current = true; setV(+e.target.value); };
  return (
    <div className="wd-vis wd-ba" ref={box} style={{ "--p": `${v}%` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="wd-ba-a" src="/work/wd/ba-after.webp?v=1" width="720" height="540" loading="lazy" decoding="async" alt="The new law firm homepage: a short headline, the attorney's photo, two clear actions and the firm's results in one row" />
      <div className="wd-ba-b">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/wd/ba-before.webp?v=1" width="720" height="540" loading="lazy" decoding="async" alt="The old homepage: a four-line headline, a small blurred group photo and one weak button" />
      </div>
      <span className="wd-tag wd-tag-b" aria-hidden="true">Before</span>
      <span className="wd-tag wd-tag-a" aria-hidden="true">After</span>
      <div className="wd-line" aria-hidden="true"><i><Ico d={<><path d="m9 7-5 5 5 5" /><path d="m15 7 5 5-5 5" /></>} /></i></div>
      <input type="range" min="0" max="100" step="1" value={Math.round(v)} onChange={set} onPointerDown={() => { touched.current = true; }} aria-label="Compare the old and new law firm homepage" aria-valuetext={`${Math.round(v)}% old homepage`} />
    </div>
  );
}

// The three things Sam sells most (owner, 28 Nov 2026: "use top 3 things I offer like web UI/UX design, ads design, UX
// audits"; "product design" next to "UI/UX" didn't make sense). Each links to its service page.
const CARDS = [
  { k: "web", t: "Web UI/UX design", p: "Websites and web apps that look finished and are easy to use, from the first flow to the last screen.", cta: "See web design", href: "/services/website-design/" },
  { k: "ads", t: "Ad design", p: "Static and animated ads for Meta, Google, LinkedIn and X that match the page they send people to.", cta: "See ad design", href: "/services/marketing-design/" },
  { k: "audit", t: "UX audits", p: "I find what costs you sign-ups, rank it by impact and redesign the screens that matter most.", cta: "See UX audits", href: "/services/ux-audit/" },
];

export default function WhatIDo() {
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const h = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (h.classList.contains("is-live")) { setLive(true); return; }
    const mo = new MutationObserver(() => { if (h.classList.contains("is-live")) { setLive(true); mo.disconnect(); } });
    mo.observe(h, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { setInView(e.isIntersecting); if (e.isIntersecting) setSeen(true); }, { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`wd${seen ? " is-in" : ""}`} ref={root} aria-labelledby="wd-h" data-bg="#0e0e10" data-live={live ? "" : undefined} data-paused={inView ? undefined : ""}>
      <header className="wd-head">
        <h2 id="wd-h">Three ways I help <span className="t2">your product</span></h2>
        <p>I <Chip i="design">design</Chip> websites and web apps, make <Chip i="ads">ads</Chip> that bring people in and <Chip i="audit">audit</Chip> what slows them down.</p>
      </header>
      <ul className="wd-grid">
        {CARDS.map((c) => (
          <li key={c.k} className={`wd-card wd-card-${c.k}`}>
            {c.k === "audit" ? <Compare go={seen && live} /> : null}
            {c.k === "web" ? (
              <div className="wd-vis wd-dash" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wd-base" src="/work/wd/dash.webp?v=1" width="720" height="540" loading="lazy" decoding="async" alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wd-f wd-f1" src="/work/wd/dash-kpi.webp?v=1" width="255" height="160" loading="lazy" decoding="async" alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wd-f wd-f2" src="/work/wd/dash-ai.webp?v=1" width="355" height="330" loading="lazy" decoding="async" alt="" />
              </div>
            ) : null}
            {c.k === "ads" ? (
              <div className="wd-vis wd-land" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wd-base" src="/work/wd/land.webp?v=1" width="720" height="540" loading="lazy" decoding="async" alt="" />
                <div className="wd-ad">
                  <div className="wd-ad-top"><i>o</i><span><b>Ocufuse</b><em>Sponsored</em></span></div>
                  <span className="wd-ad-copy">One-minute eye games for your screen breaks.</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="wd-ad-img" src="/work/wd/ad-img.webp?v=1" width="368" height="280" loading="lazy" decoding="async" alt="" />
                  <div className="wd-ad-cta"><span>ocufuse.com</span><b>Play now</b></div>
                </div>
                <svg className="wd-cur" viewBox="0 0 24 24" width="22" height="22"><path d="M5 3.5 19 12l-6.2 1.6L9.6 19.5 5 3.5Z" fill="#111112" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              </div>
            ) : null}
            <div className="wd-txt">
              <h3>{c.t}</h3>
              <p>{c.p}</p>
              <a className="hero2-btn hero2-btn-light" href={c.href}>{c.cta}<CallIcon /></a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

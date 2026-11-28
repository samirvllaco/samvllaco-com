"use client";
import { useEffect, useRef, useState } from "react";
import CallIcon from "./CallIcon";
import { useLive, useInView, reduced } from "../lib/motion";
import { loadGsap } from "../lib/gsapLoad";

// Home page: the four design problems teams bring to Sam (owner, 27 Nov 2026: "do a section like this", after grafit.agency's
// testimonial switcher). A framed panel: the problems as tabs on the left (the open one fills a line while it is shown),
// Sam's fix in big type in the middle with a link to the service, and the outcome on the right over a rising line.
// No invented numbers: the right side names the outcome in words. Tabs advance only after the first interaction,
// pause off screen, and stop for good once someone picks a tab. With reduced motion they never advance.
const FIXES = [
  { t: "Low conversion", p: "Traffic comes in, but people don't sign up or buy, and you can't tell if it's the page, the offer or the price.", f: "I find where people drop off and redesign the path to yes: one clear message, one clear next step.", o: "More yes", oc: "From the same traffic you already pay for.", href: "/services/conversion-optimization/", link: "Conversion optimization" },
  { t: "Confusing UX", p: "Your product does a lot, but new users get lost and leave before they see the value.", f: "I simplify the flows and the first session, so people reach the good part before they give up.", o: "Users stay", oc: "They reach the value before they give up.", href: "/services/ux-audit/", link: "UX audit and redesign" },
  { t: "Looks cheaper than you are", p: "Next to bigger competitors your site looks dated or generic, and buyers and investors notice.", f: "I give it a premium, consistent look that earns trust before anyone reads a word.", o: "Trusted", oc: "Before anyone reads a word.", href: "/services/website-design/", link: "Website design" },
  { t: "Design that doesn't scale", p: "Every new screen looks a little different, and each release takes your team longer.", f: "I build a design system your developers and AI tools follow, so new features look right the first time.", o: "Faster releases", oc: "New screens look right the first time.", href: "/services/design-systems/", link: "Design systems" },
];

export default function Fixes() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const root = useRef(null);
  const live = useLive();
  const [seen] = useInView(root, { threshold: 0.3 });
  // GSAP drives the open tab (owner, 28 Nov 2026: "do all"): one 7s tween fills the line (--fp) and moves to the next
  // problem when it ends; pointer on the panel pauses it, off screen pauses it, a click stops the rotation. Each switch
  // reveals the new words from a clip (never faded) and redraws the outcome curve. Without GSAP the CSS line runs.
  const [gs, setGs] = useState(false);
  const tw = useRef(null);
  const hold = useRef({ seen: false, hover: false });
  const first = useRef(true);
  const play = () => { const t = tw.current; if (t) (hold.current.seen && !hold.current.hover ? t.play() : t.pause()); };

  useEffect(() => {
    if (!live || held) return;
    let dead = false, el = null;
    loadGsap().then((g) => {
      if (!g || dead || !root.current) return;
      setGs(true);
      el = root.current.querySelector(`#fx-tab-${i} i`);
      tw.current = g.fromTo(el, { "--fp": 0 }, { "--fp": 1, duration: 7, ease: "none", paused: true, onComplete: () => setI((v) => (v + 1) % FIXES.length) });
      play();
    });
    return () => { dead = true; if (tw.current) tw.current.kill(); tw.current = null; if (el) el.style.removeProperty("--fp"); };
  }, [live, held, i]);
  useEffect(() => { hold.current.seen = seen; play(); }, [seen]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduced()) return;
    let tl = null;
    loadGsap().then((g) => {
      const r = root.current;
      if (!g || !r) return;
      const words = r.querySelectorAll(".fx-said, .fx-big, .fx-o, .fx-oc");
      const path = r.querySelector(".fx-curve path"), dot = r.querySelector(".fx-curve circle");
      const len = path.getTotalLength();
      tl = g.timeline()
        .fromTo(words, { clipPath: "inset(0 0 100% 0)", y: 14 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.55, ease: "power3.out", stagger: 0.06, clearProps: "clipPath,transform" })
        .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, 0.1)
        .fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "back.out(2)", clearProps: "transform" }, 0.75);
    });
    return () => { if (tl) tl.kill(); };
  }, [i]);

  const pick = (k) => { setHeld(true); setI(k); };
  const next = () => setI((v) => (v + 1) % FIXES.length);
  const x = FIXES[i];
  return (
    <section className={`fixes${gs ? " gs" : ""}`} ref={root} aria-labelledby="fx-h" data-bg="#0e0e10" data-live={live && !held ? "" : undefined} data-paused={seen ? undefined : ""}>
      <header className="fx-head">
        <h2 id="fx-h">Design stops being <span className="t2">the problem</span></h2>
        <p>Startups and enterprise teams bring me the same four problems. I fix the design side of each one, so when growth stalls you can rule design out and put your energy into product and marketing.</p>
      </header>
      <div className="fx-frame" onPointerEnter={() => { hold.current.hover = true; play(); }} onPointerLeave={() => { hold.current.hover = false; play(); }}>
        <div className="fx-tabs" role="tablist" aria-label="Design problems">
          {FIXES.map((f, k) => (
            <button key={f.t} type="button" role="tab" id={`fx-tab-${k}`} aria-selected={k === i} aria-controls="fx-panel" className={k === i ? "is-on" : undefined} onClick={() => pick(k)}>
              <span className="fx-n">{String(k + 1).padStart(2, "0")}</span>
              <span className="fx-tt">{f.t}</span>
              <i aria-hidden="true" onAnimationEnd={k === i && !gs ? next : undefined} />
            </button>
          ))}
        </div>
        <div className="fx-panel" id="fx-panel" role="tabpanel" aria-labelledby={`fx-tab-${i}`}>
          <p className="fx-said">{x.p}</p>
          <p className="fx-big">{x.f}</p>
          <div className="fx-by">
            <span className="fx-me">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam-face-144.webp?v=1" width="40" height="40" alt="" loading="lazy" />
              <span><b>Sam Vllaco</b><span>My fix, {x.link.toLowerCase()}</span></span>
            </span>
            <a className="hero2-btn hero2-btn-light" href={x.href}>See the service<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </div>
        </div>
        <div className="fx-out" aria-live="off">
          <p className="fx-o">{x.o}</p>
          <p className="fx-oc">{x.oc}</p>
          <svg className="fx-curve" viewBox="0 0 300 140" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="fx-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f0a43a" stopOpacity=".2" /><stop offset=".45" stopColor="#f0a43a" /><stop offset="1" stopColor="#62c1fd" /></linearGradient>
            </defs>
            <path d="M0 138 C60 96 90 70 150 72 S230 70 300 8" fill="none" stroke="url(#fx-g)" strokeWidth="2.5" />
            <circle cx="204" cy="68" r="5" fill="#fff" />
          </svg>
        </div>
      </div>
      <div className="fx-go">
        <p>Not sure which one is yours? Tell me what you see and I&rsquo;ll tell you.</p>
        <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
      </div>
    </section>
  );
}

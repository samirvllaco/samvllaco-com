"use client";
import { useEffect, useRef } from "react";
import CallIcon from "./CallIcon";
import { loadGsap } from "../lib/gsapLoad";
import { PROJECT_FROM, TRIAL_WEEK, usd } from "../lib/plans";

// "Pick your designer" as a character select (owner, 28 Nov 2026: the card was not it, "the prompt was for a GSAP
// animation on my picture, how to make me feel more like a character"). When the section comes in, a spotlight turns
// on, Sam rises onto the stage, the selection frame snaps round him, "Selected" slides in and his real numbers fill up
// like a character's stats. Then he breathes, and leans toward the pointer. GSAP throughout; reduced motion and no JS
// show the finished scene.
const STATS = [["Years designing", 10, ""], ["Clients served", 573, ""], ["Screens designed", 10000, "+"]];
const SKILLS = ["UX audits", "UI/UX sprints", "Redesigns", "Design systems", "Front end builds"];

export default function PickDesigner() {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = (s) => [...el.querySelectorAll(s)];
    const stage = el.querySelector(".pk-stage"), me = el.querySelector(".pk-me");
    let tl = null, idle = null, g = null, armed = false, played = false;
    const nums = q(".pk-num");
    const arm = (gs) => {
      if (armed) return; armed = true; g = gs;
      // Start states, set while the section is still below the screen so nothing flashes.
      g.set(".pk-spot", { opacity: 0 }); g.set(me, { yPercent: 18, opacity: 0, scale: .96 });
      g.set(q(".pk-corner"), { scale: 1.35, opacity: 0 }); g.set(".pk-tag > span", { yPercent: 110 });
      g.set(q(".pk-bar i"), { scaleX: 0 }); nums.forEach((n) => { n.textContent = "0" + (n.dataset.s || ""); });
      g.set(q(".pk-rise > *"), { yPercent: 110 });
    };
    const play = () => {
      if (!g || played) return; played = true;
      tl = g.timeline({ defaults: { ease: "power3.out" } })
        .to(".pk-spot", { opacity: 1, duration: .6 }, 0)
        .to(me, { yPercent: 0, opacity: 1, scale: 1, duration: .9 }, .1)
        .to(q(".pk-corner"), { scale: 1, opacity: 1, duration: .45, stagger: .05, ease: "back.out(2)" }, .55)
        .to(".pk-tag > span", { yPercent: 0, duration: .4 }, .85)
        .to(q(".pk-rise > *"), { yPercent: 0, duration: .6, stagger: .06 }, .2)
        .to(q(".pk-bar i"), { scaleX: 1, duration: 1, stagger: .12, ease: "power2.out" }, .7);
      nums.forEach((n, i) => {
        const to = Number(n.dataset.to), o = { v: 0 };
        tl.to(o, { v: to, duration: 1.1, ease: "power2.out", onUpdate: () => { n.textContent = Math.round(o.v).toLocaleString("en-US") + (n.dataset.s || ""); } }, .7 + i * .12);
      });
      tl.add(() => { idle = g.to(me, { scale: 1.012, y: -3, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 }); });
    };
    // Lean toward the pointer, like a picked character.
    let rx = null, ry = null, mx = null;
    const tilt = (e) => {
      if (!g || !played || e.pointerType === "touch") return;
      const r = stage.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      if (!rx) { rx = g.quickTo(me, "rotationY", { duration: .6, ease: "power3.out" }); ry = g.quickTo(me, "rotationX", { duration: .6, ease: "power3.out" }); mx = g.quickTo(me, "x", { duration: .6, ease: "power3.out" }); }
      rx(px * 10); ry(-py * 6); mx(px * 14);
    };
    const untilt = () => { if (rx) { rx(0); ry(0); mx(0); } };
    stage.addEventListener("pointermove", tilt); stage.addEventListener("pointerleave", untilt);
    const near = new IntersectionObserver((en) => { if (en[0].isIntersecting) { near.disconnect(); loadGsap().then((gs) => { if (gs) arm(gs); }); } }, { rootMargin: "0px 0px 600px 0px" });
    const seen = new IntersectionObserver((en) => {
      const on = en[0].isIntersecting;
      if (on && !played) loadGsap().then((gs) => { if (gs) { arm(gs); play(); } });
      if (idle) (on ? idle.resume() : idle.pause());
    }, { threshold: .35 });
    near.observe(el); seen.observe(el);
    return () => { near.disconnect(); seen.disconnect(); stage.removeEventListener("pointermove", tilt); stage.removeEventListener("pointerleave", untilt); if (tl) tl.kill(); if (idle) idle.kill(); };
  }, []);

  return (
    <section className="pk" ref={root} aria-labelledby="pk-h">
      <div className="pk-stage" aria-hidden="true">
        <span className="pk-spot" />
        <span className="pk-floor" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pk-me" src="/me/sam-cut-840.webp?v=1" srcSet="/me/sam-cut-480.webp?v=1 480w, /me/sam-cut-840.webp?v=1 840w" sizes="(max-width: 900px) 90vw, 480px" width="840" height="840" alt="" loading="lazy" decoding="async" />
        <span className="pk-frame"><i className="pk-corner" /><i className="pk-corner" /><i className="pk-corner" /><i className="pk-corner" /></span>
        <span className="pk-tag"><span>Selected</span></span>
      </div>
      <div className="pk-info">
        <p className="pk-k pk-rise"><span>Player one, pick your designer</span></p>
        <h2 id="pk-h" className="pk-rise"><span>Sam Vllaco</span></h2>
        <p className="pk-class pk-rise"><span>Product designer, Tirana. Level 10: ten years in.</span></p>
        <dl className="pk-stats">
          {STATS.map(([k, n, s]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd><span className="pk-num" data-to={n} data-s={s}>{n.toLocaleString("en-US")}{s}</span><span className="pk-bar"><i /></span></dd>
            </div>
          ))}
        </dl>
        <ul className="pk-skills" aria-label="What is included">{SKILLS.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className="pk-price"><b>From {usd(PROJECT_FROM)}</b> or a {usd(TRIAL_WEEK)} trial week first. Taking 1 to 2 new projects at a time.</p>
        <div className="btn-row">
          <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
          <a className="hero2-btn hero2-btn-light" href="/work/">See my work</a>
        </div>
      </div>
    </section>
  );
}

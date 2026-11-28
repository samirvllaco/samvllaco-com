import { LAST_YEAR, FIRST_YEAR, factOf } from "../lib/years";
import Link from "next/link";
import SwipeDeck from "./SwipeDeck";
import Toolbox from "./Toolbox";
import CountUp from "./CountUp";
import { WORK } from "../lib/work";
import BentoLazy from "./BentoLazy";
import { ORBIT_CHIPS, orbitAt, orbitTf } from "../lib/orbit";

// Home: a short bento about Sam. Glossy widget cards with words and numbers only (owner, 27 Nov 2026:
// "hide all bento illustrations keep only boxes"). Each fact shows once: the stats row, then work and the
// worldwide list (base, live time, the US overlap, where clients are). Motion is in code (owner, 27 Nov 2026): the
// numbers count up once, and the Worldwide facts rise in one by one.
const Go = ({ children }) => <span className="bx-go">{children} <span aria-hidden="true">→</span></span>;
const TOOLS = ["Figma", "FigJam", "Photoshop", "Illustrator", "After Effects", "Claude", "ChatGPT"];

export function MainServices() {
  return (
    <section className="bx-sec" aria-labelledby="ms-h" data-bg="#0e0e10">
      <h2 id="ms-h">What I do</h2>
      <p className="bx-lede">Four areas, one goal: a product people understand, remember and can find.</p>
      <div className="ms-grid">
        <Link prefetch={false} href="/services/#design" className="bx-card ms-card">
          <div className="ms-art ms-design" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={WORK[0].small} width="800" height="600" alt="" loading="lazy" />
          </div>
          <h3>Product design</h3>
        </Link>
        <Link prefetch={false} href="/services/brand/" className="bx-card ms-card">
          <div className="ms-art ms-brand" aria-hidden="true"><span className="ms-dots"><i /><i /><i /><i /><i /><i /></span><span className="ms-aa">Aa</span></div>
          <h3>Branding</h3>
        </Link>
        <Link prefetch={false} href="/services/#marketing" className="bx-card ms-card">
          <div className="ms-art ms-mkt" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <h3>Marketing design</h3>
        </Link>
        <Link prefetch={false} href="/services/seo/" className="bx-card ms-card">
          <div className="ms-art ms-seo" aria-hidden="true"><span className="ms-bar" /><span className="ms-res"><i /><i /><i /></span></div>
          <h3>SEO</h3>
        </Link>
      </div>
    </section>
  );
}

// Experience gauge: 27 ticks over half a circle, 2013 on the left and today on the right.
const TICKS = Array.from({ length: 27 }, (_, k) => {
  const a = Math.PI + (k / 26) * Math.PI, long = k % 13 === 0;
  const r1 = long ? 80 : 86, r2 = 100;
  return { k, x1: 110 + r1 * Math.cos(a), y1: 108 + r1 * Math.sin(a), x2: 110 + r2 * Math.cos(a), y2: 108 + r2 * Math.sin(a) };
});

// Home bento (owner, 28 Nov 2026: "bento grid like this with our context", after grafit.agency): one hairline grid with
// crosses at the corners. The big cell is the whole-product promise, a dithered sphere with the parts of the work
// orbiting it. Then the stat cells, each a real number with a picture of it: years on a gauge, one dot per client and
// the usual turnaround on a timeline, with the work deck as one small cell beside them. Then the work deck and the toolbox. Canvas and loops come from BentoRun (loaded near the viewport); the gauge and the line draw in CSS once
// the section is in view (.is-in).
export default function Bento() {
  return (
    <section className="bx-sec bx-soft bx2" aria-labelledby="bx-h" data-bg="#0e0e10">
      <h2 id="bx-h" className="bx-title">One designer <span className="t2">for the whole product</span></h2>
      <div className="bx2-grid">
        <div className="bx2-c bx2-a">
          <div className="bs-stage">
            <canvas className="bs-ball" aria-hidden="true" />
            <ul className="bs-chips" aria-label="What I cover">
              {ORBIT_CHIPS.map((t, i) => { const p = orbitAt(i, 0); return <li key={t} className={`bs-chip${p.front ? "" : " is-back"}`} style={{ transform: orbitTf(p) }}>{t}</li>; })}
            </ul>
          </div>
          <div className="bx2-txt">
            <h3>From first call to handover</h3>
            <p>One senior designer the whole way. You talk to the person who does the work.</p>
          </div>
        </div>
        <div className="bx2-c bx2-s bx2-b">
          <p className="bx2-k">Experience</p>
          <div className="bx2-vis">
            {/* A year slider (owner, 28 Nov 2026: "make this interactive, show years like in About"): move over the gauge,
                drag it or use the arrow keys; the needle snaps to the year and the line under it says what changed. */}
            <div className="bg-gauge" role="slider" tabIndex={0} aria-label="Years in design" aria-valuemin={FIRST_YEAR} aria-valuemax={LAST_YEAR} aria-valuenow={LAST_YEAR} aria-valuetext={`${LAST_YEAR}: ${factOf(LAST_YEAR)}`}>
              <div className="bg-arc">
              <svg viewBox="0 0 220 112" width="220" height="112" aria-hidden="true">
                <defs>
                  <radialGradient id="bg-glow" cx="50%" cy="100%" r="70%"><stop offset="0" stopColor="#62c1fd" stopOpacity=".22" /><stop offset="1" stopColor="#62c1fd" stopOpacity="0" /></radialGradient>
                  <filter id="bg-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" /></filter>
                </defs>
                <path className="bg-halo" d="M10 108a100 100 0 0 1 200 0Z" fill="url(#bg-glow)" />
                <g className="bg-ticks-glow" filter="url(#bg-blur)">{TICKS.map((t) => <line key={t.k} x1={t.x1.toFixed(2)} y1={t.y1.toFixed(2)} x2={t.x2.toFixed(2)} y2={t.y2.toFixed(2)} />)}</g>
                <g className="bg-ticks">{TICKS.map((t) => <line key={t.k} x1={t.x1.toFixed(2)} y1={t.y1.toFixed(2)} x2={t.x2.toFixed(2)} y2={t.y2.toFixed(2)} style={{ "--i": t.k }} />)}</g>
                <g className="bg-needle" transform="rotate(90 110 108)"><line x1="110" y1="108" x2="110" y2="40" /><circle cx="110" cy="40" r="3.5" /></g>
                <circle className="bg-hub" cx="110" cy="108" r="6" />
              </svg>
              <span className="bg-end bg-l" aria-hidden="true">{FIRST_YEAR}</span><span className="bg-end bg-r" aria-hidden="true">Today</span>
              </div>
              <p className="bg-cap" aria-hidden="true"><b className="bg-year">{LAST_YEAR}</b><span className="bg-fact">{factOf(LAST_YEAR)}</span></p>
            </div>
          </div>
          <p className="bx2-n"><CountUp to={10} ms={900} /><span>Years of experience</span></p>
        </div>
        <div className="bx2-c bx2-s bx2-cl">
          <p className="bx2-k">Clients</p>
          <div className="bx2-vis">
            {/* The next dot is you (owner, 28 Nov 2026: "next can be you, add a dot for them, interactive to book a call"). */}
            <div className="bd-wrap">
              <canvas className="bd-dots" aria-hidden="true" />
              <a className="bd-you" href="/book/" style={{ left: `${((573 % 48) + 0.5) / 48 * 100}%`, top: `${(Math.floor(573 / 48) + 0.5) / 12 * 100}%` }}><i aria-hidden="true" /><span>Client 574 could be you. Book a call</span></a>
            </div>
          </div>
          <p className="bx2-n"><CountUp to={573} ms={2200} /><span>Clients served, one dot each</span></p>
        </div>
        <div className="bx2-c bx2-s bx2-e">
          <p className="bx2-k">Turnaround</p>
          <div className="bx2-vis" aria-hidden="true">
            <div className="bt-time">
              <span className="bt-track"><i className="bt-dot" /><b className="bt-head" /><b className="bt-end" /></span>
              <span className="bt-ends"><span>Request</span><span>Back to you</span></span>
            </div>
          </div>
          <p className="bx2-n"><CountUp to={48} suffix="h" ms={1000} /><span>Most requests come back in about two days</span></p>
        </div>
        <div className="bx2-c bx2-w bx-work bx-deck" data-reveal>
          <h3 className="bx-t">Work</h3>
          <SwipeDeck items={WORK.map((w) => ({ slug: w.slug, title: w.title, small: w.small, cut: `/work/cut/${w.small.split("?")[0].split("/").pop()}?v=6`, round: w.platform === "desktop", alt: w.alt, platform: w.platform, tags: w.tags }))} />
        </div>
        <Toolbox />
      </div>
      <BentoLazy />
    </section>
  );
}

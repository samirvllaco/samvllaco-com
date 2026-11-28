import Link from "next/link";
import WorldFacts from "./WorldFacts";
import SwipeDeck from "./SwipeDeck";
import Toolbox from "./Toolbox";
import CountUp from "./CountUp";
import { WORK } from "../lib/work";
import CallIcon from "./CallIcon";
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
// orbiting it. Then four stat cells, each a real number with a picture of it: years on a gauge, one dot per client,
// screens as a rising line, and the usual turnaround on a timeline. Then the work deck, the worldwide facts and the
// toolbox. Canvas and loops come from BentoRun (loaded near the viewport); the gauge and the line draw in CSS once
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
          <div className="bx2-vis bg-gauge" aria-hidden="true">
            <svg viewBox="0 0 220 112" width="220" height="112">
              {TICKS.map((t) => <line key={t.k} x1={t.x1.toFixed(2)} y1={t.y1.toFixed(2)} x2={t.x2.toFixed(2)} y2={t.y2.toFixed(2)} style={{ "--i": t.k }} />)}
            </svg>
            <span className="bg-end bg-l">2013</span><span className="bg-end bg-r">Today</span>
          </div>
          <p className="bx2-n"><CountUp to={10} ms={900} /><span>Years of experience</span></p>
        </div>
        <div className="bx2-c bx2-s bx2-cl">
          <p className="bx2-k">Clients</p>
          <div className="bx2-vis"><canvas className="bd-dots" aria-hidden="true" /></div>
          <p className="bx2-n"><CountUp to={573} /><span>Clients served, one dot each</span></p>
        </div>
        <div className="bx2-c bx2-s bx2-d">
          <p className="bx2-k">Screens</p>
          <a className="hero2-btn hero2-btn-light bx2-go" href="/work/"><span className="sr-only">See my work</span><CallIcon /></a>
          <div className="bx2-vis bl-line" aria-hidden="true">
            <svg viewBox="0 0 240 96" width="240" height="96" preserveAspectRatio="none">
              <path className="bl-area" d="M4 92 C 46 90, 74 84, 104 70 S 160 40, 190 28 S 214 20, 220 18 L 220 96 L 4 96 Z" />
              <path className="bl-path" d="M4 92 C 46 90, 74 84, 104 70 S 160 40, 190 28 S 214 20, 220 18" />
            </svg>
            <i className="bl-dot" />
          </div>
          <p className="bx2-n"><CountUp to={10000} suffix="+" ms={1800} /><span>Screens designed</span></p>
        </div>
        <div className="bx2-c bx2-s bx2-e">
          <p className="bx2-k">Turnaround</p>
          <div className="bx2-vis bt-time" aria-hidden="true">
            <span className="bt-track"><i className="bt-dot" /></span>
            <span className="bt-ends"><span>Request</span><span>Back to you</span></span>
          </div>
          <p className="bx2-n"><CountUp to={48} suffix="h" ms={1000} /><span>Most requests come back in about two days</span></p>
        </div>
        <div className="bx2-c bx2-w bx-work bx-deck" data-reveal>
          <h3 className="bx-t">Work</h3>
          <SwipeDeck items={WORK.map((w) => ({ slug: w.slug, title: w.title, small: w.small, cut: `/work/cut/${w.small.split("?")[0].split("/").pop()}?v=6`, round: w.platform === "desktop", alt: w.alt, platform: w.platform, tags: w.tags }))} />
        </div>
        <div className="bx2-c bx2-g bx-world" data-reveal>
          <h3 className="bx-t">Worldwide</h3>
          <WorldFacts />
        </div>
        <Toolbox />
      </div>
      <BentoLazy />
    </section>
  );
}

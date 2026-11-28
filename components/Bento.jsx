import Link from "next/link";
import WorldFacts from "./WorldFacts";
import SwipeDeck from "./SwipeDeck";
import Toolbox from "./Toolbox";
import BuildIn from "./BuildIn";
import FactRow from "./FactRow";
import CountUp from "./CountUp";
import { WALL } from "../lib/wall";
import { WORK } from "../lib/work";

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

const CLIPS = ["hd-kestrel", "hd-veyra", "hd-sublio", "hd-aruma"].map((n) => `/work/clip/${n}.webp`);

export default function Bento() {
  const clip = WORK.find((w) => w.video) || WORK[0];
  return (
    <section className="bx-sec bx-soft" aria-labelledby="bx-h" data-bg="#0e0e10">
      <h2 id="bx-h" className="bx-title">One designer <span className="t2">for the whole product</span></h2>
      <FactRow />
      <div className="bx-grid">
        <div className="bx-stats">
          <div className="dark-island bx-card bx-stat wg" data-loop>
            <p className="wg-k">Experience</p>
            <CountUp to={10} ms={900} /><span>Years of experience</span>
          </div>
          <div className="dark-island bx-card bx-stat wg" data-loop>
            <p className="wg-k">Clients</p>
            <CountUp to={573} /><span>Clients served</span>
          </div>
          <div className="dark-island bx-card bx-stat wg" data-loop>
            <p className="wg-k">Screens</p>
            <CountUp to={10000} suffix="+" ms={1800} /><span>Screens designed</span>
          </div>
        </div>
        <div className="dark-island bx-card bx-work bx-deck" data-reveal>
          <h3 className="bx-t">Work</h3>
          <SwipeDeck items={WORK.map((w) => ({ slug: w.slug, title: w.title, small: w.small, cut: `/work/cut/${w.small.split("?")[0].split("/").pop()}?v=6`, round: w.platform === "desktop", alt: w.alt, platform: w.platform, tags: w.tags }))} />
        </div>
        <div className="dark-island bx-card bx-world" data-reveal>
          <h3 className="bx-t">Worldwide</h3>
          <WorldFacts />
        </div>
        <Toolbox />
      </div>
    </section>
  );
}

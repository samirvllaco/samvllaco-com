import Link from "next/link";
import BentoGlobe from "./BentoGlobe";
import WorldFacts, { WorldFlags } from "./WorldFacts";
import SwipeDeck from "./SwipeDeck";
import Toolbox from "./Toolbox";
import AutoVideo from "./AutoVideo";
import { WALL } from "../lib/wall";
import { WORK } from "../lib/work";
import { SITE } from "../lib/site";

// Home: main services, then a short bento about Sam. Dark bordered cards.
const Go = ({ children }) => <span className="bx-go">{children} <span aria-hidden="true">→</span></span>;
const TOOLS = ["Figma", "FigJam", "Photoshop", "Illustrator", "After Effects", "Claude", "ChatGPT"];

export function MainServices() {
  return (
    <section className="bx-sec" aria-labelledby="ms-h" data-bg="#000000">
      <h2 id="ms-h">What I do</h2>
      <p className="bx-lede">Four areas, one goal: a product people understand, remember and can find.</p>
      <div className="ms-grid">
        <Link href="/services/#design" className="bx-card ms-card">
          <div className="ms-art ms-design" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={WORK[0].small} width="800" height="600" alt="" loading="lazy" />
          </div>
          <h3>Product design</h3>
        </Link>
        <Link href="/services/#branding" className="bx-card ms-card">
          <div className="ms-art ms-brand" aria-hidden="true"><span className="ms-dots"><i /><i /><i /><i /><i /><i /></span><span className="ms-aa">Aa</span></div>
          <h3>Branding</h3>
        </Link>
        <Link href="/services/#marketing" className="bx-card ms-card">
          <div className="ms-art ms-mkt" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <h3>Marketing design</h3>
        </Link>
        <Link href="/services/#seo" className="bx-card ms-card">
          <div className="ms-art ms-seo" aria-hidden="true"><span className="ms-bar" /><span className="ms-res"><i /><i /><i /></span></div>
          <h3>SEO</h3>
        </Link>
      </div>
    </section>
  );
}

export default function Bento() {
  const clip = WORK.find((w) => w.video) || WORK[0];
  const colA = WALL.slice(30, 36), colB = WALL.slice(40, 46);
  return (
    <section className="bx-sec bx-soft" aria-labelledby="bx-h" data-bg="#000000">
      <h2 id="bx-h" className="bx-title">One designer<br />for the whole product.</h2>
      <div className="bx-grid">
        <div className="bx-stats">
          <div className="bx-card bx-stat"><b>10</b><span>Years of experience</span></div>
          <div className="bx-card bx-stat"><b>50+</b><span>Clients served</span></div>
          <div className="bx-card bx-stat"><b>10,000+</b><span>Screens designed</span></div>
        </div>
        <div className="bx-card bx-work bx-deck" data-reveal>
          <h3 className="bx-t">Work</h3>
          <SwipeDeck items={WORK.map((w) => ({ slug: w.slug, title: w.title, small: w.small, dark: `/work/dark/${w.small.split("?")[0].split("/").pop()}`, alt: w.alt, platform: w.platform, tags: w.tags }))} />
          <p className="bx-cap"><Link href="/#work" className="bx-go">See all work <span aria-hidden="true">→</span></Link></p>
        </div>
        <Link href="/book/" className="bx-card bx-world" data-reveal>
          <h3 className="bx-t">Worldwide</h3>
          <p className="bx-world-s"><i />Based in {SITE.city || "Tirana, Albania"}. 500+ clients across four continents</p>
          <WorldFlags />
          <BentoGlobe />
          <WorldFacts />
        </Link>
        <Link href="/#work" className="bx-card bx-mini bx-screens" data-reveal>
          <h3 className="bx-t">Screens</h3>
          <div className="bx-cols" aria-hidden="true">
            {[colA, colB].map((col, k) => (
              <div className="bx-col" key={k}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {[...col, ...col].map((src, i) => <img key={i} src={src} width="960" height="540" alt="" loading="lazy" />)}
              </div>
            ))}
          </div>
        </Link>
        <Link href={`/work/${clip.slug}/`} className="bx-card bx-mini bx-motion" data-reveal>
          <h3 className="bx-t">Animations</h3>
          <div className="bx-frame"><AutoVideo src={clip.video} poster={clip.small} /></div>
        </Link>
        <Toolbox />
      </div>
    </section>
  );
}

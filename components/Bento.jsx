import Link from "next/link";
import GlobeLazy from "./GlobeLazy";
import WorldFacts, { WorldFlags } from "./WorldFacts";
import SwipeDeck from "./SwipeDeck";
import Toolbox from "./Toolbox";
import BuildIn from "./BuildIn";
import FactRow from "./FactRow";
import { WALL } from "../lib/wall";
import { WORK } from "../lib/work";
import { SITE } from "../lib/site";

// Home: main services, then a short bento about Sam. Glossy widget cards with small looping scenes
// (owner, 27 Nov 2026, after his Figma widget prototypes). Each loop says what its number means: ten years from
// websites to AI products, clients from five regions orbiting Sam, and a screen being designed and filed onto the pile.
const Go = ({ children }) => <span className="bx-go">{children} <span aria-hidden="true">→</span></span>;
const TOOLS = ["Figma", "FigJam", "Photoshop", "Illustrator", "After Effects", "Claude", "ChatGPT"];

export function MainServices() {
  return (
    <section className="bx-sec" aria-labelledby="ms-h" data-bg="#171719">
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
    <section className="bx-sec bx-soft" aria-labelledby="bx-h" data-bg="#171719">
      <h2 id="bx-h" className="bx-title">One designer<br /><span className="t2">for the whole product.</span></h2>
      <FactRow />
      <div className="bx-grid">
        <div className="bx-stats">
          <div className="dark-island bx-card bx-stat wg" data-loop>
            <div className="wg-art wg-era" aria-hidden="true">
              <span className="wg-view">
                <span className="wg-m wg-web"><i className="wg-bar3"><b /><b /><b /></i><i className="wg-ln" /><i className="wg-ln wg-short" /><i className="wg-pill2" /></span>
                <span className="wg-m wg-app"><i className="wg-notch" /><i className="wg-row" /><i className="wg-row" /><i className="wg-row" /></span>
                <span className="wg-m wg-saas"><i className="wg-side" /><i className="wg-bars"><b /><b /><b /><b /><b /></i></span>
                <span className="wg-m wg-ai"><i className="wg-msg" /><i className="wg-msg wg-me" /><i className="wg-spark">✦</i></span>
              </span>
              <span className="wg-rail"><i className="wg-fillr" /><b>Web</b><b>Mobile</b><b>SaaS</b><b>AI</b></span>
            </div>
            <p className="wg-k">Experience</p>
            <b>10</b><span>Years of experience</span>
          </div>
          <div className="dark-island bx-card bx-stat wg" data-loop>
            <div className="wg-art wg-orbit" aria-hidden="true">
              <i className="wg-ring wg-r1" /><i className="wg-ring wg-r2" /><i className="wg-ping" />
              <span className="wg-spin wg-s1"><i><img src="/flags/us.svg" width="20" height="20" alt="" loading="lazy" /></i><i><img src="/flags/ca.svg" width="20" height="20" alt="" loading="lazy" /></i></span>
              <span className="wg-spin wg-s2"><i><img src="/flags/au.svg" width="20" height="20" alt="" loading="lazy" /></i><i><img src="/flags/ae.svg" width="20" height="20" alt="" loading="lazy" /></i><i><img src="/flags/eu.svg" width="20" height="20" alt="" loading="lazy" /></i></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam-face-144.webp?v=1" width="40" height="40" alt="" loading="lazy" />
            </div>
            <p className="wg-k">Clients</p>
            <b>573 <em className="wg-pill">4 continents</em></b><span>Clients served</span>
          </div>
          <div className="dark-island bx-card bx-stat wg" data-loop>
            <div className="wg-art wg-build" aria-hidden="true">
              <span className="wg-pile" /><span className="wg-pile wg-pile2" />
              <span className="wg-scr"><i className="wg-b1" /><i className="wg-b2" /><i className="wg-b3" /><i className="wg-b4" /><i className="wg-b5" /></span>
            </div>
            <p className="wg-k">Screens</p>
            <b>10,000+</b><span>Screens designed</span>
          </div>
        </div>
        <div className="dark-island bx-card bx-work bx-deck" data-reveal>
          <h3 className="bx-t">Work</h3>
          <SwipeDeck items={WORK.map((w) => ({ slug: w.slug, title: w.title, small: w.small, cut: `/work/cut/${w.small.split("?")[0].split("/").pop()}?v=5`, round: w.platform === "desktop", alt: w.alt, platform: w.platform, tags: w.tags }))} />
        </div>
        <div className="dark-island bx-card bx-world" data-reveal>
          <h3 className="bx-t">Worldwide</h3>
          <p className="bx-world-s"><i />Based in {SITE.city || "Tirana, Albania"}. 573 clients across four continents</p>
          <WorldFlags />
          <GlobeLazy />
          <WorldFacts />
        </div>
        <Link prefetch={false} href="/services/" className="dark-island bx-card bx-mini bx-proc" data-reveal data-loop>
          <h3 className="bx-t">Behind the screens</h3>
          <div className="w4" aria-hidden="true">
            <div className="w4-card w4-blue">
              <p className="w4-k">User research</p>
              <div className="w4-quotes">
                <span>"I couldn't find the pricing."</span>
                <span>"Too many steps to sign up."</span>
              </div>
              <p className="w4-foot">12 interviews</p>
            </div>
            <div className="w4-card w4-white w4-dots">
              <p className="w4-k">UX flow</p>
              <div className="w4-flow"><span>Visit</span><i /><span>Sign up</span><i /><span className="win">First win</span></div>
              <p className="w4-foot">6 steps cut to 3</p>
            </div>
            <div className="w4-card w4-black">
              <p className="w4-k">A/B test</p>
              <div className="w4-bars"><i style={{ "--h": "40%" }} /><i style={{ "--h": "55%" }} /><i style={{ "--h": "46%" }} /><i className="win" style={{ "--h": "92%" }}><em>B +38%</em></i></div>
            </div>
            <div className="w4-card w4-white w4-note">
              <p className="w4-bar">Headline</p>
              <div className="w4-in">
                <p className="w4-old">Revolutionize your workflow with AI</p>
                <p className="w4-new">Send your first invoice in 30 seconds</p>
              </div>
            </div>
          </div>
        </Link>
        <Link prefetch={false} href={`/work/${clip.slug}/`} className="dark-island bx-card bx-mini bx-motion" data-reveal>
          <h3 className="bx-t">Animations</h3>
          <div className="bx-frame"><BuildIn screens={CLIPS} /></div>
        </Link>
        <Toolbox />
      </div>
    </section>
  );
}

import Bento, { MainServices } from "../components/Bento";
import { Offers, Process } from "../components/Offers";
import ScreenWall from "../components/ScreenWall";
import Testimonials from "../components/Testimonials";
import { LIVE as SHOW_TESTIMONIALS } from "../lib/testimonials";
import Faq from "../components/Faq";
import { FAQ } from "../lib/faq";
import { SITE, ARTICLES, EMAIL } from "../lib/site";
import CallIcon from "../components/CallIcon";
import { STATS } from "../lib/stats";
import SectionColors from "../components/SectionColors";
import { MEDIUM_PATH } from "../lib/medium-logo";
import ArticleMark from "../components/ArticleMark";
import WorkGrid from "../components/WorkGrid";
import HirePanel from "../components/HirePanel";
import HeroShow from "../components/HeroShow";
import { LocalTime, CountUp } from "../components/Greeting";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

// Inline icon slot inside the hero headline. It cycles through the tiles, starting at `start`.
const TILES = ["figma", "love", "growth", "systems", "click", "target", "speed", "code"];
function Ico({ start = 0 }) {
  return (
    <span className="h3-slot" aria-hidden="true">
      {TILES.map((n, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={n} src={`/hero/${n}.webp`} width="256" height="256" alt="" style={{ animationDelay: `${(((i - start + 8) % 8) * 3 - 24 + start * 0.35).toFixed(2)}s` }} />
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <div className="wrap page stack-lg">
      <SectionColors />
      <section className="hero2" data-bg="#111112">
        <div className="hero3">
          <p className="hero2-eyebrow">Sam Vllaco · Product Designer</p>
          <h1>
            I design <Ico start={0} /> products<br />
            people <Ico start={1} /> love, and<br />
            experiences <Ico start={2} /> that convert.
          </h1>
          <p className="hero2-sub">10 years turning complex ideas into intuitive, scalable digital products. From early-stage startups to established teams.</p>
          <div className="hero2-cta">
            <a className="hero2-btn hero2-btn-primary" href="#work">Explore my work</a>
            <a className="hero2-btn hero2-btn-light" href="/book/"><CallIcon />Let's work together</a>
          </div>
          <p className="hero2-micro">30 minutes on Google Meet. Free. Bring a problem, not a brief.</p>
          <dl className="hero3-stats">
            <div><dt>10</dt><dd>Years designing</dd></div>
            <div><dt>UX + CRO</dt><dd>Design expertise</dd></div>
            <div><dt>0 → 1</dt><dd>Product building</dd></div>
          </dl>
        </div>
        <div className="hero2-foot">
          <ul className="hero2-stats" aria-label="In numbers">
            <li><CountUp to={10000} suffix="+" /> screens designed</li>
            <li><b>50+</b> clients</li>
            <li><b>10</b> years in product design</li>
            <li>Calls in US business hours</li>
          </ul>
          <p className="loc">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            Tirana, Albania<LocalTime />
          </p>
          <ul className="socials" aria-label="Find me online">
            <li>
              <a href={SITE.links.x} rel="me noopener" aria-label={`X, ${STATS.x} followers`}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.2 22H2l7.7-8.8L1.5 2h6.7l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z"/></svg>
                <span><b>{STATS.x}</b> followers</span>
              </a>
            </li>
            <li>
              <a href={SITE.links.medium} rel="me noopener">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d={MEDIUM_PATH} /></svg>
                <span className="work-open" aria-hidden="true"><span className="work-open-t">Follow on Medium</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
                <span>Medium</span>
              </a>
            </li>
            <li>
              <a href={SITE.links.dribbble} rel="me noopener">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2"/><path fill="none" stroke="currentColor" strokeWidth="2" d="M6 5.5c4 3 8 8.5 9.5 14M3 11c5 .5 11-.5 15-4M9 3c3.5 4.500 6 10.5 6.5 14.5"/></svg>
                <span>Dribbble</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <ScreenWall />

      <section id="work" className="stack work" data-bg="#000000">
          <h2>Work that shipped</h2>
          <p className="work-intro">Products across SaaS, fintech, health and mobile. Names changed where an NDA applies, screens are real.</p>
          <WorkGrid />
          <HirePanel />
      </section>


      {/* Product (Ocufuse) section hidden for now */}


      {/* Globe section hidden for now: <Globe bg="#000000" /> */}



      <MainServices />

      <Offers />

      <Process />

      {SHOW_TESTIMONIALS ? <Testimonials /> : null}

      <Bento />

      <Faq items={FAQ}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam.jpg" width="88" height="88" alt="Sam Vllaco" loading="lazy" />
        <h3>Something else?</h3>
        <p>Schedule a call and let's talk.</p>
        <a className="btn btn-primary" href="/book/"><CallIcon />Schedule a call</a>
        <p className="faq-mail">Or email me at <b>{EMAIL}</b></p>
      </Faq>
    </div>
  );
}

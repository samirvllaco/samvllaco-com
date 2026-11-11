import fs from "fs";
import path from "path";
import Bento from "../components/Bento";
import ToneShift from "../components/ToneShift";
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

// Inline icon slot inside the hero headline. Each slot shows the tiles that match the word before it.
function Ico({ tiles: wanted, delay = 0 }) {
  // Only show tiles that have an image in public/hero, so new tools appear as soon as their file is added.
  const tiles = wanted.filter((n) => fs.existsSync(path.join(process.cwd(), "public", "hero", `${n}.webp`)));
  if (!tiles.length) return null;
  const n = tiles.length;
  // One slot changes at a time: every slot swaps once per 8s beat, offset by `delay` seconds.
  return (
    <span className={`h3-slot h3-seq${n === 1 ? " h3-solo" : ""}`} aria-hidden="true">
      {tiles.map((t, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={t} src={`/hero/${t}.webp`} width="256" height="256" alt=""
          style={n === 1 ? { animationDelay: `${delay - 8}s` } : { animationName: `h3-s${n}`, animationDuration: `${n * 8}s`, animationDelay: `${i * 8 + delay - n * 8}s` }} />
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
          <h1>
            I design <Ico tiles={["figma", "photoshop", "illustrator", "claude", "framer", "sketch", "xd", "aftereffects", "systems", "code"]} /> products{" "}<br />
            people <span className="h3-nw">love <Ico tiles={["love"]} delay={6} />,</span> and{" "}<br />
            experiences that convert <Ico tiles={["growth", "money", "speed"]} delay={3} />
          </h1>
          <p className="hero2-sub">10 years turning complex ideas into intuitive, scalable digital products. From early-stage startups to established teams.</p>
          <div className="hero2-cta">
            <a className="hero2-btn hero2-btn-primary" href="#work">Explore my work</a>
            <a className="hero2-btn hero2-btn-light" href="/book/"><CallIcon />Let's work together</a>
          </div>
          <p className="hero2-micro">30 minutes on Google Meet. Free. Bring a problem, not a brief.</p>
        </div>
        <div className="trust trust-on" aria-labelledby="trust-h">
          <p id="trust-h">Trusted by designers and engineers working at</p>
          <ul>
            {[["netflix", "Netflix"], ["uber", "Uber"], ["google", "Google"], ["youtube", "YouTube"], ["x", "X"], ["behance", "Behance"], ["dribbble", "Dribbble"]].map(([id, name]) => (
              <li key={id}><span hidden={id === "uber"} dangerouslySetInnerHTML={{ __html: fs.readFileSync(path.join(process.cwd(), "public", "social", `${id}.svg`), "utf8") }} />{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <ScreenWall />

      <ToneShift target="#work" />
      <section id="work" className="stack work" data-bg="#000000">
          <h2>Work that shipped</h2>
          <p className="work-intro">Products across SaaS, fintech, health and mobile. Names changed where an NDA applies, screens are real.</p>
          <WorkGrid />
          <HirePanel />
      </section>


      {/* Product (Ocufuse) section hidden for now */}


      {/* Globe section hidden for now: <Globe bg="#000000" /> */}






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

import { WORK } from "../lib/work";
import ScreenFan from "../components/ScreenFan";
import SkyPhoto from "../components/SkyPhoto";
import fs from "fs";
import path from "path";
import Bento from "../components/Bento";
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
import ClientAvatars from "../components/ClientAvatars";
import { LocalTime, CountUp } from "../components/Greeting";

export const metadata = {
  title: { absolute: "Sam - UI/UX Design Partner" },
  alternates: { canonical: "/" },
};

// Inline icon slot inside the hero headline. Each slot shows the tiles that match the word before it.
function Ico({ tiles: wanted, delay = 0, at = 0 }) {
  // Only show tiles that have an image in public/hero, so new tools appear as soon as their file is added.
  const tiles = wanted.filter((n) => fs.existsSync(path.join(process.cwd(), "public", "hero", `${n}.webp`)));
  if (!tiles.length) return null;
  const n = tiles.length;
  // One slot changes at a time: every slot swaps once per 8s beat, offset by `delay` seconds.
  return (
    <span className={`h3-slot h3-seq${n === 1 ? " h3-solo" : ""}`} aria-hidden="true" style={{ "--pop": `${3.6 + at * 0.35}s` }}>
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
            I design <Ico tiles={["figma", "chatgpt", "claude", "photoshop", "illustrator", "systems"]} /> digital products{" "}<br />
            people <span className="h3-nw">love <Ico tiles={["love"]} delay={6} at={1} />,</span> and{" "}<br />
            <span className="t2">experiences that convert</span> <Ico tiles={["growth", "money", "click"]} delay={3} at={2} />
          </h1>
          <p className="hero2-sub">I make complex products feel simple, beautiful, and impossible to ignore.</p>
          <div className="hero2-cta">
            <a className="hero2-btn hero2-btn-primary" href="#work">Explore my work</a>
            <a className="hero2-btn hero2-btn-light" href="/book/"><CallIcon />Let's work together</a>
          </div>
          <div className="hero-proof">
            <p className="hero-award"><i className="lr lr-l" aria-hidden="true" /><i className="lr lr-r" aria-hidden="true" /><span>Award-winning</span><span>UI/UX designer</span></p>
            <i className="hp-div" aria-hidden="true" />
            <p className="hero-trust">
              <ClientAvatars />
              <span className="ht-t">
                <span className="ht-s" role="img" aria-label="Rated 5.0 out of 5"><svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="m10 1.6 2.6 5.3 5.8.8-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.8L10 1.600Z" /></svg><svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="m10 1.6 2.6 5.3 5.8.8-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.8L10 1.600Z" /></svg><svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="m10 1.6 2.6 5.3 5.8.8-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.8L10 1.600Z" /></svg><svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="m10 1.6 2.6 5.3 5.8.8-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.8L10 1.600Z" /></svg><svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="m10 1.6 2.6 5.3 5.8.8-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.8L10 1.600Z" /></svg><b>5.0</b></span>
                <span>Trusted by 573 founders</span>
              </span>
            </p>
          </div>
        </div>
        <ScreenFan items={[["activity", "Activity", "marketing-dashboard"], ["contacts", "Contacts", "marketing-dashboard"], ["campaigns", "Campaigns", "marketing-dashboard"], ["dashboard", "Marketing dashboard", "marketing-dashboard"], ["messages", "Freelance marketplace", "freelance-marketplace"], ["aidraft", "AI draft reply", "marketing-dashboard"], ["discover", "Discover", "freelance-marketplace"], ["subliohome", "Language player", "language-player"], ["approve", "Approve work", "freelance-marketplace"], ["arumahome", "Room planner", "room-editor"], ["upgrade", "Upgrade plan", "marketing-dashboard"], ["review", "Review words", "language-player"], ["table", "Furniture detail", "room-editor"], ["vr", "Room in VR", "room-editor"]].map(([id, title, slug]) => ({ id, slug, title, src: `/work/fan/${id}.webp` }))} />
        <div className="trust trust-on" aria-labelledby="trust-h">
          <p id="trust-h">Trusted by designers and engineers working at</p>
          <div className="trust-run">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1 ? "true" : undefined}>
                {[["netflix", "Netflix"], ["uber", "Uber"], ["google", "Google"], ["youtube", "YouTube"], ["x", "X"], ["dribbble", "Dribbble"], ["behance", "Behance"], ["linkedin", "LinkedIn"]].map(([id, name]) => (
                  <li key={id} aria-label={name}>{id === "uber" ? null : <span dangerouslySetInnerHTML={{ __html: fs.readFileSync(path.join(process.cwd(), "public", "social", `${id}.svg`), "utf8") }} />}{id === "x" ? null : name}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <ScreenWall />

      <section id="work" className="stack work" data-bg="#111112">
          <h2>Work <span className="t2">that shipped</span></h2>
          <WorkGrid />
          <HirePanel />
      </section>


      {/* Product (Ocufuse) section hidden for now */}


      {/* Globe section hidden for now: <Globe bg="#000000" /> */}






      {SHOW_TESTIMONIALS ? <Testimonials /> : null}

      <Bento />

      <Faq items={FAQ}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <SkyPhoto className="faq-photo" />
        <h3>Something else?</h3>
        <p>Book a call and let&apos;s talk.</p>
        <a className="btn btn-primary" href="/book/"><CallIcon />Book a call</a>
        <p className="faq-mail">Or email me at <b>{EMAIL}</b></p>
      </Faq>
    </div>
  );
}

import CopyEmailInline from "../components/HirePanelCopy";
import Link from "next/link";
import { WORK } from "../lib/work";
import SkyPhoto from "../components/SkyPhoto";
import fs from "fs";
import path from "path";
import Bento from "../components/Bento";
import Testimonials from "../components/Testimonials";
import { LIVE as SHOW_TESTIMONIALS } from "../lib/testimonials";
import Faq from "../components/Faq";
import { FAQ } from "../lib/faq";
import { SITE, ARTICLES } from "../lib/site";
import CallIcon from "../components/CallIcon";
import { STATS } from "../lib/stats";
import SectionColors from "../components/SectionColors";
import { MEDIUM_PATH } from "../lib/medium-logo";
import ArticleMark from "../components/ArticleMark";
import WorkCarousel from "../components/WorkCarousel";
import HeroQuote, { QUOTE_DAY } from "../components/HeroQuote";
import HowIWork from "../components/HowIWork";
import Fixes from "../components/Fixes";
import HeroReviews from "../components/HeroReviews";
import HeroShow from "../components/HeroShow";
import { LocalTime, CountUp } from "../components/Greeting";

export const metadata = {
  title: { absolute: "Sam Vllaco: App UI/UX Designer for SaaS and AI Products" },
  alternates: { canonical: "/" },
};

// Inline icon slot inside the hero headline. Each slot shows the tiles that match the word before it.
// A tile is a name, or [name, seconds] to keep it on screen longer or shorter than the 6s default.
function Ico({ id, tiles: wanted, delay = 0, at = 0, gap = "" }) {
  // Only show tiles that have an image in public/hero, so new tools appear as soon as their file is added.
  const tiles = wanted.map((t) => (Array.isArray(t) ? t : [t, 6])).filter(([n]) => fs.existsSync(path.join(process.cwd(), "public", "hero", `${n}.webp`)));
  if (!tiles.length) return null;
  const total = tiles.reduce((a, [, d]) => a + d, 0);
  const pc = (sec) => `${((sec / total) * 100).toFixed(2)}%`;
  const off = "opacity: 0; filter: blur(7px);";
  let start = 0;
  const css = [];
  const imgs = tiles.map(([t, d], i) => {
    const name = `h3-w-${id}-${i}`;
    css.push(`@keyframes ${name} { 0% { ${off} transform: translateY(55%) scale(.82, 1.12); } ${pc(0.35)} { opacity: 1; transform: none; filter: blur(0); } ${pc(d)} { opacity: 1; transform: none; filter: blur(0); } ${pc(d + 0.35)} { ${off} transform: translateY(-55%) scale(.82, 1.12); } 100% { ${off} transform: translateY(-55%) scale(.82, 1.12); } }`);
    const el = (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={t} src={`/hero/${t}.webp?v=4`} width="256" height="256" alt=""
        style={tiles.length === 1 ? { opacity: 1, animation: "none" } : { animationName: name, animationDuration: `${total}s`, animationDelay: `${start + delay - total}s` }} />
    );
    start += d;
    return el;
  });
  return (
    <span className={`h3-slot h3-seq${gap ? ` h3-g${gap}` : ""}`} aria-hidden="true" style={{ "--pop": `${0.25 + at * 0.15}s` }}>
      {tiles.length > 1 ? <style dangerouslySetInnerHTML={{ __html: css.join("\n") }} /> : null}
      {imgs}
    </span>
  );
}

// Words of the hero headline, one span each, so they can glide aside when the icons arrive.
function W({ t }) {
  const parts = t.split(" ");
  return parts.map((w, i) => <span key={i}><span className="h3-wd">{w}</span>{i < parts.length - 1 ? " " : null}</span>);
}

// Headline intro (owner, 14 Nov 2026): for the first 2 seconds it reads as plain text, then the icons pop in
// and the words glide apart to make room. The words move with transform only, measured against the final
// layout, so nothing shifts in layout (no CLS). Reduced motion shows the final headline at once.
// Hero work window: four projects that match the people I design for (SaaS, fintech, health, e-commerce), each with a short tab name.
// Only the fields the window needs. Client work under NDA that shows a real brand stays out of the hero.
const HERO_TABS = [["marketing-dashboard", "Dashboard"], ["mobile-banking", "Banking"], ["eye-care-web-app", "Eye care"], ["supplements-store", "Store"]];
const HERO_SHOW = HERO_TABS
  .map(([s, tab]) => { const w = WORK.find((x) => x.slug === s); return w && { tab, slug: w.slug, title: w.title, tags: w.tags, small: w.small, smallW: w.smallW, w: w.w, h: w.h, video: w.video }; })
  .filter(Boolean);
const H1_FLIP = `(function(){var s=document.currentScript,h=s&&s.previousElementSibling;if(!h)return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("h3-in");return}
var go=false,ws=[].slice.call(h.querySelectorAll(".h3-wd"));
function place(){if(go)return;ws.forEach(function(w){w.style.transform=""});var f=ws.map(function(w){return w.getBoundingClientRect()}),hf=h.offsetHeight;
h.classList.add("h3-c");var c=ws.map(function(w){return w.getBoundingClientRect()}),dy=(hf-h.offsetHeight)/2;h.classList.remove("h3-c");
ws.forEach(function(w,i){var x=c[i].left-f[i].left,y=c[i].top-f[i].top+dy;w.style.transform=x||y?"translate("+x+"px,"+y+"px)":""})}
place();h.classList.add("h3-pre");
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);
addEventListener("resize",place);
setTimeout(function(){go=true;removeEventListener("resize",place);h.classList.add("h3-in");ws.forEach(function(w){w.style.transform=""})},2000)})();`;

export default function Home() {
  return (
    <div className="wrap page stack-lg">
      <SectionColors />
      <section className="hero2" data-bg="#171719">
        <div className="hero3 hero-split">
          {/* Right side: Sam's work in a design file window (owner, 27 Nov 2026: "add my designs / animations", then "our own better version"). */}
          <HeroShow items={HERO_SHOW} />
          {/* The "Available for" badge is off (owner, 27 Nov 2026: "remove it looks weird"); HeroRole.jsx stays for later. */}
          <h1 className="h3-flip">
            <W t="I design UI/UX" /> <Ico id="a" gap="r" tiles={[["figma", 12], ["photoshop", 5], ["chatgpt", 2.5], ["illustrator", 5], ["pen", 5], ["claude", 2.5], ["systems", 5], ["wand", 4]]} /><W t="for products" />{" "}<br />
            <W t="people" /> <span className="h3-nw"><W t="love" /><Ico id="b" gap="l" tiles={[["love", 9], "star", "smile", "like", "chat"]} delay={2} at={1} /><W t="," /></span> <W t="and" />{" "}<br />
            <span className="t2"><W t="experiences that convert" /></span> <Ico id="c" tiles={["growth", "money", "target", "bolt", "rocket", "click"]} delay={4} at={2} />
          </h1>
          {/* Runs before the first paint: the headline first reads as plain text, then the icons open their space. */}
          <script dangerouslySetInnerHTML={{ __html: H1_FLIP }} />
          <p className="hero2-sub">UX audits, UI/UX sprints and redesigns for SaaS, fintech, healthcare and e-commerce products. I find the gaps in your app and fix them, or design it from zero.</p>
          <div className="hero2-cta">
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a 30-min strategy call</a>
          </div>
          <div className="hero-proof">
            <p className="hero-award"><i className="lr lr-l" aria-hidden="true" /><i className="lr lr-r" aria-hidden="true" /><span>Award-winning</span><span>UI/UX designer</span></p>
            <i className="hp-div" aria-hidden="true" />
            <HeroReviews />
            {/* Client avatars and "Trusted by" row hidden until real client photos are added. */}
          </div>
          <figure className="hero-quote" id="hq">
            <blockquote><p><span className="hq-t" suppressHydrationWarning>&ldquo;Good design is good business.&rdquo;</span></p></blockquote>
            <figcaption><span className="hq-by" suppressHydrationWarning>Thomas J. Watson Jr., IBM</span></figcaption>
          </figure>
          <script dangerouslySetInnerHTML={{ __html: QUOTE_DAY }} />
          <HeroQuote />
        </div>
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

      {/* The wall of screens moved to the top of the footer, behind the closing call (owner, 27 Nov 2026). */}

      {/* GrowthSystem ("One designer, end to end") is off (owner, 27 Nov 2026: "hide"); the component stays in components/. */}
      <HowIWork />


      <section id="work" className="stack work" data-bg="#171719">
          <h2>Work <span className="t2">that shipped</span></h2>
          <p className="work-lede">Real products with real users. Some names are changed because the work is under NDA.</p>
          <WorkCarousel items={WORK.map((w) => ({ slug: w.slug, title: w.title, sub: w.sub, alt: w.alt, small: w.small }))} />
          <div className="wc-all"><Link prefetch={false} className="hero2-btn hero2-btn-light" href="/work/">View all work</Link></div>
      </section>

      <Fixes />




      {/* Globe section hidden for now: <Globe bg="#171719" /> */}






      {SHOW_TESTIMONIALS ? <Testimonials /> : null}

      <Bento />

      <Faq items={FAQ} light>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <SkyPhoto className="faq-photo" />
        <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Ask me on a call</a></p>
        <div className="faq-mail"><CopyEmailInline icon /></div>
      </Faq>
    </div>
  );
}

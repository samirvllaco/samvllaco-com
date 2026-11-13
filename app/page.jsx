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
import PainStory from "../components/PainStory";
import HeroShow from "../components/HeroShow";
import HeroRole from "../components/HeroRole";
import { LocalTime, CountUp } from "../components/Greeting";

export const metadata = {
  title: { absolute: "Sam Vllaco: Product Designer for SaaS and AI Products" },
  alternates: { canonical: "/" },
};

// Inline icon slot inside the hero headline. Each slot shows the tiles that match the word before it.
// A tile is a name, or [name, seconds] to keep it on screen longer or shorter than the 6s default.
function Ico({ id, tiles: wanted, delay = 0, at = 0 }) {
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
    <span className="h3-slot h3-seq" aria-hidden="true" style={{ "--pop": `${0.25 + at * 0.15}s` }}>
      {tiles.length > 1 ? <style dangerouslySetInnerHTML={{ __html: css.join("\n") }} /> : null}
      {imgs}
    </span>
  );
}

export default function Home() {
  return (
    <div className="wrap page stack-lg">
      <SectionColors />
      <section className="hero2" data-bg="#0b0b0c">
        <div className="hero3">
          <HeroRole />
          <h1>
            I design <Ico id="a" tiles={[["figma", 12], ["photoshop", 5], ["chatgpt", 2.5], ["illustrator", 5], ["pen", 5], ["claude", 2.5], ["systems", 5], ["wand", 4]]} /> digital products{" "}<br />
            people <span className="h3-nw">love <Ico id="b" tiles={[["love", 9], "star", "smile", "like", "chat"]} delay={2} at={1} />,</span> and{" "}<br />
            <span className="t2">experiences that convert</span> <Ico id="c" tiles={["growth", "money", "target", "bolt", "rocket", "click"]} delay={4} at={2} />
          </h1>
          <p className="hero2-sub">You built something people need. If they can't see it in five seconds, they leave. I make your product clear, beautiful and easy to say yes to.</p>
          <div className="hero2-cta">
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a 30-min design strategy call</a>
          </div>
          <div className="hero-proof">
            <p className="hero-award"><i className="lr lr-l" aria-hidden="true" /><i className="lr lr-r" aria-hidden="true" /><span>Award-winning</span><span>UI/UX designer</span></p>
            {/* Client avatars and "Trusted by" row hidden until real client photos are added. */}
          </div>
        </div>
        <ScreenFan items={[["activity", "Activity", "marketing-dashboard"], ["contacts", "Contacts", "marketing-dashboard"], ["campaigns", "Campaigns", "marketing-dashboard"], ["dashboard", "Marketing dashboard", "marketing-dashboard"], ["messages", "Freelance marketplace", "freelance-marketplace"], ["aidraft", "AI draft reply", "marketing-dashboard"], ["discover", "Discover", "freelance-marketplace"], ["subliohome", "Language player", "language-player"], ["approve", "Approve work", "freelance-marketplace"], ["arumahome", "Room planner", "room-editor"], ["upgrade", "Upgrade plan", "marketing-dashboard"], ["review", "Review words", "language-player"], ["table", "Furniture detail", "room-editor"], ["vr", "Room in VR", "room-editor"]].map(([id, title, slug]) => ({ id, slug, title, src: `/work/fan/${id}.webp?v=2` }))} />
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

      <PainStory />

      <section id="work" className="stack work" data-bg="#000000">
          <h2>Work <span className="t2">that shipped</span></h2>
          <p className="work-lede">Real products with real users. Some names are changed because the work is under NDA.</p>
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
        <h3>Still have a question? <em className="scr">Good, ask me.</em></h3>
        <p>Most founders I talk to have one question they didn't want to type into a form. Bring it to a call. It's just you and me, and you can ask anything.</p>
        <ul className="faq-pts">
          <li><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01" /></svg></i>A plan made for your problem</li>
          <li><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6zM9 11h7M9 15h7M9 19h4" /></svg></i>The full plan, written down</li>
          <li><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg></i>Ready to start right away</li>
        </ul>
        <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Ask me on a call</a></p>
        <p className="faq-mail">Rather write? Email me at <b>{EMAIL}</b></p>
      </Faq>
    </div>
  );
}

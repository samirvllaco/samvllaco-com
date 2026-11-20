import BeforeAfter from "../../components/BeforeAfter";
import Link from "next/link";
import { BOOK_URL } from "../../lib/site";
import { PeopleStack } from "../../components/ClientAvatars";
import { MarkerText, Mark } from "../../components/MarkerText";
import Crumbs from "../../components/Crumbs";
import SectionColors from "../../components/SectionColors";
import FreePrompts from "../../components/FreePrompts";
import JsonLd from "../../components/JsonLd";
import Faq from "../../components/Faq";
import EbookBar from "../../components/EbookBar";
import HeroReviews from "../../components/HeroReviews";
import FlipBook from "../../components/FlipBook";
import { share, PERSON_ID } from "../../lib/seo";
import { SITE, EMAIL, REVIEW_URL, PERSONAL_REVIEW_URL } from "../../lib/site";

const BUY_URL = BOOK_URL;
const PRICE = "$12.99";
const WAS = "$17.32"; // compare-at price Whop shows for its 25% discount (owner, 15 Nov 2026)

export const metadata = {
  title: "Fix AI Slop UI and Design: 27 Copy-Paste Prompts",
  description:
    "27 copy-paste prompts by product designer Sam Vllaco that make an AI-built app or site look designed, plus a DESIGN.md rules file and a private video.",
  keywords: ["fix AI slop UI", "AI slop UI", "fix AI slop design", "fix AI generated website design", "vibe coding design", "DESIGN.md", "copy-paste UI prompts", "Lovable Cursor v0 Claude design prompts", "UX laws", "private video tutorial", "live AI design demo", "Sam Vllaco"],
  alternates: { canonical: "/fix-ai-slop-ui/" },
  ...share({ title: "27 Copy-Paste Prompts to Fix AI Slop UI", description: "Make your Claude, Cursor, Lovable or v0 app look designed. 27 prompts, a DESIGN.md rules file and a private video.", url: "/fix-ai-slop-ui/", image: "/og/fix-ai-slop-ui.jpg", alt: "The book 27 Copy-Paste Prompts to Fix AI Slop UI by Sam Vllaco" }),
};

const BOOK_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE.url}/fix-ai-slop-ui/#product`,
  name: "27 Copy-Paste Prompts to Fix AI Slop UI",
  description: "An ebook with 27 steps and copy-paste prompts that make an AI-built website or app look designed, a DESIGN.md rules file, PROMPTS.md, SCORECARD.md, UX-LAWS.md and a private 15 to 30 minute video.",
  image: [`${SITE.url}/og/fix-ai-slop-ui.jpg`, `${SITE.url}/book-cover.webp`],
  category: "Ebook",
  brand: { "@type": "Brand", name: "Sam Vllaco" },
  author: { "@id": PERSON_ID },
  url: `${SITE.url}/fix-ai-slop-ui/`,
  offers: { "@type": "Offer", price: "12.99", priceCurrency: "USD", availability: "https://schema.org/InStock", url: BOOK_URL, seller: { "@id": PERSON_ID } },
};

const TOOLS = ["claude", "lovable", "v0", "codex", "cursor", "bolt", "chatgpt", "gemini"];

const PHASES = [
  { img: "tells", n: "Steps 1 to 8", t: "Spot it", d: "Eight tells that make a page look AI-made, each with a prompt that finds it for you." },
  { img: "habits", n: "Steps 9 to 14", t: "Set up", d: "Six prompting habits: one section at a time, a full reference link, a screenshot, three clear lines." },
  { img: "fixes", n: "Steps 15 to 25", t: "Fix it", d: "Eleven fixes for color, type, spacing, hero, cards, icons, surfaces, copy, states, proof and mobile." },
  { img: "rules", n: "Steps 26 and 27", t: "Keep it fixed", d: "A DESIGN.md rules file and a rating loop you run until the page scores 10 out of 10." },
];

const STEPS = [
  ["Spot it", "Find what makes the page look AI-made", [
    ["Look for the purple to blue gradient", "List every color and what it is used for. Ten or more with no pattern is the tell."],
    ["Count identical icon cards", "Three matching cards with an icon, two words and a sentence say nothing specific."],
    ["Search for emoji used as icons", "Scan feature lists, pricing tiers and buttons. Newer models do it less, but still do."],
    ["Read your headline out loud", "Say it to someone new and ask what you sell. If they can't tell, it is filler."],
    ["Look for glow and neon", "Colored glows, neon outlines and heavy shadows look like effort and read as clutter."],
    ["Measure three gaps", "Write down the space between three pairs of sections. Uneven gaps are felt, not named."],
    ["Find the abstract shapes", "Is the main image your product, or a blob, a 3D swirl or a stock photo?"],
    ["Test the states and the phone", "Hover, tab, empty a list, then open the page at 390 pixels wide."],
  ]],
  ["Set up", "Prompt in a way that gets it right sooner", [
    ["Expect two or three rounds", "Treat the first output as a draft and judge the last round, not the first."],
    ["Finish one section at a time", "Hero, then features, then pricing. One big request gets you the average of everything."],
    ["Design it in Figma first, when you can", "Dragging boxes for two minutes beats twenty minutes of arguing in prompts."],
    ["Paste the full link of your reference", "A link plus the part you mean is an instruction. \"Like Linear\" is a guess."],
    ["Attach the reference image too", "Screenshot the exact section. The AI stops inventing when it can see the target."],
    ["Say what you need in three lines", "What to change, where, and the exact values. Skip adjectives like modern and clean."],
  ]],
  ["Fix it", "Eleven fixes, one prompt each", [
    ["Build a color system", "Give every color a job and a name. Start in gray, then add one accent."],
    ["Cut type to four sizes", "One font, four sizes, two weights. Map every size you find to the nearest one."],
    ["Put spacing on one scale", "A 4-point scale where related things sit close and different things sit apart."],
    ["Say what it does in ten words", "A headline under ten words, one sentence below it, one primary button."],
    ["Retire the three little boxes", "Swap them for one big card with a real screenshot and two small ones with a number."],
    ["Use one consistent icon set", "Filled or lined, never both. Decide once and keep it."],
    ["Turn the glow off", "Two radii for the whole product, and a thin border or one soft shadow, never both."],
    ["Rewrite the title, paragraph and button", "One formula so each of the three does a different job."],
    ["Design the moments AI skips", "Hover, focus, disabled, empty and error states for every control and list."],
    ["Show the product, not a blob", "A real screenshot with realistic data and one honest line of proof."],
    ["Make it work on a phone", "Start at 390 pixels, one column, full-width buttons, nothing scrolling sideways."],
  ]],
  ["Keep it fixed", "The bonus that makes the fixes stick", [
    ["Fill in DESIGN.md", "Ten clear rules your AI reads at the start of every session, so it stops forgetting."],
    ["Rate it, fix it, rate it again", "A scorecard loop you repeat until the page earns a 10 out of 10."],
    ["Add motion and UX rules", "Two bonus prompts for subtle motion and easy-to-use controls, saved into DESIGN.md."],
  ]],
];

const FOR = [
  {
    k: "f", ico: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 12l3 3M14.5 4.5c2-2 5-1.5 5-1.5s.5 3-1.5 5L12 14l-4-4zM9 10H5l3-3h4M14 15v4l3-3v-4", t: "The founder", who: "Built it with Lovable, Bolt or Cursor",
    q: "I'll fix the design after launch.",
    hope: "People trust it enough to pay on the first visit.",
    fear: "Someone posts it next to Linear, and the replies say \"AI slop\".",
    fix: "A page that looks like a funded product, for less than one hour of a designer's time.",
  },
  {
    k: "d", ico: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14", t: "The developer", who: "Ships fast, hates guessing",
    q: "It works. Why does it look wrong?",
    hope: "Design rules as clear as a spec, with real numbers.",
    fear: "Every \"make it nicer\" adds another gradient, and you can't say why.",
    fix: "DESIGN.md turns taste into numbers: one spacing scale, four text sizes, one accent.",
  },
  {
    k: "s", ico: "M12 19l7-7 2 2-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", t: "The designer", who: "Knows what good looks like",
    q: "I could fix it. Just not again, every time.",
    hope: "AI that keeps your standard, so you keep the speed.",
    fear: "Your name ends up on work that looks generated.",
    fix: "Your taste written down once, as rules your AI follows on every page.",
  },
];

const GET = [
  ["book", "27 steps, 59 pages", "One prompt per step, with why it works and what to check."],
  ["list", "All 27 prompts in one list", "Numbered and ready to copy."],
  ["file", "DESIGN.md rules file", "Spacing, color, icons, copy and states your AI reads every session."],
  ["gauge", "SCORECARD.md and PROMPTS.md", "Plain files to drop into your project."],
  ["scale", "100 UX laws", "Each one matched to the prompt that uses it."],
  ["compass", "Design references", "Where to find good examples to copy from."],
  ["repeat", "Lifetime updates", "Updated every week. Every new version is yours."],
];
const BONUS = [
  ["play", "Private video, 15 to 30 min", "Watch me turn an AI-built page into a real product, live."],
  ["spark", "All-in-one prompt", "Asks first and waits for your go-ahead."],
  ["motion", "Motion prompt", "12 animation principles in subtle values."],
  ["hand", "UX principles prompt", "8 rules that check every button, link and list."],
];

const FAQ = [
  ["What format is it?", "**A PDF** plus **four plain text files** (DESIGN.md, SCORECARD.md, PROMPTS.md and UX-LAWS.md) you can drop into your project, and ==a private video link==."],
  ["What is the private video?", "A **15 to 30 minute screen recording** where I take an AI-built page and turn it into a real product, _live_, using the prompts from the book. You see ==every decision and why I make it==, so you can pause, copy my steps and learn how I think."],
  ["Which AI tools does it work with?", "==Any tool that takes a prompt==, such as **Claude, Lovable, v0, Codex, Cursor and Bolt**. The prompts are plain language."],
  ["Do I need design skills?", "**Nope.** Each step tells you ==what to do, why it matters and what to check== before you say yes to the AI's change."],
  ["How long does it take?", "Two speeds. The **30-minute quick start** covers color, type, spacing and the hero, where you see ==the biggest jump==. The **full 27 steps** take about an hour per page."],
  ["Why not just ask the AI to make it look better?", "You can, and you usually get _another gradient_. Vague asks get average results. These prompts give your AI ==exact values and rules==, and **the scorecard** shows what still looks off."],
  ["Why is it only $12.99?", "It is priced to be ==an easy yes==. Inside are **the same rules I use on client projects**."],
  ["My app already looks okay. Do I need this?", "**Run the scorecard first.** If your page already scores a 10, you know it is ready. If not, you know ==exactly what to fix==."],
  ["Will it work on my next project?", "**Yes.** That is the point of the system: ==rules, fix, rate, re-run==, on any page you build."],
  ["Can it break something in my app?", "Every prompt asks your AI to ==keep your content and features and change only the design==. AI tools still make mistakes, so **work on a copy or a new branch**, review each change before you accept it and click through the page after. Each step tells you what to check."],
  ["What if the AI changes something important?", "**Undo it** and run the step again with the part to leave alone named in the prompt. Commit or save a backup before each step, so ==going back is one click==. The checks in each step help you catch it _before_ you accept the change."],
  ["Do I get updates?", "**Yes.** I update the book every week, and ==every new version is yours for free==. Download it again from your **Whop library**."],
];

function Buy({ label }) {
  if (!BUY_URL) return <span className="hero2-btn hero2-btn-primary eb-soon" aria-disabled="true">Available soon</span>;
  return <a className="hero2-btn hero2-btn-primary" href={BUY_URL} target="_blank" rel="noopener">{label}</a>;
}

// Raised icon tile inside the hero headline, the same tiles as the home page headline.
function EbIco({ n }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <span className="eb-ico-t" aria-hidden="true"><img src={`/hero/${n}.webp?v=4`} width="256" height="256" alt="" /></span>;
}

export default function Ebook() {
  let n = 0;
  return (
    <div className="wrap page pg eb">
      <SectionColors />
      <Crumbs items={[{ name: "Book", href: "/fix-ai-slop-ui/" }]} />
      <JsonLd data={BOOK_LD} />
      <EbookBar />

      <header className="eb-hero" data-bg="#111112">
        <div className="eb-copy">
          <p className="eb-sale"><b>25% OFF</b><span><s aria-label={`was ${WAS}`}>{WAS}</s> now {PRICE}, video included</span></p>
          <p className="eb-kick">Designed, not generated.</p>
          <h1 className="eb-h1"><span className="eb-27">27 copy-paste prompts</span> to fix <EbIco n="wand" /> <span className="t2">AI slop UI</span> <EbIco n="sparkle" /></h1>
          <p className="eb-sub">You built it fast. It works. Then you open it next to a real product and something feels off: the purple gradient, the three little cards, the glow. Visitors notice it <em className="scr">before they read a word.</em> These prompts fix that, one step at a time, without rebuilding anything.</p>
          <div className="btn-row">
            <Buy label={<>Buy now for <span className="eb-pill"><s aria-label={`was ${WAS}`}>{WAS}</s> {PRICE}</span></>} />
            <a className="hero2-btn hero2-btn-light" href="#inside">Peek inside</a>
          </div>
          <HeroReviews className="hr-left" />
          <p className="pn-trust eb-guar"><span className="pn-shield" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6zM8.5 12l2.5 2.5 4.5-5" /></svg></span><span><b>Money-back guarantee.</b> Not happy with the book? Full refund, no questions.</span></p>
          <ul className="eb-ticks eb-ico">
            <li data-i="list">27 prompts, one per step</li>
            <li data-i="file">DESIGN.md rules file included</li>
            <li data-i="motion">Bonus: motion and UX principles prompts</li>
            <li data-i="play">Bonus: a private video of me fixing a real AI build, live</li>
            <li data-i="hand">No design skills needed. Nothing gets rebuilt</li>
          </ul>
        </div>
        <div className="eb-cover eb-stage">
          {/* Before and after of a sample page, with the book in front */}
          <figure className="eb-shot eb-shot-b" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ebook/ba-before-768.webp?v=3" width="768" height="768" alt="" loading="eager" decoding="async" />
            <figcaption>First AI draft</figcaption>
          </figure>
          <figure className="eb-shot eb-shot-a" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ebook/ba-after-768.webp?v=3" width="768" height="768" alt="" loading="eager" decoding="async" />
            <figcaption>After the book</figcaption>
          </figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="eb-book" src="/ebook/cover.webp?v=2" srcSet="/ebook/cover-520.webp?v=1 520w, /ebook/cover.webp?v=2 936w" sizes="(max-width: 720px) 200px, 300px" width="936" height="1326" alt="Cover of 27 Copy-Paste Prompts to Fix AI Slop UI" loading="eager" fetchPriority="high" />
        </div>
      </header>

      <section className="eb-tools" aria-label="Tools the prompts work with">
        <p>Works with whatever you built it in</p>
        <div>
          {TOOLS.map((t) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={t} src={`/ebook/${t}-128.webp`} width="128" height="128" alt={t} loading="lazy" />
          ))}
        </div>
      </section>

      <BeforeAfter />

      <section className="eb-sec eb-feel pain" aria-labelledby="eb-feel-h">
        <h2 id="eb-feel-h">Sound <span className="t2">familiar?</span></h2>
        <ul className="eb-pains pain-seg">
          <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="ef-1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#ef-1)"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></g></svg></i><b>You hesitate before sharing the link.</b><em>You shipped it. You're proud of it. Something still feels off.</em></li>
          <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="ef-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#ef-2)"><path d="M4 20 15 9M14 4l1.5 3L19 8.5 15.5 10 14 13l-1.5-3L9 8.5 12.5 7zM19 14l.7 1.3L21 16l-1.3.7L19 18l-.7-1.3L17 16l1.3-.7z" /></g></svg></i><b>"Make it look better" added another gradient.</b><em>The AI tries. It just doesn't know what better means.</em></li>
          <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="ef-3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#ef-3)"><path d="M8 8h11v11H8zM5 16V5h11" /></g></svg></i><b>It looks like every other AI-built site.</b><em>And you can't quite say why.</em></li>
        </ul>
        <MarkerText className="eb-story">
          <p>It's 1 a.m. The app works. Then you open it next to Linear or Stripe, and <Mark color="#ff9d2e">yours suddenly looks like a template.</Mark></p>
          <p><em className="scr">I've been there.</em> I've designed products for 10 years, and I build my own with Claude and Cursor. They hand me the same purple, glowing first drafts they hand you. The difference is <Mark type="underline" color="#ff9d2e">I know what to ask for next.</Mark></p>
          <p>So I wrote down the rules I use with clients, turned each one into a copy-paste prompt, and explained why it works. <em className="scr">That's this book.</em></p>
          <p className="eb-story-sign scr">Sam</p>
        </MarkerText>
        <p className="pain-cta"><Buy label={<>Get the prompts <span className="eb-pill">{PRICE}</span></>} /><span>27 prompts, one evening. Yours to keep.</span></p>
      </section>

      <section className="eb-sec eb-vid eb-band" aria-labelledby="eb-vid-h">
        <div className="eb-vid-in">
          <div>
            <p className="eb-grp-k">Bonus with every copy</p>
            <h2 id="eb-vid-h">Watch me fix it, <span className="t2">live</span></h2>
            <p className="eb-why-lede">When you buy the book, you also get a private video. For 15 to 30 minutes I take a page built with AI and turn it into a real product, live on screen. <em className="scr">No cuts, no tricks.</em></p>
            <ul className="eb-ticks eb-ico">
              <li data-i="play">See which prompt I run first, and why</li>
              <li data-i="spark">Hear how I decide what stays and what goes</li>
              <li data-i="list">Pause and copy my steps on your own project</li>
              <li data-i="gauge">Test yourself: score the page with me before and after</li>
            </ul>
            <p className="eb-vid-note">It is the closest thing to sitting next to me while I work. You learn how I think, not just what I type.</p>
          </div>
          <div className="eb-vid-card" aria-hidden="true">
            <span className="eb-vid-play" />
            <span className="eb-vid-tag">Private video · 15 to 30 min</span>
            <span className="eb-vid-cap">From AI first draft to a real product</span>
          </div>
        </div>
        <div className="btn-row"><Buy label={<>Get the book and the video <span className="eb-pill">{PRICE}</span></>} /></div>
      </section>

      <FreePrompts />

      <section className="eb-sec eb-road eb-band" aria-labelledby="eb-road-h">
        <h2 id="eb-road-h">Your first <span className="t2">30 minutes</span></h2>
        <p className="eb-why-lede">This is the quick start. Open your app, open the book, and follow it. <em className="scr">Most of the change shows up here.</em> The full 27 steps take about an hour per page when you want to go further.</p>
        <ol className="eb-road-l">
          <li><b>0 to 5 min</b><span><strong>Audit your colors</strong>Run prompt 1. The AI lists every color and what to cut, without changing anything yet.</span></li>
          <li><b>5 to 10 min</b><span><strong>Set your rules</strong>Fill in DESIGN.md with prompt 15, so your AI uses one gray base and one accent from now on.</span></li>
          <li><b>10 to 20 min</b><span><strong>Fix type and spacing</strong>Prompts 16 and 17: four text sizes and one spacing scale. This is the biggest jump.</span></li>
          <li><b>20 to 25 min</b><span><strong>Rewrite the hero</strong>Prompt 18: one clear headline, one sentence, one button.</span></li>
          <li><b>25 to 30 min</b><span><strong>Rate it</strong>Prompt 27 and the scorecard. Fix the lowest score, then run it again.</span></li>
        </ol>
      </section>

      <section className="eb-sec" id="inside">
        <h2>What's <span className="t2">inside</span></h2>
        <p className="eb-ph-lede">Four parts, in the order you use them. Start at step 1 and finish with a page that scores <em className="scr">10 out of 10.</em></p>
        <div className="eb-phases">
          {PHASES.map((p) => (
            <article key={p.t}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/ebook/${p.img}.webp`} width="480" height="440" alt="" loading="lazy" />
              <span>{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="eb-sec eb-why eb-band">
        <div className="eb-cov-h"><h2>Why this book is <span className="t2">different</span></h2><img className="eb-cov" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" aria-hidden="true" /></div>
        <p className="eb-why-lede">I started with prompt packs too. Paste, get a nicer page, move on. Then the next page looked just as AI-made, and I had no idea why. The fix was not a better prompt. It was <em className="scr">knowing the rules behind it.</em></p>
        <p className="eb-why-lede">So this book does not just hand you prompts. It teaches you why each fix works, so you can repeat it on anything you build.</p>
        <div className="eb-why-grid">
          <article className="eb-why-them">
            <h3>Prompt packs</h3>
            <ul>
              <li data-i="dice">Paste it and hope it works</li>
              <li data-i="page">Fixes the page you pasted it on</li>
              <li data-i="eyeoff">You cannot tell when the AI gets it wrong</li>
              <li data-i="broken">Stuck the moment it breaks</li>
            </ul>
          </article>
          <article className="eb-why-us">
            <h3>This book</h3>
            <ul>
              <li data-i="bulb">Every step explains what changes and why</li>
              <li data-i="repeat">Principles you reuse on every project</li>
              <li data-i="shield">You check the result before you accept it</li>
              <li data-i="sliders">You tune the rules to your own taste</li>
            </ul>
          </article>
        </div>
        <div className="eb-why-any">
          <p>Learn it once, use it anywhere</p>
          <ul>{[["phone", "Mobile apps"], ["web", "Web apps"], ["chart", "SaaS dashboards"], ["globe", "Marketing sites"], ["rocket", "Landing pages"], ["mac", "Mac apps"], ["desk", "Desktop apps"], ["book", "Books"], ["pen", "Articles"]].map(([i, t]) => <li key={t} data-i={i}>{t}</li>)}</ul>
        </div>
        <p className="eb-why-end">When you know what is happening, you trust the result, you feel when something is off, and you can make it your own. Learn the principles and how to use AI properly, and there is not much you cannot build.</p>
      </section>

      <section className="eb-sec eb-sys" aria-labelledby="eb-sys-h">
        <div className="eb-cov-h"><h2 id="eb-sys-h">A system, <span className="t2">not a pile of prompts</span></h2><img className="eb-cov" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" aria-hidden="true" /></div>
        <p className="eb-why-lede">Prompts fix a page once. This is a loop you can <em className="scr">run on every page you build.</em></p>
        <ol className="eb-sys-l">
          <li><span>1</span><b>Rules</b><p>DESIGN.md gives your AI your spacing, colors, type, icons and copy rules, so it stops guessing.</p><code>DESIGN.md</code></li>
          <li><span>2</span><b>Fix</b><p>27 copy-paste prompts, plus the motion and UX principles prompts. Each says why it works and what to check.</p><code>PROMPTS.md</code></li>
          <li><span>3</span><b>Rate</b><p>The scorecard rates your page out of 10 and shows exactly what still looks generated.</p><code>SCORECARD.md</code></li>
          <li><span>4</span><b>Re-run</b><p>Fix the lowest scores, rate again, repeat until it earns a 10. Then run it on the next page.</p><code>Loop</code></li>
        </ol>
      </section>

      <section className="eb-sec eb-band">
        <div className="eb-cov-h"><h2>All 27 <span className="t2">steps</span></h2><img className="eb-cov" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" aria-hidden="true" /></div>
        <div className="eb-steps">
          {STEPS.map(([title, sub, items], gi) => {
            const bonus = gi === 3;
            return (
              <div key={title} className={`eb-grp eb-grp-${gi}${bonus ? " is-bonus" : ""}`}>
                <div className="eb-grp-h">
                  <span className="eb-grp-k">Part {gi + 1} · {bonus ? `Steps ${n + 1} and ${n + 2}, plus the bonus` : `Steps ${n + 1} to ${n + items.length}`}</span>
                  <h3>{title}</h3>
                  <p>{sub}</p>
                  {bonus ? <span className="eb-bonus">Bonus, inside the book</span> : null}
                </div>
                <ol>
                  {items.map(([it, d]) => { n += 1; return <li key={it}><b>{String(n).padStart(2, "0")}</b><span><strong>{it}</strong><em>{d}</em></span></li>; })}
                </ol>
              </div>
            );
          })}
        </div>
      </section>


      <section className="eb-sec eb-bn" id="bonus">
        <p className="eb-bn-tag">Included in the same $12.99 purchase</p>
        <h2>Bonus: <span className="t2">motion and UX principles</span></h2>
        <p className="eb-bn-lede">Once the page looks designed, <em className="scr">make it feel designed.</em> Two more copy-paste prompts add small, quick motion and check every control, and a short block saves the rules in DESIGN.md so every new screen follows them. Works for apps, marketing sites and landing pages.</p>
        <div className="eb-bn-grid">
          <article>
            <span>Bonus prompt A</span>
            <h3>Add subtle motion</h3>
            <p>12 animation principles in small amounts, so people feel it and do not notice it.</p>
            <ul>
              <li>Press scales to 0.97 in 90ms</li>
              <li>Hover lifts 2px, nothing glows</li>
              <li className="eb-lock" aria-hidden="true">Dim the other cards to 60 percent</li>
              <li className="eb-lock" aria-hidden="true">Settle with a tiny overshoot</li>
            </ul>
            <em className="eb-more-tag">+ 10 more principles in the book</em>
          </article>
          <article>
            <span>Bonus prompt B</span>
            <h3>Check 8 UX principles</h3>
            <p>The AI reviews every button, link and list and fixes only what breaks a rule.</p>
            <ul>
              <li>44 by 44 pixel hit areas</li>
              <li>One primary button per screen</li>
              <li className="eb-lock" aria-hidden="true">Lists in groups of seven or fewer</li>
              <li className="eb-lock" aria-hidden="true">Respond within 400ms</li>
            </ul>
            <em className="eb-more-tag">+ 6 more principles in the book</em>
          </article>
          <article className="eb-bn-code">
            <span>Paste into DESIGN.md</span>
            <h3>Rules that stick</h3>
            <pre>{"## Motion\nTransform and opacity only.\nFeedback 90 to 250ms.\n"}<span className="eb-lock" aria-hidden="true">{"Press: scale 0.97.\nHover: lift 2px.\n\n## UX principles\nControls at least 44 by 44px.\nOne primary button per screen."}</span></pre>
            <em className="eb-more-tag">+ the full block in the book</em>
          </article>
        </div>
        <div className="eb-bn-cta">
          <Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} />
          <p>Two prompts, one rules file, no extra cost.</p>
        </div>
      </section>

      <section className="eb-sec">
        <h2>Look <span className="t2">inside</span></h2>
        <FlipBook pages={[1, 2, 3, 4].map((i) => `/ebook/page-${i}.webp?v=2`)}>
          <p className="fb-k">55 more pages inside</p>
          <h3>All 27 prompts, <span className="t2">ready to paste</span></h3>
          <ul>
            <li>27 prompts in 4 phases, with the UX laws behind each</li>
            <li>100 UX laws in plain words</li>
            <li>DESIGN.md, the rules file your AI follows</li>
            <li>Bonus motion and UX prompts</li>
          </ul>
          <Buy label={<>Get it for <span className="eb-pill">{PRICE}</span></>} />
          <p className="fb-note"><em className="scr">You finished the preview.</em> The rest is one click away.</p>
        </FlipBook>
        <div className="eb-more">
          <p><b>4 of 59 pages shown</b><span>55 more pages inside: all 27 prompts, 100 UX laws, DESIGN.md and the bonus motion and UX prompts.</span></p>
          <Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} />
        </div>
      </section>

      <section className="eb-sec eb-for2 dark-island" aria-labelledby="eb-for-h">
        <div className="ef-head">
          <h2 id="eb-for-h">Is this <span className="t2">for you?</span></h2>
          <p className="ef-hook">Three kinds of people buy this book. They worry about different things. <em className="scr">They all have the same problem.</em></p>
          <p className="eb-people"><PeopleStack /><span>For founders, developers and designers who build with AI.</span></p>
        </div>
        <div className="ef-cards">
          {FOR.map((f) => (
            <article key={f.t} className={`ef-card ef-${f.k}`}>
              <div className="ef-who">
                <i className="tg-ico ef-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={f.ico} /></svg></i>
                <div><h3>{f.t}</h3><span>{f.who}</span></div>
              </div>
              <p className="ef-q">&ldquo;{f.q}&rdquo;</p>
              <dl className="ef-hf">
                <div><dt>You hope</dt><dd>{f.hope}</dd></div>
                <div><dt>You fear</dt><dd>{f.fear}</dd></div>
              </dl>
              <p className="ef-fix"><b>With the book</b>{f.fix}</p>
            </article>
          ))}
        </div>
        <svg className="pn-paths ef-paths" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
          <path className="ef-pf" d="M200 0 C200 80 600 50 600 140" />
          <path className="ef-pd" d="M600 0 L600 140" />
          <path className="ef-ps" d="M1000 0 C1000 80 600 50 600 140" />
        </svg>
        <div className="ef-one">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ef-book" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" decoding="async" aria-hidden="true" />
          <div className="ef-one-copy">
            <p className="pn-k">One fix for all three</p>
            <h3>Different fears. <span className="t2">Same cause.</span></h3>
            <MarkerText as="p">Your AI was <Mark color="#ff9d2e">never given design rules</Mark>, so it guesses. Every time. This book gives it the rules in <Mark type="circle" color="#ff9d2e">one evening</Mark>, and the scorecard keeps them there on every page you build next.</MarkerText>
            <ul className="ef-ticks">
              <li><i className="ef-dot ef-f" aria-hidden="true" /><span><b>Founders</b> stop apologising for the design.</span></li>
              <li><i className="ef-dot ef-d" aria-hidden="true" /><span><b>Developers</b> get numbers, not opinions.</span></li>
              <li><i className="ef-dot ef-s" aria-hidden="true" /><span><b>Designers</b> stop fixing the same habits by hand.</span></li>
            </ul>
            <div className="ef-cta">
              <Buy label={<>Get the book <span className="eb-pill">{PRICE}</span></>} />
              <p className="pn-trust eb-guar"><span className="pn-shield" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6zM8.5 12l2.5 2.5 4.5-5" /></svg></span><span><b>Money-back guarantee.</b> Not happy? Full refund.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="eb-sec eb-rv" aria-labelledby="eb-rv-h">
        <h2 id="eb-rv-h">From a founder <span className="t2">who used it</span></h2>
        <figure className="eb-rv-card dark-island">
          <div className="eb-rv-ba">
            {[["Before", "/ebook/cb-before-full.webp?v=1", 4744, "9,500px tall, with large empty gaps"], ["After", "/ebook/cb-after-full.webp?v=1", 3054, "6,100px tall, every section earns its place"]].map(([k, src, h, cap]) => (
              <figure className={`eb-rv-win ${k === "After" ? "is-after" : ""}`} key={k}>
                <p className="eb-rv-chrome"><i /><i /><i /><span>cookinbuddy.com</span></p>
                <div className="eb-rv-view">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} width="720" height={h} alt={`CookinBuddy full homepage ${k.toLowerCase()} the fixes`} loading="lazy" />
                </div>
                <figcaption><b>{k}</b>{cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="eb-rv-body">
            <blockquote><p>"It does look so much better!"</p></blockquote>
            <figcaption><b>Błażej Kustra</b><span>CookinBuddy, recipe app for iPhone</span></figcaption>
            <ul className="eb-rv-wins">
              <li><b>36%</b> shorter page</li>
              <li>Reviews <b>1,500px</b> sooner</li>
              <li>Empty gaps <b>gone</b></li>
            </ul>
            <a className="eb-rv-link" href="https://www.cookinbuddy.com/" target="_blank" rel="noopener">See the live site<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>
          </div>
        </figure>
      </section>

      <section className="eb-sec eb-offer eb-offer2" data-bg="#000000" aria-labelledby="eb-get-h">
        <div className="eo-main">
          <h2 id="eb-get-h">What <span className="t2">you get</span></h2>
          <p className="eo-k">In the book</p>
          <ul className="eb-ticks eb-ico eo-list">{GET.map(([i, t, d]) => <li key={t} data-i={i}><b>{t}</b><span>{d}</span></li>)}</ul>
          <p className="eo-k">Bonuses</p>
          <ul className="eb-ticks eb-ico eo-list">{BONUS.map(([i, t, d]) => <li key={t} data-i={i}><b>{t}</b><span>{d}</span></li>)}</ul>
        </div>
        <aside className="eo-card dark-island">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="eo-cover" src="/ebook/cover.webp?v=2" width="936" height="1326" alt="The book cover" loading="lazy" />
          <p className="eb-was"><s aria-label={`was ${WAS}`}>{WAS}</s><b>Save 25%</b></p>
          <p className="eb-price">{PRICE}<span>one-time</span></p>
          <Buy label="Get your copy" />
          <p className="pn-trust eb-guar"><span className="pn-shield" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6zM8.5 12l2.5 2.5 4.5-5" /></svg></span><span><b>Money-back guarantee.</b> Full refund, no questions.</span></p>
          <p className="eb-note">PDF, four .md files and the video link open in your Whop library right after checkout.</p>
        </aside>
      </section>

      <section className="eb-sec eb-pk eb-band" id="options" aria-labelledby="eb-pk-h">
        <h2 id="eb-pk-h">Pick what <span className="t2">fits you</span></h2>
        <p className="eb-why-lede">Some founders want to fix it on their own. Others want a senior designer to look at their product and say honestly what works and what doesn't. Either way, you can start fixing today.</p>
        <div className="eb-pk-grid">
          <article className="eb-pk-card is-main dark-island">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="eb-pk-media eb-pk-book" src="/ebook/cover-520.webp?v=1" width="936" height="1326" alt="" loading="lazy" />
            <p className="eb-pk-k">The full book</p>
            <h3>27 Copy-Paste Prompts</h3>
            <p className="eb-pk-price">{PRICE}<span>one-time</span></p>
            <ul className="eb-ticks eb-ico">
              <li data-i="book">59 pages, 27 steps, one prompt each</li>
              <li data-i="file">DESIGN.md, SCORECARD.md, PROMPTS.md, UX-LAWS.md</li>
              <li data-i="play">Private video of me fixing a real AI build</li>
              <li data-i="repeat">Lifetime updates, every week</li>
            </ul>
            <Buy label={<>Get the book <span className="eb-pill">{PRICE}</span></>} />
            <p className="eb-pk-small">One-time purchase. Downloadable files you can keep and reuse.</p>
          </article>
          <article className="eb-pk-card dark-island">
            <div className="eb-pk-me">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/me/ai/ai5-128.webp?v=1" width="128" height="128" alt="Sam Vllaco" loading="lazy" />
              <span><b>Sam Vllaco <em className="eb-pk-role">Senior Designer</em></b>10+ years, 570+ clients</span>
            </div>
            <p className="eb-pk-k">Focused review</p>
            <h3>30-min UI/UX review <span className="t2">+ the book</span></h3>
            <p className="eb-pk-price">$49<span>one-time</span></p>
            <p>Your website, SaaS, web app or mobile app, seen through a senior designer's eyes. What works, what doesn't, and why.</p>
            <ul className="eb-ticks eb-ico">
              <li data-i="play">A 20 to 30 min Loom, made only for your product</li>
              <li data-i="compass">My honest opinion and my way of thinking</li>
              <li data-i="file">An actionable steps document, fixes in order</li>
              <li data-i="book">The full book included</li>
            </ul>
            <a className="hero2-btn hero2-btn-light" href={PERSONAL_REVIEW_URL} target="_blank" rel="noopener">Get my review</a>
            <p className="eb-pk-small">Your Loom arrives in under 12 hours. Full refund if it does not help.</p>
          </article>
          <article className="eb-pk-card dark-island">
            <div className="eb-pk-me">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/me/ai/ai5-128.webp?v=1" width="128" height="128" alt="Sam Vllaco" loading="lazy" />
              <i className="eb-pk-plus" aria-hidden="true">+</i>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="eb-pk-mini" src="/ebook/cover-520.webp?v=1" width="936" height="1326" alt="The book" loading="lazy" />
              <span><b>Sam Vllaco</b>Review + the book</span>
            </div>
            <p className="eb-pk-k">Most complete</p>
            <h3>All-inclusive UI/UX review <span className="t2">+ branding tips + the book</span></h3>
            <p className="eb-pk-price">$99<span>one-time</span></p>
            <p>Your whole product, start to finish: UI, UX and brand, across your website and the key screens of your SaaS, web or mobile app.</p>
            <ul className="eb-ticks eb-ico">
              <li data-i="play">A 45 min to 1 hour Loom of your whole product</li>
              <li data-i="gauge">Your UI/UX scorecard today, out of 10</li>
              <li data-i="steps">An action plan document, biggest impact first</li>
              <li data-i="spark">Custom prompts written for your product</li>
              <li data-i="compass">Branding tips: colors, type and logo use</li>
              <li data-i="book">The full book included</li>
            </ul>
            <a className="hero2-btn hero2-btn-light" href={REVIEW_URL} target="_blank" rel="noopener">Get the all-inclusive review</a>
            <p className="eb-pk-small">Your Loom arrives in under 12 hours. Want a full redesign instead? See the <Link prefetch={false} href="/services/ai-app-design-fix/">AI-built app design fix</Link> or <Link prefetch={false} href="/book/">book a call</Link>.</p>
          </article>
        </div>
      </section>

      <section className="hp eb-hp" aria-labelledby="eb-author-h" data-bg="#111112">
        <div className="hp-left">
          <p className="hp-label hp-kick">About the author</p>
          <h2 id="eb-author-h">Sam Vllaco, <em>product designer.</em></h2>
          <p className="hp-lede">I design SaaS products, dashboards and mobile apps, and I build my own products with the same AI tools you use. This book is the set of rules and prompts I use on them.</p>
          <ul className="hp-proof">
            <li><div><b>10,000+</b><span>screens</span></div></li>
            <li className="ws-main"><i className="ws-lr ws-lr-l" aria-hidden="true" /><div><b>10+</b><span>years of experience</span></div><i className="ws-lr ws-lr-r" aria-hidden="true" /></li>
            <li><div><b>570+</b><span>clients</span></div></li>
          </ul>
          <div className="hp-cols">
            <div>
              <p className="hp-label">What I design</p>
              <ul className="hp-ico">{[["saas", "SaaS products"], ["chart", "Dashboards"], ["screen", "Mobile apps"], ["globe", "Marketing sites"], ["system", "Design systems"]].map(([i, t]) => <li key={t} data-i={i}>{t}</li>)}</ul>
            </div>
            <div className="hp-hand">
              <p className="hp-label">What is in the book</p>
              <ul className="hp-ico">{[["steps", "27 steps"], ["copy", "27 copy-paste prompts"], ["scale", "100 UX laws"], ["file", "DESIGN.md rules file"], ["gauge", "A scorecard to rate your page"]].map(([i, t]) => <li key={t} data-i={i}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
        <div className="hp-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hp-photo" src="/me/ai/ai3.webp?v=1" width="1000" height="1000" alt="" loading="lazy" style={{ objectPosition: "60% 20%" }} />
          <div className="hp-shade" aria-hidden="true" />
          <div className="hp-body">
            <h3>10 years of product design,<br /><em>now in 59 pages you can copy and paste.</em></h3>
            <p>Every prompt asks your AI to keep your content and features and change only the design.</p>
            <div className="hp-cta"><Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} /></div>
          </div>
        </div>
      </section>

      <div className="eb-sec eb-faqwrap eb-band">
        <Faq items={FAQ.map(([q, a]) => ({ q, a }))} a="Questions" b="before you buy" bg="#111112">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="faq-photo eb-faq-cov" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" />
          <h3>Still not sure? <em className="scr">Ask me.</em></h3>
          <p>Send me a message and I'll tell you honestly if the book fits your product.</p>
          <p className="faq-go"><Buy label={<>Get the book <span className="eb-pill">{PRICE}</span></>} /></p>
          <p className="faq-mail">Or email me at <b>{EMAIL}</b></p>
        </Faq>
      </div>

      <section className="eb-sec eb-end">
        <p className="eb-end-k">Built with AI. Finished with taste.</p>
        <h2>You built it. <span className="t2">Now make it look like you meant it.</span></h2>
        <MarkerText as="p" className="eb-end-sub">Picture tomorrow morning. You open your link next to the products you admire, and <em className="scr">it holds up.</em> No more <Mark type="strike" color="#ff9d2e">&ldquo;it&rsquo;s just an MVP&rdquo;</Mark> in the post.</MarkerText>
        <ol className="eb-end-path">
          <li><b>Tonight</b><span>Open the book and run prompt 1 on your app.</span></li>
          <li><b>One hour later</b><span>Colors, type, spacing and the hero are fixed.</span></li>
          <li><b>Tomorrow</b><span>You share the link without a disclaimer.</span></li>
        </ol>
        <div className="btn-row"><Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} /></div>
        <MarkerText as="p" className="pn-trust eb-guar"><span className="pn-shield" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6zM8.5 12l2.5 2.5 4.5-5" /></svg></span><span><b>Money-back guarantee.</b> Not happy with the book? <Mark type="box" color="#30d158">Full refund</Mark>, no questions.</span></MarkerText>
      </section>
    </div>
  );
}

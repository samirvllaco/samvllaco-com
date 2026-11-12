import Link from "next/link";
import { PeopleStack } from "../../components/ClientAvatars";
import Crumbs from "../../components/Crumbs";

// Paste the checkout link here when it exists. While empty, the buy buttons show "Available soon".
const BUY_URL = "";
const PRICE = "$6.99";

export const metadata = {
  title: "27 Copy-Paste Prompts to Fix AI Slop UI",
  description:
    "A short book by Sam Vllaco: 27 steps and 27 copy-paste prompts that make an AI-built website or app look designed, plus a DESIGN.md rules file.",
  alternates: { canonical: "/ebook/" },
};

const TOOLS = ["claude", "lovable", "v0", "codex", "cursor", "bolt", "chatgpt", "gemini"];

const PHASES = [
  { img: "tells", n: "Steps 1 to 8", t: "Spot it", d: "Eight tells that make a page look AI-made, each with a prompt that finds it for you." },
  { img: "habits", n: "Steps 9 to 14", t: "Set up", d: "Six prompting habits: one section at a time, a full reference link, a screenshot, three clear lines." },
  { img: "fixes", n: "Steps 15 to 25", t: "Fix it", d: "Eleven fixes for color, type, spacing, hero, cards, icons, surfaces, copy, states, proof and mobile." },
  { img: "rules", n: "Steps 26 and 27", t: "Keep it fixed", d: "A DESIGN.md rules file and a rating loop you run until the page scores 10 out of 10." },
];

const STEPS = [
  ["Spot it", ["Look for the purple to blue gradient", "Count identical icon cards", "Search for emoji used as icons", "Read your headline out loud", "Look for glow and neon", "Measure three gaps", "Find the abstract shapes", "Test the states and the phone"]],
  ["Set up", ["Expect two or three rounds", "Finish one section at a time", "Design it in Figma first, when you can", "Paste the full link of your reference", "Attach the reference image too", "Say what you need in three lines"]],
  ["Fix it", ["Build a color system", "Cut type to four sizes", "Put spacing on one scale", "Say what it does in ten words", "Retire the three little boxes", "Use one consistent icon set", "Turn the glow off", "Rewrite the title, paragraph and button", "Design the moments AI skips", "Show the product, not a blob", "Make it work on a phone"]],
  ["Keep it fixed", ["Fill in DESIGN.md", "Rate it, fix it, rate it again"]],
];

const FOR = [
  { t: "Founders who built with AI", d: "Your product works. You want it to stop looking like every other AI-built page, without hiring a designer yet." },
  { t: "Developers", d: "You can build anything, and you want clear rules for spacing, color and type that you can hand to your AI tool." },
  { t: "Designers who use AI", d: "You know good design. You want prompts and a rules file that make the AI follow it the first time." },
];

const GET = [
  "The book: 27 steps, one prompt per step, 54 pages",
  "All 27 prompts in one list, numbered and ready to copy",
  "A bonus all-in-one prompt that asks first and waits for your go-ahead",
  "DESIGN.md: a full rules file for spacing, color, icons, copy and states",
  "SCORECARD.md and PROMPTS.md as plain files for your project",
  "A list of places to find good design references",
];

const FAQ = [
  ["What format is it?", "A PDF, plus three plain text files you can drop into your project."],
  ["Which AI tools does it work with?", "Any tool that takes a prompt. The prompts are plain language, written for tools like Claude, Lovable, v0, Codex, Cursor and Bolt."],
  ["Do I need design skills?", "No. Each step says what to do, why it matters and what to check before you accept the AI's change."],
  ["How long does it take?", "About three hours for one page. The first hour, on color, type and spacing, changes the most."],
  ["Will it rebuild my app?", "No. Every prompt keeps your content and features and changes only the design."],
];

function Buy({ label }) {
  if (!BUY_URL) return <span className="hero2-btn hero2-btn-primary eb-soon" aria-disabled="true">Available soon</span>;
  return <a className="hero2-btn hero2-btn-primary" href={BUY_URL} rel="noopener">{label}</a>;
}

export default function Ebook() {
  let n = 0;
  return (
    <div className="wrap page pg eb">
      <Crumbs items={[{ name: "Book", href: "/ebook/" }]} />

      <header className="eb-hero">
        <div className="eb-copy">
          <p className="eb-kick">Designed, not generated.</p>
          <h1><span className="eb-27">27</span> copy-paste prompts to fix AI slop UI</h1>
          <p className="eb-sub">Make your vibe-coded website or app feel human-designed. Spot the mistakes you don't notice, copy the fix, and keep it fixed with one rules file.</p>
          <div className="btn-row">
            <Buy label={`Get the book for ${PRICE}`} />
            <a className="hero2-btn hero2-btn-light" href="#inside">See what's inside</a>
          </div>
          <ul className="eb-ticks">
            <li>27 ready-to-use prompts</li>
            <li>DESIGN.md rules file included</li>
            <li>No design skills or rebuild required</li>
          </ul>
        </div>
        <div className="eb-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ebook/cover.webp" width="936" height="1326" alt="Cover of 27 Copy-Paste Prompts to Fix AI Slop UI" />
        </div>
      </header>

      <section className="eb-tools" aria-label="Tools the prompts work with">
        <p>Works with what you built in</p>
        <div>
          {TOOLS.map((t) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={t} src={`/ebook/${t}.webp`} width="200" height="200" alt={t} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="eb-sec" id="inside">
        <h2>What's <span className="t2">inside</span></h2>
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

      <section className="eb-sec">
        <h2>All 27 <span className="t2">steps</span></h2>
        <div className="eb-steps">
          {STEPS.map(([title, items]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ol>
                {items.map((it) => { n += 1; return <li key={it}><b>{String(n).padStart(2, "0")}</b>{it}</li>; })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="eb-sec">
        <h2>Look <span className="t2">inside</span></h2>
        <div className="eb-pages">
          {[1, 2, 3, 4].map((i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={`/ebook/page-${i}.webp`} width="936" height="1326" alt={`Sample page ${i} from the book`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="eb-sec">
        <h2>Is this <span className="t2">for you?</span></h2>
        <p className="eb-people"><PeopleStack /><span>Written for founders, designers and developers who build with AI.</span></p>
        <div className="eb-for">
          {FOR.map((f) => (
            <article key={f.t}><h3>{f.t}</h3><p>{f.d}</p></article>
          ))}
        </div>
      </section>

      <section className="eb-sec eb-offer">
        <div>
          <h2>What <span className="t2">you get</span></h2>
          <ul className="eb-ticks">{GET.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>
        <aside>
          <p className="eb-price">{PRICE}<span>one-time</span></p>
          <Buy label="Get your copy" />
          <p className="eb-note">One PDF and three text files. Yours to keep.</p>
        </aside>
      </section>

      <section className="eb-sec eb-author">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-cut.webp" width="320" height="320" alt="Sam Vllaco" loading="lazy" />
        <div>
          <h2>About <span className="t2">the author</span></h2>
          <p>I'm Sam Vllaco, a product designer. I design SaaS products, dashboards and mobile apps, and I build my own products with the same AI tools you use. This book is the set of rules and prompts I use on them.</p>
          <p><Link href="/about/">More about me</Link> · <Link href="/work/">See my work</Link></p>
        </div>
      </section>

      <section className="eb-sec">
        <h2>Questions <span className="t2">before you buy</span></h2>
        <dl className="eb-faq">
          {FAQ.map(([q, a]) => (<div key={q}><dt>{q}</dt><dd>{a}</dd></div>))}
        </dl>
      </section>

      <section className="eb-sec eb-end">
        <h2>Fix it <span className="t2">in one afternoon</span></h2>
        <div className="btn-row"><Buy label={`Get the book for ${PRICE}`} /></div>
      </section>
    </div>
  );
}

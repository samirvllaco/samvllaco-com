import Link from "next/link";
import { BOOK_URL } from "../../lib/site";
import { PeopleStack } from "../../components/ClientAvatars";
import Crumbs from "../../components/Crumbs";
import SectionColors from "../../components/SectionColors";

const BUY_URL = BOOK_URL;
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
  { t: "Founders who built with AI", d: "You shipped. People can use it. You just wish it did not look like a template, and a designer is not in the budget yet." },
  { t: "Developers", d: "You can build anything, but \"make it look nicer\" is not a spec. You want real numbers for spacing, color and type to hand your AI." },
  { t: "Designers who use AI", d: "You know what good looks like. You are tired of fixing the same AI habits by hand every single time." },
];

const GET = [
  ["book", "The book: 27 steps, one prompt per step, 59 pages"],
  ["list", "All 27 prompts in one list, numbered and ready to copy"],
  ["spark", "An all-in-one prompt that asks first and waits for your go-ahead", "Bonus"],
  ["file", "DESIGN.md: a full rules file for spacing, color, icons, copy and states"],
  ["gauge", "SCORECARD.md and PROMPTS.md as plain files for your project"],
  ["scale", "100 UX laws, each one matched to the prompt that uses it"],
  ["motion", "Motion prompt: 12 animation principles in subtle values, plus a block to paste into DESIGN.md", "Bonus"],
  ["hand", "UX principles prompt: 8 rules that check every button, link and list", "Bonus"],
  ["compass", "A list of places to find good design references"],
];
const FILES = ["DESIGN.md", "SCORECARD.md", "PROMPTS.md", "UX-LAWS.md"];

const FAQ = [
  ["What format is it?", "A PDF plus four plain text files (DESIGN.md, SCORECARD.md, PROMPTS.md and UX-LAWS.md) you can drop into your project."],
  ["Which AI tools does it work with?", "Any tool that takes a prompt, such as Claude, Lovable, v0, Codex, Cursor and Bolt. The prompts are plain language."],
  ["Do I need design skills?", "Nope. Each step tells you what to do, why it matters and what to check before you say yes to the AI's change."],
  ["How long does it take?", "About an hour per page. Start with color, type and spacing. That is where you will see the biggest jump."],
  ["Will it break my app?", "No. Every prompt keeps your content and features and only touches the design."],
];

function Buy({ label }) {
  if (!BUY_URL) return <span className="hero2-btn hero2-btn-primary eb-soon" aria-disabled="true">Available soon</span>;
  return <a className="hero2-btn hero2-btn-primary" href={BUY_URL} target="_blank" rel="noopener">{label}</a>;
}

export default function Ebook() {
  let n = 0;
  return (
    <div className="wrap page pg eb">
      <SectionColors />
      <Crumbs items={[{ name: "Book", href: "/ebook/" }]} />

      <header className="eb-hero" data-bg="#111112">
        <div className="eb-copy">
          <p className="eb-kick">Designed, not generated.</p>
          <h1><span className="eb-27">27 copy-paste prompts</span> to fix AI slop UI</h1>
          <p className="eb-sub">You built it fast. It works. Then you open it next to a real product and something feels off: the purple gradient, the three little cards, the glow. Visitors notice it before they read a word. These prompts fix that, one step at a time, without rebuilding anything.</p>
          <div className="btn-row">
            <Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} />
            <a className="hero2-btn hero2-btn-light" href="#inside">Peek inside</a>
          </div>
          <ul className="eb-ticks eb-ico">
            <li data-i="list">27 prompts, one per step</li>
            <li data-i="file">DESIGN.md rules file included</li>
            <li data-i="motion">Bonus: motion and UX principles prompts</li>
            <li data-i="hand">No design skills needed. Nothing gets rebuilt</li>
          </ul>
        </div>
        <div className="eb-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ebook/cover.webp?v=2" width="936" height="1326" alt="Cover of 27 Copy-Paste Prompts to Fix AI Slop UI" />
        </div>
      </header>

      <section className="eb-tools" aria-label="Tools the prompts work with">
        <p>Works with whatever you built it in</p>
        <div>
          {TOOLS.map((t) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={t} src={`/ebook/${t}.webp`} width="200" height="200" alt={t} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="eb-sec eb-feel">
        <h2>Sound <span className="t2">familiar?</span></h2>
        <ul className="eb-pains">
          <li>You shipped it, and now you hesitate before sharing the link.</li>
          <li>You asked the AI to make it look better. It added another gradient.</li>
          <li>It looks like every other AI-built site, and you cannot say why.</li>
        </ul>
        <div className="eb-story">
          <p>I have been there. I design products for a living, and I build my own with the same AI tools you use. They hand me the same purple, glowing first drafts they hand you.</p>
          <p>The difference is I know what to ask for next. So I wrote down the rules I use with clients, turned each one into a prompt, and explained why it works. That is this book.</p>
          <p className="eb-story-sign">Sam</p>
        </div>
      </section>

      <section className="eb-sec" id="inside">
        <h2>What's <span className="t2">inside</span></h2>
        <p className="eb-ph-lede">Four parts, in the order you use them. Start at step 1 and finish with a page that scores 10 out of 10.</p>
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

      <section className="eb-sec eb-why">
        <h2>Why this book is <span className="t2">different</span></h2>
        <p className="eb-why-lede">I started with prompt packs too. Paste, get a nicer page, move on. Then the next page looked just as AI-made, and I had no idea why. The fix was not a better prompt. It was knowing the rules behind it.</p>
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

      <section className="eb-sec">
        <h2>All 27 <span className="t2">steps</span></h2>
        <div className="eb-steps">
          {STEPS.map(([title, sub, items], gi) => {
            const bonus = gi === 3;
            return (
              <div key={title} className={`eb-grp eb-grp-${gi}${bonus ? " is-bonus" : ""}`}>
                <div className="eb-grp-h">
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
        <p className="eb-bn-tag">Included in the same $6.99 purchase</p>
        <h2>Bonus: <span className="t2">motion and UX principles</span></h2>
        <p className="eb-bn-lede">Once the page looks designed, make it feel designed. Two more copy-paste prompts add small, quick motion and check every control, and a short block saves the rules in DESIGN.md so every new screen follows them. Works for apps, marketing sites and landing pages.</p>
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
        <div className="eb-pages">
          {[1, 2, 3, 4].map((i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={`/ebook/page-${i}.webp?v=2`} width="936" height="1326" alt={`Sample page ${i} from the book`} loading="lazy" />
          ))}
        </div>
        <div className="eb-more">
          <p><b>4 of 59 pages shown</b><span>55 more pages inside: all 27 prompts, 100 UX laws, DESIGN.md and the bonus motion and UX prompts.</span></p>
          <Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} />
        </div>
      </section>

      <section className="eb-sec">
        <h2>Is this <span className="t2">for you?</span></h2>
        <p className="eb-people"><PeopleStack /><span>For founders, developers and designers who build with AI.</span></p>
        <div className="eb-for">
          {FOR.map((f) => (
            <article key={f.t}><h3>{f.t}</h3><p>{f.d}</p></article>
          ))}
        </div>
      </section>

      <section className="eb-sec eb-offer" data-bg="#000000">
        <div>
          <h2>What <span className="t2">you get</span></h2>
          <ul className="eb-ticks eb-ico">{GET.map(([i, g, tag]) => <li key={g} data-i={i}><span>{g}{tag ? <em className="eb-tag">{tag}</em> : null}</span></li>)}</ul>
        </div>
        <aside>
          <div className="eb-bundle" aria-label="The full bundle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ebook/cover.webp?v=2" width="936" height="1326" alt="The book cover" loading="lazy" />
            <ul>
              <li className="eb-f-pdf"><b>PDF</b>59 pages</li>
              {FILES.map((f) => <li key={f}><b>MD</b>{f}</li>)}
              <li className="eb-f-bn"><b>+</b>2 bonus prompts</li>
            </ul>
          </div>
          <p className="eb-price">{PRICE}<span>one-time</span></p>
          <Buy label="Get your copy" />
          <p className="eb-note">One PDF and four text files. Yours to keep.</p>
        </aside>
      </section>

      <section className="hp eb-hp" aria-labelledby="eb-author-h" data-bg="#111112">
        <div className="hp-left">
          <h2 id="eb-author-h">About <span className="t2">the author</span><br /><em>Sam Vllaco, product designer.</em></h2>
          <p className="hp-lede">I design SaaS products, dashboards and mobile apps, and I build my own products with the same AI tools you use. This book is the set of rules and prompts I use on them.</p>
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
          <img className="hp-photo" src="/sam-footer.webp" width="1254" height="1254" alt="" loading="lazy" />
          <div className="hp-shade" aria-hidden="true" />
          <div className="hp-body">
            <h3>10 years of product design,<br /><em>now in 59 pages you can copy and paste.</em></h3>
            <p>Every prompt keeps your content and features and changes only the design.</p>
            <div className="hp-cta"><Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} /></div>
          </div>
        </div>
      </section>

      <section className="eb-sec">
        <h2>Questions <span className="t2">before you buy</span></h2>
        <dl className="eb-faq">
          {FAQ.map(([q, a]) => (<div key={q}><dt>{q}</dt><dd>{a}</dd></div>))}
        </dl>
      </section>

      <section className="eb-sec eb-end">
        <h2>You did the hard part. <span className="t2">Now make it look the part.</span></h2>
        <p className="eb-end-sub">Your product already works. Give it the hour it deserves and send the link with confidence.</p>
        <div className="btn-row"><Buy label={<>Buy now for <span className="eb-pill">{PRICE}</span></>} /></div>
      </section>
    </div>
  );
}

import PageHead from "../../components/PageHead";
import CallIcon from "../../components/CallIcon";
import JsonLd from "../../components/JsonLd";
import Faq from "../../components/Faq";
import { SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";
import { SLOP_REPORT_PRICE, usd } from "../../lib/plans";
import { CATS } from "../../slopscore/config";

// Landing page for the search "AI slop checker" (28 Nov 2026): the keyword sits in the title, the address, the H1 and the
// first sentence, then one action. The tool itself stays alone on /slop-score/ (owner: "only this, nothing else").
const TITLE = "AI Slop Checker for Websites: Free Score in a Minute";
const DESC = "Free AI slop checker for websites. Paste a URL and get a 0 to 100 score for how AI-generated the site looks, seven check scores and the top three fixes.";
export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/ai-slop-checker/" },
  ...share({ title: `${TITLE} | Sam Vllaco`, description: DESC, url: "/ai-slop-checker/" }),
};

const CHECK = "M5 12.5l4.5 4.5L19 7.5";
const STEPS = [
  { t: "Paste your URL", d: "Any live page works: a landing page, an app's home screen, a portfolio. No sign-up." },
  { t: "The checker opens your site", d: "It loads the page like a visitor on desktop and phone, measures spacing, type, color, buttons, copy and accessibility, then a design review scores how original it looks." },
  { t: "Read your score and fixes", d: "In under a minute you get a score from 0 to 100, where lower is better, a score for each of the seven checks and the three fixes that will move it most." },
];
const OFFERS = [
  { k: "Free check", price: "Free", per: "", lead: "See where your site stands.", items: ["Slop Score from 0 to 100", "A score for each of the seven checks", "Why your weakest check scored the way it did", "The top three fixes"], btn: "Check my site for free", hot: true },
  { k: "Full report", price: usd(SLOP_REPORT_PRICE), per: " one-time", lead: "Everything the checker found, ready to fix.", items: ["The reason behind every check score", "Every fix, not only the top three", "Copy-paste prompts for Lovable, Cursor and Claude Code for each fix", "The report sent to your email"], btn: "Run the free check first" },
];
const FAQ = [
  { q: "What is an AI slop checker?", a: "A tool that looks at a live website and tells you how much it looks like untouched AI output: ==gradients, glow, uneven spacing, vague copy==, cards inside cards. Mine gives a score from 0 to 100 and the fixes." },
  { q: "Is the AI slop checker free?", a: `**Yes.** The score, the seven check scores and the top three fixes are free, with no sign-up. The full report with every fix and copy-paste prompts is ${usd(SLOP_REPORT_PRICE)}.` },
  { q: "Does it check text and images, or the design?", a: "The design of a web page. It does not judge whether an essay or a picture was made by AI. It measures how the page is built and how it looks to a visitor." },
  { q: "What is a good Slop Score?", a: "Lower is better. Clearly hand-made brand sites land **under 15**. A competent custom design sits between 15 and 35, a template look between 35 and 60, and the typical AI-builder look above 60." },
  { q: "My site was built with Lovable, v0 or Cursor. Will it score badly?", a: "Not if you made the design decisions. The checker measures the result, not the tool. An AI-built site with one accent color, a spacing scale and real content scores well." },
  { q: "Can you fix what the checker finds?", a: "Yes. Fix it yourself with [27 copy-paste prompts](/fix-ai-slop-ui/), or [ask for a free audit](/free-audit/) and I'll look at your site myself." },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Slop Checker (Slop Score)",
    url: `${SITE.url}/ai-slop-checker/`,
    description: DESC,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: [{ "@type": "Offer", name: "Free check", price: 0, priceCurrency: "USD" }, { "@type": "Offer", name: "Full report", price: SLOP_REPORT_PRICE, priceCurrency: "USD" }],
    creator: { "@id": PERSON_ID },
  };
  return (
    <div className="wrap page pg ax-page">
      <JsonLd data={schema} />
      <PageHead crumb="AI slop checker" href="/ai-slop-checker/" a="AI slop checker" b="for websites." lede="This AI slop checker scores how AI-generated your website looks, from 0 to 100, and gives you the three fixes that matter most. Free, no sign-up, about a minute.">
        <div className="btn-row">
          <a className="hero2-btn hero2-btn-primary" href="/slop-score/">Check my site for free</a>
          <a className="hero2-btn hero2-btn-light" href="/writing/does-my-website-look-ai-generated/">See the 10 signs</a>
        </div>
      </PageHead>

      <section className="sv-sec" aria-labelledby="ac-check-h">
        <h2 id="ac-check-h">The seven things <span className="t2">it checks</span></h2>
        <ul className="ax-checks">
          {CATS.map((c) => (
            <li key={c.k}><i className="tg-ico sv-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={CHECK} /></svg></i><b>{c.name}</b><span>{c.d}</span></li>
          ))}
        </ul>
      </section>

      <section className="sub-sec lite" aria-labelledby="ac-how-h">
        <header className="sub-head">
          <h2 id="ac-how-h">How it <span className="t2">works</span></h2>
        </header>
        <ol className="sub-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}><i aria-hidden="true">{i + 1}</i><h3>{s.t}</h3><p>{s.d}</p></li>
          ))}
        </ol>
      </section>

      <section className="sv-sec ax-get" aria-labelledby="ac-get-h">
        <h2 id="ac-get-h">What <span className="t2">you get</span></h2>
        <ul className="pr-plans pr-two">
          {OFFERS.map((p) => (
            <li key={p.k} className={`pr-plan${p.hot ? " is-hot" : ""}`}>
              <p className="pr-k">{p.k}</p>
              <p className="pr-price">{p.price}<span>{p.per}</span></p>
              <p className="pr-lead">{p.lead}</p>
              <ul className="pr-items">{p.items.map((t) => <li key={t}>{t}</li>)}</ul>
              <a className={`hero2-btn ${p.hot ? "hero2-btn-primary" : "hero2-btn-light"}`} href="/slop-score/">{p.btn}</a>
            </li>
          ))}
        </ul>
        <p className="sub-note">I built it from the rules in my book and the fixes I make on AI-built apps for clients. I&apos;ve designed more than 10,000 screens since 2013.</p>
      </section>

      <div className="sv-sec sv-faqwrap">
        <Faq items={FAQ} a="Questions" b="about the checker" bg="#0e0e10">
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/slop-score/">Check my site for free</a></p>
        </Faq>
      </div>

      <section className="sv-sec sv-end" aria-labelledby="ac-end-h">
        <h2 id="ac-end-h">Want it fixed, <span className="t2">not just scored?</span></h2>
        <p>Send me your site. I look at it myself and reply with a Loom of what I would change first.</p>
        <p className="ax-also">Or fix it yourself: read <a href="/writing/ai-slop-statistics/">AI slop statistics from 100 new launches</a>, <a href="/writing/ai-slop-ui-fixes/">the 25 AI slop UI fixes</a> and <a href="/writing/how-to-fix-ai-built-app-design/">how to fix the design of an AI-built app</a>, then save your rules with the free <a href="/tools/design-md-generator/">DESIGN.md generator</a> or the <a href="/writing/anti-ai-slop-ui-skill/">anti AI slop UI skill</a>.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/free-audit/">Get a free UX audit<CallIcon /></a></div>
      </section>
    </div>
  );
}

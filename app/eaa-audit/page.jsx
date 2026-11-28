import CopyEmailInline from "../../components/HirePanelCopy";
import PageHead from "../../components/PageHead";
import CallIcon from "../../components/CallIcon";
import JsonLd from "../../components/JsonLd";
import Faq from "../../components/Faq";
import SkyPhoto from "../../components/SkyPhoto";
import { SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";
import { TRIAL_WEEK, EAA_AUDIT_PRICE, usd } from "../../lib/plans";
import { SRC, CHECKS, EAA_FAQ } from "../../lib/accessibility";

const TITLE = "EAA Audit: WCAG 2.2 Accessibility Audit for Europe";
const DESC = "An EAA audit for teams selling in Europe: a WCAG 2.2 AA accessibility audit of your site or app in 5 days, then design and code fixes in weekly sprints.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/eaa-audit/" },
  ...share({ title: `${TITLE} | Sam Vllaco`, description: DESC, url: "/eaa-audit/" }),
};

const OFFERS = [
  {
    k: "EAA Audit", price: usd(EAA_AUDIT_PRICE), per: "5 working days", lead: "Know exactly where you stand.",
    items: ["Up to 10 key pages or templates: home, product, sign-up, checkout, account and so on", "Keyboard-only testing and screen reader testing with VoiceOver and NVDA", "An automated axe scan, checked by hand so your team doesn't chase false alarms", "Contrast, focus, touch targets, forms, error messages, images and motion", "A ranked fix list mapped to WCAG 2.2 AA and EN 301 549", "A draft accessibility statement you can publish", "A 30-minute walkthrough call"],
  },
  {
    k: "Fix Sprint", price: `From ${usd(TRIAL_WEEK)}`, per: "one fixed price", hot: true, lead: "The fixes, designed and shipped.",
    items: ["I design every fix in Figma, from color tokens to focus states", "I can code front-end fixes myself, or hand your team dev-ready tickets with the WCAG reference and clear acceptance criteria", "I update your design system so new screens ship accessible", "I re-test after it ships and update your report"],
  },
];

const STEPS = [
  { t: "Book a call", d: "You show me the product. I tell you what I'd check first." },
  { t: "Audit", d: "Five working days later you get the report and a walkthrough." },
  { t: "Fix", d: "I scope the fixes from the report and give you one fixed price. Then I re-test everything." },
];

const WHY_NOW = [
  { n: "28 June 2025", d: "The EAA has been enforceable since this date. It also covers companies outside the EU that sell to people in the EU.", src: SRC.eaaDate },
  { n: "25%", d: "EU sites average 25% more accessibility issues per page than US sites, across 166,000+ pages scanned.", src: SRC.audioeye },
  { n: "90 million", d: "People in the EU live with a disability. They're your customers too.", src: SRC.disability },
];

const INDUSTRIES = ["Fintech", "Healthcare", "SaaS", "Cybersecurity", "eCommerce", "LegalTech"];

export default function EaaAudit() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "EAA audit and fix sprint",
    serviceType: "Accessibility audit",
    description: DESC,
    provider: { "@id": PERSON_ID },
    areaServed: ["European Union", "Worldwide"],
    url: `${SITE.url}/eaa-audit/`,
    offers: [
      { "@type": "Offer", name: "EAA Audit", price: EAA_AUDIT_PRICE, priceCurrency: "USD" },
      { "@type": "Offer", name: "Fix Sprint", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: TRIAL_WEEK, priceCurrency: "USD" } },
    ],
  };

  return (
    <div className="wrap page pg ax-page">
      <JsonLd data={schema} />
      <PageHead crumb="EAA audit" href="/eaa-audit/" a="Find where your product fails the EAA." b="Fix it in a week." lede="I check your site or app against WCAG 2.2 AA, show you exactly what blocks people, and design the fixes with your team. A plain report, real fixes, no overlay widgets.">
        <div className="btn-row">
          <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
          <a className="hero2-btn hero2-btn-light" href="/slop-score/">Check my site for free</a>
        </div>
        <p className="ax-small">Not legal advice. I work alongside your legal team.</p>
      </PageHead>

      <section className="sub-sec lite ax-now" aria-labelledby="ax-now-h">
        <header className="sub-head">
          <h2 id="ax-now-h">Why <span className="t2">now</span></h2>
        </header>
        <ul className="ax-stats">
          {WHY_NOW.map((s) => (
            <li key={s.n}>
              <b>{s.n}</b>
              <p>{s.d}</p>
              <a href={s.src.href} target="_blank" rel="noopener">Source: {s.src.label}<span className="sr-only"> (opens in a new tab)</span></a>
            </li>
          ))}
        </ul>
        <p className="sub-note">Enforcement has started in France, Germany, Italy and Norway. Better to fix it on your timeline than on theirs.</p>
      </section>

      <section className="sv-sec ax-get" aria-labelledby="ax-get-h">
        <h2 id="ax-get-h">What <span className="t2">you get</span></h2>
        <ul className="pr-plans pr-two">
          {OFFERS.map((p) => (
            <li key={p.k} className={`pr-plan${p.hot ? " is-hot" : ""}`}>
              <p className="pr-k">{p.k}</p>
              <p className="pr-price">{p.price}<span>{p.per}</span></p>
              <p className="pr-lead">{p.lead}</p>
              <ul className="pr-items">{p.items.map((t) => <li key={t}>{t}</li>)}</ul>
              <a className={`hero2-btn ${p.hot ? "hero2-btn-primary" : "hero2-btn-light"}`} href="/book/">Start a project<span className="sr-only"> about the {p.k.toLowerCase()}</span><CallIcon /></a>
            </li>
          ))}
        </ul>
        <p className="sub-note">The audit tells you what the Fix Sprint will cost.</p>
        <p className="ax-banner">Running several products or shipping every week? <a href="/accessibility/">See managed accessibility</a></p>
      </section>

      <section className="sub-sec lite" id="how-it-works" aria-labelledby="ax-how-h">
        <header className="sub-head">
          <h2 id="ax-how-h">How it <span className="t2">works</span></h2>
        </header>
        <ol className="sub-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}><i aria-hidden="true">{i + 1}</i><h3>{s.t}</h3><p>{s.d}</p></li>
          ))}
        </ol>
      </section>

      <section className="sv-sec" aria-labelledby="ax-check-h">
        <h2 id="ax-check-h">What <span className="t2">I check</span></h2>
        <ul className="ax-checks">
          {CHECKS.map((c) => (
            <li key={c.t}><i className="tg-ico sv-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={c.i} /></svg></i><b>{c.t}</b><span>{c.d}</span></li>
          ))}
        </ul>
      </section>

      <section className="sub-sec lite ax-why" aria-labelledby="ax-why-h">
        <header className="sub-head">
          <h2 id="ax-why-h">Why <span className="t2">me</span></h2>
          <p>I've designed products for 10 years, for 573 clients across fintech, healthcare, SaaS, cybersecurity and eCommerce, in Europe, the US, Canada, Australia and the UAE. Accessibility isn't a plugin you add at the end. It's design: color, type, spacing, states and flows. That's the work I do every day.</p>
        </header>
        <div className="sub-req"><ul aria-label="Industries I design for">{INDUSTRIES.map((t) => <li key={t}>{t}</li>)}</ul></div>
      </section>

      <div className="sv-sec sv-faqwrap">
        <Faq items={EAA_FAQ} a="Questions" b="about the EAA" bg="#0e0e10">
          <SkyPhoto className="faq-photo" />
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></p>
          <div className="faq-mail"><CopyEmailInline icon /></div>
        </Faq>
      </div>

      <section className="sv-sec sv-end" aria-labelledby="ax-end-h">
        <h2 id="ax-end-h">Know where you stand <span className="t2">in a week.</span></h2>
        <p>Book a short call. If an audit isn't what you need, I'll tell you.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></div>
      </section>
    </div>
  );
}

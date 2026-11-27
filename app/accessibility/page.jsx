import CopyEmailInline from "../../components/HirePanelCopy";
import PageHead from "../../components/PageHead";
import CallIcon from "../../components/CallIcon";
import JsonLd from "../../components/JsonLd";
import Faq from "../../components/Faq";
import SkyPhoto from "../../components/SkyPhoto";
import { SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";
import { MANAGED_FROM, usd } from "../../lib/plans";
import { MANAGED_FAQ } from "../../lib/accessibility";

const TITLE = "Managed Accessibility and EAA Compliance";
const DESC = "Monthly accessibility audits, fixes and monitoring for product teams that ship often. WCAG 2.2 AA and European Accessibility Act, with reports legal can use.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/accessibility/" },
  ...share({ title: `${TITLE} | Sam Vllaco`, description: DESC, url: "/accessibility/" }),
};

const INCLUDED = [
  { t: "Release checks", d: "I review new designs before they ship and flag problems while they're still cheap to fix.", i: "M9 4h6v3H9zM15 6h3v15H6V6h3M9 14l2 2 4-4" },
  { t: "Weekly monitoring", d: "Automated scans of your key pages and flows, checked by hand so your team only sees real issues.", i: "M3 12h4l3-7 4 14 3-7h4" },
  { t: "Hands-on testing", d: "Keyboard and screen reader passes on your core journeys every quarter, with VoiceOver and NVDA.", i: "M3 7h18v10H3zM7 11h.01M11 11h.01M15 11h.01M7 14h10" },
  { t: "Fixes, designed", d: "I design every fix in Figma and in your design system tokens, then code it myself or hand your engineers dev-ready tickets.", i: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" },
  { t: "Paperwork kept current", d: "Your accessibility statement and EAA documentation, updated as the product changes.", i: "M6 3h9l4 4v14H6zM9 11h7M9 15h7" },
  { t: "One-page monthly report", d: "What changed, what's open and what's next, written for product and legal.", i: "M4 20V10M10 20V4M16 20v-7M3 20h18" },
];

const STEPS = [
  { t: "Baseline audit", d: "In the first two weeks I audit your core flows against WCAG 2.2 AA." },
  { t: "Fix plan", d: "Issues ranked by risk and by how many people they block, agreed with product and legal." },
  { t: "Monthly rhythm", d: "Release checks, monitoring, fixes and a report, every month." },
];

const FOR = [
  { t: "Teams that ship often", d: "Weekly or biweekly releases across web and mobile.", i: "M13 2 4 14h7l-1 8 9-12h-7z" },
  { t: "Companies selling in the EU", d: "Banking and fintech, eCommerce, SaaS, healthcare, travel and telecom.", i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" },
  { t: "Teams with a design system", d: "Fixes go into the system once and show up everywhere.", i: "M12 3 3 8l9 5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" },
];

const FACTS = ["NDA as standard", "Fixed monthly invoice", "Async updates", "Working hours that overlap with Europe and the US East Coast"];

const Card = ({ c }) => <li><i className="tg-ico sv-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={c.i} /></svg></i><b>{c.t}</b><span>{c.d}</span></li>;

export default function Accessibility() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Managed accessibility",
    serviceType: "Accessibility compliance service",
    description: DESC,
    provider: { "@id": PERSON_ID },
    areaServed: ["European Union", "Worldwide"],
    url: `${SITE.url}/accessibility/`,
    offers: { "@type": "Offer", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", minPrice: MANAGED_FROM, priceCurrency: "USD", unitText: "month" } },
  };

  return (
    <div className="wrap page pg ax-page">
      <JsonLd data={schema} />
      <PageHead crumb="Managed accessibility" href="/accessibility/" a="Accessibility that keeps up" b="with your releases." lede="You ship every week. New screens, new flows, new ways to break things. Every month I audit, fix and monitor your product against WCAG 2.2 AA and the European Accessibility Act, so it stays usable for everyone and your legal team has the paperwork.">
        <div className="btn-row">
          <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
          <a className="hero2-btn hero2-btn-light" href="/eaa-audit/">Start with a one-week audit</a>
        </div>
      </PageHead>

      <section className="sub-sec lite" aria-labelledby="ax-prob-h">
        <header className="sub-head">
          <h2 id="ax-prob-h">One-off audits <span className="t2">go stale.</span></h2>
          <p>You fix everything in March. By June, new features have shipped and the old problems are back in new places. Accessibility breaks the same way products get built: one release at a time. So it has to be checked the same way.</p>
        </header>
      </section>

      <section className="sv-sec" aria-labelledby="ax-inc-h">
        <h2 id="ax-inc-h">What's included <span className="t2">every month</span></h2>
        <ul className="ax-checks ax-three">{INCLUDED.map((c) => <Card key={c.t} c={c} />)}</ul>
      </section>

      <section className="sub-sec lite" aria-labelledby="ax-how-h">
        <header className="sub-head">
          <h2 id="ax-how-h">How it <span className="t2">works</span></h2>
        </header>
        <ol className="sub-steps">
          {STEPS.map((s, i) => <li key={s.t}><i aria-hidden="true">{i + 1}</i><h3>{s.t}</h3><p>{s.d}</p></li>)}
        </ol>
      </section>

      <section className="sv-sec" aria-labelledby="ax-for-h">
        <h2 id="ax-for-h">Who it's <span className="t2">for</span></h2>
        <ul className="ax-checks ax-three">{FOR.map((c) => <Card key={c.t} c={c} />)}</ul>
      </section>

      <section className="sub-sec lite ax-pricing" aria-labelledby="ax-price-h">
        <header className="sub-head">
          <h2 id="ax-price-h">One fixed <span className="t2">monthly price.</span></h2>
        </header>
        <p className="ax-price"><span>From</span> <b>{usd(MANAGED_FROM)}</b> <span>per month</span></p>
        <p className="sub-note">The final price depends on how many products and platforms you have and how often you ship. I set it with you upfront, before any work starts.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></div>
        <p className="sub-note">Not ready for monthly? <a href="/eaa-audit/">Start with the one-week EAA audit.</a></p>
      </section>

      <section className="sv-sec ax-me" aria-labelledby="ax-me-h">
        <h2 id="ax-me-h">Why <span className="t2">me</span></h2>
        <p className="ax-me-p">I've designed products for 10 years, for 573 clients in fintech, healthcare, SaaS, cybersecurity, LegalTech and eCommerce, in Europe, the US, Canada, Australia and the UAE. I also design compliance software, so I know what your legal and risk people need to see. Accessibility lives in the design: color, type, spacing, states and flows. That's where I fix it.</p>
        <div className="sub-req ax-facts"><ul aria-label="Working with me">{FACTS.map((t) => <li key={t}>{t}</li>)}</ul></div>
      </section>

      <div className="sv-sec sv-faqwrap">
        <Faq items={MANAGED_FAQ} a="Questions" b="from product and legal" bg="#171719">
          <SkyPhoto className="faq-photo" />
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></p>
          <div className="faq-mail"><CopyEmailInline icon /></div>
        </Faq>
      </div>

      <section className="sv-sec sv-end" aria-labelledby="ax-end-h">
        <h2 id="ax-end-h">Make accessibility <span className="t2">one less thing to worry about.</span></h2>
        <p>Book a short call. Tell me how you ship and I'll show you how I'd fit in.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></div>
      </section>
    </div>
  );
}

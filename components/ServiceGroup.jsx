import Link from "next/link";
import Crumbs from "./Crumbs";
import CallIcon from "./CallIcon";
import JsonLd from "./JsonLd";
import Faq from "./Faq";
import SkyPhoto from "./SkyPhoto";
import { SERVICES, GROUP_PAGES, svcHref } from "../lib/services";
import { DETAILS, PROCESS } from "../lib/service-details";
import { PAGES, GET_ICONS, PAIN_ICONS, SVC_FAQ } from "../lib/service-pages";
import { WORK } from "../lib/work";
import { TESTIMONIALS } from "../lib/testimonials";
import { SITE, EMAIL } from "../lib/site";
import { PERSON_ID } from "../lib/seo";

// One page for a set of related services (branding, development, marketing, SEO).
// Each service keeps its own section and id, so old links land on the right part of the page.
const ALL = SERVICES.flatMap((g) => g.items);
const STEP_ICONS = ["M4 5h16v11H9l-5 4z", "M6 3h9l4 4v14H6zM9 11h7M9 15h7", "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z", "M12 3v12M7 10l5 5 5-5M5 21h14"];
const Ico = ({ d, cls = "tg-ico" }) => <i className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>;

export default function ServiceGroup({ id }) {
  const g = GROUP_PAGES[id];
  const members = g.members.map((m) => ALL.find((x) => x.id === m)).filter(Boolean);
  const work = g.work.map((slug) => WORK.find((w) => w.slug === slug)).filter(Boolean);
  const hero = work[0];
  const quote = TESTIMONIALS[Object.keys(GROUP_PAGES).indexOf(id) % TESTIMONIALS.length];
  const lower = g.name === "SEO" ? "SEO" : g.name.toLowerCase();
  const others = [
    ...["saas-product-design", "dashboard-design", "ux-audit", "website-design"].map((x) => ALL.find((s) => s.id === x)).filter(Boolean).map((s) => ({ href: svcHref(s.id), name: s.name })),
    ...Object.entries(GROUP_PAGES).filter(([k]) => k !== id).map(([k, v]) => ({ href: `/services/${k}/`, name: v.name })),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": members.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: `${s.text} ${(DETAILS[s.id] || {}).for || ""}`.trim(),
      serviceType: s.name,
      category: g.name,
      provider: { "@id": PERSON_ID },
      areaServed: ["United States", "Europe", "Canada", "Australia", "United Arab Emirates"],
      url: `${SITE.url}/services/${id}/#${s.id}`,
    })),
  };

  return (
    <div className="wrap page svc sv sv-group">
      <Crumbs items={[{ name: "Services", href: "/services/" }, { name: g.name, href: `/services/${id}/` }]} />
      <JsonLd data={schema} />

      <header className="sv-hero">
        <div className="sv-hero-copy">
          <p className="case-eyebrow">Services</p>
          <h1>{g.name} <span className="t2">{g.tail}</span></h1>
          <p className="sv-lede">{g.lede}</p>
          <div className="sv-cta">
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a>
            <a className="hero2-btn hero2-btn-light" href={`#${members[0].id}`}>See what's included</a>
          </div>
          <ul className="sv-proof">
            <li><b>10+</b> years</li>
            <li><b>570+</b> clients</li>
            <li><b>10,000+</b> screens</li>
          </ul>
        </div>
        {hero ? (
          <Link prefetch={false} className="sv-hero-art" href={`/work/${hero.slug}/`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.small} width="800" height="600" alt={hero.alt || `${hero.title} screens designed by Sam Vllaco`} loading="eager" fetchPriority="high" />
            <span className="sv-art-tag"><b>{hero.title}</b><span>Case study</span></span>
          </Link>
        ) : null}
      </header>

      <nav className="sv-sec sv-more sv-jump" aria-label={`${g.name} services on this page`}>
        <p className="mx-k">On this page</p>
        <ul>{members.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.name}</a></li>)}</ul>
      </nav>

      {members.map((s) => {
        const d = DETAILS[s.id] || { for: "", get: [] };
        const p = PAGES[s.id] || { tail: "", pains: [] };
        return (
          <section className="sv-sec sv-part" id={s.id} key={s.id} aria-labelledby={`sv-${s.id}-h`}>
            <h2 id={`sv-${s.id}-h`}>{s.name} <span className="t2">{p.tail}</span></h2>
            <p className="sv-lede sv-part-lede">{s.text} {d.for ? `Made for ${d.for.charAt(0).toLowerCase()}${d.for.slice(1)}` : ""}</p>
            {p.pains.length ? (
              <>
                <h3 className="sv-part-k">Sound familiar?</h3>
                <ul className="sv-pains">
                  {p.pains.map((t, i) => <li key={t}><Ico d={PAIN_ICONS[i % PAIN_ICONS.length]} cls="tg-ico sv-ico" /><b>{t}</b></li>)}
                </ul>
              </>
            ) : null}
            {d.get.length ? (
              <>
                <h3 className="sv-part-k">What you get</h3>
                <ul className="sv-get">
                  {d.get.map((x, i) => <li key={x}><Ico d={GET_ICONS[i % GET_ICONS.length]} cls="tg-ico sv-ico" /><span className="sv-n">{String(i + 1).padStart(2, "0")}</span><b>{x}</b></li>)}
                </ul>
              </>
            ) : null}
            {s.id === "speed-accessibility" ? <p className="ax-also">Selling to customers in the EU? See the <a href="/eaa-audit/">EAA audit and fix sprint</a>, or <a href="/accessibility/">managed accessibility</a> for teams that ship every week.</p> : null}
          </section>
        );
      })}

      <section className="sv-sec" aria-labelledby="sv-how-h">
        <h2 id="sv-how-h">How it <span className="t2">works</span></h2>
        <ol className="sv-how">
          {PROCESS.map((st, i) => <li key={st.t}><Ico d={STEP_ICONS[i]} cls="tg-ico sv-ico" /><span className="sv-n">Step {i + 1}</span><b>{st.t}</b><p>{st.d}</p></li>)}
        </ol>
      </section>

      {work.length ? (
        <section className="sv-sec" id="sv-work" aria-labelledby="sv-work-h">
          <h2 id="sv-work-h">Work <span className="t2">like this</span></h2>
          <ul className="sv-work">
            {work.map((w) => (
              <li key={w.slug}>
                <Link prefetch={false} href={`/work/${w.slug}/`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.small} width="800" height="600" alt="" loading="lazy" />
                  <b>{w.title}</b><span>{w.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {quote ? (
        <section className="sv-sec sv-quote" aria-label="Client review">
          <p className="sv-stars" aria-label="Rated 5 out of 5">★★★★★</p>
          <blockquote>“{quote.quote}”</blockquote>
          <p className="sv-quote-by">{quote.project}, verified review</p>
        </section>
      ) : null}

      <div className="sv-sec sv-faqwrap">
        <Faq items={SVC_FAQ} a="Questions" b="before we start" bg="#111112">
          <SkyPhoto className="faq-photo" />
          <h3>Still have a question? <em className="scr">Good, ask me.</em></h3>
          <p>Bring it to a 30-minute call. It's just you and me, and you can ask anything about your {lower} project.</p>
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Ask me on a call</a></p>
          <p className="faq-mail">Rather write? Email me at <b>{EMAIL}</b></p>
        </Faq>
      </div>

      <section className="sv-sec sv-end" aria-labelledby="sv-end-h">
        <h2 id="sv-end-h">Tell me about your <span className="t2">{lower} project</span></h2>
        <p>30 minutes, just you and me. You leave with a scope, a timeline and a fixed price.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a></div>
      </section>

      <nav className="sv-sec sv-more" aria-label="More services">
        <p className="mx-k">More services</p>
        <ul>{others.map((r) => <li key={r.href}><Link prefetch={false} href={r.href}>{r.name}</Link></li>)}</ul>
      </nav>
    </div>
  );
}

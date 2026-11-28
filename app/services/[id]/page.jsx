import CopyEmailInline from "../../../components/HirePanelCopy";
import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import CallIcon from "../../../components/CallIcon";
import JsonLd from "../../../components/JsonLd";
import Faq from "../../../components/Faq";
import SkyPhoto from "../../../components/SkyPhoto";
import { SERVICES, GROUP_PAGES, groupOf, svcHref } from "../../../lib/services";
import ServiceGroup from "../../../components/ServiceGroup";
import { DETAILS, PROCESS } from "../../../lib/service-details";
import { PAGES, GET_ICONS, PAIN_ICONS, SVC_FAQ, SEO } from "../../../lib/service-pages";
import { WORK } from "../../../lib/work";
import { TESTIMONIALS } from "../../../lib/testimonials";
import { SITE } from "../../../lib/site";
import { POSTS } from "../../../lib/articles";
import { GUIDES } from "../../../lib/service-guides";
import { share, PERSON_ID } from "../../../lib/seo";
import { INDUSTRIES } from "../../../lib/industries";
import { TRIAL_WEEK, PROJECT_FROM, usd } from "../../../lib/plans";

const ALL = SERVICES.flatMap((g) => g.items.map((it) => ({ ...it, group: g }))).filter((it) => !groupOf(it.id));
const STEP_ICONS = ["M4 5h16v11H9l-5 4z", "M6 3h9l4 4v14H6zM9 11h7M9 15h7", "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z", "M12 3v12M7 10l5 5 5-5M5 21h14"];

export function generateStaticParams() {
  return [...ALL.map((s) => ({ id: s.id })), ...Object.keys(GROUP_PAGES).map((id) => ({ id }))];
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const grp = GROUP_PAGES[id];
  if (grp) {
    const description = grp.description;
    return {
      title: grp.title,
      description,
      alternates: { canonical: `/services/${id}/` },
      ...share({ title: `${grp.name} ${grp.tail} | Sam Vllaco`, description, url: `/services/${id}/` }),
    };
  }
  const s = ALL.find((x) => x.id === id);
  if (!s) return {};
  const p = PAGES[id];
  const title = `${s.name} ${p ? p.tail : "for SaaS and AI teams"}`;
  const seo = SEO[id];
  const description = seo ? seo.desc : `${s.text} By Sam Vllaco, product designer for SaaS and AI products. Fixed price after a 30-minute call.`;
  return {
    title: seo ? seo.title : `${s.name} for SaaS and AI teams`,
    description,
    alternates: { canonical: `/services/${id}/` },
    ...share({ title: `${title} | Sam Vllaco`, description, url: `/services/${id}/` }),
  };
}

const Ico = ({ d, cls = "tg-ico" }) => <i className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>;

export default async function ServicePage({ params }) {
  const { id } = await params;
  if (GROUP_PAGES[id]) return <ServiceGroup id={id} />;
  const s = ALL.find((x) => x.id === id);
  if (!s) notFound();
  const d = DETAILS[id] || { for: "", get: [] };
  const p = PAGES[id] || { tail: "for SaaS and AI teams", pains: [], work: [] };
  const work = p.work.map((slug) => WORK.find((w) => w.slug === slug)).filter(Boolean);
  const hero = work[0];
  const idx = ALL.findIndex((x) => x.id === id);
  const quote = TESTIMONIALS[idx % TESTIMONIALS.length];
  const related = [...ALL.filter((x) => x.id !== id).map((x) => ({ id: x.id, name: x.name, href: svcHref(x.id) })), ...Object.entries(GROUP_PAGES).map(([k, v]) => ({ id: k, name: v.name, href: `/services/${k}/` }))];
  const guides = (GUIDES[id] || []).filter((slug) => POSTS[slug]).map((slug) => ({ slug, name: POSTS[slug].metaTitle || POSTS[slug].title }));
  const first = s.name.split(" ")[0];
  const lower = /[A-Z].*[A-Z]/.test(first) ? s.name : s.name.charAt(0).toLowerCase() + s.name.slice(1);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: s.name, description: `${s.text} ${d.for}`.trim(), serviceType: s.name, ...(SEO[id] ? { alternateName: SEO[id].alt } : {}), category: s.group.title, provider: { "@id": PERSON_ID }, areaServed: ["United States", "Europe", "Canada", "Australia", "United Arab Emirates"], url: `${SITE.url}/services/${id}/` },
    ],
  };

  return (
    <div className="wrap page svc sv">
      <Crumbs items={[{ name: "Services", href: "/services/" }, { name: s.name, href: `/services/${id}/` }]} />
      <JsonLd data={schema} />

      <header className="sv-hero">
        <div className="sv-hero-copy">
          <p className="case-eyebrow">{s.group.title}</p>
          <h1>{s.name} <span className="t2">{p.tail}</span></h1>
          <p className="sv-lede">{d.for ? `Made for ${d.for.charAt(0).toLowerCase()}${d.for.slice(1)}` : s.text}</p>
          <div className="sv-cta">
            <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
            <a className="hero2-btn hero2-btn-light" href="#sv-work">See the work</a>
          </div>
          <ul className="sv-proof">
            <li><b>10</b> years</li>
            <li><b>573</b> clients</li>
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

      {p.pains.length ? (
        <section className="sv-sec" aria-labelledby="sv-pain-h">
          <h2 id="sv-pain-h">Sound <span className="t2">familiar?</span></h2>
          <ul className="sv-pains">
            {p.pains.map((t, i) => <li key={t}><Ico d={PAIN_ICONS[i % PAIN_ICONS.length]} cls="tg-ico sv-ico" /><b>{t}</b></li>)}
          </ul>
          <p className="sv-story">That's normal. It usually isn't the product, it's how it's shown. <em className="scr">That part I can fix.</em></p>
        </section>
      ) : null}

      {d.get.length ? (
        <section className="sv-sec" aria-labelledby="sv-get-h">
          <h2 id="sv-get-h">What <span className="t2">you get</span></h2>
          <ul className="sv-get">
            {d.get.map((g, i) => <li key={g}><Ico d={GET_ICONS[i % GET_ICONS.length]} cls="tg-ico sv-ico" /><span className="sv-n">{String(i + 1).padStart(2, "0")}</span><b>{g}</b></li>)}
          </ul>
        </section>
      ) : null}

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

      {/* Ways to start, so each service page works on its own as a landing page (owner, 27 Nov 2026, after
          grafit.agency/solutions/ads): the two real offers from lib/plans.js, then the free audit for people not ready to talk. */}
      <section className="sv-sec ax-get" id="sv-start" aria-labelledby="sv-start-h">
        <h2 id="sv-start-h">Ways <span className="t2">to start</span></h2>
        <ul className="pr-plans pr-two">
          {[
            { k: "Trial week", price: usd(TRIAL_WEEK), per: "one week", lead: "One week on a real problem in your product.", cta: "Start a trial week", items: ["You see how I think, how fast I move and what the files look like", "Figma files your team can build from", "You keep everything I made that week", "If it fits, the full project starts from there"] },
            { k: "Full project", price: `From ${usd(PROJECT_FROM)}`, per: "one fixed price", hot: true, lead: "Scoped with you on a 30-minute call.", cta: "Start a project", items: ["A scope, a timeline and a fixed price before any work starts", "Every screen and state the project needs", "Figma files and a build-ready handoff", "I work with your developer or AI builder"] },
          ].map((o) => (
            <li key={o.k} className={`pr-plan${o.hot ? " is-hot" : ""}`}>
              <p className="pr-k">{o.k}</p>
              <p className="pr-price">{o.price}<span>{o.per}</span></p>
              <p className="pr-lead">{o.lead}</p>
              <ul className="pr-items">{o.items.map((t) => <li key={t}>{t}</li>)}</ul>
              <a className={`hero2-btn ${o.hot ? "hero2-btn-primary" : "hero2-btn-light"}`} href="/book/">{o.cta}<CallIcon /></a>
            </li>
          ))}
        </ul>
        <p className="ax-banner">Not ready to talk yet? <Link prefetch={false} href="/free-audit/">Get a free UX audit</Link></p>
        {INDUSTRIES.some((x) => x.help.includes(id)) ? (
          <p className="ax-also sv-for">Who I do this for: {INDUSTRIES.filter((x) => x.help.includes(id)).map((x, i) => <span key={x.id}>{i ? ", " : ""}<Link prefetch={false} href={`/for/${x.id}/`}>{x.name}</Link></span>)}</p>
        ) : null}
      </section>

      {quote ? (
        <section className="sv-sec sv-quote" aria-label="Client review">
          <p className="sv-stars" aria-label="Rated 5 out of 5">★★★★★</p>
          <blockquote>“{quote.quote}”</blockquote>
          <p className="sv-quote-by">{quote.project}, verified review</p>
        </section>
      ) : null}

      <div className="sv-sec sv-faqwrap">
        <Faq items={[...((SEO[id] || {}).faq || []), ...SVC_FAQ]} a="Questions" b="before you book" bg="#0e0e10">
          <SkyPhoto className="faq-photo" />
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></p>
          <div className="faq-mail"><CopyEmailInline icon /></div>
        </Faq>
      </div>

      <section className="sv-sec sv-end" aria-labelledby="sv-end-h">
        <h2 id="sv-end-h">Tell me about your <span className="t2">{lower} project</span></h2>
        <p>30 minutes, just you and me. You leave with a scope, a timeline and a fixed price.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></div>
      </section>

      {guides.length ? (
        <nav className="sv-sec sv-more" aria-label="Guides">
          <p className="mx-k">Guides</p>
          <ul>{guides.map((g) => <li key={g.slug}><Link prefetch={false} href={`/writing/${g.slug}/`}>{g.name}</Link></li>)}</ul>
        </nav>
      ) : null}

      {related.length ? (
        <nav className="sv-sec sv-more" aria-label="More services">
          <p className="mx-k">More services</p>
          <ul>{related.map((r) => <li key={r.id}><Link prefetch={false} href={r.href}>{r.name}</Link></li>)}</ul>
        </nav>
      ) : null}
    </div>
  );
}

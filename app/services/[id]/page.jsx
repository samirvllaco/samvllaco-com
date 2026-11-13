import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import CallIcon from "../../../components/CallIcon";
import JsonLd from "../../../components/JsonLd";
import Faq from "../../../components/Faq";
import SkyPhoto from "../../../components/SkyPhoto";
import { SERVICES } from "../../../lib/services";
import { DETAILS, PROCESS } from "../../../lib/service-details";
import { PAGES, GET_ICONS, PAIN_ICONS, SVC_FAQ } from "../../../lib/service-pages";
import { WORK } from "../../../lib/work";
import { TESTIMONIALS } from "../../../lib/testimonials";
import { SITE, EMAIL } from "../../../lib/site";
import { share, PERSON_ID } from "../../../lib/seo";

const ALL = SERVICES.flatMap((g) => g.items.map((it) => ({ ...it, group: g })));
const STEP_ICONS = ["M4 5h16v11H9l-5 4z", "M6 3h9l4 4v14H6zM9 11h7M9 15h7", "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z", "M12 3v12M7 10l5 5 5-5M5 21h14"];

export function generateStaticParams() {
  return ALL.map((s) => ({ id: s.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const s = ALL.find((x) => x.id === id);
  if (!s) return {};
  const p = PAGES[id];
  const title = `${s.name} ${p ? p.tail : "for SaaS and AI teams"}`;
  const description = `${s.text} By Sam Vllaco, product designer for SaaS and AI products. Fixed price after a 30-minute call.`;
  return {
    title: `${s.name} for SaaS and AI teams`,
    description,
    alternates: { canonical: `/services/${id}/` },
    ...share({ title: `${title} | Sam Vllaco`, description, url: `/services/${id}/` }),
  };
}

const Ico = ({ d, cls = "tg-ico" }) => <i className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>;

export default async function ServicePage({ params }) {
  const { id } = await params;
  const s = ALL.find((x) => x.id === id);
  if (!s) notFound();
  const d = DETAILS[id] || { for: "", get: [] };
  const p = PAGES[id] || { tail: "for SaaS and AI teams", pains: [], work: [] };
  const work = p.work.map((slug) => WORK.find((w) => w.slug === slug)).filter(Boolean);
  const hero = work[0];
  const idx = ALL.findIndex((x) => x.id === id);
  const quote = TESTIMONIALS[idx % TESTIMONIALS.length];
  const related = s.group.items.filter((x) => x.id !== id).slice(0, 8);
  const first = s.name.split(" ")[0];
  const lower = /[A-Z].*[A-Z]/.test(first) ? s.name : s.name.charAt(0).toLowerCase() + s.name.slice(1);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: s.name, description: `${s.text} ${d.for}`.trim(), serviceType: s.name, category: s.group.title, provider: { "@id": PERSON_ID }, areaServed: ["United States", "Europe", "Canada", "Australia", "United Arab Emirates"], url: `${SITE.url}/services/${id}/` },
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
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a>
            <a className="hero2-btn hero2-btn-light" href="#sv-work">See the work</a>
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

      {related.length ? (
        <nav className="sv-sec sv-more" aria-label={`More in ${s.group.title}`}>
          <p className="mx-k">More in {s.group.title}</p>
          <ul>{related.map((r) => <li key={r.id}><Link prefetch={false} href={`/services/${r.id}/`}>{r.name}</Link></li>)}</ul>
        </nav>
      ) : null}
    </div>
  );
}

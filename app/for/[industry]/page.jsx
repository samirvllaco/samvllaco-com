import CopyEmailInline from "../../../components/HirePanelCopy";
import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import CallIcon from "../../../components/CallIcon";
import JsonLd from "../../../components/JsonLd";
import Faq from "../../../components/Faq";
import SkyPhoto from "../../../components/SkyPhoto";
import { SERVICES, svcHref } from "../../../lib/services";
import { PROCESS } from "../../../lib/service-details";
import { GET_ICONS, PAIN_ICONS, SVC_FAQ } from "../../../lib/service-pages";
import { INDUSTRIES, industry } from "../../../lib/industries";
import { WORK } from "../../../lib/work";
import { SITE } from "../../../lib/site";
import { share, PERSON_ID } from "../../../lib/seo";

// One landing page per industry (owner, 27 Nov 2026), built from lib/industries.js on the service page layout.
const ITEMS = SERVICES.flatMap((g) => g.items);
const STEP_ICONS = ["M4 5h16v11H9l-5 4z", "M6 3h9l4 4v14H6zM9 11h7M9 15h7", "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z", "M12 3v12M7 10l5 5 5-5M5 21h14"];
const Ico = ({ d, cls = "tg-ico" }) => <i className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>;

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIES.map((x) => ({ industry: x.id }));
}
export async function generateMetadata({ params }) {
  const { industry: id } = await params;
  const x = industry(id);
  if (!x) return {};
  const title = `UI/UX Design ${x.tail}`;
  const description = `${x.lede.split(". ")[0]}. Product and web design by Sam Vllaco, with a fixed price after a 30-minute call.`;
  return { title, description, alternates: { canonical: `/for/${id}/` }, ...share({ title: `${title} | Sam Vllaco`, description, url: `/for/${id}/` }) };
}

export default async function IndustryPage({ params }) {
  const { industry: id } = await params;
  const x = industry(id);
  if (!x) notFound();
  const help = x.help.map((sid) => ITEMS.find((it) => it.id === sid)).filter(Boolean);
  const work = x.work.map((slug) => WORK.find((w) => w.slug === slug)).filter(Boolean);
  const hero = work[0];
  const schema = { "@context": "https://schema.org", "@type": "Service", name: `UI/UX design ${x.tail}`, description: x.lede, serviceType: "UI/UX design", audience: { "@type": "Audience", audienceType: x.name }, provider: { "@id": PERSON_ID }, url: `${SITE.url}/for/${id}/` };

  return (
    <div className="wrap page svc sv">
      <Crumbs items={[{ name: x.name, href: `/for/${id}/` }]} />
      <JsonLd data={schema} />

      <header className="sv-hero">
        <div className="sv-hero-copy">
          <p className="case-eyebrow">{x.eyebrow}</p>
          <h1>UI/UX design <span className="t2">{x.tail}</span></h1>
          <p className="sv-lede">{x.lede}</p>
          <div className="sv-cta">
            <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
            {work.length ? <a className="hero2-btn hero2-btn-light" href="#sv-work">See the work</a> : null}
          </div>
        </div>
        {hero ? (
          <Link prefetch={false} className="sv-hero-art" href={`/work/${hero.slug}/`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.small} width="800" height="600" alt={hero.alt || `${hero.title} screens designed by Sam Vllaco`} loading="eager" fetchPriority="high" />
            <span className="sv-art-tag"><b>{hero.title}</b><span>Case study</span></span>
          </Link>
        ) : null}
      </header>

      <section className="sv-sec" aria-labelledby="sv-pain-h">
        <h2 id="sv-pain-h">What I hear <span className="t2">on calls</span></h2>
        <ul className="sv-pains">
          {x.pains.map((t, i) => <li key={t}><Ico d={PAIN_ICONS[i % PAIN_ICONS.length]} cls="tg-ico sv-ico" /><b>{t}</b></li>)}
        </ul>
        <p className="sv-story">If one of these sounds like you, you&rsquo;re not alone. It&rsquo;s usually not the product, it&rsquo;s how it&rsquo;s shown. <em className="scr">That part I can fix.</em></p>
      </section>

      <section className="sv-sec" aria-labelledby="sv-get-h">
        <h2 id="sv-get-h">How I <span className="t2">help</span></h2>
        <ul className="sv-get">
          {help.map((s, i) => (
            <li key={s.id}>
              <Ico d={GET_ICONS[i % GET_ICONS.length]} cls="tg-ico sv-ico" /><span className="sv-n">{String(i + 1).padStart(2, "0")}</span>
              <b><Link prefetch={false} href={svcHref(s.id)}>{s.name}</Link></b>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

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

      <div className="sv-sec sv-faqwrap">
        <Faq items={[...x.faq, ...SVC_FAQ]} a="Questions" b="before you book" bg="#171719">
          <SkyPhoto className="faq-photo" />
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></p>
          <div className="faq-mail"><CopyEmailInline icon /></div>
        </Faq>
      </div>

      <section className="sv-sec sv-end" aria-labelledby="sv-end-h">
        <h2 id="sv-end-h">Tell me what <span className="t2">you&rsquo;re building</span></h2>
        <p>30 minutes, just you and me. You leave with a scope, a timeline and a fixed price.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></div>
      </section>

      <nav className="sv-sec sv-more" aria-label="Other industries">
        <p className="mx-k">I also work with</p>
        <ul>{INDUSTRIES.filter((o) => o.id !== id).map((o) => <li key={o.id}><Link prefetch={false} href={`/for/${o.id}/`}>{o.name}</Link></li>)}</ul>
      </nav>
    </div>
  );
}

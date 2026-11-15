import Link from "next/link";
import Crumbs from "../../components/Crumbs";
import CallIcon from "../../components/CallIcon";
import { SERVICES, svcHref } from "../../lib/services";
import { EMAIL } from "../../lib/site";

export const metadata = {
  title: "UI/UX Design Services for Apps, SaaS and AI Products",
  description:
    "UI/UX design services by Sam Vllaco: app and SaaS product design, dashboards, landing pages, design fixes for AI-built apps, design systems, branding and SEO.",
  alternates: { canonical: "/services/" },
};

export default function Services() {
  return (
    <div className="wrap page svc">
      <Crumbs items={[{ name: "Services", href: "/services/" }]} />
      <header className="case-head ph-std">
        <p className="case-eyebrow">Services</p>
        <h1>Design, branding, marketing and SEO</h1>
        <p className="lede">Confusing screens, a brand nobody remembers, a site nobody finds. Whatever's holding your product back, this is where we fix it. Four areas, one goal: a product people understand, remember and can find.</p>
        <div className="btn-row case-cta-row">
          <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a>
        </div>
      </header>
      <figure className="svc-pic">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me/ai/ai8.webp?v=1" width="1000" height="1000" alt="Sam Vllaco talking through a wireframe at his desk" loading="lazy" decoding="async" />
      </figure>
      {SERVICES.map((g) => (
        <section className="svc-group" id={g.id} key={g.id} aria-labelledby={`svc-${g.id}`}>
          <div className="svc-head">
            <h2 id={`svc-${g.id}`}>{g.title}</h2>
            <p>{g.blurb}</p>
          </div>
          <ul className="svc-list">
            {g.items.map((it) => (
              <li id={it.id} key={it.id}>
                <Link prefetch={false} href={svcHref(it.id)} className="svc-card">
                  <h3>{it.name}<span className="svc-arr" aria-hidden="true">→</span></h3>
                  <p>{it.text}</p>
                  {it.ex ? <p className="svc-ex"><span>Example</span>{it.ex}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

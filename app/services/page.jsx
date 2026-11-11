import Link from "next/link";
import Crumbs from "../../components/Crumbs";
import CallIcon from "../../components/CallIcon";
import { SERVICES } from "../../lib/services";
import { EMAIL } from "../../lib/site";

export const metadata = {
  title: "Services: Design, Branding, Marketing and SEO",
  description:
    "Product design, branding, marketing design and SEO for SaaS and AI teams. SaaS product design, dashboards, design systems, brand identity, landing pages and SEO audits by Sam Vllaco.",
  alternates: { canonical: "/services/" },
};

export default function Services() {
  return (
    <div className="wrap page svc">
      <Crumbs items={[{ name: "Services", href: "/services/" }]} />
      <header className="case-head">
        <p className="case-eyebrow">Services</p>
        <h1>Design, branding, marketing and SEO</h1>
        <p className="lede">Four areas, one goal: a product people understand, remember and can find.</p>
        <div className="btn-row case-cta-row">
          <a className="btn btn-primary" href="/book/"><CallIcon />Schedule a call</a>
        </div>
      </header>
      {SERVICES.map((g) => (
        <section className="svc-group" id={g.id} key={g.id} aria-labelledby={`svc-${g.id}`}>
          <div className="svc-head">
            <h2 id={`svc-${g.id}`}>{g.title}</h2>
            <p>{g.blurb}</p>
          </div>
          <ul className="svc-list">
            {g.items.map((it) => (
              <li id={it.id} key={it.id}>
                <h3><Link href={`/services/${it.id}/`}>{it.name}</Link></h3>
                <p>{it.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

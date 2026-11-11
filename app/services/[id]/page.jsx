import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import CallIcon from "../../../components/CallIcon";
import { SERVICES } from "../../../lib/services";
import { DETAILS, PROCESS } from "../../../lib/service-details";
import { SITE } from "../../../lib/site";

const ALL = SERVICES.flatMap((g) => g.items.map((it) => ({ ...it, group: g })));

export function generateStaticParams() {
  return ALL.map((s) => ({ id: s.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const s = ALL.find((x) => x.id === id);
  if (!s) return {};
  const d = DETAILS[id];
  return {
    title: `${s.name} for SaaS and AI teams`,
    description: `${s.text} ${d ? d.for : ""}`.trim(),
    alternates: { canonical: `/services/${id}/` },
  };
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  const s = ALL.find((x) => x.id === id);
  if (!s) notFound();
  const d = DETAILS[id] || { for: "", get: [] };
  const related = s.group.items.filter((x) => x.id !== id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.text,
    serviceType: s.group.title,
    provider: { "@type": "Person", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/services/${id}/`,
  };
  return (
    <div className="wrap page svc">
      <Crumbs items={[{ name: "Services", href: "/services/" }, { name: s.name, href: `/services/${id}/` }]} />
      <header className="case-head">
        <p className="case-eyebrow">{s.group.title}</p>
        <h1>{s.name}</h1>
        <p className="lede">{s.text}</p>
        <div className="btn-row case-cta-row">
          <a className="btn btn-primary" href="/book/"><CallIcon />Schedule a call</a>
          <Link className="btn btn-ghost" href="/#work">See my work</Link>
        </div>
      </header>

      {d.for ? (
        <section className="svc-group" aria-labelledby="svc-for">
          <div className="svc-head"><h2 id="svc-for">Who it is for</h2></div>
          <p className="svc-para">{d.for}</p>
        </section>
      ) : null}

      {d.get.length ? (
        <section className="svc-group" aria-labelledby="svc-get">
          <div className="svc-head"><h2 id="svc-get">What you get</h2></div>
          <ul className="svc-list">
            {d.get.map((g, i) => (
              <li key={g}><span className="case-num">{String(i + 1).padStart(2, "0")}</span><p className="svc-get">{g}</p></li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="svc-group" aria-labelledby="svc-how">
        <div className="svc-head"><h2 id="svc-how">How it works</h2></div>
        <ol className="svc-list book-steps">
          {PROCESS.map((p, i) => (
            <li key={p.t}><span className="case-num">{String(i + 1).padStart(2, "0")}</span><h3>{p.t}</h3><p>{p.d}</p></li>
          ))}
        </ol>
      </section>

      <section className="svc-group" aria-labelledby="svc-more">
        <div className="svc-head"><h2 id="svc-more">More in {s.group.title}</h2></div>
        <ul className="svc-list">
          {related.map((r) => (
            <li key={r.id}><h3><Link href={`/services/${r.id}/`}>{r.name}</Link></h3><p>{r.text}</p></li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}

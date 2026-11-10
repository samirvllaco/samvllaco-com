import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import { WORK } from "../../../lib/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }) {
  const w = WORK.find((x) => x.slug === params.slug);
  if (!w) return {};
  return {
    title: `${w.title}: UI/UX case study`,
    description: w.overview || w.sub,
    alternates: { canonical: `/work/${w.slug}/` },
  };
}

export default function CaseStudy({ params }) {
  const i = WORK.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const w = WORK[i];
  const next = WORK[(i + 1) % WORK.length];
  return (
    <div className="wrap page stack-lg case">
      <Crumbs items={[{ name: "Work", href: "/#work" }, { name: w.title, href: `/work/${w.slug}/` }]} />
      <header className="stack prose">
        <h1>{w.title}</h1>
        <p className="lede">{w.sub}</p>
      </header>

      <dl className="case-meta">
        <div><dt>Role</dt><dd>{w.role}</dd></div>
        <div><dt>Tools</dt><dd>{w.tools}</dd></div>
        <div><dt>Type</dt><dd>{w.platform === "mobile" ? "Mobile" : "Desktop"}</dd></div>
      </dl>

      <div className="case-hero">
        {w.fullVideo ? (
          <video src={w.fullVideo} poster={w.big} muted loop playsInline autoPlay controls aria-label={`${w.title} animated preview`} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={w.big} width={w.w} height={w.h} alt={w.alt} />
        )}
      </div>

      <section className="stack prose">
        <h2>Overview</h2>
        <p>{w.overview}</p>
      </section>

      {w.screens && w.screens.length ? (
        <section className="stack-lg">
          <h2>Screens</h2>
          {w.screens.map((s) => (
            <figure className="case-shot" key={s.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" />
              {s.cap ? <figcaption>{s.cap}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}

      <nav className="case-nav" aria-label="Case study navigation">
        <Link href="/#work">All work</Link>
        <Link href={`/work/${next.slug}/`}>Next: {next.title}</Link>
      </nav>
    </div>
  );
}

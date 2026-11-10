import Link from "next/link";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import { WORK } from "../../../lib/work";
import { SeenMarker } from "../../../components/Seen";

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
  const others = WORK.filter((x) => x.slug !== w.slug);
  return (
    <div className="wrap page case" data-case={w.slug}>
      <SeenMarker slug={w.slug} />
      <Crumbs items={[{ name: "Work", href: "/#work" }, { name: w.title, href: `/work/${w.slug}/` }]} />

      <header className="case-head">
        <p className="case-eyebrow">Case study</p>
        <h1>{w.title}</h1>
        <p className="lede">{w.sub}</p>
        <dl className="case-meta">
          <div><dt>Role</dt><dd>{w.role}</dd></div>
          <div><dt>Tools</dt><dd>{w.tools}</dd></div>
          <div><dt>Platform</dt><dd>{w.platform === "mobile" ? "Mobile" : "Desktop"}</dd></div>
        </dl>
      </header>

      <div className="case-hero" style={{ viewTransitionName: `w-${w.slug}` }}>
        {w.fullVideo ? (
          <video src={w.fullVideo} poster={w.big} muted loop playsInline autoPlay controls aria-label={`${w.title} animated preview`} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={w.big} width={w.w} height={w.h} alt={w.alt} />
        )}
      </div>

      <section className="case-section case-overview">
        <h2>Overview</h2>
        <p>{w.overview}</p>
      </section>

      {w.screens && w.screens.length ? (
        <section className="case-section">
          <h2>Screens</h2>
          <div className="case-shots">
            {w.screens.map((s) => (
              <figure className="case-shot" key={s.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" />
                {s.cap ? <figcaption>{s.cap}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case-section case-more" aria-labelledby="more-work">
        <div className="case-more-head">
          <h2 id="more-work">More work</h2>
          <Link href="/#work">All work</Link>
        </div>
        <div className="case-more-grid">
          {others.map((o) => (
            <Link href={`/work/${o.slug}/`} className="work-card" key={o.slug}>
              <span className="work-media" style={{ viewTransitionName: `w-${o.slug}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.small} width={o.smallW} height={Math.round((o.smallW * o.h) / o.w)} alt={o.alt} loading="lazy" />
              </span>
              <span className="work-meta">
                <span className="work-title">{o.title}</span>
                <span className="work-sub">{o.sub}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

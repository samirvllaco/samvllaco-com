import Link from "next/link";
import CallIcon from "../../../components/CallIcon";
import { notFound } from "next/navigation";
import Crumbs from "../../../components/Crumbs";
import { WORK } from "../../../lib/work";
import { SeenMarker } from "../../../components/Seen";
import CaseAside from "../../../components/CaseAside";
import CaseFab from "../../../components/CaseFab";
import { STUDIES } from "../../../lib/work-studies";
import { EMAIL } from "../../../lib/site";

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

function Shot({ image, light }) {
  return (
    <div className={`case-fig${light ? " case-fig-light" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} width={image.w} height={image.h} alt={image.alt} loading="lazy" />
    </div>
  );
}

function MoreWork({ others }) {
  return (
    <section className="case-section case-more" id="more" aria-labelledby="more-work">
      <div className="case-more-head">
        <h2 id="more-work">More work</h2>
        <Link href="/#work">All work</Link>
      </div>
      <div className="case-more-grid">
        {others.map((o) => (
          <Link href={`/work/${o.slug}/`} className="work-card" key={o.slug}>
            <span className="work-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.small} width={o.smallW} height={Math.round((o.smallW * o.h) / o.w)} alt={o.alt} loading="lazy" />
            </span>
            <span className="work-meta">
              <span className="work-title">{o.title}</span>
              <span className="work-sub">{o.sub}</span>
              <span className="work-tags">{o.tags.map((t) => <span key={t}>{t}</span>)}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function CaseStudy({ params }) {
  const i = WORK.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const w = WORK[i];
  const st = STUDIES[w.slug];
  const others = WORK.filter((x) => x.slug !== w.slug);
  const toc = st
    ? [
        { id: "intro", label: "Intro" },
        { id: "about", label: "About the project" },
        { id: "problem", label: "The problem" },
        { id: "approach", label: "Approach" },
        ...st.chapters.map((c) => ({ id: c.id, label: c.title })),
        { id: "motion", label: "Motion" },
        { id: "system", label: "Visual system" },
        ...(others.length ? [{ id: "more", label: "More work" }] : []),
      ]
    : [
        { id: "intro", label: "Intro" },
        { id: "overview", label: "Overview" },
        ...(w.screens && w.screens.length ? [{ id: "screens", label: "Screens" }] : []),
        ...(others.length ? [{ id: "more", label: "More work" }] : []),
      ];
  const hero = (
    <div className="case-hero">
      {w.fullVideo ? (
        <video src={w.fullVideo} poster={w.big} muted loop playsInline autoPlay controls aria-label={`${w.title} animated preview`} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={w.big} width={w.w} height={w.h} alt={w.alt} />
      )}
    </div>
  );
  return (
    <div className="wrap page case-wrap" data-case={w.slug}>
      <div className="case">
        <SeenMarker slug={w.slug} />
        <Crumbs items={[{ name: "Work", href: "/#work" }, { name: w.title, href: `/work/${w.slug}/` }]} />

        <header className="case-head" id="intro">
          <p className="case-eyebrow">Case study{st ? ` · ${st.kind}` : ""}</p>
          <h1>{w.title}</h1>
          <p className="lede">{w.sub}</p>
          <p className="work-tags case-tags">{w.tags.map((t) => <span key={t}>{t}</span>)}</p>
          {st ? (
            <div className="btn-row case-cta-row">
              <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Schedule%20a%20call`}><CallIcon />Schedule a call</a>
              <a className="btn btn-ghost" href={`#${st.chapters[0].id}`}>See the screens</a>
            </div>
          ) : null}
          {st ? (
            <dl className="case-facts">
              {st.facts.map((f) => (
                <div key={f.label}><dt>{f.value}</dt><dd>{f.label}</dd></div>
              ))}
            </dl>
          ) : (
            <dl className="case-meta">
              <div><dt>Role</dt><dd>{w.role}</dd></div>
              <div><dt>Tools</dt><dd>{w.tools}</dd></div>
              <div><dt>Category</dt><dd>{w.tags.join(", ")}</dd></div>
            </dl>
          )}
        </header>

        {hero}

        {st ? (
          <>
            <section className="case-section case-split" id="about">
              <h2>About the project</h2>
              <div className="case-copy">
                {st.about.map((t) => <p key={t}>{t}</p>)}
                <dl className="case-meta">
                  <div><dt>Type</dt><dd>{st.kind}</dd></div>
                  <div><dt>Industry</dt><dd>{st.industry}</dd></div>
                  <div><dt>Year</dt><dd>{st.year}</dd></div>
                  <div><dt>Tools</dt><dd>{w.tools}</dd></div>
                </dl>
                <ul className="case-services" aria-label="Services">
                  {st.services.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </section>

            <section className="case-section case-split" id="problem">
              <h2>The problem</h2>
              <div className="case-copy">
                <p>{st.problem.intro}</p>
                <ol className="case-list">
                  {st.problem.points.map((pt, n) => (
                    <li key={pt.title}>
                      <span className="case-num">{String(n + 1).padStart(2, "0")}</span>
                      <span><b>{pt.title}</b><span>{pt.text}</span></span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="case-section" id="approach">
              <h2>Approach</h2>
              <div className="case-cards">
                {st.approach.map((a, n) => (
                  <article key={a.title}>
                    <span className="case-num">{String(n + 1).padStart(2, "0")}</span>
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </article>
                ))}
              </div>
            </section>

            {st.chapters.map((c) => (
              <section className="case-section" id={c.id} key={c.id}>
                <div className="case-chapter-head">
                  <h2>{c.title}</h2>
                  <p>{c.text}</p>
                </div>
                <Shot image={c.image} />
                <div className="case-parts">
                  {c.parts.map((pt) => (
                    <article className={`case-part${pt.image.h > pt.image.w ? " is-tall" : ""}`} key={pt.title}>
                      <div className="case-part-text">
                        <h3>{pt.title}</h3>
                        <p>{pt.text}</p>
                      </div>
                      <Shot image={pt.image} light />
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section className="case-section case-split" id="motion">
              <h2>Motion</h2>
              <div className="case-copy">
                <p>{st.motion.text}</p>
                <ul className="case-ticks">
                  {st.motion.points.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </section>

            <section className="case-section" id="system">
              <div className="case-chapter-head">
                <h2>Visual system</h2>
                <p>{st.system.text}</p>
              </div>
              <Shot image={st.system.image} />
              <div className="case-cards case-cards-4">
                {st.system.points.map((x) => (
                  <article key={x.title}>
                    <h3>{x.title}</h3>
                    <p>{x.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="case-section case-close">
              <h2>{st.cta.title}</h2>
              <p>{st.cta.text}</p>
              <div className="btn-row">
                <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Schedule%20a%20call`}><CallIcon />Schedule a call</a>
                <Link className="btn btn-ghost" href="/services/">See services</Link>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="case-section case-overview" id="overview">
              <h2>Overview</h2>
              <p>{w.overview}</p>
            </section>
            {w.screens && w.screens.length ? (
              <section className="case-section" id="screens">
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
          </>
        )}

        {others.length ? <MoreWork others={others} /> : null}
      </div>
      <CaseAside items={toc} />
      <CaseFab />
    </div>
  );
}

import { SITE, ARTICLES, articleLink } from "../lib/site";

// Article cards that link to Medium. Used on the Writing page.
export default function WritingGrid() {
  return (
      <section className="stack home-writing">
        <div className="blog-head">
          <h2>Latest stories</h2>
          <a className="blog-all" href={SITE.links.medium} target="_blank" rel="me noopener noreferrer">All posts <span aria-hidden="true">→</span></a>
        </div>
        <div className={`blog-grid${ARTICLES.length === 1 ? " is-one" : ""}`}>
          {ARTICLES.map((a, i) => {
            const l = articleLink(a);
            return (
            <a className="blog-card" key={a.url} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span className="blog-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.cover} width="1400" height="788" alt={a.coverAlt} loading={i < 2 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
                <span className="work-open" aria-hidden="true"><span className="work-open-t">{l.label}</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
              </span>
              <span className="blog-meta"><span>{a.category}</span><span>{l.label}</span></span>
              <span className="blog-title">{a.short}</span>{l.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
            );
          })}
        </div>
        {/* The Medium "back room" panel is hidden (owner, 27 Nov 2026: "hide those") */}
      </section>
  );
}

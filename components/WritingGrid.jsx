import { SITE, ARTICLES } from "../lib/site";
import { MEDIUM_PATH } from "../lib/medium-logo";

// Article cards that link to Medium. Used on the Writing page.
export default function WritingGrid() {
  return (
      <section className="stack home-writing">
        <div className="blog-head">
          <h2>Latest stories</h2>
          <a className="blog-all" href={SITE.links.medium} target="_blank" rel="me noopener noreferrer">All posts <span aria-hidden="true">→</span></a>
        </div>
        <div className="blog-grid">
          {ARTICLES.map((a) => (
            <a className="blog-card" key={a.url} href={a.url} target="_blank" rel="noopener noreferrer" aria-label={`${a.short}. Read on Medium, opens in a new tab`}>
              <span className="blog-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.cover} width="1400" height="788" alt={a.coverAlt} loading="lazy" />
                <span className="work-open" aria-hidden="true"><span className="work-open-t">Read on Medium</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
              </span>
              <span className="blog-meta"><span>{a.category}</span><span>Read on Medium</span></span>
              <span className="blog-title">{a.short}</span>
            </a>
          ))}
          {ARTICLES.length % 2 === 1 ? (
            <a className="blog-card blog-follow" href={SITE.links.medium} target="_blank" rel="me noopener noreferrer" aria-label="Follow Sam Vllaco on Medium, opens in a new tab">
              <span className="blog-media">
                <svg viewBox="0 0 24 24" width="72" height="72" aria-hidden="true"><path fill="currentColor" d={MEDIUM_PATH} /></svg>
                <span className="work-open" aria-hidden="true"><span className="work-open-t">Follow on Medium</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
              </span>
              <span className="blog-meta"><span>More soon</span><span>Follow on Medium</span></span>
              <span className="blog-title">New stories on design for AI-built apps. Follow to get the next one.</span>
            </a>
          ) : null}
        </div>
      </section>
  );
}

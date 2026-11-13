import { SITE, ARTICLES } from "../lib/site";

// Article cards that link to Medium. Used on the Writing page.
export default function WritingGrid() {
  return (
      <section className="stack home-writing">
        <div className="blog-head">
          <h2>Latest stories</h2>
          <a className="blog-all" href={SITE.links.medium} target="_blank" rel="me noopener noreferrer">All posts <span aria-hidden="true">→</span></a>
        </div>
        <div className={`blog-grid${ARTICLES.length === 1 ? " is-one" : ""}`}>
          {ARTICLES.map((a, i) => (
            <a className="blog-card" key={a.url} href={a.url} target="_blank" rel="noopener noreferrer">
              <span className="blog-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.cover} width="1400" height="788" alt={a.coverAlt} loading={i < 2 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
                <span className="work-open" aria-hidden="true"><span className="work-open-t">Read on Medium</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
              </span>
              <span className="blog-meta"><span>{a.category}</span><span>Read on Medium</span></span>
              <span className="blog-title">{a.short}</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
        <aside className="md-club" aria-labelledby="md-club-h">
          <p className="md-club-k scr">Psst. You found the back room.</p>
          <h2 id="md-club-h">Most people never scroll <span className="t2">this far.</span></h2>
          <p className="md-club-p">These stories reach a small circle of founders and designers on Medium first. Follow so the next one lands in your feed, clap if one helped, and tell me in the comments what you're building. I read every comment.</p>
          <ul className="md-club-acts">
            <li><a href={SITE.links.medium} target="_blank" rel="me noopener noreferrer"><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 21c0-4 3-7 7-7 1.5 0 2.9.4 4 1.2M19 15v6M16 18h6" /></svg></i><span><b>Follow</b><small>New stories in your feed</small></span></a></li>
            <li><a href={ARTICLES[0].url} target="_blank" rel="noopener noreferrer"><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8.5 11.5 5.6 8.6a1.3 1.3 0 0 1 1.8-1.8l4.4 4.4M7.6 13.4 4.4 10.2a1.3 1.3 0 0 1 1.8-1.8M9.4 7.7 8 6.3a1.3 1.3 0 0 1 1.8-1.8l5.4 5.4-.4-2.2a1.3 1.3 0 0 1 2.5-.6l1 4.7a6 6 0 0 1-1.7 5.5 6 6 0 0 1-8.5 0l-3.5-3.5a1.3 1.3 0 0 1 1.8-1.8M12 2.5v1.5M15.5 3.2l-.8 1.3M8.5 3.2l.8 1.3" /></svg></i><span><b>Clap</b><small>Up to 50 times</small></span></a></li>
            <li><a href={ARTICLES[0].url} target="_blank" rel="noopener noreferrer"><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5" /></svg></i><span><b>Comment</b><small>Tell me what you're building</small></span></a></li>
          </ul>
          <p className="sr-only">Links open Medium in a new tab.</p>
        </aside>
      </section>
  );
}

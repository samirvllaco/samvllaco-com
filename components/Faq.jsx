import OnlineFace from "./OnlineFace";
import { SITE } from "../lib/site";

// FAQ section: sticky intro card on the left, questions on the right.
// The card shows who answers: photo, name, role and LinkedIn, then the call button (owner, 27 Nov 2026: no extra text).
// Uses <details>, so it works without JavaScript, and adds FAQPage structured data.
// Answers can carry light markup: **bold**, ==highlight== and _hand-written emphasis_.
// The FAQ structured data gets the same text without the marks.
const MARK = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|==[^=]+==|_[^_]+_)/g;
const plain = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/==([^=]+)==/g, "$1").replace(/_([^_]+)_/g, "$1");
function Rich({ t }) {
  return t.split(MARK).map((part, i) => {
    const ln = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (ln) return <a key={i} className="faq-link" href={ln[2]}>{ln[1]}</a>;
    if (part.startsWith("**")) return <b key={i}>{part.slice(2, -2)}</b>;
    if (part.startsWith("==")) return <mark key={i} className="faq-hl">{part.slice(2, -2)}</mark>;
    if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) return <em key={i} className="scr">{part.slice(1, -1)}</em>;
    return part;
  });
}

export default function Faq({ items, children, a = "Questions", b = "founders ask first", bg = "#0e0e10", light = false }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
  };
  return (
    <section className={`faq${light ? " band-light" : ""}`} id="faq" aria-labelledby="faq-h" data-bg={bg}>
      <div className="faq-side">
        <h2 id="faq-h">{a} <span className="t2">{b}</span></h2>
        <div className="faq-card">
          <div className="faq-who">
            <OnlineFace size={56} />
            <div>
              <p className="faq-who-n">Sam Vllaco</p>
              <p className="faq-who-r">UI/UX and product designer</p>
              <a className="faq-in" href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="currentColor" /><path d="M7.1 9.6h2.4V17H7.1zM8.3 6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zM11 9.6h2.3v1h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68V17h-2.4v-3.5c0-.84-.02-1.92-1.17-1.92-1.17 0-1.35.91-1.35 1.86V17H11z" /></svg>
                <span className="sr-only">Sam Vllaco on LinkedIn</span>
              </a>
            </div>
          </div>
          {children}
        </div>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <details key={f.q} name="faq">
            <summary>
              <span className="faq-plus" aria-hidden="true" />
              <span>{f.q}</span>
            </summary>
            <p><Rich t={f.a} /></p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

// FAQ section: sticky intro card on the left, questions on the right.
// Uses <details>, so it works without JavaScript, and adds FAQPage structured data.
// Answers can carry light markup: **bold**, ==highlight== and _hand-written emphasis_.
// The FAQ structured data gets the same text without the marks.
const MARK = /(\*\*[^*]+\*\*|==[^=]+==|_[^_]+_)/g;
const plain = (t) => t.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/==([^=]+)==/g, "$1").replace(/_([^_]+)_/g, "$1");
function Rich({ t }) {
  return t.split(MARK).map((part, i) => {
    if (part.startsWith("**")) return <b key={i}>{part.slice(2, -2)}</b>;
    if (part.startsWith("==")) return <mark key={i} className="faq-hl">{part.slice(2, -2)}</mark>;
    if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) return <em key={i} className="scr">{part.slice(1, -1)}</em>;
    return part;
  });
}

export default function Faq({ items, children, a = "Questions", b = "founders ask first", bg = "#000000" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
  };
  return (
    <section className="faq" id="faq" aria-labelledby="faq-h" data-bg={bg}>
      <div className="faq-side">
        <h2 id="faq-h">{a} <span className="t2">{b}</span></h2>
        <div className="faq-card">{children}</div>
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

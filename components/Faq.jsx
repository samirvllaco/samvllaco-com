// FAQ section: sticky intro card on the left, questions on the right.
// Uses <details>, so it works without JavaScript, and adds FAQPage structured data.
export default function Faq({ items, children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="faq" id="faq" aria-labelledby="faq-h" data-bg="#000000">
      <div className="faq-side">
        <h2 id="faq-h">Questions <span className="t2">founders ask first</span></h2>
        <div className="faq-card">{children}</div>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <details key={f.q} name="faq" open={f.open}>
            <summary>
              <span className="faq-plus" aria-hidden="true" />
              <span>{f.q}</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

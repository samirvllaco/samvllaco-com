import { TESTIMONIALS } from "../lib/testimonials";

// Three client quotes on bordered cards. Sample cards are labelled until real quotes replace them.
export default function Testimonials() {
  return (
    <section className="bx-sec" aria-labelledby="tm-h" data-bg="#000000">
      <h2 id="tm-h">What clients say after handover</h2>
      <p className="bx-lede">Don't just take my word for it.</p>
      <div className="of-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure className="bx-card tm-card" key={i}>
            {t.sample ? <span className="tm-sample">Sample</span> : null}
            <svg className="tm-mark" viewBox="0 0 32 24" width="32" height="24" aria-hidden="true"><path fill="currentColor" d="M0 24V13.500C0 5.600 4.200 1.200 12 0v5.200c-3.300.8-5 2.800-5.200 5.800H12V24H0Zm18 0V13.500C18 5.600 22.200 1.200 30 0v5.200c-3.300.8-5 2.800-5.200 5.800H30V24H18Z" /></svg>
            <blockquote>{t.quote}</blockquote>
            <figcaption><span className="tm-av" aria-hidden="true">{t.initials}</span><span><b>{t.name}</b><i>{t.role}</i></span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { TESTIMONIALS } from "../lib/testimonials";

const Star = () => <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m10 1.600 2.600 5.300 5.800.800-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.800L10 1.600Z" /></svg>;

// Client reviews on bordered cards: five stars, the quote, what the client endorsed and the project.
export default function Testimonials() {
  return (
    <section className="bx-sec" aria-labelledby="tm-h" data-bg="#000000">
      <h2 id="tm-h">What clients say <span className="t2">after handover</span></h2>
      <p className="bx-lede">Don't just take my word for it. A few of 200+ client reviews.</p>
      <div className="tm-wrap">
      <div className="of-grid tm-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure className="bx-card tm-card" key={i} data-reveal>
            <span className="tm-stars" role="img" aria-label={`Rated ${t.rating || "5.0"} out of 5`}><Star /><Star /><Star /><Star /><Star /><b>{t.rating || "5.0"}</b></span>
            <blockquote>“{t.quote}”</blockquote>
            <ul className="tm-tags" aria-label="Endorsed by the client">{t.tags.map((g) => <li key={g}>{g}</li>)}</ul>
            <figcaption><b>{t.project}</b><i>Client review, {t.when}</i></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/book/" className="tm-more">
        <span className="tm-stars" aria-hidden="true"><Star /><Star /><Star /><Star /><Star /></span>
        <b>200+ reviews</b>
        <i>from clients in Europe, the USA, Canada, Australia and the UAE</i>
      </Link>
      </div>
    </section>
  );
}

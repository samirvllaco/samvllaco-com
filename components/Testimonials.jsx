import Link from "next/link";
import DotGlobe, { LocalClock } from "./DotGlobe";
import { TESTIMONIALS } from "../lib/testimonials";

const Star = () => <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="m10 1.600 2.600 5.300 5.800.800-4.200 4.100 1 5.800L10 14.900l-5.200 2.700 1-5.800L1.600 7.700l5.800-.800L10 1.600Z" /></svg>;

// Client reviews on bordered cards: five stars, the quote, what the client endorsed and the project.
export default function Testimonials() {
  return (
    <section className="bx-sec" aria-labelledby="tm-h" data-bg="#000000">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"><defs><linearGradient id="tm-star" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd35c" /><stop offset=".55" stopColor="#ff9f0a" /><stop offset="1" stopColor="#f26a00" /></linearGradient></defs></svg>
      <h2 id="tm-h">What clients say <span className="t2">after handover</span></h2>
      <p className="bx-lede">Don't just take my word for it. A few of 200+ client reviews.</p>
      <div className="tm-wrap">
      <div className="of-grid tm-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure className="bx-card tm-card" key={i} data-reveal>
            <span className="tm-stars" role="img" aria-label={`Rated ${t.rating || "5.0"} out of 5`}><Star /><Star /><Star /><Star /><Star /><b>{t.rating || "5.0"}</b></span>
            <blockquote>“{t.quote}”</blockquote>
            <ul className="tm-tags" aria-label="Endorsed by the client">{t.tags.map((g) => <li key={g}>{g}</li>)}</ul>
<figcaption><b>{t.project}</b><i><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="#3b9bff" d="M12 1.800l2.500 1.800 3.100-.100 1 2.900 2.500 1.800-1 2.900 1 2.900-2.500 1.800-1 2.900-3.100-.100L12 21.400l-2.500-1.800-3.100.100-1-2.900L2.900 15l1-2.900-1-2.900 2.500-1.800 1-2.900 3.100.100L12 1.800Z" /><path fill="none" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" d="m8.300 12.200 2.500 2.500 4.900-5.200" /></svg>Verified review</i></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/book/" className="tm-world">
        <span className="tm-world-in">
          <span className="tm-world-r"><span className="tm-stars" aria-hidden="true"><Star /><Star /><Star /><Star /><Star /></span><b>5.0</b></span>
          <b className="tm-world-t">200+ reviews <span className="t2">worldwide</span></b>
          <span className="tm-world-f">
            {[["us", "USA"], ["ca", "Canada"], ["au", "Australia"], ["ae", "UAE"], ["eu", "Europe"]].map(([c, n]) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={c} src={`/flags/${c}.svg`} width="28" height="21" alt={n} title={n} loading="lazy" />
            ))}
          </span>
          <span className="tm-world-c">Tirana, Albania · <LocalClock /></span>
        </span>
        <DotGlobe />
      </Link>
      </div>
    </section>
  );
}

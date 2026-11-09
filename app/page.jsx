import { SITE, ARTICLES } from "../lib/site";
import { STATS } from "../lib/stats";
import MeetSam from "../components/MeetSam";
import Newsletter from "../components/Newsletter";
import ArticleMark from "../components/ArticleMark";
import OcufuseMark from "../components/OcufuseMark";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap page stack-lg">
      <section className="profile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="avatar" src="/sam.jpg" alt="Sam Vllaco" width="112" height="112" />
        <div className="profile-body">
          <p className="avail"><span className="avail-dot" aria-hidden="true" />Available</p>
          <h1>Sam Vllaco</h1>
          <p className="loc">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            Tirana, Albania
          </p>
          <p className="intro">
            Making pixels useful since <b>2013</b>. <b>10,000+</b> screens designed.
          </p>
          <p className="intro">
            Currently building <a href={SITE.links.ocufuse}><b>Ocufuse</b></a>, an eye journal with
            screen break games and free tools.
          </p>
          <ul className="socials" aria-label="Find me online">
            <li>
              <a href={SITE.links.x} rel="me noopener" aria-label={`X, ${STATS.x} followers`}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.2 22H2l7.7-8.8L1.5 2h6.7l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z"/></svg>
                <span><b>{STATS.x}</b> followers</span>
              </a>
            </li>
            <li>
              <a href={SITE.links.medium} rel="me noopener">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M13.5 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm6.6 0c0 3.2-1.3 5.8-2.9 5.8S14.3 15.2 14.3 12s1.3-5.8 2.9-5.8S20.1 8.8 20.1 12Zm2.9 0c0 2.9-.5 5.200-1 5.200s-1-2.300-1-5.200.5-5.200 1-5.200 1 2.300 1 5.200Z"/></svg>
                <span>Medium</span>
              </a>
            </li>
            <li>
              <a href={SITE.links.dribbble} rel="me noopener">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2"/><path fill="none" stroke="currentColor" strokeWidth="2" d="M6 5.5c4 3 8 8.5 9.5 14M3 11c5 .5 11-.5 15-4M9 3c3.5 4.500 6 10.5 6.5 14.5"/></svg>
                <span>Dribbble</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <MeetSam />

      <section className="stack">
        <h2>Product</h2>
        <div className="product-row"><OcufuseMark href="/building/ocufuse/" text="A calm eye journal with screen break games, routines and free tools." cta="Read the build story" /></div>
      </section>

      <section className="stack">
        <h2>Writing</h2>
        <div className="product-row">
          {ARTICLES.map((a) => (
            <ArticleMark key={a.url} href={a.url} platform={a.platform} title={a.short} />
          ))}
        </div>
      </section>

      <Newsletter />

    </div>
  );
}

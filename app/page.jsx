import { SITE, ARTICLES } from "../lib/site";
import { STATS } from "../lib/stats";
import SectionColors from "../components/SectionColors";
import Globe from "../components/Globe";
import { MEDIUM_PATH } from "../lib/medium-logo";
import Coffee from "../components/Coffee";
import ArticleMark from "../components/ArticleMark";
import OcufuseMark from "../components/OcufuseMark";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap page stack-lg">
      <SectionColors />
      <section className="profile" data-bg="#0a1420">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="avatar" data-scroll data-scroll-speed="0.15" src="/sam.jpg" alt="Sam Vllaco" width="112" height="112" />
        <div className="profile-body">
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
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d={MEDIUM_PATH} /></svg>
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


      <section className="stack reveal" data-bg="#0d2038" data-scroll data-scroll-class="is-in" data-scroll-offset="10%,0">
        <h2>Product</h2>
        <div className="product-row"><OcufuseMark href="/building/ocufuse/" text="A calm eye journal with screen break games, routines and free tools." cta="Read the build story" /></div>
        <div className="btn-row"><Coffee label="Support what I am building" /></div>
      </section>

      <Globe bg="#05080e" />

      <section className="stack reveal" data-bg="#0b2a2e" data-scroll data-scroll-class="is-in" data-scroll-offset="10%,0">
        <h2>Writing</h2>
        <div className="product-row">
          {ARTICLES.map((a) => (
            <ArticleMark key={a.url} href={a.url} platform={a.platform} title={a.short} />
          ))}
        </div>
      </section>


    </div>
  );
}

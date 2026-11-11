import { SITE, ARTICLES, EMAIL } from "../lib/site";
import CallIcon from "../components/CallIcon";
import { STATS } from "../lib/stats";
import SectionColors from "../components/SectionColors";
import { MEDIUM_PATH } from "../lib/medium-logo";
import ArticleMark from "../components/ArticleMark";
import WorkGrid from "../components/WorkGrid";
import HireCard from "../components/HireCard";
import HeroShow from "../components/HeroShow";
import { LocalTime, CountUp } from "../components/Greeting";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap page stack-lg">
      <SectionColors />
      <section className="hero2" data-bg="#111112">
        <div className="hero2-main">
          <p className="hero2-eyebrow">Product designer for SaaS and AI teams</p>
          <h1>Design that makes complex products feel simple</h1>
          <p className="hero2-sub">
            I design SaaS products, dashboards and mobile apps that people understand on the first
            screen.
          </p>
          <div className="hero2-cta">
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Schedule a call</a>
          </div>
        </div>
        <HeroShow />
        <div className="hero2-foot">
          <ul className="hero2-stats" aria-label="In numbers">
            <li><CountUp to={10000} suffix="+" /> screens designed</li>
            <li><b>50+</b> clients</li>
            <li>Making pixels useful since <b>2013</b></li>
          </ul>
          <p className="loc">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            Tirana, Albania<LocalTime />
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
                <span className="work-open" aria-hidden="true"><span className="work-open-t">Follow on Medium</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
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

      <section id="work" className="stack work" data-bg="#000000">
          <h2>Work</h2>
          <WorkGrid />
          <HireCard wide />
      </section>


      {/* Product (Ocufuse) section hidden for now */}

      <section className="stack home-writing" data-bg="#000000">
        <div className="blog-head">
          <h2>Latest writing</h2>
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

      {/* Globe section hidden for now: <Globe bg="#000000" /> */}


    </div>
  );
}

import Link from "next/link";
import Crumbs from "../../components/Crumbs";
import CallIcon from "../../components/CallIcon";
import JsonLd from "../../components/JsonLd";
import { ARTICLES, SITE } from "../../lib/site";
import { RESOURCES } from "../../lib/resources";
import { share, PERSON_ID } from "../../lib/seo";

const description = "Free UI prompts, the AI slop UI ebook, design kits and stories on AI-built apps. Everything Sam Vllaco uses with clients, in one place.";

export const metadata = {
  title: "Resources: Prompts, Ebook and Insights for AI-Built Apps",
  description,
  alternates: { canonical: "/resources/" },
  ...share({ title: "Resources | Sam Vllaco", description, url: "/resources/" }),
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Resources",
  description,
  url: `${SITE.url}/resources/`,
  author: { "@id": PERSON_ID },
  hasPart: RESOURCES.map((r) => ({ "@type": "WebPage", name: r.title, url: `${SITE.url}${r.href}` })),
};

export default function Resources() {
  return (
    <div className="wrap page svc sv rs">
      <Crumbs items={[{ name: "Resources", href: "/resources/" }]} />
      <JsonLd data={schema} />

      <header className="sv-hero">
        <div className="sv-hero-copy">
          <p className="case-eyebrow">Resources</p>
          <h1>Learn and borrow <span className="t2">what I use with clients</span></h1>
          <p className="sv-lede">The prompts, rules files and notes I use on real products, written down so you can fix your own app tonight. <em className="scr">Take what helps.</em></p>
          <div className="sv-cta">
            <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/ebook/">Get the book for $6.99</Link>
            <Link prefetch={false} className="hero2-btn hero2-btn-light" href="/ebook/#free">Try 2 free prompts</Link>
          </div>
        </div>
        <Link prefetch={false} className="sv-hero-art rs-book" href="/ebook/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/book-cover.webp?v=2" width="300" height="400" alt="Cover of 27 Copy-Paste Prompts to Fix AI Slop UI" loading="eager" fetchPriority="high" />
          <span className="sv-art-tag"><b>27 Copy-Paste Prompts</b><span>Ebook, 80% off</span></span>
        </Link>
      </header>

      <section className="sv-sec" aria-labelledby="rs-all-h">
        <h2 id="rs-all-h">Everything <span className="t2">in one place</span></h2>
        <ul className="rs-grid">
          {RESOURCES.map((r) => (
            <li key={r.href}>
              <Link prefetch={false} href={r.href}>
                <i className="tg-ico sv-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={r.icon} /></svg></i>
                <span><b>{r.title}{r.tag ? <span className="mega-pdf mega-gold">{r.tag}</span> : null}</b><em>{r.text}</em></span>
                <svg className="rs-go" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sv-sec" aria-labelledby="rs-posts-h">
        <h2 id="rs-posts-h">Latest <span className="t2">stories</span></h2>
        <ul className="sv-work">
          {ARTICLES.slice(0, 3).map((a) => (
            <li key={a.url}>
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.cover} width="1400" height="788" alt="" loading="lazy" decoding="async" />
                <b>{a.short || a.title}</b><span>{a.category}, read on Medium<span className="sr-only"> (opens in a new tab)</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="sv-sec sv-end" aria-labelledby="rs-end-h">
        <h2 id="rs-end-h">Rather have me <span className="t2">fix it for you?</span></h2>
        <p>30 minutes, just you and me. You leave with a plan for your product and a fixed price.</p>
        <div className="sv-cta sv-cta-c"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a></div>
      </section>
    </div>
  );
}

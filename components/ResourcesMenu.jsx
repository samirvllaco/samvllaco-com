"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaShell from "./MegaShell";
import { ARTICLES } from "../lib/site";
import { RESOURCES } from "../lib/resources";

// "Resources" in the header: writing, the book, free prompts and answers, then the $99 review + book as one compact row.
const ITEMS = RESOURCES.map((r) => [r.href, r.title, r.text, r.icon, r.tag]);

export default function ResourcesMenu() {
  const path = (usePathname() || "/").replace(/\/?$/, "/");
  return (
    <MegaShell id="mega-resources" label="Resources" href="/resources/">
      {(close) => (
        <div className="wrap mx-in mx-res">
          <div className="mx-main">
            <div className="mx-k-row"><p className="mx-k">Learn and borrow</p><Link prefetch={false} className="mx-view" href="/resources/" onClick={close}>View all resources<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link></div>
            <ul className="mx-grid">
              {ITEMS.map(([href, t, d, icon, tag]) => (
                <li key={href}>
                  <Link prefetch={false} href={href} aria-current={path === href ? "page" : undefined} onClick={close}>
                    <i className="tg-ico mx-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={icon} /></svg></i>
                    <span><b>{t}{tag ? <span className="mega-pdf mega-gold">{tag}</span> : null}</b><em>{d}</em></span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mx-k mx-k2">Latest stories</p>
            <ul className="mx-posts">
              {ARTICLES.slice(0, 2).map((a) => (
                <li key={a.url}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" onClick={close}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.cover} width="1400" height="788" alt="" loading="lazy" decoding="async" />
                    <span><b>{a.short}</b><em>Read on Medium<span className="sr-only"> (opens in a new tab)</span></em></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-up dark-island">
            <div className="mx-up-art" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mx-up-me" src="/sam-hire.webp?v=2" width="1000" height="1250" alt="" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mx-up-bk" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" />
              <i>+</i>
            </div>
            <div className="mx-up-copy">
              <p className="mx-up-k">Upgrade: I do it with you</p>
              <p className="mx-up-t">Complete UI/UX review <span>+ the book</span></p>
              <p className="mx-up-p"><b>$99</b> one-time, by a designer with 10+ years and 570+ clients</p>
            </div>
            <ul className="mx-up-list">
              <li>Your scorecard, out of 10</li>
              <li>Step-by-step plan to 10/10</li>
              <li>Loom video walkthrough</li>
              <li>The full book included</li>
            </ul>
            <Link prefetch={false} className="hero2-btn hero2-btn-light" href="/fix-ai-slop-ui/#options" onClick={close}>See the review</Link>
          </div>
        </div>
      )}
    </MegaShell>
  );
}

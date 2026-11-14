"use client";
import Link from "next/link";
import MegaShell from "./MegaShell";
import { ARTICLES } from "../lib/site";
import { RESOURCES } from "../lib/resources";

// "Resources" in the header: writing, the book, free prompts and answers, with the book as the side card.
const ITEMS = RESOURCES.map((r) => [r.href, r.title, r.text, r.icon, r.tag]);

export default function ResourcesMenu() {
  return (
    <MegaShell id="mega-resources" label="Resources" href="/resources/">
      {(close) => (
        <div className="wrap mx-in">
          <div className="mx-main">
            <p className="mx-k">Learn and borrow</p>
            <ul className="mx-grid">
              {ITEMS.map(([href, t, d, icon, tag]) => (
                <li key={href}>
                  <Link prefetch={false} href={href} onClick={close}>
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
          <aside className="mx-side mx-book">
            <div className="mx-book-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/book-cover.webp?v=2" width="300" height="400" alt="Cover of 27 Copy-Paste Prompts to Fix AI Slop UI" loading="lazy" />
              <span className="mx-live mx-sale">80% off</span>
            </div>
            <p className="mx-side-t">Fix your AI-built app tonight</p>
            <p className="mx-side-p">27 copy-paste prompts for Claude, Cursor, Lovable and v0, the rules file I use with clients, and a private video.</p>
            <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/ebook/" onClick={close}>Get the book for $6.99</Link>
          </aside>
          <Link prefetch={false} className="mx-all" href="/resources/" onClick={close}>
            <span><b>All resources</b><em>Prompts, the ebook, kits and stories in one place</em></span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      )}
    </MegaShell>
  );
}

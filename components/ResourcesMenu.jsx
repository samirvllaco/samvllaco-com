"use client";
import Link from "next/link";
import MegaShell from "./MegaShell";
import { ARTICLES } from "../lib/site";

// "Resources" in the header: writing, the book, free prompts and answers, with the book as the side card.
const ITEMS = [
  ["/writing/", "Insights", "Stories on AI-built apps and the UX fixes behind them.", "M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5"],
  ["/ebook/", "AI slop UI ebook", "27 copy-paste prompts, DESIGN.md and a private video.", "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 5v16M9 7h6", "$6.99"],
  ["/ebook/#free", "Free UI prompts", "Two prompts from the book, free to copy and paste.", "M8 8h11v11H8zM5 16V5h11"],
  ["/#faq", "FAQs", "What founders ask before we start working together.", "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17h.01"],
  ["/products/", "Digital kit", "Rules files and kits that make AI-built apps look finished.", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"],
  ["/building/", "What I'm building", "My own products, designed and shipped in public.", "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"],
];

export default function ResourcesMenu() {
  return (
    <MegaShell id="mega-resources" label="Resources">
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
          <Link prefetch={false} className="mx-all" href="/writing/" onClick={close}>
            <span><b>All insights</b><em>Articles, guides and the prompts behind them</em></span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      )}
    </MegaShell>
  );
}

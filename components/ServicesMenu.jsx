"use client";
import Link from "next/link";
import MegaShell from "./MegaShell";
import CallIcon from "./CallIcon";
import { SERVICES } from "../lib/services";

// "Services" in the header. Opens a wide panel on hover, click or keyboard.

const ITEMS = SERVICES.flatMap((g) => g.items);
// [service id, icon path, one short line]
const FEATURED = [
  ["saas-product-design", "M4 5h16v11H4zM4 9h16M8 20h8M12 16v4", "Web apps, from first flow to final screen."],
  ["dashboard-design", "M4 20V10M10 20V4M16 20v-7M22 20H2", "Dense numbers people can read at a glance."],
  ["ai-product-ux", "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.5L21 18l-1.3.6L19 20l-.7-1.4L17 18l1.3-.5z", "Assistants that feel like part of the product."],
  ["mobile-app-design", "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2", "iOS and Android with native patterns."],
  ["ux-audit", "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21M8 10.5l2 2 3-3.5", "What to fix first, then the redesign."],
  ["design-systems", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "Tokens and components your AI tools follow."],
  ["website-design", "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01", "Marketing sites that explain the product."],
  ["landing-pages", "M12 3v12M7 10l5 5 5-5M5 21h14", "One page, one message, one action."],
];

export default function ServicesMenu() {
  return (
    <MegaShell id="mega-services" label="Services" href="/services/">
      {(close) => (
        <div className="wrap mx-in">
          <div className="mx-main">
            <p className="mx-k">What I design</p>
            <ul className="mx-grid">
              {FEATURED.map(([id, d, short]) => {
                const it = ITEMS.find((x) => x.id === id);
                if (!it) return null;
                return (
                  <li key={id}>
                    <Link prefetch={false} href={`/services/${id}/`} onClick={close}>
                      <i className="tg-ico mx-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>
                      <span><b>{it.name}</b><em>{short}</em></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mx-more">
              <span>Also:</span>
              {SERVICES.map((g) => <Link prefetch={false} key={g.id} href={`/services/#${g.id}`} onClick={close}>{g.title}</Link>)}
            </div>
          </div>
          <aside className="mx-side">
            <div className="mx-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam-sky.webp" width="1891" height="832" alt="Sam Vllaco, product designer" loading="lazy" decoding="async" />
              <span className="mx-live"><i aria-hidden="true" />1 to 2 new projects at a time</span>
            </div>
            <p className="mx-side-t">Not sure what you need?</p>
            <p className="mx-side-p">Tell me what you're building. In 30 minutes I'll point to the screens that will help most.</p>
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a>
          </aside>
          <Link prefetch={false} className="mx-all" href="/services/" onClick={close}>
            <span><b>All 32 services</b><em>Design, development, marketing and SEO</em></span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      )}
    </MegaShell>
  );
}

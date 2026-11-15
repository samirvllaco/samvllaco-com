"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaShell from "./MegaShell";
import { RESOURCES } from "../lib/resources";

// "Resources" in the header: writing, the book, free prompts and answers, then the $99 review + book as one compact row.
// Owner, 15 Nov 2026: the menu shows only Insights and the book.
const ITEMS = RESOURCES.filter((r) => ["/writing/", "/fix-ai-slop-ui/"].includes(r.href)).map((r) => [r.href, r.title, r.text, r.icon]);

export default function ResourcesMenu() {
  const path = (usePathname() || "/").replace(/\/?$/, "/");
  return (
    <MegaShell id="mega-resources" label="Resources" href="/resources/">
      {(close) => (
        <div className="wrap mx-in mx-res">
          <div className="mx-main">
            <div className="mx-k-row"><p className="mx-k">Learn and borrow</p><Link prefetch={false} className="mx-view" href="/resources/" onClick={close}>View all resources<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link></div>
            <ul className="mx-grid">
              {ITEMS.map(([href, t, d, icon]) => (
                <li key={href}>
                  <Link prefetch={false} href={href} aria-current={path === href ? "page" : undefined} onClick={close}>
                    <i className="tg-ico mx-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={icon} /></svg></i>
                    <span><b>{t}</b><em>{d}</em></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </MegaShell>
  );
}

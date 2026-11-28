"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaShell from "./MegaShell";
import { RESOURCE_MENU } from "../lib/resources";

// "Resources" in the header (owner, 28 Nov 2026: back in the nav, without Insights, which has its own link): the book,
// the review, free prompts, the digital kit, the free audit, the Slop Score and the free tools. The label only opens
// the menu, no hub page link (owner, 25 Nov 2026).
const ITEMS = RESOURCE_MENU.map((r) => [r.href, r.title, r.text, r.icon, r.tag]);

export default function ResourcesMenu() {
  const path = (usePathname() || "/").replace(/\/?$/, "/");
  return (
    <MegaShell id="mega-resources" label="Resources">
      {(close) => (
        <div className="wrap mx-in mx-res">
          <div className="mx-main">
            <div className="mx-k-row"><p className="mx-k">Learn and borrow</p></div>
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
          </div>
        </div>
      )}
    </MegaShell>
  );
}

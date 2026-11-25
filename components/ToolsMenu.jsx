"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaShell from "./MegaShell";
import { TOOLS } from "../lib/tools";

// "Free tools" in the header opens on hover like Services and Resources (owner, 25 Nov 2026).
export default function ToolsMenu() {
  const path = (usePathname() || "/").replace(/\/?$/, "/");
  return (
    <MegaShell id="mega-tools" label="Free tools" href="/tools/">
      {(close) => (
        <div className="wrap mx-in mx-res">
          <div className="mx-main">
            <div className="mx-k-row"><p className="mx-k">Free, no sign-up</p><Link prefetch={false} className="mx-view" href="/tools/" onClick={close}>View all tools<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link></div>
            <ul className="mx-grid mx-grid-3">
              {TOOLS.map((t) => {
                const href = t.href || `/tools/${t.slug}/`;
                return (
                  <li key={t.slug}>
                    <Link prefetch={false} href={href} aria-current={path === href ? "page" : undefined} onClick={close}>
                      <i className="tg-ico mx-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={t.icon} /></svg></i>
                      <span><b>{t.name}</b><em>{t.text}</em></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </MegaShell>
  );
}

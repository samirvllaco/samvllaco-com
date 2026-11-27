"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaShell from "./MegaShell";
import { TOOLS } from "../lib/tools";

// "Free tools" in the header opens on hover like Services and Resources (owner, 25 Nov 2026). The label only opens the menu, no hub page link.
// Each tool shows a screen of itself, not an icon (owner, 27 Nov 2026: "free tools should all have screens and thumbnails").
export default function ToolsMenu() {
  const path = (usePathname() || "/").replace(/\/?$/, "/");
  return (
    <MegaShell id="mega-tools" label="Free tools">
      {(close) => (
        <div className="wrap mx-in mx-res">
          <div className="mx-main">
            <div className="mx-k-row"><p className="mx-k">Free, no sign-up</p></div>
            <ul className="mx-grid mx-grid-3 mx-tools">
              {TOOLS.map((t) => {
                const href = t.href || `/tools/${t.slug}/`;
                return (
                  <li key={t.slug}>
                    <Link prefetch={false} href={href} aria-current={path === href ? "page" : undefined} onClick={close}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <span className="mx-thumb"><img src={`/tools/thumb/${t.slug}.webp?v=1`} width="800" height="500" alt="" loading="lazy" decoding="async" /></span>
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

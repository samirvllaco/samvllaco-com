import Link from "next/link";
import PageHead from "../../components/PageHead";
import { TOOLS } from "../../lib/tools";

export const metadata = {
  title: "Free UI/UX Design Tools",
  description: "Free design tools from Sam Vllaco: Slop Score, an automatic AI slop checker for live sites, a WCAG color contrast checker and a website and app design cost calculator.",
  alternates: { canonical: "/tools/" },
};

export default function Tools() {
  return (
    <div className="wrap page pg tl-page">
      <PageHead crumb="Free tools" href="/tools/" a="Free design tools." b="No sign-up." lede="Small tools I use on client work, free to use on yours." />
      <ul className="tl-list">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link prefetch={false} href={t.href || `/tools/${t.slug}/`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="tl-thumb"><img src={`/tools/thumb/${t.slug}.webp?v=2`} width="800" height="500" alt="" loading="lazy" decoding="async" /></span>
              <span><b>{t.name}</b><em>{t.text}</em></span>
              <span className="tl-go">Open the tool <span aria-hidden="true">→</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

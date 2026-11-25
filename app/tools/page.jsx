import Link from "next/link";
import PageHead from "../../components/PageHead";
import { TOOLS } from "../../lib/tools";

export const metadata = {
  title: "Free UI/UX Design Tools",
  description: "Free design tools from Sam Vllaco: Slop Score for live sites, an AI slop UI quiz, a WCAG color contrast checker and a website and app design cost calculator.",
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
              <i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={t.icon} /></svg></i>
              <span><b>{t.name}</b><em>{t.text}</em></span>
              <span className="tl-arr" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

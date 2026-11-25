import Link from "next/link";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import ServicesMenu from "./ServicesMenu";
import ResourcesMenu from "./ResourcesMenu";
import HeaderScroll from "./HeaderScroll";
import BrandFace from "./BrandFace";
import BrandRole from "./BrandRole";
import { EMAIL } from "../lib/site";
import HeadCta from "./HeadCta";
import MobileMenu from "./MobileMenu";

const NAV = [
  { href: "/work/", label: "Work" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/tools/", label: "Free tools" },
  { href: "/about/", label: "About" },
  { href: "/book/", label: "Contact", dot: true },
];

export default function Header() {
  return (
    <header className="site-header">
      <HeaderScroll />
      <a className="top-note" href="/book/">
        <i className="nav-dot" aria-hidden="true" />
        <span className="tn-swap"><span className="tn-a">Low signups, confusing UX, a site that looks cheap? I take design off your problem list. Book a 30-min strategy call</span><span className="tn-b" aria-hidden="true">Book a 30-min strategy call</span></span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <div className="wrap head-row">
        <Link prefetch={false} className="brand-me" href="/">
          <BrandFace />
          <span className="brand-word">Sam</span><span className="sr-only"> Vllaco, home</span>
          <BrandRole />
        </Link>
        <nav className="head-nav" aria-label="Main">
          <ServicesMenu />
          <Link prefetch={false} href="/work/">Work</Link>
          <ResourcesMenu />
          {NAV.filter((n) => n.href !== "/work/").map((n) => (
            <Link prefetch={false} key={n.href} href={n.href}>
              {n.dot ? <i className="nav-dot" aria-hidden="true" /> : null}
              {n.label}
              {n.badge ? <span className="top-badge">{n.badge}</span> : null}
            </Link>
          ))}
        </nav>
        <div className="head-end">
          <SoundToggle />
          <HeadCta />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

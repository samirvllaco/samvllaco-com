import Link from "next/link";
import { SITE, HIRE_URL } from "../lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          {SITE.fullName}. {SITE.tagline}
        </p>
        <div className="foot-links">
          <a href={SITE.links.x} rel="me noopener">X</a>
          <a href={SITE.links.medium} rel="me noopener">Medium</a>
          <a href={SITE.links.dribbble} rel="me noopener">Dribbble</a>
          <a href={SITE.links.ocufuse}>Ocufuse</a>
          <a href={HIRE_URL}>Hire me</a>
          <Link href="/links/">All links</Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import CopyEmail from "./CopyEmail";
import { SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>{SITE.fullName}. {SITE.tagline}</p>
        <div className="foot-links">
          <a href={SITE.links.x} rel="me noopener">X</a>
          <a href={SITE.links.medium} rel="me noopener">Medium</a>
          <a href={SITE.links.ocufuse}>Ocufuse</a>
          <Link href="/links/">All links</Link>
          <CopyEmail />
        </div>
      </div>
    </footer>
  );
}

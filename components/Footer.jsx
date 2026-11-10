import Link from "next/link";
import CopyEmail from "./CopyEmail";
import { SITE, CERTS } from "../lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="certs" role="group" aria-label="Certificates">
          <p className="certs-label">Certified</p>
          <ul>
            {CERTS.map((c) => {
              const body = (
                <>
                  <span className="cert-mark" aria-hidden="true">{c.mark}</span>
                  <span className="cert-text">
                    <span className="cert-title">{c.title}</span>
                    <span className="cert-sub">{c.issuer}{c.year ? ` · ${c.year}` : ""}</span>
                  </span>
                </>
              );
              return (
                <li key={c.title}>
                  {c.href ? (
                    <a className="cert" href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`${c.title}, ${c.issuer}, verify certificate, opens in a new tab`}>{body}</a>
                  ) : (
                    <div className="cert">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
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

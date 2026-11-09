import { SITE } from "../lib/site";

export default function MeetSam() {
  return (
    <section className="meet" aria-labelledby="meet-title">
      <div className="meet-copy">
        <p className="meet-kicker">Meet Sam</p>
        <h2 id="meet-title">Who is Sam Vllaco?</h2>
        <p>
          I am a UI/UX designer from Tirana, Albania. Since 2013 I have designed 10,000+ screens
          for SaaS, fintech, healthcare, legal and cybersecurity products.
        </p>
        <p>
          Now I build my own apps in public, starting with Ocufuse, and share what I learn on{" "}
          <a href={SITE.links.x} rel="me noopener">X</a> and{" "}
          <a href={SITE.links.medium} rel="me noopener">Medium</a>.
        </p>
        <a className="meet-logo" href={SITE.links.ocufuse} aria-label="Ocufuse">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ocufuse/logo-icon-blue-128.webp" alt="" width="40" height="40" />
        </a>
      </div>
      <div className="meet-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam.jpg" alt="Sam Vllaco" width="400" height="400" />
      </div>
    </section>
  );
}

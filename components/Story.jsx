import { SITE } from "../lib/site";

const WORKED = ["Lingopie", "Golf Live", "Zalow", "Ocufuse", "SwissGRC"];

export default function Story() {
  const row = WORKED.map((n) => <span key={n}>{n}</span>);
  return (
    <section className="story stack-lg" aria-label="My story">
      <div className="story-text">
        <p>
          i am <mark className="chip">sam,</mark> a <b>product designer</b> from{" "}
          <s>prizren</s> <span aria-hidden="true">&rarr;</span> <b>tirana</b>.
        </p>
        <p>
          since <b>2013</b> i have designed <b>10,000+ screens</b>. now i build my own apps in
          public, starting with{" "}
          <a className="peek" href={SITE.links.ocufuse}>
            ocufuse
            <span className="peek-card" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ocufuse/logo-icon-blue-128.webp" alt="" width="48" height="48" />
              <span>Eye journal and screen break games</span>
            </span>
          </a>
          , and share the work on{" "}
          <a className="peek" href={SITE.links.x} rel="me noopener">
            x
            <span className="peek-card" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam.jpg" alt="" width="48" height="48" style={{ borderRadius: "50%" }} />
              <span>@samvllaco</span>
            </span>
          </a>
          .
        </p>
      </div>
      <div className="strip" role="group" aria-label="Worked with">
        <b className="strip-label">Worked with</b>
        <div className="strip-track">
          <div className="strip-row">{row}</div>
          <div className="strip-row" aria-hidden="true">{row}</div>
        </div>
      </div>
    </section>
  );
}

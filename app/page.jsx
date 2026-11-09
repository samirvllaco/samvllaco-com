import { SITE, ARTICLES } from "../lib/site";
import Newsletter from "../components/Newsletter";
import OcufuseMark from "../components/OcufuseMark";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap page stack-lg prose">
      <section className="stack">
        <div className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="avatar" src="/sam.jpg" alt="Sam Vllaco" width="96" height="96" />
          <h1>Hey, I am Sam.</h1>
        </div>
        <p className="lede">
          {SITE.tagline} I share what I ship and what I learn, mostly on{" "}
          <a href={SITE.links.x} rel="me noopener">X</a>.
        </p>
      </section>

      <section className="stack">
        <h2>Building</h2>
        <OcufuseMark href="/building/ocufuse/" text="A calm eye journal with screen break games, routines and free tools." cta="Read the build story" />
      </section>

      <section className="stack">
        <h2>Writing</h2>
        {ARTICLES.map((a) => (
          <article className="card" key={a.url}>
            <h3><a href={a.url}>{a.short}</a></h3>
          </article>
        ))}
      </section>

      <Newsletter />

    </div>
  );
}

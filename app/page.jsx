import Link from "next/link";
import { SITE, ARTICLES } from "../lib/site";
import Newsletter from "../components/Newsletter";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap page stack-lg prose">
      <section className="stack">
        <h1>Hey, I am Sam.</h1>
        <p className="lede">
          {SITE.tagline} I share what I ship and what I learn, mostly on{" "}
          <a href={SITE.links.x} rel="me noopener">X</a>.
        </p>
      </section>

      <section className="stack">
        <h2>Building</h2>
        <article className="card">
          <span className="tag">Live</span>
          <h3><Link href="/building/ocufuse/">Ocufuse</Link></h3>
          <p>A calm eye journal with screen break games, routines and free tools.</p>
        </article>
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

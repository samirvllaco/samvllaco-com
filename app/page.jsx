import Link from "next/link";
import { SITE, HIRE_URL, ARTICLES } from "../lib/site";

export const metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap page">
      <section className="stack-lg">
        <div className="stack">
          <p className="eyebrow">Product designer, 10 years in</p>
          <h1>{SITE.tagline}</h1>
          <p className="lede">
            I design products and build apps in public. This is where I share what I am shipping,
            what I write and what I learn along the way.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/building/">See what I am building</Link>
            <a className="btn btn-ghost" href={SITE.links.x} rel="me noopener">Follow on X</a>
          </div>
        </div>

        <div className="stats" aria-label="Experience">
          <div className="stat"><b>10</b><span>years designing products</span></div>
          <div className="stat"><b>10,000+</b><span>screens designed</span></div>
          <div className="stat"><b>50+</b><span>clients served</span></div>
        </div>
      </section>

      <section className="section stack">
        <h2>What I am building</h2>
        <div className="grid">
          <article className="card">
            <span className="tag">Live</span>
            <h3><Link href="/building/ocufuse/">Ocufuse</Link></h3>
            <p>A calm eye journal with screen break games, routines and free tools. I design it, build it and write about it.</p>
            <Link href="/building/ocufuse/">Read the build story</Link>
          </article>
          <article className="card">
            <span className="tag">Planned</span>
            <h3><Link href="/products/">Digital products</Link></h3>
            <p>Rules files, prompts and design kits that help AI-built apps look finished. Starting with what I already use myself.</p>
            <Link href="/products/">See the plan</Link>
          </article>
        </div>
      </section>

      <section className="section stack">
        <h2>Latest writing</h2>
        <div className="grid">
          {ARTICLES.map((a) => (
            <article className="card" key={a.url}>
              <span className="tag">{a.platform}</span>
              <h3><a href={a.url}>{a.short}</a></h3>
              <p>{a.summary}</p>
            </article>
          ))}
        </div>
        <p><Link href="/writing/">All writing</Link></p>
      </section>

      <section className="section stack">
        <h2>Need a designer?</h2>
        <p className="lede">
          I take on a small number of design projects: SaaS, dashboards, fintech, healthcare and
          eCommerce. See selected work and how to get in touch.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/work/">See selected work</Link>
          <a className="btn btn-ghost" href={HIRE_URL}>Hire me</a>
        </div>
      </section>
    </div>
  );
}

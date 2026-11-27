import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import Crumbs from "../../../components/Crumbs";
import CallIcon from "../../../components/CallIcon";
import CaseAside from "../../../components/CaseAside";
import JsonLd from "../../../components/JsonLd";
import ArticleBody from "../../../components/ArticleBody";
import { POSTS } from "../../../lib/articles";
import { TLDR } from "../../../lib/tldr";
import ArticleTools from "../../../components/ArticleTools";
import { parseMd } from "../../../lib/md";
import { SITE } from "../../../lib/site";
import { share, PERSON_ID } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = POSTS[slug];
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.description,
    alternates: { canonical: `/writing/${slug}/` },
    ...share({ title: `${p.metaTitle} | Sam Vllaco`, description: p.description, url: `/writing/${slug}/`, image: p.og, alt: p.cover.alt }),
  };
}

const fmt = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function Article({ params }) {
  const { slug } = await params;
  const p = POSTS[slug];
  if (!p) notFound();
  const blocks = parseMd(fs.readFileSync(path.join(process.cwd(), "content", "writing", `${slug}.md`), "utf8"));
  const lede = blocks[0].t === "p" ? blocks[0].text.replace(/^_|_$/g, "") : p.description;
  const body = blocks[0].t === "p" ? blocks.slice(1) : blocks;
  const words = body.reduce((n, b) => n + (b.text || (b.items || []).join(" ")).split(/\s+/).length, 0);
  const toc = [{ id: "intro", label: "Intro" }, ...body.filter((b) => b.t === "h2").map((b) => ({ id: b.id, label: b.text.replace(/\*\*/g, "") })), { id: "next", label: "Get the prompts" }];
  preload(p.cover.src, { as: "image", fetchPriority: "high" });

  return (
    <div className="wrap page case-wrap art-wrap">
      <article className="case art">
        <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, url: `${SITE.url}/writing/${slug}/`, mainEntityOfPage: `${SITE.url}/writing/${slug}/`, image: `${SITE.url}${p.og}`, datePublished: p.published, dateModified: p.modified, wordCount: words, articleSection: p.category, inLanguage: "en", author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID } }} />
        <Crumbs items={[{ name: "Insights", href: "/writing/" }, { name: p.metaTitle, href: `/writing/${slug}/` }]} />

        <header className="case-head art-head" id="intro">
          <h1>{p.title}</h1>
          <p className="lede">{lede}</p>
          <div className="art-bar">
            <p className="art-meta">By <Link prefetch={false} href="/about/">Sam Vllaco</Link><span aria-hidden="true"> · </span><time dateTime={p.published}>{fmt(p.published)}</time><span aria-hidden="true"> · </span>{p.minutes} min read</p>
            <ArticleTools title={p.title} url={`${SITE.url}/writing/${slug}/`} />
          </div>
        </header>

        {TLDR[slug] ? (
          <aside className="art-tldr" aria-labelledby="tldr-h">
            <p className="art-tldr-h" id="tldr-h"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M10 6h10M10 12h10M10 18h10M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5" /></svg>TL;DR</p>
            <ul>{TLDR[slug].map((t) => <li key={t}>{t}</li>)}</ul>
          </aside>
        ) : null}

        <div className="case-hero art-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.cover.src} width={p.cover.w} height={p.cover.h} alt={p.cover.alt} loading="eager" fetchPriority="high" />
        </div>

        <div className="art-body">
          <ArticleBody blocks={body} post={p} />
        </div>

        <section className="case-section case-close" id="next">
          <h2>Want all 27 prompts?</h2>
          <p>The book has the full system: 27 copy-paste prompts, the DESIGN.md rules file and a private video of me fixing a real AI-built page.</p>
          <div className="btn-row">
            <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/fix-ai-slop-ui/">Get the book</Link>
            <a className="hero2-btn hero2-btn-light" href="/book/">Start a project<CallIcon /></a>
          </div>
        </section>

        <nav className="sv-more art-related" aria-label="Related pages">
          <p className="mx-k">Related</p>
          <ul>{p.related.map(([href, name]) => <li key={href}><Link prefetch={false} href={href}>{name}</Link></li>)}</ul>
        </nav>
      </article>
      <CaseAside items={toc} />
    </div>
  );
}

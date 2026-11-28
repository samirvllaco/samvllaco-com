import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import Crumbs from "../../../components/Crumbs";
import CaseAside from "../../../components/CaseAside";
import JsonLd from "../../../components/JsonLd";
import ArticleBody from "../../../components/ArticleBody";
import { POSTS } from "../../../lib/articles";
import { TLDR } from "../../../lib/tldr";
import ArticleTools from "../../../components/ArticleTools";
import EndMark from "../../../components/EndMark";
import ReadLine from "../../../components/ReadLine";
import { parseMd } from "../../../lib/md";
import { SITE, ARTICLES, articleLink } from "../../../lib/site";
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
  const toc = [{ id: "intro", label: "Intro" }, ...body.filter((b) => b.t === "h2").map((b) => ({ id: b.id, label: b.text.replace(/\*\*/g, "") }))];
  // Related articles (owner, 28 Nov 2026: "add other related articles"): the same category first, then the newest.
  const others = ARTICLES.filter((a) => a.slug && a.slug !== slug);
  const more = [...others.filter((a) => a.category === p.category), ...others.filter((a) => a.category !== p.category)].slice(0, 3);
  preload(p.cover.src, { as: "image", fetchPriority: "high" });

  return (
    <div className="wrap page case-wrap art-wrap">
      <ReadLine />
      <article className="case art">
        <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, url: `${SITE.url}/writing/${slug}/`, mainEntityOfPage: `${SITE.url}/writing/${slug}/`, image: `${SITE.url}${p.og}`, datePublished: p.published, dateModified: p.modified, wordCount: words, articleSection: p.category, inLanguage: "en", author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID } }} />
        <Crumbs items={[{ name: "Insights", href: "/writing/" }, { name: p.metaTitle, href: `/writing/${slug}/` }]} />

        <header className="case-head art-head" id="intro">
          <h1>{p.title}</h1>
          <p className="lede">{lede}</p>
          <div className="art-bar">
            {/* Byline with Sam's photo and icons (owner, 28 Nov 2026: "add my image + icons and improve hierarchy") */}
            <div className="art-by">
              <Link prefetch={false} className="art-by-me" href="/about/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sam-face-144.webp?v=1" width="40" height="40" alt="" />
                <span><b>Sam Vllaco</b><span>UI/UX and product designer</span></span>
              </Link>
              <p className="art-by-facts">
                <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" /></svg><time dateTime={p.published}>{fmt(p.published)}</time></span>
                <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2" /></svg>{p.minutes} min read</span>
              </p>
            </div>
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
        <EndMark kind="article" date={fmt(p.published)} minutes={p.minutes} />

        {/* No call to action at the end of an article (owner, 28 Nov 2026): more articles instead, then the related pages. */}
        <section className="case-section art-more" id="more" aria-labelledby="more-h">
          <h2 id="more-h">More articles</h2>
          <div className="blog-grid art-more-grid">
            {more.map((a) => {
              const l = articleLink(a);
              return (
                <Link prefetch={false} className="blog-card" key={a.slug} href={l.href}>
                  <span className="blog-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.cover} width="1400" height="788" alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="blog-meta"><span>{a.category}</span></span>
                  <span className="blog-title">{a.short}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="sv-more art-related" aria-label="Related pages">
          <p className="mx-k">Related</p>
          <ul>{p.related.map(([href, name]) => <li key={href}><Link prefetch={false} href={href}>{name}</Link></li>)}</ul>
        </nav>
      </article>
      <CaseAside items={toc} hire={false} />
    </div>
  );
}

import ArticleMark from "../../components/ArticleMark";
import Crumbs from "../../components/Crumbs";
import { ARTICLES, SITE } from "../../lib/site";

export const metadata = {
  title: "Writing on AI, Design and Building Apps",
  description:
    "Stories by Sam Vllaco on AI-built apps, UX fixes you can paste into your product, and what he learns shipping software.",
  alternates: { canonical: "/writing/" },
};

export default function Writing() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Writing", href: "/writing/" }]} />
      <div className="stack prose">
        <h1>Writing</h1>
        <p className="lede">
          Practical stories for founders and designers building with AI. Most are on Medium.
        </p>
      </div>
      <div className="product-row">
        {ARTICLES.map((a) => (
          <ArticleMark key={a.url} href={a.url} platform={a.platform} title={a.short} />
        ))}
      </div>
      <p>
        More on <a href={SITE.links.medium} rel="me noopener">Medium</a> and
        shorter posts on <a href={SITE.links.x} rel="me noopener">X</a>.
      </p>
    </div>
  );
}

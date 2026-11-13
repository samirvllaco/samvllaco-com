import WritingGrid from "../../components/WritingGrid";
import PageHead from "../../components/PageHead";
import { ARTICLES, SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";

export const metadata = {
  title: "Writing on AI, Design and Building Apps",
  description:
    "Stories by Sam Vllaco on AI-built apps, UX fixes you can paste into your product, and what he learns shipping software.",
  alternates: { canonical: "/writing/" },
  ...share({ title: "Writing on AI, Design and Building Apps", description: "Stories by Sam Vllaco on AI-built apps and UX fixes you can paste into your product.", url: "/writing/" }),
};

export default function Writing() {
  return (
    <div className="wrap page pg">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Insights by Sam Vllaco", url: `${SITE.url}/writing/`, author: { "@id": PERSON_ID },
        mainEntity: { "@type": "ItemList", itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "BlogPosting", headline: a.title, url: a.url, image: `${SITE.url}${a.cover.split("?")[0]}`, description: a.summary, author: { "@id": PERSON_ID } } })) } }} />
      <PageHead crumb="Insights" href="/writing/" a="Insights" b="on AI, design and building apps" lede="Practical stories for founders and designers building with AI. Most are on Medium." />
      <WritingGrid />
    </div>
  );
}

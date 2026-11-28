import PageHead from "../../components/PageHead";
import JsonLd from "../../components/JsonLd";
import SlopScan from "../../components/slop/SlopScan";
import { SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";

const TITLE = "Slop Score: Free AI Slop Checker for Your Website";
const DESC = "Free AI slop checker and AI-generated website test. Paste your URL, see how AI-generated your site looks, and get the top fixes for Lovable, Cursor and Claude Code.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/slop-score/" },
  ...share({ title: `${TITLE} | Sam Vllaco`, description: DESC, url: "/slop-score/" }),
};


export default function SlopScorePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Slop Score",
    url: `${SITE.url}/slop-score/`,
    description: DESC,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
    creator: { "@id": PERSON_ID },
  };
  return (
    <div className="wrap page pg sx-page">
      <JsonLd data={schema} />
      <PageHead crumb="Slop Score" href="/slop-score/" a="Does your site" b="look AI-generated?" lede="A free AI slop checker. Paste your URL, and in under a minute you get a Slop Score, what's dragging it down, and how to fix it.">
        <SlopScan />
      </PageHead>

      {/* Only the tool (owner, 28 Nov 2026: "Slop Score should only have this, nothing else, so it is simple and user focused"). */}
    </div>
  );
}

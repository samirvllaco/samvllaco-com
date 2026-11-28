import JsonLd from "../../../components/JsonLd";
import { PERSON_ID } from "../../../lib/seo";
import PageHead from "../../../components/PageHead";
import ToolCta from "../../../components/tools/ToolCta";
import DesignMdGen from "../../../components/tools/DesignMdGen";

export const metadata = {
  title: "DESIGN.md Generator for Claude Code, Cursor and Lovable",
  description: "Free DESIGN.md generator. Pick your product type, brand color, font and corners, and copy a DESIGN.md your AI coding tool follows on every screen.",
  alternates: { canonical: "/tools/design-md-generator/" },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DESIGN.md Generator",
  url: "https://samvllaco.com/tools/design-md-generator/",
  description: metadata.description,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  creator: { "@id": PERSON_ID },
};

export default function Page() {
  return (
    <div className="wrap page pg tl-page">
      <JsonLd data={SCHEMA} />
      <PageHead crumb="Free tools" href="/tools/" a="DESIGN.md" b="generator." lede="Answer five questions and copy a DESIGN.md that Claude Code, Cursor, Lovable or v0 follows on every screen." />
      <DesignMdGen />
      <section className="tl-how" aria-labelledby="tl-how-h">
        <h2 id="tl-how-h">How it works</h2>
        <p>A DESIGN.md is a file of exact design rules your AI coding tool reads before it builds any screen: one spacing scale, seven type sizes, one accent color, one corner style, and the empty, loading and error states every screen needs. This generator fills in the template I set up on the AI-built apps I fix, with your values. It runs in your browser and nothing is sent anywhere. For what each rule does and where Claude Code, Cursor, Lovable and v0 read the file, see <a href="/writing/design-md-template/">the DESIGN.md guide</a>.</p>
      </section>
      <ToolCta />
    </div>
  );
}

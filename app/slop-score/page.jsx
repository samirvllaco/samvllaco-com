import CopyEmailInline from "../../components/HirePanelCopy";
import PageHead from "../../components/PageHead";
import JsonLd from "../../components/JsonLd";
import Faq from "../../components/Faq";
import CallIcon from "../../components/CallIcon";
import SlopScan from "../../components/slop/SlopScan";
import { CATS } from "../../slopscore/config";
import { SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";

const TITLE = "Slop Score: Free AI Slop Checker for Your Website";
const DESC = "A free AI slop checker: paste your URL and see how AI-generated your site looks, with the top fixes and copy-paste prompts for Lovable, Cursor and Claude Code.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/slop-score/" },
  ...share({ title: `${TITLE} | Sam Vllaco`, description: DESC, url: "/slop-score/" }),
};

const FAQ = [
  { q: "Is it free?", a: "**Yes.** The score, the top 3 fixes and the accessibility check are free. The full report with every fix and copy-paste prompts is **$5**, one time, and only if you want it." },
  { q: "Do you store my site?", a: "I store the URL, the score and the report. ==Not your page content, not screenshots.== The screenshots are used for the review and then thrown away." },
  { q: "Why is lower better?", a: "It measures slop, so it works like golf: **0 is hand-crafted, 100 is pure AI slop.** Most well-designed sites land under 30." },
  { q: "Can I check a competitor's site?", a: "Yes. Any public URL works. It's a good way to see what a polished site in your space does differently." },
  { q: "Who made this?", a: "Me, Sam Vllaco. I've designed products for 10 years for 573 clients and wrote [the book on fixing AI slop UI](/fix-ai-slop-ui/). Slop Score uses the same rules." },
];

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

      <section className="sub-sec lite sx-what" aria-labelledby="sx-what-h">
        <header className="sub-head">
          <h2 id="sx-what-h">What Slop Score <span className="t2">checks</span></h2>
          <p>Seven things that make a site look generated, each scored from 0 to 100.</p>
        </header>
        <ol className="sub-steps sx-seven">
          {CATS.map((c, i) => <li key={c.k}><i aria-hidden="true">{i + 1}</i><h3>{c.name}</h3><p>{c.d}</p></li>)}
        </ol>
      </section>

      <section className="sv-sec" aria-labelledby="sx-how-h">
        <h2 id="sx-how-h">How the score <span className="t2">works</span></h2>
        <p className="ax-me-p">Measured checks plus an AI review trained on my design rules. The checks count font sizes, grays, spacing values, buttons, gradients and accessibility problems on your live page. The review looks at screenshots like a designer would. It's a good first look, not a replacement for a designer.</p>
      </section>

      <div className="sv-sec sv-faqwrap">
        <Faq items={FAQ} a="Questions" b="about Slop Score" bg="#0e0e10">
          <p className="faq-go"><a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a></p>
          <div className="faq-mail"><CopyEmailInline icon /></div>
        </Faq>
      </div>
    </div>
  );
}

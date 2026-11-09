import Crumbs from "../../components/Crumbs";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Now",
  description: "What Sam Vllaco is working on this month.",
  alternates: { canonical: "/now/" },
};

export default function Now() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Now", href: "/now/" }]} />
      <div className="stack prose">
        <h1>Now</h1>
        <p className="lede">Updated November 2026.</p>
        <ul className="clean">
          <li>Growing Ocufuse: better pages, more tools and a stronger site for search.</li>
          <li>Writing one practical story a week about AI-built apps and UX.</li>
          <li>Building this site and my audience on <a href={SITE.links.x} rel="me noopener">X</a>.</li>
          <li>Taking on a small number of design projects.</li>
        </ul>
      </div>
    </div>
  );
}

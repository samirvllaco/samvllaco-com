import Link from "next/link";
import Crumbs from "../../components/Crumbs";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Digital Products for AI-Built Apps",
  description:
    "Rules files, prompts and design kits that help AI-built apps look finished. What Sam Vllaco is making next.",
  alternates: { canonical: "/products/" },
};

const live = [
  { name: "27 Copy-Paste Prompts to Fix AI Slop UI, $12.99", body: "27 steps and 27 prompts that make an AI-built website or app look designed, plus DESIGN.md and a private video.", href: "/fix-ai-slop-ui/", cta: "See the book" },
  { name: "Personal UI review + the book, $49", body: "A senior designer's honest take on your website, SaaS, web app or mobile app: a 20 to 30 min Loom and a steps document, in under 12 hours.", href: "/fix-ai-slop-ui/#options", cta: "See the review" },
  { name: "Complete UI/UX review + the book, $99", body: "Your whole product reviewed in a 45 min to 1 hour Loom, with a scorecard, an action plan and custom prompts, in under 12 hours.", href: "/fix-ai-slop-ui/#options", cta: "See the review" },
];

const planned = [
  {
    name: "DESIGN.md starter pack",
    body: "A rules file you drop into your project so Claude, Cursor or Codex follow the same colors, spacing and type every time.",
  },
  {
    name: "Prompt pack for finished-looking screens",
    body: "Copy-paste prompts for empty states, forms, pricing pages and dashboards, written with exact values.",
  },
  {
    name: "Figma starter for AI-built apps",
    body: "A small token and component file to design the rules first, then hand them to the AI.",
  },
];

export default function Products() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Products", href: "/products/" }]} />
      <div className="stack prose">
        <h1>Digital products</h1>
        <p className="lede">
          The book and two reviews are available now. Below them is what I plan to release next,
          built from what I already use on my own products.
        </p>
      </div>
      <div className="grid">
        {live.map((p) => (
          <article className="card" key={p.name}>
            <span className="tag">Available</span>
            <h2 style={{ fontSize: "1.2rem" }}>{p.name}</h2>
            <p>{p.body}</p>
            <p><Link prefetch={false} href={p.href}>{p.cta}</Link></p>
          </article>
        ))}
      </div>
      <div className="grid">
        {planned.map((p) => (
          <article className="card" key={p.name}>
            <span className="tag">Planned</span>
            <h2 style={{ fontSize: "1.2rem" }}>{p.name}</h2>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
      <p>
        To hear when the next one is out, follow <a href={SITE.links.x} rel="me noopener">@samvllaco on X</a>.
      </p>
    </div>
  );
}

import Crumbs from "../../components/Crumbs";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Digital Products for AI-Built Apps",
  description:
    "Rules files, prompts and design kits that help AI-built apps look finished. What Sam Vllaco is making next.",
  alternates: { canonical: "/products/" },
};

const planned = [
  {
    name: "AI Slop UI: 25 UX Fixes (book), $1",
    body: "The 25 copy-paste fixes from my Medium story, in one short book you can keep next to your editor. Not on sale yet.",
  },
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
          Nothing is for sale yet. These are the things I plan to release first, built from what I
          already use on my own products.
        </p>
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
        To hear when the first one is out, follow <a href={SITE.links.x} rel="me noopener">@samvllaco on X</a>.
      </p>
    </div>
  );
}

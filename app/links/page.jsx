import Crumbs from "../../components/Crumbs";
import { SITE, HIRE_URL } from "../../lib/site";

export const metadata = {
  title: "Links",
  description: "All the places to find Sam Vllaco: X, Medium, Dribbble, Figma and Ocufuse.",
  alternates: { canonical: "/links/" },
};

const items = [
  { label: "Follow on X", href: SITE.links.x, rel: "me noopener" },
  { label: "Read on Medium", href: SITE.links.medium, rel: "me noopener" },
  { label: "Ocufuse", href: SITE.links.ocufuse },
  { label: "Dribbble", href: SITE.links.dribbble, rel: "me noopener" },
  { label: "Figma portfolio", href: SITE.links.figma, rel: "noopener" },
  { label: "Hire me", href: HIRE_URL },
];

export default function Links() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Links", href: "/links/" }]} />
      <div className="stack prose">
        <h1>Links</h1>
        <p className="lede">{SITE.tagline}</p>
      </div>
      <div className="btn-row" style={{ flexDirection: "column", maxWidth: 420 }}>
        {items.map((i) => (
          <a key={i.label} className="btn btn-ghost" href={i.href} rel={i.rel}>{i.label}</a>
        ))}
      </div>
    </div>
  );
}

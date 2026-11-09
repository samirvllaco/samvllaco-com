import Crumbs from "../../components/Crumbs";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Links",
  description: "Where to find Sam Vllaco: X, Medium and Ocufuse.",
  alternates: { canonical: "/links/" },
};

const items = [
  { label: "Follow on X", href: SITE.links.x, rel: "me noopener" },
  { label: "Read on Medium", href: SITE.links.medium, rel: "me noopener" },
  { label: "Ocufuse", href: SITE.links.ocufuse },
];

export default function Links() {
  return (
    <div className="wrap page stack-lg prose">
      <Crumbs items={[{ name: "Links", href: "/links/" }]} />
      <h1>Links</h1>
      <div className="btn-row" style={{ flexDirection: "column", maxWidth: 420 }}>
        {items.map((i) => (<a key={i.label} className="btn btn-ghost" href={i.href} rel={i.rel}>{i.label}</a>))}
      </div>
    </div>
  );
}

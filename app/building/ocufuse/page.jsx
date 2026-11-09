import Crumbs from "../../../components/Crumbs";
import { SITE } from "../../../lib/site";

export const metadata = {
  title: "Ocufuse: Building a Calm Eye Journal",
  description:
    "The story of Ocufuse, an eye journal with screen break games, routines and free tools, built by Sam Vllaco.",
  alternates: { canonical: "/building/ocufuse/" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ocufuse",
  url: SITE.links.ocufuse,
  applicationCategory: "LifestyleApplication",
  creator: { "@id": `${SITE.url}/#person` },
};

export default function Ocufuse() {
  return (
    <div className="wrap page">
      <Crumbs
        items={[
          { name: "Building", href: "/building/" },
          { name: "Ocufuse", href: "/building/ocufuse/" },
        ]}
      />
      <article className="stack-lg prose">
        <div className="stack">
          <p className="eyebrow">Product</p>
          <h1>Ocufuse</h1>
          <p className="lede">
            A calm eye journal with screen break games, routines and free tools. I am the founder
            and the designer, and I build it in public.
          </p>
          <div className="btn-row">
            <a className="btn btn-primary" href={SITE.links.ocufuse}>Open ocufuse.com</a>
          </div>
        </div>

        <section className="stack">
          <h2>What it is</h2>
          <p>
            Ocufuse is a web app and site for people who spend long days on screens. It helps you
            take breaks, keep a simple daily eye journal and try short games and tools made for
            screen breaks. It does not give medical advice.
          </p>
        </section>

        <section className="stack">
          <h2>Why I am building it</h2>
          <p>
            I design for screens all day. I wanted a small, calm product that makes taking breaks
            feel easy instead of like another task. I use it to test what I teach: clear
            hierarchy, plain words and one primary action per screen.
          </p>
        </section>

        <section className="stack">
          <h2>Follow the build</h2>
          <p>
            I share progress on <a href={SITE.links.x} rel="me noopener">X</a> and write longer
            lessons on <a href={SITE.links.medium} rel="me noopener">Medium</a>. The product
            itself lives at <a href={SITE.links.ocufuse}>ocufuse.com</a>.
          </p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}

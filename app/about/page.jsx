import Crumbs from "../../components/Crumbs";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "About",
  description: "About Sam Vllaco: a designer building apps in public.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <div className="wrap page stack-lg prose">
      <Crumbs items={[{ name: "About", href: "/about/" }]} />
      <h1>About</h1>
      <div className="stack">
        <p>I am Samir Vllaco, known online as Sam. I design products and build my own apps.</p>
        <p>
          My main project is <a href={SITE.links.ocufuse}>Ocufuse</a>. I share the work on{" "}
          <a href={SITE.links.x} rel="me noopener">X</a> and{" "}
          <a href={SITE.links.medium} rel="me noopener">Medium</a>.
        </p>
        <p>
          My design work and portfolio are at <a href={SITE.links.design}>design.samvllaco.com</a>.
        </p>
      </div>
    </div>
  );
}

import Crumbs from "../../components/Crumbs";
import { SITE, HIRE_URL } from "../../lib/site";

export const metadata = {
  title: "About Sam Vllaco",
  description:
    "Sam Vllaco is a product designer with 10 years of experience, 10,000+ screens designed and 50+ clients, now building apps in public.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <div className="wrap page">
      <Crumbs items={[{ name: "About", href: "/about/" }]} />
      <article className="stack-lg prose">
        <h1>About</h1>
        <div className="stack">
          <p>
            I am Samir Vllaco, also known online as Sam. I am a product designer and I have been
            making pixels useful since 2013. In that time I designed more than 10,000 screens for
            over 50 clients across SaaS, dashboards, LegalTech, cybersecurity, fintech, healthcare,
            editorial and eCommerce.
          </p>
          <p>
            Now I build my own apps. My main product is{" "}
            <a href={SITE.links.ocufuse}>Ocufuse</a>, and I share the work in public on{" "}
            <a href={SITE.links.x} rel="me noopener">X</a> and{" "}
            <a href={SITE.links.medium} rel="me noopener">Medium</a>.
          </p>
          <p>
            I am based in Albania and work with clients around the world. Most of my client work is
            under NDA, so I share it in private.
          </p>
        </div>
        <div className="btn-row">
          <a className="btn btn-primary" href={HIRE_URL}>Hire me</a>
          <a className="btn btn-ghost" href={SITE.links.x} rel="me noopener">Follow on X</a>
        </div>
      </article>
    </div>
  );
}

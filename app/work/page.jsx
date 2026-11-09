import Crumbs from "../../components/Crumbs";
import { SITE, HIRE_URL } from "../../lib/site";

export const metadata = {
  title: "Selected Design Work",
  description:
    "Selected product design work by Sam Vllaco: SaaS, dashboards, fintech, healthcare and eCommerce, with 10 years of experience and 10,000+ screens designed.",
  alternates: { canonical: "/work/" },
};

const industries = [
  "SaaS products",
  "Dashboards",
  "LegalTech",
  "Cybersecurity",
  "Fintech",
  "Healthcare",
  "Editorial",
  "eCommerce",
];

export default function Work() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Work", href: "/work/" }]} />
      <div className="stack prose">
        <h1>Selected work</h1>
        <p className="lede">
          Ten years of product design: 10,000+ screens for more than 50 clients. Much of my client
          work is under NDA, so I share it in private on request.
        </p>
      </div>

      <section className="stack">
        <h2>Products I have worked on</h2>
        <div className="grid">
          <article className="card">
            <h3>Lingopie</h3>
            <p>Language learning product with 100k+ users. I did UI and UX as a contractor for a year while the team handled development.</p>
            <a href="https://lingopie.com">lingopie.com</a>
          </article>
          <article className="card">
            <h3>Golf Live</h3>
            <p>A golf app and PGA Show award winner. I designed the main screens and helped with development as part of the team.</p>
            <a href="https://golfliveapp.com">golfliveapp.com</a>
          </article>
          <article className="card">
            <h3>Ocufuse</h3>
            <p>My own product, designed and built end to end.</p>
            <a href={SITE.links.ocufuse}>ocufuse.com</a>
          </article>
        </div>
      </section>

      <section className="stack">
        <h2>Industries</h2>
        <ul className="clean">
          {industries.map((i) => (<li key={i}>{i}</li>))}
        </ul>
      </section>

      <section className="stack">
        <h2>See more</h2>
        <p>
          Case studies and shots are on <a href={SITE.links.dribbble} rel="me noopener">Dribbble</a>{" "}
          and in my <a href={SITE.links.figma} rel="noopener">Figma portfolio</a>.
        </p>
        <div className="btn-row">
          <a className="btn btn-primary" href={HIRE_URL}>Hire me</a>
        </div>
      </section>
    </div>
  );
}

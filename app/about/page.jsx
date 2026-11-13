import fs from "fs";
import path from "path";
import ScrollText from "../../components/ScrollText";
import Link from "next/link";
import SkyPhoto from "../../components/SkyPhoto";
import PageHead from "../../components/PageHead";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "About",
  description: "About Sam Vllaco: a designer building apps in public.",
  alternates: { canonical: "/about/" },
};

const PARTS = [
  { id: "who", a: "Who", b: "I am", text: "I am Samir Vllaco, known online as Sam. I am a product designer with 10 years of experience, helping ambitious teams turn complex ideas into products people understand on the first screen." },
  { id: "work", a: "What", b: "I design", text: "SaaS platforms, AI products, dashboards, mobile apps and the websites that explain them. I take a product from the first flow to the final screen, and I can build the front end too." },
  { id: "build", a: "Why", b: "I ask about revenue first", text: "I build and run my own products on the side, so I know what a wrong screen costs when it is your money. That is why I ask about revenue before I ask about colors." },
  { id: "where", a: "Where", b: "I work", text: "I am based in Tirana and I work with teams in the US, Europe, Canada, Australia and the UAE. US mornings are my afternoons, so we always share working hours." },
];
const has = (id) => ["webp", "png"].find((e) => fs.existsSync(path.join(process.cwd(), "public", "about", `${id}.${e}`)));

export default function About() {
  return (
    <div className="wrap page pg">
      <PageHead crumb="About" href="/about/" a="I design apps." b="I also ship my own." lede="I'm Sam. I help teams turn complicated products into screens people get on the first try. I run my own products too, so I know what a confusing screen costs." />
      <div className="ab-wrap">
      <div className="ab-photo"><SkyPhoto eager /></div>
      <div className="ab">
        {PARTS.map((p) => {
          const ext = has(p.id);
          return (
            <section className="ab-part" key={p.id} aria-labelledby={`ab-${p.id}`}>
              <h2 id={`ab-${p.id}`}>
                {p.a}{" "}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {ext ? <img className="ab-ico" src={`/about/${p.id}.${ext}`} width="160" height="160" alt="" /> : null}
                <span className="t2">{p.b}</span>
              </h2>
              <ScrollText className="ab-text" text={p.text} />
            </section>
          );
        })}
        <p className="ab-end">
          <Link prefetch={false} className="btn btn-primary" href="/book/">Tell me what you're building</Link>
          <span>I share the work on <a href={SITE.links.x} rel="me noopener">X</a> and <a href={SITE.links.medium} rel="me noopener">Medium</a>.</span>
        </p>
      </div>
      </div>
    </div>
  );
}

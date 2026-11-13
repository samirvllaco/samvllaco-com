import fs from "fs";
import path from "path";
import ScrollText from "../../components/ScrollText";
import Link from "next/link";
import SkyPhoto from "../../components/SkyPhoto";
import PageHead from "../../components/PageHead";
import { SITE } from "../../lib/site";
import { share, PERSON_ID } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";

export const metadata = {
  title: { absolute: "About Sam Vllaco, Product Designer" },
  description: "Sam Vllaco (Samir Vllaco) is a product designer in Tirana with 10 years designing SaaS, AI, fintech and health products for teams in the US and Europe.",
  alternates: { canonical: "/about/" },
  ...share({ title: "About Sam Vllaco, Product Designer", description: "10 years designing SaaS, AI, fintech and health products. One designer from first call to handover.", url: "/about/" }),
};

const PARTS = [
  { id: "who", a: "Who", b: "I am", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7", text: "I'm Samir Vllaco, Sam online. For 10 years I've been the designer founders call when the product works but people still don't get it. I make it clear first, then I make it feel good to use.", note: "Glad you found me." },
  { id: "work", a: "What", b: "I design", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", text: "SaaS platforms, AI products, dashboards, mobile apps and the websites that sell them. I take your product from the first flow to the last screen, and I can build the front end too, so nothing gets lost in a handoff.", note: "One person, first call to last file." },
  { id: "build", a: "Why", b: "I ask about revenue first", d: "M4 20V10M10 20V4M16 20v-7M22 20H2", text: "I build and run my own products, so I've paid for a confusing screen with my own money. That's why I ask what you earn before I ask which colors you like.", note: "Pretty is nice. Paid is better." },
  { id: "where", a: "Where", b: "I work", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.5 9h17M3.5 15h17M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18", text: "I live in Tirana and work with teams in the US, Europe, Canada, Australia and the UAE. Your morning is my afternoon, so we always share working hours.", note: "Same hours, half the noise." },
];
const has = (id) => ["webp", "png"].find((e) => fs.existsSync(path.join(process.cwd(), "public", "about", `${id}.${e}`)));

export default function About() {
  return (
    <div className="wrap page pg">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE.url}/about/#page`, url: `${SITE.url}/about/`, name: "About Sam Vllaco", mainEntity: { "@id": PERSON_ID } }} />
      <PageHead crumb="About" href="/about/" a="I design apps." b="I also ship my own." lede="I'm Sam. You built something real, and people still bounce from it. I help teams turn complicated products into screens people get on the first try, and I run my own, so I know what a confusing screen costs." />
      <div className="ab-wrap">
      <div className="ab-photo"><SkyPhoto eager /></div>
      <div className="ab">
        {PARTS.map((p) => {
          const ext = has(p.id);
          return (
            <section className="ab-part" key={p.id} aria-labelledby={`ab-${p.id}`}>
              <h2 id={`ab-${p.id}`}>
                <i className="tg-ico ab-tile" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={p.d} /></svg></i>
                {p.a}{" "}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {ext ? <img className="ab-ico" src={`/about/${p.id}.${ext}`} width="160" height="160" alt="" /> : null}
                <span className="t2">{p.b}</span>
              </h2>
              <div className="ab-body">
                <ScrollText className="ab-text" text={p.text} />
                <p className="ab-note scr">{p.note}</p>
              </div>
            </section>
          );
        })}
        <p className="ab-end">
          <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/book/">Tell me what you're building</Link>
          <span>Or read along on <a href={SITE.links.x} rel="me noopener">X</a> and <a href={SITE.links.medium} rel="me noopener">Medium</a>.</span>
        </p>
      </div>
      </div>
    </div>
  );
}

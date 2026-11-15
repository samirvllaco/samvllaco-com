import fs from "fs";
import path from "path";
import ScrollText from "../../components/ScrollText";
import { MarkerText, Mark } from "../../components/MarkerText";
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

const AB = "#62c1fd";
const PARTS = [
  { id: "who", mark: { p: "people still don't get it", type: "highlight", color: AB }, a: "Who", b: "I am", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7", text: "I'm Samir Vllaco, Sam online. For 10 years I've been the designer founders call when the product works but people still don't get it. I make it clear first, then I make it feel good to use.", note: "Glad you found me." },
  { id: "work", mark: { p: "nothing gets lost in a handoff", type: "underline", color: AB }, a: "What", b: "I design", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", text: "SaaS platforms, AI products, dashboards, mobile apps and the websites that sell them. I take your product from the first flow to the last screen, and I can build the front end too, so nothing gets lost in a handoff.", note: "One person, first call to last file." },
  { id: "build", mark: { p: "the same care", type: "highlight", color: AB }, a: "How", b: "it started", d: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 12 2.5a7 7 0 0 1 7 7C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", text: "I started designing in 2013 in Prizren, Kosovo. Since then I've worked with 573 clients and helped ship products like Lingopie, used by 100,000+ people, and Golf Live, a PGA Show award winner. I still remember the first founder who trusted me with their product, so I give yours the same care.", note: "From Prizren, for builders everywhere." },
  { id: "where", mark: { p: "we always share working hours", type: "underline", color: AB }, a: "Where", b: "I work", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.5 9h17M3.5 15h17M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18", text: "I live in Tirana and work with teams in the US, Europe, Canada, Australia and the UAE. Your morning is my afternoon, so we always share working hours.", note: "Same hours, half the noise." },
];
const has = (id) => ["webp", "png"].find((e) => fs.existsSync(path.join(process.cwd(), "public", "about", `${id}.${e}`)));

export default function About() {
  return (
    <div className="wrap page pg">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE.url}/about/#page`, url: `${SITE.url}/about/`, name: "About Sam Vllaco", mainEntity: { "@id": PERSON_ID } }} />
      <PageHead crumb="About" href="/about/" a="I design apps." b="I also ship my own." />
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
                <ScrollText className="ab-text" text={p.text} mark={p.mark} />
                <p className="ab-note scr">{p.note}</p>
              </div>
            </section>
          );
        })}
        <p className="ab-end">
          <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/book/">Tell me what you're building</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

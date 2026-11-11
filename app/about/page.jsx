import Link from "next/link";
import PageHead from "../../components/PageHead";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "About",
  description: "About Sam Vllaco: a designer building apps in public.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <div className="wrap page pg">
      <PageHead crumb="About" href="/about/" a="I design apps." b="I also ship my own." lede="I'm Sam, a product designer helping ambitious teams turn complex ideas into intuitive digital experiences." />
      <div className="pg-about">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-sky.webp" width="1891" height="832" alt="Sam Vllaco" />
        <div className="pg-prose">
          <p>I am Samir Vllaco, known online as Sam. I design SaaS platforms, AI products, mobile apps and the websites that explain them.</p>
          <p>I have 10 years in product design, I am based in Tirana and I work with teams in the US, Europe, Canada and Australia. I build and run my own products on the side, so I know what a wrong screen costs when it is your money. That is why I ask about revenue before I ask about colors.</p>
          <p>I share the work on <a href={SITE.links.x} rel="me noopener">X</a> and <a href={SITE.links.medium} rel="me noopener">Medium</a>.</p>
          <p><Link className="btn btn-primary" href="/book/">Work with Sam</Link></p>
        </div>
      </div>
    </div>
  );
}

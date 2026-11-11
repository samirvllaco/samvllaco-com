import Link from "next/link";
import BentoGlobe from "./BentoGlobe";
import Toolbox from "./Toolbox";
import { WORK } from "../lib/work";
import { SITE } from "../lib/site";

// Home: main services, then a short bento about Sam. Dark bordered cards.
const Go = ({ children }) => <span className="bx-go">{children} <span aria-hidden="true">→</span></span>;
const TOOLS = ["Figma", "FigJam", "Photoshop", "Illustrator", "After Effects", "Claude", "ChatGPT"];

export function MainServices() {
  return (
    <section className="bx-sec" aria-labelledby="ms-h" data-bg="#000000">
      <h2 id="ms-h">What I do</h2>
      <p className="bx-lede">Four areas, one goal: a product people understand, remember and can find.</p>
      <div className="ms-grid">
        <Link href="/services/#design" className="bx-card ms-card">
          <div className="ms-art ms-design" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={WORK[0].small} width="800" height="600" alt="" loading="lazy" />
          </div>
          <h3>Product design</h3>
        </Link>
        <Link href="/services/#branding" className="bx-card ms-card">
          <div className="ms-art ms-brand" aria-hidden="true"><span className="ms-dots"><i /><i /><i /><i /><i /><i /></span><span className="ms-aa">Aa</span></div>
          <h3>Branding</h3>
        </Link>
        <Link href="/services/#marketing" className="bx-card ms-card">
          <div className="ms-art ms-mkt" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <h3>Marketing design</h3>
        </Link>
        <Link href="/services/#seo" className="bx-card ms-card">
          <div className="ms-art ms-seo" aria-hidden="true"><span className="ms-bar" /><span className="ms-res"><i /><i /><i /></span></div>
          <h3>SEO</h3>
        </Link>
      </div>
    </section>
  );
}

export default function Bento() {
  return (
    <section className="bx-sec" aria-labelledby="bx-h" data-bg="#000000">
      <h2 id="bx-h" className="sr-only">About Sam</h2>
      <div className="bx-grid">
        <div className="bx-stats">
          <div className="bx-card bx-stat"><b>10</b><span>Years of experience</span></div>
          <div className="bx-card bx-stat"><b>50+</b><span>Clients served</span></div>
          <div className="bx-card bx-stat"><b>10,000+</b><span>Screens designed</span></div>
        </div>
        <Link href="/#work" className="bx-card bx-work">
          <div className="bx-mosaic" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {WORK.slice(0, 6).map((w) => <img key={w.slug} src={w.small} width="800" height="600" alt="" loading="lazy" />)}
          </div>
          <p className="bx-cap"><b>Work that speaks for itself</b><Go>See the work</Go></p>
        </Link>
        <Link href="/book/" className="bx-card bx-world">
          <p className="bx-world-t">Based in {SITE.city || "Tirana, Albania"}</p>
          <p className="bx-world-s"><i />Clients in Europe, the USA, Canada and Australia</p>
          <BentoGlobe />
        </Link>
        <div className="bx-card bx-founder">
          <div className="bx-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sam.jpg" width="640" height="640" alt="Sam Vllaco" loading="lazy" />
            <p><b>Sam Vllaco</b><span>Product designer and founder</span></p>
          </div>
          <div className="bx-bio">
            <h3>I design apps. I also ship my own.</h3>
            <p>I'm Sam, a product designer helping ambitious teams turn complex ideas into intuitive digital experiences. I design SaaS platforms, AI products, mobile apps and the websites that explain them.</p>
            <p>I have 10 years in product design, I am based in Tirana and I work with teams in the US, Europe, Canada and Australia. I build and run my own products on the side, so I know what a wrong screen costs when it is your money. That is why I ask about revenue before I ask about colors.</p>
            <Link href="/book/" className="bx-link"><Go>Work with Sam</Go></Link>
            <Link href="/about/" className="bx-link bx-link-2"><Go>More about Sam</Go></Link>
          </div>
        </div>
        <Link href="/writing/" className="bx-card bx-write">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/writing/ai-slop-ui.webp" width="1400" height="788" alt="" loading="lazy" />
          <p className="bx-cap"><b>Things I've learned along the way</b><Go>Read the writing</Go></p>
        </Link>
        <Toolbox />
      </div>
    </section>
  );
}

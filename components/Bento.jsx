import Link from "next/link";
import CallIcon from "./CallIcon";
import BentoGlobe from "./BentoGlobe";
import { WORK } from "../lib/work";

// Bento grid on the home page. Each card is one link.
const Arrow = () => <svg className="bn-arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>;

function Card({ n, label, title, text, href, className = "", children }) {
  return (
    <Link href={href} className={`bn-card ${className}`}>
      {children}
      <div className="bn-copy">
        <p className="bn-label"><span>{n}</span>{label}</p>
        <h3>{title}</h3>
        <p className="bn-text">{text}</p>
      </div>
      <Arrow />
    </Link>
  );
}

export default function Bento() {
  const shots = WORK.slice(0, 6);
  return (
    <section className="bento" aria-labelledby="bento-h" data-bg="#000000">
      <h2 id="bento-h" className="sr-only">About Sam and how to work with him</h2>
      <div className="bn-grid">
        <Card n="01" label="Intro" href="/about/" className="bn-intro" title="Good design is good business." text="I'm Sam, a product designer helping ambitious teams turn complex ideas into intuitive digital experiences." />
        <Card n="02" label="Work" href="/#work" className="bn-work" title="Work that speaks for itself." text="Explore selected websites, SaaS platforms, and digital products I've helped design.">
          <div className="bn-mosaic" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {shots.map((w) => <img key={w.slug} src={w.small} width="800" height="600" alt="" loading="lazy" />)}
          </div>
        </Card>
        <Card n="03" label="Experience" href="/about/" className="bn-exp" title="6+ years in product design." text="From first concept to developer-ready delivery.">
          <p className="bn-big" aria-hidden="true">6+</p>
        </Card>
        <Card n="04" label="Transformations" href="/services/ux-audit/" className="bn-trans" title="Same product. Better experience." text="See how thoughtful design turns cluttered interfaces into experiences that make sense.">
          <div className="bn-ba" aria-hidden="true"><span className="bn-before"><i /><i /><i /><i /><i /><i /></span><span className="bn-to">→</span><span className="bn-after"><i /><i /><i /></span></div>
        </Card>
        <Card n="05" label="Services" href="/services/" className="bn-serv" title="From idea to interface." text="Product design, UX/UI redesigns, design systems, and conversion optimization.">
          <ul className="bn-chips" aria-hidden="true"><li>Product design</li><li>UX/UI redesign</li><li>Design systems</li><li>Conversion</li></ul>
        </Card>
        <Card n="06" label="Process" href="/book/" className="bn-proc" title="No guesswork. No surprises." text="Clear milestones, regular updates, and designs your developers can actually use.">
          <ol className="bn-steps" aria-hidden="true"><li>Call</li><li>Scope</li><li>Design</li><li>Handover</li></ol>
        </Card>
        <Card n="07" label="Writing" href="/writing/" className="bn-write" title="Things I've learned along the way." text="Practical thoughts on product design, UX, AI, and building digital products.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="bn-cover" aria-hidden="true"><img src="/writing/ai-slop-ui.webp" width="1400" height="788" alt="" loading="lazy" /></div>
        </Card>
        <Card n="08" label="About" href="/about/" className="bn-about" title="The person behind the pixels." text="Designer, maker, and someone who cares about the details.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bn-face" src="/sam.jpg" width="96" height="96" alt="" loading="lazy" />
        </Card>
        <Link href="/book/" className="bn-card bn-contact">
          <BentoGlobe />
          <div className="bn-copy">
            <p className="bn-label"><span>09</span>Contact</p>
            <h3>Let's make your product better.</h3>
            <p className="bn-text">I work with teams across Europe, the USA, Canada and Australia. Wherever you are, tell me what you are building.</p>
            <ul className="bn-where" aria-label="Where my clients are"><li>Europe</li><li>USA</li><li>Canada</li><li>Australia</li></ul>
            <span className="btn btn-primary bn-btn"><CallIcon />Schedule a call</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

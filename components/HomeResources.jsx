import Link from "next/link";
import CallIcon from "./CallIcon";
import { TOOLS } from "../lib/tools";

// Home page Resources: only the free tools, each as a card with its screen thumbnail (owner, 28 Nov 2026: "resources
// should be only free tools on homepage with thumbnails"; the tabs with the audit and the ebook were removed the same
// day). Intro on the left like every home section; the whole card is the link.
export default function HomeResources() {
  return (
    <section className="hres" aria-labelledby="hres-h" data-bg="#0e0e10">
      <header className="hres-head">
        <h2 id="hres-h">Free tools <span className="t2">I use on client work</span></h2>
        <p>Quick checks you can run on your own product today. No sign-up and nothing to install.</p>
      </header>
      <ul className="hres-grid">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link prefetch={false} className="hres-card" href={t.href || `/tools/${t.slug}/`}>
              <span className="hres-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/tools/thumb/${t.slug}.webp?v=2`} width="800" height="500" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="hres-body">
                <span className="hres-t">{t.name}<span className="hres-free">Free</span></span>
                <span className="hres-p">{t.text}</span>
                <span className="hres-go">Open the tool<CallIcon /></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

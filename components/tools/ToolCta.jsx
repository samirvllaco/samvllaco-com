import Link from "next/link";
import CallIcon from "../CallIcon";
import { BOOK_URL } from "../../lib/site";

// Shared ending for every free tool: the book for doing it yourself, a call for done with you.
export default function ToolCta() {
  return (
    <section className="tl-cta dark-island" aria-labelledby="tl-cta-h">
      <h2 id="tl-cta-h">Want it fixed, <span className="t2">not just measured?</span></h2>
      <p>Fix it yourself tonight with 27 copy-paste prompts, or book a free call and we fix it together.</p>
      <div className="btn-row">
        <a className="hero2-btn hero2-btn-primary" href={BOOK_URL} target="_blank" rel="noopener">Get the book, $12.99</a>
        <Link prefetch={false} className="hero2-btn hero2-btn-light" href="/book/">Start a project<CallIcon /></Link>
      </div>
    </section>
  );
}

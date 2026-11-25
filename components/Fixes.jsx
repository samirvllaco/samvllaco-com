import CallIcon from "./CallIcon";

// Home page: the four design problems teams bring to Sam, each with his fix and a screen from real work.
const FIXES = [
  { t: "Low conversion", p: "Traffic comes in, but people don't sign up or buy, and you can't tell if it's the page, the offer or the price.", f: "I find where people drop off and redesign the path to yes: one clear message, one clear next step.", img: "upgrade", alt: "Upgrade screen with two plans side by side and one clear button" },
  { t: "Confusing UX", p: "Your product does a lot, but new users get lost and leave before they see the value.", f: "I simplify the flows and the first session, so people reach the good part before they give up.", img: "dashboard", alt: "Marketing dashboard with the key numbers on top and one clear chart" },
  { t: "Looks cheaper than you are", p: "Next to bigger competitors your site looks dated or generic, and buyers and investors notice.", f: "I give it a premium, consistent look that earns trust before anyone reads a word.", img: "store", alt: "Supplements store app with a clean home, product page and cart" },
  { t: "Design that doesn't scale", p: "Every new screen looks a little different, and each release takes your team longer.", f: "I build a design system your developers and AI tools follow, so new features look right the first time.", img: "system", alt: "Three banking app screens built from the same components" },
];

export default function Fixes() {
  return (
    <section className="fixes" aria-labelledby="fx-h" data-bg="#000000">
      <header className="fx-head">
        <h2 id="fx-h">Design stops being <span className="t2">the problem</span></h2>
        <p>Startups and enterprise teams bring me the same four problems. I fix the design side of each one, so when growth stalls you can rule design out and put your energy into product and marketing.</p>
      </header>
      <ol className="fx-list">
        {FIXES.map((x, i) => (
          <li className="fx-row" key={x.img}>
            <span className="fx-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div className="fx-copy">
              <h3>{x.t}</h3>
              <p>{x.p}</p>
              <p className="fx-fix"><b>My fix:</b> {x.f}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/work/fix/${x.img}.webp?v=1`} width="880" height="495" alt={x.alt} loading="lazy" decoding="async" />
          </li>
        ))}
      </ol>
      <div className="fx-go">
        <p>Not sure which one is yours? <em className="scr">I'll tell you on the call.</em></p>
        <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a 30-min strategy call</a>
      </div>
    </section>
  );
}

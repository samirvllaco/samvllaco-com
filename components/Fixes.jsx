import CallIcon from "./CallIcon";

// Home page: the four design problems teams bring to Sam, the problem on the left and his fix on the right.
// No work screens here on purpose: showing finished work next to a problem reads as a contradiction (owner, 25 Nov 2026).
const FIXES = [
  { t: "Low conversion", p: "Traffic comes in, but people don't sign up or buy, and you can't tell if it's the page, the offer or the price.", f: "I find where people drop off and redesign the path to yes: one clear message, one clear next step." },
  { t: "Confusing UX", p: "Your product does a lot, but new users get lost and leave before they see the value.", f: "I simplify the flows and the first session, so people reach the good part before they give up." },
  { t: "Looks cheaper than you are", p: "Next to bigger competitors your site looks dated or generic, and buyers and investors notice.", f: "I give it a premium, consistent look that earns trust before anyone reads a word." },
  { t: "Design that doesn't scale", p: "Every new screen looks a little different, and each release takes your team longer.", f: "I build a design system your developers and AI tools follow, so new features look right the first time." },
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
          <li className="fx-row" key={x.t}>
            <span className="fx-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div className="fx-copy">
              <h3>{x.t}</h3>
              <p>{x.p}</p>
            </div>
            <div className="fx-fix">
              <p className="fx-k"><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i>My fix</p>
              <p>{x.f}</p>
            </div>
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

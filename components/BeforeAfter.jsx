// Before and after: two example screens, drawn in code, showing what the book's prompts change.
// These are demo screens made for the book page, not client or customer work. The label says so.
const PAIRS = [
  {
    k: "Landing page hero",
    steps: ["15 Color system", "18 Ten-word headline", "19 Retire the three boxes", "24 Show the product"],
    before: ["Gradient everywhere, ten colors with no job", "Headline that could sell anything", "Two buttons fighting for the click", "Three emoji cards that say nothing"],
    after: ["Gray base with one accent color", "Says what it does in six words", "One primary button, one quiet link", "A real product screen instead of cards"],
    Before: () => (
      <div className="ba-ui ba-l-b">
        <div className="ba-nav"><i /><i /><i /><b /></div>
        <p className="ba-h">✨ Revolutionize your workflow with AI-powered solutions 🚀</p>
        <p className="ba-s">The next-generation platform that empowers teams to unlock their full potential.</p>
        <div className="ba-btns"><span>Get started</span><span>Learn more</span></div>
        <div className="ba-cards"><div><em>⚡</em><b>Fast</b></div><div><em>🔒</em><b>Secure</b></div><div><em>🧠</em><b>Smart</b></div></div>
      </div>
    ),
    After: () => (
      <div className="ba-ui ba-l-a">
        <div className="ba-nav"><i /><i /><i /><b /></div>
        <p className="ba-k">Invoicing for freelancers</p>
        <p className="ba-h">Send an invoice in 30 seconds</p>
        <p className="ba-s">Pick a client, add hours, hit send. Paid by card or bank.</p>
        <div className="ba-btns"><span>Create an invoice</span><em>See a sample</em></div>
        <div className="ba-shot"><div className="ba-row ba-row-h" /><div className="ba-row" /><div className="ba-row" /><div className="ba-row ba-row-p" /></div>
      </div>
    ),
  },
  {
    k: "Dashboard",
    steps: ["16 Four type sizes", "17 One spacing scale", "20 One icon set", "21 Turn the glow off"],
    before: ["Six cards, all shouting the same", "Glow and a different color per card", "Emoji and mixed icons", "Uneven gaps between cards"],
    after: ["One number that matters, made big", "Calm gray cards, one accent for the trend", "One line icon style", "Every gap on one 8-point scale"],
    Before: () => (
      <div className="ba-ui ba-d-b">
        <div className="ba-tiles">
          {[["💰", "$12,430"], ["👥", "1,204"], ["📈", "+23%"], ["🔥", "98"], ["⭐", "4.8"], ["🎯", "76%"]].map(([e, n]) => <div key={n}><em>{e}</em><b>{n}</b></div>)}
        </div>
      </div>
    ),
    After: () => (
      <div className="ba-ui ba-d-a">
        <div className="ba-main"><span>Revenue this month</span><b>$12,430</b><svg viewBox="0 0 120 32" aria-hidden="true"><path d="M0 26 L20 22 L40 24 L60 15 L80 17 L100 8 L120 5" /></svg></div>
        <div className="ba-sub"><div><span>Clients</span><b>1,204</b></div><div><span>Paid on time</span><b>76%</b></div></div>
      </div>
    ),
  },
];

export default function BeforeAfter() {
  return (
    <section className="eb-sec ba" aria-labelledby="ba-h">
      <h2 id="ba-h">Before and <span className="t2">after</span></h2>
      <p className="eb-why-lede">Same screen, first AI draft on the left, after a few prompts from the book on the right. <em className="scr">Same tool, same afternoon.</em></p>
      <div className="ba-list">
        {PAIRS.map(({ k, steps, before, after, Before, After }) => (
          <article key={k} className="ba-pair">
            <h3>{k}</h3>
            <div className="ba-grid">
              <figure className="ba-fig is-before">
                <div className="ba-frame" aria-hidden="true"><Before /></div>
                <figcaption><span className="ba-tag">Before</span><ul>{before.map((t) => <li key={t}>{t}</li>)}</ul></figcaption>
              </figure>
              <figure className="ba-fig is-after">
                <div className="ba-frame" aria-hidden="true"><After /></div>
                <figcaption><span className="ba-tag">After</span><ul>{after.map((t) => <li key={t}>{t}</li>)}</ul></figcaption>
              </figure>
            </div>
            <p className="ba-steps"><span>Prompts used</span>{steps.map((s) => <b key={s}>{s}</b>)}</p>
          </article>
        ))}
      </div>
      <p className="ba-note">Example screens I made for this page to show the prompts at work. Not client work.</p>
    </section>
  );
}

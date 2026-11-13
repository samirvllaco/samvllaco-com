import CallIcon from "./CallIcon";

// Home page: the problems founders bring to Sam, then a short story and one next step.
export default function PainStory() {
  return (
    <section className="eb-sec eb-feel pain" aria-labelledby="pain-h" data-bg="#111112">
      <h2 id="pain-h">Sound <span className="t2">familiar?</span></h2>
      <ul className="eb-pains">
        <li>People sign up, look around and never come back.</li>
        <li>Your product is great. Your landing page doesn't show it.</li>
        <li>Every new screen looks a little different from the last one.</li>
      </ul>
      <div className="eb-story">
        <p>I've seen this for 10 years, in SaaS, fintech, health and AI. The product is almost never the problem. It just isn't clear yet.</p>
        <p>So I find what confuses people, fix the screens that cost you users, and leave you with a system that keeps it fixed. You talk to me from the first call to the last file.</p>
        <p className="eb-story-sign">Sam</p>
      </div>
      <p className="pain-cta"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Show me what you're building</a><span>30 minutes. You get a fixed price after the call.</span></p>
    </section>
  );
}

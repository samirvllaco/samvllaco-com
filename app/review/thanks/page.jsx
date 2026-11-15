// Where Whop sends buyers after paying for a review (?plan=personal or ?plan=complete).
// The plan line and confetti run in the browser; the rest is static, so the first frame never moves.
import Link from "next/link";
import { EMAIL } from "../../../lib/site";
import { PlanLine, Confetti, DetailsForm } from "../../../components/ReviewThanks";
import CopyEmailInline from "../../../components/HirePanelCopy";

export const metadata = {
  title: "Thank you, your review is booked",
  description: "What happens next after you order a UI/UX review from Sam Vllaco.",
  alternates: { canonical: "/review/thanks/" },
  robots: { index: false, follow: false },
};

const STEPS = [
  { k: "Today", t: "Check your email", d: "Whop sends your receipt. The book is already waiting in your Whop library, so you can start tonight." },
  { k: "Today", t: "I read what you sent", d: "Your link and notes from checkout are saved with your order and reach me straight away. Want to add more, like key screens, a TestFlight invite or a test account? Use the form below. Never send me your real passwords. A test account with demo data is enough." },
  { k: "In under 12 hours", t: "Your Loom arrives", d: "One email with your Loom and your steps document, plus your scorecard, custom prompts and branding tips with the all-inclusive review. You can start fixing the same day." },
];

export default function ReviewThanks() {
  return (
    <div className="wrap page pg rv-ty">
      <Confetti />
      <header className="ph">
        <div className="rv-me">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam-hire.webp?v=2" width="1000" height="1250" alt="Sam Vllaco" fetchPriority="high" />
          <span><b>Sam Vllaco</b>Senior product designer</span>
        </div>
        <h1>Thank you. <span className="t2">I'm on it.</span></h1>
        <p>You built something real, and you trusted me to look at it with you. That means a lot. Here is what happens next.</p>
        <PlanLine />
      </header>
      <ol className="rv-steps">
        {STEPS.map((s, i) => (
          <li key={s.t}>
            <i aria-hidden="true">{i + 1}</i>
            <div>
              <p className="rv-k">{s.k}</p>
              <h2>{s.t}</h2>
              <p>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="rv-box" aria-labelledby="rv-more-h">
        <h2 id="rv-more-h">Check your details <span className="t2">or add more</span></h2>
        <p>Your checkout answers are already saved. Send them here too if you want to see exactly what reached me, or to add anything you forgot.</p>
        <DetailsForm />
      </section>

      <section className="rv-box rv-contact dark-island" aria-labelledby="rv-contact-h">
        <h2 id="rv-contact-h">Questions? <span className="t2">Write to me directly.</span></h2>
        <p>Anything at all, before or after your Loom. I answer every email myself.</p>
        <CopyEmailInline />
        <p className="rv-mail">Or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </section>

      <div className="rv-cta">
        <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/fix-ai-slop-ui/">See the book page</Link>
        <Link prefetch={false} className="hero2-btn hero2-btn-light" href="/">Back to the site</Link>
      </div>
    </div>
  );
}

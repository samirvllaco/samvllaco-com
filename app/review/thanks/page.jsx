// Where Whop sends buyers after paying for a review (?plan=personal or ?plan=complete).
// Static, no script: both turnaround times are shown, so the first frame never changes.
import Link from "next/link";
import { EMAIL } from "../../../lib/site";

export const metadata = {
  title: "Thank you, your review is booked",
  description: "What happens next after you order a UI review from Sam Vllaco.",
  alternates: { canonical: "/review/thanks/" },
  robots: { index: false, follow: false },
};

const STEPS = [
  { k: "Today", t: "Check your email", d: "Whop sends your receipt. The book is already waiting in your Whop library, so you can start tonight." },
  { k: "Today", t: "I read what you sent", d: <>The link and notes from checkout reach me straight away. Want to add more, like key screens, a TestFlight invite or a test account? Reply to your receipt or write to <b>{EMAIL}</b>. Never send me your real passwords. A test account with demo data is enough.</> },
  { k: "In under 12 hours", t: "Your Loom arrives", d: "One email with your Loom and your steps document, plus your scorecard, custom prompts and branding tips with the all-inclusive review. You can start fixing the same day." },
];

export default function ReviewThanks() {
  return (
    <div className="wrap page pg rv-ty">
      <header className="ph">
        <div className="rv-me">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam-hire.webp?v=2" width="1000" height="1250" alt="Sam Vllaco" fetchPriority="high" />
          <span><b>Sam Vllaco</b>Product designer</span>
        </div>
        <h1>Thank you. <span className="t2">I'm on it.</span></h1>
        <p>You built something real, and you trusted me to look at it with you. That means a lot. Here is what happens next.</p>
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
      <div className="rv-cta">
        <Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/fix-ai-slop-ui/">See the book</Link>
        <Link prefetch={false} className="hero2-btn hero2-btn-light" href="/">Back to the site</Link>
      </div>
    </div>
  );
}

import FreeAuditForm from "../../components/FreeAuditForm";
import { share } from "../../lib/seo";

const TITLE = "Free UX audit of your product";
const DESC = "Send a link to your website, web app or mobile app. Sam records a short Loom showing what to fix first in your UX and conversion, and how he would fix it.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/free-audit/" },
  ...share({ title: TITLE, description: DESC, url: "/free-audit/" }),
};

// Free audit (owner, 27 Nov 2026: "create free audit so people land and take free audits on our site, I audit them
// personally and send a Loom and offer fixes"; his reference was only for the idea, not the look).
export default function FreeAudit() {
  return (
    <div className="wrap page pg fa">
      <header className="fa-head">
        <p className="fa-badge"><i aria-hidden="true" />Free, reviewed by me, not a bot</p>
        <h1>I&apos;ll find what&apos;s holding your product back. <span className="t2">For free.</span></h1>
        <p className="fa-lede">Send a link to your website, web app or mobile app. I record a 2 to 3 minute Loom showing what to fix first in your UX and conversion, and how I would fix it.</p>
      </header>
      <FreeAuditForm />
      <ol className="fa-steps" aria-label="How it works">
        <li><b>1</b><span><strong>Send the link</strong>Your product and what bothers you about it.</span></li>
        <li><b>2</b><span><strong>I go through it</strong>Myself, like a new user would, with a designer&apos;s eye.</span></li>
        <li><b>3</b><span><strong>You get a Loom</strong>What to fix first, and how. Keep it and use it.</span></li>
      </ol>
    </div>
  );
}

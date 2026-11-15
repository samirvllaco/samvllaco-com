import PageHead from "../../../components/PageHead";
import ToolCta from "../../../components/tools/ToolCta";
import SlopScore from "../../../components/tools/SlopScore";

export const metadata = {
  title: "AI Slop UI Score: Does Your App Look AI-Generated?",
  description: "Free AI slop UI test. Answer 12 questions about your AI-built app and get a score out of 100 with the exact fixes to make it look designed.",
  alternates: { canonical: "/tools/ai-slop-ui-score/" },
};

export default function Page() {
  return (
    <div className="wrap page pg tl-page">
      <PageHead crumb="Free tools" href="/tools/" a="AI slop UI" b="score." lede="Twelve yes or no questions. See how generated your app looks, and what to fix first." />
      <SlopScore />
      <section className="tl-how" aria-labelledby="tl-how-h">
        <h2 id="tl-how-h">How it works</h2>
        <p>Each question is one of the tells I fix most often in apps built with Cursor, Lovable, Bolt, v0 and Claude: gradient overload, too many fonts, random spacing, unreadable gray text and more. Every yes costs points and shows the fix. Under 60 means visitors can tell it was generated. Nothing is stored or sent anywhere.</p>
      </section>
      <ToolCta />
    </div>
  );
}

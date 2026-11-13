import WritingGrid from "../../components/WritingGrid";
import PageHead from "../../components/PageHead";
import { ARTICLES } from "../../lib/site";

export const metadata = {
  title: "Writing on AI, Design and Building Apps",
  description:
    "Stories by Sam Vllaco on AI-built apps, UX fixes you can paste into your product, and what he learns shipping software.",
  alternates: { canonical: "/writing/" },
};

export default function Writing() {
  return (
    <div className="wrap page pg">
      <PageHead crumb="Insights" href="/writing/" a="Insights" b="on AI, design and building apps" lede="Practical stories for founders and designers building with AI. Most are on Medium." />
      <WritingGrid />
    </div>
  );
}

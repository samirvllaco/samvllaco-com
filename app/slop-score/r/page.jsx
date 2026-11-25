import Crumbs from "../../../components/Crumbs";
import SlopResult from "../../../components/slop/SlopResult";

// The static shell for every result. /slop-score/r/<id> is served by functions/slop-score/r/[id].js,
// which returns this page with the score in the share title; the report itself loads in the browser.
export const metadata = {
  title: "Slop Score result",
  description: "A Slop Score report: how AI-generated this site looks, what's dragging it down and how to fix it.",
  robots: { index: false, follow: true },
};

export default function SlopResultPage() {
  return (
    <div className="wrap page pg sx-page sx-rpage">
      <Crumbs items={[{ name: "Slop Score", href: "/slop-score/" }, { name: "Result", href: "/slop-score/r/" }]} />
      <header className="ph"><h1>Your <span className="t2">Slop Score</span></h1></header>
      <SlopResult />
    </div>
  );
}

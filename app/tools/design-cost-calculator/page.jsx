import PageHead from "../../../components/PageHead";
import ToolCta from "../../../components/tools/ToolCta";
import CostCalc from "../../../components/tools/CostCalc";

export const metadata = {
  title: "Website and App Design Cost Calculator",
  description: "Free design cost calculator. Estimate what your website, app, landing page or brand design costs and how many weeks it takes, from real rates.",
  alternates: { canonical: "/tools/design-cost-calculator/" },
};

export default function Page() {
  return (
    <div className="wrap page pg tl-page">
      <PageHead crumb="Free tools" href="/tools/" a="Design cost" b="calculator." lede="Pick what you are building and get a price range and timeline in seconds, based on real rates." />
      <CostCalc />
      <section className="tl-how" aria-labelledby="tl-how-h">
        <h2 id="tl-how-h">How it works</h2>
        <p>The estimate uses my real pricing: one design sprint week is $1,500. A marketing page takes about a day, an app screen a bit less once the system is set, a brand identity adds about a week and building the front end adds most of the design time again. You see a range, because every product is different. After a short call you get a fixed price in writing.</p>
      </section>
      <ToolCta />
    </div>
  );
}

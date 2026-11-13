import PageHead from "../../components/PageHead";
import WorkGrid from "../../components/WorkGrid";

export const metadata = {
  title: "Work",
  description: "Product design work by Sam Vllaco across SaaS, fintech, health and mobile. Open any project for the case study.",
  alternates: { canonical: "/work/" },
};

export default function Work() {
  return (
    <div className="wrap page pg">
      <PageHead crumb="Work" href="/work/" a="Work" b="that shipped" lede="Products across SaaS, fintech, health and mobile, used by real people. Open any project to see the problem and how I solved it." />
      <section className="work"><WorkGrid /></section>
    </div>
  );
}

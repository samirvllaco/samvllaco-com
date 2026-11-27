import PageHead from "../../components/PageHead";
import WorkGrid from "../../components/WorkGrid";

export const metadata = {
  title: "UI/UX Design Portfolio: App and SaaS Case Studies",
  description: "UI/UX case studies by Sam Vllaco: SaaS dashboards, web apps, mobile apps and marketing sites across law firms, fintech, health, AI and e-commerce.",
  alternates: { canonical: "/work/" },
};

export default function Work() {
  return (
    <div className="wrap page pg pg-work">
      <PageHead crumb="Work" href="/work/" a="Work" b="that shipped" lede="SaaS, law firms, fintech, health and mobile apps. Open a project to see the problem and how I solved it." />
      <section className="work"><WorkGrid /></section>
    </div>
  );
}

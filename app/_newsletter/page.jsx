import Crumbs from "../../components/Crumbs";
import Newsletter from "../../components/Newsletter";

export const metadata = {
  title: "Newsletter",
  description: "A short newsletter from Sam Vllaco about building apps in public.",
  alternates: { canonical: "/newsletter/" },
};

export default function Page() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Newsletter", href: "/newsletter/" }]} />
      <div className="stack prose">
        <h1>Newsletter</h1>
        <p className="lede">What I am building, what worked and what did not. Short and useful.</p>
      </div>
      <div className="prose"><Newsletter /></div>
    </div>
  );
}

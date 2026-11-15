import Crumbs from "../../components/Crumbs";
import OcufuseMark from "../../components/OcufuseMark";

export const metadata = {
  title: "What I Am Building",
  description:
    "The apps and products Sam Vllaco is building in public, with the story behind each one.",
  alternates: { canonical: "/building/" },
};

export default function Building() {
  return (
    <div className="wrap page stack-lg">
      <Crumbs items={[{ name: "Building", href: "/building/" }]} />
      <header className="ph">
        <h1>What I am building</h1>
        <p>
          Everything I ship lives here, with what worked, what did not and what I would do again.
        </p>
      </header>
      <div className="product-row">
        <OcufuseMark href="/building/ocufuse/" text="A calm eye journal with screen break games, routines and free tools." cta="Read the build story" />
      </div>
    </div>
  );
}

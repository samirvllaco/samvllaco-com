import Link from "next/link";
import Crumbs from "../../components/Crumbs";

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
      <div className="stack prose">
        <h1>What I am building</h1>
        <p className="lede">
          Everything I ship lives here, with what worked, what did not and what I would do again.
        </p>
      </div>
      <div className="grid">
        <article className="card">
          <span className="tag">Live</span>
          <h2 style={{ fontSize: "1.4rem" }}><Link href="/building/ocufuse/">Ocufuse</Link></h2>
          <p>A calm eye journal with screen break games, routines and free tools.</p>
          <a href="https://ocufuse.com">Open ocufuse.com</a>
        </article>
      </div>
    </div>
  );
}

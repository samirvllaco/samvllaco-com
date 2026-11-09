import Link from "next/link";

export const metadata = { title: "Page Not Found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="wrap page stack">
      <h1>That page does not exist</h1>
      <p className="lede">The link may be old or mistyped. These pages are a good place to start.</p>
      <div className="btn-row">
        <Link className="btn btn-primary" href="/">Go to the home page</Link>
        <Link className="btn btn-ghost" href="/building/">See what I am building</Link>
      </div>
    </div>
  );
}

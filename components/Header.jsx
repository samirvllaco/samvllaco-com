import Link from "next/link";
import TopNav from "./TopNav";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Sam, home">
          <span className="badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sam.jpg" alt="" width="36" height="36" />
          </span>
          <span>Sam</span>
        </Link>
        <TopNav />
        <p className="avail"><span className="avail-dot" aria-hidden="true" />Online</p>
      </div>
    </header>
  );
}

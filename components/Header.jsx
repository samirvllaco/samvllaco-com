import TopNav from "./TopNav";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap head-row">
        <TopNav />
        <p className="avail"><span className="avail-dot" aria-hidden="true" />Online</p>
      </div>
    </header>
  );
}

// Shared page header: breadcrumbs, a two-tone title and one intro line. Used by Work, Writing, About and Contact.
import Crumbs from "./Crumbs";

export default function PageHead({ crumb, href, a, b, lede, children }) {
  return (
    <>
      <Crumbs items={[{ name: crumb, href }]} />
      <header className="ph">
        <h1>{a} <span className="t2">{b}</span></h1>
        {lede ? <p>{lede}</p> : null}
        {children}
      </header>
    </>
  );
}

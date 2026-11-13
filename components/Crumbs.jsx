import Link from "next/link";

// Visible breadcrumb plus BreadcrumbList schema for search results.
export default function Crumbs({ items }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `https://samvllaco.com${c.href}`,
    })),
  };
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        {all.map((c, i) => (
          <span key={c.href} className="crumb">
            {i > 0 && <svg className="crumb-sep" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            {i < all.length - 1 ? (
              <Link prefetch={false} href={c.href} aria-label={i === 0 ? "Home" : undefined}>
                {i === 0 ? <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 11.200 12 4l8 7.200V20a1 1 0 0 1-1 1h-4.500v-6h-5v6H5a1 1 0 0 1-1-1v-8.800Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg> : c.name}
              </Link>
            ) : <span aria-current="page">{c.name}</span>}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}

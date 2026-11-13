import Link from "next/link";

// Visible breadcrumb plus BreadcrumbList schema for search results.
// Hovering or focusing the home pill opens a compact menu of the main pages.
const QUICK = [
  ["/", "Home", "M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"],
  ["/services/", "Services", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"],
  ["/work/", "Work", "M3 7h18v13H3zM8 7V4h8v3"],
  ["/writing/", "Insights", "M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5"],
  ["/ebook/", "Ebook", "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 5v16M9 7h6", "$6.99"],
  ["/about/", "About", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"],
  ["/book/", "Book a call", "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"],
];
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
              i === 0 ? (
                <span className="crumb-home">
                  <Link prefetch={false} href="/" aria-label="Home">
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 11.200 12 4l8 7.200V20a1 1 0 0 1-1 1h-4.500v-6h-5v6H5a1 1 0 0 1-1-1v-8.800Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                  </Link>
                  <span className="crumb-pop" role="group" aria-label="Go to">
                    <span className="crumb-pop-k">Jump to</span>
                    {QUICK.map(([href, t, d, tag], j) => (
                      <Link prefetch={false} key={href} href={href} style={{ "--j": j }}>
                        <i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>{t}{tag ? <span className="mega-pdf mega-gold">{tag}</span> : null}
                      </Link>
                    ))}
                  </span>
                </span>
              ) : (
                <Link prefetch={false} href={c.href}>{c.name}</Link>
              )
            ) : <span aria-current="page">{c.name}</span>}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}

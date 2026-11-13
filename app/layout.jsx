import LazyExtras from "../components/LazyExtras";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookBand from "../components/BookBand";
import { SITE } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Sam - UI/UX Design Partner",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/sam.jpg", width: 400, height: 400, alt: "Sam Vllaco" }],
  },
  twitter: { card: "summary", images: ["/sam.jpg"], site: SITE.handle, creator: SITE.handle },
  robots: { index: true, follow: true },
  other: { "color-scheme": "dark light" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.fullName,
      alternateName: SITE.name,
      url: SITE.url,
      jobTitle: "Product designer",
      homeLocation: { "@type": "Place", name: "Tirana, Albania" },
      description: SITE.description,
      sameAs: [SITE.links.x, SITE.links.medium, SITE.links.dribbble],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#person` },
    },
  ],
};

// Applies the saved theme before the first paint, so there is no flash.
const THEME_BOOT = `document.documentElement.classList.add("js");try{if(JSON.parse(localStorage.getItem("sv:theme"))==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><link rel="preload" href="/fonts/unbounded-sam.woff2" as="font" type="font/woff2" crossOrigin="" /></head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <BookBand />
        <Footer />
        <div className="edge-blur edge-top" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="edge-blur" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <LazyExtras />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}

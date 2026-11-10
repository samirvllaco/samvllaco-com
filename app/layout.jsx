import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookPopup from "../components/BookPopup";
import SmoothScroll from "../components/SmoothScroll";
import VideoBubble from "../components/VideoBubble";
import Delight from "../components/Delight";
import { SITE } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
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
  other: { "color-scheme": "dark" },
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
      sameAs: [SITE.links.x, SITE.links.medium, SITE.links.dribbble, SITE.links.ocufuse],
      owns: { "@type": "WebSite", name: "Ocufuse", url: SITE.links.ocufuse },
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BookPopup />
        <VideoBubble />
        <Delight />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}

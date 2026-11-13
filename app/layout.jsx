import LazyExtras from "../components/LazyExtras";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookBand from "../components/BookBand";
import { SITE } from "../lib/site";
import { share } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Sam Vllaco: Product Designer for SaaS and AI Products",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  ...share({ title: "Sam Vllaco: Product Designer for SaaS and AI Products", description: SITE.description, url: SITE.url }),
  robots: { index: true, follow: true },
  verification: { google: "cTF2I8D5vrDc_uRlNMciCbaRGVuMYVJehzlbn4wBAqA" },
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
      givenName: "Samir",
      familyName: "Vllaco",
      jobTitle: "Product designer",
      image: `${SITE.url}/og/default.jpg`,
      email: "mailto:hello@samvllaco.com",
      homeLocation: { "@type": "Place", name: "Tirana, Albania" },
      address: { "@type": "PostalAddress", addressLocality: "Tirana", addressCountry: "AL" },
      description: SITE.description,
      knowsAbout: ["Product design", "UI design", "UX design", "SaaS product design", "Dashboard design", "Mobile app design", "Design systems", "AI product UX", "Website design", "Figma", "AI-built app design", "Accessibility"],
      sameAs: [SITE.links.x, SITE.links.medium, SITE.links.dribbble, SITE.links.figma],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: "Sam Vllaco, product design",
      url: SITE.url,
      image: `${SITE.url}/og/default.jpg`,
      description: "Product design for SaaS and AI teams: UI and UX for web and mobile apps, dashboards, design systems, websites and landing pages.",
      founder: { "@id": `${SITE.url}/#person` },
      email: "hello@samvllaco.com",
      address: { "@type": "PostalAddress", addressLocality: "Tirana", addressCountry: "AL" },
      areaServed: ["United States", "Europe", "Canada", "Australia", "United Arab Emirates"],
      sameAs: [SITE.links.x, SITE.links.medium, SITE.links.dribbble],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      alternateName: "samvllaco.com",
      inLanguage: "en",
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

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
  ...share({ title: "Sam Vllaco: App UI/UX Designer for SaaS and AI Products", description: SITE.description, url: SITE.url }),
  robots: { index: true, follow: true },
  verification: { google: "cTF2I8D5vrDc_uRlNMciCbaRGVuMYVJehzlbn4wBAqA", other: { "msvalidate.01": "248C11196A3C1BE249DB82263A6FCF0D" } },
  other: { "color-scheme": "dark light" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.fullName,
      alternateName: [SITE.name, "Samir Vllaço"],
      url: SITE.url,
      givenName: "Samir",
      familyName: "Vllaco",
      jobTitle: "UI/UX and product designer",
      image: `${SITE.url}/og/default.jpg`,
      email: "mailto:sam@samvllaco.com",
      homeLocation: { "@type": "Place", name: "Tirana, Albania" },
      address: { "@type": "PostalAddress", addressLocality: "Tirana", addressCountry: "AL" },
      description: SITE.description,
      knowsAbout: ["Product design", "UI design", "UX design", "SaaS product design", "Dashboard design", "Mobile app design", "Design systems", "AI product UX", "Website design", "Figma", "AI-built app design", "Vibe-coded app design", "AI slop UI", "App UI/UX design", "Landing page design", "Accessibility"],
      sameAs: ["https://www.linkedin.com/in/samirvllaco/", SITE.links.x, SITE.links.medium, SITE.links.dribbble, SITE.links.figma],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: "Sam Vllaco, product design",
      url: SITE.url,
      image: `${SITE.url}/og/default.jpg`,
      description: "Product design for SaaS and AI teams: UI and UX for web and mobile apps, dashboards, design systems, websites and landing pages.",
      founder: { "@id": `${SITE.url}/#person` },
      email: "sam@samvllaco.com",
      address: { "@type": "PostalAddress", addressLocality: "Tirana", addressCountry: "AL" },
      areaServed: ["United States", "Europe", "Canada", "Australia", "United Arab Emirates"],
      sameAs: ["https://www.linkedin.com/in/samirvllaco/", SITE.links.x, SITE.links.medium, SITE.links.dribbble],
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

// One theme only (owner, 22 Nov 2026): clears any theme saved by the old switch.
const THEME_BOOT = `document.documentElement.classList.add("js");try{localStorage.removeItem("sv:theme");sessionStorage.removeItem("sv:theme")}catch(e){}`;
// First open in a session shows a short intro with Sam's mark (owner, 27 Nov 2026, after designme.agency): at least
// .8s, gone at page load or 1.4s at the latest; skipped on later pages, for reduced motion and without JS.
const INTRO_BOOT = `(function(){var h=document.documentElement;try{if(sessionStorage.getItem("sv:intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("no-intro");return}sessionStorage.setItem("sv:intro","1")}catch(e){h.classList.add("no-intro");return}var t=Date.now(),d=0;function go(){if(d)return;d=1;setTimeout(function(){h.classList.add("intro-out");setTimeout(function(){h.classList.add("no-intro")},600)},Math.max(0,800-(Date.now()-t)))}addEventListener("load",go);setTimeout(go,1400)})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT + INTRO_BOOT }} />
        <div className="intro" aria-hidden="true">
          <span className="intro-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sam-face-144.webp?v=1" width="64" height="64" alt="" fetchPriority="high" />
            <svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="38" /></svg>
          </span>
          <span className="intro-word">Sam Vllaco</span>
        </div>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <BookBand />
        <Footer />
        <div className="edge-blur" aria-hidden="true"><i /></div>
        <LazyExtras />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}

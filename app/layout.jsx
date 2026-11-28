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
// Intro (owner, 27 Nov 2026; GSAP version the same day: "using gsap make the onload animation smoother and more creative,
// something that fits my site"). First page of a session only. GSAP loads here and only here; if it is not in within
// 650ms the CSS version runs instead, and a last timer always clears the screen by 2.6s. At the end the photo flies into
// the header avatar while the screen splits, so the two read as one (owner, 28 Nov 2026, after estheet.com); the header
// avatar stays hidden until the intro is gone, then takes over in the same spot.
const INTRO_BOOT = `(function(){var h=document.documentElement;try{if(sessionStorage.getItem("sv:intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("no-intro");return}sessionStorage.setItem("sv:intro","1")}catch(e){h.classList.add("no-intro");return}var t=Date.now(),done=0,gs=0;function off(){h.classList.add("no-intro")}function css(){if(gs||done)return;done=1;h.classList.add("intro-css");setTimeout(function(){h.classList.add("intro-out");setTimeout(off,600)},Math.max(0,1100-(Date.now()-t)))}var fb=setTimeout(css,650);function run(g){if(done)return;clearTimeout(fb);gs=1;done=1;h.classList.add("intro-gs");var tl=g.timeline({defaults:{ease:"expo.out"},onComplete:off});tl.to(".intro-rail",{scaleY:1,duration:.55,stagger:.06,ease:"power3.inOut"},0).to(".intro-line",{scaleX:1,duration:.55,ease:"power3.inOut"},.04).to(".intro-photo",{clipPath:"inset(0% 0% 0% 0% round 8px)",duration:.6},.1).fromTo(".intro-photo img",{scale:1.3},{scale:1,duration:.9},.1).to(".intro-frame rect",{strokeDashoffset:0,duration:.45,ease:"power2.inOut"},.18).to(".intro-handle",{scale:1,duration:.3,stagger:.03,ease:"back.out(2.6)"},.42).to(".intro-tag",{opacity:1,y:0,duration:.35},.46).addLabel("out",.78).add(function(){var f=document.querySelector(".site-header .brand-me img.brand-face"),p=document.querySelector(".intro-photo"),a=p&&p.getBoundingClientRect(),b=f&&f.getBoundingClientRect();if(a&&b&&b.width>4&&b.bottom>0&&b.top<innerHeight){g.to(".intro-frame,.intro-handle,.intro-tag",{opacity:0,duration:.18,ease:"power1.out"});g.to(p,{x:b.left+b.width/2-(a.left+a.width/2),y:b.top+b.height/2-(a.top+a.height/2),scale:b.width/a.width,duration:.6,ease:"expo.inOut"})}else{g.to(".intro-mark,.intro-tag",{scale:.94,opacity:0,duration:.3,ease:"power2.in"})}},"out").to(".intro-rail,.intro-line",{opacity:0,duration:.3,ease:"power1.out"},"out").to(".intro-top",{yPercent:-100,duration:.55,ease:"expo.inOut"},"out+=.06").to(".intro-bot",{yPercent:100,duration:.55,ease:"expo.inOut"},"out+=.06")}var s=document.createElement("script");s.src="/vendor/gsap-3.15.1.min.js";s.async=true;s.onload=function(){window.gsap&&Date.now()-t<650?run(window.gsap):css()};s.onerror=css;document.head.appendChild(s);setTimeout(function(){if(!h.classList.contains("no-intro"))off()},2600)})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT + INTRO_BOOT }} />
        <div className="intro" aria-hidden="true">
          <i className="intro-half intro-top" /><i className="intro-half intro-bot" />
          <i className="intro-rail intro-l" /><i className="intro-rail intro-r" /><i className="intro-line" />
          <span className="intro-mark">
            <span className="intro-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam-face-144.webp?v=1" width="96" height="96" alt="" fetchPriority="high" />
            </span>
            <svg className="intro-frame" viewBox="0 0 113 113" width="113" height="113"><rect x=".75" y=".75" width="111.5" height="111.5" /></svg>
            <i className="intro-handle intro-h1" /><i className="intro-handle intro-h2" /><i className="intro-handle intro-h3" /><i className="intro-handle intro-h4" />
          </span>
          <span className="intro-tag">Sam Vllaco</span>
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

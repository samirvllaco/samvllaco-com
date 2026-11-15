// Services shown in the header mega menu and on /services/. Three focus areas.
// Items marked more: true have their own page and appear on /services/, but stay out of the header menu.
export const SERVICES = [
  {
    id: "design",
    title: "UI/UX Design",
    blurb: "Products people understand on the first screen.",
    items: [
      { id: "saas-product-design", name: "SaaS product design", text: "End to end UI and UX for web apps, from first flow to final screen." },
      { id: "dashboard-design", name: "Dashboards and data visualization", text: "Dense data made readable: KPIs, charts, tables and filters." },
      { id: "ai-product-ux", name: "AI product and assistant UX", text: "Assistants, prompts and AI features that sit inside the workflow." },
      { id: "mobile-app-design", name: "Mobile app design", text: "iOS and Android apps with native patterns and clear navigation." },
      { id: "ux-audit", name: "UX audit and redesign", text: "A prioritized list of what to fix, then the redesigned screens." },
      { id: "design-systems", name: "Design systems", text: "Tokens, components and rules your team and your AI tools can follow." },
      { id: "prototyping-motion", name: "Prototyping and motion", text: "Clickable prototypes and subtle interface animation." },
      { id: "website-design", name: "Website design", text: "Marketing sites that explain the product and look finished." },
      { more: true, id: "ai-app-design-fix", name: "AI-built app design fix", text: "Your Cursor, Lovable or v0 app redesigned so it looks chosen, not generated." },
      { more: true, id: "brand-identity", name: "Brand identity", text: "Color, type, imagery and the rules that hold them together." },
      { more: true, id: "logo-design", name: "Logo design", text: "A mark that works at 16 pixels and on a billboard." },
      { more: true, id: "brand-guidelines", name: "Brand guidelines", text: "One document that keeps every screen and post consistent." },
      { more: true, id: "naming-messaging", name: "Naming and messaging", text: "A name, a tagline and the words that explain what you do." },
      { more: true, id: "pitch-decks", name: "Pitch deck design", text: "Investor and sales decks that make the story easy to follow." },
      { more: true, id: "social-kit", name: "Social media kit", text: "Templates for posts, covers and launch announcements." },
    ],
  },
  {
    id: "development",
    title: "Development",
    blurb: "The design, built and shipped.",
    items: [
      { id: "website-development", name: "Website development", text: "Your design built as a fast, responsive site in Next.js, Webflow or Framer." },
      { id: "web-app-frontend", name: "Web app front end", text: "Screens built in React with the components and states from the design." },
      { id: "landing-page-build", name: "Landing page build", text: "One page, designed and shipped, with analytics and forms connected." },
      { id: "mvp-build", name: "MVP build", text: "A first working version of the product to put in front of users." },
      { id: "design-to-code", name: "Design to code handoff", text: "Tokens, components and specs your developers or AI tools build from." },
      { id: "speed-accessibility", name: "Speed and accessibility", text: "Faster pages, keyboard access and contrast that passes." },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    blurb: "Design that turns visits into signups.",
    items: [
      { id: "landing-pages", name: "Landing pages", text: "Focused pages built around one message and one action." },
      { id: "conversion-optimization", name: "Conversion rate optimization", text: "Find where visitors drop off, then test better versions." },
      { id: "ad-creatives", name: "Ad creatives", text: "Static and animated ads for Google, Meta, LinkedIn and X." },
      { id: "email-design", name: "Email design", text: "Onboarding, newsletter and launch emails that get read." },
      { id: "launch-assets", name: "Product launch assets", text: "Screens, videos and visuals for launch day." },
      { id: "app-store-assets", name: "App store screenshots", text: "Store listings that show the value in the first two frames." },
      { more: true, id: "seo-audit", name: "SEO audit", text: "Technical, content and structure issues, ranked by impact." },
      { more: true, id: "technical-seo", name: "Technical SEO", text: "Speed, structured data, sitemaps and clean page structure." },
      { more: true, id: "on-page-seo", name: "On-page SEO", text: "Titles, headings, internal links and content that match search intent." },
      { more: true, id: "content-strategy", name: "Content strategy", text: "Topics and page plans built from what people search for." },
      { more: true, id: "ai-search", name: "AI search visibility", text: "Pages structured so AI answers can find and cite them." },
      { more: true, id: "seo-page-design", name: "SEO page design", text: "Templates for blogs, comparison pages and free tools." },
    ],
  },
];


// Group pages (owner, 15 Nov 2026). The eight UI/UX services keep their own page. The other 24 were
// near-identical single pages, so each set now lives on one group page, one section per service.
// Old URLs redirect to the matching section in public/_redirects.
export const GROUP_PAGES = {
  brand: {
    name: "Branding",
    tail: "that looks like you, everywhere",
    title: "Brand Identity Design for SaaS and AI Startups",
    description: "Logo, brand identity, guidelines, naming and pitch decks for SaaS and AI products. One designer, one system, every screen and post consistent.",
    lede: "Made for products that look like a different company on every screen. Identity, logo, guidelines, naming, pitch decks and social templates, from one designer.",
    members: ["brand-identity", "logo-design", "brand-guidelines", "naming-messaging", "pitch-decks", "social-kit"],
    work: ["eye-care-marketing-site", "eye-care-ios-app", "law-firm-website"],
  },
  build: {
    name: "Development",
    tail: "built fast and built right",
    title: "Web App and Website Development in Next.js",
    description: "Your design built and shipped: websites, React front ends, landing pages and MVPs, with speed and accessibility checked before launch.",
    lede: "Made for teams with a finished design and nobody to build it properly. Websites, web app front ends, landing pages, MVPs and handoff, built by the designer who drew them.",
    members: ["website-development", "web-app-frontend", "landing-page-build", "mvp-build", "design-to-code", "speed-accessibility"],
    work: ["eye-care-marketing-site", "eye-care-web-app", "law-firm-website"],
  },
  "marketing-design": {
    name: "Marketing design",
    tail: "that turns visits into signups",
    title: "Marketing Design: Ads, Email and Launch Assets",
    description: "Conversion work, ad creatives, email design, app store assets and launch kits for SaaS and AI products, from one designer.",
    lede: "Made for products that get traffic and too few signups. Conversion work, ads, emails, launch assets and app store screenshots.",
    members: ["conversion-optimization", "ad-creatives", "email-design", "launch-assets", "app-store-assets"],
    work: ["law-firm-website", "eye-care-marketing-site", "supplements-store"],
  },
  seo: {
    name: "SEO",
    tail: "so people and AI answers can find you",
    title: "SEO for SaaS and AI Products: Audit and AI Search",
    description: "Technical SEO, on-page work, content strategy and AI search visibility for product companies, run by the designer who builds the pages.",
    lede: "Made for good products stuck on page three. Audits, technical fixes, on-page work, content plans and pages built for search and AI answers.",
    members: ["seo-audit", "technical-seo", "on-page-seo", "content-strategy", "ai-search", "seo-page-design"],
    work: ["eye-care-marketing-site", "law-firm-website", "eye-care-web-app"],
  },
};

const MEMBER_OF = Object.fromEntries(Object.entries(GROUP_PAGES).flatMap(([g, v]) => v.members.map((id) => [id, g])));

// Which group page a service lives on, or undefined when it has its own page.
export const groupOf = (id) => MEMBER_OF[id];

// The link to a service: its own page, or its section on a group page.
export const svcHref = (id) => (MEMBER_OF[id] ? `/services/${MEMBER_OF[id]}/#${id}` : `/services/${id}/`);

// Every URL under /services/ that is a real page.
export const SERVICE_PATHS = [
  ...SERVICES.flatMap((g) => g.items).filter((it) => !MEMBER_OF[it.id]).map((it) => `/services/${it.id}/`),
  ...Object.keys(GROUP_PAGES).map((g) => `/services/${g}/`),
];

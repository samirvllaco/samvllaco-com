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


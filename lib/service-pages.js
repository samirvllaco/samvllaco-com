// Landing page copy for each service: the second half of the headline (shown grey), three pains the visitor
// recognises, and which case studies to show. Facts about Sam stay in lib/site.js and lib/faq.js.
export const PAGES = {
  "saas-product-design": { tail: "people get on the first try", pains: ["New users sign up, click around and never come back.", "Every release adds a screen and the product gets harder to explain.", "Your developers design screens on the fly because nobody else will."], work: ["marketing-dashboard", "freelance-marketplace", "eye-care-web-app"] },
  "dashboard-design": { tail: "that answer a question at a glance", pains: ["Twelve charts on one screen and nobody knows which one matters.", "Customers export everything to a spreadsheet to find the answer.", "Tables that work with 10 rows fall apart at 10,000."], work: ["marketing-dashboard", "eye-care-web-app", "freelance-marketplace"] },
  "ai-product-ux": { tail: "that feels built in, not bolted on", pains: ["The AI feature is a chat box in the corner that few people open.", "Users can't tell whether to trust the answer or how to fix it.", "Loading, errors and empty states were never designed."], work: ["marketing-dashboard", "language-player", "eye-care-web-app"] },
  "mobile-app-design": { tail: "that feels native on every phone", pains: ["The app looks like a website squeezed into a phone.", "People get lost after the third tap and leave.", "iOS and Android each need their own patterns and you have one design."], work: ["mobile-banking", "supplements-store", "trip-planner"] },
  "ai-app-design-fix": { tail: "for apps built with Cursor, Lovable or v0", pains: ["It works, and it still looks like every other AI-built app.", "You prompt \"make it look better\" and get the same purple cards back.", "People sign up, look around and leave without saying why."], work: ["eye-care-web-app", "marketing-dashboard", "freelance-marketplace"] },
  "ux-audit": { tail: "that shows what to fix first", pains: ["You can see the drop-off in analytics but not the reason.", "Everyone on the team has a different opinion on what to change.", "You redesigned once already and the numbers didn't move."], work: ["law-firm-website", "freelance-marketplace", "marketing-dashboard"] },
  "design-systems": { tail: "your team and your AI tools follow", pains: ["Every developer makes buttons a little differently.", "Cursor and Claude generate screens that don't match the rest.", "Small changes take a week because nothing is shared."], work: ["eye-care-web-app", "eye-care-ios-app", "marketing-dashboard"] },
  "prototyping-motion": { tail: "that feels real before it's built", pains: ["Investors and users can't picture the product from static screens.", "Developers guess how an interaction should feel.", "Animations are slow, bouncy or everywhere at once."], work: ["room-editor", "golf-swing-recorder", "language-player"] },
  "website-design": { tail: "that explains the product in one screen", pains: ["Visitors read the hero and still don't know what you sell.", "The site looks like every other template in your space.", "Traffic comes in and the signup button stays quiet."], work: ["eye-care-marketing-site", "law-firm-website", "marketing-dashboard"] },
  "brand-identity": { tail: "that looks like you, everywhere", pains: ["The product, the site and the deck each look like a different company.", "You picked colors and fonts in a hurry before launch.", "Nobody knows which logo file is the right one."], work: ["eye-care-marketing-site", "eye-care-ios-app", "law-firm-website"] },
  "logo-design": { tail: "that works at 16 pixels and on a billboard", pains: ["The logo turns into a blur as an app icon or favicon.", "It was made in an afternoon and it shows.", "There is no version for dark backgrounds."], work: ["eye-care-ios-app", "eye-care-marketing-site", "law-firm-website"] },
  "brand-guidelines": { tail: "in one document anyone can follow", pains: ["The brand lives in one person's head.", "Every new hire and freelancer makes it a little different.", "Posts, decks and screens drift further apart each month."], work: ["eye-care-marketing-site", "eye-care-web-app", "eye-care-ios-app"] },
  "naming-messaging": { tail: "that explains you in one sentence", pains: ["You need a paragraph to explain what the product does.", "Your homepage headline could belong to any company.", "Sales calls go well, the website doesn't."], work: ["eye-care-marketing-site", "law-firm-website", "marketing-dashboard"] },
  "pitch-decks": { tail: "that make the story easy to follow", pains: ["Investors lose the thread by slide six.", "The product looks better in the demo than in the deck.", "Charts and numbers are hard to read on a call."], work: ["marketing-dashboard", "eye-care-web-app", "mobile-banking"] },
  "social-kit": { tail: "so every post looks like one company", pains: ["Every post is designed from scratch at the last minute.", "Your feed looks like five different brands.", "Launch day graphics are always rushed."], work: ["eye-care-marketing-site", "eye-care-ios-app", "supplements-store"] },
  "website-development": { tail: "built fast and built right", pains: ["The design is done and nobody can build it properly.", "The site is slow on phones and nobody knows why.", "Every text change needs a developer."], work: ["eye-care-marketing-site", "law-firm-website", "eye-care-web-app"] },
  "web-app-frontend": { tail: "that matches the design, state by state", pains: ["The built app drifts further from the design every sprint.", "Hover, loading and error states were never built.", "Your backend team is stuck doing CSS."], work: ["eye-care-web-app", "marketing-dashboard", "freelance-marketplace"] },
  "landing-page-build": { tail: "live this week", pains: ["The campaign starts Monday and the page doesn't exist yet.", "Page builders look generic and load slowly.", "Analytics and forms are never connected properly."], work: ["eye-care-marketing-site", "law-firm-website", "marketing-dashboard"] },
  "mvp-build": { tail: "in front of real users, fast", pains: ["You have the idea and the users, but no product to show them.", "An agency quoted months and a budget you don't have.", "The AI-built prototype works, but you can't show it to anyone."], work: ["eye-care-web-app", "golf-swing-recorder", "language-player"] },
  "design-to-code": { tail: "your developers build without guessing", pains: ["Developers message you every hour asking what something should look like.", "Spacing and colors change between Figma and the browser.", "Nobody knows which screen is the latest."], work: ["eye-care-web-app", "eye-care-ios-app", "marketing-dashboard"] },
  "speed-accessibility": { tail: "that loads fast and works for everyone", pains: ["Pages take seconds to load on a phone.", "Some people can't use the site with a keyboard or screen reader.", "Lighthouse is red and you don't know where to start."], work: ["eye-care-marketing-site", "eye-care-web-app", "law-firm-website"] },
  "landing-pages": { tail: "with one message and one action", pains: ["Ads bring clicks and the page loses them.", "The page tries to say everything and says nothing.", "Three buttons compete and nobody presses any."], work: ["law-firm-website", "eye-care-marketing-site", "marketing-dashboard"] },
  "conversion-optimization": { tail: "that turns visits into signups", pains: ["Traffic is up and signups are flat.", "You changed the button color and nothing happened.", "You can't tell which step loses people."], work: ["law-firm-website", "marketing-dashboard", "eye-care-marketing-site"] },
  "ad-creatives": { tail: "with more angles than you can make in house", pains: ["Your ads look like everyone else's in the feed.", "One design, one angle, and it's tired after a week.", "Every size is resized by hand at the last minute."], work: ["eye-care-marketing-site", "supplements-store", "mobile-banking"] },
  "email-design": { tail: "that people read, not just open", pains: ["Opens are fine, clicks are not.", "Emails break in dark mode and on phones.", "Each email is built from scratch in the email tool."], work: ["eye-care-marketing-site", "eye-care-web-app", "supplements-store"] },
  "launch-assets": { tail: "so launch day looks like one campaign", pains: ["The launch is next week and nothing matches.", "Screenshots are raw and don't show the value.", "No video, and launch posts get scrolled past."], work: ["eye-care-ios-app", "eye-care-marketing-site", "marketing-dashboard"] },
  "app-store-assets": { tail: "that show why to install in two frames", pains: ["Your store page shows settings screens instead of the value.", "People land on the listing and don't install.", "Every device size needs its own export."], work: ["eye-care-ios-app", "mobile-banking", "supplements-store"] },
  "seo-audit": { tail: "that shows why you don't rank yet", pains: ["Good product, good content, and still page three.", "Nobody can say which fix would matter most.", "You hear a new SEO rule every week."], work: ["eye-care-marketing-site", "law-firm-website", "eye-care-web-app"] },
  "technical-seo": { tail: "so Google and AI can read every page", pains: ["Pages are missing from Google months after launch.", "The site is slow and Core Web Vitals are red.", "No structured data, so search results look plain."], work: ["eye-care-marketing-site", "law-firm-website", "eye-care-web-app"] },
  "on-page-seo": { tail: "that matches what people search for", pains: ["The page targets a keyword and still doesn't rank.", "Titles and headings were written for the team, not for search.", "Pages compete with each other for the same query."], work: ["law-firm-website", "eye-care-marketing-site", "eye-care-web-app"] },
  "content-strategy": { tail: "built from what people search for", pains: ["You want to publish but don't know which topics are worth it.", "The blog has posts and no readers.", "Content and product pages don't link to each other."], work: ["eye-care-marketing-site", "law-firm-website", "marketing-dashboard"] },
  "ai-search": { tail: "so ChatGPT and Perplexity cite you", pains: ["People ask AI tools about your category and you're not in the answer.", "Competitors get named and you don't.", "Your pages are hard for AI to quote."], work: ["eye-care-marketing-site", "law-firm-website", "marketing-dashboard"] },
  "seo-page-design": { tail: "that rank and still look designed", pains: ["SEO pages look like walls of text next to your product.", "Comparison and tool pages were never designed.", "Pages rank but nobody clicks through to sign up."], work: ["eye-care-marketing-site", "law-firm-website", "marketing-dashboard"] },
};

// Icons for the "What you get" cards, by position.
export const GET_ICONS = [
  "M4 4h16v16H4zM4 9h16M9 20V9",
  "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z",
  "M12 3v12M7 10l5 5 5-5M5 21h14",
];

// Icons for the pain cards, by position.
export const PAIN_ICONS = [
  "M12 9v4M12 17h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.5M18 14.5c1.8.8 3 2.7 3 5.5",
];

// Per-service questions on top of the shared ones.
export const SVC_FAQ = [
  { q: "How much does it cost?", a: "Projects usually start at **$1,000**. After the first call you get ==a fixed price and a timeline in writing==, so there are no surprises. Smaller budget? Start with [the $12.99 ebook](/fix-ai-slop-ui/), [a 30-min UI/UX review from $49](/fix-ai-slop-ui/#options), or [message me](/book/) and I will find what fits." },
  { q: "How fast can you start?", a: "Usually within **one to two weeks** of the first call. I take 1 or 2 new projects at a time, so ==yours gets my full attention==." },
  { q: "Who will I work with?", a: "**Only me.** I take the call, do the work and hand over the files myself. ==No account managers and no junior handoffs.==" },
  { q: "What do I get at the end?", a: "Organized files, components and notes your team can build from. ==You own all of it.==" },
];

// Search titles, descriptions and two page-specific questions for each service that has its own page (15 Nov 2026).
// The title is what shows in Google, so it uses the words people type. The H1 on the page stays as designed.
// The questions go first in the FAQ, so every page carries its own FAQ instead of the same four.
export const SEO = {
  "saas-product-design": {
    title: "SaaS Product Designer for Web Apps",
    desc: "Hire a SaaS product designer for your web app. Every flow designed end to end, from signup to settings, by one designer. Fixed price after a 30-minute call.",
    alt: "SaaS UI/UX designer",
    faq: [
      { q: "Do you design a SaaS product from scratch, or only redesign one?", a: "Both. A new product starts with the main flows, then every screen and state. An existing one starts with ==what is already built==, so nothing your users rely on is thrown away." },
      { q: "Can you work with my developers?", a: "Yes. They get organized Figma files, components with every state, and notes to build from. If you have no front end developer, I can [build it too](/services/build/#web-app-frontend)." },
    ],
  },
  "dashboard-design": {
    title: "Dashboard Designer for SaaS and Data Products",
    desc: "Dashboard UI design that makes dense data readable: KPIs, charts, tables and filters people understand at a glance. Fixed price after a 30-minute call.",
    alt: "Dashboard UI designer",
    faq: [
      { q: "What do you need from me to design a dashboard?", a: "The questions people open it to answer, and **real sample data**, including the long names, the zeros and the empty rows. ==A dashboard designed on perfect data breaks on day one.==" },
      { q: "Can you redesign a dashboard without rebuilding it?", a: "Usually, yes. Most of the gain comes from hierarchy, grouping and table design, and those fit the components you already have." },
    ],
  },
  "ai-product-ux": {
    title: "AI Product Designer: UX for AI Apps and Assistants",
    desc: "UX design for AI products, assistants and AI features that sit inside the workflow instead of a chat box bolted on. Fixed price after a 30-minute call.",
    alt: "Designer for AI apps",
    faq: [
      { q: "Is an AI feature always a chat box?", a: "No. Chat is one pattern. Often the better design is an AI action inside the screen people already use: a drafted reply, a suggested filter, a summary above the table. ==The feature should save a step, not add a window.==" },
      { q: "My app was built with AI tools and looks generic. Is this the right service?", a: "That is a different job. See the [AI-built app design fix](/services/ai-app-design-fix/), or start with [the 25 fixes I wrote up](/writing/ai-slop-ui-fixes/)." },
    ],
  },
  "mobile-app-design": {
    title: "Mobile App UI/UX Designer for iOS and Android",
    desc: "Hire an app UI/UX designer for your iOS or Android app: native patterns, clear navigation and every screen and state designed. Fixed price after a 30-minute call.",
    alt: "App UI/UX designer",
    faq: [
      { q: "Do you design for both iOS and Android?", a: "Yes. One design, with each platform's own navigation, controls and gestures where they differ, so the app ==feels native on both==." },
      { q: "Can you design the App Store screenshots too?", a: "Yes. [App Store and Play Store assets](/services/marketing-design/#app-store-assets) are a separate service you can add." },
    ],
  },
  "ux-audit": {
    title: "UX Audit and App Redesign: Fix Your App Design",
    desc: "A UX audit that shows what to fix first, then the redesigned screens. For apps and sites that work but feel hard to use. Fixed price after a 30-minute call.",
    alt: "App design fix",
    faq: [
      { q: "What does the UX audit include?", a: "A review of your main flows, a prioritized list of issues with the reason for each, ==redesigned versions of the screens that matter most==, and a short plan for what to fix first." },
      { q: "Can you fix the design of an app built with Cursor, Lovable or v0?", a: "Yes. That has its own page: the [AI-built app design fix](/services/ai-app-design-fix/). For a smaller start, a [30-minute UI/UX review](/fix-ai-slop-ui/#options) is from $49." },
    ],
  },
  "design-systems": {
    title: "Design System Designer for Teams and AI Tools",
    desc: "Design systems with tokens, components and written rules that your team and your AI coding tools can follow. Fixed price after a 30-minute call.",
    alt: "Design system designer",
    faq: [
      { q: "Will Cursor or Claude Code follow the design system?", a: "That is what it is built for. The rules come as a **DESIGN.md** file, and the tokens have the same names in Figma and in code, so the tool reads them before it generates a screen." },
      { q: "We already have components. Do we start over?", a: "No. I audit what exists, keep what works and close the gaps. ==Refine, not replace.==" },
    ],
  },
  "website-design": {
    title: "Website Designer for SaaS and AI Products",
    desc: "Website design for SaaS and AI products: a marketing site that explains what you sell in the first screen and looks finished. Fixed price after a 30-minute call.",
    alt: "SaaS website designer",
    faq: [
      { q: "Do you build the website as well as design it?", a: "Yes, on request, in Next.js, Webflow or Framer. See [website development](/services/build/#website-development)." },
      { q: "Do you write the words too?", a: "I shape the headlines and the page structure with you, one message per section. Full [naming and messaging](/services/brand/#naming-messaging) is a separate service." },
    ],
  },
  "prototyping-motion": {
    title: "Prototyping and Motion Design for Apps",
    desc: "Clickable Figma prototypes and interface motion for apps: test an idea, pitch it, or show developers exactly how it should feel. Fixed price after a 30-minute call.",
    alt: "Prototype and motion designer",
    faq: [
      { q: "Is the prototype built in Figma or in code?", a: "A clickable Figma prototype of the main flow by default. It is the fastest way to test an idea or show it to investors." },
      { q: "Can developers build from the motion specs?", a: "Yes. Each animation comes with its timing, easing and order written down, so nobody has to guess how it should feel." },
    ],
  },
  "landing-pages": {
    title: "Landing Page Designer for SaaS and AI Products",
    desc: "Hire a landing page designer for your SaaS or AI product: one page built around one message and one action, for launches, ads and campaigns.",
    alt: "Landing page designer",
    faq: [
      { q: "What makes a landing page convert?", a: "One message and one action. The first screen says what the product does, who it is for and what to do next. ==Everything else on the page supports that one step.==" },
      { q: "Do you build the landing page too?", a: "Yes, on request. See [landing page build](/services/build/#landing-page-build)." },
    ],
  },
  "ai-app-design-fix": {
    title: "Vibe-Coded App Designer: Fix Your AI App Design",
    desc: "A designer for your vibe-coded app. Built it with Cursor, Lovable or v0 and it looks like AI slop? I fix the design and leave rules your AI tool follows.",
    alt: "Designer for vibe-coded apps",
    faq: [
      { q: "Which tools does this work with?", a: "Any app built with Cursor, Claude Code, Lovable, v0, Bolt or Replit. The fixes are design decisions, so they apply ==whatever generated the code==." },
      { q: "Do I have to rebuild my app?", a: "No. The structure stays. What changes is spacing, type, color, states and copy, which is where an AI-built app gives itself away. The reasons are in [the 25 fixes](/writing/ai-slop-ui-fixes/)." },
      { q: "Who can fix the design of my Lovable app?", a: "A product designer who works on the layer people see and leaves the rest alone. That is this service: I fix spacing, type, color, states and copy in the app you already have, then leave a **DESIGN.md** your AI tool follows, so it doesn't drift back. ==Your data, sign-in and logic stay where they are.==" },
      { q: "Can you fix my app's design without breaking it?", a: "Yes. I change one screen at a time, starting with sign up, onboarding and the main screen, and check the app after each one. ==Nothing in the backend changes.==" },
      { q: "Do I need to move my app out of Lovable, Bolt or Cursor?", a: "No. You keep building where you build now. The design rules go into the tool's own instructions, Project settings in Lovable or AGENTS.md and project rules in Cursor, so every new screen follows them." },
      { q: "What don't you fix?", a: "Backend bugs, databases, payments and security reviews. Those need a developer, and I will say so on the first call. ==I fix how the app looks and how people move through it.==" },
    ],
  },
};

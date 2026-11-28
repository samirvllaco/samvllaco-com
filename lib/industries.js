// Industry landing pages at /for/<id>/ and the "Who I work with" column of the Services menu (owner, 27 Nov 2026:
// "target law firms, healthcare, SaaS, fintech, companies that won Y Combinator ... make all feel heard").
// Pains are written the way founders and partners say them on calls. Work lists only real case studies from lib/work.js.
// Never claim a client in an industry that the work list doesn't show.
export const INDUSTRIES = [
  {
    id: "saas",
    name: "SaaS and B2B",
    icon: "M4 5h16v11H4zM4 9h16M8 20h8M12 16v4",
    tail: "for SaaS and B2B teams",
    eyebrow: "SaaS and B2B",
    lede: "You have a product that works and customers who pay. The screens just make it harder than it should be: trials stall, support answers the same questions, and every release adds clutter.",
    pains: ["Trials sign up and never get to the moment it clicks.", "Customers ask support for numbers that are already on screen.", "Every new feature makes the app a little messier.", "The demo looks dated next to the competitor you lose deals to."],
    help: ["saas-product-design", "dashboard-design", "ux-audit", "design-systems", "website-design"],
    work: ["marketing-dashboard", "freelance-marketplace", "room-editor"],
    faq: [
      { q: "Can you work inside our existing design system?", a: "Yes. I start from your components and tokens, and only add or change what the new screens need. If there is no system yet, I set one up as part of the work." },
      { q: "Do we need to rebuild to fix the UX?", a: "Usually not. Most of what slows people down is layout, wording and states, which your developers can change screen by screen without a rebuild." },
    ],
  },
  {
    id: "ai-startups",
    name: "AI startups",
    icon: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.5L21 18l-1.3.6L19 20l-.7-1.4L17 18l1.3-.5z",
    tail: "for AI startups",
    eyebrow: "AI products",
    lede: "The model is good. People still try it once and drift back to how they worked before. That gap is usually design: where the AI shows up, how it waits, and whether people can trust what it says.",
    pains: ["Usage spiked at launch, then dropped within a month.", "The AI lives in a chat box that most people never open.", "Users don't trust the answers, so they check everything twice.", "We built it fast with Cursor or Lovable, and it looks like every other AI app."],
    help: ["ai-product-ux", "ai-app-design-fix", "saas-product-design", "design-systems", "landing-pages"],
    work: ["marketing-dashboard", "freelance-marketplace", "eye-care-web-app"],
    faq: [
      { q: "Do you only design chat interfaces?", a: "No. Chat is one pattern of many. I often move the AI into the screen people already use: inline drafts, summaries, suggested next steps and quiet automation." },
      { q: "Our app was built with AI tools. Can you work with that?", a: "Yes. I redesign what is there and write the rules into a file your AI tools read, so new screens keep the same look." },
    ],
  },
  {
    id: "fintech",
    name: "Fintech",
    icon: "M3 7h18v12H3zM3 11h18M7 15h4",
    tail: "for fintech products",
    eyebrow: "Fintech",
    lede: "Money products live or die on trust. People need to feel safe in the first screen, understand every number, and finish sign-up without giving up halfway through the checks.",
    pains: ["People drop off in the middle of sign-up and verification.", "The numbers are right, but they don't feel trustworthy.", "Dense data gets cramped and hard to read on a phone.", "It looks like a template, not something you'd hand your money to."],
    help: ["mobile-app-design", "dashboard-design", "ux-audit", "design-systems", "website-design"],
    work: ["mobile-banking", "marketing-dashboard"],
    faq: [
      { q: "Can you design around compliance steps like KYC?", a: "Yes. I can't change what the rules require, but I can design the order, wording and progress so fewer people give up halfway." },
      { q: "Do you design for iOS and Android?", a: "Yes, with the native patterns of each, plus the web app or dashboard that goes with them." },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
    tail: "for healthcare products",
    eyebrow: "Healthcare and health tech",
    lede: "Patients and clinicians are busy, stressed or both. The product has to be calm, clear and usable by everyone, including people on a small phone, with tired eyes or a screen reader.",
    pains: ["Patients can't find how to book, so they call instead.", "Forms are long and feel like paperwork.", "The site doesn't feel trustworthy enough for health decisions.", "We aren't sure how accessible the product really is."],
    help: ["mobile-app-design", "website-design", "ux-audit", "speed-accessibility", "saas-product-design"],
    work: ["eye-care-web-app", "eye-care-ios-app", "eye-care-marketing-site"],
    faq: [
      { q: "Do you design for accessibility?", a: "Yes. I design for contrast, text size, keyboard use and screen readers, and I test with VoiceOver and NVDA. I don't give legal advice on compliance." },
      { q: "Have you built health products yourself?", a: "Yes. I design and run my own eye care app on web and iPhone, so I know the trade-off between a calm screen and one that says enough." },
    ],
  },
  {
    id: "law-firms",
    name: "Law firms",
    icon: "M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6zM8 21h8",
    tail: "for law firms",
    eyebrow: "Law firms",
    lede: "Someone just had the worst week of their year and is comparing three firms on their phone. Your site has a few seconds to look credible, make the case and get them to call.",
    pains: ["Our site looks like every other firm's.", "Most calls come from directories, not from our own site.", "People start the intake form and never finish it.", "On a phone, the number and the next step are hard to find."],
    help: ["website-design", "landing-pages", "conversion-optimization", "speed-accessibility", "seo-audit"],
    work: ["law-firm-website"],
    faq: [
      { q: "Do you write the copy too?", a: "I write the structure and the key lines: the headline, the case for the firm and the calls to action. Practice area pages can come from you or your writer." },
      { q: "Can you work with our current website platform?", a: "Yes. I design for what you have, or build it in Next.js or Webflow if you are moving." },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: "M5 7h14l-1.5 9h-11zM8 7a4 4 0 0 1 8 0M9 20h.01M16 20h.01",
    tail: "for e-commerce brands",
    eyebrow: "E-commerce",
    lede: "Traffic is expensive. When people add to cart and leave, or bounce from a product page with unanswered questions, you pay for it twice.",
    pains: ["Visitors add to cart and leave.", "Product pages don't answer the questions people ask before buying.", "Checkout takes too many steps on a phone.", "The brand looks cheaper than the product really is."],
    help: ["website-design", "conversion-optimization", "landing-pages", "mobile-app-design", "brand-identity"],
    work: ["supplements-store"],
    faq: [
      { q: "Do you work on Shopify stores?", a: "Yes. I design the store and the key templates, and your developer or theme partner builds them. I can also build landing pages myself." },
      { q: "Where do you start?", a: "With your numbers: where people drop off between the product page, the cart and checkout. I fix the biggest leak first." },
    ],
  },
  {
    id: "funded-startups",
    name: "YC and funded startups",
    icon: "M12 3v12M7 10l5 5 5-5M5 21h14",
    tail: "for YC and funded startups",
    eyebrow: "Startups after a raise",
    lede: "You just raised, from Y Combinator or a seed round, and the product now has to look like the company in the pitch. You need senior design fast, without hiring a full team first.",
    pains: ["We raised, and the product still looks like the first prototype.", "Engineers are designing screens between other work.", "New users and future hires judge us in the first five seconds.", "We need to ship fast and can't wait months for an agency."],
    help: ["saas-product-design", "mvp-build", "design-systems", "website-design", "pitch-decks"],
    work: ["marketing-dashboard", "mobile-banking", "eye-care-web-app"],
    faq: [
      { q: "Can you start this week?", a: "Often, yes. I take one or two projects at a time, so book a call and I'll tell you the exact start date." },
      { q: "Can you set us up so our engineers keep the design consistent?", a: "Yes. I hand over a design system and the rules in a file your team and your AI tools follow, so you don't need me for every screen." },
    ],
  },
];

export const industry = (id) => INDUSTRIES.find((x) => x.id === id);

// Services menu columns (owner, 27 Nov 2026, after grafit.agency): what I do, grouped the way buyers think.
export const MENU_COLS = [
  { k: "Product design", ids: ["saas-product-design", "dashboard-design", "ai-product-ux", "mobile-app-design", "ux-audit", "design-systems"] },
  { k: "Websites", ids: ["website-design", "landing-pages", "website-development", "web-app-frontend", "mvp-build", "speed-accessibility"] },
  { k: "Growth and brand", ids: ["conversion-optimization", "seo-audit", "ai-search", "brand-identity", "pitch-decks", "ad-creatives"] },
];

// Articles each industry page links to under its work (interlinking, 28 Nov 2026). [path, link text].
export const INDUSTRY_READS = {
  saas: [["/writing/saas-dashboard-design-guide/", "SaaS dashboard design guide"], ["/writing/saas-dashboard-redesign/", "SaaS dashboard redesign"], ["/writing/saas-executive-dashboard/", "SaaS executive dashboard"]],
  "ai-startups": [["/writing/ai-product-ux-design-guide/", "AI product UX design guide"], ["/writing/ai-features-beyond-chat/", "AI features beyond chat"], ["/writing/how-to-fix-ai-built-app-design/", "How to fix the design of an AI-built app"]],
  fintech: [["/writing/data-table-design/", "Data table design"], ["/writing/ux-audit-checklist/", "UX audit checklist"]],
  healthcare: [["/writing/european-accessibility-act-checklist/", "European Accessibility Act checklist"], ["/writing/vibe-coding-accessibility-wcag-22-aa/", "12 accessibility fixes for AI-built apps"]],
  "law-firms": [["/writing/law-firm-website-design/", "Law firm website design"], ["/writing/website-redesign-cost/", "Website redesign cost"]],
  ecommerce: [["/writing/ecommerce-product-page-design/", "Ecommerce product page design"], ["/writing/ux-audit-checklist/", "UX audit checklist"]],
  "funded-startups": [["/writing/mvp-ui-ux-design/", "MVP UI/UX design"], ["/writing/how-to-hire-a-product-designer/", "How to hire a product designer"], ["/writing/product-designer-cost/", "What a product designer costs"]],
};

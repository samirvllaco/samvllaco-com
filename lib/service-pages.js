// Landing page copy for each service: the second half of the headline (shown grey), three pains the visitor
// recognises, and which case studies to show. Facts about Sam stay in lib/site.js and lib/faq.js.
export const PAGES = {
  "saas-product-design": { tail: "people get on the first try", pains: ["New users sign up, click around and never come back.", "Every release adds a screen and the product gets harder to explain.", "Your developers design screens on the fly because nobody else will."], work: ["marketing-dashboard", "freelance-marketplace", "eye-care-web-app"] },
  "dashboard-design": { tail: "that answer a question at a glance", pains: ["Twelve charts on one screen and nobody knows which one matters.", "Customers export everything to a spreadsheet to find the answer.", "Tables that work with 10 rows fall apart at 10,000."], work: ["marketing-dashboard", "eye-care-web-app", "freelance-marketplace"] },
  "ai-product-ux": { tail: "that feels built in, not bolted on", pains: ["The AI feature is a chat box in the corner that few people open.", "Users can't tell whether to trust the answer or how to fix it.", "Loading, errors and empty states were never designed."], work: ["marketing-dashboard", "language-player", "eye-care-web-app"] },
  "mobile-app-design": { tail: "that feels native on every phone", pains: ["The app looks like a website squeezed into a phone.", "People get lost after the third tap and leave.", "iOS and Android each need their own patterns and you have one design."], work: ["mobile-banking", "supplements-store", "trip-planner"] },
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
  { q: "How much does it cost?", a: "Projects usually start at $1,000. After the first call you get a fixed price and a timeline in writing, so there are no surprises." },
  { q: "How fast can you start?", a: "Usually within one to two weeks of the first call. I take 1 or 2 new projects at a time, so yours gets my full attention." },
  { q: "Who will I work with?", a: "Only me. I take the call, do the work and hand over the files myself. No account managers and no junior handoffs." },
  { q: "What do I get at the end?", a: "Organized files, components and notes your team can build from. You own all of it." },
];

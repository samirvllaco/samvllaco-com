// Design subscription plans (owner, 22 Nov 2026). One source for the home page, the pricing page and the cost calculator.
export const WEEK_PRICE = 1000;
export const MONTH_PRICE = 3000;

export const PLANS = [
  { k: "Weekly sprint", price: "$1,000", per: "per week", lead: "One focused week on one problem.", eg: "Redesign your onboarding, or take a new feature from flow to final screens.", items: ["A kickoff call, then daily progress", "One request at a time, most back in about 48 hours", "Flows, UI and a clickable prototype", "Figma files your team can build from", "Development included: Webflow, Framer or a custom landing page", "Add more weeks as you need them"] },
  { k: "Monthly", price: "$3,000", per: "per month", hot: true, lead: "Your designer on call, every week.", eg: "Ship new features each sprint while your product, site and brand stay consistent.", items: ["Unlimited requests, one at a time", "Most requests back in about 48 hours", "UI/UX, web, brand and marketing design", "Development included: Webflow, Framer or custom marketing pages", "A shared board and a weekly call", "Pause or cancel any month"] },
];

export const STEPS = [
  { t: "Subscribe", d: "Pick the weekly sprint or the monthly plan. We start with a short call, so I know your product before the first request." },
  { t: "Request", d: "Add what you need to a shared board: a screen, a flow, a landing page, a deck. As many requests as you like, worked on one at a time." },
  { t: "Receive", d: "Most requests come back in about 48 hours, as Figma files. Ask for changes until it is right, then I move to the next one." },
];

export const REQUESTS = ["Web apps", "Mobile apps", "Dashboards", "Landing pages", "Websites", "Design systems", "UX audits", "Prototypes", "Brand identity", "Logos", "Pitch decks", "Ad creatives", "Email design", "App store screenshots", "Social templates"];

export const WHY = [
  { t: "One fixed price", d: "The same amount every week or month. No hourly meter, no surprise invoice." },
  { t: "Fast turnaround", d: "Most requests are back in about 48 hours. Bigger ones are split into steps you see every day or two." },
  { t: "One senior designer", d: "You work with me from the first call to the last file. Nothing is passed to a junior or outsourced." },
  { t: "Pause or cancel", d: "Monthly runs month to month. Pause when you have nothing to design, come back when you do." },
  { t: "Revisions included", d: "Ask for changes until you are happy with the design. It does not cost more." },
  { t: "You own the files", d: "Organized Figma files, components and exports. Everything I make for you is yours." },
];

// Accessibility and Slop Score offers (owner, 25 Nov 2026). The only place these prices are set.
export const EAA_AUDIT_PRICE = 1500; // one-week EAA audit, 5 working days
export const MANAGED_FROM = 3000; // managed accessibility, per month, "from"
export const SLOP_REPORT_PRICE = 9; // full Slop Score AI report, one-time
export const usd = (n) => `$${n.toLocaleString("en-US")}`;

// Offer ladder (owner, 25 Nov 2026): every way to work with Sam, smallest step first. Shown on /pricing/.
export const LADDER = [
  { name: "Slop Score", price: "Free", who: "Anyone with a live site. See how AI-generated it looks.", href: "/slop-score/" },
  { name: "The 27 prompts book", price: "$12.99", who: "Builders who want to fix it themselves tonight.", href: "/fix-ai-slop-ui/" },
  { name: "Loom review", price: "$49 or $99", who: "Founders who want a designer's eyes on their product.", href: "/fix-ai-slop-ui/#options" },
  { name: "EAA audit", price: usd(EAA_AUDIT_PRICE), who: "Teams selling in the EU that need to know where they stand.", href: "/eaa-audit/" },
  { name: "Weekly sprint", price: usd(WEEK_PRICE), who: "Teams with one clear problem to fix this week.", href: "/book/" },
  { name: "Monthly plan", price: usd(MONTH_PRICE), who: "Teams that ship every week and need design to keep up.", href: "/book/" },
  { name: "Managed accessibility", price: `From ${usd(MANAGED_FROM)} a month`, who: "Larger product teams that need to stay compliant.", href: "/accessibility/" },
];

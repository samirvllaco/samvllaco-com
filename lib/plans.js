// Design subscription plans (owner, 22 Nov 2026). One source for the home page, the pricing page and the cost calculator.
export const WEEK_PRICE = 1000;
export const MONTH_PRICE = 3000;

export const PLANS = [
  { k: "Weekly sprint", price: "$1,000", per: "per week", lead: "One focused week on one problem.", eg: "Redesign your onboarding, or take a new feature from flow to final screens.", items: ["A kickoff call, then daily progress", "One request at a time, most back in about 48 hours", "Flows, UI and a clickable prototype", "Figma files your team can build from", "Add more weeks as you need them"] },
  { k: "Monthly", price: "$3,000", per: "per month", hot: true, lead: "Your designer on call, every week.", eg: "Ship new features each sprint while your product, site and brand stay consistent.", items: ["Unlimited requests, one at a time", "Most requests back in about 48 hours", "UI/UX, web, brand and marketing design", "A shared board and a weekly call", "Pause or cancel any month"] },
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

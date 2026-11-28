// One place for facts and links. Edit here, every page and the schema update.
export const SITE = {
  url: "https://samvllaco.com",
  name: "Sam Vllaco",
  fullName: "Samir Vllaco",
  tagline: "Designer building apps.",
  description:
    "Sam Vllaco is a UI/UX and product designer with 10 years designing apps for SaaS, AI, fintech and health, from first call to handover.",
  handle: "@samvllaco",
  links: {
    x: "https://x.com/samvllaco",
    medium: "https://medium.com/@samvllaco",
    dribbble: "https://dribbble.com/samirvllaco",
    figma: "https://www.figma.com/design/JDrxmwmeWbl1oyj1d4O391",
    linkedin: "https://www.linkedin.com/in/samirvllaco/",
  },
};

// Newsletter: create a free Buttondown account, then put your username here.
// While it is empty, the form is hidden and a "follow on X" line shows instead.
// Set to your Buy Me a Coffee page URL (https://buymeacoffee.com/yourname). Hidden until set.
// Loom embed link for the intro video, e.g. "https://www.loom.com/embed/<id>". Empty shows a placeholder.
export const VIDEO_EMBED = "";

export const EMAIL = "sam@samvllaco.com";
export const COFFEE_URL = "";

export const NEWSLETTER = { buttondown: "" };

// Lordicon Pro: export each icon as Lottie JSON from your library, put the files in public/icons/
// and set the paths here, for example home: "/icons/home.json". Empty uses the built-in icon.
export const LORDICONS = { home: "", building: "", writing: "", products: "", globe: "", about: "" };

export const NAV = [
  { key: "home", href: "/", label: "Home", shortcut: "H" },
  { key: "writing", href: "/writing/", label: "Insights", shortcut: "W" },
  { key: "products", href: "/products/", label: "Products", shortcut: "P" },
  { key: "globe", href: "/globe/", label: "Globe", shortcut: "G" },
  { key: "about", href: "/about/", label: "About", shortcut: "A" },
];



export const ARTICLES = [
  {
    title: "SaaS dashboard redesign: when you need one and how to do it without a rebuild",
    short: "SaaS Dashboard Redesign: Signs, Process and Cost",
    slug: "saas-dashboard-redesign",
    url: "https://samvllaco.com/writing/saas-dashboard-redesign/",
    summary: "A SaaS dashboard redesign rarely needs a rebuild. Five signs you need one, how the work runs week by week, how to ship it safely and what it costs.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/saas-dashboard-redesign.webp",
    coverAlt: "Cover: Redesign, not rebuild",
  },
  {
    title: "Lovable app redesign: three ways to redesign your app without rebuilding it",
    short: "Lovable App Redesign: 3 Ways, No Rebuild Needed",
    slug: "lovable-app-redesign",
    url: "https://samvllaco.com/writing/lovable-app-redesign/",
    summary: "How to redesign a Lovable app without rebuilding it: do it yourself with rules and one prompt, get a designer's review, or have it redesigned. With prices.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/lovable-app-redesign.webp",
    coverAlt: "Cover: Keep the app, change the look",
  },
  {
    title: "SaaS executive dashboard: the six numbers to show and how to lay them out",
    short: "SaaS Executive Dashboard: What to Show and How to Design It",
    slug: "saas-executive-dashboard",
    url: "https://samvllaco.com/writing/saas-executive-dashboard/",
    summary: "A SaaS executive dashboard needs six numbers, one trend chart and a short list of what changed. What to include, what to leave out and a layout that works.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/saas-executive-dashboard.webp",
    coverAlt: "Cover: Six numbers, one screen",
  },
  {
    title: "Customer acquisition dashboard: the metrics, the layout and a prompt to build it",
    short: "Customer Acquisition Dashboard: Metrics, Layout and Example",
    slug: "customer-acquisition-dashboard",
    url: "https://samvllaco.com/writing/customer-acquisition-dashboard/",
    summary: "What to put on a customer acquisition dashboard: new customers, CAC, payback, the funnel and a table by channel. With a layout and a prompt to build it.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/customer-acquisition-dashboard.webp",
    coverAlt: "Cover: Where should the next dollar go",
  },
  {
    title: "SaaS support dashboard best practices: 7 rules for a dashboard agents use all day",
    short: "SaaS Support Dashboard Best Practices: 7 Rules",
    slug: "saas-support-dashboard",
    url: "https://samvllaco.com/writing/saas-support-dashboard/",
    summary: "SaaS support dashboard best practices: show tickets at risk first, use median response times, compare tickets to customers and make contact reasons visible.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/saas-support-dashboard.webp",
    coverAlt: "Cover: What needs attention now",
  },
  {
    title: "AI Slop Statistics 2026: 100 New Product Launches, Measured",
    short: "AI Slop Statistics 2026: 100 Launches, Measured",
    slug: "ai-slop-statistics",
    url: "https://samvllaco.com/writing/ai-slop-statistics/",
    summary: "AI slop statistics from 100 Show HN launches: 9 had a purple gradient, 73 had spacing off the grid, 58 had competing buttons and 53 used more than 7 font sizes.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/ai-slop-statistics.webp",
    coverAlt: "Cover: AI slop statistics, 100 launches measured",
  },
  {
    title: "MVP UI/UX Design: What to Design First, Timeline and Cost",
    short: "MVP UI/UX Design: What to Design, Timeline and Cost",
    slug: "mvp-ui-ux-design",
    url: "https://samvllaco.com/writing/mvp-ui-ux-design/",
    summary: "MVP UI/UX design in plain terms: the one flow and 5 to 8 screens to design first, a week-by-week process, what it costs, and how to do it with AI tools.",
    platform: "samvllaco.com",
    category: "Hiring a designer",
    cover: "/writing/mvp-ui-ux-design.webp",
    coverAlt: "Cover: MVP UI/UX design, what to design first",
  },
  {
    title: "Does My Website Look AI-Generated? 10 Signs and a Free Test",
    short: "Does My Website Look AI-Generated? 10 Signs, Free Test",
    slug: "does-my-website-look-ai-generated",
    url: "https://samvllaco.com/writing/does-my-website-look-ai-generated/",
    summary: "The 10 signs that make a website look AI-generated, from purple gradients to vague copy, a free AI-generated website checker, and the fix for each sign.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/does-my-website-look-ai-generated.webp",
    coverAlt: "Cover: Does my website look AI-generated? 10 signs",
  },
  {
    title: "DESIGN.md: What It Is, a Free Template, and Examples for Claude Code, Cursor, Lovable and v0",
    short: "DESIGN.md Template: Free File and Examples for AI Tools",
    slug: "design-md-template",
    url: "https://samvllaco.com/writing/design-md-template/",
    summary: "What a DESIGN.md file is, a free template to copy, and examples for SaaS dashboards, landing pages and mobile apps, set up for Claude Code, Cursor, Lovable and v0.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/design-md-template.webp",
    coverAlt: "Cover: DESIGN.md, a free template and 3 examples",
  },
  {
    title: "European Accessibility Act Checklist for Websites and Apps (2026)",
    short: "European Accessibility Act Checklist for Websites and Apps",
    slug: "european-accessibility-act-checklist",
    url: "https://samvllaco.com/writing/european-accessibility-act-checklist/",
    summary: "Does the European Accessibility Act apply to you? Who is covered, the standard to meet, a WCAG 2.2 AA checklist for websites and apps, deadlines and what to publish.",
    platform: "samvllaco.com",
    category: "Accessibility",
    cover: "/writing/european-accessibility-act-checklist.webp",
    coverAlt: "Cover: European Accessibility Act checklist for websites and apps",
  },
  {
    title: "Anti AI Slop UI: A Free Skill File for Claude Code, Cursor and Lovable",
    short: "Anti AI Slop UI Skill: Free SKILL.md for Claude Code",
    slug: "anti-ai-slop-ui-skill",
    url: "https://samvllaco.com/writing/anti-ai-slop-ui-skill/",
    summary: "A free SKILL.md that stops AI slop UI: banned patterns, exact design rules, copy and states, and a check your AI tool runs before it calls a screen done.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/anti-ai-slop-ui-skill.webp",
    coverAlt: "Cover: A free skill that stops AI slop UI",
  },
  {
    title: "Hire a Lovable Designer: What It Costs, What You Get and What to Ask",
    short: "Hire a Lovable Designer: Cost, Scope and What to Ask",
    slug: "hire-lovable-designer",
    url: "https://samvllaco.com/writing/hire-lovable-designer/",
    summary: "What a Lovable designer does for an app that works but looks generic, what it costs, designer vs developer vs partner, and the questions to ask before you hire.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/hire-lovable-designer.webp",
    coverAlt: "Cover: Hire a Lovable designer, cost, scope and what to ask",
  },
  {
    title: "Vibe Coding Accessibility: 12 Copy-Paste Fixes and Prompts for WCAG 2.2 AA in Your AI-Built App",
    short: "Vibe Coding Accessibility: 12 Copy-Paste Fixes for WCAG 2.2 AA",
    // Published on this site (content/writing/vibe-coding-accessibility-wcag-22-aa.md).
    slug: "vibe-coding-accessibility-wcag-22-aa",
    url: "https://medium.com/@samvllaco/vibe-coding-accessibility-12-copy-paste-fixes-and-prompts-for-wcag-2-2-aa-in-your-ai-built-app-633940f7f064",
    summary: "Twelve fixes and prompts that take an AI-built app to WCAG 2.2 AA: contrast, focus, keyboard, labels and more.",
    platform: "Medium",
    category: "Accessibility",
    cover: "/writing/vibe-a11y.webp?v=1",
    coverAlt: "A browser window with a glowing orange button, an accessibility icon, a check mark and keyboard, hearing and vision keys around it",
  },
  {
    title:
      "AI Slop UI: Why Every Vibe-Coded App Looks the Same, and 25 Copy-Paste UX Fixes You Can Use on Your Product Today",
    short: "AI Slop UI: 25 Copy-Paste UX Fixes for Vibe-Coded Apps",
    // Published on this site (content/writing/ai-slop-ui-fixes.md). The Medium copy stays as a second home.
    slug: "ai-slop-ui-fixes",
    url: "https://medium.com/@samvllaco/ai-slop-ui-why-every-vibe-coded-app-looks-the-same-and-25-ux-design-fixes-that-make-yours-look-d4c4cb2939df",
    summary:
      "Cursor, Lovable, v0, GPT and Claude can ship a screen in 30 seconds. Here is how to make the result look like nobody will know AI made it, with prompts, color rules, a 4pt grid and DESIGN.md files you can paste in.",
    platform: "Medium",
    category: "UX design",
    cover: "/writing/ai-slop-ui.webp",
    coverAlt: "A machine on a conveyor belt turning identical purple app screens into one polished gold screen, with the words AI Slop UI Fix",
  },
  {
    title: "25 UI Design Mistakes and How to Fix Each One",
    short: "25 UI Design Mistakes and How to Fix Each One",
    slug: "ui-design-mistakes",
    url: "https://samvllaco.com/writing/ui-design-mistakes/",
    summary: "25 UI design mistakes that make apps look cheap, from random spacing to missing empty states, each with the exact fix and the values to use.",
    platform: "samvllaco.com",
    category: "UI design",
    cover: "/writing/ui-design-mistakes.webp",
    coverAlt: "Cover: 25 UI design mistakes, fixed",
  },
  {
    title: "Black Friday Deals for Designers and Vibe Coders 2026, Checked One by One",
    short: "Black Friday Deals for Designers 2026, Checked",
    slug: "black-friday-deals-for-designers-2026",
    url: "https://samvllaco.com/writing/black-friday-deals-for-designers-2026/",
    summary: "Black Friday 2026 deals for designers and vibe coders, each checked on the seller's page: prices, codes and end dates.",
    platform: "samvllaco.com",
    category: "Deals",
    cover: "/writing/black-friday-deals-for-designers-2026.webp",
    coverAlt: "Cover: Black Friday deals for designers and vibe coders, checked one by one",
  },
  {
    title: "Why Your Lovable App Looks Generic, and 7 Fixes You Can Paste In Today",
    short: "Lovable App Looks Generic? 7 Fixes to Paste In",
    slug: "lovable-app-looks-generic",
    url: "https://samvllaco.com/writing/lovable-app-looks-generic/",
    summary: "Your Lovable app looks generic because nobody chose the design. 7 fixes with copy-paste prompts, and where to save the rules so Lovable keeps them.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/lovable-app-looks-generic.webp",
    coverAlt: "Cover: Why your Lovable app looks generic",
  },
  {
    title: "Your v0 app looks generic. 6 fixes that make it yours",
    short: "v0 App Design Looks Generic? 6 Fixes That Make It Yours",
    slug: "v0-app-looks-generic",
    url: "https://samvllaco.com/writing/v0-app-looks-generic/",
    summary: "Every v0 app starts from the same shadcn/ui starter. Six copy-paste prompts and one saved Instruction that make yours look designed, not generated.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/v0-app-looks-generic.webp",
    coverAlt: "Cover: Your v0 app looks generic. 6 fixes",
  },
  {
    title: "Your Bolt app looks generic. Fix it with one block of project knowledge",
    short: "Bolt App Looks Generic? Fix It With Project Knowledge",
    slug: "bolt-app-looks-generic",
    url: "https://samvllaco.com/writing/bolt-app-looks-generic/",
    summary: "Bolt sends your project knowledge with every prompt. Paste one block of design rules there, run four prompts, and your app stops looking generated.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/bolt-app-looks-generic.webp",
    coverAlt: "Cover: Your Bolt app looks generic. Fix it in one block",
  },
  {
    title: "Cursor UI Looks Generic? Cursor Rules for UI Design, One File for Every Screen",
    short: "Cursor UI Looks Generic? Cursor Rules for UI Design That Fix It",
    slug: "cursor-rules-for-ui-design",
    url: "https://samvllaco.com/writing/cursor-rules-for-ui-design/",
    summary: "Give Cursor one rules file for spacing, type, color and states so every screen matches. The exact file location, a paste-ready rule and 3 prompts.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/cursor-rules-for-ui-design.webp",
    coverAlt: "Cover: One Cursor rules file so every screen matches",
  },
  {
    title: "Claude Code UI Looks Generic? Why, and the DESIGN.md Setup That Fixes It",
    short: "Claude Code UI Looks Generic? Fix It With One DESIGN.md",
    slug: "claude-code-ui-design",
    url: "https://samvllaco.com/writing/claude-code-ui-design/",
    summary: "Why Claude Code UI looks generic, and the fix: a DESIGN.md with exact values, one import line in CLAUDE.md, and 3 copy-paste prompts to audit and review.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/claude-code-ui-design.webp",
    coverAlt: "Cover: Why Claude Code screens look generic, and the fix",
  },
  {
    title: "The replit.md design section that stops Replit Agent apps looking generic",
    short: "replit.md Design Rules: Make Replit Agent Apps Look Designed",
    slug: "replit-md-design-rules",
    url: "https://samvllaco.com/writing/replit-md-design-rules/",
    summary: "Replit Agent reads replit.md on every request. Add this design section to it, run three cleanup prompts, and your app stops looking like a template.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/replit-md-design-rules.webp",
    coverAlt: "Cover: The replit.md section that stops generic apps",
  },
  {
    title: "Vibe coded app looks bad? How to fix the design of an AI-built app",
    short: "Vibe Coded App Looks Bad? 12 Tells and How to Fix the Design",
    slug: "how-to-fix-ai-built-app-design",
    url: "https://samvllaco.com/writing/how-to-fix-ai-built-app-design/",
    summary: "Why apps built with Cursor, Lovable or v0 all look alike, the 12 tells I check first, a Cursor audit prompt, and three ways to fix the design.",
    platform: "samvllaco.com",
    category: "AI-built apps",
    cover: "/writing/how-to-fix-ai-built-app-design.webp",
    coverAlt: "Cover: Why your AI-built app looks like every other one",
  },
  {
    title: "How to hire a product designer for a SaaS or AI app",
    short: "How to Hire a Product Designer for a SaaS or AI App",
    slug: "how-to-hire-a-product-designer",
    url: "https://samvllaco.com/writing/how-to-hire-a-product-designer/",
    summary: "A working designer's guide to hiring one: what to decide first, where to look, how to read a portfolio, 8 questions for the call, and what it costs.",
    platform: "samvllaco.com",
    category: "Hiring",
    cover: "/writing/how-to-hire-a-product-designer.webp",
    coverAlt: "Cover: How to hire a product designer",
  },
  {
    title: "What a product designer costs for a SaaS or AI app",
    short: "Product Designer Cost in 2026: Rates for SaaS and AI Apps",
    slug: "product-designer-cost",
    url: "https://samvllaco.com/writing/product-designer-cost/",
    summary: "Real 2026 price ranges for hiring a product designer: hourly, weekly, monthly and fixed price, what moves the number, and what each budget buys you.",
    platform: "samvllaco.com",
    category: "Pricing",
    cover: "/writing/product-designer-cost.webp",
    coverAlt: "Cover: What a product designer costs in 2026",
  },
  {
    title: "Freelance designer vs agency: which one should a SaaS or AI startup hire?",
    short: "Freelance Designer vs Agency for SaaS Startups",
    slug: "freelance-designer-vs-agency",
    url: "https://samvllaco.com/writing/freelance-designer-vs-agency/",
    summary: "Freelance product designer or design agency for your SaaS or AI startup? A fair comparison of cost, speed, skills and risk, and when to pick each.",
    platform: "samvllaco.com",
    category: "Hiring",
    cover: "/writing/freelance-designer-vs-agency.webp",
    coverAlt: "Cover: Freelance designer or agency: which one to hire",
  },
  {
    title: "Do you need a designer if you build with AI? Hiring a designer vs vibe coding it yourself",
    short: "Do I Need a Designer if I Use AI or Vibe Code?",
    slug: "designer-vs-vibe-coding",
    url: "https://samvllaco.com/writing/designer-vs-vibe-coding/",
    summary: "Hire a designer or vibe code the design yourself? A fair comparison for founders, plus a middle path: a $12.99 ebook, a $49 review, then a full hire.",
    platform: "samvllaco.com",
    category: "Hiring",
    cover: "/writing/designer-vs-vibe-coding.webp",
    coverAlt: "Cover: Do you need a designer if you build with AI?",
  },
  {
    title: "SaaS dashboard design: how to make a dashboard people can read at a glance",
    short: "SaaS Dashboard Design Best Practices: A Designer's Guide",
    slug: "saas-dashboard-design-guide",
    url: "https://samvllaco.com/writing/saas-dashboard-design-guide/",
    summary: "How to design a SaaS dashboard people can read at a glance: start from the question, set the hierarchy, pick the right charts and build tables for real data.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/saas-dashboard-design-guide.webp",
    coverAlt: "Cover: A dashboard has one job",
  },
  {
    title: "9 dashboard UX mistakes that send your users back to Excel",
    short: "9 Dashboard UX Mistakes That Send Users Back to Excel",
    slug: "dashboard-ux-mistakes",
    url: "https://samvllaco.com/writing/dashboard-ux-mistakes/",
    summary: "Nine dashboard design mistakes I see in SaaS products, why each one makes people export to a spreadsheet, and the fix, with a prompt for AI-built apps.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/dashboard-ux-mistakes.webp",
    coverAlt: "Cover: 9 mistakes that send users back to Excel",
  },
  {
    title: "Data table design: 10 rules for tables that hold 10,000 rows",
    short: "Data Table Design Best Practices: 10 Rules for 10,000 Rows",
    slug: "data-table-design",
    url: "https://samvllaco.com/writing/data-table-design/",
    summary: "Your table worked with ten rows in the demo. Ten rules for SaaS data tables that stay readable and fast with real data, plus a prompt for AI-built apps.",
    platform: "samvllaco.com",
    category: "Dashboards",
    cover: "/writing/data-table-design.webp",
    coverAlt: "Cover: Tables that hold 10,000 rows",
  },
  {
    title: "What a SaaS dashboard design costs, and what moves the price",
    short: "SaaS Dashboard Design Cost: What You Pay in 2026",
    slug: "dashboard-design-cost",
    url: "https://samvllaco.com/writing/dashboard-design-cost/",
    summary: "A dashboard can cost $1,500 or $25,000 to design. The six things that decide which, what each budget gets you, and how to scope yours before a call.",
    platform: "samvllaco.com",
    category: "Pricing",
    cover: "/writing/dashboard-design-cost.webp",
    coverAlt: "Cover: What a dashboard design costs",
  },
  {
    title: "AI product UX design: how to make AI features people use",
    short: "AI Product UX Design: How to Build AI Features People Use",
    slug: "ai-product-ux-design-guide",
    url: "https://samvllaco.com/writing/ai-product-ux-design-guide/",
    summary: "How to design AI features people keep using: where the AI sits, when it speaks, how to design the wait, show sources, make correction cheap, what to measure.",
    platform: "samvllaco.com",
    category: "AI product UX",
    cover: "/writing/ai-product-ux-design-guide.webp",
    coverAlt: "Cover: The model is not the product",
  },
  {
    title: "Your AI feature does not have to be a chat box. 7 patterns that get used",
    short: "AI Product UX Patterns Beyond the Chat Box: 7 That Get Used",
    slug: "ai-features-beyond-chat",
    url: "https://samvllaco.com/writing/ai-features-beyond-chat/",
    summary: "Chat is one way to put AI in a product, and often the weakest. Seven AI UX patterns that sit inside the workflow, when to use each, and how to design them.",
    platform: "samvllaco.com",
    category: "AI product UX",
    cover: "/writing/ai-features-beyond-chat.webp",
    coverAlt: "Cover: Your AI feature does not have to be a chat box",
  },
  {
    title: "AI loading states: how to design a wait that takes 20 seconds",
    short: "AI Loading State UI: How to Design a 20-Second Wait",
    slug: "ai-loading-states",
    url: "https://samvllaco.com/writing/ai-loading-states/",
    summary: "A spinner works for one second. AI responses take ten or more. Seven ways to design the wait so people stay, with the copy and timing for each stage.",
    platform: "samvllaco.com",
    category: "AI product UX",
    cover: "/writing/ai-loading-states.webp",
    coverAlt: "Cover: Design the 20-second AI wait",
  },
  {
    title: "How to show users how sure the AI is, without a percentage",
    short: "AI Confidence UX: How to Show Users How Sure the AI Is",
    slug: "ai-confidence-ux",
    url: "https://samvllaco.com/writing/ai-confidence-ux/",
    summary: "\"87% confident\" tells users nothing. Six ways to show how sure an AI answer is, so people know when to trust it, when to check it and how to fix it.",
    platform: "samvllaco.com",
    category: "AI product UX",
    cover: "/writing/ai-confidence-ux.webp",
    coverAlt: "Cover: Show users how sure the AI is",
  },
];

// Where an article card points: its page on this site when it has one, otherwise Medium in a new tab.
export const articleLink = (a) => (a.slug ? { href: `/writing/${a.slug}/`, external: false, label: "Read the story" } : { href: a.url, external: true, label: "Read on Medium" });

// Certificates shown as gold trust badges in the footer. Hover shows the details below.
// Only facts that appear on the certificates are listed. href is optional (verify link).
export const CERTS = [
  { title: "Product Designer", issuer: "Uxcel", year: "2026", kind: "Certification", issued: "Feb 2026", skills: "Prototyping" },
  { title: "AI for Designers", issuer: "IxDF", kind: "Course certificate", full: "Interaction Design Foundation" },
  { title: "UX Design Foundations", issuer: "Uxcel", year: "2025", kind: "Certification", issued: "Oct 2025", skills: "Prototyping" },
  { title: "AI for Design Systems", issuer: "IxDF", year: "2025", kind: "Masterclass participation", issued: "Nov 2025", full: "Interaction Design Foundation", href: "https://ixdf.org/members/samir-vllaco" },
  { title: "Graphic Design Fundamentals", issuer: "UPA", year: "2019", kind: "Certification", issued: "Oct 2019", full: "United Pixels Academy" },
];

// Booking calendar. Paste a Cal.com or Calendly link here (for example "https://cal.com/samvllaco/intro")
// and the /book page shows the live calendar instead of the email button.
export const BOOKING_URL = "https://cal.com/samirvllaco/30min";

// Project form: paste a form service URL that accepts JSON (for example a Formspree endpoint) to receive
// submissions directly. While empty, the form opens the visitor's email app with the details filled in.
export const FORM_ENDPOINT = "";

// Where the book is sold. Every book buy button, the top banner, the nav item and the promo popup open this.
export const BOOK_URL = "https://whop.com/sam-vllaco/products/27-copy-paste-prompts-to-fix-ai-slop-ui/";

// Packages next to the book (owner, 15 Nov 2026): checkout on Whop, which sends buyers to /review/thanks/.
export const PERSONAL_REVIEW_URL = "https://whop.com/sam-vllaco/personal-ui-review/";
export const REVIEW_URL = "https://whop.com/sam-vllaco/complete-ui-ux-review/";
// Email form for the 10 free pages: FormSubmit forwards each request to Sam's inbox, and he sends the pages himself.
// FormSubmit alias for sam@samvllaco.com (from the activation email, 25 Nov 2026), so the address is not in the page source.
export const LEADS_ENDPOINT = "https://formsubmit.co/ajax/1ec7f696b175150ca5f4f123c2036409";

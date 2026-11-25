// Long-form case study content, keyed by project slug. Projects without an entry show the short layout.
// Keep every claim true: describe the design and the decisions, never invent client results.
export const STUDIES = {
  "marketing-dashboard": {
    kind: "Concept project",
    year: "2026",
    industry: "Marketing SaaS",
    services: ["Product design", "UX and UI design", "Data visualization", "Motion design", "Component system"],
    facts: [
      { value: "2", label: "Core screens: dashboard and contacts" },
      { value: "6", label: "Key numbers visible without scrolling" },
      { value: "1", label: "Accent color carries all the data" },
      { value: "8s", label: "Animated walkthrough of the dashboard" },
    ],
    about: [
      "Kestrel is a concept for a marketing and lead dashboard, made for small teams that run ads on a few channels and need to know what is working today.",
      "I designed it to answer one question fast: where are my leads coming from, and what should I do next? Everything on the screen either shows a number that matters or helps you act on it.",
    ],
    problem: {
      intro: "Most marketing dashboards show everything at the same volume. These are the five problems I designed against.",
      points: [
        { title: "Every number looks equally important", text: "When twelve cards share one size, nothing reads first." },
        { title: "Charts need decoding", text: "Too many colors and a legend you have to look up for every bar." },
        { title: "AI lives in a separate chat", text: "You leave the data to ask about the data, then lose your place." },
        { title: "Tables are hard to scan", text: "Dense rows, weak alignment and status that hides in plain text." },
        { title: "Leads and performance are split", text: "You see that leads went up, but not who they are or who needs a reply." },
      ],
    },
    approach: [
      { title: "Numbers first", text: "Revenue and deals won get the largest cards. Supporting metrics sit beside them at half the size, each with its change against last month." },
      { title: "One color for data", text: "Purple is used only for data and primary actions. Lighter tints separate channels, so the chart reads without a rainbow." },
      { title: "AI next to the work", text: "The assistant sits beside the chart it explains. It opens with findings, not an empty prompt." },
    ],
    chapters: [
      {
        id: "dashboard",
        title: "The dashboard",
        text: "One screen for the daily check. The layout follows the order people ask questions: how much, from where, what now, and which campaign.",
        image: { src: "/work/marketing-dashboard-full.webp", w: 1800, h: 1012, alt: "The full Kestrel dashboard with KPI cards, a leads chart, the AI assistant panel and a top campaigns table" },
        parts: [
          { title: "KPI cards with a clear order", text: "Two large cards for revenue and deals won, four compact ones for cost per lead, ad spend, visits and return on ad spend. Green and red are used only for the change, never for decoration.", image: { src: "/work/kestrel-kpis.webp", w: 1400, h: 210, alt: "Six KPI cards: revenue, deals won, cost per lead, ad spend, visits and return on ad spend" } },
          { title: "A chart that reads in one look", text: "Stacked bars show leads by channel in three tints of one color. A single dark line adds revenue on the second axis. The current day is the only bold label.", image: { src: "/work/kestrel-chart.webp", w: 1284, h: 596, alt: "A stacked bar chart of leads by channel across ten days with a revenue line on top" } },
          { title: "An assistant that starts with answers", text: "The panel leads with what changed: hot leads waiting, progress to the monthly goal, the top channel. Suggested questions sit above the input, so nobody faces a blank box.", image: { src: "/work/kestrel-ai.webp", w: 652, h: 596, alt: "The Kestrel AI panel listing four findings, two suggested questions and a prompt field" } },
          { title: "A table built for scanning", text: "Numbers are right aligned, the sorted column is marked, and status is a small dot with a label. Each row ends with one menu for every action.", image: { src: "/work/kestrel-table.webp", w: 1400, h: 357, alt: "The top campaigns table with channel, spend, leads, ROAS, last lead and status columns" } },
        ],
      },
      {
        id: "contacts",
        title: "Contacts",
        text: "The second screen connects performance to people. It shows who the leads are, where each one stands and who is waiting for a reply.",
        image: { src: "/work/marketing-dashboard-contacts.webp", w: 1800, h: 1211, alt: "The Kestrel contacts screen with a pipeline bar, a people table and a contact detail panel" },
        parts: [
          { title: "The pipeline as one bar", text: "Four stages share a single bar, so the proportions are visible before you read a number. Counts and weekly change sit directly under each stage.", image: { src: "/work/kestrel-pipeline.webp", w: 1046, h: 192, alt: "A pipeline bar split into new, contacted, qualified and won, with counts under each stage" } },
          { title: "Saved views instead of filters", text: "The lists people need most are one tap away: hot this week, no reply in seven days, big deals. The table is sorted by lead score by default.", image: { src: "/work/kestrel-people.webp", w: 1046, h: 894, alt: "The people table with saved views, lead scores, deal values and status for fifteen contacts" } },
          { title: "A detail panel that suggests the next step", text: "Selecting a person opens their details beside the list. The assistant explains why now is a good moment and offers to draft the reply.", image: { src: "/work/kestrel-detail.webp", w: 482, h: 894, alt: "A contact detail panel with message, call and meeting actions, an AI suggestion and recent activity" } },
        ],
      },
    ],
    motion: {
      text: "Motion is used to explain, not to decorate. When the dashboard loads, cards fade in from top to bottom, numbers count up to their value, bars rise in order and the revenue line draws across them. The assistant panel gets a soft glow, the only element that asks for attention.",
      points: ["Cards fade in, nothing slides or bounces", "Numbers count up in under a second", "Bars rise left to right, then the line draws", "Everything is skipped for people who prefer reduced motion"],
    },
    system: {
      text: "A small set of rules keeps both screens consistent and makes new screens fast to design.",
      image: { src: "/work/marketing-dashboard-cover.webp", w: 1600, h: 1200, alt: "The dashboard and contacts screens layered on a purple background" },
      points: [
        { title: "Color", text: "A near-black sidebar, white cards on a light gray canvas, and one purple for data and primary actions." },
        { title: "Type", text: "Geologica throughout. Large bold figures for money, small medium labels for everything that explains them." },
        { title: "Surfaces", text: "Soft 12 to 16 pixel corners and thin borders. Depth comes from layering, not heavy shadows." },
        { title: "Components", text: "Cards, chips, table rows and buttons are shared by both screens, so they feel like one product." },
      ],
    },
    cta: { title: "Have a dashboard that needs this?", text: "I design SaaS products, dashboards and AI features that people understand on the first screen." },
  },
  "freelance-marketplace": {
    kind: "Concept project",
    year: "2026",
    industry: "Freelance marketplace",
    services: ["Product design", "UX and UI design", "Payments and escrow UX", "Trust design", "Component system"],
    facts: [
      { value: "4", label: "Core screens: discover, messages, project and release" },
      { value: "3", label: "Promises that protect the client on every project" },
      { value: "3", label: "Money states that always add up: paid, held, not funded" },
      { value: "6", label: "UX decisions annotated on the messages screen" },
    ],
    about: [
      "Veyra is a concept for a freelance marketplace where clients hire designers and pay per milestone, with the money held in escrow until the client approves the work.",
      "I designed the moments where most freelance projects go wrong: choosing who to hire, reviewing a delivery and releasing money. Each one is answered on the screen where the decision happens.",
    ],
    problem: {
      intro: "Hiring on a marketplace often feels like a leap of faith. These are the five problems I designed against.",
      points: [
        { title: "Updates and payments live apart", text: "The work arrives in a chat, the money sits on a billing page, and nobody connects the two." },
        { title: "Escrow is a black box", text: "Clients can't see what is paid, what is held and what still needs funding." },
        { title: "Trust scores can be gamed", text: "Ratings from work done off the platform, or written by friends, say very little." },
        { title: "Approving is guesswork", text: "A client is asked to pay without seeing what changed since the last delivery." },
        { title: "Choosing means twenty open tabs", text: "Profiles are hard to compare side by side against one brief." },
      ],
    },
    approach: [
      { title: "Decide in the thread", text: "The chat, the milestone under review and the money held for it sit on one screen, so a client can read, check and approve without leaving the conversation." },
      { title: "Money is always explained", text: "Every budget splits into paid, held and not funded yet, and the three always add up to the total." },
      { title: "Trust is earned, not claimed", text: "The trust score only counts work paid through the platform, and the screen says how it is weighted." },
    ],
    chapters: [
      {
        id: "messages",
        title: "Messages",
        text: "The screen where the work and the money meet. The conversation list says what needs attention, the chat holds the delivery, and the side panel shows the project budget and the files.",
        image: { src: "/work/freelance-marketplace-01.webp", w: 1600, h: 900, alt: "The Veyra messages screen with a conversation list, a chat with a milestone review card, and a project panel with budget and files" },
        parts: [
          { title: "A review card that shows what changed", text: "The delivery lists every item to review and how many the client has opened, the changes since the last milestone with the designer's notes, and how long is left to review. Inside the card, approve and pay is the only filled button.", image: { src: "/work/freelance-marketplace-08.webp", w: 1600, h: 1200, alt: "The milestone review card with four items to review, what changed since milestone 1, a progress ring and the approve and pay button" } },
          { title: "Release with a receipt", text: "Before any money moves, a short confirmation shows what is held, the fee, what the designer receives and what the client is approving. Funding the next milestone is one switch, and the window to report a problem is stated.", image: { src: "/work/freelance-marketplace-07.webp", w: 1600, h: 900, alt: "A release confirmation dialog for $1,200 with the amount held, the fee, the approved items and a switch to fund the next milestone" } },
          { title: "Every decision on one page", text: "Six decisions behind the screen, annotated: the preview says what is needed, the payment decision lives in the chat, money is held not gone, trust is one number with proof, time zones show at a glance and every file sits in one list.", image: { src: "/work/freelance-marketplace-04.webp", w: 1600, h: 1200, alt: "The messages screen with six numbered UX decisions explained beside it" } },
        ],
      },
      {
        id: "discover",
        title: "Discover",
        text: "Finding a designer starts from the client's brief, not a search box. Designers are ranked by match to the brief, each card shows the trust score with its proof, and a shortlist on the right makes it easy to compare three side by side. A short panel explains what the trust score counts and that it can't be bought or self-reported.",
        image: { src: "/work/freelance-marketplace-05.webp", w: 1600, h: 900, alt: "The Veyra discover screen with brief filters, designer cards ranked by match with trust scores, a shortlist and an explanation of the trust score" },
        parts: [],
      },
      {
        id: "project",
        title: "Project",
        text: "One engagement on one page. A progress ring and a single budget bar show where the project stands, milestones read top to bottom with the one under review opened up, and the next milestone can be funded with one tap. Three short promises at the foot say what protects the client.",
        image: { src: "/work/freelance-marketplace-06.webp", w: 1600, h: 900, alt: "The Veyra project screen with a progress ring, a budget bar, four milestones, an activity feed and files" },
        parts: [],
      },
    ],
    motion: {
      text: "Motion shows the order of a conversation. The frame and panels fade in first, the messages then arrive one by one, and the milestone card comes last, so the eye ends on the decision.",
      points: ["Panels fade in, nothing slides or bounces", "Messages appear in the order they were sent", "The milestone card arrives last", "Everything is skipped for people who prefer reduced motion"],
    },
    system: {
      text: "A small set of rules keeps four screens consistent and makes the money states readable at a glance.",
      image: { src: "/work/freelance-marketplace-03.webp", w: 1600, h: 1200, alt: "The Veyra messages screen on an orange background" },
      points: [
        { title: "Color", text: "White cards on a light gray canvas. One warm orange for primary actions and money held, green for paid, gray for not funded." },
        { title: "Type", text: "One rounded sans-serif. Bold figures for money, small medium labels for everything that explains them." },
        { title: "Surfaces", text: "Soft corners and thin borders. The card under review gets the only colored border on the screen." },
        { title: "Components", text: "Milestone cards, budget rows, trust panels and file lists are shared by every screen, so the product feels like one place." },
      ],
    },
    cta: { title: "Building a product where money changes hands?", text: "I design marketplaces, payments and approval flows that people trust on the first screen." },
  },
  "mobile-banking": {
    kind: "Concept project",
    year: "2026",
    industry: "Fintech",
    services: ["Mobile app design", "UX and UI design", "Data visualization", "Motion design", "Component system"],
    facts: [
      { value: "6", label: "Screens: home, spending, send, cards, convert and receipt" },
      { value: "2", label: "Currencies on one balance card" },
      { value: "4", label: "Main actions in the thumb zone" },
      { value: "6", label: "UX decisions annotated on home and spending" },
    ],
    about: [
      "Orra is a concept for a mobile banking app for people who earn or spend in more than one currency.",
      "I designed it around the three things people open a banking app for: how much do I have, where did it go, and how do I send it. Each has one screen, and each screen leads with that answer.",
    ],
    problem: {
      intro: "Banking apps often bury the answer people came for. These are the problems I designed against.",
      points: [
        { title: "The balance hides behind menus", text: "Several accounts and currencies, and no single number to start from." },
        { title: "Charts without a point", text: "A spending graph that shows movement but not whether you are on track." },
        { title: "Sending money feels like a form", text: "Account numbers to recall and fields to fill for someone you pay every week." },
        { title: "Currency fees are a surprise", text: "The rate and the fee show up after you convert, not before." },
        { title: "No proof when it's done", text: "A small toast instead of a receipt you can share or come back to." },
      ],
    },
    approach: [
      { title: "The balance is the hero", text: "One bright card on a dark screen holds the total, with each currency and its share right under it." },
      { title: "What is left, not what is gone", text: "Spending is shown against the budget you set, so the month reads as progress." },
      { title: "Faces instead of forms", text: "Recent people sit one tap away, and sending is a number pad with quick amounts and the balance after sending." },
    ],
    chapters: [
      {
        id: "everyday",
        title: "Home, spending and sending",
        text: "The three screens people use every day, each answering one question first.",
        image: { src: "/work/mobile-banking-01.webp", w: 1600, h: 900, alt: "Three Orra screens: home with the balance card, spending with a budget bar and daily chart, and send money with a number pad" },
        parts: [
          { title: "A balance card you read in one look", text: "The total is the largest number on the screen. Under it, dollars and euros each show their amount and share of the total, with this month's change and a way into the account details.", image: { src: "/work/mobile-banking-07.webp", w: 1600, h: 1200, alt: "The Orra balance card with the total balance, USD and EUR amounts with their share, and the change this month" } },
          { title: "Six decisions, annotated", text: "The balance is the hero, a total you can trust, actions in the thumb zone, faces instead of forms, what is left instead of what is gone, and one highlighted day on the chart.", image: { src: "/work/mobile-banking-04.webp", w: 1600, h: 1200, alt: "The home and spending screens with six numbered UX decisions explained beside them" } },
        ],
      },
      {
        id: "cards",
        title: "Cards, converting and the receipt",
        text: "The card screen puts freeze, details, limits and wallet one tap away, with spending against the card limit. Converting shows the live rate, the fee and what a typical bank would charge before you confirm. When money is sent, a full receipt shows who got it, from which account, the fee, the note and the balance left, with send again one tap away.",
        image: { src: "/work/mobile-banking-05.webp", w: 1600, h: 900, alt: "Three Orra screens: a card with controls and card payments, a currency conversion with the rate and fee, and a payment receipt" },
        parts: [],
      },
    ],
    motion: {
      text: "Motion follows how the eye reads each screen. The phones fade in, then each screen fills from the top: the greeting and balance card first, then the accounts, actions and the list below.",
      points: ["Screens fill top to bottom", "The balance card is the first thing to appear", "No bounces or slides on money", "Everything is skipped for people who prefer reduced motion"],
    },
    system: {
      text: "A dark interface with one bright accent keeps the attention on money and the next action.",
      image: { src: "/work/mobile-banking-03.webp", w: 1600, h: 1200, alt: "The Orra home, spending and send money screens on a cover background" },
      points: [
        { title: "Color", text: "Near-black surfaces with one lime accent for the balance card, the main action and the focus point on charts." },
        { title: "Type", text: "One geometric sans-serif. Large bold figures for amounts, small labels for currencies and dates." },
        { title: "Surfaces", text: "Rounded cards stacked on the dark canvas. Depth comes from layering, not shadows." },
        { title: "Components", text: "Balance cards, account tiles, action buttons and list rows repeat across every screen." },
      ],
    },
    cta: { title: "Designing a fintech or mobile app?", text: "I design mobile products where the number people came for is the first thing they see." },
  },
};

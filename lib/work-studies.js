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
};

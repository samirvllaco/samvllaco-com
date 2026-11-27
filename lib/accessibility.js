// Copy and sources for the two accessibility pages: /eaa-audit/ (audit plus a fixed-price fix sprint)
// and /accessibility/ (managed, monthly). Prices live in lib/plans.js. Every stat links to its source.

export const SRC = {
  eaaDate: { label: "AccessibleEU, European Commission", href: "https://accessible-eu-centre.ec.europa.eu/content-corner/news/eaa-comes-effect-june-2025-are-you-ready-2025-01-31_en" },
  audioeye: { label: "AudioEye, 2026 Digital Accessibility Index", href: "https://www.audioeye.com/post/the-forcing-function-what-a-year-of-the-eaa-really-shows/" },
  disability: { label: "European Commission, May 2026", href: "https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030" },
};

// 24-grid line icons for the "What I check" grid.
export const CHECKS = [
  { t: "Keyboard", d: "Every action works without a mouse.", i: "M3 7h18v10H3zM7 11h.01M11 11h.01M15 11h.01M7 14h10" },
  { t: "Screen readers", d: "Names, roles and order make sense out loud.", i: "M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" },
  { t: "Color contrast", d: "Text and controls people can actually read.", i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 3v18" },
  { t: "Focus", d: "You can always see where you are.", i: "M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { t: "Touch targets", d: "Buttons big enough for real fingers.", i: "M9 11V5a2 2 0 0 1 4 0v6M13 10a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-3a2 2 0 0 1 3-2l1 1" },
  { t: "Forms and errors", d: "Labels, hints and errors that explain the fix.", i: "M4 5h16v14H4zM8 10h8M8 14h5" },
  { t: "Images and media", d: "Alt text, captions and no autoplay surprises.", i: "M4 5h16v14H4zM9 10.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM20 15l-5-5-9 9" },
  { t: "Motion and timing", d: "Nothing that flashes, rushes or traps people.", i: "M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" },
];

export const EAA_FAQ = [
  { q: "Do overlay widgets make us compliant?", a: "**No.** Overlays don't change your design or your code, and they can get in the way of screen readers. I fix the source." },
  { q: "Does the EAA apply to us?", a: "If you sell covered products or services to people in the EU, such as eCommerce, banking, e-books, passenger transport or electronic communications, ==very likely yes==, even if you're based outside the EU. Microenterprises providing services (fewer than 10 people and under €2 million in annual turnover or balance sheet) are exempt from the service rules. Your legal team should confirm." },
  { q: "Which standard do you test against?", a: "**WCAG 2.2 AA.** The EU standard, EN 301 549, maps to WCAG 2.1 AA, so 2.2 AA covers it with room to spare." },
  { q: "Can you audit us if we're not based in Europe?", a: "**Yes.** The EAA covers companies outside the EU that sell to people in it. I'm based in Tirana and work with teams in the US, Europe, Canada, Australia and the UAE, so ==my working hours overlap with yours== either way." },
  { q: "What happens if we don't comply?", a: `Each EU country sets its own penalties. Germany can fine up to €100,000 per violation and Italy up to 5% of turnover. Source: [${SRC.audioeye.label}](${SRC.audioeye.href}).` },
  { q: "Do you write the code?", a: "**Yes, if you want me to.** I can fix the front-end code myself, or design the fixes and write dev-ready tickets your engineers pick up. Either way, I re-test what ships." },
  { q: "Is this legal advice?", a: "No. I'm a designer. I give you a clear technical picture to take to your legal team." },
];

export const MANAGED_FAQ = [
  { q: "How is this different from an accessibility scanner?", a: "Scanners catch what code can catch. Many problems only show up when a person uses your product with a keyboard or a screen reader. ==I do both==, and your team only gets the real issues." },
  { q: "Do you replace our in-house team?", a: "No. I plug into your design and engineering teams and make accessibility part of how you already ship." },
  { q: "Web only, or apps too?", a: "**Both.** Web, iOS and Android." },
  { q: "Do you write the code?", a: "**Yes, if you want me to.** I can fix front-end code myself, or design the fixes and write dev-ready tickets with clear acceptance criteria. Then I re-test what ships." },
  { q: "Can we start smaller?", a: "Yes. Start with [the one-week EAA audit](/eaa-audit/), then move to monthly if it makes sense." },
  { q: "Do you sign NDAs?", a: "**Yes, as standard.** Tell me what else your procurement team needs and I'll sort it before the work starts." },
  { q: "Is this legal advice?", a: "No. I'm a designer. I give your legal team a clear technical picture and the documents they need to review." },
];

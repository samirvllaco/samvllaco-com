// Free tools on samvllaco.com, no sign-up. All run in the browser except Slop Score, which scans a live URL on the server.
// menu: false keeps a tool off the three thumbnails in the header menus and the three home cards (owner: three there); it still lists on /tools/.
export const TOOLS = [
  { slug: "slop-score", href: "/slop-score/", name: "Slop Score", text: "Paste your URL and see how AI-generated your live site looks, with the top fixes. Lower is better.", icon: "M4 12a8 8 0 1 1 16 0M12 12l4-4M3 16h18M7 20h10" },
  { slug: "contrast-checker", name: "Color contrast checker", text: "Check any text and background pair against WCAG 2.2 AA and AAA, with a passing color suggested.", icon: "M12 3a9 9 0 1 0 0 18V3z M12 3a9 9 0 0 1 0 18" },
  { slug: "design-md-generator", menu: false, name: "DESIGN.md generator", text: "Pick your product type, brand color, font and corners, and copy a DESIGN.md your AI coding tool follows on every screen.", icon: "M6 3h9l3 3v15H6zM9 9h6M9 13h6M9 17h4" },
  { slug: "design-cost-calculator", name: "Design cost calculator", text: "Estimate what your website, app or brand design costs, and how many weeks it takes.", icon: "M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M16 11v6" },
];

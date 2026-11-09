// One place for facts and links. Edit here, every page and the schema update.
export const SITE = {
  url: "https://samvllaco.com",
  name: "Sam Vllaco",
  fullName: "Samir Vllaco",
  tagline: "Designer building apps.",
  description:
    "Sam Vllaco builds apps in public. See what he is shipping, what he writes and what he learns.",
  handle: "@samvllaco",
  links: {
    x: "https://x.com/samvllaco",
    medium: "https://medium.com/@samvllaco",
    dribbble: "https://dribbble.com/samirvllaco",
    figma: "https://www.figma.com/design/JDrxmwmeWbl1oyj1d4O391",
    ocufuse: "https://ocufuse.com",
    design: "https://design.samvllaco.com",
  },
};

// Newsletter: create a free Buttondown account, then put your username here.
// While it is empty, the form is hidden and a "follow on X" line shows instead.
// Set to your Buy Me a Coffee page URL (https://buymeacoffee.com/yourname). Hidden until set.
// Loom embed link for the intro video, e.g. "https://www.loom.com/embed/<id>". Empty shows a placeholder.
export const VIDEO_EMBED = "";

export const COFFEE_URL = "";

export const NEWSLETTER = { buttondown: "" };

// Lordicon Pro: export each icon as Lottie JSON from your library, put the files in public/icons/
// and set the paths here, for example home: "/icons/home.json". Empty uses the built-in icon.
export const LORDICONS = { home: "", building: "", writing: "", products: "", about: "" };

export const NAV = [
  { key: "home", href: "/", label: "Home", shortcut: "H" },
  { key: "building", href: "/building/", label: "Building", shortcut: "B" },
  { key: "writing", href: "/writing/", label: "Writing", shortcut: "W" },
  { key: "products", href: "/products/", label: "Products", shortcut: "P" },
  { key: "about", href: "/about/", label: "About", shortcut: "A" },
];

// Places visited: lat, lon, label offsets. Order is draw order.
export const PLACES = [
  { name: "Mallorca", country: "Spain", flag: "\u{1F1EA}\u{1F1F8}", lat: 39.57, lon: 2.65, dx: -96, dy: -40, rot: -4 },
  { name: "Bratislava", country: "Slovakia", flag: "\u{1F1F8}\u{1F1F0}", lat: 48.15, lon: 17.11, dx: -80, dy: -78, rot: 3 },
  { name: "Budapest", country: "Hungary", flag: "\u{1F1ED}\u{1F1FA}", lat: 47.5, lon: 19.04, dx: 32, dy: -78, rot: -3 },
  { name: "Tirana", country: "Albania", flag: "\u{1F1E6}\u{1F1F1}", lat: 41.33, lon: 19.82, dx: -128, dy: 4, rot: 4 },
  { name: "Prizren", country: "Kosovo", flag: "\u{1F1FD}\u{1F1F0}", lat: 42.21, lon: 20.74, dx: 44, dy: -20, rot: -2 },
];


export const ARTICLES = [
  {
    title:
      "AI Slop UI: Why Every Vibe-Coded App Looks the Same, and 25 Copy-Paste UX Fixes You Can Use on Your Product Today",
    short: "AI Slop UI: 25 Copy-Paste UX Fixes for Vibe-Coded Apps",
    url: "https://medium.com/@samvllaco/ai-slop-ui-why-every-vibe-coded-app-looks-the-same-and-25-ux-design-fixes-that-make-yours-look-d4c4cb2939df",
    summary:
      "Cursor, Lovable, v0, GPT and Claude can ship a screen in 30 seconds. Here is how to make the result look like nobody will know AI made it, with prompts, color rules, a 4pt grid and DESIGN.md files you can paste in.",
    platform: "Medium",
  },
];

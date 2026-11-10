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

export const EMAIL = "hello@samvllaco.com";
export const COFFEE_URL = "";

export const NEWSLETTER = { buttondown: "" };

// Lordicon Pro: export each icon as Lottie JSON from your library, put the files in public/icons/
// and set the paths here, for example home: "/icons/home.json". Empty uses the built-in icon.
export const LORDICONS = { home: "", building: "", writing: "", products: "", globe: "", about: "" };

export const NAV = [
  { key: "home", href: "/", label: "Home", shortcut: "H" },
  { key: "building", href: "/building/", label: "Building", shortcut: "B" },
  { key: "writing", href: "/writing/", label: "Writing", shortcut: "W" },
  { key: "products", href: "/products/", label: "Products", shortcut: "P" },
  { key: "globe", href: "/globe/", label: "Globe", shortcut: "G" },
  { key: "about", href: "/about/", label: "About", shortcut: "A" },
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

// Certificates shown as trust badges in the footer. Add year only when known. href is optional.
export const CERTS = [
  { mark: "Ux", title: "Product Designer", issuer: "Uxcel", year: "2026" },
  { mark: "IxDF", title: "AI for Designers", issuer: "IxDF" },
  { mark: "Ux", title: "UX Design Foundations", issuer: "Uxcel", year: "2025" },
  { mark: "IxDF", title: "AI for Design Systems", issuer: "IxDF", year: "2025", href: "https://ixdf.org/members/samir-vllaco" },
  { mark: "UPA", title: "Graphic Design Fundamentals", issuer: "United Pixels Academy", year: "2019" },
];

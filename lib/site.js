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
    category: "UX design",
    cover: "/writing/ai-slop-ui.webp",
    coverAlt: "A machine on a conveyor belt turning identical purple app screens into one polished gold screen, with the words AI Slop UI Fix",
  },
];

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
export const BOOKING_URL = "";

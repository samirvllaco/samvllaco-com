// One place for facts and links. Edit here, every page and the schema update.
export const SITE = {
  url: "https://samvllaco.com",
  name: "Sam Vllaco",
  fullName: "Samir Vllaco",
  tagline: "Designer building apps.",
  description:
    "Sam Vllaco is a product designer with 10 years of experience who builds apps in public. See what he is shipping, what he writes and what he learns.",
  handle: "@samvllaco",
  links: {
    x: "https://x.com/samvllaco",
    medium: "https://medium.com/@samvllaco",
    dribbble: "https://dribbble.com/samirvllaco",
    figma: "https://www.figma.com/design/JDrxmwmeWbl1oyj1d4O391",
    ocufuse: "https://ocufuse.com",
    // Set this when the design studio domain is live. While it is empty, the
    // hire buttons point to the Dribbble profile instead.
    studio: "https://design.samvllaco.com",
  },
};

export const HIRE_URL = SITE.links.studio || SITE.links.dribbble;

export const NAV = [
  { href: "/building/", label: "Building" },
  { href: "/work/", label: "Work" },
  { href: "/writing/", label: "Writing" },
  { href: "/products/", label: "Products" },
  { href: "/now/", label: "Now" },
  { href: "/about/", label: "About" },
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

export const dynamic = "force-static";

import { WORK } from "../lib/work";

const base = "https://samvllaco.com";
const paths = ["/", "/building/", "/building/ocufuse/", "/writing/", "/products/", "/globe/", "/about/", "/links/", ...WORK.map((w) => `/work/${w.slug}/`)];

export default function sitemap() {
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}

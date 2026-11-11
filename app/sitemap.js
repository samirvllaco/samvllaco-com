export const dynamic = "force-static";

import { WORK } from "../lib/work";
import { SERVICES } from "../lib/services";

const base = "https://samvllaco.com";
const paths = ["/", "/writing/", "/services/", "/book/", "/products/", "/globe/", "/about/", ...WORK.map((w) => `/work/${w.slug}/`), ...SERVICES.flatMap((g) => g.items.map((it) => `/services/${it.id}/`))];

export default function sitemap() {
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}

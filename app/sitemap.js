export const dynamic = "force-static";

import { WORK } from "../lib/work";
import { SERVICE_PATHS } from "../lib/services";
import { POSTS } from "../lib/articles";

const base = "https://samvllaco.com";
const paths = ["/", "/work/", "/writing/", "/services/", "/book/", "/products/", "/pricing/", "/tools/", "/tools/ai-slop-ui-score/", "/tools/contrast-checker/", "/tools/design-cost-calculator/", "/resources/", "/fix-ai-slop-ui/", "/about/", "/eaa-audit/", "/accessibility/", ...WORK.map((w) => `/work/${w.slug}/`), ...SERVICE_PATHS, ...Object.keys(POSTS).map((s) => `/writing/${s}/`)];

export default function sitemap() {
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : ["/fix-ai-slop-ui/", "/book/", "/work/", "/services/", "/about/"].includes(p) ? 0.9 : 0.7,
  }));
}

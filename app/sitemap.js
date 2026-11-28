export const dynamic = "force-static";

import { INDUSTRIES } from "../lib/industries";
import { WORK } from "../lib/work";
import { SERVICE_PATHS } from "../lib/services";
import { POSTS } from "../lib/articles";

const base = "https://samvllaco.com";
const paths = ["/", "/work/", "/writing/", "/services/", "/book/", "/free-audit/", "/products/", "/tools/", "/slop-score/", "/tools/contrast-checker/", "/tools/design-cost-calculator/", "/tools/design-md-generator/", "/ai-slop-checker/", "/resources/", "/fix-ai-slop-ui/", "/about/", "/eaa-audit/", "/accessibility/", ...WORK.map((w) => `/work/${w.slug}/`), ...SERVICE_PATHS, ...INDUSTRIES.map((x) => `/for/${x.id}/`), ...Object.keys(POSTS).map((s) => `/writing/${s}/`)];

export default function sitemap() {
  const lastModified = new Date();
  // Articles carry their own modified date, so the date means something to crawlers (28 Nov 2026).
  const postDate = (p) => { const m = p.match(/^\/writing\/([^/]+)\/$/); return m && POSTS[m[1]] ? new Date(`${POSTS[m[1]].modified}T00:00:00Z`) : null; };
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: postDate(p) || lastModified,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : ["/fix-ai-slop-ui/", "/book/", "/work/", "/services/", "/about/"].includes(p) ? 0.9 : 0.7,
  }));
}

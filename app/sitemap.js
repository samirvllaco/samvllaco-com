export const dynamic = "force-static";

const base = "https://samvllaco.com";
const paths = ["/", "/building/", "/building/ocufuse/", "/work/", "/writing/", "/products/", "/now/", "/about/", "/links/"];

export default function sitemap() {
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: p === "/now/" ? "monthly" : "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}

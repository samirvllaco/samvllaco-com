export const dynamic = "force-static";

const base = "https://samvllaco.com";
const paths = ["/", "/building/", "/building/ocufuse/", "/writing/", "/products/", "/newsletter/", "/about/", "/links/"];

export default function sitemap() {
  const lastModified = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}

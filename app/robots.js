export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/cdn-cgi/" }],
    sitemap: "https://samvllaco.com/sitemap.xml",
  };
}

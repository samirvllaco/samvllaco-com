/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Inline the CSS into each page so it does not block the first paint.
  experimental: { inlineCss: true },
};

export default nextConfig;

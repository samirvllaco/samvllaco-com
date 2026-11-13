import { SITE } from "./site";

// Share card for a page: Open Graph and X use the same 1200x630 image.
export function share({ title, description, url, image = "/og/default.jpg", alt = "Sam Vllaco, product designer" }) {
  const images = [{ url: image, width: 1200, height: 630, alt }];
  return {
    openGraph: { type: "website", siteName: SITE.name, title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images: [image], site: SITE.handle, creator: SITE.handle },
  };
}

export const PERSON_ID = `${SITE.url}/#person`;

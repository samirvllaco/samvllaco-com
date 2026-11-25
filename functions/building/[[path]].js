// The old "What I'm building" page (about Ocufuse) is gone for good (owner, 21 and 25 Nov 2026).
// 410 Gone tells search engines to drop /building and everything under it faster than a redirect would.
export const onRequest = () =>
  new Response("This page was removed. Go to https://samvllaco.com/", {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex", "cache-control": "public, max-age=3600" },
  });

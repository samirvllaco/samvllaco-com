// The samvllaco-scanner Worker: renders one page with Browser Rendering for the site's Slop Score API.
// Reached only through the site's service binding (workers_dev and preview URLs are off), so it has no public address.
import { render, ScanError } from "./scan.js";
import { checkUrl } from "./url.js";

export default {
  async fetch(request, env) {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/render") return new Response("Not found", { status: 404 });
    const body = await request.json().catch(() => ({}));
    const c = checkUrl(String(body.url || ""));
    if (!c.ok) return Response.json({ error: "blocked" }, { status: 400 });
    try {
      return Response.json(await render(env, c.url));
    } catch (e) {
      return Response.json({ error: e instanceof ScanError ? e.code : "load" }, { status: 422 });
    }
  },
};

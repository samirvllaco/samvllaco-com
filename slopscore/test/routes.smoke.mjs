const m = await import(process.argv[2]);
const mem = new Map();
const stmt = (q, a = []) => ({ bind: (...x) => stmt(q, x), run: async () => ({}), all: async () => ({ results: [] }), first: async () => null });
const env = { DB: { prepare: (q) => stmt(q), batch: async () => [], exec: async () => {} }, CACHE: { get: async (k) => mem.get(k) ?? null, put: async (k, v) => mem.set(k, v) }, ADMIN_TOKEN: "t", TURNSTILE_SECRET_KEY: "x" };
const call = async (path, method = "GET", body, auth) => {
  const r = await m.handleApi({ request: new Request(`https://x.test/api/slop-score/${path}`, { method, headers: { "content-type": "application/json", ...(auth ? { authorization: "Bearer t" } : {}) }, body: body ? JSON.stringify(body) : undefined }), env, waitUntil: () => {} });
  return `${path} ${r.status} ${(await r.text()).slice(0, 80)}`;
};
for (const c of [["lead", "POST", { email: "a@b.co" }, true], ["lead", "POST", { email: "bad" }, true], ["event", "POST", { type: "book_click", id: "abcdefghij" }], ["unsubscribe?t=abc"], ["admin/stats", "GET", null, true], ["admin/drip", "GET", null, true], ["report/abcdefghij"], ["claim", "POST", { email: "a@b.co", id: "abcdefghij" }, true]]) console.log(await call(...c));

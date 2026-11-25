// URL checks for Slop Score: http(s) only, public hostnames only. Pure, unit tested.

function v4(host) {
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  const p = m.slice(1).map(Number);
  if (p.some((x) => x > 255)) return null;
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}

const PRIVATE_V4 = ["0.0.0.0/8", "10.0.0.0/8", "100.64.0.0/10", "127.0.0.0/8", "169.254.0.0/16", "172.16.0.0/12", "192.0.0.0/24", "192.168.0.0/16", "198.18.0.0/15", "224.0.0.0/4", "240.0.0.0/4"]
  .map((c) => { const [a, bits] = c.split("/"); return [v4(a), Number(bits)]; });

const inRange = (ip, [base, bits]) => bits === 0 || (ip >>> (32 - bits)) === (base >>> (32 - bits));

export function isBlockedHost(hostname) {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (!h) return true;
  if (h === "localhost" || /\.(localhost|local|internal|lan|home|corp|intranet|test|invalid|example)$/.test(h)) return true;
  if (h === "metadata.google.internal" || h === "metadata") return true;
  if (h.includes(":")) {
    // IPv6 literal: block loopback, unspecified, unique local, link-local and v4-mapped private.
    if (h === "::1" || h === "::") return true;
    if (/^f[cd][0-9a-f]{0,2}:/.test(h) || /^fe[89ab][0-9a-f]?:/.test(h)) return true;
    if (/::ffff:/.test(h)) return true; // IPv4-mapped (URL parsing turns ::ffff:127.0.0.1 into ::ffff:7f00:1)
    return false;
  }
  const ip = v4(h);
  if (ip !== null) return PRIVATE_V4.some((r) => inRange(ip, r));
  if (/^\d+$/.test(h) || /^0x/i.test(h)) return true; // decimal or hex IP tricks
  if (!h.includes(".")) return true; // single-label names are never public sites
  return false;
}

// Returns { ok: true, url, host } or { ok: false, reason: "invalid" | "blocked" | "too_long" }.
export function checkUrl(input) {
  let raw = String(input || "").trim();
  if (!raw) return { ok: false, reason: "invalid" };
  if (raw.length > 2048) return { ok: false, reason: "too_long" };
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = `https://${raw}`;
  let u;
  try { u = new URL(raw); } catch { return { ok: false, reason: "invalid" }; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return { ok: false, reason: "invalid" };
  if (u.username || u.password) return { ok: false, reason: "invalid" };
  if (u.port && u.port !== "80" && u.port !== "443") return { ok: false, reason: "blocked" };
  if (isBlockedHost(u.hostname)) return { ok: false, reason: "blocked" };
  u.hash = "";
  u.hostname = u.hostname.toLowerCase();
  let url = u.toString();
  if (u.pathname === "/" && !u.search) url = url.replace(/\/$/, "");
  return { ok: true, url, host: u.hostname.replace(/^www\./, "") };
}

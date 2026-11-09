import { NEWSLETTER, SITE } from "../lib/site";

export default function Newsletter({ id = "newsletter" }) {
  const user = NEWSLETTER.buttondown;
  if (!user) {
    return (
      <div className="card" id={id}>
        <h3>Newsletter</h3>
        <p>Launching soon. Until then, follow along on <a href={SITE.links.x} rel="me noopener">X</a>.</p>
      </div>
    );
  }
  return (
    <form
      className="card"
      id={id}
      action={`https://buttondown.com/api/emails/embed-subscribe/${user}`}
      method="post"
      target="popupwindow"
    >
      <h3>Get the newsletter</h3>
      <p>What I am building and what I learn. Short, no spam.</p>
      <label htmlFor={`${id}-email`} style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Email</label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        style={{ minHeight: 48, padding: "0 14px", borderRadius: 10, border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", font: "inherit" }}
      />
      <button className="btn btn-primary" type="submit">Subscribe</button>
    </form>
  );
}

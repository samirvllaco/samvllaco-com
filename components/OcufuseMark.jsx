import Link from "next/link";

// Metal plate with the real Ocufuse logo (icon + wordmark) engraved into it.
export default function OcufuseMark({ href, text, cta, tag = "Live" }) {
  const body = (
    <>
      <span className="plate-tag">{tag}</span>
      <div className="well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="engrave" src="/ocufuse/logo-icon-blue-128.webp" alt="" width="64" height="64" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="engrave" src="/ocufuse/logo-word-navy-64.webp" alt="Ocufuse" width="142" height="32" />
      </div>
      {text && (
        <div className="plate-text">
          <p>{text}</p>
          {cta && <span>{cta}</span>}
        </div>
      )}
    </>
  );
  if (!href) return <div className="plate">{body}</div>;
  const external = href.startsWith("http");
  return external ? (
    <a className="plate" href={href}>{body}</a>
  ) : (
    <Link className="plate" href={href}>{body}</Link>
  );
}

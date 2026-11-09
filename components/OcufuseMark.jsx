import Link from "next/link";

// Square metal plate with the real Ocufuse logo engraved into it.
export default function OcufuseMark({ href, text, cta, tag = "Live" }) {
  const plate = (
    <>
      <div className="well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="engrave" src="/ocufuse/logo-icon-blue-128.webp" alt="" width="96" height="96" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="engrave" src="/ocufuse/logo-word-navy-64.webp" alt="Ocufuse" width="142" height="32" />
      </div>
    </>
  );
  const external = href.startsWith("http");
  return (
    <div className="product">
      {external ? <a className="plate" href={href}>{plate}</a> : <Link className="plate" href={href}>{plate}</Link>}
      {text && (
        <div className="plate-text">
          <p>{text}</p>
          {cta && <span><a href={href}>{cta}</a></span>}
        </div>
      )}
    </div>
  );
}

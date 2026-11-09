import Link from "next/link";

// 64px square metal plate with the real Ocufuse icon engraved, nothing else inside.
export default function OcufuseMark({ href, text, cta }) {
  const external = href.startsWith("http");
  const plate = (
    <>
      <div className="well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="engrave" src="/ocufuse/logo-icon-blue-128.webp" alt="Ocufuse" width="58" height="58" />
      </div>
    </>
  );
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

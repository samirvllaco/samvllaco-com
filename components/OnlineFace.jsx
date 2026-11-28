// Sam's square photo with a live "online" badge (owner, 28 Nov 2026, after digitalmakers.nl/services/boost, "make it
// square"): a soft green tile on the photo's corner with a light sweep turning round a green dot, like a radar. The
// sweep waits for the first interaction (html.is-live) and stops for reduced motion. Plain markup, so server and
// client components can both use it.
export default function OnlineFace({ size = 56, src = "/sam-face-144.webp?v=1", alt = "", lazy = true, className = "" }) {
  return (
    <span className={`of${className ? ` ${className}` : ""}`} style={{ "--of": `${size}px` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={size} height={size} alt={alt} loading={lazy ? "lazy" : undefined} decoding="async" />
      <span className="of-badge" aria-hidden="true"><i /></span>
    </span>
  );
}

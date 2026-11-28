import { BRANDS } from "../lib/brands";

// Logo and product name in the bottom left of a work thumbnail. Decorative: the card's title says what it is.
export default function WorkBadge({ slug }) {
  const b = BRANDS[slug];
  if (!b) return null;
  return (
    <span className="wbadge" aria-hidden="true">
      {b.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.logo} width="48" height="48" alt="" loading="lazy" decoding="async" />
      ) : (
        <i style={{ background: b.color }}>{b.name[0]}</i>
      )}
      {b.name}
    </span>
  );
}

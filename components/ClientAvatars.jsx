import { SHOWN_CLIENTS, ILLUSTRATIVE } from "../lib/clients";

const PERSON = "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.400 0-8 2.200-8 5v1h16v-1c0-2.800-3.600-5-8-5Z";

// Decorative stack of illustrative photos. Not clients: keep it away from trust or review wording.
export function PeopleStack({ max = 7 }) {
  return (
    <span className="ht-av ht-people" aria-hidden="true">
      {ILLUSTRATIVE.slice(0, max).map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <i key={src}><img src={src} width="80" height="80" alt="" loading="lazy" /></i>
      ))}
    </span>
  );
}

// Overlapping avatar stack. Shows verified client photos from lib/clients.js.
// With none verified it shows four neutral icons, or nothing when `facesOnly` is set.
export default function ClientAvatars({ max = 5, facesOnly = false }) {
  const faces = SHOWN_CLIENTS.slice(0, max);
  if (!faces.length && facesOnly) return null;
  return (
    <span className="ht-av" aria-hidden="true">
      {faces.length
        ? faces.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element
          <i key={c.name + c.project}><img src={c.photo} width="80" height="80" alt="" loading="lazy" /></i>
        ))
        : [0, 1, 2, 3].map((k) => (
          <i key={k}><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d={PERSON} /></svg></i>
        ))}
    </span>
  );
}

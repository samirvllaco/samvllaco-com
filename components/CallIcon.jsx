// Calendar glyph used on the "Book a call" buttons. A calendar reads as "pick a time", not "camera on".
export default function CallIcon() {
  return (
    <svg className="call-ico" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="7" y="2.5" width="2.2" height="4.5" rx="1.1" fill="currentColor" />
      <rect x="14.8" y="2.5" width="2.2" height="4.5" rx="1.1" fill="currentColor" />
      <path fillRule="evenodd" d="M6 4.8h12a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7.8a3 3 0 0 1 3-3zM5 10v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8H5z" fill="currentColor" />
      <rect x="7" y="12" width="3" height="2.6" rx=".8" fill="currentColor" />
      <rect x="10.5" y="12" width="3" height="2.6" rx=".8" fill="currentColor" />
      <rect x="7" y="15.6" width="3" height="2.6" rx=".8" fill="currentColor" />
    </svg>
  );
}

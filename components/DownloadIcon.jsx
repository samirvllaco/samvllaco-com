// Filled download glyph, drawn to match CallIcon (same size, weight and spacing).
export default function DownloadIcon() {
  return (
    <svg className="call-ico" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M12 3.2a1.4 1.4 0 0 1 1.4 1.4v7.6l2.500-2.500a1.4 1.4 0 1 1 2 2l-4.900 4.900a1.4 1.400 0 0 1-2 0L6.100 11.700a1.4 1.4 0 1 1 2-2l2.500 2.500V4.600A1.4 1.4 0 0 1 12 3.200z" fill="currentColor" />
      <rect x="3.500" y="17.600" width="17" height="3.200" rx="1.600" fill="currentColor" />
    </svg>
  );
}

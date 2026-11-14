// "5.0 stars, 200+ reviews worldwide" proof line for hero sections, the same claim and look as the reviews card.
const Star = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" /></svg>
);

export default function HeroReviews({ className = "" }) {
  return (
    <p className={`hr-rev ${className}`.trim()}>
      <span className="hr-top"><span className="hr-stars" aria-hidden="true"><Star /><Star /><Star /><Star /><Star /></span><b>5.0</b><span className="sr-only"> out of 5 stars,</span></span>
      <span className="hr-txt"><b>200+ reviews</b> <span className="t2">worldwide</span></span>
    </p>
  );
}

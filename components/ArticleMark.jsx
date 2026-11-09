import { MEDIUM_PATH } from "../lib/medium-logo";

// Square metal plate for an article, engraved with the platform name.
export default function ArticleMark({ href, platform, title, tag = "Read" }) {
  return (
    <div className="product">
      <a className="plate" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${platform}, opens in a new tab`}>
          <div className="well">
          {platform === "Medium" ? (
            <svg className="engrave-svg" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4.2" fill="#fff" /><path d={MEDIUM_PATH} fill="#000" /></svg>
          ) : (
            <span className="engrave-text">{platform.charAt(0)}</span>
          )}
        </div>
      </a>
      <div className="plate-text">
        <p>{title}</p>
      </div>
    </div>
  );
}

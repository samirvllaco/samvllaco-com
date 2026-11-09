import { MEDIUM_PATH } from "../lib/medium-logo";

// Square metal plate for an article, engraved with the platform name.
export default function ArticleMark({ href, platform, title, tag = "Read" }) {
  return (
    <div className="product">
      <a className="plate" href={href} aria-label={platform}>
          <div className="well">
          {platform === "Medium" ? (
            <svg className="engrave-svg" viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" style={{ maxWidth: "100%", maxHeight: "100%" }}><path d={MEDIUM_PATH} fill="#4d5a69" /></svg>
          ) : (
            <span className="engrave-text">{platform.charAt(0)}</span>
          )}
        </div>
      </a>
      <div className="plate-text">
        <p>{title}</p>
        <span><a href={href}>Read on {platform}</a></span>
      </div>
    </div>
  );
}

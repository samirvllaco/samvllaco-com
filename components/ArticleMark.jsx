// Square metal plate for an article, engraved with the platform name.
export default function ArticleMark({ href, platform, title, tag = "Read" }) {
  return (
    <div className="product">
      <a className="plate" href={href} aria-label={platform}>
          <div className="well">
          <span className="engrave-text">{platform.charAt(0)}</span>
        </div>
      </a>
      <div className="plate-text">
        <p>{title}</p>
        <span><a href={href}>Read on {platform}</a></span>
      </div>
    </div>
  );
}

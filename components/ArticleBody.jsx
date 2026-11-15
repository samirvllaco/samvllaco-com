import Link from "next/link";
import CopyBlock from "./CopyBlock";
import { parseInline } from "../lib/md";

function Inline({ nodes }) {
  return nodes.map((n, i) => {
    if (n.t === "text") return n.text;
    if (n.t === "code") return <code key={i}>{n.text}</code>;
    if (n.t === "b") return <strong key={i}><Inline nodes={n.kids} /></strong>;
    if (n.t === "i") return <em key={i}><Inline nodes={n.kids} /></em>;
    if (n.href.startsWith("/")) return <Link prefetch={false} key={i} href={n.href}><Inline nodes={n.kids} /></Link>;
    return <a key={i} href={n.href} target="_blank" rel="noopener noreferrer"><Inline nodes={n.kids} /><span className="sr-only"> (opens in a new tab)</span></a>;
  });
}
const T = ({ text }) => <Inline nodes={parseInline(text)} />;

// Renders the parsed article. The first image is the cover and is shown in the page header, so it is skipped here.
export default function ArticleBody({ blocks, post }) {
  return blocks.map((b, i) => {
    if (b.t === "h2") return <h2 key={i} id={b.id}><T text={b.text} /></h2>;
    if (b.t === "h3") return <h3 key={i} id={b.id}><T text={b.text} /></h3>;
    if (b.t === "p") return <p key={i}><T text={b.text} /></p>;
    if (b.t === "quote") return <blockquote key={i}><p><T text={b.text} /></p></blockquote>;
    if (b.t === "ul") return <ul key={i}>{b.items.map((x) => <li key={x}><T text={x} /></li>)}</ul>;
    if (b.t === "ol") return <ol key={i}>{b.items.map((x) => <li key={x}><T text={x} /></li>)}</ol>;
    if (b.t === "code") return <CopyBlock key={i} text={b.text} />;
    if (b.t === "img") {
      const n = Number(b.ref.replace("IMG", ""));
      if (n === 1 && post.coverIsFirst) return null;
      const [file, w, h] = post.images[n - 1];
      // eslint-disable-next-line @next/next/no-img-element
      return <figure key={i} className="art-fig"><img src={`${post.imageDir}${file}`} width={w} height={h} alt={b.alt} loading="lazy" decoding="async" /></figure>;
    }
    return null;
  });
}

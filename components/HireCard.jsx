"use client";
import OnlineFace from "./OnlineFace";
import CallIcon from "./CallIcon";
import { EMAIL, SITE } from "../lib/site";
import { useCopyChip } from "./CopyChip";
import { copyText } from "../lib/copy";

// Card with Sam's photo and ways to get in touch. `wide` lays it out in one row.
export default function HireCard({ wide = false }) {
  const { chip, live, start } = useCopyChip();
  async function copy(e) {
    if (await copyText(EMAIL, e.currentTarget.querySelector("span"))) start();
  }
  return (
      <div className={`hire${wide ? " hire-wide" : ""}`}>
        <div className="hire-top">
          <OnlineFace size={56} alt="Sam Vllaco" lazy={false} />
          <div>
            <p className="hire-name">Sam Vllaco</p>
            <p className="hire-status">Open to new projects</p>
          </div>
        </div>
        <p className="hire-text">Need a product designed like this? Tell me what you are building.</p>
        <a className="hero2-btn hero2-btn-primary hire-btn" href="/book/">Start a project<CallIcon /></a>
        <button type="button" className="hire-copy" onClick={copy}>
          <span>{EMAIL}</span>
          <span className="sr-only">Copy email</span>{chip}
        </button>
        {live}
        <a className="hire-x" href={SITE.links.x} rel="me noopener">Or message me on X</a>
      </div>
  );
}

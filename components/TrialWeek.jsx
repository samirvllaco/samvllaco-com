import { TRIAL_WEEK, PROJECT_FROM, usd } from "../lib/plans";
import CallIcon from "./CallIcon";

// Trial week (owner, 27 Nov 2026: "a good section to add on the home page before the FAQ", $2,500). A closing call, so
// it sits centred like the footer call. No conversion stat: there is no real number for it yet.
export default function TrialWeek() {
  return (
    <section className="tw" id="trial" aria-labelledby="tw-h" data-bg="#0e0e10">
      <h2 id="tw-h">Start with a trial week <span className="t2">for only</span> <mark className="tw-price">{usd(TRIAL_WEEK)}</mark></h2>
      <p>One week on a real problem in your product, so you see how I think, how fast I move and what the files look like. If it fits, the full project starts from there, from {usd(PROJECT_FROM)}. If not, you keep everything I made that week.</p>
      <div className="tw-go btn-row">
        <a className="hero2-btn hero2-btn-primary" href="/book/">Start a trial week<CallIcon /></a>
        <a className="hero2-btn hero2-btn-light" href="/work/">See my work</a>
      </div>
    </section>
  );
}

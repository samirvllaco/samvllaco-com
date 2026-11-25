// Slop Score result page: the static page, with the score in the share title. Source: slopscore/src/api.js.
import { handleResultPage } from "../../_slop/api.js";
export const onRequestGet = (ctx) => handleResultPage(ctx);

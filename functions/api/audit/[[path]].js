import { handleAudit } from "../../_slop/api.js";
export const onRequest = (ctx) => handleAudit(ctx);

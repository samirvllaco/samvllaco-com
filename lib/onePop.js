import { useEffect, useRef } from "react";

// One popup at a time (owner, 27 Nov 2026: "fix 2 dropdown open bug, use clear logic"). Every menu, panel and
// popover calls useOnePop(id, open, close): when it opens it tells the page, and every other open one closes.
const EV = "pop:open";
export const openPop = (id) => window.dispatchEvent(new CustomEvent(EV, { detail: id }));

export function useOnePop(id, open, close) {
  const shut = useRef(close);
  shut.current = close;
  useEffect(() => { if (open) openPop(id); }, [open, id]);
  useEffect(() => {
    const f = (e) => { if (e.detail !== id) shut.current(); };
    window.addEventListener(EV, f);
    return () => window.removeEventListener(EV, f);
  }, [id]);
}

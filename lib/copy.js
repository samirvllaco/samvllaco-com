// Copy text to the clipboard. In-app browsers (Instagram, X) often block that,
// so fall back to selecting `node`, ready for the reader's own Copy. Returns true when copied.
export async function copyText(text, node) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (node) {
      const r = document.createRange();
      r.selectNodeContents(node);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
    return false;
  }
}

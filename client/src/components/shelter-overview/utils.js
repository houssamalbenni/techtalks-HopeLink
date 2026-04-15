/* ── Helper Functions ──────────────────────────────────────── */
export function capClass(pct) {
  if (pct < 60) return "cap-low";
  if (pct < 85) return "cap-mid";
  return "cap-high";
}

export function pageButtons(totalPages) {
  const btns = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) btns.push(i);
  } else {
    btns.push(1, 2, 3, "…", totalPages);
  }
  return btns;
}

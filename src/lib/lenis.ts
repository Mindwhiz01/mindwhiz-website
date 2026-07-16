// Singleton handle to the app-wide Lenis instance mounted by SmoothScroll,
// so pinned sections can drive programmatic scrolls through Lenis instead of
// fighting it with window.scrollTo.

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

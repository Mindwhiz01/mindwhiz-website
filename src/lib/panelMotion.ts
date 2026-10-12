"use client";

// Motion props for the pinned full-screen slide decks (Process, Core Values,
// "Web that works"). Every deck is the same panel: a full-bleed image behind a
// dark gradient, a giant ghost index top-right, and text blocks.
//
// One behavior at every width - the deck pins and cross-fades on phones
// exactly as it does on desktop, so only the active panel is ever visible.
// Everything is driven imperatively off `isActive`; `initial={false}` keeps
// the deck from animating on mount, so it animates on step changes only.
//
// Shared so the four decks can't drift apart.

import { SLIDE_MS } from "@/lib/useSlideSnap";

export const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

const SLIDE_S = SLIDE_MS / 1000;

type PanelState = { isActive: boolean };

/** The panel wrapper: cross-fades between steps. */
export function panelWrapperMotion({ isActive }: PanelState) {
  return {
    initial: false as const,
    animate: { opacity: isActive ? 1 : 0 },
    transition: { duration: SLIDE_S, ease: PANEL_EASE },
  };
}

/** The full-bleed background image: settles from a 1.15 zoom. */
export function panelImageMotion({ isActive }: PanelState) {
  return {
    initial: false as const,
    animate: { scale: isActive ? 1 : 1.15 },
    transition: { duration: 1.1, ease: PANEL_EASE },
  };
}

/** The giant ghost index number, top-right. */
export function panelNumberMotion({ isActive }: PanelState) {
  return {
    initial: false as const,
    animate: { y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 },
    transition: { duration: SLIDE_S, ease: PANEL_EASE },
  };
}

/** Heading / description blocks. */
export function panelTextMotion({ isActive }: PanelState) {
  return {
    initial: false as const,
    animate: isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 },
    transition: {
      duration: SLIDE_S,
      ease: PANEL_EASE,
      // let the image start moving before the copy follows it in
      delay: isActive ? 0.12 : 0,
    },
  };
}

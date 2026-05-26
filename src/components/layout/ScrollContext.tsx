"use client";

import Lenis from "lenis";
import { createContext, useContext } from "react";

type ScrollContextValue = {
  lenis: Lenis | null;
};

export const ScrollContext = createContext<ScrollContextValue>({ lenis: null });

export function useLenis() {
  return useContext(ScrollContext).lenis;
}

export function useSmoothScrollTo() {
  const lenis = useLenis();

  return (href: string, offset = -88) => {
    const el = document.querySelector(href);
    if (!(el instanceof HTMLElement)) return;
    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.35 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
}

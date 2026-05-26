"use client";

import { useEffect, useState } from "react";
import { sceneStore } from "@/lib/sceneStore";
import { cn } from "@/utils/cn";

export function ProductRotateHint() {
  const [visible, setVisible] = useState(true);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const unsub = sceneStore.subscribe(() => {
      const { productEngaged } = sceneStore.getState();
      if (productEngaged) {
        setEngaged(true);
        setVisible(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const onMove = () => {
      if (!engaged) {
        sceneStore.setState({ productEngaged: true });
      }
    };
    window.addEventListener("pointermove", onMove, { once: true, passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [engaged]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "hero-rotate-hint pointer-events-none absolute z-20 flex items-center gap-2 rounded-full border border-white/12 bg-background/50 px-4 py-2.5 backdrop-blur-md",
        "right-[8%] bottom-[38%] md:right-[12%] md:bottom-[42%]"
      )}
      role="status"
      aria-live="polite"
    >
      <span className="hero-rotate-hint__icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 9a5 5 0 0 1 10 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 6l2 3-2 3M6 6L4 9l2 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[0.7rem] font-medium tracking-wide text-foreground/90">
        Drag to explore · Move cursor to rotate
      </span>
    </div>
  );
}

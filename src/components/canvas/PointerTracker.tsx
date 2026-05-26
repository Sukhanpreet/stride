"use client";

import { useEffect } from "react";
import { sceneStore } from "@/lib/sceneStore";

/** Tracks window pointer for cursor light & camera parallax (canvas is pointer-events-none). */
export function PointerTracker() {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (sceneStore.getState().interactionPaused) return;
      sceneStore.setPointer({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
      sceneStore.setState({ productEngaged: true });
    };

    const onLeave = () => {
      sceneStore.setPointer({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return null;
}

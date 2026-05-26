"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneStore } from "@/lib/sceneStore";

/** Global scroll progress for navbar — product mode is owned by StoryTrack / hero choreography */
export function SceneScrollDirector() {
  useEffect(() => {
    const progressTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const { scrollProgress } = sceneStore.getState();
        if (scrollProgress === self.progress) return;
        sceneStore.setState({ scrollProgress: self.progress });
      },
    });

    return () => {
      progressTrigger.kill();
    };
  }, []);

  return null;
}

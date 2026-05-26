"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneStore } from "@/lib/sceneStore";

/** Blends 3D scene into calm ending composition from About through CTA */
export function EndingScrollBridge() {
  useEffect(() => {
    const about = document.getElementById("about");
    const shop = document.getElementById("shop");
    if (!about || !shop) return;

    const setEnding = (value: number) => {
      const clamped = Math.max(0, Math.min(1, value));
      const { endingProgress } = sceneStore.getState();
      if (endingProgress === clamped) return;
      sceneStore.setState({ endingProgress: clamped });
      document.documentElement.dataset.ending =
        clamped > 0.08 ? "true" : "false";
    };

    const blend = ScrollTrigger.create({
      trigger: about,
      start: "top 95%",
      endTrigger: shop,
      end: "top 42%",
      scrub: 0.35,
      onUpdate: (self) => setEnding(self.progress),
      onLeaveBack: () => setEnding(0),
    });

    const ctaZone = ScrollTrigger.create({
      trigger: shop,
      start: "top 55%",
      end: "bottom 15%",
      onEnter: () => {
        sceneStore.setState({
          productMode: "hero",
          highlightSegment: null,
          interactionPaused: false,
        });
      },
      onEnterBack: () => {
        sceneStore.setState({
          productMode: "hero",
          highlightSegment: null,
          interactionPaused: false,
        });
      },
    });

    return () => {
      blend.kill();
      ctaZone.kill();
      setEnding(0);
      delete document.documentElement.dataset.ending;
    };
  }, []);

  return null;
}

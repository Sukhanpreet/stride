"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ProductMode } from "@/lib/sceneStore";
import { sceneStore } from "@/lib/sceneStore";

function productModeAt(
  progress: number,
  sectionIndex: number
): ProductMode {
  if (progress < 0.12) return "hero";
  if (sectionIndex === 0) return "comfort";
  if (sectionIndex === 1) return "materials";
  return "performance";
}
import { STORY_PIN_END, STORY_SCRUB } from "@/lib/scrollConfig";
import { StorySection } from "@/components/sections/StorySection";
import { storyPanels } from "@/data/story";

export function StoryTrack() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-story-panel]",
        track
      );

      if (prefersReduced || panels.length === 0) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      panels.forEach((panel, index) => {
        const eyebrow = panel.querySelector("[data-story-eyebrow]");
        const title = panel.querySelector("[data-story-title]");
        const body = panel.querySelector("[data-story-body]");
        const stat = panel.querySelector("[data-story-stat]");
        const statValue = panel.querySelector("[data-story-stat-value]");
        const labels = panel.querySelectorAll("[data-story-label]");
        const foamGlow = panel.querySelector("[data-story-foam-glow]");
        const speedlines = panel.querySelector("[data-story-speedlines]");
        const lines = [eyebrow, title, body, stat].filter(Boolean);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 80px",
            end: STORY_PIN_END,
            pin: true,
            scrub: STORY_SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const total = panels.length;
              const storySpan = 0.9;
              const progress = 0.1 + ((index + self.progress) / total) * storySpan;
              sceneStore.setState({
                sectionIndex: index,
                sectionProgress: self.progress,
                progress,
                productMode: productModeAt(progress, index),
              });
            },
            onLeaveBack: () => {
              if (index === 0) {
                sceneStore.setState({
                  progress: 0.1,
                  sectionIndex: 0,
                  sectionProgress: 0,
                });
              }
            },
          },
        });

        tl.fromTo(
          lines,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            ease: "power2.out",
            duration: 0.38,
          },
          0
        ).to(lines, { opacity: 1, y: 0, duration: 0.55, ease: "none" }, 0.38);

        if (!isMobile && labels.length) {
          tl.fromTo(
            labels,
            { x: index % 2 === 0 ? 24 : -24, opacity: 0, scale: 0.96 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.12,
              ease: "power2.out",
              duration: 0.28,
            },
            0.25
          );
        }

        const mobileLabels = panel.querySelectorAll("[data-story-label-mobile]");
        if (isMobile && mobileLabels.length) {
          tl.fromTo(
            mobileLabels,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 },
            0.35
          );
        }

        if (statValue) {
          tl.fromTo(
            statValue,
            { scale: 0.88, opacity: 0.6 },
            { scale: 1, opacity: 1, ease: "power2.out", duration: 0.35 },
            0.28
          );
        }

        if (index === 0 && foamGlow) {
          tl.fromTo(
            foamGlow,
            { opacity: 0, scale: 0.85 },
            { opacity: 0.85, scale: 1, duration: 0.5, ease: "power1.inOut" },
            0.35
          );
        }

        if (index === 1 && title) {
          tl.fromTo(
            title,
            { letterSpacing: "-0.06em" },
            { letterSpacing: "-0.02em", duration: 0.45, ease: "power2.out" },
            0.15
          );
        }

        if (index === 2) {
          if (title) {
            tl.fromTo(
              title,
              { x: index % 2 === 0 ? -40 : 40 },
              { x: 0, ease: "power3.out", duration: 0.4 },
              0.1
            );
          }
          if (speedlines) {
            tl.fromTo(
              speedlines,
              { opacity: 0 },
              { opacity: 0.55, duration: 0.5, ease: "power1.inOut" },
              0.25
            );
          }
        }
      });

      const onLayout = () => {
        window.dispatchEvent(new Event("story-hotspots-measure"));
      };
      ScrollTrigger.addEventListener("refresh", onLayout);

      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refresh", onLayout);
      };
    },
    { scope: trackRef, dependencies: [] }
  );

  return (
    <div ref={trackRef} id="story-track" className="relative">
      {storyPanels.map((panel, index) => (
        <StorySection key={panel.id} panel={panel} index={index} />
      ))}
    </div>
  );
}

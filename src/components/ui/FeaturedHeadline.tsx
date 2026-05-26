"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type FeaturedHeadlineProps = {
  className?: string;
};

/** Catalog hero type — sharp lines with a soft echo behind the stack */
export function FeaturedHeadline({ className }: FeaturedHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const lines = root.querySelectorAll<HTMLElement>("[data-featured-line]");
      const beam = root.querySelector<HTMLElement>("[data-featured-beam]");

      gsap.from(lines, {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      if (beam) {
        gsap.from(beam, {
          scaleX: 0,
          opacity: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("featured-headline", className)}>
      <p className="featured-headline__ghost" aria-hidden>
        <span>Featured</span>
        <span>Drops</span>
      </p>

      <h2 className="featured-headline__stack" data-featured-title>
        <span className="featured-headline__line" data-featured-line>
          Featured
        </span>
        <span
          className="featured-headline__line featured-headline__line--accent"
          data-featured-line
        >
          Drops
        </span>
      </h2>

      <span className="featured-headline__beam" data-featured-beam aria-hidden />
    </div>
  );
}

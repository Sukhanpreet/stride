"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { CollectionsHeadline } from "@/components/ui/CollectionsHeadline";
import { Container } from "@/components/ui/Container";
import { CollectionsAtmosphere } from "@/components/sections/CollectionsAtmosphere";
import { collections, collectionsStyleCount } from "@/data/products";
import { cn } from "@/utils/cn";

export function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const rail = railRef.current;
      if (!rail) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-collections-eyebrow], [data-collections-meta]", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-collection-item]", {
        x: 56,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rail,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="section-showcase section-collections relative overflow-hidden"
    >
      <div
        className="section-continuity__veil pointer-events-none absolute inset-x-0 top-0 h-28"
        aria-hidden
      />

      <CollectionsAtmosphere />

      <Container className="collections-section__container relative z-[1] py-[var(--space-12)] md:py-[var(--space-12)]">
        <div className="collections-section__intro mb-[var(--space-8)] md:mb-[var(--space-10)]">
          <div className="collections-section__header-row flex flex-col gap-[var(--space-6)] md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p
                className="text-eyebrow mb-[var(--space-2)]"
                data-collections-eyebrow
              >
                Browse by style
              </p>
              <CollectionsHeadline />
            </div>
            <p
              className="collections-section__meta text-body-readable max-w-xs md:text-right"
              data-collections-meta
            >
              <span className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {collectionsStyleCount}
              </span>{" "}
              styles indexed across{" "}
              <span className="text-accent">{collections.length} lanes</span>
            </p>
          </div>
        </div>

        <ul
          ref={railRef}
          className="collections-rail collections-rail--stagger"
          aria-label="Product collections"
        >
          {collections.map((collection, index) => (
            <li
              key={collection.id}
              data-collection-item
              className={cn(
                "collections-rail__item",
                index === 0 && "collections-rail__item--lead"
              )}
            >
              <CollectionCard
                collection={collection}
                index={index}
                lead={index === 0}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

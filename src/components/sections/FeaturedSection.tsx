"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { FeaturedHeadline } from "@/components/ui/FeaturedHeadline";
import { ProductModule } from "@/components/ui/ProductModule";
import { FeaturedAtmosphere } from "@/components/sections/FeaturedAtmosphere";
import { featuredProducts } from "@/data/products";
import { sceneStore } from "@/lib/sceneStore";
import { cn } from "@/utils/cn";

export function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(featuredProducts[0]?.id ?? "");

  const onProductFocus = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const rail = railRef.current;
      if (!section) return;

      gsap.from("[data-featured-eyebrow], [data-featured-sub]", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      if (rail) {
        gsap.from("[data-product-module]", {
          x: 40,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rail,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 30%",
        onEnter: () => sceneStore.setState({ productMode: "hero" }),
        onEnterBack: () => sceneStore.setState({ productMode: "hero" }),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="section-showcase section-showcase--featured relative overflow-hidden scroll-mt-28"
      data-reveal-section
    >
      <FeaturedAtmosphere />

      <Container className="featured-section__container relative z-[1] pb-[var(--space-8)] md:pb-[var(--space-10)]">
        <div className="featured-section__intro">
          <header className="featured-header">
            <p className="text-eyebrow mb-[var(--space-2)]" data-featured-eyebrow>
              Engineered for motion
            </p>
            <FeaturedHeadline />
            <p
              className="text-body-readable mt-[var(--space-4)] max-w-xl"
              data-featured-sub
            >
              Same premium build, different silhouettes. Hover a module to preview
              on the live product stage.
            </p>
          </header>
        </div>

        <div
          ref={railRef}
          className="featured-rail"
          role="list"
          aria-label="Featured products"
        >
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              role="listitem"
              className={cn(
                "featured-rail__item",
                index === 0 && "featured-rail__item--lead"
              )}
            >
              <ProductModule
                product={product}
                featured={index === 0}
                active={activeId === product.id}
                onFocus={() => onProductFocus(product.id)}
              />
            </div>
          ))}
        </div>

        <p
          className="text-eyebrow featured-section__hud mt-[var(--space-6)] flex items-center gap-[var(--space-2)] text-muted-bright"
          data-featured-catalog-hud
        >
          <span className="inline-block h-px w-8 bg-accent/50" aria-hidden />
          Catalog scan — hover to sync colorway with stage
        </p>
      </Container>
    </section>
  );
}

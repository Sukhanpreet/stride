"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/data/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-story-close relative min-h-[min(100svh,780px)] overflow-hidden"
      data-reveal-section
    >
      <div
        className="section-story-close__atmosphere pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="section-story-close__divider pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden />

      <Container size="narrow" className="section-story-close__inner relative">
        <SectionHeader
          eyebrow="Our story"
          title="Built for the street. Made to last."
          className="mb-[var(--space-6)]"
        />
        <p className="text-body-lg mb-[var(--space-5)]" data-reveal-item>
          {siteConfig.description}
        </p>
        <p className="text-body-lg text-muted" data-reveal-item>
          {siteConfig.name} is a sneaker shop focused on quality materials,
          honest pricing, and drops you will actually want to wear — not just
          collect.
        </p>
      </Container>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ShopCtaSection() {
  return (
    <section
      id="shop"
      className="section-ending-cta relative min-h-[100svh]"
      aria-labelledby="ending-cta-title"
    >
      <div className="ending-cta__backdrop pointer-events-none absolute inset-0" aria-hidden />
      <div className="ending-cta__fade-top pointer-events-none absolute inset-x-0 top-0 h-32" aria-hidden />

      <Container className="ending-cta__inner relative flex min-h-[100svh] flex-col items-center justify-end pb-[var(--space-10)] pt-[var(--space-8)] md:pb-[var(--space-12)]">
        {/* Reserved zone — fixed canvas shoe sits above copy */}
        <div className="ending-cta__shoe-zone w-full shrink-0" aria-hidden />

        <div
          data-cta-block
          className="ending-cta__copy relative z-10 w-full max-w-xl text-center"
        >
          <h2
            id="ending-cta-title"
            className="text-display-cta mx-auto max-w-lg"
          >
            Ready to lace up?
          </h2>
          <p className="ending-cta__lead mx-auto mt-[var(--space-4)] max-w-md">
            Find your pair in the full catalog — limited drops and everyday
            classics, one checkout away.
          </p>
          <div className="ending-cta__actions mt-[var(--space-8)] flex flex-col items-center justify-center gap-[var(--space-4)] sm:flex-row sm:gap-[var(--space-5)]">
            <Button
              variant="primary"
              href="#featured"
              showArrow
              className="ending-cta__btn-primary min-w-[200px]"
            >
              Shop all sneakers
            </Button>
            <Button
              variant="secondary"
              href="#collections"
              magnetic={false}
              className="ending-cta__btn-secondary min-w-[200px] border-white/20 bg-transparent hover:bg-white/[0.06]"
            >
              Browse collections
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

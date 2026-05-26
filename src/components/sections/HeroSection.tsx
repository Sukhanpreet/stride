"use client";

import { useRef } from "react";
import { HeroIntro } from "@/components/animations/HeroIntro";
import { HeroScrollChoreography } from "@/components/animations/HeroScrollChoreography";
import { HeroAtmosphere } from "@/components/layout/HeroAtmosphere";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductRotateHint } from "@/components/ui/ProductRotateHint";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { HeroTypographyParallax } from "@/components/ui/HeroTypographyParallax";
import { heroContent } from "@/data/site";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="hero" className="relative">
      <HeroAtmosphere />
      <HeroIntro scope={sectionRef} />
      <HeroScrollChoreography scope={sectionRef} />

      {/* Product stage — visual priority (shoe renders in canvas behind) */}
      <div
        className="hero-product-stage pointer-events-none absolute inset-0 z-[5]"
        aria-hidden
      />
      <ProductRotateHint />

      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-8 pt-28 md:pb-12 md:pt-36">
        <Container className="flex flex-1 flex-col justify-end">
          <div className="hero-layout grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            {/* Reading flow: headline → description → CTA → meta */}
            <HeroTypographyParallax>
            <div className="hero-flow order-2 max-w-[min(100%,36rem)] lg:order-1">
              <p className="text-eyebrow mb-4 md:mb-5">{heroContent.eyebrow}</p>

              <SplitHeadline
                lines={heroContent.headline}
                className="text-display-xl hero-headline-mask mb-5 md:mb-7"
              />

              <p
                className="text-body-readable mb-8 max-w-[32ch] md:mb-10"
                data-hero-subline
              >
                {heroContent.subline}
              </p>

              <div className="hero-cta-primary mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-hero-cta>
                <Button variant="primary" href={heroContent.cta.primary.href} showArrow>
                  {heroContent.cta.primary.label}
                </Button>
                <Button variant="secondary" href={heroContent.cta.secondary.href}>
                  {heroContent.cta.secondary.label}
                </Button>
                <Button variant="ghost" href={heroContent.cta.tertiary.href}>
                  {heroContent.cta.tertiary.label}
                </Button>
              </div>

              <div
                className="hero-cta-secondary mb-8 flex flex-wrap gap-3 border-t border-white/[0.06] pt-5"
                data-hero-cta-alt
              >
                <Button
                  variant="ghost"
                  href={heroContent.ctaAlt.primary.href}
                  magnetic={false}
                  className="min-h-[44px] px-4"
                >
                  {heroContent.ctaAlt.primary.label}
                </Button>
                <Button
                  variant="ghost"
                  href={heroContent.ctaAlt.secondary.href}
                  magnetic={false}
                  className="min-h-[44px] px-4"
                >
                  {heroContent.ctaAlt.secondary.label}
                </Button>
              </div>

              <div
                className="flex flex-wrap items-baseline gap-3 opacity-90"
                data-hero-price
              >
                <span className="font-display text-base font-semibold tracking-wide text-foreground md:text-lg">
                  {heroContent.productName}
                </span>
                <span className="text-body-readable text-accent">
                  {heroContent.price}
                </span>
                <span className="text-eyebrow text-muted-bright">
                  · {heroContent.microcopy}
                </span>
              </div>
            </div>
            </HeroTypographyParallax>

            {/* Spacer reserves product zone on large screens */}
            <div className="order-1 hidden min-h-[40vh] lg:block lg:order-2" aria-hidden />
          </div>
        </Container>

        <Container className="mt-10 md:mt-14">
          <div data-hero-scroll>
            <ScrollIndicator label="Explore product story" />
          </div>
        </Container>
      </div>
    </section>
  );
}

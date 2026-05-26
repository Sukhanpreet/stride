"use client";

import { heroSpecs, heroStats, productVariants } from "@/data/site";
import { useSceneStore } from "@/hooks/useSceneStore";
import { sceneStore } from "@/lib/sceneStore";
import { cn } from "@/utils/cn";

export function HeroProductStrip() {
  const { variantPreview } = useSceneStore();

  return (
    <section
      id="hero-details"
      className="relative z-10 border-t border-white/[0.06] bg-background/40 backdrop-blur-sm"
      aria-label="Product quick details"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <span className="text-eyebrow w-full mb-1">Colorway</span>
            {productVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => sceneStore.setVariantPreview(variant.index)}
                aria-pressed={variantPreview === variant.index}
                className={cn(
                  "variant-swatch focus-ring inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-4 py-2.5 transition-all",
                  variantPreview === variant.index
                    ? "border-accent/50 bg-accent/15"
                    : "border-white/12 bg-white/5 hover:border-accent/40 hover:bg-white/10"
                )}
                aria-label={`Preview ${variant.name} colorway`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-white/20"
                  style={{ backgroundColor: variant.color }}
                />
                <span className="text-label text-foreground">{variant.name}</span>
              </button>
            ))}
          </div>

          <dl className="flex flex-wrap gap-6 md:gap-10">
            {heroSpecs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-eyebrow">{spec.label}</dt>
                <dd className="font-display mt-1 text-lg font-semibold text-foreground">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="flex flex-wrap gap-8 border-white/10 lg:border-l lg:pl-10">
            {heroStats.map((stat) => (
              <li key={stat.label}>
                <p className="font-display text-xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-eyebrow mt-0.5">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-eyebrow mt-6 flex items-center gap-2 text-muted-bright">
          <span className="inline-block h-px w-8 bg-accent/50" aria-hidden />
          Scroll to explore comfort, materials &amp; motion
        </p>
      </div>
    </section>
  );
}

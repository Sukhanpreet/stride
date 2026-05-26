"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductModelVisual } from "@/components/ui/ProductModelVisual";
import { sceneStore } from "@/lib/sceneStore";
import { cn } from "@/utils/cn";

type ProductModuleProps = {
  product: Product;
  featured?: boolean;
  active?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
};

export function ProductModule({
  product,
  featured = false,
  active = false,
  onFocus,
  onBlur,
  className,
}: ProductModuleProps) {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(-y * 8);
  };

  const handleEnter = () => {
    sceneStore.setVariantPreview(product.variantIndex);
    onFocus?.();
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onBlur?.();
  };

  return (
    <motion.article
      ref={ref}
      data-product-module
      data-product-id={product.id}
      className={cn(
        "product-module group relative flex h-full flex-col overflow-hidden",
        featured && "product-module--featured",
        active && "product-module--active",
        className
      )}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span className="product-module__trace" aria-hidden />
      <span className="product-module__corner product-module__corner--tl" aria-hidden />
      <span className="product-module__corner product-module__corner--br" aria-hidden />

      <motion.div
        className="product-module__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${product.accent}22, transparent 62%)`,
        }}
        aria-hidden
      />
      {product.tag ? (
        <span className="text-eyebrow product-module__tag relative z-[2] mb-[var(--space-2)] inline-flex w-fit border border-white/10 bg-white/5 px-[var(--space-2)] py-[var(--space-1)]">
          {product.tag}
        </span>
      ) : (
        <span className="product-module__tag-spacer" aria-hidden />
      )}

      <ProductModelVisual
        productId={product.id}
        variantIndex={product.variantIndex}
        accent={product.accent}
        featured={featured}
        active={active}
      />

      <div className="relative z-[2] mt-[var(--space-3)]">
        <h3 className="font-display text-lg font-semibold tracking-wide text-foreground md:text-xl">
          {product.name}
        </h3>
        <p className="text-label mt-[var(--space-1)] text-muted-bright">
          {product.material}
        </p>

        <ul className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-1)]">
          {product.specs.map((spec) => (
            <li
              key={spec}
              className="text-[0.625rem] font-medium uppercase tracking-wider text-muted-bright/90 border border-white/[0.08] bg-white/[0.03] px-[var(--space-1)] py-0.5"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-[var(--space-3)] flex items-end justify-between gap-[var(--space-2)]">
          <div>
            <p className="text-eyebrow text-muted">From</p>
            <p className="font-display text-2xl font-bold text-foreground">
              ${product.price}
            </p>
          </div>
          <div className="text-right">
            <p className="text-eyebrow text-muted">Motion</p>
            <p
              className="font-display text-lg font-bold"
              style={{ color: product.accent }}
            >
              {product.motionScore.toFixed(1)}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-label focus-ring relative mt-[var(--space-3)] w-full border border-white/10 bg-white/[0.04] py-[var(--space-2)] text-foreground transition-colors hover:border-accent/40 hover:bg-accent/10"
        >
          View specs →
        </button>
      </div>
    </motion.article>
  );
}

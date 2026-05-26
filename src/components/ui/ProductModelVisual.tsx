"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { SneakerProductVisual } from "@/components/ui/SneakerProductVisual";
import { cn } from "@/utils/cn";

const ProductModelCanvas = dynamic(
  () =>
    import("@/components/ui/ProductModelCanvas").then((m) => m.ProductModelCanvas),
  { ssr: false, loading: () => null }
);

type ProductModelVisualProps = {
  productId: string;
  variantIndex: number;
  accent: string;
  featured?: boolean;
  active?: boolean;
};

export function ProductModelVisual({
  productId,
  variantIndex,
  accent,
  featured = false,
  active = false,
}: ProductModelVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "120px 0px" });

  return (
    <div
      ref={ref}
      className={cn(
        "product-visual-wrap relative w-full",
        featured
          ? "min-h-[240px] md:min-h-[300px]"
          : "min-h-[200px] md:min-h-[240px]"
      )}
    >
      {!inView ? (
        <SneakerProductVisual
          id={productId}
          accent={accent}
          featured={featured}
          active={active}
        />
      ) : (
        <ProductModelCanvas
          productId={productId}
          variantIndex={variantIndex}
          accent={accent}
          featured={featured}
          active={active}
        />
      )}
    </div>
  );
}

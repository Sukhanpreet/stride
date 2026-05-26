"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type SneakerProductVisualProps = {
  id: string;
  accent: string;
  featured?: boolean;
  active?: boolean;
};

/** Stylized product render — silhouette + lighting (no placeholder gradients) */
export function SneakerProductVisual({
  id,
  accent,
  featured = false,
  active = false,
}: SneakerProductVisualProps) {
  const uid = id.replace(/[^a-z0-9]/gi, "");
  return (
    <div
      className={cn(
        "product-visual relative flex items-end justify-center",
        featured ? "h-[220px] md:h-[260px]" : "h-[180px] md:h-[200px]"
      )}
    >
      <div
        className="product-visual__floor absolute bottom-[8%] left-1/2 h-8 w-[72%] -translate-x-1/2 rounded-[100%] opacity-60 blur-md"
        style={{ background: `radial-gradient(ellipse, ${accent}55, transparent 70%)` }}
        aria-hidden
      />
      <div
        className="product-visual__glow absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 65%, ${accent}28, transparent 68%)`,
        }}
        aria-hidden
      />
      <motion.svg
        viewBox="0 0 320 140"
        className={cn(
          "product-visual__shoe relative z-[1] w-[88%] max-w-[280px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]",
          featured && "max-w-[320px]"
        )}
        animate={{
          y: active ? -10 : 0,
          rotateZ: active ? -2 : 0,
          scale: active ? 1.06 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        aria-hidden
      >
        <defs>
          <linearGradient id={`upper-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="45%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          <linearGradient id={`sole-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id={`accent-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M42 98c8-22 28-38 58-44 18-4 36-2 52 6 14 7 26 18 34 32 6 10 8 22 4 32l-4 10H38l4-36z"
          fill={`url(#sole-${uid})`}
          opacity="0.85"
        />
        <path
          d="M52 62c12-18 32-28 56-30 22-2 44 6 58 20 10 10 16 24 14 38l-6 28c-2 8-10 14-20 14H64c-12 0-22-10-24-22l-8-38c-2-12 4-24 14-30z"
          fill={`url(#upper-${uid})`}
        />
        <path
          d="M88 48c16-8 34-10 50-4 8 3 14 10 16 18l-20 6c-8 2-18 0-26-6-6-5-12-10-20-14z"
          fill={`url(#accent-${uid})`}
          opacity="0.9"
        />
        <path
          d="M118 72c6 0 12 4 14 10M156 68c8 2 14 8 16 16M92 88c20 4 40 2 58-4"
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.35"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}

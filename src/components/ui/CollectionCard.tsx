"use client";

import type { CSSProperties } from "react";
import { collectionsMaxCount, type Collection } from "@/data/products";
import { cn } from "@/utils/cn";

type CollectionCardProps = {
  collection: Collection;
  index: number;
  lead?: boolean;
};

const OFFSET_CLASS = [
  "collection-card--offset-none",
  "collection-card--offset-down",
  "collection-card--offset-up",
  "collection-card--offset-mid",
] as const;

function CollectionGlyph({ id }: { id: Collection["id"] }) {
  const shared = "collection-card__glyph-svg";

  if (id === "running") {
    return (
      <svg className={shared} viewBox="0 0 120 120" fill="none" aria-hidden>
        <ellipse cx="60" cy="72" rx="34" ry="10" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path
          d="M38 58c8-18 36-18 44 0M52 48l8-14 8 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M28 76h64" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
      </svg>
    );
  }

  if (id === "lifestyle") {
    return (
      <svg className={shared} viewBox="0 0 120 120" fill="none" aria-hidden>
        <rect x="34" y="44" width="52" height="36" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M42 56h36M42 64h24" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <circle cx="78" cy="68" r="3" fill="currentColor" opacity="0.7" />
      </svg>
    );
  }

  if (id === "basketball") {
    return (
      <svg className={shared} viewBox="0 0 120 120" fill="none" aria-hidden>
        <circle cx="60" cy="58" r="26" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M60 32v52M34 58h52M44 44c16 8 16 24 0 32M76 44c-16 8-16 24 0 32"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
      </svg>
    );
  }

  return (
    <svg className={shared} viewBox="0 0 120 120" fill="none" aria-hidden>
      <path d="M40 78l20-40 20 40" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M48 62h24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="58" r="4" fill="currentColor" />
      <path d="M32 84h56" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.45" />
    </svg>
  );
}

export function CollectionCard({ collection, index, lead = false }: CollectionCardProps) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const fill = Math.round((collection.count / collectionsMaxCount) * 100);

  return (
    <a
      href="#shop"
      data-collection-id={collection.id}
      className={cn(
        "collection-card group relative flex min-h-[15.5rem] flex-col overflow-hidden md:min-h-[17.5rem]",
        `collection-card--${collection.id}`,
        OFFSET_CLASS[index % OFFSET_CLASS.length],
        lead && "collection-card--lead"
      )}
      style={
        {
          "--collection-accent": collection.accent,
          "--collection-fill": `${fill}%`,
        } as CSSProperties
      }
    >
      <span className="collection-card__spine" aria-hidden />
      <span className="collection-card__mesh pointer-events-none absolute inset-0" aria-hidden />
      <span className="collection-card__scan pointer-events-none absolute inset-0" aria-hidden />
      <span className="collection-card__trace pointer-events-none absolute inset-0" aria-hidden />

      <div className="collection-card__hud relative z-[2] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="collection-card__lane text-eyebrow">Lane {indexLabel}</span>
          <span className="collection-card__code">{collection.code}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="collection-card__status">Live</span>
          <span className="collection-card__pulse" aria-hidden />
        </div>
      </div>

      <div className="collection-card__stage relative z-[1] flex flex-1 items-center justify-center py-[var(--space-3)]">
        <span className="collection-card__orbit" aria-hidden />
        <span className="collection-card__orbit collection-card__orbit--inner" aria-hidden />
        <CollectionGlyph id={collection.id} />
        <span
          className="collection-card__watermark font-display pointer-events-none absolute right-0 bottom-0 text-[clamp(4.5rem,12vw,6.5rem)] font-bold leading-none"
          aria-hidden
        >
          {indexLabel}
        </span>
      </div>

      <div className="collection-card__body relative z-[2]">
        <h3 className="font-display text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold tracking-wide text-foreground transition-transform duration-300 group-hover:translate-x-0.5 md:text-[1.75rem]">
          {collection.name}
        </h3>
        <p className="text-label mt-[var(--space-1)] text-muted-bright/90">
          {collection.blurb}
        </p>
      </div>

      <div className="collection-card__footer relative z-[2] mt-[var(--space-3)]">
        <div className="collection-card__meter">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-muted">
              Catalog density
            </span>
            <span className="font-display text-sm font-bold tabular-nums text-foreground">
              {collection.count}
              <span className="text-[0.625rem] font-medium text-muted"> styles</span>
            </span>
          </div>
          <div className="collection-card__meter-track" aria-hidden>
            <span className="collection-card__meter-fill" />
          </div>
        </div>

        <span className="collection-card__cta" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M10 5l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

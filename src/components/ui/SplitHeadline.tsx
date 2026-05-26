"use client";

import { cn } from "@/utils/cn";

type SplitHeadlineProps = {
  lines: readonly string[];
  className?: string;
  mutedLineIndex?: number;
  lineAttr?: string;
  charAttr?: string;
};

export function SplitHeadline({
  lines,
  className,
  mutedLineIndex = 1,
  lineAttr = "data-hero-line",
  charAttr = "data-split-char",
}: SplitHeadlineProps) {
  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => (
        <span
          key={line}
          className={cn(
            "block overflow-hidden",
            lineIndex === mutedLineIndex && "text-foreground/14 md:ml-[0.12em]"
          )}
          data-hero-line={lineAttr === "data-hero-line" ? true : undefined}
        >
          <span className="block">
            {line.split("").map((char, charIndex) => (
              <span
                key={`${line}-${charIndex}`}
                className="inline-block will-change-transform"
                data-split-char={charAttr === "data-split-char" ? true : undefined}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

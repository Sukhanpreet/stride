"use client";

import { EndingScrollBridge } from "@/components/animations/EndingScrollBridge";
import { SceneScrollDirector } from "@/components/animations/SceneScrollDirector";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScroll>
      <SceneScrollDirector />
      <EndingScrollBridge />
      {children}
    </SmoothScroll>
  );
}

import type { Metadata } from "next";
import { CanvasRoot } from "@/components/canvas/CanvasRoot";
import { DepthLayers } from "@/components/layout/DepthLayers";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { PageShell } from "@/components/layout/PageShell";
import { Providers } from "@/components/layout/Providers";
import { siteConfig } from "@/data/site";
import { fontBody, fontDisplay } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <GlobalBackground />
          <DepthLayers />
          <CanvasRoot />
          <NoiseOverlay />
          <PageShell>{children}</PageShell>
        </Providers>
      </body>
    </html>
  );
}

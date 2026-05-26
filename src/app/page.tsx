import { PageMotion } from "@/components/animations/PageMotion";
import { ProductModeHud } from "@/components/ui/ProductModeHud";
import { AboutSection } from "@/components/sections/AboutSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContrastBridge } from "@/components/layout/ContrastBridge";
import { HeroProductStrip } from "@/components/sections/HeroProductStrip";
import { HeroSection } from "@/components/sections/HeroSection";
import { ShopCtaSection } from "@/components/sections/ShopCtaSection";
import { StoryTrack } from "@/components/sections/StoryTrack";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroProductStrip />
      <ProductModeHud />
      <StoryTrack />
      <ContrastBridge />
      <FeaturedSection />
      <CollectionsSection />
      <AboutSection />
      <ShopCtaSection />
      <FooterSection />
      <PageMotion />
    </>
  );
}

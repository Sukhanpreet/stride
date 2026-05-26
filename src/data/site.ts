export const siteConfig = {
  name: "STRIDE",
  tagline: "Biomechanical Precision",
  description:
    "Discover limited drops and everyday classics. Premium street sneakers built for comfort, style, and the city.",
  url: "https://stride.example",
} as const;

export const navLinks = [
  { label: "Comfort", href: "#comfort" },
  { label: "Materials", href: "#materials" },
  { label: "Motion", href: "#motion" },
  { label: "Shop", href: "#shop" },
] as const;

export const footerExploreLinks = [
  { label: "Featured", href: "#featured" },
  { label: "Collections", href: "#collections" },
  { label: "Our story", href: "#about" },
  ...navLinks,
] as const;

export const footerSocialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
] as const;

export const heroContent = {
  eyebrow: "New Drop — Spring '26 Collection",
  headline: ["STEP", "INTO", "STYLE"],
  productName: "Stride Air Pro",
  price: "$189",
  microcopy: "Engineered for Urban Motion",
  subline:
    "Lightweight knit upper, responsive foam midsole, and all-day comfort — built for city motion from first step to last.",
  cta: {
    primary: { label: "Shop Collection", href: "#shop" },
    secondary: { label: "Explore Motion Tech", href: "#motion" },
    tertiary: { label: "View Details", href: "#materials" },
  },
  ctaAlt: {
    primary: { label: "Watch Demo", href: "#comfort" },
    secondary: { label: "Learn Materials", href: "#materials" },
  },
} as const;

export const heroSpecs = [
  { label: "Weight", value: "286g" },
  { label: "Drop", value: "Spring '26" },
  { label: "Rating", value: "4.9 ★" },
] as const;

export const productVariants = [
  { id: "beach", name: "Beach", color: "#d4c4a8", index: 0 },
  { id: "midnight", name: "Midnight", color: "#3f3f46", index: 1 },
  { id: "street", name: "Street", color: "#818cf8", index: 2 },
] as const;

export const heroStats = [
  { value: "12K+", label: "City runners" },
  { value: "48hr", label: "Ship window" },
  { value: "2yr", label: "Warranty" },
] as const;

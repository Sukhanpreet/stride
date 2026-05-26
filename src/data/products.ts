export type Product = {
  id: string;
  name: string;
  price: number;
  tag?: string;
  accent: string;
  variantIndex: number;
  material: string;
  motionScore: number;
  specs: readonly string[];
};

export const featuredProducts: Product[] = [
  {
    id: "air-pro",
    name: "Stride Air Pro",
    price: 189,
    tag: "New",
    accent: "#818cf8",
    variantIndex: 0,
    material: "Cloud-Lite foam",
    motionScore: 8.4,
    specs: ["78% energy return", "Dual-density sole"],
  },
  {
    id: "urban-flow",
    name: "Urban Flow 2",
    price: 149,
    tag: "Bestseller",
    accent: "#a78bfa",
    variantIndex: 1,
    material: "Breath-knit upper",
    motionScore: 8.2,
    specs: ["42% recycled yarn", "Flex groove"],
  },
  {
    id: "court-classic",
    name: "Court Classic",
    price: 129,
    accent: "#60a5fa",
    variantIndex: 2,
    material: "Structured leather blend",
    motionScore: 7.8,
    specs: ["Court grip zone", "Stable heel"],
  },
  {
    id: "night-runner",
    name: "Night Runner",
    price: 169,
    tag: "Limited",
    accent: "#f472b6",
    variantIndex: 1,
    material: "Reflective knit",
    motionScore: 8.6,
    specs: ["Low-light trace", "Impact shield"],
  },
];

export type Collection = {
  id: string;
  name: string;
  count: number;
  accent: string;
  blurb: string;
  code: string;
};

export const collections: readonly Collection[] = [
  {
    id: "running",
    name: "Running",
    count: 24,
    accent: "#60a5fa",
    blurb: "Road & trail response",
    code: "RUN",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    count: 38,
    accent: "#a78bfa",
    blurb: "Daily rotation staples",
    code: "LFS",
  },
  {
    id: "basketball",
    name: "Basketball",
    count: 16,
    accent: "#f472b6",
    blurb: "Court grip & lockdown",
    code: "CRT",
  },
  {
    id: "limited",
    name: "Limited Drops",
    count: 8,
    accent: "#818cf8",
    blurb: "Small-batch releases",
    code: "LTD",
  },
] as const;

export const collectionsMaxCount = Math.max(...collections.map((c) => c.count));

export const collectionsStyleCount = collections.reduce(
  (sum, c) => sum + c.count,
  0
);

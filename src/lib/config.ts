export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://slab-calc.com",
  name: "SlabCalc",
  tagline: "Construction calculators that contractors actually trust.",
  description:
    "Estimate concrete, paint, tile, gravel, and more — accurate, fast, free.",
  email: "hello@slab-calc.com",
} as const;

import type { Metadata } from "next";
import { SlabCalculator } from "./slab-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { slabFaqs } from "./slab-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Concrete Slab Calculator — How Much Concrete Do I Need?",
  description:
    "Free concrete slab calculator. Enter length, width, and depth to get cubic yards, number of bags, and cost estimates for your patio, driveway, or garage slab.",
  openGraph: {
    title: "Concrete Slab Calculator — How Much Concrete Do I Need?",
    description:
      "Free concrete slab calculator. Enter length, width, and depth to get cubic yards, number of bags, and cost estimates.",
    url: `${siteConfig.url}/calculators/concrete-slab`,
    siteName: "BuildCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Concrete Slab Calculator | BuildCalc",
    description:
      "Calculate cubic yards, bags, and cost for concrete slabs. Free and instant.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/concrete-slab`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Concrete for a Slab",
  description:
    "Calculate the amount of concrete needed for a slab in cubic yards, bags, and estimated cost.",
  url: `${siteConfig.url}/calculators/concrete-slab`,
  steps: [
    { name: "Measure length", text: "Measure the length of the slab area in feet." },
    { name: "Measure width", text: "Measure the width of the slab area in feet." },
    { name: "Measure depth", text: "Determine the desired slab depth in inches (4 inches is standard)." },
    { name: "Enter dimensions", text: "Enter your measurements into the calculator along with a waste factor (10% recommended)." },
    { name: "Read results", text: "Get your results in cubic yards, number of bags (80 lb and 60 lb), and estimated cost range." },
  ],
});

const faqSchema = buildFAQSchema(slabFaqs);

export default function ConcreteSlabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SlabCalculator />
    </>
  );
}

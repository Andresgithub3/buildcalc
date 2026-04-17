import type { Metadata } from "next";
import { FootingCalculator } from "./footing-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { footingFaqs } from "./footing-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Concrete Footing Calculator — Deck & Pier Footing Estimator",
  description:
    "Free concrete footing calculator. Enter footing dimensions to get cubic yards, bags, and cost estimates for deck footings, pier foundations, and continuous footings.",
  openGraph: {
    title: "Concrete Footing Calculator — Deck & Pier Footing Estimator",
    description:
      "Calculate concrete for deck footings, pier foundations, and continuous footings. Free and instant.",
    url: `${siteConfig.url}/calculators/concrete-footing`,
    siteName: "SlabCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Concrete Footing Calculator | SlabCalc",
    description: "Estimate concrete for footings — cubic yards, bags, and cost.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/concrete-footing`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Concrete for Footings",
  description: "Calculate the amount of concrete needed for footings.",
  url: `${siteConfig.url}/calculators/concrete-footing`,
  steps: [
    { name: "Measure footing length", text: "Measure the length of each footing in feet." },
    { name: "Measure width and depth", text: "Measure footing width and depth in inches." },
    { name: "Count footings", text: "Determine the number of identical footings needed." },
    { name: "Enter dimensions", text: "Enter measurements and waste factor into the calculator." },
    { name: "Read results", text: "Get total cubic yards, per-footing volume, bags, and cost." },
  ],
});

const faqSchema = buildFAQSchema(footingFaqs);

export default function ConcreteFootingPage() {
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
      <FootingCalculator />
    </>
  );
}

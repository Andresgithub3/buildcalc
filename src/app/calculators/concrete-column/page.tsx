import type { Metadata } from "next";
import { ColumnCalculator } from "./column-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { columnFaqs } from "./column-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Concrete Column & Sonotube Calculator — Post Hole Estimator",
  description:
    "Free Sonotube and concrete column calculator. Enter diameter and height to get cubic yards, bags, and cost estimates for round columns and post holes.",
  openGraph: {
    title: "Concrete Column & Sonotube Calculator",
    description:
      "Calculate concrete for Sonotubes, round columns, and post holes. Free and instant.",
    url: `${siteConfig.url}/calculators/concrete-column`,
    siteName: "BuildCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sonotube Calculator | BuildCalc",
    description: "Calculate concrete for round columns and post holes.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/concrete-column`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Concrete for Round Columns",
  description: "Calculate concrete for Sonotubes and round columns using the cylinder volume formula.",
  url: `${siteConfig.url}/calculators/concrete-column`,
  steps: [
    { name: "Measure diameter", text: "Measure the inner diameter of the Sonotube or post hole in inches." },
    { name: "Measure height", text: "Measure the height (depth) of the column in feet." },
    { name: "Count columns", text: "Determine how many identical columns you need." },
    { name: "Enter dimensions", text: "Enter measurements and waste factor into the calculator." },
    { name: "Read results", text: "Get cubic yards, per-column volume, bags, and cost estimates." },
  ],
});

const faqSchema = buildFAQSchema(columnFaqs);

export default function ConcreteColumnPage() {
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
      <ColumnCalculator />
    </>
  );
}

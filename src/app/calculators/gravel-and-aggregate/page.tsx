import type { Metadata } from "next";
import { GravelCalculator } from "./gravel-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { gravelFaqs } from "./gravel-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Gravel & Aggregate Calculator — How Much Gravel Do I Need?",
  description:
    "Free gravel calculator. Enter area dimensions to get cubic yards, tons, and cost estimates for gravel, crushed stone, pea gravel, or river rock.",
  openGraph: {
    title: "Gravel & Aggregate Calculator",
    description:
      "Calculate cubic yards and tons of gravel, crushed stone, or river rock.",
    url: `${siteConfig.url}/calculators/gravel-and-aggregate`,
    siteName: "BuildCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gravel Calculator | BuildCalc",
    description: "Calculate gravel in cubic yards and tons for any project.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/gravel-and-aggregate`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Gravel and Aggregate",
  description: "Calculate gravel volume and weight for driveways, pathways, and landscaping.",
  url: `${siteConfig.url}/calculators/gravel-and-aggregate`,
  steps: [
    { name: "Measure the area", text: "Measure the length and width of the area in feet." },
    { name: "Determine depth", text: "Decide on gravel depth in inches (4 inches for driveways, 2-3 for walkways)." },
    { name: "Choose material", text: "Select the material type (gravel, crushed stone, pea gravel, or river rock)." },
    { name: "Enter dimensions", text: "Enter your measurements into the calculator." },
    { name: "Read results", text: "Get cubic yards, tons, and estimated cost." },
  ],
});

const faqSchema = buildFAQSchema(gravelFaqs);

export default function GravelAggregatePage() {
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
      <GravelCalculator />
    </>
  );
}

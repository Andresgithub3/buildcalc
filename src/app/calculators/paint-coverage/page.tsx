import type { Metadata } from "next";
import { PaintCalculator } from "./paint-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { paintFaqs } from "./paint-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Paint Coverage Calculator — How Much Paint Do I Need?",
  description:
    "Free paint calculator. Enter room dimensions, doors, and windows to find out how many gallons of paint you need. Includes multi-coat support.",
  openGraph: {
    title: "Paint Coverage Calculator — How Much Paint Do I Need?",
    description:
      "Calculate gallons of paint for any room. Accounts for doors, windows, and coats.",
    url: `${siteConfig.url}/calculators/paint-coverage`,
    siteName: "BuildCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Paint Calculator | BuildCalc",
    description: "Calculate how many gallons of paint you need for any room.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/paint-coverage`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Paint Coverage",
  description: "Calculate gallons of paint needed for a room.",
  url: `${siteConfig.url}/calculators/paint-coverage`,
  steps: [
    { name: "Measure room dimensions", text: "Measure room length, width, and wall height in feet." },
    { name: "Count openings", text: "Count the number of doors and windows in the room." },
    { name: "Choose coats", text: "Decide how many coats you'll apply (2 is standard)." },
    { name: "Enter dimensions", text: "Enter all measurements into the calculator." },
    { name: "Read results", text: "Get paintable area in square feet and gallons of paint needed." },
  ],
});

const faqSchema = buildFAQSchema(paintFaqs);

export default function PaintCoveragePage() {
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
      <PaintCalculator />
    </>
  );
}

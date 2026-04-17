import type { Metadata } from "next";
import { FenceCalculator } from "./fence-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { fenceFaqs } from "./fence-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Fence Materials Estimator — How Many Fence Boards Do I Need?",
  description:
    "Free fence calculator. Enter fence length, height, and material to get post, rail, picket counts, concrete for posts, and cost estimates.",
  openGraph: {
    title: "Fence Materials Estimator",
    description:
      "Estimate posts, rails, pickets, and concrete for wood, vinyl, or chain-link fences.",
    url: `${siteConfig.url}/calculators/fence-materials`,
    siteName: "SlabCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fence Calculator | SlabCalc",
    description: "Calculate fence materials — posts, rails, pickets, and concrete.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/fence-materials`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Estimate Fence Materials",
  description: "Calculate posts, rails, pickets, and concrete for a fence project.",
  url: `${siteConfig.url}/calculators/fence-materials`,
  steps: [
    { name: "Measure total length", text: "Measure the total fence line in feet." },
    { name: "Choose height and spacing", text: "Select fence height (4, 6, or 8 ft) and post spacing (6 or 8 ft)." },
    { name: "Select material", text: "Choose wood, vinyl, or chain link." },
    { name: "Count gates", text: "Determine how many gates you need." },
    { name: "Read results", text: "Get counts for posts, rails, pickets/panels, concrete bags, and cost." },
  ],
});

const faqSchema = buildFAQSchema(fenceFaqs);

export default function FenceMaterialsPage() {
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
      <FenceCalculator />
    </>
  );
}

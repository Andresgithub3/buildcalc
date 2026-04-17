import type { Metadata } from "next";
import { TileCalculator } from "./tile-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { tileFaqs } from "./tile-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Tile & Flooring Calculator — How Many Tiles Do I Need?",
  description:
    "Free tile calculator. Enter room dimensions and tile size to find out how many tiles and boxes you need. Includes waste factor.",
  openGraph: {
    title: "Tile & Flooring Calculator — How Many Tiles Do I Need?",
    description:
      "Calculate tile quantity for any floor. Supports standard and custom sizes.",
    url: `${siteConfig.url}/calculators/tile-flooring`,
    siteName: "BuildCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tile Calculator | BuildCalc",
    description: "Calculate how many tiles you need for any room.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/tile-flooring`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Tiles for a Floor",
  description: "Calculate tiles and boxes needed for any floor area.",
  url: `${siteConfig.url}/calculators/tile-flooring`,
  steps: [
    { name: "Measure the room", text: "Measure room length and width in feet." },
    { name: "Choose tile size", text: "Select your tile size (12×12, 18×18, 24×24, or custom)." },
    { name: "Set waste factor", text: "Choose a waste percentage (10% for straight layouts, 15%+ for diagonal)." },
    { name: "Enter tiles per box", text: "Check the box label for tiles per box and enter it." },
    { name: "Read results", text: "Get total tiles needed and boxes to purchase." },
  ],
});

const faqSchema = buildFAQSchema(tileFaqs);

export default function TileFlooringPage() {
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
      <TileCalculator />
    </>
  );
}

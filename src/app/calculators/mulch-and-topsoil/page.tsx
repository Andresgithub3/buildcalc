import type { Metadata } from "next";
import { MulchCalculator } from "./mulch-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { mulchFaqs } from "./mulch-content";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mulch & Topsoil Calculator — How Much Mulch Do I Need?",
  description:
    "Free mulch and topsoil calculator. Enter bed dimensions to get cubic yards, number of bags, and cost estimates for mulch, topsoil, compost, or fill dirt.",
  openGraph: {
    title: "Mulch & Topsoil Calculator",
    description:
      "Calculate bags or cubic yards of mulch, topsoil, compost, or fill dirt.",
    url: `${siteConfig.url}/calculators/mulch-and-topsoil`,
    siteName: "SlabCalc",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mulch Calculator | SlabCalc",
    description: "Calculate mulch and topsoil in bags or cubic yards.",
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/mulch-and-topsoil`,
  },
};

const howToSchema = buildHowToSchema({
  name: "How to Calculate Mulch and Topsoil",
  description: "Calculate mulch or topsoil volume in cubic yards and bags.",
  url: `${siteConfig.url}/calculators/mulch-and-topsoil`,
  steps: [
    { name: "Measure the bed", text: "Measure the length and width of the area in feet." },
    { name: "Choose depth", text: "Determine desired depth in inches (2-3 inches for mulch is standard)." },
    { name: "Select material", text: "Choose mulch, topsoil, compost, or fill dirt." },
    { name: "Enter dimensions", text: "Enter your measurements into the calculator." },
    { name: "Read results", text: "Get cubic yards, number of 2-cubic-foot bags, and cost estimate." },
  ],
});

const faqSchema = buildFAQSchema(mulchFaqs);

export default function MulchTopsoilPage() {
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
      <MulchCalculator />
    </>
  );
}

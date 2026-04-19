import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TileCalculator } from "./tile-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tile" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${siteConfig.url}/calculators/tile-flooring`,
      siteName: "SlabCalc",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
    },
    alternates: {
      canonical: `${siteConfig.url}/calculators/tile-flooring`,
    },
  };
}

export default async function TileFlooringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "tile" });

  // Get FAQs from translations
  const faqs = [];
  for (let i = 0; i < 4; i++) {
    faqs.push({
      question: t(`faqs.${i}.question`),
      answer: t(`faqs.${i}.answer`),
    });
  }

  // Build HowTo steps from translations
  const steps = [];
  for (let i = 0; i < 5; i++) {
    steps.push({
      name: t(`howTo.steps.${i}.name`),
      text: t(`howTo.steps.${i}.text`),
    });
  }

  const howToSchema = buildHowToSchema({
    name: t("howTo.name"),
    description: t("howTo.description"),
    url: `${siteConfig.url}/calculators/tile-flooring`,
    steps,
  });

  const faqSchema = buildFAQSchema(faqs);

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

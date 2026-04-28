import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FenceCalculator } from "./fence-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { getAlternates, getLocalizedUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fence" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: getLocalizedUrl("/calculators/fence-materials", locale),
      siteName: "SlabCalc",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
    },
    alternates: getAlternates("/calculators/fence-materials", locale),
  };
}

export default async function FenceMaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "fence" });

  // Get FAQs from translations
  const faqs = [];
  for (let i = 0; i < 5; i++) {
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
    url: `${siteConfig.url}/calculators/fence-materials`,
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
      <FenceCalculator />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MulchCalculator } from "./mulch-calculator";
import { buildHowToSchema, buildFAQSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mulch" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${siteConfig.url}/calculators/mulch-and-topsoil`,
      siteName: "SlabCalc",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
    },
    alternates: {
      canonical: `${siteConfig.url}/calculators/mulch-and-topsoil`,
    },
  };
}

export default async function MulchTopsoilPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "mulch" });

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
    url: `${siteConfig.url}/calculators/mulch-and-topsoil`,
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
      <MulchCalculator />
    </>
  );
}

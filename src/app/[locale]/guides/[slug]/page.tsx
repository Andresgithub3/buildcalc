import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { guideSlugs, getGuide } from "@/lib/guides-data";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { getAlternates, getLocalizedUrl } from "@/lib/seo";
import { buildArticleSchema, buildFAQSchema } from "@/lib/schema";
import {
  GuideArticle,
  type GuideSection,
} from "@/components/guide-article";

interface GuideItem {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  readMinutes: number;
  updated: string;
  intro: string[];
  sections: GuideSection[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guideSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getGuide(slug)) return {};

  const t = await getTranslations({ locale, namespace: "guides" });
  const item = t.raw(`items.${slug}`) as GuideItem;

  return {
    title: item.metaTitle,
    description: item.metaDescription,
    openGraph: {
      title: item.metaTitle,
      description: item.metaDescription,
      url: getLocalizedUrl(`/guides/${slug}`, locale),
      siteName: "SlabCalc",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: item.metaTitle,
      description: item.metaDescription,
    },
    alternates: getAlternates(`/guides/${slug}`, locale),
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "guides" });
  const th = await getTranslations({ locale, namespace: "home" });
  const item = t.raw(`items.${slug}`) as GuideItem;

  const relatedTools = guide.relatedCalculators.map((calcSlug) => ({
    name: th(`calculators.${calcSlug}.shortName`),
    href: `/calculators/${calcSlug}`,
    description: th(`calculators.${calcSlug}.description`),
  }));

  const url = `${siteConfig.url}/guides/${slug}`;
  const articleSchema = buildArticleSchema({
    headline: item.title,
    description: item.description,
    url,
  });
  const faqSchema = buildFAQSchema(item.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideArticle
        category={t(`categories.${guide.category}`)}
        title={item.title}
        description={item.description}
        updatedLabel={t("updatedLabel", { date: item.updated })}
        readLabel={t("readLabel", { minutes: item.readMinutes })}
        intro={item.intro}
        sections={item.sections}
        keyTakeaways={item.keyTakeaways}
        takeawaysLabel={t("takeawaysLabel")}
        faqs={item.faqs}
        relatedTools={relatedTools}
        relatedToolsLabel={t("relatedToolsLabel")}
        backLabel={t("backToGuides")}
      />
    </>
  );
}

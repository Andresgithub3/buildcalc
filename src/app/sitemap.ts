import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculator-data";
import { siteConfig } from "@/lib/config";
import { routing } from "@/i18n/routing";

const BASE_URL = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  function localePath(path: string, locale: string) {
    return locale === defaultLocale ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
  }

  function alternates(path: string) {
    return {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, localePath(path, locale)])
      ),
    };
  }

  const calculatorPages = calculators.flatMap((calc) =>
    locales.map((locale) => ({
      url: localePath(`/calculators/${calc.slug}`, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: alternates(`/calculators/${calc.slug}`),
    }))
  );

  const staticPages: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: localePath(page.path, locale),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: alternates(page.path),
    }))
  );

  return [...staticEntries, ...calculatorPages];
}

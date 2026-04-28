import { siteConfig } from "@/lib/config";
import { routing } from "@/i18n/routing";

const BASE_URL = siteConfig.url;

/**
 * Returns the full URL for a given path and locale.
 * English (default locale) gets no prefix; other locales get /{locale} prefix.
 */
export function getLocalizedUrl(path: string, locale: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

/**
 * Returns Next.js Metadata alternates object with:
 * - Self-referencing canonical for the current locale
 * - hreflang links for all locales + x-default (pointing to default locale)
 */
export function getAlternates(path: string, locale: string) {
  return {
    canonical: getLocalizedUrl(path, locale),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, getLocalizedUrl(path, l)])
      ),
      "x-default": getLocalizedUrl(path, routing.defaultLocale),
    },
  };
}

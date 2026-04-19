"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { HardHat, Globe } from "lucide-react";

export function SiteHeader() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const nextLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <HardHat className="h-6 w-6 text-accent" />
          <span>
            Slab<span className="text-primary">Calc</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            {t("nav.calculators")}
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            {t("nav.about")}
          </Link>
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">
              {locale === "en" ? t("languageSwitcher.es") : t("languageSwitcher.en")}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

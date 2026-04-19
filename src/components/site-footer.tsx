"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("common");

  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-heading font-semibold">{t("siteName")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t("footer.calcHeading")}</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/calculators/concrete-slab" className="hover:text-foreground transition-colors">
                  {t("footer.concreteSlab")}
                </Link>
              </li>
              <li>
                <Link href="/calculators/concrete-footing" className="hover:text-foreground transition-colors">
                  {t("footer.concreteFooting")}
                </Link>
              </li>
              <li>
                <Link href="/calculators/paint-coverage" className="hover:text-foreground transition-colors">
                  {t("footer.paintCoverage")}
                </Link>
              </li>
              <li>
                <Link href="/calculators/tile-flooring" className="hover:text-foreground transition-colors">
                  {t("footer.tileFlooring")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t("footer.moreHeading")}</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/calculators/gravel-and-aggregate" className="hover:text-foreground transition-colors">
                  {t("footer.gravelAggregate")}
                </Link>
              </li>
              <li>
                <Link href="/calculators/mulch-and-topsoil" className="hover:text-foreground transition-colors">
                  {t("footer.mulchTopsoil")}
                </Link>
              </li>
              <li>
                <Link href="/calculators/fence-materials" className="hover:text-foreground transition-colors">
                  {t("footer.fenceMaterials")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="mt-1 space-x-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {t("footer.termsOfUse")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

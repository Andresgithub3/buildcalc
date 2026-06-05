"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, ArrowRight } from "lucide-react";

/** Maps each calculator to its most relevant in-depth guide. */
const CALCULATOR_GUIDE: Record<string, string> = {
  "concrete-slab": "concrete-driveway-cost",
  "concrete-footing": "deck-footing-size-guide",
  "concrete-column": "how-much-concrete-do-i-need",
  "paint-coverage": "how-much-paint-do-i-need",
  "gravel-and-aggregate": "gravel-driveway-cost",
  "mulch-and-topsoil": "how-much-mulch-do-i-need",
  "fence-materials": "fence-cost-guide",
  // tile-flooring has no dedicated guide yet → links to the guides hub
};

export function RelatedGuide({ calculatorSlug }: { calculatorSlug: string }) {
  const tc = useTranslations("common");
  const tg = useTranslations("guides");
  const guideSlug = CALCULATOR_GUIDE[calculatorSlug];

  const href = guideSlug ? `/guides/${guideSlug}` : "/guides";
  const title = guideSlug
    ? (tg.raw(`items.${guideSlug}`) as { title: string }).title
    : tc("guideCalloutExplore");

  return (
    <Link
      href={href}
      className="group mt-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-4 transition-colors hover:border-primary/40"
    >
      <div className="rounded-lg bg-primary/10 p-2">
        <BookOpen className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {tc("guideCalloutLabel")}
        </p>
        <p className="mt-0.5 font-semibold leading-snug">{title}</p>
        <span className="mt-1 inline-flex items-center gap-1 text-sm text-primary">
          {tc("guideCalloutCta")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

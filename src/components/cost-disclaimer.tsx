"use client";

import { useTranslations } from "next-intl";

export function CostDisclaimer() {
  const t = useTranslations("common");

  return (
    <p className="text-xs text-muted-foreground mt-1">
      {t("costDisclaimer")}
    </p>
  );
}

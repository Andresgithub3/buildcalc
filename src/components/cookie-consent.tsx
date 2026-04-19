"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "slabcalc-cookie-consent";

export function CookieConsent() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {t.rich("cookie.message", {
            privacyLink: (chunks) => (
              <Link href="/privacy" className="underline hover:text-foreground">
                {chunks}
              </Link>
            ),
          })}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="rounded-md border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            {t("cookie.decline")}
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

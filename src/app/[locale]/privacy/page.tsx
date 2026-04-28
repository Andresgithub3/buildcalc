import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getAlternates("/privacy", locale),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  const dateLocale = locale === "es" ? "es-US" : "en-US";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("lastUpdated", {
          date: new Date().toLocaleDateString(dateLocale, {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        })}
      </p>

      <div className="mt-8 space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("overviewTitle")}
          </h2>
          <p className="mt-2">{t("overviewPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("infoCollectedTitle")}
          </h2>
          <p className="mt-2">{t("infoCollectedPara1")}</p>
          <p className="mt-2">{t("infoCollectedPara2")}</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              {t.rich("infoCollectedGA", {
                b: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("infoCollectedVercel", {
                b: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("cookiesTitle")}
          </h2>
          <p className="mt-2">{t("cookiesPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("advertisingTitle")}
          </h2>
          <p className="mt-2">
            {t.rich("advertisingPara", {
              googleAdsLink: (chunks) => (
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("thirdPartyTitle")}
          </h2>
          <p className="mt-2">{t("thirdPartyPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("dataSecurityTitle")}
          </h2>
          <p className="mt-2">{t("dataSecurityPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("childrenTitle")}
          </h2>
          <p className="mt-2">{t("childrenPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("changesTitle")}
          </h2>
          <p className="mt-2">{t("changesPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("contactTitle")}
          </h2>
          <p className="mt-2">
            {t.rich("contactPara", {
              b: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </section>
      </div>
    </div>
  );
}

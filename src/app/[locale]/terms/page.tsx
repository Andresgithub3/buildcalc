import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getAlternates("/terms", locale),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });

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
            {t("acceptanceTitle")}
          </h2>
          <p className="mt-2">{t("acceptancePara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("useTitle")}
          </h2>
          <p className="mt-2">{t("usePara1")}</p>
          <p className="mt-2">
            {t.rich("usePara2", {
              b: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("disclaimerTitle")}
          </h2>
          <p className="mt-2">{t("disclaimerPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("liabilityTitle")}
          </h2>
          <p className="mt-2">{t("liabilityPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("affiliateTitle")}
          </h2>
          <p className="mt-2">{t("affiliatePara1")}</p>
          <p className="mt-2">{t("affiliatePara2")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("ipTitle")}
          </h2>
          <p className="mt-2">{t("ipPara")}</p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("professionalTitle")}
          </h2>
          <p className="mt-2">{t("professionalPara")}</p>
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

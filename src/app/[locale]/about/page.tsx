import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HardHat, Target, Shield, Zap } from "lucide-react";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {t("subtitle")}
      </p>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">{t("missionTitle")}</h2>
        <p className="mt-3 text-muted-foreground">
          {t("missionPara1")}
        </p>
        <p className="mt-3 text-muted-foreground">
          {t("missionPara2")}
        </p>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{t("accurateFormulas")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("accurateFormulasDesc")}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{t("instantResults")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("instantResultsDesc")}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{t("noHiddenAgenda")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("noHiddenAgendaDesc")}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <HardHat className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{t("builtForJobSite")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("builtForJobSiteDesc")}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">{t("whoWeServeTitle")}</h2>
        <p className="mt-3 text-muted-foreground">
          {t("whoWeServePara")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">
          {t("methodologyTitle")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t("methodologyPara")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">{t("contactTitle")}</h2>
        <p className="mt-3 text-muted-foreground">
          {t.rich("contactPara", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </section>

      <div className="mt-12 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          <Link href="/privacy" className="underline hover:text-foreground">
            {tc("footer.privacyPolicy")}
          </Link>
          {" · "}
          <Link href="/terms" className="underline hover:text-foreground">
            {tc("footer.termsOfUse")}
          </Link>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculators } from "@/lib/calculator-data";
import { guides } from "@/lib/guides-data";
import { ArrowRight, HardHat, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: getAlternates("", locale),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tg = await getTranslations({ locale, namespace: "guides" });
  const featuredGuides = guides.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {/* Hero */}
      <section className="py-10 text-center sm:py-14">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-accent/10 p-3">
            <HardHat className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {t("heroTitle")}
          <span className="text-primary">{t("heroTitleHighlight")}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("heroDescription")}
        </p>
      </section>

      {/* Calculator Grid */}
      <section className="pb-10">
        <h2 className="font-heading text-xl font-semibold mb-6">
          {t("allCalculators")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="group">
                <Card className="h-full transition-all group-hover:border-primary/30 group-hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <CardTitle className="mt-3">
                      {t(`calculators.${calc.slug}.shortName`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t(`calculators.${calc.slug}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Guides */}
      <section className="border-t py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">
              {tg("hubTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tg("hubSubtitle")}
            </p>
          </div>
          <Link
            href="/guides"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            {tg("backToGuides")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((guide) => {
            const item = tg.raw(`items.${guide.slug}`) as {
              title: string;
              description: string;
            };
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group"
              >
                <Card className="h-full transition-all group-hover:border-primary/30 group-hover:shadow-md">
                  <CardHeader>
                    <div className="rounded-lg bg-accent/10 p-2 w-fit">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="mt-3 text-base leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t py-10">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <h3 className="font-heading font-semibold">{t("accurateFormulas")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("accurateFormulasDesc")}
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold">{t("instantResults")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("instantResultsDesc")}
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold">{t("mobileReady")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("mobileReadyDesc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

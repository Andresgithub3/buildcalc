import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/guides-data";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAlternates } from "@/lib/seo";

interface GuideListItem {
  title: string;
  description: string;
  readMinutes: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getAlternates("/guides", locale),
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "guides" });

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <section className="py-10 text-center sm:py-14">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-accent/10 p-3">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {t("hubTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("hubSubtitle")}
        </p>
      </section>

      <section className="pb-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const item = t.raw(`items.${guide.slug}`) as GuideListItem;
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group"
              >
                <Card className="flex h-full flex-col transition-all group-hover:border-primary/30 group-hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {t(`categories.${guide.category}`)}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {t("readLabel", { minutes: item.readMinutes })}
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

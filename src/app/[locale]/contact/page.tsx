import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Bug, Lightbulb } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getAlternates } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getAlternates("/contact", locale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const reasons = [
    { icon: Bug, title: t("reasons.bug.title"), desc: t("reasons.bug.desc") },
    {
      icon: Lightbulb,
      title: t("reasons.suggestion.title"),
      desc: t("reasons.suggestion.desc"),
    },
    {
      icon: MessageSquare,
      title: t("reasons.feedback.title"),
      desc: t("reasons.feedback.desc"),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {t("formHeading")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/[0.02] p-4">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">
            {t("emailIntro")}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("responseTime")}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">
          {t("reasonsHeading")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="rounded-lg border p-4">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-2 font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">
          {t("publisherHeading")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("publisherPara")}</p>
      </section>

      <div className="mt-12 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          <Link href="/about" className="underline hover:text-foreground">
            {tc("nav.about")}
          </Link>
          {" · "}
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

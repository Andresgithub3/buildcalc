"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FAQSection } from "@/components/faq-section";

export function FootingContent() {
  const t = useTranslations("footing");

  const faqs = Array.from({ length: 4 }, (_, i) => ({
    question: t(`faqs.${i}.question`),
    answer: t(`faqs.${i}.answer`),
  }));

  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          {t("content.howToTitle")}
        </h2>
        <p>
          {t.rich("content.howToPara1", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="mt-3">
          {t.rich("content.howToPara2", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          {t("content.tipsTitle")}
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          {(t.raw("content.tips") as string[]).map((_, i) => (
            <li key={i}>
              {t.rich(`content.tips.${i}`, {
                b: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          {t("content.typesTitle")}
        </h2>
        <p>
          {t.rich("content.typesPara1", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="mt-3">
          {t.rich("content.typesPara2", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="mt-3">
          {t.rich("content.typesPara3", {
            b: (chunks) => <strong>{chunks}</strong>,
            link: (chunks) => (
              <Link href="/calculators/concrete-column" className="text-primary underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>

      <section className="mt-8">
        <FAQSection faqs={faqs} />
      </section>
    </>
  );
}

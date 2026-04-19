"use client";

import { useTranslations } from "next-intl";
import { FAQSection } from "@/components/faq-section";

export function FenceContent() {
  const t = useTranslations("fence");

  const faqs = Array.from({ length: 5 }, (_, i) => ({
    question: t(`faqs.${i}.question`),
    answer: t(`faqs.${i}.answer`),
  }));

  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          {t("content.howToTitle")}
        </h2>
        <p>{t("content.howToPara1")}</p>
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
          {t("content.comparingTitle")}
        </h2>
        <p>
          {t.rich("content.comparingWood", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="mt-3">
          {t.rich("content.comparingVinyl", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="mt-3">
          {t.rich("content.comparingChainLink", {
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </section>

      <section className="mt-8">
        <FAQSection faqs={faqs} />
      </section>
    </>
  );
}

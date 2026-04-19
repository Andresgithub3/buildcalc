"use client";

import { useTranslations } from "next-intl";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const t = useTranslations("calculator");

  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold mb-6">
        {t("faq")}
      </h2>
      <dl className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <dt className="font-semibold text-base">{faq.question}</dt>
            <dd className="mt-1 text-muted-foreground">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

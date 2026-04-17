export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold mb-6">
        Frequently Asked Questions
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

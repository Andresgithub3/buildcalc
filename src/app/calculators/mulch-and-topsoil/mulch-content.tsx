import { FAQSection, type FAQItem } from "@/components/faq-section";

export const mulchFaqs: FAQItem[] = [
  {
    question: "How deep should mulch be?",
    answer:
      "Apply mulch 2–3 inches deep for most landscape beds. Going deeper than 4 inches can suffocate plant roots and create moisture problems. For weed prevention alone, 3 inches is the sweet spot — thick enough to block light but thin enough for water penetration.",
  },
  {
    question: "How much mulch do I need for a flower bed?",
    answer:
      "For a 10×20 foot bed at 3 inches deep, you need about 1.85 cubic yards (or 25 two-cubic-foot bags). Use this calculator to get exact numbers for your bed dimensions and desired depth.",
  },
  {
    question: "Should I use bags or bulk mulch?",
    answer:
      "For areas under 5 cubic yards, bags are convenient and easy to transport. For larger areas, bulk delivery is significantly cheaper — often $25–$50 per cubic yard delivered vs. $4–$6 per 2-cubic-foot bag ($54–$81 per cubic yard equivalent).",
  },
  {
    question: "How often should I replace mulch?",
    answer:
      "Organic mulch (wood chips, bark) decomposes over 1–3 years. Plan to top-dress annually with 1 inch of fresh mulch to maintain the 3-inch depth. Rubber mulch and stone don't decompose but may need refreshing every 3–5 years.",
  },
  {
    question: "What's the difference between topsoil, compost, and fill dirt?",
    answer:
      "Topsoil is the nutrient-rich top layer of earth, ideal for gardens and lawn leveling. Compost is decomposed organic matter, used to amend soil. Fill dirt is lower-quality subsoil used to fill holes, grade slopes, or build up elevation — not for planting.",
  },
];

export function MulchContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Mulch and Topsoil
        </h2>
        <p>
          Calculating mulch or topsoil is the same as any volume calculation:
          length × width × depth. Measure your bed dimensions in feet, the
          desired depth in inches, and the calculator converts to cubic yards
          (for bulk delivery) and number of standard 2-cubic-foot bags.
        </p>
        <p className="mt-2">
          <strong>Volume (ft³) = Length × Width × (Depth ÷ 12)</strong>
        </p>
        <p className="mt-2">
          <strong>Bags (2 cu ft) = Volume ÷ 2</strong> (rounded up)
        </p>
        <p className="mt-3">
          One cubic yard equals 27 cubic feet, or about 13.5 standard
          two-cubic-foot bags. For large projects, ordering bulk delivery by the
          cubic yard is much more cost-effective than buying individual bags.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for Mulching and Soil Preparation
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Pull weeds before mulching.</strong> Mulch suppresses new
            weed growth but won&apos;t kill existing weeds. Clear the bed
            first, then apply mulch over clean soil or weed barrier fabric.
          </li>
          <li>
            <strong>Keep mulch away from tree trunks.</strong> Leave a 3–6 inch
            gap around tree trunks and plant stems. Mulch piled against bark
            (called &quot;volcano mulching&quot;) traps moisture and causes
            rot.
          </li>
          <li>
            <strong>Water before and after.</strong> Wet the bed before
            spreading mulch so it doesn&apos;t wick moisture from the soil.
            Water lightly after to settle the mulch and prevent wind
            displacement.
          </li>
          <li>
            <strong>Mix compost into topsoil for gardens.</strong> When
            establishing a new garden bed, blend 2–3 inches of compost into the
            top 6–8 inches of topsoil. This creates ideal growing conditions.
          </li>
          <li>
            <strong>Don&apos;t mulch too deep.</strong> More than 4 inches of
            mulch can create a water-repellent mat, prevent gas exchange, and
            encourage shallow root growth. Stick to 2–3 inches.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <FAQSection faqs={mulchFaqs} />
      </section>
    </>
  );
}

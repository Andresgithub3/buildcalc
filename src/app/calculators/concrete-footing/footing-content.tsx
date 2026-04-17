import { FAQSection, type FAQItem } from "@/components/faq-section";

export const footingFaqs: FAQItem[] = [
  {
    question: "How deep should concrete footings be?",
    answer:
      "Footings must extend below the frost line in your area — typically 12 inches in mild climates, 36–48 inches in northern states. Check your local building code for the exact frost depth requirement. In most cases, 12 inches of depth is the minimum for structural footings.",
  },
  {
    question: "How wide should a footing be?",
    answer:
      "A footing should be at least twice as wide as the wall or post it supports. For a standard deck post on a 6×6 post, a 12-inch wide footing is typical. Foundation wall footings are usually 16–24 inches wide depending on the load.",
  },
  {
    question: "Do I need rebar in my footings?",
    answer:
      "For structural footings supporting a deck, addition, or retaining wall — yes. Continuous footings should have at least two #4 rebar running lengthwise, and shorter footings benefit from rebar to prevent cracking. Check local codes for specific requirements.",
  },
  {
    question: "How long does a concrete footing need to cure?",
    answer:
      "Concrete reaches about 70% strength in 7 days and full strength in 28 days. You can typically begin building on footings after 3–7 days in warm weather, but avoid placing heavy loads for at least a week.",
  },
];

export function FootingContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Concrete for Footings
        </h2>
        <p>
          Concrete footings are the foundation of any structure — decks,
          additions, fences, and retaining walls all start here. To calculate the
          concrete needed, multiply the footing&apos;s length (in feet) by width
          and depth (converted from inches to feet). Multiply by the number of
          footings, then add your waste factor.
        </p>
        <p className="mt-3">
          The formula is:{" "}
          <strong>
            Volume per footing (ft³) = Length × (Width ÷ 12) × (Depth ÷ 12)
          </strong>
          . Multiply by the number of footings for total volume, then divide by
          27 for cubic yards.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for Concrete Footings
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dig below the frost line.</strong> Footings that don&apos;t
            extend below the frost line will heave and shift with
            freeze-thaw cycles, causing structural damage above.
          </li>
          <li>
            <strong>Use flat-bottomed holes.</strong> A footing needs a flat,
            level base to distribute load evenly. Round-bottomed post holes
            concentrate force at one point.
          </li>
          <li>
            <strong>Keep footings level.</strong> Use a laser level or string
            line across the tops of your forms to ensure all footings are at the
            same elevation.
          </li>
          <li>
            <strong>Place anchor bolts or post brackets while wet.</strong>{" "}
            J-bolts and post bases must be set into wet concrete. Have them
            ready and positioned before you pour.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Types of Footings
        </h2>
        <p>
          <strong>Spread footings</strong> are flat, wide pads that distribute
          the load of a post or column over a larger area. They&apos;re the most
          common type for decks and sheds.
        </p>
        <p className="mt-3">
          <strong>Continuous footings</strong> (strip footings) run the length
          of a wall and are used for foundations, retaining walls, and
          load-bearing walls. They&apos;re wider than the wall they support.
        </p>
        <p className="mt-3">
          <strong>Pier footings</strong> are cylindrical, often poured using
          Sonotube forms. Use our{" "}
          <a href="/calculators/concrete-column" className="text-primary underline">
            concrete column calculator
          </a>{" "}
          for round pier footings.
        </p>
      </section>

      <section className="mt-8">
        <FAQSection faqs={footingFaqs} />
      </section>
    </>
  );
}

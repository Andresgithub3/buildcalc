import { FAQSection, type FAQItem } from "@/components/faq-section";

export const paintFaqs: FAQItem[] = [
  {
    question: "How many square feet does a gallon of paint cover?",
    answer:
      "One gallon of paint covers approximately 350–400 square feet on smooth, primed surfaces. Rough or textured surfaces like stucco or brick may only get 200–300 square feet per gallon. This calculator uses 350 sq ft as the standard coverage rate.",
  },
  {
    question: "How many coats of paint do I need?",
    answer:
      "Two coats is standard for most paint jobs. Use one coat only if you're applying the same color over a well-prepared surface with a high-quality paint-and-primer combo. Dramatic color changes (especially light over dark) may require 3 coats.",
  },
  {
    question: "How much paint do I need for a 12×12 room?",
    answer:
      "A 12×12 room with 8-foot ceilings, one door, and two windows needs about 2 gallons for two coats. This accounts for approximately 333 square feet of paintable wall area per coat.",
  },
  {
    question: "Should I subtract windows and doors from the total?",
    answer:
      "Yes. Standard doors are about 21 square feet (3×7 feet) and standard windows are about 15 square feet (3×5 feet). Subtracting these prevents over-purchasing. Our calculator does this automatically.",
  },
  {
    question: "Is it better to buy extra paint?",
    answer:
      "Yes, always buy at least one extra quart. You'll need it for touch-ups, and paint batches can vary slightly in color. Keep leftover paint sealed and stored in a climate-controlled space for up to 10 years.",
  },
];

export function PaintContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Paint Coverage
        </h2>
        <p>
          To determine how much paint you need, calculate the total wall area of
          your room, subtract doors and windows, multiply by the number of
          coats, and divide by the coverage rate. The formula is:
        </p>
        <p className="mt-2">
          <strong>
            Paintable Area = (Perimeter × Wall Height − Doors − Windows) × Coats
          </strong>
        </p>
        <p className="mt-2">
          Then: <strong>Gallons = Paintable Area ÷ 350</strong> (standard
          coverage per gallon).
        </p>
        <p className="mt-3">
          This calculator uses 21 sq ft per standard door and 15 sq ft per
          standard window. For non-standard openings, adjust the door and window
          count to match the approximate square footage.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for Getting the Best Paint Coverage
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Prime first for best results.</strong> Primer covers
            imperfections, seals porous surfaces, and gives paint a uniform
            surface to adhere to. It&apos;s especially important when changing
            colors dramatically.
          </li>
          <li>
            <strong>Use quality rollers.</strong> A good 3/8″ nap roller cover
            on smooth walls or 1/2″ nap on semi-smooth provides the best
            coverage with the fewest coats. Cheap rollers leave lint and
            uneven coverage.
          </li>
          <li>
            <strong>Cut in before rolling.</strong> Use an angled brush to paint
            a 2–3 inch border along edges, corners, and trim before rolling the
            main wall area. This gives clean lines and avoids roller marks near
            edges.
          </li>
          <li>
            <strong>Maintain a wet edge.</strong> Always roll into the
            previously painted area before it dries. If you let paint dry and
            then overlap, you&apos;ll get visible lap marks.
          </li>
          <li>
            <strong>Don&apos;t skimp on the second coat.</strong> The second
            coat fills in thin spots, evens out the color, and doubles the
            durability. Wait 2–4 hours between coats (check the can label).
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <FAQSection faqs={paintFaqs} />
      </section>
    </>
  );
}

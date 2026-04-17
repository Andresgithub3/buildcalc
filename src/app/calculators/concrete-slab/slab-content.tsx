import { FAQSection, type FAQItem } from "@/components/faq-section";

export const slabFaqs: FAQItem[] = [
  {
    question: "How thick should a concrete slab be?",
    answer:
      "For a standard patio or walkway, 4 inches is sufficient. Driveways should be at least 5–6 inches thick to support vehicle weight. Garage floors are typically 4–6 inches. If heavy trucks or equipment will use the surface, go with 6–8 inches.",
  },
  {
    question: "How many bags of concrete do I need for a 10×10 slab?",
    answer:
      "A 10×10 slab at 4 inches thick requires approximately 1.24 cubic yards of concrete, or about 56 80-lb bags of premixed concrete. With a 10% waste factor, plan for around 62 bags. For larger projects, ordering ready-mix by the yard is more practical and cost-effective.",
  },
  {
    question: "Should I use bags or ready-mix concrete?",
    answer:
      "For small projects under 1 cubic yard (about 45 80-lb bags), bags are practical. For anything larger, ready-mix delivery is faster, more consistent, and usually cheaper per yard. The break-even point is typically around 1–1.5 cubic yards.",
  },
  {
    question: "What waste factor should I use?",
    answer:
      "A 10% waste factor is standard for most slab projects. Increase to 15% if the site has irregular edges, poor subgrade preparation, or if you're a first-time pourer. Experienced contractors on clean sites may use 5–7%.",
  },
  {
    question: "How much does a concrete slab cost?",
    answer:
      "Ready-mix concrete typically costs $125–$175 per cubic yard delivered. Total project cost including labor, forming, and finishing runs $6–$12 per square foot for a basic slab. Decorative or stamped concrete can double or triple that price.",
  },
];

export function SlabContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Concrete for a Slab
        </h2>
        <p>
          Calculating the right amount of concrete for a slab is straightforward
          once you understand the formula. Measure your slab&apos;s length and
          width in feet, then the depth in inches. The calculator converts depth
          to feet (dividing by 12), multiplies all three dimensions to get cubic
          feet, then divides by 27 to convert to cubic yards — the standard unit
          for ordering concrete.
        </p>
        <p className="mt-3">
          The formula is:{" "}
          <strong>Volume (ft³) = Length × Width × (Depth ÷ 12)</strong>. Then
          divide by 27 to get cubic yards. Always add a waste factor (typically
          10%) to account for spillage, over-excavation, and form
          inconsistencies.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for a Successful Concrete Slab Pour
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Prepare the subgrade properly.</strong> Compact the soil and
            add a 4-inch gravel base for drainage. Poor subgrade is the #1 cause
            of cracking and settling.
          </li>
          <li>
            <strong>Use fiber mesh or wire mesh for reinforcement.</strong> For
            slabs over 4 inches thick or any slab that will bear vehicle weight,
            reinforcement prevents cracking.
          </li>
          <li>
            <strong>Plan for control joints.</strong> Score or cut joints every
            8–12 feet in both directions to control where cracks form. The rule
            of thumb: joint spacing in feet should not exceed 2–3 times the slab
            thickness in inches.
          </li>
          <li>
            <strong>Order 5–10% more than calculated.</strong> Running short
            mid-pour creates cold joints, which are both unsightly and
            structurally weak. It&apos;s always better to have a little extra.
          </li>
          <li>
            <strong>Cure the concrete properly.</strong> Keep the slab moist for
            at least 7 days after pouring. Use curing compound or cover with
            plastic sheeting. Proper curing increases strength by up to 50%.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Common Mistakes When Ordering Concrete
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Not accounting for uneven ground.</strong> If your excavation
            isn&apos;t perfectly level, you&apos;ll need more concrete to fill
            low spots. Measure depth at multiple points and use the deepest
            measurement.
          </li>
          <li>
            <strong>Forgetting form thickness.</strong> If you&apos;re using 2×4
            or 2×6 lumber for forms, the interior dimensions will be slightly
            smaller than the exterior. Measure inside the forms.
          </li>
          <li>
            <strong>Ordering exact quantities with no buffer.</strong> Always
            round up. A shortfall mid-pour is far worse than having a small
            amount left over.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <FAQSection faqs={slabFaqs} />
      </section>
    </>
  );
}

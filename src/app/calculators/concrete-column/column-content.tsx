import { FAQSection, type FAQItem } from "@/components/faq-section";

export const columnFaqs: FAQItem[] = [
  {
    question: "What size Sonotube do I need?",
    answer:
      "For deck posts, 8–12 inch diameter Sonotubes are standard. 8-inch tubes work for lightweight structures, while 12-inch tubes are better for load-bearing deck posts. For larger structures like pergolas or carports, 14–24 inch tubes may be required. Check your local building code.",
  },
  {
    question: "How deep should a Sonotube be?",
    answer:
      "Sonotubes must extend below your local frost line — usually 36–48 inches in northern climates and 12–24 inches in southern areas. Most codes also require a minimum of 12 inches into undisturbed soil. The tube should extend 2–3 inches above grade to prevent ground contact with the post.",
  },
  {
    question: "Can I pour concrete into a post hole without a Sonotube?",
    answer:
      "Yes, but Sonotubes provide significant advantages: a cleaner pour, consistent diameter, smoother finish above grade, and better control of the concrete shape. Without a tube, soil can mix with the concrete and the hole walls may cave in during the pour.",
  },
  {
    question: "How many bags of concrete for a Sonotube?",
    answer:
      "A 12-inch Sonotube that's 4 feet deep requires about 1.4 bags of 80-lb concrete mix (about 3.14 cubic feet). An 8-inch tube at 4 feet needs roughly 0.6 bags. This calculator gives exact numbers based on your dimensions.",
  },
];

export function ColumnContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Concrete for Round Columns
        </h2>
        <p>
          Round columns and Sonotubes use the cylinder volume formula:{" "}
          <strong>V = π × r² × h</strong>. Enter the diameter in inches
          and the height in feet. The calculator converts everything to cubic
          feet, then to cubic yards for ordering. Remember to add waste — 10% is
          standard for column pours.
        </p>
        <p className="mt-3">
          This calculator works for Sonotube cardboard forms, round post holes,
          pier footings, and any cylindrical concrete pour. If you&apos;re
          pouring multiple identical columns, just enter the count and the
          calculator totals everything for you.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for Pouring Sonotubes
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Brace tubes plumb and secure.</strong> Sonotubes can shift
            during the pour. Use braces and stakes to keep them perfectly
            vertical. A tube that moves during the pour means a crooked post.
          </li>
          <li>
            <strong>Flare the base if code requires it.</strong> Some building
            codes require a bell-shaped footing at the base of the tube for
            extra bearing capacity. Dig the hole wider at the bottom.
          </li>
          <li>
            <strong>Vibrate or rod the concrete.</strong> Use a piece of rebar
            to rod (push up and down into) the wet concrete to release air
            pockets. Trapped air creates voids that weaken the column.
          </li>
          <li>
            <strong>Set post brackets immediately.</strong> Press post base
            brackets or J-bolts into the wet concrete and align them while you
            still have working time (typically 30–60 minutes).
          </li>
          <li>
            <strong>Peel the tube after curing.</strong> If the Sonotube is
            above grade, peel it off after 24–48 hours. Leaving cardboard on
            traps moisture and can cause the concrete surface to deteriorate.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Common Sonotube Sizes
        </h2>
        <p>
          Standard Sonotube diameters: 6″, 8″, 10″, 12″, 14″, 16″, 18″, 20″,
          and 24″. The most popular sizes for residential deck construction are
          10″ and 12″. Lengths are typically 4 feet or 12 feet, which you cut to
          your required depth plus 2–3 inches above grade.
        </p>
      </section>

      <section className="mt-8">
        <FAQSection faqs={columnFaqs} />
      </section>
    </>
  );
}

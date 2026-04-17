import { FAQSection, type FAQItem } from "@/components/faq-section";

export const gravelFaqs: FAQItem[] = [
  {
    question: "How much gravel do I need for a driveway?",
    answer:
      "A typical gravel driveway is 12 feet wide and should be 4–6 inches deep. For a 50-foot long driveway (600 sq ft) at 4 inches deep, you need about 7.4 cubic yards or roughly 10.4 tons of gravel. Use 6 inches for heavy traffic areas.",
  },
  {
    question: "What's the difference between cubic yards and tons?",
    answer:
      "Cubic yards measure volume while tons measure weight. The conversion depends on the material density: gravel weighs about 1.4 tons per cubic yard, crushed stone 1.35 tons, and river rock 1.5 tons. Suppliers sell by the ton or yard depending on the material.",
  },
  {
    question: "How deep should gravel be?",
    answer:
      "For driveways: 4–6 inches. For walkways: 2–3 inches. For drainage beds: 6–12 inches. For landscape ground cover: 2–3 inches. For a base under pavers or concrete: 4–6 inches of compacted gravel.",
  },
  {
    question: "Which type of gravel should I use?",
    answer:
      "Crushed stone (#57 or #67) is best for driveways and pathways because it compacts well and interlocks. Pea gravel is best for decorative areas, dog runs, and between pavers. River rock is used for landscaping, dry creek beds, and drainage. Base gravel (#21A or crusher run) goes under pavers and concrete.",
  },
];

export function GravelContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Gravel and Aggregate
        </h2>
        <p>
          To calculate gravel, multiply the length and width of your area (in
          feet) by the depth (converted from inches to feet). This gives you
          cubic feet, which you divide by 27 for cubic yards. To get tons,
          multiply cubic yards by the material&apos;s density factor.
        </p>
        <p className="mt-2">
          <strong>
            Volume (ft³) = Length × Width × (Depth ÷ 12)
          </strong>
        </p>
        <p className="mt-2">
          <strong>Tons = (Volume ÷ 27) × Density Factor</strong>
        </p>
        <p className="mt-3">
          Density varies by material: gravel is 1.4 tons/yd³, crushed stone is
          1.35 tons/yd³, pea gravel is 1.35 tons/yd³, and river rock is 1.5
          tons/yd³. These are approximate — actual density depends on moisture
          content and specific aggregate source.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for Ordering and Installing Gravel
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Compact in lifts.</strong> Don&apos;t pour all your gravel
            at once. Add it in 2-inch layers (lifts), compacting each layer
            with a plate compactor before adding the next. This prevents
            shifting and settling.
          </li>
          <li>
            <strong>Use landscape fabric underneath.</strong> A woven geotextile
            fabric between the soil and gravel prevents sinking and weed growth.
            It&apos;s essential for driveways and pathways.
          </li>
          <li>
            <strong>Edge it properly.</strong> Gravel without edging migrates
            into lawns and flower beds. Use steel, aluminum, or plastic edging
            to keep gravel contained.
          </li>
          <li>
            <strong>Order by the ton for accuracy.</strong> Suppliers often
            estimate loosely when selling by the yard. Ordering by the ton
            ensures you get the exact amount you&apos;re paying for.
          </li>
          <li>
            <strong>Consider delivery access.</strong> Dump trucks need 10–12
            feet of width and overhead clearance. Know where the truck can dump
            and how far you&apos;ll need to wheelbarrow the material.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <FAQSection faqs={gravelFaqs} />
      </section>
    </>
  );
}

import { FAQSection, type FAQItem } from "@/components/faq-section";

export const fenceFaqs: FAQItem[] = [
  {
    question: "How many fence posts do I need?",
    answer:
      "Divide your total fence length by the post spacing (typically 6 or 8 feet), then add 1 for the end post. Add 2 extra posts for each gate (one on each side). For a 100-foot fence with 8-foot spacing and one gate: (100 ÷ 8) + 1 + 2 = 16 posts.",
  },
  {
    question: "Should I use 6-foot or 8-foot post spacing?",
    answer:
      "8-foot spacing is standard for most wood fences — it uses standard 8-foot and 16-foot lumber efficiently with minimal waste. Use 6-foot spacing for taller fences (8 ft), areas with high winds, or when using heavier materials like composite boards.",
  },
  {
    question: "How deep should fence posts be set?",
    answer:
      "The general rule is 1/3 of the total post length should be underground. For a 6-foot fence with 8-foot posts, set them 24–30 inches deep. In cold climates, posts should extend below the frost line. Always set posts in concrete for maximum stability.",
  },
  {
    question: "How many bags of concrete per fence post?",
    answer:
      "Plan for 1–2 bags (80 lb) of fast-setting concrete per post, depending on hole size. A standard 10-inch diameter, 30-inch deep hole uses about 1.5 bags. This calculator estimates 2 bags per post for a solid, conservative estimate.",
  },
  {
    question: "How many pickets do I need per foot of fence?",
    answer:
      "With standard 3.5-inch (1×4) pickets and 1/4-inch gaps, you need about 3.2 pickets per linear foot of fence. For 5.5-inch (1×6) pickets with 1/4-inch gaps, it's about 2.1 per foot. Board-on-board fences use roughly 50% more pickets.",
  },
];

export function FenceContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Estimate Fence Materials
        </h2>
        <p>
          Estimating fence materials requires calculating posts, rails, and
          pickets (or panels) based on your total fence length, height, and post
          spacing. The calculator subtracts gate widths from the fenced length
          while adding extra gate posts.
        </p>
        <p className="mt-3">
          <strong>Posts</strong> = (Fence length ÷ Post spacing) + 1 + (Gates ×
          2). <strong>Rails</strong> = Number of sections × rails per section (2
          for 4-ft fence, 3 for 6-ft and 8-ft). <strong>Pickets</strong> = Fence
          length × 3.2 pickets per foot (for standard 3.5″ boards).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for Building a Fence
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Check property lines and local codes first.</strong> Most
            municipalities require setbacks (1–6 inches from the property line)
            and permits for fences over 4 feet. Get a survey if you&apos;re
            unsure where the property line is — a misplaced fence is expensive
            to fix.
          </li>
          <li>
            <strong>Call 811 before digging.</strong> Utility locating is free
            and required by law. A single cut cable or gas line will cost far
            more than the entire fence project.
          </li>
          <li>
            <strong>Set corner and end posts first.</strong> Install these
            posts, run a string line between them, and use it as a guide for
            all intermediate posts. This ensures a straight fence line.
          </li>
          <li>
            <strong>Use pressure-treated posts rated for ground contact.</strong>{" "}
            Posts set in concrete need to be rated for ground contact (UC4A or
            higher). Standard pressure-treated lumber will rot in the ground
            within a few years.
          </li>
          <li>
            <strong>Build gates first, fence second.</strong> Or at least frame
            the gate opening and hang the gate before installing pickets. It&apos;s
            much easier to adjust the opening when the fence isn&apos;t complete.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Comparing Fence Materials
        </h2>
        <p>
          <strong>Wood</strong> ($12–$25/linear foot) is the most popular
          choice, offering privacy and a natural look. Cedar and redwood resist
          rot naturally; pressure-treated pine is the most affordable option.
          Expect 15–20 years of life with proper maintenance.
        </p>
        <p className="mt-3">
          <strong>Vinyl/PVC</strong> ($20–$40/linear foot) costs more upfront
          but requires zero maintenance — no painting, staining, or sealing.
          Panels snap together for faster installation. Lifespan: 20–30+ years.
        </p>
        <p className="mt-3">
          <strong>Chain link</strong> ($8–$18/linear foot) is the most
          affordable option and ideal for property boundaries, pet containment,
          and security. It offers no privacy unless you add slats or fabric.
          Galvanized chain link lasts 15–20 years; vinyl-coated lasts longer.
        </p>
      </section>

      <section className="mt-8">
        <FAQSection faqs={fenceFaqs} />
      </section>
    </>
  );
}

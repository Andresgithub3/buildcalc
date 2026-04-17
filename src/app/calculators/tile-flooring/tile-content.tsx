import { FAQSection, type FAQItem } from "@/components/faq-section";

export const tileFaqs: FAQItem[] = [
  {
    question: "How do I calculate how many tiles I need?",
    answer:
      "Multiply room length by width to get the floor area in square feet. Divide by the area of one tile (e.g., 12×12 inch tile = 1 sq ft). Add 10% for waste from cuts and breakage. This calculator handles all of that automatically.",
  },
  {
    question: "What waste percentage should I use for tile?",
    answer:
      "Use 10% for standard rectangular rooms with straight layouts. Increase to 15% for diagonal (45°) layouts, and 20% for complex patterns like herringbone. Rooms with many corners, alcoves, or curves also need higher waste factors.",
  },
  {
    question: "What's the most common tile size for floors?",
    answer:
      "12×12 inches is the most popular residential floor tile. 18×18 and 12×24 are also very common in modern homes. Larger tiles (24×24) look great in open spaces but create more waste in small rooms.",
  },
  {
    question: "How many tiles come in a box?",
    answer:
      "This varies by manufacturer and tile size. Common counts: 12×12 tiles typically come 12–15 per box (12–15 sq ft), 18×18 tiles come 6–8 per box (13.5–18 sq ft), and 24×24 tiles come 3–4 per box (12–16 sq ft). Check the box label for exact coverage.",
  },
];

export function TileContent() {
  return (
    <>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-4">
          How to Calculate Tiles for Your Floor
        </h2>
        <p>
          Calculating tile quantity is simple: find the total area of your floor,
          add a waste factor for cuts, then divide by the area of one tile. The
          formula is:
        </p>
        <p className="mt-2">
          <strong>
            Tiles Needed = (Room Length × Room Width × Waste Factor) ÷ Tile Area
          </strong>
        </p>
        <p className="mt-3">
          A 12×12 inch tile covers exactly 1 square foot. An 18×18 tile covers
          2.25 square feet. A 24×24 tile covers 4 square feet. For custom sizes,
          multiply tile width by height in inches and divide by 144 to get square
          feet per tile.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Tips for a Successful Tile Installation
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Always dry-lay tiles first.</strong> Place tiles on the floor
            without adhesive to check the layout, find the center point, and see
            where cuts will fall. Adjust so you don&apos;t end up with thin
            slivers at walls.
          </li>
          <li>
            <strong>Start from the center of the room.</strong> Find the
            centerpoint, snap chalk lines, and work outward. This ensures
            symmetry and puts cut tiles at the edges where they&apos;re less
            visible.
          </li>
          <li>
            <strong>Use the right thinset for your tile.</strong> Large format
            tiles (15″+) need large-format thinset with good sag resistance.
            Porcelain tiles need a thinset rated for porcelain (low absorption).
          </li>
          <li>
            <strong>Don&apos;t forget spacers.</strong> Tile spacers ensure
            consistent grout lines. Use 1/16″ for a tight look, 1/8″ for
            standard, and 3/16″ for a rustic appearance. Larger tiles often look
            best with thinner grout lines.
          </li>
          <li>
            <strong>Buy all tiles from the same lot.</strong> Tile color varies
            between manufacturing lots. Order all your tiles at once and confirm
            the lot number is the same on every box.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <FAQSection faqs={tileFaqs} />
      </section>
    </>
  );
}

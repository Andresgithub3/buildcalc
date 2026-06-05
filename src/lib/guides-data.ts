import {
  DollarSign,
  Scale,
  Calculator,
  Footprints,
  Paintbrush,
  TreePine,
  Mountain,
  Fence,
  type LucideIcon,
} from "lucide-react";

export interface GuideInfo {
  slug: string;
  /** Category key under the `guides.categories` namespace */
  category: "concrete" | "paint" | "landscaping" | "fencing";
  icon: LucideIcon;
  /** Calculator slugs to surface as related tools at the end of the article */
  relatedCalculators: string[];
}

/**
 * Long-form resource guides. Title, description, and body copy live in the
 * `guides.items.<slug>` translation namespace; this file holds only the
 * structural metadata used for routing, listing, and internal linking.
 */
export const guides: GuideInfo[] = [
  {
    slug: "how-much-concrete-do-i-need",
    category: "concrete",
    icon: Calculator,
    relatedCalculators: [
      "concrete-slab",
      "concrete-footing",
      "concrete-column",
    ],
  },
  {
    slug: "concrete-driveway-cost",
    category: "concrete",
    icon: DollarSign,
    relatedCalculators: ["concrete-slab", "gravel-and-aggregate"],
  },
  {
    slug: "concrete-vs-asphalt",
    category: "concrete",
    icon: Scale,
    relatedCalculators: ["concrete-slab"],
  },
  {
    slug: "deck-footing-size-guide",
    category: "concrete",
    icon: Footprints,
    relatedCalculators: ["concrete-footing", "concrete-column"],
  },
  {
    slug: "how-much-paint-do-i-need",
    category: "paint",
    icon: Paintbrush,
    relatedCalculators: ["paint-coverage"],
  },
  {
    slug: "how-much-mulch-do-i-need",
    category: "landscaping",
    icon: TreePine,
    relatedCalculators: ["mulch-and-topsoil"],
  },
  {
    slug: "gravel-driveway-cost",
    category: "landscaping",
    icon: Mountain,
    relatedCalculators: ["gravel-and-aggregate"],
  },
  {
    slug: "fence-cost-guide",
    category: "fencing",
    icon: Fence,
    relatedCalculators: ["fence-materials"],
  },
];

export const guideSlugs = guides.map((g) => g.slug);

export function getGuide(slug: string): GuideInfo | undefined {
  return guides.find((g) => g.slug === slug);
}

import {
  Blocks,
  Footprints,
  Cylinder,
  Paintbrush,
  Grid3X3,
  Mountain,
  TreePine,
  Fence,
  type LucideIcon,
} from "lucide-react";

export interface CalculatorInfo {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
}

export const calculators: CalculatorInfo[] = [
  {
    slug: "concrete-slab",
    name: "Concrete Slab Calculator",
    shortName: "Concrete Slab",
    description:
      "Calculate cubic yards, bags, and cost for concrete slabs, patios, and driveways.",
    icon: Blocks,
    keywords: ["concrete", "slab", "patio", "driveway", "cubic yards"],
  },
  {
    slug: "concrete-footing",
    name: "Concrete Footing Calculator",
    shortName: "Concrete Footing",
    description:
      "Estimate concrete needed for deck footings, pier footings, and foundations.",
    icon: Footprints,
    keywords: ["concrete", "footing", "deck", "pier", "foundation"],
  },
  {
    slug: "concrete-column",
    name: "Concrete Column / Sonotube Calculator",
    shortName: "Concrete Column",
    description:
      "Calculate concrete for round columns, Sonotubes, and post holes.",
    icon: Cylinder,
    keywords: ["concrete", "column", "sonotube", "post hole", "round"],
  },
  {
    slug: "paint-coverage",
    name: "Paint Coverage Calculator",
    shortName: "Paint Coverage",
    description:
      "Figure out how many gallons of paint you need for walls, rooms, and ceilings.",
    icon: Paintbrush,
    keywords: ["paint", "coverage", "gallons", "walls", "room"],
  },
  {
    slug: "tile-flooring",
    name: "Tile & Flooring Calculator",
    shortName: "Tile & Flooring",
    description:
      "Calculate the number of tiles, boxes, and coverage for any floor.",
    icon: Grid3X3,
    keywords: ["tile", "flooring", "floor", "ceramic", "porcelain"],
  },
  {
    slug: "gravel-and-aggregate",
    name: "Gravel & Aggregate Calculator",
    shortName: "Gravel & Aggregate",
    description:
      "Estimate cubic yards and tons of gravel, crushed stone, or river rock.",
    icon: Mountain,
    keywords: ["gravel", "aggregate", "crushed stone", "river rock", "tons"],
  },
  {
    slug: "mulch-and-topsoil",
    name: "Mulch & Topsoil Calculator",
    shortName: "Mulch & Topsoil",
    description:
      "Calculate bags or cubic yards of mulch, topsoil, compost, or fill dirt.",
    icon: TreePine,
    keywords: ["mulch", "topsoil", "compost", "soil", "bags"],
  },
  {
    slug: "fence-materials",
    name: "Fence Materials Estimator",
    shortName: "Fence Materials",
    description:
      "Estimate posts, rails, pickets, and concrete for wood, vinyl, or chain-link fences.",
    icon: Fence,
    keywords: ["fence", "posts", "rails", "pickets", "wood", "vinyl"],
  },
];

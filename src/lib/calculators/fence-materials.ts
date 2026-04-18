export type FenceHeight = 4 | 6 | 8; // feet
export type PostSpacing = 6 | 8; // feet
export type FenceMaterial = "wood" | "vinyl" | "chain-link";

export interface FenceMaterialsInput {
  totalLength: number; // feet
  height: FenceHeight;
  postSpacing: PostSpacing;
  gateCount: number;
  material: FenceMaterial;
  customCostPerFoot?: number; // $/ft
}

export interface FenceMaterialsResult {
  numberOfPosts: number;
  numberOfRails: number;
  numberOfPicketsOrPanels: number;
  bagsOfConcrete: number; // 80lb bags for post holes
  estimatedCostLow: number;
  estimatedCostHigh: number;
  estimatedCost?: number;
}

// Rails per section based on height
const RAILS_PER_SECTION: Record<FenceHeight, number> = {
  4: 2,
  6: 3,
  8: 3,
};

// Pickets per foot of fence (wood, 3.5" picket with 0.25" gap)
const PICKETS_PER_FOOT = 3.2;

// Panels are typically 6ft or 8ft wide (matching post spacing)
// Chain link is sold by the foot in rolls

// Cost per linear foot ranges by material
const COST_PER_FOOT: Record<FenceMaterial, { low: number; high: number }> = {
  wood: { low: 12, high: 25 },
  vinyl: { low: 20, high: 40 },
  "chain-link": { low: 8, high: 18 },
};

// Bags of concrete per post (80lb bags)
const BAGS_PER_POST = 2;

// Gate width in feet
const GATE_WIDTH = 4;

export function calculateFenceMaterials(
  input: FenceMaterialsInput
): FenceMaterialsResult {
  const { totalLength, height, postSpacing, gateCount, material, customCostPerFoot } = input;

  // Subtract gate widths from fenced length
  const gateLength = gateCount * GATE_WIDTH;
  const fencedLength = Math.max(0, totalLength - gateLength);

  // Posts: one at each end + one every postSpacing feet
  // Plus 2 extra posts per gate (gate posts)
  const sections = Math.ceil(fencedLength / postSpacing);
  const fencePosts = sections + 1;
  const gatePosts = gateCount * 2;
  const numberOfPosts = fencePosts + gatePosts;

  // Rails: per section
  const railsPerSection = RAILS_PER_SECTION[height];
  const numberOfRails = sections * railsPerSection;

  // Pickets/panels
  let numberOfPicketsOrPanels: number;
  if (material === "wood") {
    numberOfPicketsOrPanels = Math.ceil(fencedLength * PICKETS_PER_FOOT);
  } else if (material === "vinyl") {
    // Vinyl panels match post spacing
    numberOfPicketsOrPanels = sections;
  } else {
    // Chain link: sold by the linear foot, but we report # of rolls (50ft rolls)
    numberOfPicketsOrPanels = Math.ceil(fencedLength / 50);
  }

  const bagsOfConcrete = numberOfPosts * BAGS_PER_POST;

  const costRange = COST_PER_FOOT[material];

  return {
    numberOfPosts,
    numberOfRails,
    numberOfPicketsOrPanels,
    bagsOfConcrete,
    estimatedCostLow: round(totalLength * costRange.low, 2),
    estimatedCostHigh: round(totalLength * costRange.high, 2),
    estimatedCost: customCostPerFoot
      ? round(totalLength * customCostPerFoot, 2)
      : undefined,
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

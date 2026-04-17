export type MaterialType = "gravel" | "crushed-stone" | "pea-gravel" | "river-rock";

export interface GravelAggregateInput {
  length: number; // feet
  width: number; // feet
  depth: number; // inches
  materialType: MaterialType;
}

export interface GravelAggregateResult {
  cubicFeet: number;
  cubicYards: number;
  tons: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
}

const DENSITIES: Record<MaterialType, number> = {
  gravel: 1.4, // tons per cubic yard
  "crushed-stone": 1.35,
  "pea-gravel": 1.35,
  "river-rock": 1.5,
};

const COST_PER_TON_LOW = 30;
const COST_PER_TON_HIGH = 65;

export function calculateGravelAggregate(
  input: GravelAggregateInput
): GravelAggregateResult {
  const { length, width, depth, materialType } = input;

  const cubicFeet = length * width * (depth / 12);
  const cubicYards = cubicFeet / 27;
  const tons = cubicYards * DENSITIES[materialType];

  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    tons: round(tons, 2),
    estimatedCostLow: round(tons * COST_PER_TON_LOW, 2),
    estimatedCostHigh: round(tons * COST_PER_TON_HIGH, 2),
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

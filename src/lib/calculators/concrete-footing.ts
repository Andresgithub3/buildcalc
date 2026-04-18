export interface ConcreteFootingInput {
  length: number; // feet
  width: number; // inches
  depth: number; // inches
  numberOfFootings: number;
  wastePercent: number; // default 10
  customCostPerYard?: number; // $/yd³
}

export interface ConcreteFootingResult {
  perFootingCubicFeet: number;
  totalCubicFeet: number;
  cubicYards: number;
  bags80lb: number;
  bags60lb: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
  estimatedCost?: number;
}

const COST_PER_YARD_LOW = 125;
const COST_PER_YARD_HIGH = 175;
const BAGS_80LB_PER_CUBIC_FOOT = 0.45;
const BAGS_60LB_PER_CUBIC_FOOT = 0.6;

export function calculateConcreteFooting(
  input: ConcreteFootingInput
): ConcreteFootingResult {
  const { length, width, depth, numberOfFootings, wastePercent, customCostPerYard } = input;

  const perFootingCubicFeet = length * (width / 12) * (depth / 12);
  const totalVolume = perFootingCubicFeet * numberOfFootings;
  const wasteFactor = 1 + wastePercent / 100;
  const totalCubicFeet = totalVolume * wasteFactor;
  const cubicYards = totalCubicFeet / 27;

  return {
    perFootingCubicFeet: round(perFootingCubicFeet, 2),
    totalCubicFeet: round(totalCubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    bags80lb: Math.ceil(totalCubicFeet * BAGS_80LB_PER_CUBIC_FOOT),
    bags60lb: Math.ceil(totalCubicFeet * BAGS_60LB_PER_CUBIC_FOOT),
    estimatedCostLow: round(cubicYards * COST_PER_YARD_LOW, 2),
    estimatedCostHigh: round(cubicYards * COST_PER_YARD_HIGH, 2),
    estimatedCost: customCostPerYard
      ? round(cubicYards * customCostPerYard, 2)
      : undefined,
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export interface ConcreteColumnInput {
  diameter: number; // inches
  height: number; // feet
  numberOfColumns: number;
  wastePercent: number; // default 10
}

export interface ConcreteColumnResult {
  perColumnCubicFeet: number;
  totalCubicFeet: number;
  cubicYards: number;
  bags80lb: number;
  bags60lb: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
}

const COST_PER_YARD_LOW = 125;
const COST_PER_YARD_HIGH = 175;
const BAGS_80LB_PER_CUBIC_FOOT = 0.45;
const BAGS_60LB_PER_CUBIC_FOOT = 0.6;

export function calculateConcreteColumn(
  input: ConcreteColumnInput
): ConcreteColumnResult {
  const { diameter, height, numberOfColumns, wastePercent } = input;

  // Volume = π × r² × h (all in inches, then convert to cubic feet)
  const radiusInches = diameter / 2;
  const heightInches = height * 12;
  const volumeCubicInches =
    Math.PI * radiusInches * radiusInches * heightInches;
  const perColumnCubicFeet = volumeCubicInches / 1728; // 12³ = 1728

  const totalVolume = perColumnCubicFeet * numberOfColumns;
  const wasteFactor = 1 + wastePercent / 100;
  const totalCubicFeet = totalVolume * wasteFactor;
  const cubicYards = totalCubicFeet / 27;

  return {
    perColumnCubicFeet: round(perColumnCubicFeet, 2),
    totalCubicFeet: round(totalCubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    bags80lb: Math.ceil(totalCubicFeet * BAGS_80LB_PER_CUBIC_FOOT),
    bags60lb: Math.ceil(totalCubicFeet * BAGS_60LB_PER_CUBIC_FOOT),
    estimatedCostLow: round(cubicYards * COST_PER_YARD_LOW, 2),
    estimatedCostHigh: round(cubicYards * COST_PER_YARD_HIGH, 2),
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

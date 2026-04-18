export type MulchMaterial = "mulch" | "topsoil" | "compost" | "fill-dirt";

export interface MulchTopsoilInput {
  length: number; // feet
  width: number; // feet
  depth: number; // inches
  material: MulchMaterial;
  customCostPerYard?: number; // $/yd³
}

export interface MulchTopsoilResult {
  cubicFeet: number;
  cubicYards: number;
  bags2CuFt: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
  estimatedCost?: number;
}

// Cost per cubic yard ranges
const COST_RANGES: Record<MulchMaterial, { low: number; high: number }> = {
  mulch: { low: 25, high: 50 },
  topsoil: { low: 20, high: 55 },
  compost: { low: 30, high: 60 },
  "fill-dirt": { low: 10, high: 30 },
};

const BAG_SIZE_CUBIC_FEET = 2;

export function calculateMulchTopsoil(
  input: MulchTopsoilInput
): MulchTopsoilResult {
  const { length, width, depth, material, customCostPerYard } = input;

  const cubicFeet = length * width * (depth / 12);
  const cubicYards = cubicFeet / 27;
  const bags2CuFt = Math.ceil(cubicFeet / BAG_SIZE_CUBIC_FEET);

  const costRange = COST_RANGES[material];

  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    bags2CuFt,
    estimatedCostLow: round(cubicYards * costRange.low, 2),
    estimatedCostHigh: round(cubicYards * costRange.high, 2),
    estimatedCost: customCostPerYard
      ? round(cubicYards * customCostPerYard, 2)
      : undefined,
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

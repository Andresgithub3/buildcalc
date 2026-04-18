export type TileSize = "12x12" | "18x18" | "24x24" | "custom";

export interface TileFlooringInput {
  roomLength: number; // feet
  roomWidth: number; // feet
  tileSize: TileSize;
  customTileWidth?: number; // inches (only when tileSize is "custom")
  customTileHeight?: number; // inches (only when tileSize is "custom")
  wastePercent: number; // default 10
  tilesPerBox: number; // default varies by size
  customCostPerBox?: number; // $/box
}

export interface TileFlooringResult {
  totalArea: number; // sq ft
  tileAreaSqFt: number; // area of one tile in sq ft
  tilesNeeded: number;
  boxesNeeded: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
  estimatedCost?: number;
}

const COST_PER_BOX_LOW = 25;
const COST_PER_BOX_HIGH = 75;

const TILE_SIZES: Record<Exclude<TileSize, "custom">, { width: number; height: number }> = {
  "12x12": { width: 12, height: 12 },
  "18x18": { width: 18, height: 18 },
  "24x24": { width: 24, height: 24 },
};

export function calculateTileFlooring(
  input: TileFlooringInput
): TileFlooringResult {
  const { roomLength, roomWidth, tileSize, wastePercent, tilesPerBox, customCostPerBox } = input;

  const totalArea = roomLength * roomWidth;
  const wasteFactor = 1 + wastePercent / 100;
  const adjustedArea = totalArea * wasteFactor;

  let tileWidthInches: number;
  let tileHeightInches: number;

  if (tileSize === "custom") {
    tileWidthInches = input.customTileWidth ?? 12;
    tileHeightInches = input.customTileHeight ?? 12;
  } else {
    const size = TILE_SIZES[tileSize];
    tileWidthInches = size.width;
    tileHeightInches = size.height;
  }

  const tileAreaSqFt = (tileWidthInches * tileHeightInches) / 144; // 12² = 144
  const tilesNeeded = Math.ceil(adjustedArea / tileAreaSqFt);
  const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);

  return {
    totalArea: round(totalArea, 2),
    tileAreaSqFt: round(tileAreaSqFt, 4),
    tilesNeeded,
    boxesNeeded,
    estimatedCostLow: round(boxesNeeded * COST_PER_BOX_LOW, 2),
    estimatedCostHigh: round(boxesNeeded * COST_PER_BOX_HIGH, 2),
    estimatedCost: customCostPerBox
      ? round(boxesNeeded * customCostPerBox, 2)
      : undefined,
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

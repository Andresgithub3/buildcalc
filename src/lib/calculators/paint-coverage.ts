export interface PaintCoverageInput {
  roomLength: number; // feet
  roomWidth: number; // feet
  wallHeight: number; // feet
  numberOfDoors: number; // default 1
  numberOfWindows: number; // default 2
  numberOfCoats: number; // default 2
  customCostPerGallon?: number; // $/gal
}

export interface PaintCoverageResult {
  totalWallArea: number; // sq ft (before subtracting openings)
  doorArea: number; // sq ft
  windowArea: number; // sq ft
  paintableArea: number; // sq ft
  gallonsNeeded: number;
  estimatedCostLow: number;
  estimatedCostHigh: number;
  estimatedCost?: number;
}

const DOOR_AREA = 21; // sq ft (standard 3x7 door)
const WINDOW_AREA = 15; // sq ft (standard 3x5 window)
const COVERAGE_PER_GALLON = 350; // sq ft
const COST_PER_GALLON_LOW = 25;
const COST_PER_GALLON_HIGH = 50;

export function calculatePaintCoverage(
  input: PaintCoverageInput
): PaintCoverageResult {
  const {
    roomLength,
    roomWidth,
    wallHeight,
    numberOfDoors,
    numberOfWindows,
    numberOfCoats,
    customCostPerGallon,
  } = input;

  // Perimeter × height = total wall area
  const perimeter = 2 * (roomLength + roomWidth);
  const totalWallArea = perimeter * wallHeight;

  const doorArea = numberOfDoors * DOOR_AREA;
  const windowArea = numberOfWindows * WINDOW_AREA;
  const paintableArea = (totalWallArea - doorArea - windowArea) * numberOfCoats;

  const gallonsNeeded = paintableArea / COVERAGE_PER_GALLON;

  const roundedGallons = round(Math.ceil(gallonsNeeded * 10) / 10, 1);

  return {
    totalWallArea: round(totalWallArea, 2),
    doorArea: round(doorArea, 2),
    windowArea: round(windowArea, 2),
    paintableArea: round(paintableArea, 2),
    gallonsNeeded: roundedGallons,
    estimatedCostLow: round(roundedGallons * COST_PER_GALLON_LOW, 2),
    estimatedCostHigh: round(roundedGallons * COST_PER_GALLON_HIGH, 2),
    estimatedCost: customCostPerGallon
      ? round(roundedGallons * customCostPerGallon, 2)
      : undefined,
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

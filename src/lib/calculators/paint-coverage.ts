export interface PaintCoverageInput {
  roomLength: number; // feet
  roomWidth: number; // feet
  wallHeight: number; // feet
  numberOfDoors: number; // default 1
  numberOfWindows: number; // default 2
  numberOfCoats: number; // default 2
}

export interface PaintCoverageResult {
  totalWallArea: number; // sq ft (before subtracting openings)
  doorArea: number; // sq ft
  windowArea: number; // sq ft
  paintableArea: number; // sq ft
  gallonsNeeded: number;
}

const DOOR_AREA = 21; // sq ft (standard 3x7 door)
const WINDOW_AREA = 15; // sq ft (standard 3x5 window)
const COVERAGE_PER_GALLON = 350; // sq ft

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
  } = input;

  // Perimeter × height = total wall area
  const perimeter = 2 * (roomLength + roomWidth);
  const totalWallArea = perimeter * wallHeight;

  const doorArea = numberOfDoors * DOOR_AREA;
  const windowArea = numberOfWindows * WINDOW_AREA;
  const paintableArea = (totalWallArea - doorArea - windowArea) * numberOfCoats;

  const gallonsNeeded = paintableArea / COVERAGE_PER_GALLON;

  return {
    totalWallArea: round(totalWallArea, 2),
    doorArea: round(doorArea, 2),
    windowArea: round(windowArea, 2),
    paintableArea: round(paintableArea, 2),
    gallonsNeeded: round(Math.ceil(gallonsNeeded * 10) / 10, 1), // round up to nearest 0.1
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

import { describe, it, expect } from "vitest";
import { calculatePaintCoverage } from "./paint-coverage";

describe("calculatePaintCoverage", () => {
  it("calculates a standard 12x12 room, 8ft walls, 1 door, 2 windows, 2 coats", () => {
    const result = calculatePaintCoverage({
      roomLength: 12,
      roomWidth: 12,
      wallHeight: 8,
      numberOfDoors: 1,
      numberOfWindows: 2,
      numberOfCoats: 2,
    });

    // Perimeter = 2 × (12 + 12) = 48 ft
    // Wall area = 48 × 8 = 384 sq ft
    expect(result.totalWallArea).toBe(384);

    // Door area = 1 × 21 = 21 sq ft
    expect(result.doorArea).toBe(21);
    // Window area = 2 × 15 = 30 sq ft
    expect(result.windowArea).toBe(30);

    // Paintable = (384 - 21 - 30) × 2 = 333 × 2 = 666 sq ft
    expect(result.paintableArea).toBe(666);

    // Gallons = 666 / 350 = 1.903 → ceil to nearest 0.1 = 2.0
    expect(result.gallonsNeeded).toBe(2);
  });

  it("handles a room with no doors or windows", () => {
    const result = calculatePaintCoverage({
      roomLength: 10,
      roomWidth: 10,
      wallHeight: 8,
      numberOfDoors: 0,
      numberOfWindows: 0,
      numberOfCoats: 1,
    });

    // Perimeter = 40, area = 320, no subtractions, 1 coat
    expect(result.paintableArea).toBe(320);
    // 320 / 350 = 0.914 → ceil to 1.0
    expect(result.gallonsNeeded).toBe(1);
  });

  it("computes default cost range from gallonsNeeded", () => {
    const result = calculatePaintCoverage({
      roomLength: 12,
      roomWidth: 12,
      wallHeight: 8,
      numberOfDoors: 1,
      numberOfWindows: 2,
      numberOfCoats: 2,
    });

    // 2 gallons needed → $25*2=50, $50*2=100
    expect(result.estimatedCostLow).toBe(result.gallonsNeeded * 25);
    expect(result.estimatedCostHigh).toBe(result.gallonsNeeded * 50);
  });

  it("returns undefined estimatedCost when no custom cost provided", () => {
    const result = calculatePaintCoverage({
      roomLength: 12,
      roomWidth: 12,
      wallHeight: 8,
      numberOfDoors: 1,
      numberOfWindows: 2,
      numberOfCoats: 2,
    });

    expect(result.estimatedCost).toBeUndefined();
    expect(result.estimatedCostLow).toBeGreaterThan(0);
    expect(result.estimatedCostHigh).toBeGreaterThan(0);
  });

  it("calculates estimatedCost as gallonsNeeded × customCostPerGallon", () => {
    const result = calculatePaintCoverage({
      roomLength: 12,
      roomWidth: 12,
      wallHeight: 8,
      numberOfDoors: 1,
      numberOfWindows: 2,
      numberOfCoats: 2,
      customCostPerGallon: 40,
    });

    // 2 gallons * 40 = 80
    expect(result.estimatedCost).toBe(result.gallonsNeeded * 40);
  });

  it("scales with number of coats", () => {
    const oneCoat = calculatePaintCoverage({
      roomLength: 10,
      roomWidth: 10,
      wallHeight: 8,
      numberOfDoors: 0,
      numberOfWindows: 0,
      numberOfCoats: 1,
    });
    const twoCoats = calculatePaintCoverage({
      roomLength: 10,
      roomWidth: 10,
      wallHeight: 8,
      numberOfDoors: 0,
      numberOfWindows: 0,
      numberOfCoats: 2,
    });

    expect(twoCoats.paintableArea).toBe(oneCoat.paintableArea * 2);
  });
});

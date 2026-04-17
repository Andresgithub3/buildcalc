import { describe, it, expect } from "vitest";
import { calculateConcreteSlab } from "./concrete-slab";

describe("calculateConcreteSlab", () => {
  it("calculates a standard 10x10 slab at 4 inches deep with 10% waste", () => {
    const result = calculateConcreteSlab({
      length: 10,
      width: 10,
      depth: 4,
      wastePercent: 10,
    });

    // Volume = 10 * 10 * (4/12) = 33.333 ft³ → × 1.1 = 36.667 ft³
    expect(result.cubicFeet).toBeCloseTo(36.67, 1);
    // 36.667 / 27 = 1.358 yd³
    expect(result.cubicYards).toBeCloseTo(1.36, 1);
    // 36.667 * 0.45 = 16.5 → ceil = 17 bags
    expect(result.bags80lb).toBe(17);
    // 36.667 * 0.6 = 22.0 → ceil = 22 bags
    expect(result.bags60lb).toBe(22);
    // Cost: 1.358 * 125 = 169.75, 1.358 * 175 = 237.65
    expect(result.estimatedCostLow).toBeGreaterThan(0);
    expect(result.estimatedCostHigh).toBeGreaterThan(result.estimatedCostLow);
  });

  it("calculates a 20x20 slab at 6 inches deep with no waste", () => {
    const result = calculateConcreteSlab({
      length: 20,
      width: 20,
      depth: 6,
      wastePercent: 0,
    });

    // Volume = 20 * 20 * (6/12) = 200 ft³
    expect(result.cubicFeet).toBe(200);
    // 200 / 27 = 7.41 yd³
    expect(result.cubicYards).toBeCloseTo(7.41, 1);
    expect(result.bags80lb).toBe(90); // 200 * 0.45 = 90
    expect(result.bags60lb).toBe(120); // 200 * 0.6 = 120
  });

  it("handles zero dimensions", () => {
    const result = calculateConcreteSlab({
      length: 0,
      width: 10,
      depth: 4,
      wastePercent: 10,
    });

    expect(result.cubicFeet).toBe(0);
    expect(result.cubicYards).toBe(0);
    expect(result.bags80lb).toBe(0);
    expect(result.bags60lb).toBe(0);
  });

  it("applies waste factor correctly", () => {
    const noWaste = calculateConcreteSlab({
      length: 10,
      width: 10,
      depth: 4,
      wastePercent: 0,
    });
    const withWaste = calculateConcreteSlab({
      length: 10,
      width: 10,
      depth: 4,
      wastePercent: 15,
    });

    expect(withWaste.cubicFeet).toBeCloseTo(noWaste.cubicFeet * 1.15, 1);
  });
});

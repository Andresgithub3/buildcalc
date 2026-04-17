import { describe, it, expect } from "vitest";
import { calculateConcreteFooting } from "./concrete-footing";

describe("calculateConcreteFooting", () => {
  it("calculates a single footing: 8ft long, 12in wide, 12in deep", () => {
    const result = calculateConcreteFooting({
      length: 8,
      width: 12,
      depth: 12,
      numberOfFootings: 1,
      wastePercent: 0,
    });

    // Per footing: 8 * (12/12) * (12/12) = 8 ft³
    expect(result.perFootingCubicFeet).toBe(8);
    expect(result.totalCubicFeet).toBe(8);
    expect(result.cubicYards).toBeCloseTo(0.3, 1);
  });

  it("calculates multiple footings with waste", () => {
    const result = calculateConcreteFooting({
      length: 4,
      width: 12,
      depth: 8,
      numberOfFootings: 6,
      wastePercent: 10,
    });

    // Per footing: 4 * (12/12) * (8/12) = 4 * 1 * 0.667 = 2.667 ft³
    expect(result.perFootingCubicFeet).toBeCloseTo(2.67, 1);
    // Total: 2.667 * 6 = 16 ft³ → × 1.1 = 17.6 ft³
    expect(result.totalCubicFeet).toBeCloseTo(17.6, 0);
    expect(result.bags80lb).toBeGreaterThan(0);
    expect(result.estimatedCostHigh).toBeGreaterThan(result.estimatedCostLow);
  });

  it("scales linearly with number of footings", () => {
    const one = calculateConcreteFooting({
      length: 4,
      width: 12,
      depth: 12,
      numberOfFootings: 1,
      wastePercent: 0,
    });
    const four = calculateConcreteFooting({
      length: 4,
      width: 12,
      depth: 12,
      numberOfFootings: 4,
      wastePercent: 0,
    });

    expect(four.totalCubicFeet).toBeCloseTo(one.totalCubicFeet * 4, 2);
  });
});

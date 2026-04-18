import { describe, it, expect } from "vitest";
import { calculateGravelAggregate } from "./gravel-aggregate";

describe("calculateGravelAggregate", () => {
  it("calculates gravel for a 20x10 area, 4 inches deep", () => {
    const result = calculateGravelAggregate({
      length: 20,
      width: 10,
      depth: 4,
      materialType: "gravel",
    });

    // Volume = 20 * 10 * (4/12) = 66.67 ft³
    expect(result.cubicFeet).toBeCloseTo(66.67, 1);
    // 66.67 / 27 = 2.469 yd³
    expect(result.cubicYards).toBeCloseTo(2.47, 1);
    // Gravel: 2.469 * 1.4 = 3.457 tons
    expect(result.tons).toBeCloseTo(3.46, 1);
    expect(result.estimatedCostLow).toBeGreaterThan(0);
    expect(result.estimatedCostHigh).toBeGreaterThan(result.estimatedCostLow);
  });

  it("uses correct density for each material type", () => {
    const base = { length: 10, width: 10, depth: 12 }; // 1000/27 = 37.04 yd³... wait
    // 10 * 10 * (12/12) = 100 ft³ = 3.704 yd³
    const gravel = calculateGravelAggregate({ ...base, materialType: "gravel" });
    const crushed = calculateGravelAggregate({ ...base, materialType: "crushed-stone" });
    const pea = calculateGravelAggregate({ ...base, materialType: "pea-gravel" });
    const river = calculateGravelAggregate({ ...base, materialType: "river-rock" });

    // All same volume
    expect(gravel.cubicYards).toBe(crushed.cubicYards);

    // Different tonnage: gravel 1.4, crushed 1.35, pea 1.35, river 1.5
    expect(gravel.tons).toBeCloseTo(3.7 * 1.4, 0);
    expect(crushed.tons).toBeCloseTo(3.7 * 1.35, 0);
    expect(pea.tons).toBeCloseTo(3.7 * 1.35, 0);
    expect(river.tons).toBeCloseTo(3.7 * 1.5, 0);
  });

  it("returns undefined estimatedCost when no custom cost provided", () => {
    const result = calculateGravelAggregate({
      length: 20,
      width: 10,
      depth: 4,
      materialType: "gravel",
    });

    expect(result.estimatedCost).toBeUndefined();
    expect(result.estimatedCostLow).toBeGreaterThan(0);
    expect(result.estimatedCostHigh).toBeGreaterThan(0);
  });

  it("calculates estimatedCost as tons × customCostPerTon", () => {
    const result = calculateGravelAggregate({
      length: 20,
      width: 10,
      depth: 4,
      materialType: "gravel",
      customCostPerTon: 50,
    });

    // 20*10*(4/12) = 66.67 ft³ / 27 = 2.469 yd³ * 1.4 = 3.457 tons * 50 = 172.84
    expect(result.estimatedCost).toBeCloseTo(172.84, 0);
  });

  it("handles zero area", () => {
    const result = calculateGravelAggregate({
      length: 0,
      width: 10,
      depth: 4,
      materialType: "gravel",
    });

    expect(result.cubicFeet).toBe(0);
    expect(result.tons).toBe(0);
  });
});

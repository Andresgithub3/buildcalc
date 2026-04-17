import { describe, it, expect } from "vitest";
import { calculateMulchTopsoil } from "./mulch-topsoil";

describe("calculateMulchTopsoil", () => {
  it("calculates mulch for a 20x10 area, 3 inches deep", () => {
    const result = calculateMulchTopsoil({
      length: 20,
      width: 10,
      depth: 3,
      material: "mulch",
    });

    // Volume = 20 * 10 * (3/12) = 50 ft³
    expect(result.cubicFeet).toBe(50);
    // 50 / 27 = 1.852 yd³
    expect(result.cubicYards).toBeCloseTo(1.85, 1);
    // Bags = ceil(50 / 2) = 25
    expect(result.bags2CuFt).toBe(25);
    // Cost: mulch $25-$50 per yd³
    expect(result.estimatedCostLow).toBeCloseTo(1.85 * 25, 0);
    expect(result.estimatedCostHigh).toBeCloseTo(1.85 * 50, 0);
  });

  it("uses correct cost range for each material", () => {
    const base = { length: 27, width: 1, depth: 12 }; // 27 ft³ = 1 yd³

    const mulch = calculateMulchTopsoil({ ...base, material: "mulch" });
    const topsoil = calculateMulchTopsoil({ ...base, material: "topsoil" });
    const compost = calculateMulchTopsoil({ ...base, material: "compost" });
    const fill = calculateMulchTopsoil({ ...base, material: "fill-dirt" });

    expect(mulch.estimatedCostLow).toBe(25);
    expect(mulch.estimatedCostHigh).toBe(50);
    expect(topsoil.estimatedCostLow).toBe(20);
    expect(topsoil.estimatedCostHigh).toBe(55);
    expect(compost.estimatedCostLow).toBe(30);
    expect(compost.estimatedCostHigh).toBe(60);
    expect(fill.estimatedCostLow).toBe(10);
    expect(fill.estimatedCostHigh).toBe(30);
  });

  it("rounds bags up correctly", () => {
    const result = calculateMulchTopsoil({
      length: 10,
      width: 10,
      depth: 1,
      material: "mulch",
    });

    // 10 * 10 * (1/12) = 8.333 ft³ → ceil(8.333 / 2) = ceil(4.167) = 5 bags
    expect(result.bags2CuFt).toBe(5);
  });
});

import { describe, it, expect } from "vitest";
import { calculateConcreteColumn } from "./concrete-column";

describe("calculateConcreteColumn", () => {
  it("calculates a 12-inch diameter, 4ft high column", () => {
    const result = calculateConcreteColumn({
      diameter: 12,
      height: 4,
      numberOfColumns: 1,
      wastePercent: 0,
    });

    // V = π × 6² × 48 = π × 36 × 48 = 5428.67 in³
    // 5428.67 / 1728 = 3.14159 ft³
    expect(result.perColumnCubicFeet).toBeCloseTo(Math.PI, 1);
    expect(result.cubicYards).toBeCloseTo(Math.PI / 27, 2);
  });

  it("calculates multiple columns with waste", () => {
    const result = calculateConcreteColumn({
      diameter: 8,
      height: 3,
      numberOfColumns: 10,
      wastePercent: 10,
    });

    // Per column: π × 4² × 36 = π × 16 × 36 = 1809.56 in³ = 1.047 ft³
    expect(result.perColumnCubicFeet).toBeCloseTo(1.05, 1);
    // Total with waste: 1.047 * 10 * 1.1 = 11.52 ft³
    expect(result.totalCubicFeet).toBeCloseTo(11.52, 0);
    expect(result.bags80lb).toBeGreaterThan(0);
  });

  it("handles common Sonotube sizes", () => {
    // 10-inch Sonotube, 4ft deep
    const result = calculateConcreteColumn({
      diameter: 10,
      height: 4,
      numberOfColumns: 1,
      wastePercent: 0,
    });

    // V = π × 5² × 48 = π × 25 × 48 = 3769.91 in³ = 2.182 ft³
    expect(result.perColumnCubicFeet).toBeCloseTo(2.18, 1);
  });
});

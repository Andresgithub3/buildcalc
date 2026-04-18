import { describe, it, expect } from "vitest";
import { calculateFenceMaterials } from "./fence-materials";

describe("calculateFenceMaterials", () => {
  it("calculates a basic 100ft wood fence, 6ft tall, 8ft spacing, no gates", () => {
    const result = calculateFenceMaterials({
      totalLength: 100,
      height: 6,
      postSpacing: 8,
      gateCount: 0,
      material: "wood",
    });

    // Sections = ceil(100/8) = 13
    // Posts = 13 + 1 = 14
    expect(result.numberOfPosts).toBe(14);
    // Rails = 13 * 3 (6ft fence has 3 rails) = 39
    expect(result.numberOfRails).toBe(39);
    // Pickets = ceil(100 * 3.2) = 320
    expect(result.numberOfPicketsOrPanels).toBe(320);
    // Concrete = 14 * 2 = 28 bags
    expect(result.bagsOfConcrete).toBe(28);
    // Cost: 100 * $12 to 100 * $25
    expect(result.estimatedCostLow).toBe(1200);
    expect(result.estimatedCostHigh).toBe(2500);
  });

  it("calculates a fence with gates", () => {
    const result = calculateFenceMaterials({
      totalLength: 100,
      height: 6,
      postSpacing: 8,
      gateCount: 2,
      material: "wood",
    });

    // Fenced length = 100 - (2 * 4) = 92 ft
    // Sections = ceil(92/8) = 12
    // Posts = 12 + 1 + (2 * 2) = 17
    expect(result.numberOfPosts).toBe(17);
    // Pickets = ceil(92 * 3.2) = ceil(294.4) = 295
    expect(result.numberOfPicketsOrPanels).toBe(295);
  });

  it("calculates vinyl fence panels", () => {
    const result = calculateFenceMaterials({
      totalLength: 48,
      height: 4,
      postSpacing: 6,
      gateCount: 0,
      material: "vinyl",
    });

    // Sections = ceil(48/6) = 8
    // Posts = 8 + 1 = 9
    expect(result.numberOfPosts).toBe(9);
    // Rails = 8 * 2 (4ft fence has 2 rails) = 16
    expect(result.numberOfRails).toBe(16);
    // Vinyl panels = 8 (one per section)
    expect(result.numberOfPicketsOrPanels).toBe(8);
  });

  it("calculates chain link (rolls)", () => {
    const result = calculateFenceMaterials({
      totalLength: 200,
      height: 4,
      postSpacing: 8,
      gateCount: 1,
      material: "chain-link",
    });

    // Fenced = 200 - 4 = 196 ft
    // Sections = ceil(196/8) = 25
    // Rolls = ceil(196/50) = 4
    expect(result.numberOfPicketsOrPanels).toBe(4);
    // Posts = 25 + 1 + 2 = 28
    expect(result.numberOfPosts).toBe(28);
  });

  it("returns undefined estimatedCost when no custom cost provided", () => {
    const result = calculateFenceMaterials({
      totalLength: 100,
      height: 6,
      postSpacing: 8,
      gateCount: 0,
      material: "wood",
    });

    expect(result.estimatedCost).toBeUndefined();
    expect(result.estimatedCostLow).toBeGreaterThan(0);
    expect(result.estimatedCostHigh).toBeGreaterThan(0);
  });

  it("calculates estimatedCost as totalLength × customCostPerFoot", () => {
    const result = calculateFenceMaterials({
      totalLength: 100,
      height: 6,
      postSpacing: 8,
      gateCount: 0,
      material: "wood",
      customCostPerFoot: 20,
    });

    // 100 * 20 = 2000
    expect(result.estimatedCost).toBe(2000);
  });

  it("handles 8ft tall fence", () => {
    const result = calculateFenceMaterials({
      totalLength: 50,
      height: 8,
      postSpacing: 8,
      gateCount: 0,
      material: "wood",
    });

    // Sections = ceil(50/8) = 7
    // Rails = 7 * 3 (8ft fence also gets 3 rails) = 21
    expect(result.numberOfRails).toBe(21);
  });
});

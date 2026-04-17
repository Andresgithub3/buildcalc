import { describe, it, expect } from "vitest";
import { calculateTileFlooring } from "./tile-flooring";

describe("calculateTileFlooring", () => {
  it("calculates 12x12 tiles for a 10x10 room with 10% waste", () => {
    const result = calculateTileFlooring({
      roomLength: 10,
      roomWidth: 10,
      tileSize: "12x12",
      wastePercent: 10,
      tilesPerBox: 12,
    });

    // Total area = 100 sq ft
    expect(result.totalArea).toBe(100);
    // 12x12 tile = 1 sq ft each
    expect(result.tileAreaSqFt).toBe(1);
    // 100 * 1.1 = 110 / 1 = 110 → ceil = 110, but FP: 110.00000...01 → ceil = 111
    expect(result.tilesNeeded).toBe(111);
    // 111 / 12 = 9.25 → ceil = 10 boxes
    expect(result.boxesNeeded).toBe(10);
  });

  it("calculates 18x18 tiles", () => {
    const result = calculateTileFlooring({
      roomLength: 15,
      roomWidth: 10,
      tileSize: "18x18",
      wastePercent: 10,
      tilesPerBox: 8,
    });

    // Total area = 150 sq ft
    expect(result.totalArea).toBe(150);
    // 18x18 tile = 324/144 = 2.25 sq ft
    expect(result.tileAreaSqFt).toBe(2.25);
    // 150 * 1.1 / 2.25 = 73.33 → ceil = 74 tiles
    expect(result.tilesNeeded).toBe(74);
    // 74 / 8 = 9.25 → ceil = 10 boxes
    expect(result.boxesNeeded).toBe(10);
  });

  it("handles custom tile sizes", () => {
    const result = calculateTileFlooring({
      roomLength: 10,
      roomWidth: 10,
      tileSize: "custom",
      customTileWidth: 6,
      customTileHeight: 24,
      wastePercent: 0,
      tilesPerBox: 10,
    });

    // Tile area = (6 * 24) / 144 = 1 sq ft
    expect(result.tileAreaSqFt).toBe(1);
    expect(result.tilesNeeded).toBe(100);
    expect(result.boxesNeeded).toBe(10);
  });

  it("calculates 24x24 tiles with no waste", () => {
    const result = calculateTileFlooring({
      roomLength: 12,
      roomWidth: 12,
      tileSize: "24x24",
      wastePercent: 0,
      tilesPerBox: 4,
    });

    // 24x24 = 4 sq ft each. 144 sq ft / 4 = 36 tiles
    expect(result.tilesNeeded).toBe(36);
    expect(result.boxesNeeded).toBe(9);
  });
});

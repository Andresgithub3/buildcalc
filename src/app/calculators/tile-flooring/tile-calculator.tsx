"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { TileDiagram } from "./tile-diagram";
import { calculateTileFlooring, type TileSize } from "@/lib/calculators/tile-flooring";
import { TileContent } from "./tile-content";

export function TileCalculator() {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileSize, setTileSize] = useState<TileSize>("12x12");
  const [customTileWidth, setCustomTileWidth] = useState(12);
  const [customTileHeight, setCustomTileHeight] = useState(12);
  const [wastePercent, setWastePercent] = useState(10);
  const [tilesPerBox, setTilesPerBox] = useState(12);

  const result = calculateTileFlooring({
    roomLength,
    roomWidth,
    tileSize,
    customTileWidth,
    customTileHeight,
    wastePercent,
    tilesPerBox,
  });

  return (
    <CalculatorLayout
      slug="tile-flooring"
      title="Tile & Flooring Calculator"
      description="Calculate how many tiles you need for any room. Supports standard and custom tile sizes with waste factor."
      diagram={<TileDiagram roomLength={roomLength} roomWidth={roomWidth} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="roomLength">Room Length (ft)</Label>
            <Input
              id="roomLength"
              type="number"
              min={0}
              step={0.5}
              value={roomLength}
              onChange={(e) => setRoomLength(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roomWidth">Room Width (ft)</Label>
            <Input
              id="roomWidth"
              type="number"
              min={0}
              step={0.5}
              value={roomWidth}
              onChange={(e) => setRoomWidth(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tileSize">Tile Size</Label>
            <select
              id="tileSize"
              value={tileSize}
              onChange={(e) => setTileSize(e.target.value as TileSize)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              <option value="12x12">12″ × 12″</option>
              <option value="18x18">18″ × 18″</option>
              <option value="24x24">24″ × 24″</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tilesPerBox">Tiles per Box</Label>
            <Input
              id="tilesPerBox"
              type="number"
              min={1}
              value={tilesPerBox}
              onChange={(e) => setTilesPerBox(Number(e.target.value))}
            />
          </div>
          {tileSize === "custom" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="customW">Tile Width (in)</Label>
                <Input
                  id="customW"
                  type="number"
                  min={1}
                  value={customTileWidth}
                  onChange={(e) => setCustomTileWidth(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customH">Tile Height (in)</Label>
                <Input
                  id="customH"
                  type="number"
                  min={1}
                  value={customTileHeight}
                  onChange={(e) => setCustomTileHeight(Number(e.target.value))}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="waste">Waste Factor (%)</Label>
            <Input
              id="waste"
              type="number"
              min={0}
              max={50}
              value={wastePercent}
              onChange={(e) => setWastePercent(Number(e.target.value))}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label="Tiles Needed"
            value={result.tilesNeeded}
            unit="tiles"
            highlight
          />
          <ResultRow
            label="Boxes Needed"
            value={result.boxesNeeded}
            unit="boxes"
          />
          <Separator className="my-2" />
          <ResultRow
            label="Total Floor Area"
            value={result.totalArea}
            unit="ft²"
          />
          <ResultRow
            label="Tile Area"
            value={result.tileAreaSqFt}
            unit="ft² each"
          />
        </div>
      }
      supportingContent={<TileContent />}
      relatedCalculators={[
        {
          name: "Paint Coverage",
          href: "/calculators/paint-coverage",
          description: "Calculate how many gallons of paint you need.",
        },
        {
          name: "Gravel & Aggregate",
          href: "/calculators/gravel-and-aggregate",
          description: "Estimate gravel, crushed stone, and river rock.",
        },
        {
          name: "Concrete Slab",
          href: "/calculators/concrete-slab",
          description: "Calculate concrete for slabs, patios, and driveways.",
        },
      ]}
    />
  );
}

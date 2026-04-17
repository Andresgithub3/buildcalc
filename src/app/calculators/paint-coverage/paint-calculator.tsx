"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { PaintDiagram } from "./paint-diagram";
import { calculatePaintCoverage } from "@/lib/calculators/paint-coverage";
import { PaintContent } from "./paint-content";

export function PaintCalculator() {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(8);
  const [numberOfDoors, setNumberOfDoors] = useState(1);
  const [numberOfWindows, setNumberOfWindows] = useState(2);
  const [numberOfCoats, setNumberOfCoats] = useState(2);

  const result = calculatePaintCoverage({
    roomLength,
    roomWidth,
    wallHeight,
    numberOfDoors,
    numberOfWindows,
    numberOfCoats,
  });

  return (
    <CalculatorLayout
      slug="paint-coverage"
      title="Paint Coverage Calculator"
      description="Figure out how many gallons of paint you need for your room. Accounts for doors, windows, and number of coats."
      diagram={
        <PaintDiagram
          roomLength={roomLength}
          roomWidth={roomWidth}
          wallHeight={wallHeight}
        />
      }
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
            <Label htmlFor="wallHeight">Wall Height (ft)</Label>
            <Input
              id="wallHeight"
              type="number"
              min={0}
              step={0.5}
              value={wallHeight}
              onChange={(e) => setWallHeight(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coats">Number of Coats</Label>
            <Input
              id="coats"
              type="number"
              min={1}
              max={4}
              value={numberOfCoats}
              onChange={(e) => setNumberOfCoats(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="doors">Doors</Label>
            <Input
              id="doors"
              type="number"
              min={0}
              max={10}
              value={numberOfDoors}
              onChange={(e) => setNumberOfDoors(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="windows">Windows</Label>
            <Input
              id="windows"
              type="number"
              min={0}
              max={20}
              value={numberOfWindows}
              onChange={(e) => setNumberOfWindows(Number(e.target.value))}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label="Gallons Needed"
            value={result.gallonsNeeded}
            unit="gal"
            highlight
          />
          <Separator className="my-2" />
          <ResultRow
            label="Total Wall Area"
            value={result.totalWallArea}
            unit="ft²"
          />
          <ResultRow
            label="Door Area"
            value={`−${result.doorArea}`}
            unit="ft²"
          />
          <ResultRow
            label="Window Area"
            value={`−${result.windowArea}`}
            unit="ft²"
          />
          <ResultRow
            label="Paintable Area"
            value={result.paintableArea}
            unit="ft²"
          />
        </div>
      }
      supportingContent={<PaintContent />}
      relatedCalculators={[
        {
          name: "Tile & Flooring",
          href: "/calculators/tile-flooring",
          description: "Calculate tiles needed for any room size.",
        },
        {
          name: "Mulch & Topsoil",
          href: "/calculators/mulch-and-topsoil",
          description: "Estimate bags or yards of mulch, topsoil, or compost.",
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

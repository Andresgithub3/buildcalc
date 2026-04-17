"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { FootingDiagram } from "./footing-diagram";
import { calculateConcreteFooting } from "@/lib/calculators/concrete-footing";
import { FootingContent } from "./footing-content";

export function FootingCalculator() {
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(12);
  const [depth, setDepth] = useState(12);
  const [numberOfFootings, setNumberOfFootings] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);

  const result = calculateConcreteFooting({
    length,
    width,
    depth,
    numberOfFootings,
    wastePercent,
  });

  return (
    <CalculatorLayout
      slug="concrete-footing"
      title="Concrete Footing Calculator"
      description="Calculate how much concrete you need for deck footings, pier foundations, and continuous footings."
      diagram={<FootingDiagram length={length} width={width} depth={depth} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="length">Footing Length (ft)</Label>
            <Input
              id="length"
              type="number"
              min={0}
              step={0.5}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (in)</Label>
            <Input
              id="width"
              type="number"
              min={0}
              step={1}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="depth">Depth (in)</Label>
            <Input
              id="depth"
              type="number"
              min={0}
              step={1}
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">Number of Footings</Label>
            <Input
              id="count"
              type="number"
              min={1}
              step={1}
              value={numberOfFootings}
              onChange={(e) => setNumberOfFootings(Number(e.target.value))}
            />
          </div>
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
            label="Total Cubic Yards"
            value={result.cubicYards}
            unit="yd³"
            highlight
          />
          <ResultRow
            label="Per Footing"
            value={result.perFootingCubicFeet}
            unit="ft³"
          />
          <ResultRow label="Total Cubic Feet" value={result.totalCubicFeet} unit="ft³" />
          <Separator className="my-2" />
          <ResultRow label="80 lb Bags" value={result.bags80lb} unit="bags" />
          <ResultRow label="60 lb Bags" value={result.bags60lb} unit="bags" />
          <Separator className="my-2" />
          <ResultRow
            label="Estimated Cost"
            value={`$${result.estimatedCostLow.toLocaleString()} – $${result.estimatedCostHigh.toLocaleString()}`}
          />
        </div>
      }
      supportingContent={<FootingContent />}
      relatedCalculators={[
        {
          name: "Concrete Slab",
          href: "/calculators/concrete-slab",
          description: "Calculate concrete for slabs, patios, and driveways.",
        },
        {
          name: "Concrete Column",
          href: "/calculators/concrete-column",
          description: "Estimate concrete for Sonotubes and round post holes.",
        },
        {
          name: "Fence Materials",
          href: "/calculators/fence-materials",
          description: "Estimate posts, rails, pickets, and concrete for fences.",
        },
      ]}
    />
  );
}

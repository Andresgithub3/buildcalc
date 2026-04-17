"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { SlabDiagram } from "./slab-diagram";
import { calculateConcreteSlab } from "@/lib/calculators/concrete-slab";
import { SlabContent } from "./slab-content";

export function SlabCalculator() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);

  const result = calculateConcreteSlab({ length, width, depth, wastePercent });

  return (
    <CalculatorLayout
      slug="concrete-slab"
      title="Concrete Slab Calculator"
      description="Calculate how much concrete you need for a slab, patio, or driveway. Get results in cubic yards, bags, and estimated cost."
      diagram={<SlabDiagram length={length} width={width} depth={depth} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="length">Length (ft)</Label>
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
            <Label htmlFor="width">Width (ft)</Label>
            <Input
              id="width"
              type="number"
              min={0}
              step={0.5}
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
              step={0.5}
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
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
            label="Cubic Yards"
            value={result.cubicYards}
            unit="yd³"
            highlight
          />
          <ResultRow label="Cubic Feet" value={result.cubicFeet} unit="ft³" />
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
      supportingContent={<SlabContent />}
      relatedCalculators={[
        {
          name: "Concrete Footing",
          href: "/calculators/concrete-footing",
          description:
            "Calculate concrete for deck footings and pier foundations.",
        },
        {
          name: "Concrete Column",
          href: "/calculators/concrete-column",
          description:
            "Estimate concrete for Sonotubes and round post holes.",
        },
        {
          name: "Gravel & Aggregate",
          href: "/calculators/gravel-and-aggregate",
          description:
            "Calculate gravel, crushed stone, and river rock by the ton.",
        },
      ]}
    />
  );
}

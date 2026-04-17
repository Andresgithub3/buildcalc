"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { GravelDiagram } from "./gravel-diagram";
import {
  calculateGravelAggregate,
  type MaterialType,
} from "@/lib/calculators/gravel-aggregate";
import { GravelContent } from "./gravel-content";

const MATERIAL_LABELS: Record<MaterialType, string> = {
  gravel: "Gravel",
  "crushed-stone": "Crushed Stone",
  "pea-gravel": "Pea Gravel",
  "river-rock": "River Rock",
};

export function GravelCalculator() {
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(4);
  const [materialType, setMaterialType] = useState<MaterialType>("gravel");

  const result = calculateGravelAggregate({ length, width, depth, materialType });

  return (
    <CalculatorLayout
      slug="gravel-and-aggregate"
      title="Gravel & Aggregate Calculator"
      description="Calculate how much gravel, crushed stone, pea gravel, or river rock you need in cubic yards and tons."
      diagram={<GravelDiagram length={length} width={width} depth={depth} />}
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
            <Label htmlFor="material">Material Type</Label>
            <select
              id="material"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value as MaterialType)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              {Object.entries(MATERIAL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
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
          <ResultRow label="Tons" value={result.tons} unit="tons" highlight />
          <Separator className="my-2" />
          <ResultRow label="Cubic Feet" value={result.cubicFeet} unit="ft³" />
          <Separator className="my-2" />
          <ResultRow
            label="Estimated Cost"
            value={`$${result.estimatedCostLow.toLocaleString()} – $${result.estimatedCostHigh.toLocaleString()}`}
          />
        </div>
      }
      supportingContent={<GravelContent />}
      relatedCalculators={[
        {
          name: "Mulch & Topsoil",
          href: "/calculators/mulch-and-topsoil",
          description: "Calculate bags or yards of mulch, topsoil, or compost.",
        },
        {
          name: "Concrete Slab",
          href: "/calculators/concrete-slab",
          description: "Calculate concrete for slabs, patios, and driveways.",
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

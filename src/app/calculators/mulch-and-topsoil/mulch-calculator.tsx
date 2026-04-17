"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { MulchDiagram } from "./mulch-diagram";
import {
  calculateMulchTopsoil,
  type MulchMaterial,
} from "@/lib/calculators/mulch-topsoil";
import { MulchContent } from "./mulch-content";

const MATERIAL_LABELS: Record<MulchMaterial, string> = {
  mulch: "Mulch",
  topsoil: "Topsoil",
  compost: "Compost",
  "fill-dirt": "Fill Dirt",
};

export function MulchCalculator() {
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(3);
  const [material, setMaterial] = useState<MulchMaterial>("mulch");

  const result = calculateMulchTopsoil({ length, width, depth, material });

  return (
    <CalculatorLayout
      slug="mulch-and-topsoil"
      title="Mulch & Topsoil Calculator"
      description="Calculate how much mulch, topsoil, compost, or fill dirt you need in cubic yards or bags."
      diagram={<MulchDiagram length={length} width={width} depth={depth} />}
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
            <Label htmlFor="material">Material</Label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value as MulchMaterial)}
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
          <ResultRow
            label="2 cu ft Bags"
            value={result.bags2CuFt}
            unit="bags"
            highlight
          />
          <Separator className="my-2" />
          <ResultRow label="Cubic Feet" value={result.cubicFeet} unit="ft³" />
          <Separator className="my-2" />
          <ResultRow
            label="Estimated Cost"
            value={`$${result.estimatedCostLow.toLocaleString()} – $${result.estimatedCostHigh.toLocaleString()}`}
          />
        </div>
      }
      supportingContent={<MulchContent />}
      relatedCalculators={[
        {
          name: "Gravel & Aggregate",
          href: "/calculators/gravel-and-aggregate",
          description: "Estimate gravel, crushed stone, and river rock by the ton.",
        },
        {
          name: "Tile & Flooring",
          href: "/calculators/tile-flooring",
          description: "Calculate tiles needed for any room size.",
        },
        {
          name: "Paint Coverage",
          href: "/calculators/paint-coverage",
          description: "Calculate how many gallons of paint you need.",
        },
      ]}
    />
  );
}

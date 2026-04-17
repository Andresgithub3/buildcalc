"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { FenceDiagram } from "./fence-diagram";
import {
  calculateFenceMaterials,
  type FenceHeight,
  type PostSpacing,
  type FenceMaterial,
} from "@/lib/calculators/fence-materials";
import { FenceContent } from "./fence-content";

export function FenceCalculator() {
  const [totalLength, setTotalLength] = useState(100);
  const [height, setHeight] = useState<FenceHeight>(6);
  const [postSpacing, setPostSpacing] = useState<PostSpacing>(8);
  const [gateCount, setGateCount] = useState(1);
  const [material, setMaterial] = useState<FenceMaterial>("wood");

  const result = calculateFenceMaterials({
    totalLength,
    height,
    postSpacing,
    gateCount,
    material,
  });

  const picketLabel =
    material === "wood"
      ? "Pickets"
      : material === "vinyl"
        ? "Panels"
        : "Chain Link Rolls (50ft)";

  return (
    <CalculatorLayout
      slug="fence-materials"
      title="Fence Materials Estimator"
      description="Estimate posts, rails, pickets, panels, and concrete for wood, vinyl, or chain-link fences."
      diagram={<FenceDiagram height={height} postSpacing={postSpacing} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="totalLength">Total Fence Length (ft)</Label>
            <Input
              id="totalLength"
              type="number"
              min={0}
              step={1}
              value={totalLength}
              onChange={(e) => setTotalLength(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Fence Height</Label>
            <select
              id="height"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) as FenceHeight)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              <option value={4}>4 ft</option>
              <option value={6}>6 ft</option>
              <option value={8}>8 ft</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="postSpacing">Post Spacing</Label>
            <select
              id="postSpacing"
              value={postSpacing}
              onChange={(e) =>
                setPostSpacing(Number(e.target.value) as PostSpacing)
              }
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              <option value={6}>6 ft</option>
              <option value={8}>8 ft</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value as FenceMaterial)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              <option value="wood">Wood</option>
              <option value="vinyl">Vinyl</option>
              <option value="chain-link">Chain Link</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gates">Number of Gates</Label>
            <Input
              id="gates"
              type="number"
              min={0}
              max={10}
              value={gateCount}
              onChange={(e) => setGateCount(Number(e.target.value))}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label="Posts"
            value={result.numberOfPosts}
            unit="posts"
            highlight
          />
          <ResultRow
            label="Rails"
            value={result.numberOfRails}
            unit="rails"
          />
          <ResultRow
            label={picketLabel}
            value={result.numberOfPicketsOrPanels}
          />
          <Separator className="my-2" />
          <ResultRow
            label="Concrete (80lb bags)"
            value={result.bagsOfConcrete}
            unit="bags"
          />
          <Separator className="my-2" />
          <ResultRow
            label="Estimated Cost"
            value={`$${result.estimatedCostLow.toLocaleString()} – $${result.estimatedCostHigh.toLocaleString()}`}
          />
        </div>
      }
      supportingContent={<FenceContent />}
      relatedCalculators={[
        {
          name: "Concrete Footing",
          href: "/calculators/concrete-footing",
          description: "Calculate concrete for deck footings and foundations.",
        },
        {
          name: "Concrete Column",
          href: "/calculators/concrete-column",
          description: "Estimate concrete for Sonotubes and post holes.",
        },
        {
          name: "Gravel & Aggregate",
          href: "/calculators/gravel-and-aggregate",
          description: "Calculate gravel and crushed stone by the ton.",
        },
      ]}
    />
  );
}

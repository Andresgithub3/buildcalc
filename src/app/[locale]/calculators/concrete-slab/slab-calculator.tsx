"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { SlabDiagram } from "./slab-diagram";
import { calculateConcreteSlab } from "@/lib/calculators/concrete-slab";
import { SlabContent } from "./slab-content";
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function SlabCalculator() {
  const t = useTranslations("slab");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);
  const [customCost, setCustomCost] = useState("");

  const result = calculateConcreteSlab({
    length,
    width,
    depth,
    wastePercent,
    customCostPerYard: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="concrete-slab"
      title={t("title")}
      description={t("description")}
      diagram={<SlabDiagram length={length} width={width} depth={depth} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="length">{tc("lengthFt")}</Label>
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
            <Label htmlFor="width">{tc("widthFt")}</Label>
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
            <Label htmlFor="depth">{tc("depthIn")}</Label>
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
            <Label htmlFor="waste">{tc("wasteFactor")}</Label>
            <Input
              id="waste"
              type="number"
              min={0}
              max={50}
              value={wastePercent}
              onChange={(e) => setWastePercent(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customCost">{tc("costPerYard")}</Label>
            <Input
              id="customCost"
              type="number"
              min={0}
              step={1}
              placeholder="$125 – $175"
              value={customCost}
              onChange={(e) => setCustomCost(e.target.value)}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label={tc("cubicYards")}
            value={result.cubicYards}
            unit="yd³"
            highlight
          />
          <ResultRow label={tc("cubicFeet")} value={result.cubicFeet} unit="ft³" />
          <Separator className="my-2" />
          <ResultRow label={tc("bags80lb")} value={result.bags80lb} unit="bags" />
          <ResultRow label={tc("bags60lb")} value={result.bags60lb} unit="bags" />
          <Separator className="my-2" />
          <ResultRow
            label={tc("estimatedCost")}
            value={
              result.estimatedCost != null
                ? `$${result.estimatedCost.toLocaleString()}`
                : `$${result.estimatedCostLow.toLocaleString()} – $${result.estimatedCostHigh.toLocaleString()}`
            }
          />
          <CostDisclaimer />
        </div>
      }
      supportingContent={<SlabContent />}
      relatedCalculators={[
        {
          name: th("calculators.concrete-footing.shortName"),
          href: "/calculators/concrete-footing",
          description: t("related.footing"),
        },
        {
          name: th("calculators.concrete-column.shortName"),
          href: "/calculators/concrete-column",
          description: t("related.column"),
        },
        {
          name: th("calculators.gravel-and-aggregate.shortName"),
          href: "/calculators/gravel-and-aggregate",
          description: t("related.gravel"),
        },
      ]}
    />
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { FootingDiagram } from "./footing-diagram";
import { calculateConcreteFooting } from "@/lib/calculators/concrete-footing";
import { FootingContent } from "./footing-content";
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function FootingCalculator() {
  const t = useTranslations("footing");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(12);
  const [depth, setDepth] = useState(12);
  const [numberOfFootings, setNumberOfFootings] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);
  const [customCost, setCustomCost] = useState("");

  const result = calculateConcreteFooting({
    length,
    width,
    depth,
    numberOfFootings,
    wastePercent,
    customCostPerYard: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="concrete-footing"
      title={t("title")}
      description={t("description")}
      diagram={<FootingDiagram length={length} width={width} depth={depth} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="length">{t("footingLengthFt")}</Label>
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
            <Label htmlFor="width">{t("widthIn")}</Label>
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
            <Label htmlFor="depth">{tc("depthIn")}</Label>
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
            <Label htmlFor="count">{t("numberOfFootings")}</Label>
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
            label={t("totalCubicYards")}
            value={result.cubicYards}
            unit="yd³"
            highlight
          />
          <ResultRow
            label={t("perFooting")}
            value={result.perFootingCubicFeet}
            unit="ft³"
          />
          <ResultRow label={t("totalCubicFeet")} value={result.totalCubicFeet} unit="ft³" />
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
      supportingContent={<FootingContent />}
      relatedCalculators={[
        {
          name: th("calculators.concrete-slab.shortName"),
          href: "/calculators/concrete-slab",
          description: t("related.slab"),
        },
        {
          name: th("calculators.concrete-column.shortName"),
          href: "/calculators/concrete-column",
          description: t("related.column"),
        },
        {
          name: th("calculators.fence-materials.shortName"),
          href: "/calculators/fence-materials",
          description: t("related.fence"),
        },
      ]}
    />
  );
}

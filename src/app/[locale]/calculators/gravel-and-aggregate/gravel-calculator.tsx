"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function GravelCalculator() {
  const t = useTranslations("gravel");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");

  const materialLabels: Record<MaterialType, string> = {
    gravel: t("materials.gravel"),
    "crushed-stone": t("materials.crushed-stone"),
    "pea-gravel": t("materials.pea-gravel"),
    "river-rock": t("materials.river-rock"),
  };
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(4);
  const [materialType, setMaterialType] = useState<MaterialType>("gravel");
  const [customCost, setCustomCost] = useState("");

  const result = calculateGravelAggregate({
    length,
    width,
    depth,
    materialType,
    customCostPerTon: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="gravel-and-aggregate"
      title={t("title")}
      description={t("description")}
      diagram={<GravelDiagram length={length} width={width} depth={depth} />}
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
            <Label htmlFor="material">{t("materialType")}</Label>
            <select
              id="material"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value as MaterialType)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              {Object.entries(materialLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customCost">{tc("costPerTon")}</Label>
            <Input
              id="customCost"
              type="number"
              min={0}
              step={1}
              placeholder="$30 – $65"
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
          <ResultRow label={t("tons")} value={result.tons} unit="tons" highlight />
          <Separator className="my-2" />
          <ResultRow label={tc("cubicFeet")} value={result.cubicFeet} unit="ft³" />
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
      supportingContent={<GravelContent />}
      relatedCalculators={[
        {
          name: th("calculators.mulch-and-topsoil.shortName"),
          href: "/calculators/mulch-and-topsoil",
          description: t("related.mulch"),
        },
        {
          name: th("calculators.concrete-slab.shortName"),
          href: "/calculators/concrete-slab",
          description: t("related.slab"),
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

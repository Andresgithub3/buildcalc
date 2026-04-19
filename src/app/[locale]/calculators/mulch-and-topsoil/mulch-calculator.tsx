"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function MulchCalculator() {
  const t = useTranslations("mulch");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");

  const materialLabels: Record<MulchMaterial, string> = {
    mulch: t("materials.mulch"),
    topsoil: t("materials.topsoil"),
    compost: t("materials.compost"),
    "fill-dirt": t("materials.fill-dirt"),
  };
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(3);
  const [material, setMaterial] = useState<MulchMaterial>("mulch");
  const [customCost, setCustomCost] = useState("");

  const result = calculateMulchTopsoil({
    length,
    width,
    depth,
    material,
    customCostPerYard: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="mulch-and-topsoil"
      title={t("title")}
      description={t("description")}
      diagram={<MulchDiagram length={length} width={width} depth={depth} />}
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
            <Label htmlFor="material">{t("material")}</Label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value as MulchMaterial)}
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
            <Label htmlFor="customCost">{tc("costPerYard")}</Label>
            <Input
              id="customCost"
              type="number"
              min={0}
              step={1}
              placeholder="$10 – $60"
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
          <ResultRow
            label={t("bags2CuFt")}
            value={result.bags2CuFt}
            unit="bags"
            highlight
          />
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
      supportingContent={<MulchContent />}
      relatedCalculators={[
        {
          name: th("calculators.gravel-and-aggregate.shortName"),
          href: "/calculators/gravel-and-aggregate",
          description: t("related.gravel"),
        },
        {
          name: th("calculators.tile-flooring.shortName"),
          href: "/calculators/tile-flooring",
          description: t("related.tile"),
        },
        {
          name: th("calculators.paint-coverage.shortName"),
          href: "/calculators/paint-coverage",
          description: t("related.paint"),
        },
      ]}
    />
  );
}

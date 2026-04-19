"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { ColumnDiagram } from "./column-diagram";
import { calculateConcreteColumn } from "@/lib/calculators/concrete-column";
import { ColumnContent } from "./column-content";
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function ColumnCalculator() {
  const t = useTranslations("column");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");
  const [diameter, setDiameter] = useState(12);
  const [height, setHeight] = useState(4);
  const [numberOfColumns, setNumberOfColumns] = useState(4);
  const [wastePercent, setWastePercent] = useState(10);
  const [customCost, setCustomCost] = useState("");

  const result = calculateConcreteColumn({
    diameter,
    height,
    numberOfColumns,
    wastePercent,
    customCostPerYard: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="concrete-column"
      title={t("title")}
      description={t("description")}
      diagram={<ColumnDiagram diameter={diameter} height={height} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="diameter">{t("diameterIn")}</Label>
            <Input
              id="diameter"
              type="number"
              min={0}
              step={1}
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">{t("heightFt")}</Label>
            <Input
              id="height"
              type="number"
              min={0}
              step={0.5}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">{t("numberOfColumns")}</Label>
            <Input
              id="count"
              type="number"
              min={1}
              step={1}
              value={numberOfColumns}
              onChange={(e) => setNumberOfColumns(Number(e.target.value))}
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
            label={t("perColumn")}
            value={result.perColumnCubicFeet}
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
      supportingContent={<ColumnContent />}
      relatedCalculators={[
        {
          name: th("calculators.concrete-slab.shortName"),
          href: "/calculators/concrete-slab",
          description: t("related.slab"),
        },
        {
          name: th("calculators.concrete-footing.shortName"),
          href: "/calculators/concrete-footing",
          description: t("related.footing"),
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

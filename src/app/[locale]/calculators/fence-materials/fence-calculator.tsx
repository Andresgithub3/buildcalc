"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function FenceCalculator() {
  const t = useTranslations("fence");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");
  const [totalLength, setTotalLength] = useState(100);
  const [height, setHeight] = useState<FenceHeight>(6);
  const [postSpacing, setPostSpacing] = useState<PostSpacing>(8);
  const [gateCount, setGateCount] = useState(1);
  const [material, setMaterial] = useState<FenceMaterial>("wood");
  const [customCost, setCustomCost] = useState("");

  const result = calculateFenceMaterials({
    totalLength,
    height,
    postSpacing,
    gateCount,
    material,
    customCostPerFoot: customCost ? Number(customCost) : undefined,
  });

  const picketLabel =
    material === "wood"
      ? t("pickets")
      : material === "vinyl"
        ? t("panels")
        : t("chainLinkRolls");

  return (
    <CalculatorLayout
      slug="fence-materials"
      title={t("title")}
      description={t("description")}
      diagram={<FenceDiagram height={height} postSpacing={postSpacing} />}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="totalLength">{t("totalFenceLengthFt")}</Label>
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
            <Label htmlFor="height">{t("fenceHeight")}</Label>
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
            <Label htmlFor="postSpacing">{t("postSpacing")}</Label>
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
            <Label htmlFor="material">{t("materialLabel")}</Label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value as FenceMaterial)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              <option value="wood">{t("materials.wood")}</option>
              <option value="vinyl">{t("materials.vinyl")}</option>
              <option value="chain-link">{t("materials.chain-link")}</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gates">{t("numberOfGates")}</Label>
            <Input
              id="gates"
              type="number"
              min={0}
              max={10}
              value={gateCount}
              onChange={(e) => setGateCount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customCost">{tc("costPerFoot")}</Label>
            <Input
              id="customCost"
              type="number"
              min={0}
              step={1}
              placeholder="$8 – $40"
              value={customCost}
              onChange={(e) => setCustomCost(e.target.value)}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label={t("posts")}
            value={result.numberOfPosts}
            unit="posts"
            highlight
          />
          <ResultRow
            label={t("rails")}
            value={result.numberOfRails}
            unit="rails"
          />
          <ResultRow
            label={picketLabel}
            value={result.numberOfPicketsOrPanels}
          />
          <Separator className="my-2" />
          <ResultRow
            label={t("concrete80lbBags")}
            value={result.bagsOfConcrete}
            unit="bags"
          />
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
      supportingContent={<FenceContent />}
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

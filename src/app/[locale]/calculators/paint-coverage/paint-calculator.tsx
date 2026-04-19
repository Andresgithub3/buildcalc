"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { PaintDiagram } from "./paint-diagram";
import { calculatePaintCoverage } from "@/lib/calculators/paint-coverage";
import { PaintContent } from "./paint-content";
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function PaintCalculator() {
  const t = useTranslations("paint");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(12);
  const [wallHeight, setWallHeight] = useState(8);
  const [numberOfDoors, setNumberOfDoors] = useState(1);
  const [numberOfWindows, setNumberOfWindows] = useState(2);
  const [numberOfCoats, setNumberOfCoats] = useState(2);
  const [customCost, setCustomCost] = useState("");

  const result = calculatePaintCoverage({
    roomLength,
    roomWidth,
    wallHeight,
    numberOfDoors,
    numberOfWindows,
    numberOfCoats,
    customCostPerGallon: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="paint-coverage"
      title={t("title")}
      description={t("description")}
      diagram={
        <PaintDiagram
          roomLength={roomLength}
          roomWidth={roomWidth}
          wallHeight={wallHeight}
        />
      }
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="roomLength">{t("roomLengthFt")}</Label>
            <Input
              id="roomLength"
              type="number"
              min={0}
              step={0.5}
              value={roomLength}
              onChange={(e) => setRoomLength(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roomWidth">{t("roomWidthFt")}</Label>
            <Input
              id="roomWidth"
              type="number"
              min={0}
              step={0.5}
              value={roomWidth}
              onChange={(e) => setRoomWidth(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallHeight">{t("wallHeightFt")}</Label>
            <Input
              id="wallHeight"
              type="number"
              min={0}
              step={0.5}
              value={wallHeight}
              onChange={(e) => setWallHeight(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coats">{t("numberOfCoats")}</Label>
            <Input
              id="coats"
              type="number"
              min={1}
              max={4}
              value={numberOfCoats}
              onChange={(e) => setNumberOfCoats(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="doors">{t("doors")}</Label>
            <Input
              id="doors"
              type="number"
              min={0}
              max={10}
              value={numberOfDoors}
              onChange={(e) => setNumberOfDoors(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="windows">{t("windows")}</Label>
            <Input
              id="windows"
              type="number"
              min={0}
              max={20}
              value={numberOfWindows}
              onChange={(e) => setNumberOfWindows(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="customCost">{tc("costPerGallon")}</Label>
            <Input
              id="customCost"
              type="number"
              min={0}
              step={1}
              placeholder="$25 – $50"
              value={customCost}
              onChange={(e) => setCustomCost(e.target.value)}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label={t("gallonsNeeded")}
            value={result.gallonsNeeded}
            unit="gal"
            highlight
          />
          <Separator className="my-2" />
          <ResultRow
            label={t("totalWallArea")}
            value={result.totalWallArea}
            unit="ft²"
          />
          <ResultRow
            label={t("doorArea")}
            value={`−${result.doorArea}`}
            unit="ft²"
          />
          <ResultRow
            label={t("windowArea")}
            value={`−${result.windowArea}`}
            unit="ft²"
          />
          <ResultRow
            label={t("paintableArea")}
            value={result.paintableArea}
            unit="ft²"
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
      supportingContent={<PaintContent />}
      relatedCalculators={[
        {
          name: th("calculators.tile-flooring.shortName"),
          href: "/calculators/tile-flooring",
          description: t("related.tile"),
        },
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
      ]}
    />
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalculatorLayout } from "@/components/calculator-layout";
import { ResultRow } from "@/components/result-row";
import { TileDiagram } from "./tile-diagram";
import { calculateTileFlooring, type TileSize } from "@/lib/calculators/tile-flooring";
import { TileContent } from "./tile-content";
import { CostDisclaimer } from "@/components/cost-disclaimer";

export function TileCalculator() {
  const t = useTranslations("tile");
  const tc = useTranslations("calculator");
  const th = useTranslations("home");
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileSize, setTileSize] = useState<TileSize>("12x12");
  const [customTileWidth, setCustomTileWidth] = useState(12);
  const [customTileHeight, setCustomTileHeight] = useState(12);
  const [wastePercent, setWastePercent] = useState(10);
  const [tilesPerBox, setTilesPerBox] = useState(12);
  const [customCost, setCustomCost] = useState("");

  const result = calculateTileFlooring({
    roomLength,
    roomWidth,
    tileSize,
    customTileWidth,
    customTileHeight,
    wastePercent,
    tilesPerBox,
    customCostPerBox: customCost ? Number(customCost) : undefined,
  });

  return (
    <CalculatorLayout
      slug="tile-flooring"
      title={t("title")}
      description={t("description")}
      diagram={<TileDiagram roomLength={roomLength} roomWidth={roomWidth} />}
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
            <Label htmlFor="tileSize">{t("tileSize")}</Label>
            <select
              id="tileSize"
              value={tileSize}
              onChange={(e) => setTileSize(e.target.value as TileSize)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              <option value="12x12">{t("tileSizeOptions.12x12")}</option>
              <option value="18x18">{t("tileSizeOptions.18x18")}</option>
              <option value="24x24">{t("tileSizeOptions.24x24")}</option>
              <option value="custom">{t("tileSizeOptions.custom")}</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tilesPerBox">{t("tilesPerBox")}</Label>
            <Input
              id="tilesPerBox"
              type="number"
              min={1}
              value={tilesPerBox}
              onChange={(e) => setTilesPerBox(Number(e.target.value))}
            />
          </div>
          {tileSize === "custom" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="customW">{t("tileWidthIn")}</Label>
                <Input
                  id="customW"
                  type="number"
                  min={1}
                  value={customTileWidth}
                  onChange={(e) => setCustomTileWidth(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customH">{t("tileHeightIn")}</Label>
                <Input
                  id="customH"
                  type="number"
                  min={1}
                  value={customTileHeight}
                  onChange={(e) => setCustomTileHeight(Number(e.target.value))}
                />
              </div>
            </>
          )}
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
            <Label htmlFor="customCost">{tc("costPerBox")}</Label>
            <Input
              id="customCost"
              type="number"
              min={0}
              step={1}
              placeholder="$25 – $75"
              value={customCost}
              onChange={(e) => setCustomCost(e.target.value)}
            />
          </div>
        </div>
      }
      results={
        <div className="space-y-1">
          <ResultRow
            label={t("tilesNeeded")}
            value={result.tilesNeeded}
            unit="tiles"
            highlight
          />
          <ResultRow
            label={t("boxesNeeded")}
            value={result.boxesNeeded}
            unit="boxes"
          />
          <Separator className="my-2" />
          <ResultRow
            label={t("totalFloorArea")}
            value={result.totalArea}
            unit="ft²"
          />
          <ResultRow
            label={t("tileArea")}
            value={result.tileAreaSqFt}
            unit="ft² each"
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
      supportingContent={<TileContent />}
      relatedCalculators={[
        {
          name: th("calculators.paint-coverage.shortName"),
          href: "/calculators/paint-coverage",
          description: t("related.paint"),
        },
        {
          name: th("calculators.gravel-and-aggregate.shortName"),
          href: "/calculators/gravel-and-aggregate",
          description: t("related.gravel"),
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

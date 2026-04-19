"use client";

import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { AdSlotInArticle, AdSlotSidebar } from "@/components/ads/ad-slot";
import { AffiliateLinks } from "@/components/affiliate-links";

export interface RelatedCalculator {
  name: string;
  href: string;
  description: string;
}

interface CalculatorLayoutProps {
  slug: string;
  title: string;
  description: string;
  diagram?: ReactNode;
  inputs: ReactNode;
  results: ReactNode;
  supportingContent?: ReactNode;
  relatedCalculators?: RelatedCalculator[];
  jsonLd?: Record<string, unknown>;
}

export function CalculatorLayout({
  slug,
  title,
  description,
  diagram,
  inputs,
  results,
  supportingContent,
  relatedCalculators,
  jsonLd,
}: CalculatorLayoutProps) {
  const t = useTranslations("calculator");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {t("freeCalculator")}
          </Badge>
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1.5 text-muted-foreground">{description}</p>
      </div>

      {/* Diagram */}
      {diagram && (
        <div className="mb-6 flex justify-center">
          {diagram}
        </div>
      )}

      {/* Calculator: Inputs + Results + Content */}
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        {/* Input Form */}
        <Card className="order-1">
          <CardHeader className="pb-4">
            <CardTitle>{t("inputDimensions")}</CardTitle>
          </CardHeader>
          <CardContent>{inputs}</CardContent>
        </Card>

        {/* Results + Sidebar — order-2 on mobile so it sits right after inputs */}
        <div className="order-2 space-y-4 lg:row-span-2 lg:sticky lg:top-4 lg:self-start">
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardHeader className="pb-4">
              <CardTitle>{t("results")}</CardTitle>
            </CardHeader>
            <CardContent>{results}</CardContent>
          </Card>

          <AffiliateLinks calculatorSlug={slug} />
          <AdSlotSidebar />
        </div>

        {/* Supporting Content + Related — order-3 on mobile, below results */}
        <div className="order-3 min-w-0">
          {/* In-article Ad */}
          <AdSlotInArticle />

          {/* Supporting Content */}
          {supportingContent && (
            <div className="mt-6 max-w-none">
              {supportingContent}
            </div>
          )}

          {/* Related Calculators */}
          {relatedCalculators && relatedCalculators.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold mb-3">
                {t("relatedCalculators")}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedCalculators.map((calc) => (
                  <Link key={calc.href} href={calc.href} className="group">
                    <Card className="h-full transition-colors group-hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center justify-between">
                          {calc.name}
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {calc.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

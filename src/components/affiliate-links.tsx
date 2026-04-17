"use client";

import { ExternalLink } from "lucide-react";
import affiliatesData from "../../content/affiliates.json";

type AffiliateSlug = keyof typeof affiliatesData;

interface AffiliateLinkItem {
  name: string;
  url: string;
  category: string;
}

interface AffiliateLinksProps {
  calculatorSlug: string;
}

export function AffiliateLinks({ calculatorSlug }: AffiliateLinksProps) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "buildcalc-20";
  const items = (affiliatesData[calculatorSlug as AffiliateSlug] ?? []) as AffiliateLinkItem[];

  if (items.length === 0) return null;

  return (
    <div className="mt-8 rounded-lg border bg-card p-4">
      <h3 className="font-heading text-sm font-semibold mb-3">
        Recommended Tools &amp; Materials
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.url.replace("AFFILIATE_TAG", tag)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              <span>{item.name}</span>
              <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                {item.category}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[10px] text-muted-foreground/60">
        As an Amazon Associate, BuildCalc earns from qualifying purchases.
      </p>
    </div>
  );
}

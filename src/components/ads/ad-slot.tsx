"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  format?: "auto" | "fluid" | "rectangle";
  layout?: string;
  className?: string;
}

export function AdSlotInArticle({ className }: { className?: string }) {
  return (
    <AdSlot format="fluid" layout="in-article" className={className} />
  );
}

export function AdSlotSidebar({ className }: { className?: string }) {
  return <AdSlot format="auto" className={className} />;
}

function AdSlot({ format = "auto", layout, className }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) return;
    if (pushed.current) return;

    try {
      ((window as unknown as Record<string, unknown>).adsbygoogle as unknown[] || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) {
    return null;
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle block ${className ?? ""}`}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
      data-ad-format={format}
      {...(layout && { "data-ad-layout": layout })}
      data-full-width-responsive="true"
    />
  );
}

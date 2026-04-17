import { cn } from "@/lib/utils";

interface ResultRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export function ResultRow({ label, value, unit, highlight }: ResultRowProps) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between py-2",
        highlight && "rounded-md bg-primary/5 px-3 -mx-3"
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-mono font-semibold tabular-nums",
          highlight ? "text-lg text-primary" : "text-base"
        )}
      >
        {value}
        {unit && (
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}

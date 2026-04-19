"use client";

interface FootingDiagramProps {
  length: number;
  width: number;
  depth: number;
}

export function FootingDiagram({ length, width, depth }: FootingDiagramProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full max-w-sm text-foreground"
      aria-label={`Concrete footing diagram: ${length}ft × ${width}in × ${depth}in`}
    >
      {/* Ground line */}
      <line x1="20" y1="80" x2="300" y2="80" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="4 4" />
      <text x="290" y="74" textAnchor="end" className="fill-muted-foreground text-[10px]">ground level</text>

      {/* Footing cross-section */}
      <g transform="translate(90, 40)">
        {/* Post above ground */}
        <rect x="35" y="0" width="50" height="40" className="fill-muted/80 stroke-muted-foreground" strokeWidth="1" rx="1" />
        <text x="60" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">post</text>

        {/* Footing below ground */}
        <rect x="10" y="40" width="100" height="80" className="fill-primary/20 stroke-primary" strokeWidth="1.5" rx="2" />

        {/* Width dimension */}
        <line x1="10" y1="135" x2="110" y2="135" className="stroke-foreground" strokeWidth="1" markerEnd="url(#fa)" markerStart="url(#fas)" />
        <text x="60" y="150" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {width}″
        </text>

        {/* Depth dimension */}
        <line x1="125" y1="40" x2="125" y2="120" className="stroke-foreground" strokeWidth="1" markerEnd="url(#fa)" markerStart="url(#fas)" />
        <text x="132" y="84" textAnchor="start" className="fill-foreground text-xs font-mono">
          {depth}″
        </text>

        {/* Length label */}
        <text x="60" y="85" textAnchor="middle" className="fill-primary text-xs font-mono font-semibold">
          {length} ft long
        </text>
      </g>

      <defs>
        <marker id="fa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="fas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

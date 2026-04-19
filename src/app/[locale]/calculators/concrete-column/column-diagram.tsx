"use client";

interface ColumnDiagramProps {
  diameter: number;
  height: number;
}

export function ColumnDiagram({ diameter, height }: ColumnDiagramProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full max-w-sm text-foreground"
      aria-label={`Concrete column diagram: ${diameter}in diameter × ${height}ft height`}
    >
      {/* Ground line */}
      <line x1="40" y1="60" x2="280" y2="60" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="4 4" />
      <text x="270" y="54" textAnchor="end" className="fill-muted-foreground text-[10px]">ground level</text>

      <g transform="translate(110, 20)">
        {/* Sonotube cylinder (shown as rectangle with rounded top) */}
        {/* Top ellipse */}
        <ellipse cx="50" cy="40" rx="40" ry="12" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
        {/* Body */}
        <rect x="10" y="40" width="80" height="130" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
        {/* Bottom ellipse (hidden behind rect, just the front arc) */}
        <ellipse cx="50" cy="170" rx="40" ry="12" className="fill-primary/25 stroke-primary" strokeWidth="1.5" />
        {/* Re-draw sides over bottom ellipse top half */}
        <rect x="10" y="40" width="80" height="130" className="fill-primary/20" stroke="none" />
        <line x1="10" y1="40" x2="10" y2="170" className="stroke-primary" strokeWidth="1.5" />
        <line x1="90" y1="40" x2="90" y2="170" className="stroke-primary" strokeWidth="1.5" />

        {/* Diameter dimension */}
        <line x1="10" y1="25" x2="90" y2="25" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ca)" markerStart="url(#cas)" />
        <text x="50" y="18" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {diameter}″ dia
        </text>

        {/* Height dimension */}
        <line x1="105" y1="40" x2="105" y2="170" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ca)" markerStart="url(#cas)" />
        <text x="112" y="110" textAnchor="start" className="fill-foreground text-xs font-mono">
          {height} ft
        </text>
      </g>

      <defs>
        <marker id="ca" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="cas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

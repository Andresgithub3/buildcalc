"use client";

interface MulchDiagramProps {
  length: number;
  width: number;
  depth: number;
}

export function MulchDiagram({ length, width, depth }: MulchDiagramProps) {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full max-w-xs text-foreground"
      aria-label={`Mulch bed diagram: ${length}ft × ${width}ft × ${depth}in deep`}
    >
      <g transform="translate(50, 40)">
        {/* Landscape bed - organic shape with mulch layer */}
        {/* Border / edging */}
        <rect x="20" y="10" width="180" height="80" className="fill-primary/5 stroke-primary/40" strokeWidth="1" rx="8" />

        {/* Mulch layer */}
        <rect x="20" y="10" width="180" height="30" className="fill-primary/20 stroke-primary" strokeWidth="1.5" rx="8" ry="4" />

        {/* Mulch texture dots */}
        {[35, 55, 75, 95, 115, 135, 155, 175].map((x) => (
          <g key={x}>
            <circle cx={x} cy={20} r="2.5" className="fill-primary/30" />
            <circle cx={x + 8} cy={28} r="2" className="fill-primary/25" />
          </g>
        ))}

        {/* Plant symbols */}
        {[60, 110, 160].map((x) => (
          <g key={x} transform={`translate(${x}, 55)`}>
            <line x1="0" y1="0" x2="0" y2="15" className="stroke-muted-foreground" strokeWidth="1.5" />
            <circle cx="0" cy="-4" r="8" className="fill-muted/60 stroke-muted-foreground" strokeWidth="0.5" />
          </g>
        ))}

        {/* Length dimension */}
        <line x1="20" y1="108" x2="200" y2="108" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ma)" markerStart="url(#mas)" />
        <text x="110" y="123" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {length} ft
        </text>

        {/* Width dimension */}
        <line x1="215" y1="10" x2="215" y2="90" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ma)" markerStart="url(#mas)" />
        <text x="225" y="55" textAnchor="start" className="fill-foreground text-xs font-mono">
          {width} ft
        </text>

        {/* Depth callout */}
        <line x1="5" y1="10" x2="5" y2="40" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ma)" markerStart="url(#mas)" />
        <text x="-2" y="30" textAnchor="end" className="fill-foreground text-xs font-mono">
          {depth}″
        </text>
      </g>

      <defs>
        <marker id="ma" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="mas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

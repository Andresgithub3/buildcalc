"use client";

interface SlabDiagramProps {
  length: number;
  width: number;
  depth: number;
}

export function SlabDiagram({ length, width, depth }: SlabDiagramProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full max-w-sm text-foreground"
      aria-label={`Concrete slab diagram: ${length}ft × ${width}ft × ${depth}in`}
    >
      {/* 3D slab shape */}
      <g transform="translate(60, 30)">
        {/* Top face */}
        <polygon
          points="40,20 200,20 240,0 80,0"
          className="fill-primary/10 stroke-primary"
          strokeWidth="1.5"
        />
        {/* Front face */}
        <polygon
          points="40,20 200,20 200,60 40,60"
          className="fill-primary/20 stroke-primary"
          strokeWidth="1.5"
        />
        {/* Right face */}
        <polygon
          points="200,20 240,0 240,40 200,60"
          className="fill-primary/15 stroke-primary"
          strokeWidth="1.5"
        />

        {/* Length dimension */}
        <line x1="40" y1="75" x2="200" y2="75" className="stroke-foreground" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="120" y="90" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {length} ft
        </text>

        {/* Width dimension */}
        <line x1="210" y1="0" x2="250" y2="-15" className="stroke-foreground" strokeWidth="1" opacity="0" />
        <text x="248" y="14" textAnchor="start" className="fill-foreground text-xs font-mono">
          {width} ft
        </text>
        <line x1="205" y1="17" x2="245" y2="-3" className="stroke-foreground" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />

        {/* Depth dimension */}
        <line x1="25" y1="20" x2="25" y2="60" className="stroke-foreground" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="18" y="44" textAnchor="end" className="fill-foreground text-xs font-mono">
          {depth}″
        </text>
      </g>

      {/* Arrow markers */}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="arrow-start" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

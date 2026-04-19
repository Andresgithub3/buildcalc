"use client";

interface GravelDiagramProps {
  length: number;
  width: number;
  depth: number;
}

export function GravelDiagram({ length, width, depth }: GravelDiagramProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full max-w-xs text-foreground"
      aria-label={`Gravel area diagram: ${length}ft × ${width}ft × ${depth}in deep`}
    >
      <g transform="translate(40, 30)">
        {/* 3D gravel bed */}
        {/* Top face with gravel texture */}
        <polygon
          points="40,20 200,20 230,5 70,5"
          className="fill-primary/10 stroke-primary"
          strokeWidth="1.5"
        />
        {/* Gravel dots on top */}
        {[50, 70, 90, 110, 130, 150, 170, 190].map((x) =>
          [8, 14].map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x + (y % 3) * 2}
              cy={y}
              r="2"
              className="fill-primary/30"
            />
          ))
        )}

        {/* Front face */}
        <polygon
          points="40,20 200,20 200,50 40,50"
          className="fill-primary/20 stroke-primary"
          strokeWidth="1.5"
        />
        {/* Right face */}
        <polygon
          points="200,20 230,5 230,35 200,50"
          className="fill-primary/15 stroke-primary"
          strokeWidth="1.5"
        />

        {/* Length dimension */}
        <line x1="40" y1="65" x2="200" y2="65" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ga)" markerStart="url(#gas)" />
        <text x="120" y="80" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {length} ft
        </text>

        {/* Width dimension */}
        <line x1="205" y1="17" x2="235" y2="2" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ga)" markerStart="url(#gas)" />
        <text x="240" y="14" textAnchor="start" className="fill-foreground text-xs font-mono">
          {width} ft
        </text>

        {/* Depth dimension */}
        <line x1="25" y1="20" x2="25" y2="50" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ga)" markerStart="url(#gas)" />
        <text x="18" y="39" textAnchor="end" className="fill-foreground text-xs font-mono">
          {depth}″
        </text>
      </g>

      <defs>
        <marker id="ga" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="gas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

"use client";

interface TileDiagramProps {
  roomLength: number;
  roomWidth: number;
}

export function TileDiagram({ roomLength, roomWidth }: TileDiagramProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full max-w-sm text-foreground"
      aria-label={`Floor tile diagram: ${roomLength}ft × ${roomWidth}ft`}
    >
      <g transform="translate(40, 20)">
        {/* Floor rectangle */}
        <rect x="0" y="0" width="200" height="140" className="fill-primary/5 stroke-primary" strokeWidth="1.5" rx="2" />

        {/* Tile grid pattern */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 40 + 2}
              y={row * 35 + 2}
              width={38}
              height={33}
              className="fill-primary/10 stroke-primary/30"
              strokeWidth="0.5"
              rx="1"
            />
          ))
        )}

        {/* Length dimension */}
        <line x1="0" y1="155" x2="200" y2="155" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ta)" markerStart="url(#tas)" />
        <text x="100" y="170" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {roomLength} ft
        </text>

        {/* Width dimension */}
        <line x1="215" y1="0" x2="215" y2="140" className="stroke-foreground" strokeWidth="1" markerEnd="url(#ta)" markerStart="url(#tas)" />
        <text x="228" y="75" textAnchor="start" className="fill-foreground text-xs font-mono">
          {roomWidth} ft
        </text>
      </g>

      <defs>
        <marker id="ta" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="tas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

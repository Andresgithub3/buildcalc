"use client";

interface PaintDiagramProps {
  roomLength: number;
  roomWidth: number;
  wallHeight: number;
}

export function PaintDiagram({ roomLength, roomWidth, wallHeight }: PaintDiagramProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full max-w-xs text-foreground"
      aria-label={`Room diagram: ${roomLength}ft × ${roomWidth}ft × ${wallHeight}ft`}
    >
      <g transform="translate(50, 20)">
        {/* 3D room — two visible walls and floor */}
        {/* Back wall */}
        <rect x="40" y="0" width="140" height="100" className="fill-primary/10 stroke-primary" strokeWidth="1.5" rx="1" />
        {/* Side wall */}
        <polygon
          points="40,0 40,100 0,130 0,30"
          className="fill-primary/15 stroke-primary"
          strokeWidth="1.5"
        />
        {/* Floor */}
        <polygon
          points="0,130 40,100 180,100 140,130"
          className="fill-muted stroke-primary"
          strokeWidth="1"
        />

        {/* Door on back wall */}
        <rect x="60" y="45" width="25" height="55" className="fill-background stroke-muted-foreground" strokeWidth="1" rx="1" />
        <circle cx="80" cy="75" r="1.5" className="fill-muted-foreground" />

        {/* Window on back wall */}
        <rect x="120" y="25" width="35" height="30" className="fill-background stroke-muted-foreground" strokeWidth="1" rx="1" />
        <line x1="137.5" y1="25" x2="137.5" y2="55" className="stroke-muted-foreground" strokeWidth="0.5" />
        <line x1="120" y1="40" x2="155" y2="40" className="stroke-muted-foreground" strokeWidth="0.5" />

        {/* Room length dimension (back wall bottom) */}
        <line x1="40" y1="112" x2="180" y2="112" className="stroke-foreground" strokeWidth="1" markerEnd="url(#pa)" markerStart="url(#pas)" />
        <text x="110" y="125" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {roomLength} ft
        </text>

        {/* Room width dimension (side wall bottom) */}
        <line x1="-12" y1="30" x2="-12" y2="130" className="stroke-foreground" strokeWidth="1" markerEnd="url(#pa)" markerStart="url(#pas)" />
        <text x="-20" y="85" textAnchor="end" className="fill-foreground text-xs font-mono" transform="rotate(-90, -20, 85)">
          {wallHeight} ft
        </text>

        {/* Width label along floor edge */}
        <text x="70" y="148" textAnchor="middle" className="fill-foreground text-xs font-mono">
          {roomWidth} ft
        </text>
      </g>

      <defs>
        <marker id="pa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="pas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

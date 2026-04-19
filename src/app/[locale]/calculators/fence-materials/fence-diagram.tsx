"use client";

import type { FenceHeight } from "@/lib/calculators/fence-materials";

interface FenceDiagramProps {
  height: FenceHeight;
  postSpacing: number;
}

export function FenceDiagram({ height, postSpacing }: FenceDiagramProps) {
  const fenceH = height * 10; // scale
  const postW = 6;
  const sectionW = 70;

  return (
    <svg
      viewBox="0 0 320 180"
      className="w-full max-w-xs text-foreground"
      aria-label={`Fence diagram: ${height}ft tall, ${postSpacing}ft post spacing`}
    >
      {/* Ground line */}
      <line x1="10" y1="140" x2="310" y2="140" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="4 4" />

      <g transform="translate(30, 0)">
        {/* Three fence sections */}
        {[0, 1, 2].map((i) => {
          const x = i * sectionW;
          const topY = 140 - fenceH;
          return (
            <g key={i}>
              {/* Post */}
              <rect
                x={x}
                y={topY - 4}
                width={postW}
                height={fenceH + 20}
                className="fill-primary/30 stroke-primary"
                strokeWidth="1"
                rx="1"
              />
              {/* Post underground */}
              <rect
                x={x}
                y={140}
                width={postW}
                height={16}
                className="fill-primary/15 stroke-primary/50"
                strokeWidth="0.5"
              />

              {/* Rails between posts */}
              {i < 2 && (
                <>
                  {/* Top rail */}
                  <rect
                    x={x + postW}
                    y={topY + 4}
                    width={sectionW - postW}
                    height={4}
                    className="fill-primary/20 stroke-primary/60"
                    strokeWidth="0.5"
                  />
                  {/* Bottom rail */}
                  <rect
                    x={x + postW}
                    y={140 - 10}
                    width={sectionW - postW}
                    height={4}
                    className="fill-primary/20 stroke-primary/60"
                    strokeWidth="0.5"
                  />
                  {height >= 6 && (
                    /* Middle rail */
                    <rect
                      x={x + postW}
                      y={topY + (fenceH - 4) / 2}
                      width={sectionW - postW}
                      height={4}
                      className="fill-primary/20 stroke-primary/60"
                      strokeWidth="0.5"
                    />
                  )}
                  {/* Pickets */}
                  {Array.from({ length: 7 }).map((_, j) => {
                    const px = x + postW + 2 + j * 9;
                    return (
                      <rect
                        key={j}
                        x={px}
                        y={topY + 2}
                        width={7}
                        height={fenceH - 4}
                        className="fill-primary/10 stroke-primary/40"
                        strokeWidth="0.5"
                        rx="0.5"
                      />
                    );
                  })}
                </>
              )}
            </g>
          );
        })}

        {/* Last post */}
        <rect
          x={2 * sectionW + sectionW}
          y={140 - fenceH - 4}
          width={postW}
          height={fenceH + 20}
          className="fill-primary/30 stroke-primary"
          strokeWidth="1"
          rx="1"
        />

        {/* Height dimension */}
        <line x1={-12} y1={140 - fenceH} x2={-12} y2={140} className="stroke-foreground" strokeWidth="1" markerEnd="url(#fea)" markerStart="url(#feas)" />
        <text x={-18} y={140 - fenceH / 2 + 4} textAnchor="end" className="fill-foreground text-xs font-mono">
          {height} ft
        </text>

        {/* Spacing dimension */}
        <line x1={postW / 2} y1={140 - fenceH - 16} x2={sectionW + postW / 2} y2={140 - fenceH - 16} className="stroke-foreground" strokeWidth="1" markerEnd="url(#fea)" markerStart="url(#feas)" />
        <text x={sectionW / 2 + postW / 2} y={140 - fenceH - 22} textAnchor="middle" className="fill-foreground text-xs font-mono">
          {postSpacing} ft
        </text>
      </g>

      <defs>
        <marker id="fea" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-foreground" />
        </marker>
        <marker id="feas" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" className="fill-foreground" />
        </marker>
      </defs>
    </svg>
  );
}

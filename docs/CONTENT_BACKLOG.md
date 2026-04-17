# SlabCalc — Post-Launch Calculator Backlog

Next 17 calculators to build after the initial 8-calculator launch.

## Backlog (Priority Order)

| # | Calculator | Target Keywords | Notes |
|---|-----------|----------------|-------|
| 1 | Retaining Wall Calculator | retaining wall calculator, block wall | Block count, gravel backfill, drainage |
| 2 | Drywall Calculator | drywall calculator, sheetrock calculator | Sheets, joint compound, tape, screws |
| 3 | Stair Stringer Calculator | stair calculator, stair stringer | Rise/run, number of steps, stringer length |
| 4 | Rebar Calculator | rebar calculator, rebar spacing | Linear feet, weight, grid spacing |
| 5 | Decking Calculator | deck board calculator, decking | Boards, screws, joists, posts |
| 6 | Brick / Block Calculator | brick calculator, CMU calculator | Bricks per sq ft, mortar estimate |
| 7 | Roofing Shingle Calculator | roofing calculator, how many shingles | Squares, bundles, underlayment |
| 8 | Insulation Calculator | insulation calculator, R-value | Batts, blown-in, sq ft coverage |
| 9 | Lumber Calculator | board feet calculator, lumber calculator | Board feet, linear feet, cost |
| 10 | Paver Calculator | paver calculator, patio pavers | Pavers, sand base, edge restraint |
| 11 | Concrete Mix Ratio Calculator | concrete mix ratio, cement sand gravel | Ratio by volume/weight |
| 12 | Asphalt Calculator | asphalt calculator, blacktop | Tons, sq ft, depth |
| 13 | Siding Calculator | siding calculator, vinyl siding | Squares, trim, starter strips |
| 14 | Gutter Calculator | gutter calculator | Linear feet, downspouts, hangers |
| 15 | Drainage / French Drain Calculator | french drain calculator | Gravel, pipe, fabric |
| 16 | Landscaping Stone Calculator | landscape stone calculator | Tons, sq ft, pattern |
| 17 | Concrete Cost per Square Foot Calculator | concrete cost per sq ft | Cost estimator by project type |

## Implementation Pattern

Each new calculator follows the established pattern:

1. Pure function in `/lib/calculators/[name].ts`
2. Unit tests in `/lib/calculators/[name].test.ts`
3. Page at `/calculators/[slug]/page.tsx` with metadata + JSON-LD
4. Client component with inputs/results
5. SVG diagram
6. Supporting content (500–800 words) + FAQs
7. Affiliate links entry in `/content/affiliates.json`

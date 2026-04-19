Build Spec for Claude Code
You are helping me (Andres) build and ship BuildCalc, a fast, modern, SEO-optimized construction materials calculator hub. This document is your single source of truth. Read it fully before writing any code.

0. How You Should Operate

Use TodoWrite to break this spec into tracked tasks. Update status as you go.
Read the frontend-design skill before writing any UI code. Follow its design tokens and constraints.
Use MCPs I have configured. If Google Stitch MCP, shadcn, Vercel, or GitHub MCPs are available, use them.
Pause for manual steps. When I need to do something outside the codebase (register domain, create account, paste API key, configure DNS, etc.), STOP, output a MANUAL STEP REQUIRED block with exact instructions, and wait for confirmation.
Do not invent secrets. Use .env.local with a .env.example containing placeholders.
Test the math. All calculation logic must have unit tests. Run them before declaring features complete.
Commit logically. Conventional commit messages (feat:, chore:, docs:, test:).


1. Project Identity
FieldValueNameBuildCalcDomainbuildcalc.co (primary). Fallback: buildcalc.app or getbuildcalc.comTagline"Construction calculators that contractors actually trust."One-liner"Estimate concrete, paint, tile, gravel, and more — accurate, fast, free."VoicePractical, authoritative, no-nonsense. Like a seasoned project manager who respects your time.AudienceDIY homeowners, contractors, construction estimators. Desktop for planning, mobile for on-site calculations. North America primary (imperial units default, metric toggle).

2. Strategic Context
BuildCalc is site #2 in the CrispCalc portfolio of utility sites monetized through display ads and affiliate links.
Why construction calculators?

Home improvement niche has the highest CPC of any utility tool vertical ($2–$8 CPC)
InchCalculator.com gets 4.5M organic visits with just calculators
Existing competitors (concretenetwork.com, calculator.net, omnicalculator.com) are either general-purpose or design-dated
Each calculator is its own indexable URL with unique long-tail keywords
Amazon affiliate potential: link to concrete tools, mixers, paint, trowels, etc.

Targets:

Launch with 8 calculators covering the highest-volume construction keywords
Reach 10K monthly visits within 6 months via long-tail SEO
Expand to 25+ calculators over 12 months
Monetize with AdSense + Amazon affiliate links from day one


3. Tech Stack (Locked)

Framework: Next.js 15 (App Router, Server Components, Turbopack)
Language: TypeScript (strict)
Styling: Tailwind CSS v4
Components: shadcn/ui
Icons: lucide-react
Fonts: Geist Sans + Geist Mono (via next/font/google)
Analytics: Google Analytics 4 + Vercel Analytics
Ads: Google AdSense (Auto Ads + manual slots)
Hosting: Vercel
Package manager: pnpm


4. Design System
4.1 Brand Tokens
COLORS (light mode)
- background:        #FAFAFA
- foreground:        #171717
- primary:           #2563EB (BuildCalc blue — trustworthy, professional)
- primary-foreground:#FFFFFF
- accent:            #F59E0B (construction amber — hard hat yellow)
- muted:             #F5F5F4
- muted-foreground:  #737373
- border:            #E5E5E5
- success:           #16A34A
- destructive:       #DC2626

COLORS (dark mode)
- background:        #0A0A0A
- foreground:        #FAFAFA
- primary:           #3B82F6
- accent:            #FBBF24
- muted:             #1C1C1C
- muted-foreground:  #A3A3A3
- border:            #2A2A2A

TYPOGRAPHY
- Display/H1:        Geist Sans, 700, tight tracking
- Body:              Geist Sans, 400, 1rem
- Numbers/results:   Geist Mono, 600 (for calculated output values)

RADIUS
- Calculator cards: lg (1rem)
- Input fields: md (0.5rem)
4.2 Visual Direction

Not a cluttered construction site. Clean, professional, utility-first.
Reference vibe: Stripe Docs clarity + Home Depot's trustworthiness without the visual weight
Calculator layout: Each calculator is a well-organized card. Inputs on the left/top, result summary card on the right/bottom (desktop/mobile). Results are large, bold monospace numbers with clear unit labels.
No stock photos of construction workers. Use clean SVG illustrations or diagrams of the shapes being calculated (slab, footing, column, wall) — these double as visual aids.
Each calculator page includes a visual diagram (SVG) showing the dimensions being calculated (length × width × depth for a slab, diameter × height for a column, etc.)


5. Information Architecture & Routes
/                                     Landing page — grid of all calculators + search
/calculators/concrete-slab            Concrete slab calculator
/calculators/concrete-footing         Concrete footing calculator
/calculators/concrete-column          Round column / Sonotube calculator
/calculators/paint-coverage           Paint coverage calculator
/calculators/tile-flooring            Tile & flooring calculator
/calculators/gravel-and-aggregate     Gravel / crushed stone calculator
/calculators/mulch-and-topsoil        Mulch / topsoil / soil calculator
/calculators/fence-materials          Fence materials estimator
/guides                               Index of guides
/guides/[slug]                        Individual guide (e.g., "how-to-estimate-concrete")
/about                                About + E-E-A-T signals
/privacy                              Privacy policy
/terms                                Terms of use
/sitemap.xml                          Auto-generated
/robots.txt                           Standard

6. Calculator Specs (8 Launch Calculators)
Architecture Pattern
Each calculator lives in /lib/calculators/[name].ts as a pure function with full unit tests in /lib/calculators/[name].test.ts.
Shared component: <CalculatorLayout> wraps every calculator page with:

H1 + meta description
Diagram SVG
Input form (left/top)
Result card (right/bottom)
Supporting content (tips, FAQs, related calculators)
Schema markup (HowTo JSON-LD)

6.1 Concrete Slab Calculator
Inputs: Length (ft), Width (ft), Depth (in), Waste factor % (default 10%), Cost per Yard ($, optional)
Outputs: Cubic yards, Cubic feet, Number of 80lb bags, Number of 60lb bags, Estimated cost range ($125–$175/yd³) or custom cost
Formula: Volume (ft³) = L × W × (D/12). Cubic yards = Volume / 27. Bags (80lb) = Volume × 0.45 bags/ft³. Add waste %.
Target keywords: "concrete slab calculator", "how much concrete do I need", "concrete calculator cubic yards"
6.2 Concrete Footing Calculator
Inputs: Length (ft), Width (in), Depth (in), Number of footings, Waste %, Cost per Yard ($, optional)
Outputs: Cubic yards total, Per-footing volume, Bags, Cost range ($125–$175/yd³) or custom cost
Target keywords: "concrete footing calculator", "deck footing concrete"
6.3 Concrete Column / Sonotube
Inputs: Diameter (in), Height (ft), Number of columns, Waste %, Cost per Yard ($, optional)
Outputs: Cubic yards, Bags, Cost range ($125–$175/yd³) or custom cost
Formula: Volume = π × (D/2)² × H (in cubic inches → convert to ft³ → yards)
Target keywords: "sonotube calculator", "concrete column calculator", "post hole concrete"
6.4 Paint Coverage Calculator
Inputs: Room length (ft), Room width (ft), Wall height (ft), Number of doors (default 1), Number of windows (default 2), Number of coats (default 2), Cost per Gallon ($, optional)
Outputs: Total paintable area (sq ft), Gallons needed (1 gallon ≈ 350 sq ft coverage), Cost range ($25–$50/gal) or custom cost
Target keywords: "paint calculator", "how much paint do I need", "paint coverage calculator"
6.5 Tile & Flooring Calculator
Inputs: Room length (ft), Room width (ft), Tile size (12×12, 18×18, 24×24, custom), Waste % (default 10%), Cost per Box ($, optional)
Outputs: Total area (sq ft), Number of tiles needed, Number of boxes (specify tiles/box), Cost range ($25–$75/box) or custom cost
Target keywords: "tile calculator", "flooring calculator", "how many tiles do I need"
6.6 Gravel / Aggregate Calculator
Inputs: Length (ft), Width (ft), Depth (in), Material type (gravel, crushed stone, pea gravel, river rock), Cost per Ton ($, optional)
Outputs: Cubic yards, Tons (varies by material density), Cost range ($30–$65/ton) or custom cost
Densities: Gravel: 1.4 tons/yd³, Crushed stone: 1.35, Pea gravel: 1.35, River rock: 1.5
Target keywords: "gravel calculator", "how much gravel do I need", "crushed stone calculator"
6.7 Mulch / Topsoil Calculator
Inputs: Length (ft), Width (ft), Depth (in), Material (mulch, topsoil, compost, fill dirt), Cost per Yard ($, optional)
Outputs: Cubic yards, Bags (2 cu ft bags), Cost range ($10–$60/yd³ varies by material) or custom cost
Target keywords: "mulch calculator", "how much mulch do I need", "topsoil calculator"
6.8 Fence Materials Estimator
Inputs: Total fence length (ft), Fence height (4ft/6ft/8ft), Post spacing (6ft/8ft), Gate count, Material (wood, vinyl, chain link), Cost per Foot ($, optional)
Outputs: Number of posts, Number of rails, Number of pickets/panels, Bags of concrete for posts, Cost range ($8–$40/ft varies by material) or custom cost
Target keywords: "fence calculator", "how many fence boards do I need"

6.9 Custom Cost Feature (all 8 calculators)
STATUS: COMPLETE
Every calculator accepts an optional custom cost input. When provided, a single estimated cost is shown (quantity × custom rate). When omitted, the default range is displayed. A CostDisclaimer component renders below cost results: "Cost estimates are approximate. Actual prices vary by region, supplier, and market conditions."
Tests: 46 total (18 new for custom cost, including default range tests for paint and tile).

7. SEO Requirements
Same SEO architecture as CrispCalc spec:

generateMetadata on every page
JSON-LD HowTo schema on each calculator page
FAQPage schema where FAQs exist
Sitemap, robots.txt, canonical URLs, OG + Twitter Cards
Internal linking: every calculator links to 3+ related calculators
Each calculator page has 500–800 words of supporting content (tips, common mistakes, material guides)


8. Monetization

Google AdSense (Auto Ads + manual slots: <AdSlotInArticle />, <AdSlotSidebar />)
Amazon affiliate links to relevant tools/materials on each calculator page (concrete mixer, paint rollers, tile cutters, etc.)
Affiliate links stored in /content/affiliates.json so they're easy to update

8.1 AdSense Status & Implementation
STATUS: Pending review. Not yet approved. All ad slots currently return null.

The AdSlot component (src/components/ads/ad-slot.tsx) checks NEXT_PUBLIC_ADSENSE_PUBLISHER_ID at render time. When the env var is not set, all ad components return null — no wrapper divs, no spacing, no layout impact.

Ad slot locations in the current layout:
- AdSlotInArticle: Left grid column, between the input card and supporting content (~600px wide)
- AdSlotSidebar: Right grid column, below affiliate links (340px wide)

Activation: Once AdSense is approved, set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID in Vercel environment variables. Ads render automatically — no code changes needed.

8.2 AdSense Considerations When Ads Become Active

1. Sidebar height: The right sticky column will grow taller (Results + Affiliate Links + Sidebar Ad). On short viewports the sticky sidebar may extend past the viewport bottom. If this happens, add lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto to the right column div in calculator-layout.tsx, or move AdSlotSidebar out of the sticky container.

2. In-article ad spacing: AdSlotInArticle has mt-6 which provides a gap above it. When the ad renders, verify spacing looks balanced between the input card, the ad, and the supporting content. Adjust the margin class if needed.

3. Mobile layout: Below the lg breakpoint, the grid collapses to a single column. Ad slots appear inline: sidebar ad after affiliate links, in-article ad between input and content. Verify ads don't push critical content too far down on mobile.

4. CLS (Cumulative Layout Shift): AdSense ads load asynchronously and can cause layout shifts. To mitigate, consider adding min-h-[250px] to the <ins> element in ad-slot.tsx so the browser reserves space before the ad loads. Not currently implemented since ads are inactive.

5. Ad density: Google AdSense policies require ads don't outnumber content. With 2 ad slots per page, this is well within limits for the amount of content on each calculator page.

8.3 Page Layout Structure
The CalculatorLayout component uses a 2-column CSS grid (lg:grid-cols-[1fr_340px]):
- Left column: Input card → AdSlotInArticle → Supporting content → Related calculators
- Right column (sticky): Results card → Affiliate links → AdSlotSidebar
Supporting content and related calculators are inside the left grid column so they flow directly below the input card with no empty space gaps.


9. Build Milestones
Milestone 1: Scaffold + Math Engine — COMPLETE

Scaffold Next.js 15 project, configure shadcn, set up design tokens
Implement all 8 calculator functions in /lib/calculators/ with unit tests
Checkpoint: all tests pass

Milestone 2: Calculator UI + Homepage — COMPLETE

Build <CalculatorLayout> shared component
Build homepage with calculator grid
Build concrete slab calculator page as the template
Checkpoint: review slab calculator on mobile + desktop

Milestone 3: All 8 Calculator Pages — COMPLETE

Build remaining 7 calculator pages using the template
Create SVG diagrams for each calculator (slab, footing, column, room, floor, yard, fence)
Checkpoint: review all 8 pages

Milestone 4: Content + SEO + Static Pages — COMPLETE

Write supporting content for each calculator (tips, FAQs)
Add all schema markup, metadata, sitemap
Build About, Privacy, Terms pages
Lighthouse audit ≥95
Checkpoint: Lighthouse report

Milestone 5: Monetization + Deploy — COMPLETE (AdSense pending review)

Wire AdSense + affiliate links
Cookie consent banner
Deploy to Vercel, connect domain
Submit to Search Console
Checkpoint: site is live

Milestone 6: Custom Cost Input — COMPLETE

Added optional custom cost input to all 8 calculators
Added default cost ranges to Paint and Tile (previously had none)
CostDisclaimer component below all cost results
46 tests total (18 new), clean build
Pushed to main

Milestone 7: Spanish Language Translation — PLANNED

Separate URL paths: slab-calc.com/es/calculators/concrete-slab, etc.
Library: next-intl (best maintained for Next.js App Router)
Scope: Full site — calculator UI labels, supporting content, legal pages, nav, footer
Language toggle button in the navbar
SEO benefit: Google indexes Spanish pages separately


10. Manual Steps
Same pattern as CrispCalc: domain registration, GitHub repo, Vercel project, DNS, GA4, Search Console, AdSense. Pause and guide me through each one.

11. Post-Launch Backlog (Next 17 Calculators)
Document in /docs/CONTENT_BACKLOG.md:

Retaining wall calculator
Drywall calculator
Stair stringer calculator
Rebar calculator
Decking calculator
Brick / block calculator
Roofing shingle calculator
Insulation calculator
Lumber calculator
Paver calculator
Concrete mix ratio calculator
Asphalt calculator
Siding calculator
Gutter calculator
Drainage / French drain calculator
Landscaping stone calculator
Concrete cost per square foot calculator
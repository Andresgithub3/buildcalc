import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-heading font-semibold">BuildCalc</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Construction calculators that contractors actually trust.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Calculators</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/calculators/concrete-slab" className="hover:text-foreground transition-colors">
                  Concrete Slab
                </Link>
              </li>
              <li>
                <Link href="/calculators/concrete-footing" className="hover:text-foreground transition-colors">
                  Concrete Footing
                </Link>
              </li>
              <li>
                <Link href="/calculators/paint-coverage" className="hover:text-foreground transition-colors">
                  Paint Coverage
                </Link>
              </li>
              <li>
                <Link href="/calculators/tile-flooring" className="hover:text-foreground transition-colors">
                  Tile &amp; Flooring
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">More</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/calculators/gravel-and-aggregate" className="hover:text-foreground transition-colors">
                  Gravel &amp; Aggregate
                </Link>
              </li>
              <li>
                <Link href="/calculators/mulch-and-topsoil" className="hover:text-foreground transition-colors">
                  Mulch &amp; Topsoil
                </Link>
              </li>
              <li>
                <Link href="/calculators/fence-materials" className="hover:text-foreground transition-colors">
                  Fence Materials
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BuildCalc. All rights reserved.</p>
          <div className="mt-1 space-x-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

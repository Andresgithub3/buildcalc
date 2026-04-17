import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculators } from "@/lib/calculator-data";
import { ArrowRight, HardHat } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-accent/10 p-3">
            <HardHat className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Construction Calculators That{" "}
          <span className="text-primary">Contractors Actually Trust</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Estimate concrete, paint, tile, gravel, and more — accurate, fast,
          free. Stop guessing, start building.
        </p>
      </section>

      {/* Calculator Grid */}
      <section className="pb-16">
        <h2 className="font-heading text-xl font-semibold mb-6">
          All Calculators
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="group">
                <Card className="h-full transition-all group-hover:border-primary/30 group-hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <CardTitle className="mt-3">{calc.shortName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {calc.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t py-16">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <h3 className="font-heading font-semibold">Accurate Formulas</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Industry-standard calculations with built-in waste factors so you
              order the right amount.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold">Instant Results</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your dimensions and get quantities, bags, and cost estimates
              immediately.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold">Mobile-Ready</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use on-site from your phone or plan at your desk — works great on
              any device.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

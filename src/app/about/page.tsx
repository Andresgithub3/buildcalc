import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, Target, Shield, Zap } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About SlabCalc",
  description:
    "SlabCalc provides free, accurate construction calculators for contractors, estimators, and DIY homeowners. Learn about our mission and methodology.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        About SlabCalc
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Construction calculators that contractors actually trust.
      </p>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Our Mission</h2>
        <p className="mt-3 text-muted-foreground">
          SlabCalc exists because ordering the wrong amount of material is
          expensive — whether you&apos;re short on concrete mid-pour or stuck
          returning 30 extra bags of mulch. We build calculators that give you
          accurate quantities in seconds, so you can order with confidence and
          get back to building.
        </p>
        <p className="mt-3 text-muted-foreground">
          Every calculator on this site uses industry-standard formulas verified
          against manufacturer specifications and building trade references.
          We include waste factors because real projects aren&apos;t textbook
          perfect — uneven ground, saw cuts, and spillage happen.
        </p>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Accurate Formulas</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Industry-standard calculations with configurable waste factors.
              Every formula is unit-tested to prevent errors.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Instant Results</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No page reloads, no sign-ups. Enter dimensions and get quantities
              immediately — on desktop or mobile.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">No Hidden Agenda</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We don&apos;t sell your data or require accounts. SlabCalc is free
              to use and supported by ads and affiliate links.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg bg-primary/10 p-2 h-fit">
            <HardHat className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Built for the Job Site</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Mobile-first design that works with gloves on. Large inputs, clear
              results, no clutter.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Who We Serve</h2>
        <p className="mt-3 text-muted-foreground">
          SlabCalc is designed for DIY homeowners tackling weekend projects,
          contractors estimating material orders, and construction estimators
          who need a quick sanity check. Whether you&apos;re pouring a patio
          slab or estimating materials for a 200-foot fence line, our tools
          give you the numbers you need.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">
          Methodology &amp; Accuracy
        </h2>
        <p className="mt-3 text-muted-foreground">
          Our calculators use formulas sourced from concrete industry standards
          (ACI, PCA), paint manufacturer coverage rates, and building material
          supplier specifications. All calculation logic is covered by automated
          unit tests to ensure accuracy. Estimates are intended as guidelines —
          always verify with your material supplier for project-specific
          conditions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Get in Touch</h2>
        <p className="mt-3 text-muted-foreground">
          Found a bug in a calculator? Have a suggestion for a new tool? We
          want to hear from you. Reach us at{" "}
          <strong>hello@slab-calc.com</strong>.
        </p>
      </section>

      <div className="mt-12 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Use
          </Link>
        </p>
      </div>
    </div>
  );
}

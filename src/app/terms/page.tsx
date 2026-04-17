import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "SlabCalc terms of use — conditions for using our construction calculators.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-8 space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Acceptance of Terms
          </h2>
          <p className="mt-2">
            By accessing and using SlabCalc (slab-calc.com), you accept and
            agree to be bound by these Terms of Use. If you do not agree, please
            do not use the site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Use of Calculators
          </h2>
          <p className="mt-2">
            SlabCalc provides construction material calculators for
            informational and estimation purposes only. The results are
            approximations based on standard formulas and should not be used as
            the sole basis for purchasing decisions.
          </p>
          <p className="mt-2">
            <strong>Always verify quantities with your material supplier.</strong>{" "}
            Actual material requirements may vary due to site conditions,
            material properties, installation methods, and other factors beyond
            the scope of these calculators.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Disclaimer of Warranties
          </h2>
          <p className="mt-2">
            SlabCalc is provided &quot;as is&quot; without warranty of any kind,
            express or implied. We do not warrant that the calculators will be
            error-free, uninterrupted, or that results will be accurate for your
            specific project conditions.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            SlabCalc shall not be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising from your use of the
            calculators or reliance on the results. This includes, but is not
            limited to, material over-ordering, under-ordering, project delays,
            or construction defects.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Affiliate Links &amp; Advertising
          </h2>
          <p className="mt-2">
            SlabCalc contains affiliate links to third-party retailers
            (including Amazon). When you click these links and make a purchase,
            we may earn a commission at no additional cost to you. We also
            display advertisements through Google AdSense.
          </p>
          <p className="mt-2">
            Product recommendations are based on general suitability for the
            project type and are not endorsements. Always research products
            independently before purchasing.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Intellectual Property
          </h2>
          <p className="mt-2">
            All content on SlabCalc, including text, graphics, logos, and
            calculator designs, is the property of SlabCalc and is protected
            by copyright. You may not reproduce, distribute, or create
            derivative works without written permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Professional Advice
          </h2>
          <p className="mt-2">
            SlabCalc is not a substitute for professional engineering,
            architectural, or construction advice. For structural work,
            load-bearing calculations, or projects requiring permits, consult a
            licensed professional.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Changes to Terms
          </h2>
          <p className="mt-2">
            We reserve the right to modify these terms at any time. Continued
            use of the site after changes constitutes acceptance of the new
            terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            Questions about these terms? Contact us at{" "}
            <strong>hello@slab-calc.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

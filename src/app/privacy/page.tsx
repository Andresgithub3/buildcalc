import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SlabCalc privacy policy — how we handle your data.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-8 space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Overview
          </h2>
          <p className="mt-2">
            SlabCalc (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates
            the website slab-calc.com. This page informs you of our policies
            regarding the collection, use, and disclosure of personal
            information when you use our site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Information We Collect
          </h2>
          <p className="mt-2">
            SlabCalc does not require user accounts or collect personally
            identifiable information. Calculator inputs are processed entirely
            in your browser and are never sent to our servers.
          </p>
          <p className="mt-2">We may collect anonymous usage data through:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>Google Analytics</strong> — page views, session duration,
              device type, and general geographic region. No personally
              identifiable information is collected.
            </li>
            <li>
              <strong>Vercel Analytics</strong> — anonymous web performance
              metrics (page load times, Web Vitals).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Cookies
          </h2>
          <p className="mt-2">
            We use cookies for analytics and advertising purposes. Third-party
            services (Google Analytics, Google AdSense) may set their own
            cookies. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Advertising
          </h2>
          <p className="mt-2">
            We display advertisements through Google AdSense and may include
            affiliate links to Amazon.com and other retailers. These services
            may use cookies to serve ads based on your browsing history. You
            can opt out of personalized advertising at{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Third-Party Links
          </h2>
          <p className="mt-2">
            Our site contains links to third-party websites (e.g., Amazon for
            tools and materials). We are not responsible for the privacy
            practices of these external sites. We encourage you to review
            their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Data Security
          </h2>
          <p className="mt-2">
            Our website is served over HTTPS. Since we don&apos;t collect
            personal data, there is minimal risk of data breach. All
            calculations happen client-side in your browser.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Children&apos;s Privacy
          </h2>
          <p className="mt-2">
            SlabCalc is not directed at children under 13. We do not knowingly
            collect information from children.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Changes to This Policy
          </h2>
          <p className="mt-2">
            We may update this privacy policy from time to time. Changes will be
            posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            Questions about this policy? Contact us at{" "}
            <strong>hello@slab-calc.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

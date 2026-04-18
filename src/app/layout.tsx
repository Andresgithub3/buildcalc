import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GA4Script } from "@/components/analytics/ga4-script";
import { CookieConsent } from "@/components/cookie-consent";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SlabCalc — Construction Calculators That Contractors Actually Trust",
    template: "%s | SlabCalc",
  },
  description:
    "Estimate concrete, paint, tile, gravel, and more — accurate, fast, free.",
  openGraph: {
    siteName: "SlabCalc",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9681069917942148"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GA4Script />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}

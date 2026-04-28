import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GA4Script } from "@/components/analytics/ga4-script";
import { CookieConsent } from "@/components/cookie-consent";
import { siteConfig } from "@/lib/config";
import { routing } from "@/i18n/routing";
import { getAlternates } from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: isSpanish
        ? "SlabCalc — Calculadoras de Construcción en las que los Contratistas Confían"
        : "SlabCalc — Construction Calculators That Contractors Actually Trust",
      template: "%s | SlabCalc",
    },
    description: isSpanish
      ? "Calcula concreto, pintura, azulejo, grava y más — preciso, rápido, gratis."
      : "Estimate concrete, paint, tile, gravel, and more — accurate, fast, free.",
    openGraph: {
      siteName: "SlabCalc",
      type: "website",
      locale: isSpanish ? "es_US" : "en_US",
    },
    twitter: {
      card: "summary",
    },
    alternates: getAlternates("", locale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
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
        <NextIntlClientProvider messages={messages}>
          <GA4Script />
          <SiteHeader />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <SiteFooter />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

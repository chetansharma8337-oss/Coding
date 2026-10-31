import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Logo } from "@/components/Logo";
import { PromoBar } from "@/components/PromoBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ASH-V | Exposure management and compliance on one asset record", template: "%s | ASH-V" },
  description: site.description,
  applicationName: "ASH-V",
  openGraph: {
    type: "website",
    siteName: "ASH-V",
    title: "ASH-V | Exposure management and compliance on one asset record",
    description: site.description,
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#1f1f1f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll />
        <a href="#main" className="skip-link btn btn-dark">
          Skip to content
        </a>
        <PromoBar />
        <SiteHeader logo={<Logo />} />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

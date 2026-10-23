import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Logo } from "@/components/Logo";
import { PromoBar } from "@/components/PromoBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: { default: "ASH-V | Enterprise IT security on one record", template: "%s | ASH-V" },
  description:
    "ASH-V brings asset intelligence, threat exposure management, vulnerability and patch management, automated penetration testing, third-party risk and GRC into one platform.",
};

export const viewport: Viewport = { themeColor: "#1f1f1f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link pill pill-light">
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

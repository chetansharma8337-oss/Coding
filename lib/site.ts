// Site-wide settings. Set NEXT_PUBLIC_SITE_URL to the production origin before launch so canonical
// URLs, the sitemap and social previews point at the real domain.
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "ASH-V is an exposure management and GRC platform that unifies asset intelligence, threat exposure management, vulnerability and patch management, automated penetration testing, third-party risk management and governance, risk and compliance on a single asset record.",
};

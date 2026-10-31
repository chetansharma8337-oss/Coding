// Site-wide settings. Set NEXT_PUBLIC_SITE_URL to the production origin before launch so canonical
// URLs, the sitemap and social previews point at the real domain.
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "ASH-V brings asset intelligence, threat exposure management, vulnerability and patch management, automated penetration testing, vendor risk and GRC into one platform built on a single asset record.",
};

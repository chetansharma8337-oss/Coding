import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { modules } from "@/lib/modules";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/platform",
    ...modules.map((m) => `/platform/${m.slug}`),
    "/solutions",
    ...solutions.map((s) => `/solutions/${s.slug}`),
    "/frameworks",
    "/resources",
    ...articles.map((a) => `/resources/${a.slug}`),
    "/company",
    "/walkthrough",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}

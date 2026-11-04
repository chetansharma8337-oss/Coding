import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleView } from "@/components/ModuleView";
import { AssetIntelligencePage } from "@/components/module/pages/AssetIntelligencePage";
import { ThreatExposurePage } from "@/components/module/pages/ThreatExposurePage";
import { VulnPatchPage } from "@/components/module/pages/VulnPatchPage";
import { PentestPage } from "@/components/module/pages/PentestPage";
import { moduleBySlug, modules, type ModuleSlug } from "@/lib/modules";

// Each module has its own page, built from shared blocks but laid out around its own signature visual.
const pages: Partial<Record<ModuleSlug, () => React.JSX.Element>> = {
  "asset-intelligence": AssetIntelligencePage,
  "threat-exposure-management": ThreatExposurePage,
  "vulnerability-patch-management": VulnPatchPage,
  "automated-penetration-testing": PentestPage,
};

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = moduleBySlug((await params).slug);
  return m ? { title: m.name, description: m.line, alternates: { canonical: `/platform/${m.slug}` } } : {};
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const mod = moduleBySlug((await params).slug);
  if (!mod) notFound();
  const Page = pages[mod.slug];
  return Page ? <Page /> : <ModuleView mod={mod} />;
}

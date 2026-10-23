import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleView } from "@/components/ModuleView";
import { moduleBySlug, modules } from "@/lib/modules";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = moduleBySlug((await params).slug);
  return m ? { title: m.name, description: m.line } : {};
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const mod = moduleBySlug((await params).slug);
  if (!mod) notFound();
  return <ModuleView mod={mod} />;
}

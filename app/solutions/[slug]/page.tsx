import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionView } from "@/components/SolutionView";
import { roleInSentence, solutionBySlug, solutions } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = solutionBySlug((await params).slug);
  return s
    ? { title: `ASH-V for ${roleInSentence(s.role)}`, description: s.line, alternates: { canonical: `/solutions/${s.slug}` } }
    : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = solutionBySlug((await params).slug);
  if (!s) notFound();
  return <SolutionView solution={s} />;
}

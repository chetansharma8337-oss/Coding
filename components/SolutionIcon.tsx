import { ClipboardText, HardDrives, Briefcase, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { SolutionSlug } from "@/lib/solutions";

const icons: Record<SolutionSlug, Icon> = {
  ciso: Briefcase,
  "security-operations": ShieldCheck,
  "it-operations": HardDrives,
  "governance-risk-compliance": ClipboardText,
};

export function SolutionIcon({ slug, className = "size-6" }: { slug: SolutionSlug; className?: string }) {
  const Glyph = icons[slug];
  return <Glyph weight="light" className={className} aria-hidden="true" />;
}

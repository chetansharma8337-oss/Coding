import { Bandaids, Crosshair, Database, Handshake, Path, Scales } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ModuleSlug } from "@/lib/modules";

// Phosphor, light weight, per the landing-page-design skill (B6). One glyph per module, chosen for what it looks after.
const icons: Record<ModuleSlug, Icon> = {
  "asset-intelligence": Database,
  "threat-exposure-management": Crosshair,
  "vulnerability-patch-management": Bandaids,
  "automated-penetration-testing": Path,
  "third-party-risk-management": Handshake,
  grc: Scales,
};

export function ModuleIcon({ slug, className = "size-6" }: { slug: ModuleSlug; className?: string }) {
  const Glyph = icons[slug];
  return <Glyph weight="light" className={className} aria-hidden="true" />;
}

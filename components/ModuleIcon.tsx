import type { ModuleSlug } from "@/lib/modules";

// Drawn for ASH-V rather than pulled from an icon library: 1.5px monochrome strokes per DESIGN.md,
// square caps and mitred joins so the set reads more engineered than the rounded library default.
const paths: Record<ModuleSlug, React.ReactNode> = {
  // Stacked inventory records with one flagged as owned.
  "asset-intelligence": (
    <>
      <rect x="3.75" y="4.75" width="16.5" height="4" />
      <rect x="3.75" y="10" width="16.5" height="4" />
      <rect x="3.75" y="15.25" width="16.5" height="4" />
      <path d="M6.5 6.75h2M6.5 12h2M6.5 17.25h2" />
    </>
  ),
  // Concentric range rings with a marked point: an exposure placed by reachability.
  "threat-exposure-management": (
    <>
      <path d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25" />
      <path d="M12 7.5a4.5 4.5 0 1 0 4.5 4.5" />
      <path d="M12 12l6.5-6.5M15.5 5.5h3v3" />
    </>
  ),
  // A stitched patch over a square: the fix applied.
  "vulnerability-patch-management": (
    <>
      <rect x="4.75" y="4.75" width="14.5" height="14.5" />
      <path d="M9 12h6M12 9v6" />
      <path d="M4.75 9.5h1.5M4.75 14.5h1.5M17.75 9.5h1.5M17.75 14.5h1.5" />
    </>
  ),
  // A path of three hops ending inside a boundary: a validated attack path.
  "automated-penetration-testing": (
    <>
      <path d="M13.75 4.75h5.5v14.5h-5.5" />
      <path d="M3.75 16.5L8 12.25l3 2.5 5.25-5.25" />
      <path d="M13.5 9.5h2.75v2.75" />
    </>
  ),
  // Two organisations joined by a link: you and a supplier.
  "third-party-risk-management": (
    <>
      <rect x="3.75" y="7.75" width="6.5" height="8.5" />
      <rect x="13.75" y="7.75" width="6.5" height="8.5" />
      <path d="M10.25 12h3.5" />
      <path d="M6 10.5h2M16 10.5h2" />
    </>
  ),
  // A control sheet with a checked line: mapped and evidenced.
  grc: (
    <>
      <path d="M5.75 3.75h9l3.5 3.5v13h-12.5z" />
      <path d="M8.5 10.5h7M8.5 14h3" />
      <path d="M12.75 15.5l1.5 1.5 3-3" />
    </>
  ),
};

export function ModuleIcon({ slug, className = "size-6" }: { slug: ModuleSlug; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
    >
      {paths[slug]}
    </svg>
  );
}

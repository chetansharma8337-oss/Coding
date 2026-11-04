export type ModuleSlug =
  | "asset-intelligence"
  | "threat-exposure-management"
  | "vulnerability-patch-management"
  | "automated-penetration-testing"
  | "third-party-risk-management"
  | "grc";

export type PlatformModule = {
  slug: ModuleSlug;
  name: string;
  /** Short module label for chips and compact lists. */
  short: string;
  /** One-sentence functional summary for menus and cards. */
  line: string;
  /** Two-sentence description for the platform tour. */
  intro: string;
  /** Modules this one provides data to, and the data provided (sentence case, no terminal period). */
  handsTo: { slug: ModuleSlug; what: string }[];
};

// Module scope. Every page describes these modules within this scope; product to confirm against the shipped release.
export const modules: PlatformModule[] = [
  {
    slug: "asset-intelligence",
    name: "Asset Intelligence",
    short: "Asset Intelligence",
    line: "Consolidated asset inventory with an asset owner and asset criticality on every asset record.",
    intro:
      "Asset Intelligence consolidates scanners, cloud accounts, endpoint agents, the directory and the CMDB into one asset record per asset. Each record carries an asset owner and asset criticality used by every other module.",
    handsTo: [
      { slug: "threat-exposure-management", what: "asset criticality and asset owner for prioritization" },
      { slug: "grc", what: "asset scope for control testing" },
    ],
  },
  {
    slug: "threat-exposure-management",
    name: "Threat Exposure Management",
    short: "Exposure Management",
    line: "Risk-based prioritization of findings by reachability, known exploitation and asset criticality.",
    intro:
      "Threat Exposure Management ranks each finding against the affected asset, its reachability and evidence of active exploitation. The result is a single Exposure Queue in place of separate scanner exports.",
    handsTo: [
      { slug: "automated-penetration-testing", what: "high-priority findings for validation" },
      { slug: "vulnerability-patch-management", what: "the Exposure Queue for remediation" },
    ],
  },
  {
    slug: "vulnerability-patch-management",
    name: "Vulnerability & Patch Management",
    short: "Vulnerability & Patch",
    line: "Owner-assigned remediation tasks, ring-based patch deployment and verified closure.",
    intro:
      "Vulnerability & Patch Management assigns each finding to the asset owner with a due date from the remediation policy and deploys patches in rings. A finding is closed only after a verification scan confirms the fix.",
    handsTo: [
      { slug: "grc", what: "verified closures as evidence for vulnerability management controls" },
      { slug: "threat-exposure-management", what: "verified closures that remove findings from the Exposure Queue" },
    ],
  },
  {
    slug: "automated-penetration-testing",
    name: "Automated Penetration Testing",
    short: "Penetration Testing",
    line: "Continuous attack path validation within a defined test scope, with retesting after remediation.",
    intro:
      "Automated Penetration Testing runs scoped attack simulations on a schedule and after major changes, and records each validated attack path step by step. Findings on a validated attack path move to the top of the Exposure Queue.",
    handsTo: [
      { slug: "threat-exposure-management", what: "validated attack paths that raise priority rank" },
      { slug: "grc", what: "test and retest results as evidence for assurance controls" },
    ],
  },
  {
    slug: "third-party-risk-management",
    name: "Third-Party Risk Management",
    short: "Third-Party Risk",
    line: "Vendor tiering by system and data access, with tier-based assessments and evidence tracking.",
    intro:
      "Third-Party Risk Management maintains a vendor register linked to the systems and data each vendor can access. Vendor tiers set the depth of assessment, and vendor evidence is tracked to its expiry date.",
    handsTo: [
      { slug: "grc", what: "vendor evidence for supplier controls" },
      { slug: "asset-intelligence", what: "vendor-managed assets for the asset inventory" },
    ],
  },
  {
    slug: "grc",
    name: "Governance, Risk & Compliance",
    short: "GRC",
    line: "Cross-framework control mapping with evidence records produced by the other modules.",
    intro:
      "GRC maps each control to the frameworks you report against and collects evidence records from the rest of ASH-V. Remediation, testing and vendor records attach to controls when they are produced.",
    handsTo: [{ slug: "threat-exposure-management", what: "ineffective controls that raise priority rank" }],
  },
];

export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);

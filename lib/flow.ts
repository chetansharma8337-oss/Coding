import type { ModuleSlug } from "./modules";

// One finding (CVE-2024-21762, listed in the CISA KEV catalog) followed through the five modules it passes through.
export const flowSteps: { verb: string; slug: ModuleSlug; module: string; body: string; evidence: string }[] = [
  {
    verb: "Discovered",
    evidence: "edge-fw-02 · Asset Owner: Network",
    slug: "asset-intelligence",
    module: "Asset Intelligence",
    body: "edge-fw-02 is recorded in the asset inventory with an asset owner and asset criticality.",
  },
  {
    verb: "Prioritized",
    evidence: "CVE-2024-21762 · CISA KEV",
    slug: "threat-exposure-management",
    module: "Threat Exposure Management",
    body: "CVE-2024-21762 is listed in the CISA KEV catalog and the VPN is internet-facing, so the finding ranks near the top of the Exposure Queue.",
  },
  {
    verb: "Validated",
    evidence: "Attack Path to fin-db-02",
    slug: "automated-penetration-testing",
    module: "Automated Penetration Testing",
    body: "A penetration test confirms a validated attack path from the VPN to fin-db-02, and the finding moves to priority rank 1.",
  },
  {
    verb: "Remediated",
    evidence: "Verification Scan: Passed",
    slug: "vulnerability-patch-management",
    module: "Vulnerability & Patch Management",
    body: "The Network team receives the remediation task, the patch deploys in rings, and a verification scan confirms closure.",
  },
  {
    verb: "Evidenced",
    evidence: "Control VM-01",
    slug: "grc",
    module: "GRC",
    body: "The verified closure and retest result attach to control VM-01 as evidence records.",
  },
];

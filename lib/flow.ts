import type { ModuleSlug } from "./modules";

// One real finding (CVE-2024-21762, on the CISA KEV list) followed through the five modules it touches.
export const flowSteps: { verb: string; slug: ModuleSlug; module: string; body: string; evidence: string }[] = [
  {
    verb: "Found",
    evidence: "edge-fw-02 · owner Network",
    slug: "asset-intelligence",
    module: "Asset Intelligence",
    body: "edge-fw-02 is in the inventory with an owner, Network, and a criticality.",
  },
  {
    verb: "Ranked",
    evidence: "CVE-2024-21762 · KEV",
    slug: "threat-exposure-management",
    module: "Threat Exposure Management",
    body: "CVE-2024-21762 is on the KEV list and the VPN faces the internet, so it goes near the top.",
  },
  {
    verb: "Proven",
    evidence: "path to fin-db-02",
    slug: "automated-penetration-testing",
    module: "Automated Penetration Testing",
    body: "A test confirms the VPN leads to fin-db-02, so it moves to rank 1.",
  },
  {
    verb: "Fixed",
    evidence: "rescan: closed",
    slug: "vulnerability-patch-management",
    module: "Vulnerability & Patch Management",
    body: "Network gets the work, patches in rings, and a rescan closes it.",
  },
  {
    verb: "Evidenced",
    evidence: "control VM-01",
    slug: "grc",
    module: "GRC",
    body: "The patch record and retest attach to control VM-01 for the next audit.",
  },
];

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
  short: string;
  /** One line for the explorer list. */
  line: string;
  /** Module page headline. */
  headline: string;
  intro: string;
  covers: { title: string; body: string }[];
  /** Which modules this one hands work to, and what it hands over. */
  handsTo: { slug: ModuleSlug; what: string }[];
};

// Copy describes what each module is for. Product team: confirm every "covers" item against the shipped scope.
export const modules: PlatformModule[] = [
  {
    slug: "asset-intelligence",
    name: "Asset Intelligence",
    short: "Assets",
    line: "One inventory of every device, workload, identity and application, with an owner on each.",
    headline: "Start from an inventory you can trust.",
    intro:
      "Asset Intelligence merges what your scanners, cloud accounts, endpoint agents and directory already know into one record per asset. Each record names an owner, so every finding downstream has someone to go to.",
    covers: [
      {
        title: "Discovery across sources",
        body: "Cloud accounts, on-premises networks, endpoints, identities and SaaS applications feed the same inventory.",
      },
      {
        title: "One record per asset",
        body: "Duplicate sightings of the same host or workload are merged, and the record shows which sources saw it and when.",
      },
      {
        title: "Ownership and business context",
        body: "Assign owning teams, environments and criticality so prioritisation reflects what the asset does for the business.",
      },
      {
        title: "Coverage gaps",
        body: "See assets that no scanner, agent or control currently covers.",
      },
    ],
    handsTo: [
      { slug: "threat-exposure-management", what: "asset criticality and ownership for scoring" },
      { slug: "grc", what: "the asset scope that controls are tested against" },
    ],
  },
  {
    slug: "threat-exposure-management",
    name: "Threat Exposure Management",
    short: "Exposure",
    line: "Rank exposures by what is reachable, exploited in the wild and important to the business.",
    headline: "Work the exposures that can actually hurt you.",
    intro:
      "Threat Exposure Management scores each exposure against the asset it sits on, whether it is reachable, and whether it is known to be exploited. The result is a single ranked queue instead of a scanner export.",
    covers: [
      {
        title: "Exploitation context",
        body: "Flags vulnerabilities listed in the CISA Known Exploited Vulnerabilities catalog and other threat intelligence you connect.",
      },
      {
        title: "Reachability",
        body: "Separates internet-facing and internally reachable exposures from ones that sit behind compensating controls.",
      },
      {
        title: "Business-weighted ranking",
        body: "Uses asset criticality from Asset Intelligence so a finding on a payment system outranks the same finding on a test box.",
      },
      {
        title: "Misconfigurations and identity exposure",
        body: "Tracks exposures that are not CVEs, such as open management ports or over-privileged accounts, in the same queue.",
      },
    ],
    handsTo: [
      { slug: "automated-penetration-testing", what: "high-ranked exposures to validate" },
      { slug: "vulnerability-patch-management", what: "a ranked queue to remediate" },
    ],
  },
  {
    slug: "vulnerability-patch-management",
    name: "Vulnerability & Patch Management",
    short: "Patching",
    line: "Turn ranked findings into owned remediation work, staged rollouts and verified fixes.",
    headline: "From finding to fixed, with proof.",
    intro:
      "Vulnerability & Patch Management routes each finding to the team that owns the asset, stages patches in rings, and closes the finding only when a rescan confirms the fix.",
    covers: [
      {
        title: "Routing to owners",
        body: "Findings go to the owning team from Asset Intelligence, with due dates set by your remediation policy.",
      },
      {
        title: "Ring-based rollouts",
        body: "Deploy patches to a pilot group first, then widen in stages, pausing a ring when something breaks.",
      },
      {
        title: "Verified closure",
        body: "A finding closes when a rescan or agent check confirms it, not when a ticket is marked done.",
      },
      {
        title: "Exceptions with an expiry",
        body: "Accept a risk with a named approver and an end date, so exceptions come back for review instead of living forever.",
      },
    ],
    handsTo: [
      { slug: "grc", what: "remediation evidence for vulnerability controls" },
      { slug: "threat-exposure-management", what: "closed findings that leave the queue" },
    ],
  },
  {
    slug: "automated-penetration-testing",
    name: "Automated Penetration Testing",
    short: "Pentesting",
    line: "Test attack paths continuously, not once a year, and show which exposures chain together.",
    headline: "Find out which paths an attacker would take.",
    intro:
      "Automated Penetration Testing runs scoped, safe attack simulations against your environment and records the paths that work. A finding that is part of a working path moves to the top of the queue.",
    covers: [
      {
        title: "Scoped and scheduled",
        body: "Define targets, exclusions and testing windows, then run on a schedule or after major changes.",
      },
      {
        title: "Attack path evidence",
        body: "Each validated path shows every step, from the entry point to the asset reached.",
      },
      {
        title: "Retest on fix",
        body: "When a step is remediated, the path is retested so you know the route is closed.",
      },
      {
        title: "Findings in the same queue",
        body: "Validated issues land in Threat Exposure Management, not in a separate PDF report.",
      },
    ],
    handsTo: [
      { slug: "threat-exposure-management", what: "proof that an exposure is exploitable here" },
      { slug: "grc", what: "testing evidence for assurance controls" },
    ],
  },
  {
    slug: "third-party-risk-management",
    name: "Third-Party Risk Management",
    short: "Vendors",
    line: "Assess vendors by the access and data they hold, and keep their evidence current.",
    headline: "Know what your vendors can reach.",
    intro:
      "Third-Party Risk Management keeps a register of vendors, the systems and data they touch, and the evidence they have supplied. Reviews are tiered by that access, so the vendor holding customer data gets more scrutiny than the one supplying office chairs.",
    covers: [
      {
        title: "Tiering by access",
        body: "Link each vendor to the assets and data it can reach, and tier reviews accordingly.",
      },
      {
        title: "Questionnaires and evidence",
        body: "Send assessments, collect reports and certificates, and track what is outstanding.",
      },
      {
        title: "Expiry tracking",
        body: "Get notice before a vendor's certificate or assessment lapses.",
      },
      {
        title: "Findings with owners",
        body: "Vendor issues are assigned to an internal owner and tracked to resolution like any other finding.",
      },
    ],
    handsTo: [
      { slug: "grc", what: "vendor evidence for supplier controls" },
      { slug: "asset-intelligence", what: "vendor-managed assets in the inventory" },
    ],
  },
  {
    slug: "grc",
    name: "Governance, Risk & Compliance",
    short: "GRC",
    line: "Map controls to frameworks once, and let the other modules supply the evidence.",
    headline: "Evidence that collects itself.",
    intro:
      "GRC maps your controls to the frameworks you report against and pulls evidence from the rest of ASH-V. Patch records, test results and vendor reviews arrive as evidence without anyone building a spreadsheet for the audit.",
    covers: [
      {
        title: "One control, many frameworks",
        body: "Map a control once to ISO/IEC 27001, NIST CSF, CIS Controls and others, and reuse the evidence across all of them.",
      },
      {
        title: "Evidence from the platform",
        body: "Remediation, testing and vendor records from other modules attach to controls as they happen.",
      },
      {
        title: "Risk register",
        body: "Record risks, link them to the assets and controls involved, and track treatment decisions.",
      },
      {
        title: "Audit-ready views",
        body: "Show an auditor each control, its owner, its evidence and when it was last tested.",
      },
    ],
    handsTo: [{ slug: "threat-exposure-management", what: "control gaps that raise exposure scores" }],
  },
];

export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);

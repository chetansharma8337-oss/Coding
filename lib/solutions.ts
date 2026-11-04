import type { ModuleSlug } from "./modules";

export type SolutionSlug = "ciso" | "security-operations" | "it-operations" | "governance-risk-compliance";

export type Solution = {
  slug: SolutionSlug;
  /** Who the page is for, as they would say it. */
  role: string;
  /** Menu line. */
  line: string;
  headline: string;
  intro: string;
  /** What this role struggles with today, in their words. */
  problems: { title: string; body: string }[];
  /** What changes with ASH-V. Bold benefit, then the detail (A5). */
  outcomes: { title: string; body: string }[];
  /** Questions this role gets asked, and where the answer comes from in ASH-V. */
  questions: { q: string; a: string }[];
  modules: ModuleSlug[];
  image: { src: string; position: string };
};

// How each team uses the six modules, within the scope in lib/modules.ts. Product to confirm.
export const solutions: Solution[] = [
  {
    slug: "ciso",
    role: "CISOs and Security Leaders",
    line: "Consolidated exposure and assurance reporting for executive and board stakeholders.",
    headline: "Exposure and Assurance Reporting for Security Leadership",
    intro:
      "Security leaders report on two questions: current exposure, and evidence that controls are effective. ASH-V answers both from the same asset record, so risk reports and audit evidence remain consistent.",
    problems: [
      {
        title: "Inconsistent Asset Counts",
        body: "Scanners, the CMDB and cloud consoles each report a different number of assets, so every metric starts with a dispute over scope.",
      },
      {
        title: "Manual Risk Reporting",
        body: "Board reports are compiled by hand from several consoles and are out of date by the time they are presented.",
      },
      {
        title: "Disconnected Exposure and Compliance Reporting",
        body: "Security teams report open critical findings while audit teams report effective controls, with no shared basis to reconcile the two.",
      },
    ],
    outcomes: [
      {
        title: "A Single Asset Baseline",
        body: "Every metric is calculated against the same asset inventory from Asset Intelligence, with an asset owner on every asset record.",
      },
      {
        title: "Business-Weighted Prioritization",
        body: "Threat Exposure Management weights each finding by asset criticality, so the top of the Exposure Queue reflects business impact.",
      },
      {
        title: "Continuous Assurance",
        body: "Verified closures, test results and vendor assessments attach to controls in GRC as evidence records when they are produced.",
      },
    ],
    questions: [
      {
        q: "Which internet-facing systems have known exploited vulnerabilities?",
        a: "The Exposure Queue, filtered to internet-facing assets and findings listed in the CISA Known Exploited Vulnerabilities (KEV) catalog.",
      },
      {
        q: "Is remediation time improving for high-criticality assets?",
        a: "Remediation time by asset criticality, measured to verified closure rather than to remediation task status.",
      },
      {
        q: "Which vendors can access customer data, and is their evidence current?",
        a: "The vendor register in Third-Party Risk Management, filtered by vendor tier and vendor evidence status.",
      },
    ],
    modules: ["asset-intelligence", "threat-exposure-management", "grc"],
    image: { src: "/images/solution-ciso.jpg", position: "50% 50%" },
  },
  {
    slug: "security-operations",
    role: "Security Operations and Vulnerability Teams",
    line: "A single Exposure Queue prioritized by reachability, known exploitation and asset ownership.",
    headline: "Risk-Based Prioritization for Vulnerability Operations",
    intro:
      "CVSS alone rates most findings as critical. ASH-V ranks each finding by reachability, known exploitation and validated attack paths, and assigns it to the asset owner.",
    problems: [
      {
        title: "Unprioritized Critical Findings",
        body: "Severity scores rate most findings as urgent, so teams either address everything or prioritize without a consistent basis.",
      },
      {
        title: "Findings Without Asset Owners",
        body: "Significant time is spent identifying who owns a host before remediation can be requested.",
      },
      {
        title: "Point-in-Time Penetration Test Reports",
        body: "Attack paths documented in an annual report are not tracked, and the environment changes before the next test.",
      },
    ],
    outcomes: [
      {
        title: "Exploitation Context on Every Finding",
        body: "Threat Exposure Management flags entries in the CISA KEV catalog and in connected threat intelligence feeds.",
      },
      {
        title: "Validation Before Prioritization",
        body: "Automated Penetration Testing identifies findings that form a validated attack path, and those findings move to the top of the Exposure Queue.",
      },
      {
        title: "Owner-Assigned Remediation",
        body: "Every finding carries the asset owner from Asset Intelligence, so remediation begins with an assignment.",
      },
    ],
    questions: [
      {
        q: "Which findings require remediation first?",
        a: "The top of the Exposure Queue: reachable, known exploited findings on high-criticality assets, with validated attack paths ranked first.",
      },
      {
        q: "Is a remediated attack path closed?",
        a: "A retest runs when a step on the path is remediated, and the result is recorded on the finding.",
      },
      {
        q: "Which assets have no scanner or agent coverage?",
        a: "The coverage gap view in Asset Intelligence lists assets that no scanner, agent or control currently covers.",
      },
    ],
    modules: ["threat-exposure-management", "automated-penetration-testing", "asset-intelligence"],
    image: { src: "/images/solution-secops.jpg", position: "50% 50%" },
  },
  {
    slug: "it-operations",
    role: "IT and Infrastructure Operations",
    line: "Owner-assigned remediation tasks with ring-based deployment and verified closure.",
    headline: "Prioritized Remediation with Ring-Based Deployment",
    intro:
      "Infrastructure teams receive remediation requests without priority or context, and closure is rarely confirmed. ASH-V assigns each team only the findings on assets it owns, deploys patches in rings and closes a finding after a verification scan.",
    problems: [
      {
        title: "Remediation Requests Without Context",
        body: "Lists of CVEs arrive without exploitation status or asset criticality.",
      },
      {
        title: "Uncontrolled Patch Deployment",
        body: "Deploying a patch to every server at once turns a security update into a service outage.",
      },
      {
        title: "Unverified Closure",
        body: "Remediation tasks are closed when marked complete, and the same finding reappears on the next scan.",
      },
    ],
    outcomes: [
      {
        title: "Assigned and Prioritized Findings",
        body: "Vulnerability & Patch Management assigns findings to the asset owner, with due dates set by the remediation policy.",
      },
      {
        title: "Ring-Based Deployment",
        body: "Patches deploy to a pilot ring first and progress in stages, and a ring is paused when a health check fails.",
      },
      {
        title: "Verified Closure",
        body: "A finding is closed when a verification scan or agent check confirms the fix, not when a remediation task changes status.",
      },
    ],
    questions: [
      {
        q: "Why is this patch a priority?",
        a: "Each finding shows its exploitation status, reachability and the asset criticality of the affected asset.",
      },
      {
        q: "Can a patch be deferred?",
        a: "Through a risk exception with a named approver and an expiry date. The finding is reopened for review when the exception expires.",
      },
      {
        q: "Did the deployment remediate the vulnerability?",
        a: "The verification scan result is recorded on the finding, with the date and the data source that confirmed it.",
      },
    ],
    modules: ["vulnerability-patch-management", "asset-intelligence", "threat-exposure-management"],
    image: { src: "/images/solution-itops.jpg", position: "50% 50%" },
  },
  {
    slug: "governance-risk-compliance",
    role: "Governance, Risk and Compliance Teams",
    line: "Cross-framework control mapping with evidence records produced by remediation, testing and vendor assessments.",
    headline: "Continuous Control Evidence for Audit Readiness",
    intro:
      "Audit preparation often depends on screenshots requested from engineering teams. ASH-V maps each control once to every framework you report against and attaches evidence records from remediation, testing and vendor assessments as they are produced.",
    problems: [
      {
        title: "Manual Evidence Collection",
        body: "Each audit requires exports and screenshots from engineering teams to demonstrate that controls operated.",
      },
      {
        title: "Duplicate Control Mapping",
        body: "ISO/IEC 27001, NIST CSF and customer security questionnaires each address the same control in different terms.",
      },
      {
        title: "Expired Vendor Evidence",
        body: "Vendor certificates and reports expire between annual reviews without notice.",
      },
    ],
    outcomes: [
      {
        title: "Cross-Framework Control Mapping",
        body: "GRC maps each control once and applies its evidence records to every framework requirement it satisfies.",
      },
      {
        title: "Operational Evidence",
        body: "Verified closures, test results and risk exceptions attach to controls from the modules that produce them.",
      },
      {
        title: "Current Vendor Evidence",
        body: "Third-Party Risk Management tracks vendor evidence expiry dates and sets assessment depth by vendor tier.",
      },
    ],
    questions: [
      {
        q: "Is there evidence that known exploited vulnerabilities are remediated within policy?",
        a: "The vulnerability management control, with verified closure records attached from Vulnerability & Patch Management.",
      },
      {
        q: "When was this control last tested, and by whom?",
        a: "Each control shows its control owner, its latest evidence records and its last control test date.",
      },
      {
        q: "Which vendor certificates expire this quarter?",
        a: "The vendor evidence expiry view in Third-Party Risk Management, filtered by vendor tier.",
      },
    ],
    modules: ["grc", "third-party-risk-management", "vulnerability-patch-management"],
    image: { src: "/images/solution-compliance.jpg", position: "50% 50%" },
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

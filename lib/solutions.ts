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

// Copy describes how each team uses the six modules. Product team: confirm against shipped scope.
export const solutions: Solution[] = [
  {
    slug: "ciso",
    role: "CISOs and security leaders",
    line: "One view of exposure and assurance you can take to the board.",
    headline: "Answer the board with one set of numbers.",
    intro:
      "Security leaders are asked two questions every quarter: what is exposed, and can we prove it is under control. ASH-V answers both from the same asset record, so the risk report and the audit pack never disagree.",
    problems: [
      {
        title: "Every tool counts the estate differently",
        body: "The scanner, the CMDB and the cloud console each report a different number of assets, so every metric starts with an argument about the denominator.",
      },
      {
        title: "Risk reports are assembled by hand",
        body: "Someone exports from five consoles into a spreadsheet the week before the board meets, and the numbers are out of date by the time they are presented.",
      },
      {
        title: "Exposure and compliance tell separate stories",
        body: "The security team reports open criticals while the audit team reports passing controls, and nobody can say how the two relate.",
      },
    ],
    outcomes: [
      {
        title: "One denominator",
        body: "Every metric is counted against the same inventory from Asset Intelligence, with an owner on every record.",
      },
      {
        title: "Exposure ranked by business impact",
        body: "Threat Exposure Management weights each finding by the criticality of the asset it sits on, so the top of the queue is what matters to the business.",
      },
      {
        title: "Assurance that collects itself",
        body: "Patch records, test results and vendor reviews attach to controls in GRC as they happen, so the audit view is current on any given day.",
      },
    ],
    questions: [
      {
        q: "Which internet facing systems carry exploited vulnerabilities right now?",
        a: "Filter the exposure queue to reachable from the internet and listed in the CISA KEV catalog.",
      },
      {
        q: "Are we fixing the important things faster than last quarter?",
        a: "Remediation times by asset criticality, measured from verified closure rather than ticket status.",
      },
      {
        q: "Which vendors can reach customer data, and are their reviews current?",
        a: "The vendor register in Third-Party Risk Management, tiered by the assets each vendor can reach.",
      },
    ],
    modules: ["asset-intelligence", "threat-exposure-management", "grc"],
    image: { src: "/images/solution-ciso.jpg", position: "50% 50%" },
  },
  {
    slug: "security-operations",
    role: "Security operations and vulnerability teams",
    line: "A ranked queue of exposures that are reachable, exploited and owned.",
    headline: "Work a queue, not a scanner export.",
    intro:
      "Vulnerability teams drown in findings that are technically critical and practically irrelevant. ASH-V ranks each exposure by whether it is reachable, whether it is exploited in the wild and whether a test has proven it, then sends it to the team that owns the asset.",
    problems: [
      {
        title: "Thousands of criticals, no order",
        body: "CVSS alone rates most findings as urgent, so the team either chases everything or picks by instinct.",
      },
      {
        title: "Findings without owners",
        body: "Hours go into working out who runs a host before anyone can ask them to patch it.",
      },
      {
        title: "Pentest results arrive as a PDF",
        body: "The annual report lists attack paths that nobody can track, and by the next test the estate has changed.",
      },
    ],
    outcomes: [
      {
        title: "Exploitation context on every finding",
        body: "Threat Exposure Management flags entries in the CISA KEV catalog and the threat intelligence you connect.",
      },
      {
        title: "Proof before priority",
        body: "Automated Penetration Testing validates which exposures chain into a working attack path, and those move to the top.",
      },
      {
        title: "Routed to the right team",
        body: "Every finding carries the owner from Asset Intelligence, so remediation starts with an assignment instead of a search.",
      },
    ],
    questions: [
      {
        q: "What should we fix first this week?",
        a: "The top of the exposure queue: reachable, exploited and on a critical asset, with validated paths ranked first.",
      },
      {
        q: "Is this path still open after the fix?",
        a: "A retest runs when a step on the path is remediated, and the result is recorded on the finding.",
      },
      {
        q: "Which assets does no scanner cover?",
        a: "The coverage gaps view in Asset Intelligence lists assets no scanner, agent or control currently sees.",
      },
    ],
    modules: ["threat-exposure-management", "automated-penetration-testing", "asset-intelligence"],
    image: { src: "/images/solution-secops.jpg", position: "50% 50%" },
  },
  {
    slug: "it-operations",
    role: "IT and infrastructure operations",
    line: "Owned remediation work with staged rollouts and verified fixes.",
    headline: "Patch what matters, in rings, with proof.",
    intro:
      "IT teams receive security requests with no context and no priority, then get asked again because nobody checked whether the fix landed. ASH-V sends each team only the work on assets they own, stages patches in rings and closes a finding when a rescan confirms it.",
    problems: [
      {
        title: "Requests without context",
        body: "A spreadsheet of CVEs arrives with no indication of which ones are exploited or which systems matter most.",
      },
      {
        title: "Big bang patching breaks things",
        body: "Rolling a patch to every server at once turns a security fix into an outage.",
      },
      {
        title: "Done is never done",
        body: "Tickets close when someone marks them complete, and the same finding reappears on the next scan.",
      },
    ],
    outcomes: [
      {
        title: "Only your assets, already ranked",
        body: "Vulnerability & Patch Management routes findings to the owning team with due dates set by your remediation policy.",
      },
      {
        title: "Ring based rollouts",
        body: "Deploy to a pilot group first, widen in stages, and pause a ring when something breaks.",
      },
      {
        title: "Closure you can trust",
        body: "A finding closes when a rescan or agent check confirms the fix, not when a ticket changes state.",
      },
    ],
    questions: [
      {
        q: "Why is this patch urgent?",
        a: "Each finding shows its exploitation status, reachability and the criticality of the asset it sits on.",
      },
      {
        q: "Can we defer this one?",
        a: "Raise an exception with a named approver and an end date, and it returns for review when it expires.",
      },
      {
        q: "Did the rollout actually fix it?",
        a: "The rescan result is recorded on the finding, with the date and the source that confirmed it.",
      },
    ],
    modules: ["vulnerability-patch-management", "asset-intelligence", "threat-exposure-management"],
    image: { src: "/images/solution-itops.jpg", position: "50% 50%" },
  },
  {
    slug: "governance-risk-compliance",
    role: "Governance, risk and compliance teams",
    line: "Controls mapped once, with evidence supplied by the rest of the platform.",
    headline: "Stop building the audit in a spreadsheet.",
    intro:
      "Compliance teams spend audit season chasing screenshots from engineers who have moved on to other work. ASH-V maps each control once to every framework you report against and attaches evidence from remediation, testing and vendor reviews as it happens.",
    problems: [
      {
        title: "Evidence is collected by hand",
        body: "Every audit means asking engineers for exports and screenshots that prove a control operated.",
      },
      {
        title: "The same control, mapped five times",
        body: "ISO/IEC 27001, NIST CSF and customer questionnaires each ask about patching in their own words.",
      },
      {
        title: "Vendor evidence goes stale",
        body: "Supplier certificates expire between annual reviews and nobody notices until a customer asks.",
      },
    ],
    outcomes: [
      {
        title: "One control, many frameworks",
        body: "GRC maps a control once and reuses its evidence across every framework it satisfies.",
      },
      {
        title: "Evidence from operations",
        body: "Patch records, test results and exceptions attach to controls automatically from the modules that produce them.",
      },
      {
        title: "Vendor reviews that stay current",
        body: "Third-Party Risk Management tracks expiry dates and tiers reviews by what each vendor can reach.",
      },
    ],
    questions: [
      {
        q: "Show me evidence that critical vulnerabilities are remediated on time.",
        a: "The vulnerability management control, with verified closure records attached from patching.",
      },
      {
        q: "When was this control last tested, and by whom?",
        a: "Each control shows its owner, its latest evidence and the date it was last tested.",
      },
      {
        q: "Which suppliers have certificates expiring this quarter?",
        a: "The expiry view in Third-Party Risk Management, filtered by tier.",
      },
    ],
    modules: ["grc", "third-party-risk-management", "vulnerability-patch-management"],
    image: { src: "/images/solution-compliance.jpg", position: "50% 50%" },
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

/** "CISOs and security leaders" stays as is; "Security operations teams" becomes "security operations teams". */
export const roleInSentence = (role: string) => (/^[A-Z]{2}/.test(role) ? role : role.charAt(0).toLowerCase() + role.slice(1));

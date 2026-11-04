import type { QA } from "@/components/sections/Faq";

// Answers stay within the module scope in lib/modules.ts. Product to confirm before launch.
export const homeFaq: QA[] = [
  {
    q: "Does ASH-V replace existing scanners and endpoint agents?",
    a: "No. Asset Intelligence consolidates data from the scanners, cloud accounts, endpoint agents, directory and CMDB already in use into one asset record per asset.",
  },
  {
    q: "Can modules be deployed individually?",
    a: "Yes. Each module reads from and writes to the same asset inventory, so additional modules can be added without a separate integration project.",
  },
  {
    q: "How are findings prioritized?",
    a: "Each finding is ranked by the asset criticality of the affected asset, its reachability, known exploitation in the CISA Known Exploited Vulnerabilities (KEV) catalog or connected threat intelligence, and whether it is part of a validated attack path.",
  },
  {
    q: "Is automated penetration testing suitable for production environments?",
    a: "Each test runs within a defined test scope: targets, exclusions and test windows. Tests run on a schedule or after major changes.",
  },
  {
    q: "When is a finding closed?",
    a: "When a verification scan or agent check confirms the fix. A change in remediation task status alone does not close a finding.",
  },
  {
    q: "Which frameworks are supported for control mapping?",
    a: "Controls can be mapped to ISO/IEC 27001, NIST CSF, the CIS Controls and other frameworks you report against. Evidence records apply to every mapped requirement.",
  },
  {
    q: "Can a risk be accepted instead of remediated?",
    a: "Yes, through a risk exception with a named approver and an expiry date. The finding is reopened for review when the exception expires.",
  },
  {
    q: "What does a platform walkthrough cover?",
    a: "Current tools are mapped to ASH-V modules, one exposure type from your environment is followed through prioritization, remediation and evidence, and a written pilot scope is provided afterwards.",
  },
];

export const walkthroughFaq: QA[] = [
  {
    q: "Is there a cost for a platform walkthrough?",
    a: "No. The walkthrough is a 30-minute session provided at no cost and with no commitment.",
  },
  {
    q: "Who should attend?",
    a: "The owner of vulnerability management or exposure reporting. Where audit evidence is in scope, a representative from GRC.",
  },
  {
    q: "What preparation is required?",
    a: "A list of current security tools and one exposure type that is difficult to remediate. The session is structured around both.",
  },
  {
    q: "Is any data shared before the session?",
    a: "No. The walkthrough uses sample data modeled on your environment. Connecting data sources is part of a pilot, if one is agreed.",
  },
  {
    q: "What is provided after the session?",
    a: "A written pilot scope covering the recommended modules, the data sources to connect and the outcomes to measure.",
  },
  {
    q: "How is the session scheduled?",
    a: "A member of the ASH-V team responds to the work email address provided to confirm a time.",
  },
];

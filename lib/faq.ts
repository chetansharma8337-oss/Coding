import type { QA } from "@/components/sections/Faq";

// Answers restate scope described in lib/modules.ts. Product team: confirm before launch.
export const homeFaq: QA[] = [
  {
    q: "Do we have to replace our scanners and agents?",
    a: "No. Asset Intelligence reads from the scanners, cloud accounts, endpoint agents and directory you already run, and merges what they see into one record per asset.",
  },
  {
    q: "Can we start with one module?",
    a: "Yes. Use the modules you need. Each one reads from and writes to the same inventory, so adding another later does not mean another reconciliation project.",
  },
  {
    q: "How does ASH-V decide what to fix first?",
    a: "Each exposure is scored against the asset it sits on: whether it is reachable, whether it is listed in the CISA Known Exploited Vulnerabilities catalog or your connected threat intelligence, how critical the asset is, and whether a test has proven it part of a working attack path.",
  },
  {
    q: "Is automated penetration testing safe to run against production?",
    a: "Tests are scoped. You define targets, exclusions and testing windows, and choose whether they run on a schedule or after major changes.",
  },
  {
    q: "When is a finding marked as fixed?",
    a: "When a rescan or agent check confirms the fix. Closing a ticket is not enough, so the number of open findings reflects the estate rather than the ticket queue.",
  },
  {
    q: "Which frameworks can controls map to?",
    a: "Map a control once to ISO/IEC 27001, NIST CSF, CIS Controls and the other frameworks you report against, and reuse its evidence across all of them.",
  },
  {
    q: "Can we accept a risk instead of fixing it?",
    a: "Yes. An exception records a named approver and an end date, and comes back for review when it expires instead of living forever.",
  },
  {
    q: "What happens in the walkthrough?",
    a: "We map the tools you run today to the modules they overlap with, follow one real exposure type from your environment through the queue, the fix and the evidence, and send you a written summary of what a pilot would cover.",
  },
];

export const walkthroughFaq: QA[] = [
  {
    q: "What does the walkthrough cost?",
    a: "Nothing. It is a 30 minute working session, and there is no commitment attached to it.",
  },
  {
    q: "Who should join from our side?",
    a: "Whoever owns vulnerability management or exposure reporting. If audit evidence is a pain point, bring someone from GRC as well.",
  },
  {
    q: "What should we prepare?",
    a: "A list of the security tools you run today and one type of exposure you struggle to close. That is enough for us to build the session around your environment.",
  },
  {
    q: "Do we need to share data before the call?",
    a: "No. The walkthrough uses sample data shaped like your estate. Connecting real sources is something a pilot would cover, and only if you decide to run one.",
  },
  {
    q: "What do we get afterwards?",
    a: "A written summary of what a pilot would cover: which modules, which data sources and which outcomes you would measure.",
  },
  {
    q: "How soon will we hear back?",
    a: "We reply to the email address you give us to agree a time.",
  },
];

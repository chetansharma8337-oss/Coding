---
name: ash-v-ux-writing
description: "ASH-V enterprise UX writing guidelines, glossary and conventions. Mandatory for every heading, label, button, status, description, tooltip, placeholder, empty state, validation message, FAQ and article on the ASH-V website. Load before writing or editing any user-facing text, and review every new or modified component against it before considering work complete. Takes precedence over the copy rules in landing-page-design."
---

# ASH-V Enterprise UX Writing Guidelines

Supplied by the ASH-V product owner. These rules govern all user-facing text on the website. Where they conflict with
another skill (notably `landing-page-design` B1 "no hyphens" and B8 "sentence case for headings and buttons"), these
rules win.

## The 20 rules

1. **Professional enterprise tone.** Formal, precise, concise and technically accurate language suitable for an
   enterprise cybersecurity, risk management and GRC platform.
2. **Industry-standard terminology.** Follow terminology used by leading enterprise platforms such as ServiceNow,
   Microsoft Security, OneTrust, Archer, CrowdStrike and Palo Alto Networks.
3. **Functional page descriptions.** Describe the actual purpose and capabilities of each page. No conversational
   explanations, rhetorical questions or informal descriptions.
4. **Professional headings.** Concise, meaningful, domain-specific headings. Prefer "Cross-Framework Control Mapping"
   to "How Controls Are Shared".
5. **Consistent naming.** One label per concept across modules, navigation, dashboards, tables, forms, charts and
   workflows. Never use multiple labels for the same concept without a functional reason.
6. **Accurate technical language.** Distinguish clearly between assessments, controls, requirements, findings, risks,
   evidence and remediation actions.
7. **Executive-level readability.** Suitable for CISOs, security managers, auditors, compliance professionals and
   executive stakeholders, without unnecessary complexity.
8. **Professional dashboard terminology.** KPI names, chart titles, legends and status labels must describe the
   underlying metric. No conversational or vague headings.
9. **Concise UI content.** Short headings; descriptions of one or two meaningful sentences; tooltips limited to
   essential information. No repetition.
10. **Action-oriented button labels.** Specific actions: Create Assessment, Submit for Review, Validate Evidence,
    Assign Risk Owner, Approve Remediation.
11. **Standardized status terminology.** Draft, In Progress, Pending Review, Approved, Rejected, Completed, Overdue,
    and the ASH-V statuses below, used consistently.
12. **No AI-generated writing patterns.** Never "Here you can", "Who is responsible for", "This page helps you",
    "Let's explore", "Nothing uploaded", "Controls that meet it", or similar.
13. **Contextual microcopy.** Placeholders, empty states, validation messages, tooltips and notifications carry real
    information without sounding conversational or overly explanatory.
14. **Consistent grammar and capitalization.** Uniform capitalization, punctuation, sentence structure, abbreviations
    and terminology. Sentence case for descriptions; title case for UI headings.
15. **Preserve regulatory terminology.** Keep official terms and identifiers from ISO/IEC 27001, NIST CSF, PCI DSS,
    CIS Controls, MITRE ATT&CK and other frameworks exactly as published.
16. **No marketing or promotional language.** Never "powerful", "seamless", "revolutionary", "cutting-edge",
    "intelligent" or similar in operational content.
17. **Understand functionality before writing.** Analyze the purpose, data, workflows and business context first.
    Never invent capabilities or change the meaning of existing functionality.
18. **Semantic accuracy.** Labels reflect the data and process exactly. Mapped Controls, Implemented Controls and
    Effective Controls are different concepts and are never interchangeable.
19. **Enterprise-grade consistency.** Every module reads as part of one commercial platform.
20. **Mandatory UX content review.** Review every new or modified frontend component for tone, terminology,
    consistency, grammar and clarity before development is complete.

**Overall standard:** ASH-V communicates with the precision, professionalism and consistency of a mature enterprise
cybersecurity platform, not with a conversational, generic or overly explanatory style.

## Capitalization

| Element | Case | Example |
| --- | --- | --- |
| Page titles (H1), section headings (H2, H3), card titles | Title Case | Cross-Framework Control Mapping |
| Navigation items, tabs, buttons, links styled as actions | Title Case | Request a Walkthrough |
| Form field labels, table column headers, KPI and chart labels, legends | Title Case | Asset Criticality |
| Status labels, tags and badges | Title Case | Pending Review |
| Eyebrow labels above headings (rendered uppercase) | Title Case in source | Data Sources |
| Descriptions, body copy, hints, captions, tooltips, validation and confirmation messages | Sentence case | Enter a work email address. |
| FAQ questions and answers | Sentence case | How is a vendor tier determined? |

Title Case keeps articles, coordinating conjunctions and prepositions of four letters or fewer in lower case unless
first or last: a, an, the, and, but, or, nor, as, at, by, for, from, in, into, of, on, per, to, via, vs, with.

## Grammar and style

- Hyphenate compound modifiers before a noun: third-party vendor, internet-facing asset, risk-based prioritization,
  30-minute walkthrough, end-of-life software.
- Headings carry no terminal period. Descriptions are complete sentences with a period.
- Use the serial comma only where needed for clarity; keep lists parallel.
- Dates: 4 Nov 2026. Times: 24-hour, 02:41.
- Abbreviations: expand on first use in a page where the audience may not know them (CISA Known Exploited
  Vulnerabilities (KEV) catalog); use CVE, CVSS, GRC, CMDB, EDR, SaaS, API, SOC 2 directly.
- No exclamation marks, no rhetorical questions, no second-person scene setting ("Imagine", "Watch").
- Sample data in illustrations is labelled "Sample data" (add a short qualifier only when needed).

## Glossary (use these labels, and only these, for these concepts)

| Concept | Label | Do not use |
| --- | --- | --- |
| Single consolidated record for one asset | Asset Record | one record, merged record |
| All asset records | Asset Inventory | estate list, the inventory of everything |
| System that reports assets (scanner, cloud account, EDR, directory, CMDB, SaaS, network discovery) | Data Source | tool, feed (except threat intelligence feed) |
| Accountable team or person for an asset | Asset Owner | owning team (in labels) |
| Business importance of an asset (High, Medium, Low) | Asset Criticality | importance, business weight |
| Asset with no owner, agent or management record | Unmanaged Asset | unknown device, mystery asset |
| Required security control missing on an asset | Coverage Gap | hole, blind spot |
| Detected weakness on an asset (vulnerability, misconfiguration or identity exposure) | Finding | issue, problem |
| Prioritized list of findings in Threat Exposure Management | Exposure Queue | ranked queue, the queue (in labels) |
| Position of a finding in the Exposure Queue | Priority Rank | position |
| Inputs to prioritization | Asset Criticality, Reachability, Known Exploitation, Validated Attack Path | signals with other names |
| Control that blocks an attack path when a patch cannot be applied | Compensating Control | workaround |
| Unit of remediation work assigned to an owner | Remediation Task | ticket (except when naming an ITSM system) |
| Deadline derived from the remediation policy | Due Date | SLA (in labels) |
| Staged patch deployment group | Deployment Ring (Ring 0 to Ring 3) | wave, rollout group |
| Approved time for installation and restart | Maintenance Window | |
| Check between rings that gates progression | Health Check | |
| Scan or agent check that confirms a fix | Verification Scan | rescan (in labels) |
| Finding closed after verification | Verified Closure | fixed, done |
| Formally accepted deferral with approver and expiry | Risk Exception | exemption, waiver |
| Chain of steps from entry point to a target asset, proven by a test | Validated Attack Path | proven path |
| Repeat test after remediation | Retest | |
| Targets, exclusions, test window and triggers | Test Scope | rules |
| External organization with access to systems or data | Vendor | supplier (except in framework or regulatory text) |
| Review depth classification | Vendor Tier (Tier 1, Tier 2, Tier 3) | |
| Questionnaire, report or certificate collected from a vendor | Vendor Evidence | |
| Organizational safeguard | Control | |
| Framework clause (A.8.8, ID.RA-01, 7.7) | Requirement | control (for a framework clause) |
| Link between a control and a framework requirement | Control Mapping | crosswalk (except as the formal term Crosswalk) |
| Proof that a control operated | Evidence Record | evidence item, screenshot |
| Accountable person for a control | Control Owner | |
| Assessment of whether a control operated as designed | Control Test | |
| Risk recorded with likelihood, impact and treatment | Risk (in the Risk Register) | |
| Risk treatment options | Mitigate, Accept, Transfer, Avoid | reduce |
| Sales session | Platform Walkthrough; action label Request a Walkthrough | demo, book a call |

## Status vocabulary

| Context | Statuses |
| --- | --- |
| Workflow (requests, exceptions, reviews) | Draft, Pending Review, Approved, Rejected, Expired |
| Remediation tasks and findings | Open, In Progress, Verified Closure, Reopened, Overdue |
| Patch deployment | Scheduled, In Progress, Paused, Completed, Failed |
| Device deployment state | Pending, Installed, Failed, Verified, Reopened |
| Controls | Effective, Ineffective, Test Overdue |
| Tests and retests | Passed, Failed |
| Vendor evidence | Current, Expiring, Expired, Requested |

## Button and link labels

Verb first, Title Case, specific: Request a Walkthrough, Submit Request, View Module, View Solution, Read Article,
View Framework Details, Assign Owner, Approve Exception, Replay Simulation. Never "Learn more", "Click here", "Go there",
"Submit" alone.

## Review checklist

- [ ] Every heading is title case, concise and domain-specific; no slogans, puns or rhetorical questions.
- [ ] Every description is one or two sentences, sentence case, functional.
- [ ] Glossary labels used; no synonyms for the same concept.
- [ ] Statuses come from the status vocabulary.
- [ ] Buttons are verb-first and specific.
- [ ] No banned patterns (rule 12) or promotional words (rule 16).
- [ ] Framework identifiers exactly as published.
- [ ] No capability claimed that the module scope in `lib/modules.ts` does not support.

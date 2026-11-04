# ASH-V website

Marketing site for ASH-V, built with Next.js 15 (App Router), Tailwind CSS 4 and Motion. The visual system follows the
landing-page-design skill in `.claude/skills/landing-page-design` (from elayadesign/ai-design-skills, MIT), with the
Apple design skill (`.claude/skills/apple-design`) informing materials and gestures.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying, so canonical URLs, the sitemap and social previews
use the real domain.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero with proof line, problem and solution, benefits, module tour, how one finding moves, tagline reveal, teams, FAQ, walkthrough form |
| `/platform` | Overview: the one record diagram, the six modules, and what each module hands to the next |
| `/platform/<module>` | Six module pages, each with its own layout and signature visual (see below) |
| `/solutions` | The four teams |
| `/solutions/<team>` | CISOs, security operations, IT operations, GRC: problems, outcomes, questions answered, modules used |
| `/frameworks` | ISO/IEC 27001:2022, NIST CSF 2.0, CIS Controls v8.1 and the CISA KEV catalog, with an example control mapping |
| `/resources` | Guides hub |
| `/resources/<guide>` | Three researched guides: the KEV catalog, CTEM, and mapping one control across frameworks |
| `/company` | Beliefs, how ASH-V works with customers, how the site writes about the product |
| `/walkthrough` | The primary conversion page: terms, agenda, form, FAQ |
| `/privacy`, `/terms` | **Draft placeholders**, marked on the page |
| `/api/walkthrough` | Validates form submissions server side |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated |

## Module pages

Each module page was planned from a review of how competing vendors present the same product (November 2026; their
sites were blocked from this environment, so the review used search excerpts, datasheets and press releases). Every
page leads with what those pages leave out, and is built from shared blocks in `components/module` around one
signature visual in its own folder. Visuals move only with transform and opacity, auto-play once in view or scrub with
scroll, and fall back to a still, fully readable version on phones and under reduced motion.

| Module | Compared with | What competitors leave out | Signature visual |
| --- | --- | --- | --- |
| Asset Intelligence | Qualys CSAM, Axonius, runZero, Armis, CrowdStrike | How duplicates merge and which source wins | Pinned scroll: five tools' views of `fin-db-02` match on shared identifiers and collapse into one record with the source of every field |
| Threat Exposure Management | Tenable One, Qualys TruRisk, CrowdStrike, Rapid7, XM Cyber, Check Point | Why a finding ranks where it does, and what drops off | Interactive re-rank: eight real CVEs and misconfigurations reorder as four signals switch on, each with its arithmetic |
| Vulnerability & Patch Management | Qualys VMDR, CrowdStrike, Tanium, Ivanti, Automox | The difference between installed and fixed | Ring track: rollout across 62 devices, a health gate pause, a rescan that re-queues one device, evidence to GRC |
| Automated Penetration Testing | Pentera, Horizon3.ai, Picus, Cymulate | What happens after the path is found | Pinned scroll: a path from the internet to `fin-db-02` builds step by step, re-ranks the queue, breaks at a fix and is retested |
| Third-Party Risk Management | SecurityScorecard, Bitsight, UpGuard, OneTrust, Prevalent | Tiering by what a vendor can actually reach | Access matrix: vendors fly into cells by reach and data sensitivity; one is given an API key and moves to Tier 1 |
| GRC | Vanta, Drata, Hyperproof, AuditBoard, ServiceNow | Evidence produced by the work, with its origin | Control fan-out: evidence travels from modules into control VM-01 and is reused by ISO/IEC 27001, NIST CSF and CIS mappings |

Public figures on these pages (Verizon DBIR 2025, NIST SP 800-40 Rev. 4, DORA, NIS2, framework control IDs, MITRE
ATT&CK technique IDs, CVE IDs and CVSS scores) link to their sources. Everything else in the visuals is sample data
and says so.

## Before launch

- **Form delivery:** `app/api/walkthrough/route.ts` only logs requests. Connect it to the sales inbox or CRM (see the `TODO`).
- **Copy to confirm:** module scope in `lib/modules.ts`, team pages in `lib/solutions.ts`, and FAQ answers in `lib/faq.ts`
  restate that scope. Two statements are new and need sign off: "the walkthrough costs nothing, with no commitment"
  (`lib/faq.ts`, walkthrough page, final call to action) and the walkthrough, pilot, rollout sequence on `/company`.
- **Module page statements to confirm:** the module pages describe how each module works in more detail than the
  original scope in `lib/modules.ts`. Product should confirm, or edit, these specifics:
  - Asset Intelligence: the matching identifiers and the example field precedence, unknown asset triage, override history.
  - Threat Exposure Management: the four signals and that compensating controls and exceptions lower a rank; the
    weights in the re-rank are illustrative.
  - Vulnerability & Patch Management: health gates that hold the next ring, maintenance windows per asset group,
    automatic re-queue of devices still vulnerable after install, the example remediation policy.
  - Automated Penetration Testing: MITRE ATT&CK technique labels on path steps, after-change triggers, what each step
    records. Safety guardrails beyond scope, exclusions and windows are deliberately not claimed; add them if they exist.
  - Third-Party Risk Management: tiering from access and data sensitivity, automatic re-tiering when access changes,
    the review depth per tier, renewal requests ahead of expiry.
  - GRC: the provenance recorded on each evidence item, owners adding evidence from outside ASH-V, risks linked to
    controls.
- **Proof:** the skill asks for testimonials, customer logos or numbers near the top. None were supplied and none were
  invented. The hero proof line states what the product does (KEV ranking, framework mapping). Add real customer proof
  when it is approved.
- **Product UI:** the interface panels in `components/previews/Previews.tsx` are coded stand-ins with sample hostnames,
  teams and vendors, labelled "Illustrative interface, sample data". The CVE IDs are real KEV entries.
- **Legal pages:** replace the placeholder text in `app/privacy` and `app/terms`. If analytics or marketing cookies are
  added later, add a consent banner where the jurisdiction requires one; the site sets no cookies today.
- **Guides and frameworks facts:** checked against the publishers' pages in October 2026 and listed under each guide
  (`lib/articles.tsx`) and framework (`lib/frameworks.ts`). Note that CISA revoked BOD 22-01 in June 2026 and replaced
  it with BOD 26-04; the copy reflects that. Review the guides at least yearly.
- **Logo:** header and footer use `public/brand/ash-v-mark.webp`; `ash-v-mark.png` is the same mark for the social preview
  (the image renderer cannot read WebP); `app/icon.png` is the favicon.

## Photography

All photos are from Pexels and Unsplash, whose licences allow free commercial use without attribution. Sources are
listed in `lib/images.ts`. Photos sit under a flat black layer (70% on heroes) so white type holds contrast over the
brightest pixel; to swap one, replace the file and keep the subject away from the left, where the headline sits.

| File | Used on | Source |
| --- | --- | --- |
| `hero-earth.jpg` | Home hero | Unsplash photo-1451187580459-43490279c0fa |
| `ops-server-room.jpg`, `statement-servers.jpg`, `team-screen.jpg`, `flow-circuit.jpg` | Home, platform, solutions index | See `lib/images.ts` |
| `module-*.jpg` | Module pages, guide covers | See `lib/images.ts` |
| `solution-ciso.jpg` | CISO page | Pexels 8730850 |
| `solution-secops.jpg` | Security operations page | Pexels 7534101 |
| `solution-itops.jpg` | IT operations page | Pexels 19226354 |
| `solution-compliance.jpg` | GRC page | Pexels 8297474 |
| `frameworks.jpg` | Frameworks page, guide cover | Unsplash photo-1460574283810-2aab119d8511 |
| `resources.jpg` | Resources hub | Pexels 8085264 |
| `company.jpg` | Company page | Pexels 7652180 |
| `walkthrough.jpg` | Walkthrough page | Pexels 6775115 |
| `og-base.jpg` | Social preview | Pexels 17194838 |

## Design system

| Rule (landing-page-design skill) | How it is applied |
| --- | --- |
| One typeface, no Inter, no italics | Geist via the `geist` package. Geist Mono only for hostnames, CVE and control IDs. No italics anywhere. |
| Tailwind type scale and named text styles | `heading-1` to `heading-6`, `title-1` to `title-5`, `body-1` to `body-8`, `button-*`, `caption-1` to `caption-6` in `app/globals.css`. Body 7, Body 8 and Caption 6 extend their groups from scale steps, as the skill allows. |
| Spacing and radius scales | Spacing uses the skill's steps only (2 to 96px). Radii are Tailwind's (`rounded-xl`, `2xl`, `3xl`, `full`). |
| No background gradients | Promo strip is flat cobalt; photo overlays are flat black. The only gradients are the hero heading text (white to `#9b9b9b` on dark, black to `#666` on light). |
| Hero heading and subheading at 680px | `HeroIntro` caps both; lines are passed pre-broken where the thought breaks. |
| Icons | Phosphor, light weight, through `ModuleIcon` and `SolutionIcon`. |
| Motion | Base curve `cubic-bezier(0.22, 1, 0.36, 1)`: 500ms for position, 300ms for colour, 700ms for reveals (`lib/springs.ts`). Sections rise 32px and fade in once, triggered by IntersectionObserver. Only transform and opacity animate. The swipe carousel keeps a spring, because it has to carry the finger's speed. |
| Navigation | A compact glass bar floating 12px below the top, centred and sized to its content. Its ink follows what is underneath (light glass over white, clear glass over photos). The phone menu is a full height frosted panel; the toggle's two lines turn into a cross; links rise 24px one after another, capped at 400ms. Current page is marked in every menu. |
| Tagline reveal | `InkParagraph`: words start at 30% and light up one at a time in reading order as they cross a trigger line, each easing in on the base curve. On the home, solution, frameworks and company pages. |
| No hyphens in copy | Rewritten throughout. Kept only in proper names and identifiers: ASH-V, Third-Party Risk Management (a module name), CVE, BOD and control IDs, which never break across lines (`NoBreak`). |
| States | Hover lift, press scale 0.98, two ring focus indicator, skeleton while the form loads, inline field errors, specific failure messages. |
| Ship list | Skip link, branded 404, privacy and terms in the footer, favicon, titles, descriptions, canonical URLs, og:image, sitemap, robots, FAQ and Article structured data, checked at 390px with no horizontal overflow. |
| Reduced motion and transparency | Movement becomes opacity; pinned sections unpin; glass turns solid under `prefers-reduced-transparency` and `prefers-contrast: more`. |

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
| `/platform/<module>` | One page per module (six) |
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

## Before launch

- **Form delivery:** `app/api/walkthrough/route.ts` only logs requests. Connect it to the sales inbox or CRM (see the `TODO`).
- **Copy to confirm:** module scope in `lib/modules.ts`, team pages in `lib/solutions.ts`, and FAQ answers in `lib/faq.ts`
  restate that scope. Two statements are new and need sign off: "the walkthrough costs nothing, with no commitment"
  (`lib/faq.ts`, walkthrough page, final call to action) and the walkthrough, pilot, rollout sequence on `/company`.
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

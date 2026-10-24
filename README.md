# ASH-V website

Marketing site for ASH-V, built with Next.js 15 (App Router), Tailwind CSS 4 and Motion. The visual system follows the supplied `DESIGN.md`: monochrome surfaces, pill controls, sky photography and a single cobalt gradient reserved for the top promo bar.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages

- `/`: hero, approach, module explorer, how a finding moves through the platform, walkthrough request form
- `/platform/<module>`: one page per module (asset intelligence, threat exposure management, vulnerability and patch management, automated penetration testing, third-party risk management, GRC)
- `/privacy`, `/terms`: **draft placeholders**, clearly marked on the page, to be replaced with legal-approved text
- `/api/walkthrough`: validates form submissions server side

## Before launch

- **Logo:** the header and footer use `public/brand/ash-v-mark.webp`, a cropped 240px export of the uploaded `ash-v-logo.png`; `app/icon.png` is the favicon made from it. Re-export both if the logo changes.
- **Form delivery:** `app/api/walkthrough/route.ts` only logs requests. Connect it to the sales inbox or CRM (see the `TODO`).
- **Copy review:** module descriptions in `lib/modules.ts` describe each module's scope. Product should confirm every item matches what ships.
- **Product UI:** the interface panels in `components/previews/Previews.tsx` are coded stand-ins with sample hostnames, teams and vendors, labelled "Illustrative interface, sample data" on the page. The CVE IDs are real entries in the CISA KEV catalog. Swap in real screenshots when available.
- **Photography:** the three sky images in `public/images` were generated procedurally because stock photo hosts were unreachable from the build environment. Replace them with licensed photography if preferred, keeping the clear sky in the upper part of the frame so white type stays readable.
- **Legal pages:** replace the placeholder text in `app/privacy` and `app/terms`.

## Design decisions

| Decision | Reason |
| --- | --- |
| DM Sans 500 for display, Inter for UI | DESIGN.md names Aeonik Pro (commercial) and lists DM Sans as a substitute; Inter is specified for UI. |
| Promo gradient ends at `#3a63e8`, not `#6fa0ff` | White text on `#6fa0ff` is 2.6:1; the deeper stop gives 5.08:1. Approved by the brand owner. |
| Scrim over sky photos | Keeps white type at 4.5:1 or better over the brightest cloud pixel; measured at 1440, 820 and 375px widths. |
| Module explorer as tabs, not a card grid | The six modules are peers; showing each one's working surface says more than six identical icon cards. |
| Hostnames in monospace | They are identifiers people copy and compare, not decoration. |
| Custom 1.5px icons with square caps | DESIGN.md asks for monochrome line icons; drawing them keeps the set specific to ASH-V instead of a library default. |
| State shown by text and border weight | DESIGN.md rules out color for state; it also keeps status readable for color-blind users. |
| Light theme only | DESIGN.md defines a light system with dark bands for nav, conversion and footer; there is no dark-mode spec to honour. |
| Motion | Follows the scroll-driven style of the DESIGN.md reference. The hero pins: the headline lifts away, the product screen rises to centre and the sky folds into a card. The platform tour pins a product screen that swaps as each module scrolls past. "How one finding moves" scrolls sideways on desktop. Headlines rise word by word, the approach paragraph darkens as you read, the statement sky settles from a zoom, and module pages stack their "covers" cards. Lenis adds inertial scrolling. With `prefers-reduced-motion` everything unpins and holds still; on phones the hero unpins so its product screen is never clipped. |

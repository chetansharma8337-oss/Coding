# ASH-V website

Marketing site for ASH-V, built with Next.js 15 (App Router), Tailwind CSS 4 and Motion. The visual system follows the supplied `DESIGN.md`: monochrome surfaces, pill controls, technology photography and a single cobalt gradient reserved for the top promo bar.

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
- **Photography:** eleven photos from Unsplash and Pexels, whose licences allow free commercial use without attribution. Each file and its source ID are listed in `lib/images.ts`. The home page uses a night view of Earth (hero), an engineer in a server room (photo band), a server rack (statement) and a team at a screen (walkthrough). Each module page has its own photo, and the "One finding" cards use a circuit board. To swap a photo, replace the file and keep its subject away from the top-left, where the headline sits.
- **Legal pages:** replace the placeholder text in `app/privacy` and `app/terms`.

## Design decisions

| Decision | Reason |
| --- | --- |
| DM Sans 500 for display, Inter for UI | DESIGN.md names Aeonik Pro (commercial) and lists DM Sans as a substitute; Inter is specified for UI. |
| Promo gradient ends at `#3a63e8`, not `#6fa0ff` | White text on `#6fa0ff` is 2.6:1; the deeper stop gives 5.08:1. Approved by the brand owner. |
| Scrim over photos | A navy overlay weighted to the top and left keeps white type at 4.5:1 or better. Measured against the brightest 1% of pixels behind the text at 1440 and 390px: 5.6:1 or better on every hero, 5.9:1 on the statement and 7.2:1 on the photo band. |
| Module explorer as tabs, not a card grid | The six modules are peers; showing each one's working surface says more than six identical icon cards. |
| Hostnames in monospace | They are identifiers people copy and compare, not decoration. |
| Custom 1.5px icons with square caps | DESIGN.md asks for monochrome line icons; drawing them keeps the set specific to ASH-V instead of a library default. |
| State shown by text and border weight | DESIGN.md rules out color for state; it also keeps status readable for color-blind users. |
| Light theme only | DESIGN.md defines a light system with dark bands for nav, conversion and footer; there is no dark-mode spec to honour. |
| Motion | Follows the scroll-driven style of the DESIGN.md reference. The hero pins: the headline lifts away, the product screen rises to centre and the photo folds into a card. The platform tour pins a product screen that swaps as each module scrolls past. "How one finding moves" scrolls sideways on desktop. Headlines rise word by word, the approach paragraph darkens as you read, the statement photo settles from a zoom, a full-width photo band opens from an inset rounded card as it reaches the middle of the screen, and module pages stack their "covers" cards. Lenis adds inertial scrolling. Entrances, menus and screen swaps use critically damped springs (`lib/springs.ts`) rather than fixed-duration curves, so they can be interrupted and never overshoot. The platform tour swaps screens in the direction you scroll and reverses on the way back. With `prefers-reduced-motion` everything unpins and holds still; on phones the hero unpins so its product screen is never clipped. |
| Glass header | Following the Apple design skill (`.claude/skills/apple-design`), the header is glass that adapts to what is behind it: clear frosted glass with white text over the photos and dark bands, bright frosted glass (72% white) with dark text over the white page, crossfading as you scroll. Dark surfaces carry `data-nav-tone="dark"`. The header samples across its width and only goes dark when everything behind it is dark, because clear glass only reads over dark while the bright glass reads over anything. The platform menu and the phone menu are light glass too; the phone menu's rows settle in one after another. All of it turns solid under `prefers-reduced-transparency` and `prefers-contrast: more`. |
| Gestures | On phones and tablets, "How one finding moves" is a swipeable card stack (`components/FlowCarousel.tsx`) built on the gesture physics in `lib/gesture.ts`. Cards track the finger 1:1 from where it grabbed. A 10px threshold decides between swiping and page scroll. Past either end the cards resist progressively (rubber-band). On release, the flick's speed projects where it would have come to rest, the nearest card is chosen, and the spring starts at the finger's speed. Cards can be grabbed mid-flight. Dots, arrows and arrow keys move one card at a time. |
| Inline feedback | The walkthrough form checks a field when you leave it, and while you type an error can only clear, never appear. Errors ease in, the topic chips' checkmarks grow in, and sending swaps the form for the confirmation with a spring. The platform tour's progress bar is also navigation: each segment glides to its module. Product screens over photos carry a deep soft shadow so the large surface reads as lifted. |
| Press feedback | Pills, menu rows, cards and form chips respond on pointer-down (a 3% or 1.5% give over 100ms) rather than on release; under reduced motion the press dims instead. Hover styles apply only on devices that can hover. |
| Type in rem, tracking per size | Text sizes are in rem so the page scales with the visitor's browser text size. Tracking tightens as size grows (-0.026em at display size, 0 for body, +0.04em for micro labels) and both fonts load their optical-size axis. DM Sans and Inter are kept over the system font because they are the brand faces in DESIGN.md. |

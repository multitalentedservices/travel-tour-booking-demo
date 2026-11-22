# PERFORMANCE PACK — Dastaan Journeys Travel & Tour Booking Demo (Queue #10)

Purpose: everything the served-preview measurement needs from the build side. The main agent serves finished sites via GitHub Pages; this pack records the measured local weights and the weight-discipline choices made so the served numbers can pass when measured. **No Lighthouse or Core Web Vitals numbers are claimed anywhere in this pack — none exist yet (see the pending section).** Filed in the 2026-11-21 top-up pass from the build's own battery output and filesystem; no figure is estimated.

## Measured weights (local, 2026-11-21, from the test battery + filesystem)
- Code (6 HTML pages + css/style.css + all js/): **79,414 B total** — budget < 400 KB, using ~20% of it (battery figure, tests-output.log).
  - Largest single file: js/logic.js (the shared data + logic module, 24,555 B).
- Media: **1,336,359 B total across 12 photographs** — budget ≤ 1.6 MB, using ~84% of it (battery figure; the 229 B favicon.svg is additional and negligible). This is the heaviest media load in the queue so far, and it is honest weight: 10 tours each carry their own photograph.
- Per-image sizes (each under the ≤ 120 KB ceiling, compressed before any HTML referenced it):
  - assets/tour-skardu.jpg — 117,792 B
  - assets/tour-dubai.jpg — 117,481 B
  - assets/tour-baku.jpg — 115,960 B
  - assets/tour-fairy.jpg — 114,303 B
  - assets/tour-istanbul.jpg — 113,747 B
  - assets/tour-swat.jpg — 112,269 B
  - assets/hero.jpg — 110,206 B
  - assets/tour-deosai.jpg — 109,317 B
  - assets/tour-neelum.jpg — 108,371 B
  - assets/tour-hunza.jpg — 107,676 B
  - assets/guide.jpg — 105,639 B
  - assets/tour-lahore.jpg — 103,598 B
  - assets/favicon.svg — 229 B (text)

## Weight-discipline choices (why the served numbers should pass)
- **Zero JavaScript libraries and zero CSS frameworks.** Hand-coded vanilla JS + one stylesheet; the only third-party request is Google Fonts (Playfair Display + Inter, `display=swap` — text renders on the fallback first, no blocked first paint waiting on font files).
- **No synchronous third-party loads beyond the font stylesheet** — no analytics, no embeds, no map tiles, no trackers; bookings and the WhatsApp log write only to the visitor's own localStorage.
- **One photograph per tour, reused** across the home signature row, the catalogue card and the tour detail hero: 10 tours are served by 10 photographs (+ hero + guide), not by per-page copies.
- **No layout-shift machinery:** card photographs sit in fixed 210px frames and the detail hero is a single framed image; cards have stable structure; no sticky elements anywhere (so full-page captures are unstitched), no popups or late-injected banners. The only animation is the hero Ken Burns drift, disabled under `prefers-reduced-motion` (reduced-motion capture set filed, 0 findings).
- **Reveal-by-default:** content is visible without JS (JS-disabled capture set filed — 18 combos, 0 findings), so first paint is HTML + CSS + the hero image only.
- **Small DOM:** the catalogue's 10 cards and the detail pages are generated from the ~25 KB logic module — one dynamic detail page serves all 10 tours, no per-tour HTML payloads.
- **Known capture observation (declared, not a weight figure):** in the filed phone full-page capture of the catalogue (screenshots/tours-phone.png) the last three cards' photographs appear as blank panels, while the desktop capture renders all ten — recorded as a defect in Component-Consistency-Pass.md. At served-preview measurement, image decode/paint timing on the 10-card catalogue should be checked first; the per-image weights above are all within ceiling, so the check is about paint timing, not payload.

## Served-preview CWV: PENDING — to be measured on the GitHub Pages preview by the main agent
- LCP / INP / CLS: **not measured** — the build is not deployed, and no numbers are estimated or invented here (honesty rule). Lab numbers from the local file:// preview are not filed in this pack because the #11–#14 pack standard records weights only until a served measurement exists.
- Expected risk points to check at measurement: the catalogue page's total image decode cost (10 photographs, ~1.1 MB of the media total, on one page — the heaviest single page in the queue), the hero image on slow mobile (110,206 B — should be the home LCP element), and the catalogue paint-timing observation declared above.
- Fixed by: the main agent deploying the GitHub Pages preview and filing a measured Lighthouse report against this pack; Area 7 of the scorecard is scored on partial (weight) evidence until then.

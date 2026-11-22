# SIGN-OFF PACK — Prepared for AICOS-112 §0 (Design Systems & Template Library)

Build: Dastaan Journeys — Travel & Tour Booking Demo, Portfolio Queue #10
Client-facing owner: BalanceBit Solutions · Production: MTS · Date prepared: 2026-11-21 (top-up pass — this build predates the pack requirement; the pack documents the site exactly as built, nothing aspirational)
Status: **prepared for AICOS-112's §0 sign-off — the sign-off itself is AICOS-112's to record; it has NOT been given yet and is not claimed anywhere in this build. One capture defect is on record against this build — see Component-Consistency-Pass.md (tours catalogue, phone capture) — and is declared here so the sign-off read sees it.**

## 1. Design-direction note
- **Identity:** "Dusk Expedition Editorial." A tour operator written the way its name promises — *dastaan*, a story told at length: warm sand paper for the reading pages, a deep plum-ink reserved for the hero, the closing band and the footer (the "dusk" surfaces), one plum accent for every action, and dusk gold allowed only as eyebrow/stat colour on the dark plum ground.
- **Register:** editorial, departure-led. The home hero pairs a serif headline with a full-height dusk photograph and a printed stat row (tours · regions · days · from-price, gold on plum). Tour cards are catalogue entries (photo → region/type tags → serif title → one-line promise → days/nights/group meta → per-person price + the same plum "View tour" button). The tour detail page follows the operator pattern the research prescribed: day-by-day itinerary in native accordions beside a price-and-departures panel (price, demo-clock note, one seat-counted departure row per date, each with its own booking button), inclusions vs exclusions side by side, and demo reviews that label themselves fictional.
- **Why it fits a tour operator:** tours are compared on itinerary, inclusions and seats — documents, not slogans. The editorial register keeps those documents calm and legible, while the dusk hero carries the romance of the product. The §0 screenshot test: this layout could not belong to a shop (no cart), a clinic, a salon or an LMS — the departures panel with live seat counts exists in no other register.
- **Distinctness from all predecessors:** no predecessor used a plum-ink dark ground with sand paper and Playfair Display. Gift Basket is cream/terracotta/emerald editorial (different serif register, shop grid), Restaurant ink/parchment/brick + Fraunces, Salon porcelain/blush/bronze + Cormorant, Clinic white/petrol, Real Estate navy/copper, Booking Engine slate SaaS skins, LMS paper/academic-green + Lora, Landing set grey/indigo/poster-orange.

## 2. Inspiration references actually used (researched 2026-11-21, as recorded in BUILD-NOTES.md)
- **Tour-operator website pattern research** (Redstack Digital's tour-operator guide, opened via search 2026-11-21): one page per tour with the same comparable structure — day-by-day itinerary, duration/group size/fitness, inclusions vs exclusions, prices, seasons and departure days, plus a booking-request form carrying date and group size. Taken: the per-tour page anatomy (itinerary accordion + inclusions/exclusions + departures panel) and the enquiry form carrying tour + date + group size. Patterns taken, no assets or text copied.
- **SafarNext, northern Pakistan tour packages** (search results opened 2026-11-21): real market shape for this demo's home turf — tours grouped by region (Gilgit-Baltistan / KPK / Kashmir), per-person PKR solo prices printed on cards (PKR 10,500–48,000), fixed weekly departure days, inclusions summarised as transport + hotels + listed meals + guide + tolls. Taken: region grouping, per-person PKR card pricing in the same real-world band, fixed departure days, and the inclusions vocabulary. No text, branding or assets copied.
- Design-Inspiration-Library (`~/workspace/mts-webdev-company/Design-Inspiration-Library.md`): the library has no travel section; its Corporate services entries (Stripe + Linear) informed only the restraint (hierarchy before decoration). This build is offered as the library's first travel reference point — the same position Queue #11's directory build took for its industry.

## 3. Palette & type token table (complete — the only colours in the build, from css/style.css `:root`)
| Token | Hex | Role |
|---|---|---|
| --paper | #F7F0E1 | Warm sand page ground |
| --ink | #2B1B2E | Deep plum-ink: body text, hero/dark-band/footer grounds |
| --plum | #6E2145 | THE accent: primary buttons, links, prices, stars, focus ring; hover darkens to #571A37 (literal in stylesheet) |
| --sand | #EADFC8 | Tinted band: alternate sections, quote/total panel, chips |
| --gold | #E8B34B | Dusk gold — eyebrow/stat colour ON THE DARK PLUM GROUND ONLY |
| --muted | #5A4A52 | Secondary text, field borders |
| --line | #D8C9A8 | Hairlines, card borders |
| --card | #FFFDF7 | Card / panel ground |
| --err | #B3261E | Semantic error red — the ONLY extra hue, form errors only |

Contrast (computed from hex in the battery, all PASS — exact values in tests-output.log and Scorecard-Verdict.md): ink on paper 14.25:1 · plum on paper 9.41:1 · muted on paper 7.30:1 · error red on paper 5.76:1 · focus 9.41:1 vs the 3:1 bar; 13 contrast assertions, every text pairing ≥ 4.5:1.

| Type token | Face | Role |
|---|---|---|
| --serif | "Playfair Display", Georgia, serif | Display: headlines, logo, prices, card titles |
| --sans | "Inter", system-ui, sans-serif | Body, forms, UI (17px base); form fields 16px (no iOS zoom) |

Component tokens: one button system (`.btn` — 52px min-height, 10px radius, 2px plum border; filled plum = primary, `.ghost` transparent/plum = secondary, `.dark` plum-ink fill = the WhatsApp role on detail pages, `.small` 44px variant for departure rows), one field system (52px, 1.5px muted border, 10px radius, bold label above, error line below in --err), one card system (card ground, 1px --line border, 14px radius, fixed 210px photo, identical body rhythm: tags → title → promise → meta → price/button foot), one tag system (pill, paper ground, line border).

## 4. Evidence filed for the sign-off read
- Full-page captures of every page at 1440 / 768 / 390 + 320px homepage probe + JS-disabled and reduced-motion sets: `screenshots/` (audit.json per set — 0 overflow / 0 leaf text-overflow / 0 broken images in every set; see the defect declaration below — the audit counts image *elements*, and one capture-level defect is visible by eye).
- Component-consistency pass, page by page: `Component-Consistency-Pass.md` (filed in the same top-up pass as this pack) — **including one recorded defect: in screenshots/tours-phone.png the last three catalogue cards' photographs render as blank panels** (the same three photographs render correctly in screenshots/tours-desktop.png, and the audit records 0 broken images — the defect is declared, not hidden, and no fix was applied in this documentation pass).
- Flow evidence: `screenshots/flow-log.txt` + flow captures (tour detail, filter empty state, booking errors, capacity boundary, confirmation TR-DEMO-9118 at PKR 130,600 exact, My Bookings, cross-surface seat restore 5 → 2 → 5 on the Hunza 5 Dec departure).
- Test battery: `tests-output.log` — 153 PASS / 0 FAIL, including the 13 contrast assertions above. One assertion amendment is disclosed in BUILD-NOTES.md ("valley" search count 4 → 3 after recount).

## 5. What AICOS-112 is asked to record
- §0 screenshot test result against §1 above (layout could not belong to another industry).
- Palette/type discipline confirmation against §3 (no stray colours in the rendered captures).
- A position on the declared tours-phone capture defect (Component-Consistency-Pass.md) alongside the sign-off: accept as a capture-timing artefact on the filed evidence, or return it to the fix queue.
- Sign-off, or defects returned as: what is wrong · where · what fixed looks like.

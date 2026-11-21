# BUILD NOTES — Dastaan Journeys, Travel & Tour Booking Demo (Portfolio Queue #10)

Client-facing owner: BalanceBit Solutions · Production: MTS · DEMO data only.
Pricing v3 mapping: Business / Booking tiers — a tour catalogue with a working booking-enquiry engine.

## Fictional operator
**Dastaan Journeys** ("dastaan" = a story told at length) — a fictional tour operator running small-group journeys from Islamabad. 10 fictional tours: 6 Northern Pakistan (Hunza, Skardu, Fairy Meadows, Swat, Neelum, Deosai), 1 Cultural Pakistan (Lahore heritage), 3 International (Istanbul, Baku, Dubai). Fictional prices in PKR per person, fictional reviews (each labelled demo in the data and in the UI), fixed demo departures.

## Design identity (own, distinct from all predecessors)
- **Dusk Expedition Editorial:** warm sand paper `#F7F0E1`, deep plum-ink `#2B1B2E` (dark ground), single plum accent `#6E2145`, sand band `#EADFC8`, dusk gold `#E8B34B` used only as an eyebrow/stat colour on the dark plum ground, muted plum-grey text `#5A4A52`, hairline `#D8C9A8`. The only extra hue is the semantic error red `#B3261E`. One accent discipline throughout — no palette creep.
- **Type:** Playfair Display (display serif, not used by any predecessor) + Inter (clean sans body).
- Distinctness: Gift Basket was cream/terracotta/emerald editorial with a different serif register and a shop grid; Restaurant was ink/parchment/brick + Fraunces; Salon porcelain/blush/bronze + Cormorant; Clinic white/petrol; Real Estate navy/copper; Booking Engine slate SaaS skins; LMS paper/academic-green + Lora; Landing set grey/indigo/poster-orange. This build's plum-ink dusk ground + sand paper + Playfair could not be mistaken for any of them, and the layout (departure-led tour detail with a price-and-seats panel) could not belong to a shop, clinic or LMS.

## References consulted (fresh research, 2026-11-21)
- **Tour-operator website pattern research** (Redstack Digital's tour-operator guide, opened via search 2026-11-21): one page per tour with the same comparable structure — day-by-day itinerary, duration/group size/fitness, inclusions vs exclusions, prices, seasons and departure days, plus a booking-request form carrying date and group size. Taken: the per-tour page anatomy (itinerary accordion + inclusions/exclusions + departures panel) and the enquiry form carrying tour + date + group size.
- **SafarNext, northern Pakistan tour packages** (search results opened 2026-11-21): real market shape for this demo's home turf — tours grouped by region (Gilgit-Baltistan / KPK / Kashmir), per-person PKR solo prices printed on cards (PKR 10,500–48,000), fixed weekly departure days, and inclusions summarised as transport + hotels + listed meals + guide + tolls. Taken: region grouping, per-person PKR card pricing in the same real-world band, fixed departure days, and the inclusions vocabulary. No text, branding or assets copied.
- Design-Inspiration-Library: no travel section exists yet; Stripe/Linear discipline entries informed only the restraint (hierarchy before decoration). This build is the library's first travel reference point.

## Features
- Pages (6): Home, Tours catalogue, Tour Detail (dynamic, `tour.html?id=`), Booking Enquiry (`book.html?tour=&date=`), My Bookings, About & Reviews.
- Catalogue: region + duration-band + search filters with live counts, 5 sorts, URL-param state kept in sync with the controls (lesson 28), empty state naming the exact constraint ("region = Cultural Pakistan, duration = 6+ days") with one-click reset.
- Tour detail: day-by-day itinerary in native `<details>` accordions with totals computed from the data (days = itinerary length, nights = days − 1, battery-asserted for all 10 tours), inclusions/exclusions, 3 deterministic departures per tour against the fixed demo clock (today = Sunday 22 November 2026, printed on the page, lesson 29), per-departure remaining seats, per-tour fictional reviews labelled demo.
- Booking enquiry: tour + departure preselected from detail; adults + children (child fare = 60% of adult fare, rounded to the nearest PKR 100 — rule printed in the UI and battery-proven incl. the 9,540 → 9,500 rounding case); add-ons with exact prices (pickup PKR 4,500 flat, private guide PKR 15,000 flat, insurance PKR 3,200 per traveller); live itemised quote; validation naming the constraint (name ≥ 3 chars, email format, PK mobile 11 digits starting 03) with errors clearing live; **capacity rule** — travellers above the departure's remaining seats are rejected with the constraint named, proven at the boundary in both battery and flow run (exactly-at-capacity passes, capacity+1 fails, lesson 33); confirmation with deterministic-style reference (flow run: TR-DEMO-9118) and exact itemised total (PKR 130,600).
- Persistence: bookings in localStorage; My Bookings lists them; cancelling **restores the departure's seats** — proven cross-surface in the flow run (Hunza 5 Dec departure: 5 seats → book 3 → 2 seats → cancel → 5 seats, lesson 30).
- Reviews: per-tour demo reviews on detail pages; About page aggregates them and offers a "write a review" form that validates (name ≥ 3, text ≥ 10), persists locally and is labelled demo.
- WhatsApp: prefilled enquiry per tour; the click is **recorded in a local demo log** (`tr_wa_log`) and asserted in the flow run (lesson 21). No sticky elements anywhere (lesson 35 — nothing needed one, so full-page captures are unstiched and clean).

## Media
- 12 real generated photos, one consistent warm dusk travel-photography style for this project: hero + 1 per tour (10) + 1 guide/supporting. Each ≤ 120 KB (103–118 KB after compression), total 1,336,359 B — inside the 1.6 MB media budget honestly, with no budget amendment needed despite 10 tour photos.
- Video: none — photo + CSS motion (hero Ken Burns drift, disabled under prefers-reduced-motion). Video generation is region-blocked (403); not attempted.

## Stack & QA
- Hand-coded HTML/CSS/vanilla JS, zero packages/CDN libs (Google Fonts only). One pure-logic module (`js/logic.js`) shared by site and Node test battery (lesson 13).
- Reveal-by-default: no JS-hidden content anywhere; JS-disabled captures filed (18 combos, 0 findings).
- Tests: 153 PASS / 0 FAIL — see `tests.js` / `tests-output.log`. Screenshots + flow run: see `screenshots/` (audit JSON per set, `flow-log.txt`, `keyboard-walk.md`).

## Disclosures
- One test assertion was amended during the build: the "valley" search count was first written as 4 from a hand count; the catalogue data matches 3 tours (Hunza Valley Classic, Swat & Kalam Green Valley, Neelum Valley Discovery), verified by recounting the data. The assertion was amended to 3 and the battery re-run — disclosed here per lesson 9, not silently.
- One piece of internal jargon ("lesson: …") was caught in user-facing copy on the tour page during the screenshot read and rewritten before the final captures; the affected sets were re-run.

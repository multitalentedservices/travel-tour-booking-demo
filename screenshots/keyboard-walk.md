# Keyboard walk — Dastaan Journeys (Demo)

Method: Playwright Tab presses at 1280px; focused element and computed outline recorded per stop. All inputs are native visible inputs/selects/buttons/checkboxes (no visually-hidden inputs, so no focus-host case arises — lesson 20 checked, recorded not applicable). Native <details> itinerary accordions are keyboard-operable by default (lesson 34). No traps observed.

| Page | Stop | Focused element | Class/id | Outline |
|---|---|---|---|---|
| Catalogue | 1 | a — Skip to content | skip | 3px solid |
| Catalogue | 2 | a — Dastaan JourneysExpeditions at dusk · Demo | logo | 3px solid |
| Catalogue | 3 | a — Home |  | 3px solid |
| Catalogue | 4 | a — Tours |  | 3px solid |
| Catalogue | 5 | a — About & Reviews |  | 3px solid |
| Catalogue | 6 | a — My Bookings |  | 3px solid |
| Catalogue | 7 | input — f-q | f-q | 3px solid |
| Catalogue | 8 | select — All regions
      Northern Pakistan
       | f-region | 3px solid |
| Catalogue | 9 | select — Any length
      1–3 days
      4–5 days
  | f-band | 3px solid |
| Booking | 1 | a — Skip to content | skip | 3px solid |
| Booking | 2 | a — Dastaan JourneysExpeditions at dusk · Demo | logo | 3px solid |
| Booking | 3 | a — Home |  | 3px solid |
| Booking | 4 | a — Tours |  | 3px solid |
| Booking | 5 | a — About & Reviews |  | 3px solid |
| Booking | 6 | a — My Bookings |  | 3px solid |
| Booking | 7 | select — Hunza Valley Classic — 5 days · PKR 48,500 | b-tour | 3px solid |
| Booking | 8 | select — Sat 5 Dec 2026 — 5 seats remainingSat 19 D | b-date | 3px solid |
| Booking | 9 | input — 2 | b-adults | 3px solid |
| Booking | 10 | input — 0 | b-children | 3px solid |

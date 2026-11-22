# COMPONENT-CONSISTENCY PASS — Dastaan Journeys Travel & Tour Booking Demo (Queue #10)

Pass run: 2026-11-21, top-up pass (this build predates the recorded-pass requirement; the pass was run retrospectively against the build's existing filed captures — no re-shoot, no code touched).
Method: every page's full-page captures read by eye (desktop 1440 + phone 390 for all pages; tablet 768 filed and covered by the audit), plus the flow captures for error/capacity states. Machine audit cross-check: `screenshots/audit.json` (+ probe320, nojs, reduced sets) — 0 overflow, 0 leaf text-overflow, 0 broken images in every set. **One defect is visible by eye in a capture although the machine audit is clean — it is recorded below as DEFECT T-1, not passed over.**
Checks per page: (1) buttons form one system · (2) fields aligned + labelled with visible error states · (3) spacing rhythm holds · (4) palette discipline (only the Signoff-Pack §3 tokens) · (5) disabled states visibly disabled where they occur.

## Per-page results

### Home (index.html) — PASS
- Captures: screenshots/index-desktop.png · index-phone.png · index-tablet.png
- Buttons: one system — filled plum "Browse all 10 tours" (primary) + gold-outlined "Why travel with us" on the plum hero (the ghost variant on dark), "View tour" filled plum on all 3 signature cards, ghost "See the full catalogue", filled plum "Read our story and demo reviews" on the dark band. Same geometry throughout (52px, 10px radius, 2px border).
- Fields: none on this page. Cards uniform (photo → tags → title → promise → meta → price/button foot); gold used only for eyebrows/stats on the plum ground, exactly per token discipline. No defects.

### Tours Catalogue (tours.html) — PASS WITH DEFECT T-1 RECORDED
- Captures: screenshots/tours-desktop.png · tours-phone.png · tours-tablet.png · flow-filter-empty.png
- Buttons/fields: "View tour" identical on all 10 cards in both captures; filter panel — Search / Region / Duration / Sort by, every control with a bold label above it, identical 52px height, border and radius, 4-across on desktop and stacked in the same order on phone; count line ("Showing 10 of 10 tours") in the same position in both.
- **DEFECT T-1 (visible, recorded, NOT fixed in this pass):** in `screenshots/tours-phone.png`, the photographs of the last three catalogue cards — **Istanbul & the Bosphorus, Baku & the Caspian, Dubai Skyline & Desert** — render as **blank cream panels**; the cards' tags, titles, prices and buttons all render, only the images are missing. The first seven cards' photographs render normally in the same capture. Cross-evidence: the same three photographs render correctly in `screenshots/tours-desktop.png` (all 10 cards photographed) and the files exist in assets/ within weight ceiling (113,747 / 115,960 / 117,481 B), and the machine audit records 0 broken images — so this is a paint/lazy-timing defect in the phone full-page render, not missing assets. It is the same visible pattern the owner flagged on earlier builds (blank panels in a full-page capture). **What fixed looks like:** the three photographs visibly rendered in a re-shot tours-phone.png under the normal scroll-through capture, as they already are on desktop. Routed to the fix queue / AICOS-112's sign-off read (see Signoff-Pack §4–§5); this documentation pass does not fix code.

### Tour Detail (tour.html) — PASS
- Captures: screenshots/tour-desktop.png · tour-phone.png · tour-tablet.png · flow-tour-detail.png
- Buttons: departure rows each carry the same `.small` plum "Book this departure" (44px variant, right-aligned with the seat count in plum); full-width filled plum "Send booking enquiry" + plum-ink "Ask on WhatsApp (demo)" — the system's primary/dark pair at the same geometry. Itinerary accordion rows uniform (day numeral in plum serif, hairline separators); Included / Not included lists in one panel system; review cards uniform with plum stars. No defects.

### Booking Enquiry (book.html) — PASS
- Captures: screenshots/book-desktop.png · book-phone.png · book-tablet.png · flow-book-errors.png · flow-book-capacity.png · flow-confirmation.png
- Fields: Tour / Departure date / Adults / Children / Lead traveller name / Mobile / Email / Notes — bold label above every field, identical 52px height, 1.5px border, 10px radius, aligned in 2-column rows on desktop and stacked on phone; add-on rows are one uniform checkbox-panel system (label + basis line left, price right in plum). The itemised total panel (sand ground) uses the same panel system on every capture.
- Error states: VISIBLE — flow-book-errors.png shows errors in the semantic error red directly under the mobile and email fields, each naming the constraint with an example ("Enter a Pakistani mobile number with 11 digits starting 03, for example 0321 1234567." / "Enter a valid email address, for example name@example.com."); flow-book-capacity.png records the capacity rejection naming the seats constraint.
- Buttons: filled plum "Confirm booking enquiry (demo)" + plum-ink "Ask on WhatsApp instead (demo)" — the primary/dark pair. No defects.

### My Bookings (bookings.html) — PASS
- Captures: screenshots/bookings-desktop.png · bookings-phone.png · bookings-tablet.png · flow-my-bookings.png
- Empty state (phone capture read): dashed panel + centred heading + the same filled-plum "Browse tours" button — the same empty-state system as the catalogue's filter-empty state. Populated state (flow-my-bookings.png): booking cards in the shared card system with cancel controls in the same button system; cancelling provably restores the departure's seats (flow log). No defects.

### About & Reviews (about.html) — PASS
- Captures: screenshots/about-desktop.png · about-phone.png · about-tablet.png
- Review cards uniform across all 9 demo reviews (plum stars → text → bold attribution → italic fiction disclaimer) in both captures; promise cards uniform; the "Write a demo review" form uses the shared field system (label above every field — name, tour select, rating select, review textarea — same heights/borders) with the filled-plum submit. Palette discipline holds (gold only in eyebrows on light ground per the eyebrow token role — on this page eyebrows render in plum on paper and gold appears only in the demo bar on the plum ground). No defects.

## Disabled states
- The stylesheet defines **no `:disabled` button style**, and no control in any filed capture or flow is disabled: the booking form enforces its capacity rule with a named error message rather than a disabled submit, and departure rows with seats remaining are all bookable in the demo data. Recorded honestly as **no disabled states exist in this build's captured flows** — nothing to verify visually, and no disabled treatment is claimed.

## Defects found
- **DEFECT T-1 — Tours catalogue, phone capture: last three cards' photographs blank.** Evidence: `screenshots/tours-phone.png` (cards: Istanbul & the Bosphorus, Baku & the Caspian, Dubai Skyline & Desert). Counter-evidence that the assets are sound: `screenshots/tours-desktop.png` renders all ten photographs; audit records 0 broken images. Severity: visible in the filed evidence; the same pattern the owner has rejected on earlier builds. **Not fixed in this pass (documentation only, per the top-up mandate) — routed to the fix queue and declared in Signoff-Pack.md §4–§5 for the AICOS-112 read.**
- No other defects: the remaining 5 pages pass on all five checks, and the catalogue passes on every check except the T-1 image panels.

## Outcome
**PASS WITH ONE DEFECT RECORDED — 6 of 6 pages checked; 5 pages fully pass, Tours Catalogue carries DEFECT T-1.** This pass changes no code and no score; it is filed as evidence for the AICOS-112 §0 read (see Signoff-Pack.md) and the owner's all-pages verification gate. The build must not be described as defect-free while T-1 stands.

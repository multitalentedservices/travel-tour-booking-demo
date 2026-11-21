/* Dastaan Journeys — shared pure logic (site + Node test battery, lesson 13).
   DEMO data only: every tour, price, review and departure below is fictional demo content.
   Fixed demo clock (lesson 29): "today" is Sunday 22 November 2026 everywhere in this demo,
   so departure dates and seat counts are deterministic and testable. */
(function (root) {
  "use strict";

  var DEMO_TODAY = "2026-11-22";
  var DEMO_TODAY_LABEL = "Sunday 22 November 2026";
  var WA_NUMBER = "923001234567"; // demo number, labelled DEMO in the UI

  function day(title, text) { return { title: title, text: text }; }

  var TOURS = [
    {
      id: "hunza-classic", title: "Hunza Valley Classic", destination: "Hunza Valley, Gilgit-Baltistan",
      region: "Northern Pakistan", days: 5, group: 16, style: "Guided group", price: 48500, img: "assets/tour-hunza.jpg",
      blurb: "Attabad Lake, Passu Cones and the Khunjerab road — the signature Hunza journey, paced gently.",
      itinerary: [
        day("Islamabad to Chilas", "Depart Islamabad at dawn and drive the Karakoram Highway, stopping for tea where the Indus bends below Nanga Parbat. Overnight in Chilas."),
        day("Chilas to Karimabad", "Continue to Gilgit and up into Hunza. Evening walk through Karimabad bazaar and sunset at the Baltit Fort viewpoint."),
        day("Attabad Lake and Passu", "Boat on the turquoise water of Attabad Lake, cross the Hussaini suspension bridge and photograph the Passu Cones at golden hour."),
        day("Khunjerab Pass day trip", "Drive to the Khunjerab Pass on the Pakistan–China border (4,693 m), the highest paved border crossing in the world, and return to Karimabad."),
        day("Karimabad to Islamabad", "Fly Gilgit to Islamabad (weather permitting) or drive the highway back, arriving in the evening.")
      ],
      includes: ["Return transport from Islamabad", "4 nights hotel (twin sharing)", "Daily breakfast and dinner", "Licensed local guide", "Attabad Lake boat tickets"],
      excludes: ["Lunches and personal snacks", "Travel insurance", "Porterage and tips", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Ayesha R.", rating: 5, text: "The Passu evening alone was worth the fare. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Daniyal K.", rating: 5, text: "Well paced, honest driving times, hot food. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "skardu-grand", title: "Skardu & Shangrila Grand Tour", destination: "Skardu, Gilgit-Baltistan",
      region: "Northern Pakistan", days: 6, group: 14, style: "Guided group", price: 62000, img: "assets/tour-skardu.jpg",
      blurb: "Shangrila's still lake, Shigar Fort and the cold desert — Skardu in one unhurried circuit.",
      itinerary: [
        day("Islamabad to Skardu", "Morning flight to Skardu (weather permitting) or the two-day highway drive. Settle in and walk the bazaar."),
        day("Shangrila and Upper Kachura", "A slow day between Lower Kachura (Shangrila) Lake and the quieter Upper Kachura Lake, with a lakeside lunch."),
        day("Shigar Fort and cold desert", "Tour the 400-year-old Shigar Fort, then drive the dunes of the Sarfaranga cold desert at sunset."),
        day("Khaplu day trip", "Drive the Indus gorge to Khaplu for its palace, old mosque and apricot orchards."),
        day("Satpara Lake and Deosai gate", "Satpara Lake in the morning; optional jeep run towards the Deosai plateau gate for high-meadow views."),
        day("Skardu to Islamabad", "Return flight or highway drive to Islamabad, arriving in the evening.")
      ],
      includes: ["Return transport from Islamabad", "5 nights hotel (twin sharing)", "Daily breakfast and dinner", "Licensed local guide", "Shigar Fort entry"],
      excludes: ["Lunches and personal snacks", "Travel insurance", "Jeep hire beyond the itinerary", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Mahnoor S.", rating: 5, text: "Shangrila at dusk looked unreal. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Chris D.", rating: 4, text: "Long drives, but the guide made them part of the trip. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "fairy-meadows", title: "Fairy Meadows & Nanga Parbat", destination: "Fairy Meadows, Diamer",
      region: "Northern Pakistan", days: 4, group: 12, style: "Trek & camp", price: 39500, img: "assets/tour-fairy.jpg",
      blurb: "Jeep track, pine forest and a meadow that faces the Killer Mountain head-on.",
      itinerary: [
        day("Islamabad to Raikot Bridge", "Drive the Karakoram Highway to Raikot Bridge, then jeeps up the famous mountain track to Tattu village."),
        day("Trek to Fairy Meadows", "A steady 3-hour trek through pine forest to the meadow. Afternoon at the reflection pond facing Nanga Parbat."),
        day("Beyal Camp viewpoint", "Optional trek to Beyal Camp and the Nanga Parbat base-camp viewpoint; return to the meadow for a bonfire night."),
        day("Descend and return", "Trek down, jeeps to Raikot and the highway drive back to Islamabad by evening.")
      ],
      includes: ["Return transport from Islamabad", "3 nights (hotel + meadow cottages)", "Daily breakfast and dinner", "Jeep track transfers", "Trek guide and porters for group kit"],
      excludes: ["Personal porter", "Travel insurance", "Trekking gear hire", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Hamza T.", rating: 5, text: "Woke up facing Nanga Parbat. Nothing else to say. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Elena P.", rating: 5, text: "The jeep track is an adventure by itself. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "swat-green", title: "Swat & Kalam Green Valley", destination: "Swat Valley, Khyber Pakhtunkhwa",
      region: "Northern Pakistan", days: 3, group: 18, style: "Family leisure", price: 24500, img: "assets/tour-swat.jpg",
      blurb: "Riverside hotels, the Malam Jabba chairlift and Kalam's pine valleys — the easy green escape.",
      itinerary: [
        day("Islamabad to Mingora and Malam Jabba", "Motorway drive to Swat, then up to Malam Jabba for the chairlift and zipline viewpoint. Overnight in Mingora."),
        day("Mingora to Kalam", "Drive the Swat river road to Kalam via Bahrain, with trout lunch on the riverbank."),
        day("Ushu forest and return", "Morning in the Ushu pine forest and Mahodand Lake road (as far as conditions allow), then drive back to Islamabad.")
      ],
      includes: ["Return transport from Islamabad", "2 nights hotel (twin sharing)", "Daily breakfast and dinner", "Tour guide", "Malam Jabba chairlift ticket"],
      excludes: ["Lunches and personal snacks", "Travel insurance", "Mahodand jeep hire", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Sana F.", rating: 4, text: "Perfect first family trip up north. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Imran A.", rating: 5, text: "Kids loved the chairlift. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "neelum-discovery", title: "Neelum Valley Discovery", destination: "Neelum Valley, Azad Kashmir",
      region: "Northern Pakistan", days: 4, group: 16, style: "Family leisure", price: 28900, img: "assets/tour-neelum.jpg",
      blurb: "The river road to Sharda and the climb to Arang Kel, Kashmir's greenest valley at a family pace.",
      itinerary: [
        day("Islamabad to Keran", "Drive via Muzaffarabad along the Neelum river to Keran, with a stop at the Dhani waterfall."),
        day("Sharda and Kel", "Continue to Sharda's riverside ruins, then jeeps and a short hike up to the meadow village of Arang Kel."),
        day("Arang Kel and Taobat road", "A slow morning in Arang Kel; optional drive towards Taobat, the last village of the valley."),
        day("Return to Islamabad", "Drive the valley road back, stopping for Kashmiri tea in Muzaffarabad, arriving by evening.")
      ],
      includes: ["Return transport from Islamabad", "3 nights hotel/guesthouse (twin sharing)", "Daily breakfast and dinner", "Tour guide", "Arang Kel jeep transfers"],
      excludes: ["Lunches and personal snacks", "Travel insurance", "Cable car / doli charges at Arang Kel", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Rabia N.", rating: 5, text: "Arang Kel at sunrise is a painting. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Usman G.", rating: 4, text: "Roads are rough, views are not. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "deosai-expedition", title: "Deosai Plains Expedition", destination: "Deosai National Park, Skardu",
      region: "Northern Pakistan", days: 5, group: 10, style: "Expedition", price: 54000, img: "assets/tour-deosai.jpg",
      blurb: "The world's second-highest plateau by 4x4 — Sheosar Lake, wildflower meadows and brown-bear country.",
      itinerary: [
        day("Islamabad to Skardu", "Flight or highway drive to Skardu; expedition briefing and kit check in the evening."),
        day("Into Deosai: Sadpara to Sheosar", "4x4s climb from Sadpara Lake onto the plateau, ending at Sheosar Lake for sunset. Camp night."),
        day("Across the plateau", "A full day crossing Deosai's meadows and streams, watching for Himalayan marmots and, with luck, brown bears at distance."),
        day("Bara Pani and return to Skardu", "Cross the Bara Pani bridge and descend to Skardu for a hot shower and a celebration dinner."),
        day("Skardu to Islamabad", "Return flight or highway drive to Islamabad.")
      ],
      includes: ["Return transport from Islamabad", "4 nights (hotel + expedition camp)", "All meals on the plateau", "4x4 vehicles and expedition crew", "National park entry permits"],
      excludes: ["Personal travel insurance (mandatory to arrange yourself)", "Sleeping bag hire", "Tips for the crew", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Jorge M.", rating: 5, text: "The plateau feels like the roof of the world. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Hira B.", rating: 5, text: "Cold nights, endless sky. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "lahore-heritage", title: "Lahore Heritage Weekend", destination: "Lahore, Punjab",
      region: "Cultural Pakistan", days: 2, group: 20, style: "Cultural", price: 15900, img: "assets/tour-lahore.jpg",
      blurb: "Badshahi Mosque, the Fort and the Walled City's food streets — Lahore in one rich weekend.",
      itinerary: [
        day("The Mughal city", "Guided morning at Lahore Fort and Badshahi Mosque, afternoon in the restored Walled City lanes and Delhi Gate, dinner on Food Street facing the Fort."),
        day("Gardens and museums", "Shalimar Gardens at opening time, the Lahore Museum, and a rickshaw run down the Mall before departure.")
      ],
      includes: ["Local air-conditioned transport in Lahore", "1 night hotel (twin sharing)", "Breakfast and Food Street dinner", "Licensed heritage guide", "All monument entry tickets"],
      excludes: ["Travel to Lahore", "Lunches and personal snacks", "Travel insurance", "Anything not listed under inclusions"],
      reviews: [
        { name: "Demo review — Natasha V.", rating: 5, text: "The guide's stories made the Fort come alive. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Ali H.", rating: 4, text: "Food Street at night is a must. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "istanbul-bosphorus", title: "Istanbul & the Bosphorus", destination: "Istanbul, Türkiye",
      region: "International", days: 5, group: 15, style: "Cultural", price: 189000, img: "assets/tour-istanbul.jpg",
      blurb: "Two continents in one city — Sultanahmet's domes, a Bosphorus cruise and the Grand Bazaar.",
      itinerary: [
        day("Arrive in Istanbul", "Airport pickup and hotel check-in in Sultanahmet. Evening walk to the illuminated Blue Mosque square."),
        day("Old city classics", "Hagia Sophia, the Blue Mosque, Topkapi Palace courtyards and the Basilica Cistern with a local guide."),
        day("Bosphorus and bazaars", "Morning Bosphorus cruise between two continents, afternoon in the Grand Bazaar and Spice Market."),
        day("Asian side and Galata", "Ferry to Kadikoy's food streets, return via the Galata Tower at sunset."),
        day("Departure", "Free morning for last shopping; airport transfer for your flight home.")
      ],
      includes: ["Airport pickup and drop in Istanbul", "4 nights hotel (twin sharing)", "Daily breakfast", "Local English-speaking guide", "Bosphorus cruise ticket"],
      excludes: ["International flights", "Visa fees", "Lunches, dinners and personal expenses", "Travel insurance"],
      reviews: [
        { name: "Demo review — Kamran S.", rating: 5, text: "Cruise at dusk, bazaar by day — perfectly ordered. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Priya R.", rating: 4, text: "Great hotel location, two minutes from the tram. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "baku-caspian", title: "Baku & the Caspian", destination: "Baku, Azerbaijan",
      region: "International", days: 4, group: 15, style: "City break", price: 154000, img: "assets/tour-baku.jpg",
      blurb: "Flame Towers over a medieval old city, mud volcanoes and fire temples — the Caspian's surprise city break.",
      itinerary: [
        day("Arrive in Baku", "Airport pickup, boulevard walk along the Caspian and dinner in the old city."),
        day("Old city and Flame Towers", "Icherisheher's Maiden Tower and Shirvanshah Palace, then the Flame Towers viewpoint and Highland Park at sunset."),
        day("Gobustan and Ateshgah", "Day trip to Gobustan's rock carvings and mud volcanoes, ending at the Ateshgah fire temple."),
        day("Departure", "Free morning on Nizami Street; airport transfer for your flight home.")
      ],
      includes: ["Airport pickup and drop in Baku", "3 nights hotel (twin sharing)", "Daily breakfast", "Local English-speaking guide", "Gobustan day-trip transport"],
      excludes: ["International flights", "E-visa fees", "Lunches, dinners and personal expenses", "Travel insurance"],
      reviews: [
        { name: "Demo review — Fatima Z.", rating: 5, text: "Old city by day, flames by night. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — David O.", rating: 5, text: "Mud volcanoes were the surprise highlight. Demo review — fictional, written for this portfolio demo." }
      ]
    },
    {
      id: "dubai-skyline", title: "Dubai Skyline & Desert", destination: "Dubai, UAE",
      region: "International", days: 4, group: 20, style: "City break", price: 172000, img: "assets/tour-dubai.jpg",
      blurb: "Burj Khalifa at dusk, old Dubai's creek abras and a red-dune desert evening.",
      itinerary: [
        day("Arrive in Dubai", "Airport pickup and hotel check-in. Evening at the Dubai Fountain and Burj Khalifa observation deck."),
        day("Old and new Dubai", "Al Fahidi's wind-tower lanes, an abra ride across the Creek, the gold and spice souks, then Palm Jumeirah."),
        day("Desert evening", "Free morning; afternoon dune drive, camel farm stop and a desert-camp dinner under the stars."),
        day("Departure", "Last-morning mall run or beach walk; airport transfer for your flight home.")
      ],
      includes: ["Airport pickup and drop in Dubai", "3 nights hotel (twin sharing)", "Daily breakfast", "Burj Khalifa standard ticket", "Desert evening with dinner"],
      excludes: ["International flights", "Visa fees", "Lunches and personal expenses", "Travel insurance"],
      reviews: [
        { name: "Demo review — Omar F.", rating: 4, text: "Fountain show from the deck level is special. Demo review — fictional, written for this portfolio demo." },
        { name: "Demo review — Grace L.", rating: 5, text: "The desert dinner was the family's favourite night. Demo review — fictional, written for this portfolio demo." }
      ]
    }
  ];

  /* Departure dates pool (all after the fixed demo clock). Each tour offers 3,
     chosen deterministically from the pool by its index. */
  var DATE_POOL = ["2026-12-05", "2026-12-12", "2026-12-19", "2027-01-09", "2027-01-23", "2027-02-06"];
  var DATE_LABELS = {
    "2026-12-05": "Sat 5 Dec 2026", "2026-12-12": "Sat 12 Dec 2026", "2026-12-19": "Sat 19 Dec 2026",
    "2027-01-09": "Sat 9 Jan 2027", "2027-01-23": "Sat 23 Jan 2027", "2027-02-06": "Sat 6 Feb 2027"
  };

  function hashStr(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; } return h; }

  function getTour(id) { for (var i = 0; i < TOURS.length; i++) if (TOURS[i].id === id) return TOURS[i]; return null; }
  function nights(tour) { return tour.days - 1; }
  function itineraryTotals(tour) { return { days: tour.itinerary.length, nights: tour.itinerary.length - 1 }; }

  function departuresFor(tour) {
    var idx = TOURS.indexOf(tour);
    var out = [];
    for (var k = 0; k < 3; k++) {
      var date = DATE_POOL[(idx + k * 2) % DATE_POOL.length];
      var taken = hashStr(tour.id + "|" + date) % (tour.group - 3);
      out.push({ date: date, label: DATE_LABELS[date], total: tour.group, taken: taken, baseRemaining: tour.group - taken });
    }
    return out;
  }

  /* Seats remaining after active (non-cancelled) bookings are applied. */
  function seatsRemaining(tour, date, bookings) {
    var dep = null, deps = departuresFor(tour);
    for (var i = 0; i < deps.length; i++) if (deps[i].date === date) dep = deps[i];
    if (!dep) return 0;
    var used = 0;
    (bookings || []).forEach(function (b) {
      if (b.tourId === tour.id && b.date === date && b.status !== "cancelled") used += (b.adults + b.children);
    });
    return dep.baseRemaining - used;
  }

  var REGIONS = ["Northern Pakistan", "Cultural Pakistan", "International"];
  var BANDS = [
    { id: "short", label: "1–3 days", test: function (d) { return d <= 3; } },
    { id: "mid", label: "4–5 days", test: function (d) { return d >= 4 && d <= 5; } },
    { id: "long", label: "6+ days", test: function (d) { return d >= 6; } }
  ];

  function filterTours(f) {
    f = f || {};
    return TOURS.filter(function (t) {
      if (f.region && f.region !== "all" && t.region !== f.region) return false;
      if (f.band && f.band !== "all") {
        var band = null; BANDS.forEach(function (b) { if (b.id === f.band) band = b; });
        if (band && !band.test(t.days)) return false;
      }
      if (f.q) {
        var hay = (t.title + " " + t.destination + " " + t.region + " " + t.style).toLowerCase();
        if (hay.indexOf(String(f.q).toLowerCase().trim()) === -1) return false;
      }
      return true;
    });
  }

  function sortTours(list, sort) {
    var out = list.slice();
    if (sort === "price-asc") out.sort(function (a, b) { return a.price - b.price; });
    else if (sort === "price-desc") out.sort(function (a, b) { return b.price - a.price; });
    else if (sort === "days-asc") out.sort(function (a, b) { return a.days - b.days; });
    else if (sort === "days-desc") out.sort(function (a, b) { return b.days - a.days; });
    return out;
  }

  /* Pricing. Child price rule (stated in the UI): 60% of the adult per-person price,
     rounded to the nearest PKR 100. Add-ons: pickup and private guide are flat per booking;
     insurance is per traveller. */
  var ADDONS = [
    { id: "pickup", name: "Home / airport pickup", detail: "Flat, per booking", price: 4500, per: "booking" },
    { id: "guide", name: "Private guide upgrade", detail: "Flat, per booking", price: 15000, per: "booking" },
    { id: "insurance", name: "Travel insurance", detail: "Per traveller", price: 3200, per: "traveller" }
  ];
  function childPrice(tour) { return Math.round(tour.price * 0.6 / 100) * 100; }
  function quote(tour, adults, children, addonIds) {
    var travellers = adults + children;
    var lines = [
      { label: "Adults: " + adults + " × PKR " + fmt(tour.price), amount: adults * tour.price },
      { label: "Children: " + children + " × PKR " + fmt(childPrice(tour)) + " (60% child fare)", amount: children * childPrice(tour) }
    ];
    if (children === 0) lines.pop();
    if (adults === 0) lines.shift();
    var total = adults * tour.price + children * childPrice(tour);
    (addonIds || []).forEach(function (id) {
      ADDONS.forEach(function (a) {
        if (a.id === id) {
          var amt = a.per === "traveller" ? a.price * travellers : a.price;
          lines.push({ label: a.name + (a.per === "traveller" ? ": " + travellers + " × PKR " + fmt(a.price) : " (flat)"), amount: amt });
          total += amt;
        }
      });
    });
    return { lines: lines, total: total, travellers: travellers };
  }

  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function pkr(n) { return "PKR " + fmt(n); }

  function normalizePhone(p) { return String(p || "").replace(/[\s-]/g, ""); }
  function validPhone(p) { return /^03\d{9}$/.test(normalizePhone(p)); }
  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e || "").trim()); }

  /* Validation messages NAME the constraint (lesson 25). */
  function validateEnquiry(v) {
    var errs = {};
    if (!v.name || v.name.trim().length < 3) errs.name = "Enter the lead traveller's full name (at least 3 characters).";
    if (!validEmail(v.email)) errs.email = "Enter a valid email address, for example name@example.com.";
    if (!validPhone(v.phone)) errs.phone = "Enter a Pakistani mobile number with 11 digits starting 03, for example 0321 1234567.";
    if (!v.tourId || !getTour(v.tourId)) errs.tour = "Choose a tour to book.";
    if (!v.date) errs.date = "Choose a departure date.";
    return errs;
  }

  function capacityError(tour, date, travellers, bookings) {
    var left = seatsRemaining(tour, date, bookings);
    if (travellers > left) {
      return "Only " + left + " seat" + (left === 1 ? "" : "s") + " remain on the " + (DATE_LABELS[date] || date) +
        " departure of " + tour.title + " — reduce travellers to " + left + " or fewer, or choose another departure date.";
    }
    return "";
  }

  /* Deterministic-style booking reference (lesson: same inputs -> same ref). */
  function makeRef(tourId, date, travellers, name) {
    var n = 1000 + (hashStr(tourId + "|" + date + "|" + travellers + "|" + String(name || "").trim().toLowerCase()) % 9000);
    return "TR-DEMO-" + n;
  }

  function waLink(tour, dateLabel) {
    var text = "Hello Dastaan Journeys (DEMO), I am interested in the " + tour.title + " tour (" + tour.days + " days, " + pkr(tour.price) + " per person)" +
      (dateLabel ? " departing " + dateLabel : "") + ". Please share details.";
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }
  function waText(tour, dateLabel) {
    return decodeURIComponent(waLink(tour, dateLabel).split("text=")[1]);
  }

  var api = {
    DEMO_TODAY: DEMO_TODAY, DEMO_TODAY_LABEL: DEMO_TODAY_LABEL, WA_NUMBER: WA_NUMBER,
    TOURS: TOURS, REGIONS: REGIONS, BANDS: BANDS, ADDONS: ADDONS, DATE_LABELS: DATE_LABELS,
    getTour: getTour, nights: nights, itineraryTotals: itineraryTotals, departuresFor: departuresFor,
    seatsRemaining: seatsRemaining, filterTours: filterTours, sortTours: sortTours,
    childPrice: childPrice, quote: quote, fmt: fmt, pkr: pkr,
    normalizePhone: normalizePhone, validPhone: validPhone, validEmail: validEmail,
    validateEnquiry: validateEnquiry, capacityError: capacityError, makeRef: makeRef,
    waLink: waLink, waText: waText, hashStr: hashStr
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.TravelLogic = api;
})(typeof window !== "undefined" ? window : globalThis);

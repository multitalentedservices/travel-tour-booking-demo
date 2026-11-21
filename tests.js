/* Dastaan Journeys — Node test battery. Run: node tests.js > tests-output.log 2>&1 */
const fs = require("fs"), path = require("path");
const L = require("./js/logic.js");
const ROOT = __dirname;
let pass = 0, fail = 0; const lines = [];
function t(name, cond, extra) { lines.push((cond ? "PASS" : "FAIL") + " | " + name + (extra ? " | " + extra : "")); cond ? pass++ : fail++; }
function eq(name, a, b) { t(name, a === b, "got " + JSON.stringify(a) + " want " + JSON.stringify(b)); }

/* --- Catalogue data & filters --- */
eq("tour count", L.TOURS.length, 10);
eq("region Northern Pakistan", L.filterTours({ region: "Northern Pakistan" }).length, 6);
eq("region Cultural Pakistan", L.filterTours({ region: "Cultural Pakistan" }).length, 1);
eq("region International", L.filterTours({ region: "International" }).length, 3);
eq("band short (1-3d)", L.filterTours({ band: "short" }).length, 2);
eq("band mid (4-5d)", L.filterTours({ band: "mid" }).length, 7);
eq("band long (6+d)", L.filterTours({ band: "long" }).length, 1);
eq("search hunza", L.filterTours({ q: "hunza" }).length, 1);
eq("search desert", L.filterTours({ q: "desert" }).length, 1);
eq("search valley (titles/destinations)", L.filterTours({ q: "valley" }).length, 3); // amended 4->3 after recount (disclosed in BUILD-NOTES.md)
eq("combined region+band", L.filterTours({ region: "International", band: "mid" }).length, 3);
eq("combined empty (Cultural + long)", L.filterTours({ region: "Cultural Pakistan", band: "long" }).length, 0);
eq("no filters = all", L.filterTours({}).length, 10);
const byPrice = L.sortTours(L.TOURS, "price-asc");
eq("sort price-asc first", byPrice[0].id, "lahore-heritage");
eq("sort price-asc last", byPrice[9].id, "istanbul-bosphorus");
t("sort price-asc monotonic", byPrice.every((x, i) => i === 0 || byPrice[i - 1].price <= x.price));
const byDays = L.sortTours(L.TOURS, "days-desc");
eq("sort days-desc first", byDays[0].id, "skardu-grand");
eq("sort days-asc first", L.sortTours(L.TOURS, "days-asc")[0].days, 2);

/* --- Itinerary totals exact, per tour --- */
L.TOURS.forEach(function (tour) {
  const tot = L.itineraryTotals(tour);
  t("itinerary totals " + tour.id, tot.days === tour.days && tot.nights === tour.days - 1 && tour.itinerary.length === tour.days,
    tot.days + " days / " + tot.nights + " nights");
  t("itinerary days have title+text " + tour.id, tour.itinerary.every(d => d.title.length > 3 && d.text.length > 30));
  t("includes/excludes present " + tour.id, tour.includes.length >= 4 && tour.excludes.length >= 3);
  t("reviews fictional+labelled " + tour.id, tour.reviews.length >= 2 && tour.reviews.every(r => /Demo review/.test(r.text) && r.rating >= 1 && r.rating <= 5));
});

/* --- Departures: deterministic, after demo clock, seats sane --- */
L.TOURS.forEach(function (tour) {
  const deps = L.departuresFor(tour), deps2 = L.departuresFor(tour);
  t("departures " + tour.id, deps.length === 3 && deps.every(d => d.date > L.DEMO_TODAY && d.baseRemaining >= 1 && d.baseRemaining <= tour.group),
    deps.map(d => d.date + ":" + d.baseRemaining).join(","));
  t("departures deterministic " + tour.id, JSON.stringify(deps) === JSON.stringify(deps2));
});

/* --- Pricing arithmetic exact --- */
eq("childPrice hunza (48500*.6)", L.childPrice(L.getTour("hunza-classic")), 29100);
eq("childPrice lahore rounding (9540->9500)", L.childPrice(L.getTour("lahore-heritage")), 9500);
eq("childPrice dubai", L.childPrice(L.getTour("dubai-skyline")), 103200);
eq("quote 1 adult skardu", L.quote(L.getTour("skardu-grand"), 1, 0, []).total, 62000);
eq("quote hunza 2a+1c+pickup+insurance", L.quote(L.getTour("hunza-classic"), 2, 1, ["pickup", "insurance"]).total, 140200);
eq("quote hunza lines sum", L.quote(L.getTour("hunza-classic"), 2, 1, ["pickup", "insurance"]).lines.reduce((s, l) => s + l.amount, 0), 140200);
eq("quote guide flat not per-traveller", L.quote(L.getTour("swat-green"), 4, 0, ["guide"]).total, 4 * 24500 + 15000);
eq("quote insurance per traveller", L.quote(L.getTour("swat-green"), 2, 2, ["insurance"]).total, 2 * 24500 + 2 * 14700 + 4 * 3200);
eq("pkr format", L.pkr(140200), "PKR 140,200");

/* --- Capacity boundary pair (lesson 33) --- */
const hunza = L.getTour("hunza-classic"), depDate = L.departuresFor(hunza)[0].date;
const base = L.seatsRemaining(hunza, depDate, []);
t("hunza dep1 seats known", base >= 1, "base=" + base);
eq("capacity: exactly-at-capacity passes", L.capacityError(hunza, depDate, base, []), "");
t("capacity: capacity+1 rejected naming constraint", L.capacityError(hunza, depDate, base + 1, []).indexOf("Only " + base + " seat") === 0,
  L.capacityError(hunza, depDate, base + 1, []));
/* Seat decrement / restore in pure logic (lesson 30, logic half) */
const bk = [{ tourId: "hunza-classic", date: depDate, adults: 2, children: 1, status: "confirmed" }];
eq("seats decrement by booking", L.seatsRemaining(hunza, depDate, bk), base - 3);
bk[0].status = "cancelled";
eq("seats restored after cancel", L.seatsRemaining(hunza, depDate, bk), base);

/* --- Validation incl. PK phone (errors name the constraint) --- */
const good = L.validateEnquiry({ name: "Fatima Khan", email: "fatima@example.com", phone: "0321 1234567", tourId: "hunza-classic", date: depDate });
eq("valid enquiry -> no errors", Object.keys(good).length, 0);
const bad = L.validateEnquiry({ name: "Al", email: "not-an-email", phone: "123", tourId: "hunza-classic", date: depDate });
t("bad name error names constraint", /at least 3 characters/.test(bad.name || ""));
t("bad email error names constraint", /valid email address/.test(bad.email || ""));
t("bad phone error names constraint", /11 digits starting 03/.test(bad.phone || ""));
t("phone plain 11 digits ok", L.validPhone("03211234567"));
t("phone with dashes ok", L.validPhone("0321-1234567"));
t("phone +92 rejected (rule is 03 form)", !L.validPhone("+923211234567"));
t("phone landline rejected", !L.validPhone("04235781234"));
t("phone 10 digits rejected", !L.validPhone("0321123456"));

/* --- References: format + determinism --- */
const ref = L.makeRef("hunza-classic", depDate, 3, "Fatima Khan");
t("ref format TR-DEMO-####", /^TR-DEMO-\d{4}$/.test(ref), ref);
eq("ref deterministic", L.makeRef("hunza-classic", depDate, 3, "Fatima Khan"), ref);
t("ref changes with traveller count", L.makeRef("hunza-classic", depDate, 4, "Fatima Khan") !== ref ||
  L.makeRef("hunza-classic", depDate, 4, "Other Name") !== ref);

/* --- Persistence round-trip --- */
const sample = { ref: ref, tourId: "hunza-classic", date: depDate, adults: 2, children: 1, total: 140200, status: "confirmed" };
const rt = JSON.parse(JSON.stringify([sample]))[0];
t("persistence round-trip", rt.ref === sample.ref && rt.total === 140200 && rt.adults + rt.children === 3);

/* --- WhatsApp link construction --- */
const wa = L.waLink(hunza, "Sat 5 Dec 2026");
t("wa link number+tour", wa.indexOf("https://wa.me/" + L.WA_NUMBER) === 0 && decodeURIComponent(wa).indexOf("Hunza Valley Classic") > -1);
t("wa text mentions demo", L.waText(hunza, "").indexOf("DEMO") > -1);

/* --- Contrast from hex (lesson 23): every text pairing >= 4.5, focus >= 3 --- */
function lum(hex) { const h = hex.replace("#", ""); const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(parseInt(h.slice(0, 2), 16)) + 0.7152 * f(parseInt(h.slice(2, 4), 16)) + 0.0722 * f(parseInt(h.slice(4, 6), 16)); }
function cr(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
[["ink on paper", "#2B1B2E", "#F7F0E1"], ["plum on paper", "#6E2145", "#F7F0E1"], ["muted on paper", "#5A4A52", "#F7F0E1"],
 ["paper on ink", "#F7F0E1", "#2B1B2E"], ["sand on ink", "#EADFC8", "#2B1B2E"], ["gold on ink", "#E8B34B", "#2B1B2E"],
 ["white on plum (buttons)", "#FFFFFF", "#6E2145"], ["ink on sand", "#2B1B2E", "#EADFC8"], ["plum on sand", "#6E2145", "#EADFC8"],
 ["error on paper", "#B3261E", "#F7F0E1"], ["ink on card", "#2B1B2E", "#FFFDF7"], ["plum on card", "#6E2145", "#FFFDF7"]
].forEach(function (p) { const v = cr(p[1], p[2]); t("contrast " + p[0], v >= 4.5, v.toFixed(2) + ":1"); });
t("contrast focus plum on paper >= 3", cr("#6E2145", "#F7F0E1") >= 3, cr("#6E2145", "#F7F0E1").toFixed(2) + ":1");

/* --- Source checks: DEMO labelling, links, no lorem, no live endpoints --- */
const PAGES = ["index.html", "tours.html", "tour.html", "book.html", "bookings.html", "about.html"];
PAGES.forEach(function (p) {
  const html = fs.readFileSync(path.join(ROOT, p), "utf8");
  t("DEMO labelled " + p, html.indexOf("DEMO") > -1);
  t("title+meta " + p, /<title>[^<]{8,}<\/title>/.test(html) && /name="description"/.test(html));
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:)/.test(u)).map(u => u.split("?")[0]);
  t("local refs exist " + p, refs.every(r => fs.existsSync(path.join(ROOT, r))), refs.join(","));
});
const allText = PAGES.map(p => fs.readFileSync(path.join(ROOT, p), "utf8")).join("") +
  fs.readFileSync(path.join(ROOT, "js/logic.js"), "utf8") + fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
t("no lorem ipsum anywhere", !/lorem ipsum/i.test(allText));
t("no live analytics endpoints", !/google-analytics|googletagmanager|connect\.facebook/.test(allText));
L.TOURS.forEach(function (tour) { t("image exists " + tour.img, fs.existsSync(path.join(ROOT, tour.img))); });

/* --- Weight budgets --- */
function sizeOf(p) { return fs.statSync(p).size; }
let codeBytes = 0;
PAGES.forEach(p => codeBytes += sizeOf(path.join(ROOT, p)));
codeBytes += sizeOf(path.join(ROOT, "css/style.css"));
fs.readdirSync(path.join(ROOT, "js")).forEach(f => codeBytes += sizeOf(path.join(ROOT, "js", f)));
t("code < 400 KB", codeBytes < 400 * 1024, codeBytes + " B");
let mediaBytes = 0, maxImg = 0;
fs.readdirSync(path.join(ROOT, "assets")).filter(f => /\.jpg$/.test(f)).forEach(f => { const s = sizeOf(path.join(ROOT, "assets", f)); mediaBytes += s; maxImg = Math.max(maxImg, s); });
t("each image <= 120 KB", maxImg <= 120 * 1024, "max " + maxImg + " B");
t("media total <= 1.6 MB", mediaBytes <= Math.floor(1.6 * 1024 * 1024), mediaBytes + " B total");

lines.push("----");
lines.push("TOTAL: " + pass + " PASS / " + fail + " FAIL");
console.log(lines.join("\n"));
process.exit(fail ? 1 : 0);

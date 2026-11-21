/* Tour detail: itinerary totals computed from logic, live seats, WhatsApp firing. */
(function () {
  "use strict";
  var L = window.TravelLogic;
  var id = new URLSearchParams(location.search).get("id") || "hunza-classic";
  var tour = L.getTour(id) || L.TOURS[0];
  document.title = tour.title + " — Dastaan Journeys (Demo)";
  var bookings = TR.bookings();
  var totals = L.itineraryTotals(tour);
  var deps = L.departuresFor(tour);

  var depHTML = deps.map(function (d) {
    var left = L.seatsRemaining(tour, d.date, bookings);
    return '<div class="dep"><span><strong>' + d.label + '</strong><br><span class="demo-note">Group of ' + d.total + ' · demo departure</span></span>' +
      '<span style="text-align:right"><span class="seats" data-seats="' + d.date + '">' + left + ' seats remaining</span><br>' +
      '<a class="btn small" href="book.html?tour=' + tour.id + '&date=' + d.date + '">Book this departure</a></span></div>';
  }).join("");

  var itinHTML = tour.itinerary.map(function (d, i) {
    return '<details' + (i === 0 ? " open" : "") + '><summary><span class="dnum">Day ' + (i + 1) + '</span> ' + d.title + '</summary><p>' + d.text + '</p></details>';
  }).join("");

  document.querySelector("[data-body]").innerHTML =
    '<p class="eyebrow">' + tour.region + ' · ' + tour.style + ' · Demo tour</p>' +
    '<h1 style="font-size:clamp(34px,4.8vw,54px)">' + tour.title + '</h1>' +
    '<p style="max-width:44em;color:var(--muted);font-size:18.5px">' + tour.blurb + '</p>' +
    '<img src="' + tour.img + '" alt="Photo of ' + tour.destination + ' — demo tour photograph" style="width:100%;height:auto;border-radius:14px;margin:18px 0 26px">' +
    '<div class="cols"><div>' +
      '<h2>Day-by-day itinerary</h2>' +
      '<p data-totals><strong>' + totals.days + ' days · ' + totals.nights + ' nights</strong> · ' + tour.destination + ' · group of up to ' + tour.group + ' · ' + tour.style + '. Totals are computed from the itinerary below, never typed by hand.</p>' +
      '<div class="itin">' + itinHTML + '</div>' +
      '<h2 style="margin-top:34px">What travellers said (demo reviews)</h2>' +
      '<div class="grid two" style="grid-template-columns:1fr">' + tour.reviews.map(function (r) { return TR.reviewHTML(r, tour.title); }).join("") + '</div>' +
    '</div><aside>' +
      '<div class="panel"><h3 style="margin-top:0">Price &amp; departures</h3>' +
      '<p class="price" style="font-size:26px">' + L.pkr(tour.price) + '<small>per adult · children at 60% (' + L.pkr(L.childPrice(tour)) + ')</small></p>' +
      '<p class="clock-note">Demo clock: today is ' + L.DEMO_TODAY_LABEL + '. Seats update live when bookings are made or cancelled on this device.</p>' +
      depHTML +
      '<p style="display:grid;gap:10px;margin-top:14px"><a class="btn" href="book.html?tour=' + tour.id + '">Send booking enquiry</a>' +
      '<button class="btn wa" type="button" data-wa>Ask on WhatsApp (demo)</button></p>' +
      '<p class="demo-note">WhatsApp opens a prefilled demo message to a demo number; the click is recorded in this browser\'s local demo log, so the demo can prove the button was actually used.</p></div>' +
      '<div class="panel" style="margin-top:18px"><h3 style="margin-top:0">Included</h3><ul>' +
      tour.includes.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul>' +
      '<h3>Not included</h3><ul>' + tour.excludes.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
    '</aside></div>';

  document.querySelector("[data-wa]").addEventListener("click", function () { TR.fireWhatsApp(tour, ""); });
})();

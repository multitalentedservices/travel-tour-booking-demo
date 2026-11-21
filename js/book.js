/* Booking enquiry: preselection, live quote, named-constraint validation with
   live clearing (lessons 25/26), capacity rule, deterministic ref, persistence. */
(function () {
  "use strict";
  var L = window.TravelLogic;
  var params = new URLSearchParams(location.search);
  var tourSel = document.querySelector("[data-tour]"), dateSel = document.querySelector("[data-date]"),
      adultsEl = document.querySelector("[data-adults]"), childrenEl = document.querySelector("[data-children]"),
      nameEl = document.querySelector("[data-name]"), emailEl = document.querySelector("[data-email]"),
      phoneEl = document.querySelector("[data-phone]"), notesEl = document.querySelector("[data-notes]"),
      quoteEl = document.querySelector("[data-quote]"), seatsNote = document.querySelector("[data-seats-note]"),
      form = document.querySelector("[data-form]"), conf = document.querySelector("[data-confirmation]");

  tourSel.innerHTML = L.TOURS.map(function (t) { return '<option value="' + t.id + '">' + t.title + ' — ' + t.days + ' days · ' + L.pkr(t.price) + '</option>'; }).join("");
  if (params.get("tour") && L.getTour(params.get("tour"))) tourSel.value = params.get("tour");

  document.querySelector("[data-addons]").innerHTML = L.ADDONS.map(function (a) {
    return '<label class="addon"><input type="checkbox" data-addon="' + a.id + '"><span><strong>' + a.name + '</strong><br><span class="demo-note" style="font-style:normal">' + a.detail + '</span></span><span class="aprice">' + L.pkr(a.price) + '</span></label>';
  }).join("");

  function tour() { return L.getTour(tourSel.value); }
  function travellers() { return (parseInt(adultsEl.value, 10) || 0) + (parseInt(childrenEl.value, 10) || 0); }
  function addonIds() { return Array.prototype.map.call(document.querySelectorAll("[data-addon]:checked"), function (c) { return c.getAttribute("data-addon"); }); }

  function fillDates() {
    var t = tour(), keep = params.get("date");
    dateSel.innerHTML = L.departuresFor(t).map(function (d) {
      var left = L.seatsRemaining(t, d.date, TR.bookings());
      return '<option value="' + d.date + '">' + d.label + ' — ' + left + ' seats remaining</option>';
    }).join("");
    if (keep && L.departuresFor(t).some(function (d) { return d.date === keep; })) dateSel.value = keep;
  }

  function errFor(key, msg) { document.querySelector('[data-error-for="' + key + '"]').textContent = msg || ""; }

  function renderQuote() {
    var t = tour(), a = parseInt(adultsEl.value, 10) || 0, c = parseInt(childrenEl.value, 10) || 0;
    var q = L.quote(t, a, c, addonIds());
    quoteEl.innerHTML = "<h3 style='margin:0 0 8px'>Your itemised total (demo)</h3><table>" +
      q.lines.map(function (l) { return "<tr><td>" + l.label + "</td><td class='n'>" + L.pkr(l.amount) + "</td></tr>"; }).join("") +
      "<tr class='total'><td>Total for " + q.travellers + " traveller" + (q.travellers === 1 ? "" : "s") + "</td><td class='n'>" + L.pkr(q.total) + "</td></tr></table>" +
      "<p class='demo-note' style='margin:8px 0 0'>No payment is taken in this demo. Child fare = 60% of the adult fare, rounded to the nearest PKR 100.</p>";
    var left = L.seatsRemaining(t, dateSel.value, TR.bookings());
    seatsNote.textContent = tour().title + " · " + (L.DATE_LABELS[dateSel.value] || dateSel.value) + ": " + left + " seats remaining on this departure (demo clock: " + L.DEMO_TODAY_LABEL + ").";
    // Live capacity feedback + live clearing (lesson 7/25)
    var cap = travellers() > 0 ? L.capacityError(t, dateSel.value, travellers(), TR.bookings()) : "";
    errFor("capacity", cap);
  }

  function validateField(key) {
    var errs = L.validateEnquiry({ name: nameEl.value, email: emailEl.value, phone: phoneEl.value, tourId: tourSel.value, date: dateSel.value });
    errFor(key, errs[key] || "");
  }

  tourSel.addEventListener("change", function () { params.delete("date"); fillDates(); renderQuote(); });
  dateSel.addEventListener("change", renderQuote);
  [adultsEl, childrenEl].forEach(function (el) { el.addEventListener("input", renderQuote); });
  document.querySelectorAll("[data-addon]").forEach(function (el) { el.addEventListener("change", renderQuote); });
  nameEl.addEventListener("input", function () { validateField("name"); });
  emailEl.addEventListener("input", function () { validateField("email"); });
  phoneEl.addEventListener("input", function () { validateField("phone"); });

  document.querySelector("[data-wa]").addEventListener("click", function () {
    TR.fireWhatsApp(tour(), L.DATE_LABELS[dateSel.value] || "");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = { name: nameEl.value, email: emailEl.value, phone: phoneEl.value, tourId: tourSel.value, date: dateSel.value };
    var errs = L.validateEnquiry(v);
    ["name", "email", "phone", "tour", "date"].forEach(function (k) { errFor(k, errs[k] || ""); });
    var cap = L.capacityError(tour(), dateSel.value, travellers(), TR.bookings());
    errFor("capacity", cap);
    if (Object.keys(errs).length || cap) return;
    var a = parseInt(adultsEl.value, 10) || 0, c = parseInt(childrenEl.value, 10) || 0;
    var q = L.quote(tour(), a, c, addonIds());
    var booking = {
      ref: L.makeRef(v.tourId, v.date, q.travellers, v.name), tourId: v.tourId, tourTitle: tour().title,
      date: v.date, dateLabel: L.DATE_LABELS[v.date] || v.date, adults: a, children: c,
      addons: addonIds(), total: q.total, name: v.name.trim(), email: v.email.trim(), phone: L.normalizePhone(v.phone),
      notes: notesEl.value.trim(), status: "confirmed", createdDemoDate: L.DEMO_TODAY
    };
    var all = TR.bookings(); all.push(booking); TR.saveBookings(all);
    form.hidden = true;
    conf.hidden = false;
    conf.innerHTML = '<div class="confirm" data-confirmation-box><p class="eyebrow">Booking enquiry confirmed · Demo</p>' +
      '<p class="ref">' + booking.ref + '</p>' +
      '<p><strong>' + booking.tourTitle + '</strong> · departing ' + booking.dateLabel + ' · ' + booking.adults + ' adult(s)' +
      (booking.children ? ' + ' + booking.children + ' child(ren)' : '') + ' · lead traveller ' + booking.name + '.</p>' +
      '<div class="quote"><table>' + q.lines.map(function (l) { return "<tr><td>" + l.label + "</td><td class='n'>" + L.pkr(l.amount) + "</td></tr>"; }).join("") +
      "<tr class='total'><td>Total</td><td class='n'>" + L.pkr(booking.total) + "</td></tr></table></div>" +
      '<p class="demo-note">Demo confirmation only — no payment was taken and no real booking exists. This booking is saved in My Bookings in this browser; cancelling it there returns its seats to the departure.</p>' +
      '<p style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="bookings.html">View My Bookings</a><a class="btn ghost" href="tour.html?id=' + booking.tourId + '">Back to the tour</a></p></div>';
    conf.scrollIntoView({ block: "start" });
  });

  fillDates();
  renderQuote();
})();

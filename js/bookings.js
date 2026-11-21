/* My Bookings: list local bookings; cancel restores seats (cross-surface, lesson 30). */
(function () {
  "use strict";
  var L = window.TravelLogic;
  var host = document.querySelector("[data-bookings]");

  function render() {
    var all = TR.bookings();
    if (!all.length) {
      host.innerHTML = '<div class="empty"><h3>No bookings yet</h3><p>When you complete a booking enquiry in this demo, it will be saved here — in this browser only.</p><a class="btn" href="tours.html">Browse tours</a></div>';
      return;
    }
    host.innerHTML = all.map(function (b, i) {
      var cancelled = b.status === "cancelled";
      return '<article class="booking-card" data-booking-card>' +
        '<p class="eyebrow" style="margin-bottom:6px">' + b.ref + (cancelled ? ' · Cancelled' : ' · Confirmed (demo)') + '</p>' +
        '<h3 style="margin:0 0 6px"><a href="tour.html?id=' + b.tourId + '">' + b.tourTitle + '</a></h3>' +
        '<p style="margin:4px 0">Departing <strong>' + b.dateLabel + '</strong> · ' + b.adults + ' adult(s)' + (b.children ? ' + ' + b.children + ' child(ren)' : '') +
        ' · Lead traveller ' + b.name + ' · Total <strong>' + L.pkr(b.total) + '</strong></p>' +
        (b.notes ? '<p style="margin:4px 0;color:var(--muted)">Notes: ' + b.notes + '</p>' : '') +
        (cancelled ? '<p class="demo-note">Cancelled — its seats have been returned to the departure. Check the tour page: the seat count is back up.</p>'
          : '<p style="margin-top:10px"><button class="btn small ghost" type="button" data-cancel="' + i + '">Cancel this booking (demo)</button></p>') +
        '</article>';
    }).join("");
    host.querySelectorAll("[data-cancel]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var all2 = TR.bookings();
        all2[parseInt(btn.getAttribute("data-cancel"), 10)].status = "cancelled";
        TR.saveBookings(all2);
        render();
      });
    });
  }
  render();
})();

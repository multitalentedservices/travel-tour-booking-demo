/* Dastaan Journeys — shared DOM helpers (cards, storage, WhatsApp firing log). */
(function () {
  "use strict";
  var L = window.TravelLogic;
  window.TR = {
    bookings: function () { try { return JSON.parse(localStorage.getItem("tr_bookings") || "[]"); } catch (e) { return []; } },
    saveBookings: function (b) { localStorage.setItem("tr_bookings", JSON.stringify(b)); },
    waLog: function () { try { return JSON.parse(localStorage.getItem("tr_wa_log") || "[]"); } catch (e) { return []; } },
    fireWhatsApp: function (tour, dateLabel) {
      var log = TR.waLog();
      log.push({ tour: tour.id, tourTitle: tour.title, date: dateLabel || "", at: L.DEMO_TODAY, channel: "whatsapp-demo" });
      localStorage.setItem("tr_wa_log", JSON.stringify(log));
      window.open(L.waLink(tour, dateLabel), "_blank", "noopener");
    },
    stars: function (n) { var s = ""; for (var i = 0; i < 5; i++) s += i < n ? "★" : "☆"; return s; },
    cardHTML: function (t) {
      return '<article class="card">' +
        '<img src="' + t.img + '" alt="Photo of ' + t.destination + ' — demo tour photograph">' +
        '<div class="card-body">' +
        '<div class="meta"><span class="tag">' + t.region + '</span><span class="tag">' + t.style + '</span></div>' +
        '<h3><a href="tour.html?id=' + t.id + '">' + t.title + '</a></h3>' +
        '<p>' + t.blurb + '</p>' +
        '<div class="meta"><span>' + t.days + ' days · ' + L.nights(t) + ' nights</span><span>Group up to ' + t.group + '</span></div>' +
        '<div class="card-foot"><span class="price">' + L.pkr(t.price) + '<small>per person</small></span>' +
        '<a class="btn small" href="tour.html?id=' + t.id + '">View tour</a></div>' +
        '</div></article>';
    },
    reviewHTML: function (r, tourTitle) {
      return '<article class="review"><div class="stars" aria-label="Rated ' + r.rating + ' out of 5">' + TR.stars(r.rating) + '</div>' +
        '<p>' + r.text + '</p><p class="who">' + r.name + (tourTitle ? ' · ' + tourTitle : '') + '</p>' +
        '<p class="demo-note">Fictional demo review — no real traveller is quoted anywhere on this site.</p></article>';
    }
  };
  // Nav "My Bookings" count badge
  document.querySelectorAll("[data-nav-bookings]").forEach(function (el) {
    var n = TR.bookings().filter(function (b) { return b.status !== "cancelled"; }).length;
    el.textContent = "My Bookings" + (n ? " (" + n + ")" : "");
  });
})();

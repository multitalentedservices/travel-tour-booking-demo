/* Catalogue: filters + sort + URL state kept in sync (lesson 28). */
(function () {
  "use strict";
  var L = window.TravelLogic;
  var qEl = document.querySelector("[data-q]"), regionEl = document.querySelector("[data-region]"),
      bandEl = document.querySelector("[data-band]"), sortEl = document.querySelector("[data-sort]"),
      grid = document.querySelector("[data-grid]"), count = document.querySelector("[data-count]"),
      empty = document.querySelector("[data-empty]"), emptyText = document.querySelector("[data-empty-text]");

  function state() { return { q: qEl.value, region: regionEl.value, band: bandEl.value, sort: sortEl.value }; }

  function syncURL(s) {
    var p = new URLSearchParams();
    if (s.q) p.set("q", s.q);
    if (s.region !== "all") p.set("region", s.region);
    if (s.band !== "all") p.set("band", s.band);
    if (s.sort !== "featured") p.set("sort", s.sort);
    history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : ""));
  }

  function describe(s) {
    var parts = [];
    if (s.region !== "all") parts.push("region = " + s.region);
    if (s.band !== "all") { L.BANDS.forEach(function (b) { if (b.id === s.band) parts.push("duration = " + b.label); }); }
    if (s.q) parts.push('search = "' + s.q + '"');
    return parts.join(", ");
  }

  function render() {
    var s = state();
    var list = L.sortTours(L.filterTours(s), s.sort);
    grid.innerHTML = list.map(function (t) { return TR.cardHTML(t); }).join("");
    count.textContent = "Showing " + list.length + " of " + L.TOURS.length + " tours";
    if (list.length === 0) {
      empty.hidden = false;
      emptyText.textContent = "No tour satisfies " + describe(s) + ". Loosen one filter, or reset them all.";
    } else { empty.hidden = true; }
    syncURL(s);
  }

  // Initialise from URL (the third filter surface).
  var p = new URLSearchParams(location.search);
  if (p.get("q")) qEl.value = p.get("q");
  if (p.get("region")) regionEl.value = p.get("region");
  if (p.get("band")) bandEl.value = p.get("band");
  if (p.get("sort")) sortEl.value = p.get("sort");

  [qEl, regionEl, bandEl, sortEl].forEach(function (el) {
    el.addEventListener("input", render); el.addEventListener("change", render);
  });
  document.querySelector("[data-reset]").addEventListener("click", function () {
    qEl.value = ""; regionEl.value = "all"; bandEl.value = "all"; sortEl.value = "featured"; render();
  });
  document.querySelector("[data-filters]").addEventListener("submit", function (e) { e.preventDefault(); });
  render();
})();

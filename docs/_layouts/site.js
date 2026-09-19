/* Natulib — menu responsive, recherche, tableaux défilants.
   Chargé par _includes/footer.html (donc par toutes les pages, web-flasher compris). */
(function () {
  'use strict';

  var DESKTOP_MIN = 1000; // doit rester identique au breakpoint de site.css

  var header  = document.getElementById('site-header');
  var toggle  = header ? header.querySelector('.nav-toggle') : null;
  var input   = document.getElementById('search-input');
  var results = document.getElementById('results-container');

  /* ---------- Menu (téléphone / tablette) ---------- */
  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('is-open'));
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth >= DESKTOP_MIN) setMenu(false);
  });

  /* ---------- Recherche ---------- */
  function showResults(show) {
    if (results) results.classList.toggle('is-visible', show);
  }

  if (input && results && window.SimpleJekyllSearch) {
    window.SimpleJekyllSearch({
      searchInput: input,
      resultsContainer: results,
      json: '/Natulib/search.json',
      searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
      noResultsText: '<li class="no-result">Aucun résultat</li>',
      limit: 8
    });

    input.addEventListener('input', function () {
      showResults(input.value.length > 0);
    });
    input.addEventListener('focus', function () {
      if (input.value.length > 0) showResults(true);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-search')) showResults(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    showResults(false);
    setMenu(false);
  });

  /* ---------- Tableaux Markdown : enveloppe défilante ---------- */
  var tables = document.querySelectorAll('.markdown-body table');
  Array.prototype.forEach.call(tables, function (table) {
    if (table.parentNode.classList.contains('table-scroll')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    // Plus de 4 colonnes : on impose une largeur minimale, le tableau défile
    if (table.rows.length && table.rows[0].cells.length > 4) {
      wrap.classList.add('is-wide');
    }
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
})();

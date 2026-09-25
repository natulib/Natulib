---
title: Modules
layout: default
bare: true
nav_order: 3
has_children: true
---

<style>
  .catalog-page {
    --primary: #0969da;
    --primary-hover: #0854ad;
    --border-color: var(--border, #d0d7de);
    --bg-surface: var(--surface, #ffffff);
    --bg-muted: #f6f8fa;
    --text-main: var(--text, #1f2328);
    --text-muted: var(--muted, #656d76);
    color: var(--text-main);
    overflow-wrap: break-word;
  }
  @media (prefers-color-scheme: dark) {
    .catalog-page {
      --primary: #4493f8;
      --primary-hover: #79c0ff;
      --border-color: var(--border, #30363d);
      --bg-surface: var(--surface, #0d1117);
      --bg-muted: #161b22;
      --text-main: var(--text, #e6edf3);
      --text-muted: var(--muted, #8b949e);
    }
  }

  .catalog-page h1 { margin: 0 0 0.5rem; font-size: clamp(1.6rem, 5vw, 2.2rem); }
  .catalog-page .lead { font-size: 1.05rem; color: var(--text-muted); margin-bottom: 1.25rem; }

  /* Barre d'outils */
  .catalog-page .catalog-toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 1.5rem;
    padding: 12px;
    background: var(--bg-muted);
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  /* Recherche */
  .catalog-page .search-box-wrapper {
    position: relative;
    width: 100%;
  }
  .catalog-page .table-search-input {
    width: 100%;
    padding: 8px 36px 8px 12px;
    font-size: 0.9rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-surface);
    color: var(--text-main);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .catalog-page .table-search-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15);
  }
  .catalog-page .search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--text-muted);
    pointer-events: none;
  }

  /* Boutons de filtres */
  .catalog-page .filters-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
  }
  .catalog-page .filter-btn {
    display: inline-block;
    padding: 4px 10px;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 20px;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
    color: var(--text-main);
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease, border-color 0.15s ease;
    white-space: nowrap;
  }
  .catalog-page .filter-btn:hover {
    border-color: var(--primary);
  }
  .catalog-page .filter-btn.is-active {
    background: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
    font-weight: 600;
  }

  /* Tableau */
  .catalog-page .table-responsive {
    width: 100%;
    overflow-x: auto;
    margin-bottom: 2rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }
  .catalog-page table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
    text-align: left;
  }
  .catalog-page th, .catalog-page td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
  }
  .catalog-page tr:last-child td { border-bottom: 0; }
  .catalog-page th {
    background: var(--bg-muted);
    color: var(--text-muted);
    font-weight: 600;
    white-space: nowrap;
  }
  .catalog-page a {
    color: var(--primary);
    text-decoration: none;
  }
  .catalog-page a:hover {
    text-decoration: underline;
  }
  .catalog-page .nowrap { white-space: nowrap; }

  /* Colonne Module élargie */
  .catalog-page th.col-module,
  .catalog-page td.col-module {
    min-width: 240px;
    width: 32%;
    white-space: normal;
  }

  /* Masquage des lignes filtrées */
  .catalog-page tr.is-hidden {
    display: none !important;
  }

  .catalog-page .docs-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }
  .catalog-page .docs-section h2 { font-size: 1.25rem; margin: 0 0 0.75rem; }
  .catalog-page .docs-section ul { margin: 0 0 1rem; padding-left: 1.25rem; }
  .catalog-page .docs-section li { margin-bottom: 0.35rem; }
  .catalog-page .notice-box {
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    border-left: 3px solid var(--primary);
    background: var(--bg-muted);
    border-radius: 0 6px 6px 0;
  }
</style>

<div class="catalog-page">
  <h1>🧱 Modules</h1>
  <p class="lead">Les modules sont les briques matérielles réutilisables de Natulib[cite: 1]. Utilisez la recherche ou filtrez par catégorie ci-dessous[cite: 1].</p>

  <div class="catalog-toolbar">
    <div class="search-box-wrapper">
      <input type="text" id="table-search-box" class="table-search-input" placeholder="Rechercher un module (référence, nom, interface, soudure…)" autocomplete="off">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
    </div>

    <!-- Boutons de filtrage avec bascule (toggle) -->
    <div class="filters-bar" id="filters-container">
      <button type="button" class="filter-btn is-active" data-cat="all">Tous</button>
      <button type="button" class="filter-btn" data-cat="core">🔴 Core (000)</button>
      <button type="button" class="filter-btn" data-cat="displays">📺 Displays (100)</button>
      <button type="button" class="filter-btn" data-cat="sensors">🌡️ Sensors (200)</button>
      <button type="button" class="filter-btn" data-cat="actuators">⚡ Actuators (300)</button>
      <button type="button" class="filter-btn" data-cat="power">🔋 Power (400)</button>
      <button type="button" class="filter-btn" data-cat="enclosures">📦 Enclosures (500)</button>
      <button type="button" class="filter-btn" data-cat="connectivity">📡 Connectivity (600)</button>
    </div>
  </div>

  <div class="table-responsive">
    <table id="modules-table">
      <thead>
        <tr>
          <th>Réf.</th>
          <th>Famille</th>
          <th class="col-module">Module</th>
          <th style="text-align: center;">État</th>
          <th>Interface</th>
          <th>Montage</th>
          <th>Temps</th>
          <th>Niveau</th>
          <th style="text-align: right;">Prix</th>
        </tr>
      </thead>
      <tbody>
        {% assign modules = site.pages | where_exp: "item", "item.path contains 'hardware/'" | sort: "ref" %}
        {% for mod in modules %}
          {% unless mod.ref == nil or mod.ref contains 'xxx' or mod.path contains 'TEMPLATE' %}
            <tr class="mod-row" data-famille="{{ mod.famille | downcase }}">
              <td class="nowrap"><a href="{{ mod.url | relative_url }}"><strong>{{ mod.ref }}</strong></a></td>
              <td class="nowrap">
                {% case mod.famille %}
                  {% when 'core' %}🔴 Core
                  {% when 'displays' %}📺 Displays
                  {% when 'sensors' %}🌡️ Sensors
                  {% when 'actuators' %}⚡ Actuators
                  {% when 'power' %}🔋 Power
                  {% when 'enclosures' %}📦 Enclosures
                  {% when 'connectivity' %}📡 Connectivity
                  {% else %}{{ mod.famille | capitalize }}
                {% endcase %}
              </td>
              <td class="col-module"><strong>{{ mod.title | split: "—" | last | strip }}</strong></td>
              <td style="text-align: center;" class="nowrap">
                {% case mod.etat %}
                  {% when 'valide' %}🟢 Validé
                  {% when 'test' %}🟡 En test
                  {% when 'planifie' %}⚪ Planifié
                  {% else %}{{ mod.etat }}
                {% endcase %}
              </td>
              <td class="nowrap">{{ mod.interface | default: "—" | upcase }}</td>
              <td class="nowrap">
                {% case mod.montage %}
                  {% when 'sans_outil' %}🟢 Sans outil
                  {% when 'sans_soudure' %}🟢 Sans soudure
                  {% when 'soudure' %}🟠 Soudure
                  {% else %}{{ mod.montage | default: "—" }}
                {% endcase %}
              </td>
              <td class="nowrap">{% if mod.temps %}{{ mod.temps }} min{% else %}—{% endif %}</td>
              <td class="nowrap">
                {% case mod.niveau %}
                  {% when 'debutant' %}👤 Débutant
                  {% when 'intermediaire' %}👤 Intermédiaire
                  {% when 'avance' %}👤 Avancé
                  {% else %}{{ mod.niveau | default: "—" }}
                {% endcase %}
              </td>
              <td style="text-align: right;" class="nowrap">{% if mod.prix %}~{{ mod.prix }} €{% else %}—{% endif %}</td>
            </tr>
          {% endunless %}
        {% endfor %}
      </tbody>
    </table>
  </div>

  <section class="docs-section">
    <h2>🔌 GPIO et brochage</h2>
    <p>Chaque fiche module propose un <strong>GPIO recommandé</strong> pour un montage isolé[cite: 1].</p>
    <p>Dans une station réelle, plusieurs modules partagent l'ESP32-C6[cite: 1]. Le câblage final est documenté projet par projet dans la section <a href="{{ '/Projets.html' | relative_url }}">Projets</a>[cite: 1] :</p>
    <ul>
      <li>Les périphériques <strong>I²C</strong> (BME280, BH1750, INA219, RTC) partagent nativement les broches SDA/SCL sans conflit d'adresse[cite: 1].</li>
      <li>Les écrans et modules <strong>SPI</strong> partagent l'horloge et les données, mais exigent une broche CS distincte[cite: 1].</li>
    </ul>

    <div class="notice-box">
      <strong>⚡ Sécurité électrique :</strong> Les broches de l'ESP32-C6 tolèrent <strong>3,3 V maximum</strong>[cite: 1]. Utilisez toujours un commutateur de puissance (<a href="{{ '/hardware/NL-401A-PowerSwitch.html' | relative_url }}">NL-401A</a>[cite: 1] ou <a href="{{ '/hardware/NL-402A-Mosfet-PWM.html' | relative_url }}">NL-402A</a>[cite: 1]) pour alimenter moteurs, relais ou rubans LED[cite: 1].
    </div>
  </section>
</div>

<script>
  (function () {
    var searchInput = document.getElementById('table-search-box');
    var rows = Array.from(document.querySelectorAll('#modules-table tbody tr.mod-row'));
    var filterBtns = Array.from(document.querySelectorAll('#filters-container .filter-btn'));
    var allBtn = document.querySelector('#filters-container [data-cat="all"]');
    var activeCategory = 'all';

    function applyFilters() {
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      rows.forEach(function (row) {
        var rowCat = row.getAttribute('data-famille') || '';
        var rowText = row.textContent.toLowerCase();

        var matchesCategory = (activeCategory === 'all' || rowCat === activeCategory);
        var matchesSearch = (query === '' || rowText.indexOf(query) !== -1);

        if (matchesCategory && matchesSearch) {
          row.classList.remove('is-hidden');
        } else {
          row.classList.add('is-hidden');
        }
      });
    }

    function setActiveBtn(cat) {
      filterBtns.forEach(function (btn) {
        if (btn.getAttribute('data-cat') === cat) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var clickedCat = this.getAttribute('data-cat');

        if (clickedCat === 'all') {
          activeCategory = 'all';
        } else {
          // Si déjà actif, on désélectionne et on revient à "all"
          if (activeCategory === clickedCat) {
            activeCategory = 'all';
          } else {
            activeCategory = clickedCat;
          }
        }

        setActiveBtn(activeCategory);
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }
  })();
</script>
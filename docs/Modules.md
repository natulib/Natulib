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

  /* Barre d'outils sur une seule ligne */
  .catalog-page .catalog-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.5rem;
    padding: 10px 14px;
    background: var(--bg-muted);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow-x: auto;
    white-space: nowrap;
  }

  .catalog-page .search-box-wrapper {
    position: relative;
    flex: 0 0 260px;
  }
  .catalog-page .table-search-input {
    width: 100%;
    padding: 6px 32px 6px 10px;
    font-size: 0.85rem;
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
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    height: 15px;
    color: var(--text-muted);
    pointer-events: none;
  }

  /* Filtres par boutons */
  .catalog-page .filter-radio { display: none; }

  .catalog-page .filters-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1 1 auto;
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
  }
  .catalog-page .filter-btn:hover {
    border-color: var(--primary);
  }

  /* État actif des boutons */
  .catalog-page #f-all:checked ~ .catalog-toolbar label[for="f-all"],
  .catalog-page #f-core:checked ~ .catalog-toolbar label[for="f-core"],
  .catalog-page #f-displays:checked ~ .catalog-toolbar label[for="f-displays"],
  .catalog-page #f-sensors:checked ~ .catalog-toolbar label[for="f-sensors"],
  .catalog-page #f-actuators:checked ~ .catalog-toolbar label[for="f-actuators"],
  .catalog-page #f-power:checked ~ .catalog-toolbar label[for="f-power"],
  .catalog-page #f-enclosures:checked ~ .catalog-toolbar label[for="f-enclosures"],
  .catalog-page #f-connectivity:checked ~ .catalog-toolbar label[for="f-connectivity"] {
    background: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
    font-weight: 600;
  }

  /* Masquage CSS selon catégorie sélectionnée */
  .catalog-page #f-core:checked ~ .table-responsive tr.mod-row:not(.cat-core),
  .catalog-page #f-displays:checked ~ .table-responsive tr.mod-row:not(.cat-displays),
  .catalog-page #f-sensors:checked ~ .table-responsive tr.mod-row:not(.cat-sensors),
  .catalog-page #f-actuators:checked ~ .table-responsive tr.mod-row:not(.cat-actuators),
  .catalog-page #f-power:checked ~ .table-responsive tr.mod-row:not(.cat-power),
  .catalog-page #f-enclosures:checked ~ .table-responsive tr.mod-row:not(.cat-enclosures),
  .catalog-page #f-connectivity:checked ~ .table-responsive tr.mod-row:not(.cat-connectivity) {
    display: none;
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
    width: 30%;
    white-space: normal;
  }

  /* Masqué par le filtre texte */
  .catalog-page tr.is-hidden-by-search {
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
  <p class="lead">Les modules sont les briques matérielles réutilisables de Natulib. Utilisez la recherche ou filtrez par catégorie ci-dessous[cite: 1].</p>

  <!-- Radios de sélection de famille -->
  <input type="radio" name="catalog-cat" id="f-all" class="filter-radio" checked>
  <input type="radio" name="catalog-cat" id="f-core" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-displays" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-sensors" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-actuators" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-power" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-enclosures" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-connectivity" class="filter-radio">

  <!-- Barre d'outils sur une ligne -->
  <div class="catalog-toolbar">
    <div class="search-box-wrapper">
      <input type="text" id="table-search-box" class="table-search-input" placeholder="Rechercher un module…" autocomplete="off">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
    </div>

    <div class="filters-bar">
      <label for="f-all" class="filter-btn">Tous</label>
      <label for="f-core" class="filter-btn">🔴 Core</label>
      <label for="f-displays" class="filter-btn">📺 Displays</label>
      <label for="f-sensors" class="filter-btn">🌡️ Sensors</label>
      <label for="f-actuators" class="filter-btn">⚡ Actuators</label>
      <label for="f-power" class="filter-btn">🔋 Power</label>
      <label for="f-enclosures" class="filter-btn">📦 Enclosures</label>
      <label for="f-connectivity" class="filter-btn">📡 Connectivity</label>
    </div>
  </div>

  <!-- Tableau sans la colonne Description -->
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
            <tr class="mod-row cat-{{ mod.famille | downcase }}">
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
    var rows = document.querySelectorAll('#modules-table tbody tr.mod-row');

    if (!searchInput || !rows.length) return;

    searchInput.addEventListener('input', function () {
      var query = this.value.trim().toLowerCase();

      rows.forEach(function (row) {
        var text = row.textContent.toLowerCase();
        if (query === '' || text.indexOf(query) !== -1) {
          row.classList.remove('is-hidden-by-search');
        } else {
          row.classList.add('is-hidden-by-search');
        }
      });
    });
  })();
</script>
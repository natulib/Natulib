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
  .catalog-page .lead { font-size: 1.05rem; color: var(--text-muted); margin-bottom: 1.5rem; }

  /* Masquage des cases radio servant de gestionnaire d'état */
  .catalog-page .filter-radio { display: none; }

  /* Barre de boutons de filtre */
  .catalog-page .filters-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-bottom: 1.5rem;
    padding: 12px;
    background: var(--bg-muted);
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }
  .catalog-page .filters-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    margin-right: 4px;
  }
  .catalog-page .filter-btn {
    display: inline-block;
    padding: 4px 12px;
    font-size: 0.82rem;
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

  /* État actif du filtre par CSS pur */
  .catalog-page #f-all:checked ~ .filters-bar label[for="f-all"],
  .catalog-page #f-core:checked ~ .filters-bar label[for="f-core"],
  .catalog-page #f-displays:checked ~ .filters-bar label[for="f-displays"],
  .catalog-page #f-sensors:checked ~ .filters-bar label[for="f-sensors"],
  .catalog-page #f-actuators:checked ~ .filters-bar label[for="f-actuators"],
  .catalog-page #f-power:checked ~ .filters-bar label[for="f-power"],
  .catalog-page #f-enclosures:checked ~ .filters-bar label[for="f-enclosures"],
  .catalog-page #f-connectivity:checked ~ .filters-bar label[for="f-connectivity"] {
    background: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
    font-weight: 600;
  }

  /* Logique de filtrage dynamique sans JavaScript */
  .catalog-page #f-core:checked ~ .table-responsive tr.mod-row:not(.cat-core),
  .catalog-page #f-displays:checked ~ .table-responsive tr.mod-row:not(.cat-displays),
  .catalog-page #f-sensors:checked ~ .table-responsive tr.mod-row:not(.cat-sensors),
  .catalog-page #f-actuators:checked ~ .table-responsive tr.mod-row:not(.cat-actuators),
  .catalog-page #f-power:checked ~ .table-responsive tr.mod-row:not(.cat-power),
  .catalog-page #f-enclosures:checked ~ .table-responsive tr.mod-row:not(.cat-enclosures),
  .catalog-page #f-connectivity:checked ~ .table-responsive tr.mod-row:not(.cat-connectivity) {
    display: none;
  }

  /* Mise en forme du tableau */
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

  /* Sections textuelles en bas de page */
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
  <p class="lead">Les modules sont les briques matérielles réutilisables de Natulib. Cliquez sur les catégories ci-dessous pour filtrer le catalogue.</p>

  <!-- Sélecteurs d'état invisibles -->
  <input type="radio" name="catalog-cat" id="f-all" class="filter-radio" checked>
  <input type="radio" name="catalog-cat" id="f-core" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-displays" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-sensors" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-actuators" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-power" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-enclosures" class="filter-radio">
  <input type="radio" name="catalog-cat" id="f-connectivity" class="filter-radio">

  <!-- Boutons de filtrage interactifs -->
  <div class="filters-bar">
    <span class="filters-label">Filtrer par famille :</span>
    <label for="f-all" class="filter-btn">Tous</label>
    <label for="f-core" class="filter-btn">🔴 Core (000)</label>
    <label for="f-displays" class="filter-btn">📺 Displays (100)</label>
    <label for="f-sensors" class="filter-btn">🌡️ Sensors (200)</label>
    <label for="f-actuators" class="filter-btn">⚡ Actuators (300)</label>
    <label for="f-power" class="filter-btn">🔋 Power (400)</label>
    <label for="f-enclosures" class="filter-btn">📦 Enclosures (500)</label>
    <label for="f-connectivity" class="filter-btn">📡 Connectivity (600)</label>
  </div>

  <!-- Tableau généré dynamiquement depuis les fichiers de hardware/ -->
  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Réf.</th>
          <th>Famille</th>
          <th>Module</th>
          <th style="text-align: center;">État</th>
          <th>Interface</th>
          <th>Montage</th>
          <th>Temps</th>
          <th>Niveau</th>
          <th style="text-align: right;">Prix</th>
          <th>Description</th>
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
              <td><strong>{{ mod.title | split: "—" | last | strip }}</strong></td>
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
              <td>{{ mod.description | default: mod.excerpt | strip_html | strip_newlines | truncate: 120 }}</td>
            </tr>
          {% endunless %}
        {% endfor %}
      </tbody>
    </table>
  </div>

  <section class="docs-section">
    <h2>🔌 GPIO et brochage</h2>
    <p>Chaque fiche module propose un <strong>GPIO recommandé</strong> pour un montage isolé.</p>
    <p>Dans une station réelle, plusieurs modules partagent l'ESP32-C6. Le câblage final est documenté projet par projet dans la section <a href="{{ '/Projets.html' | relative_url }}">Projets</a> :</p>
    <ul>
      <li>Les périphériques <strong>I²C</strong> (BME280, BH1750, INA219, RTC) partagent nativement les broches SDA/SCL sans conflit d'adresse.</li>
      <li>Les écrans et modules <strong>SPI</strong> partagent l'horloge et les données, mais exigent une broche CS distincte.</li>
    </ul>

    <div class="notice-box">
      <strong>⚡ Sécurité électrique :</strong> Les broches de l'ESP32-C6 tolèrent <strong>3,3 V maximum</strong>. Utilisez toujours un commutateur de puissance (<a href="{{ '/hardware/NL-401A-PowerSwitch.html' | relative_url }}">NL-401A</a> ou <a href="{{ '/hardware/NL-402A-Mosfet-PWM.html' | relative_url }}">NL-402A</a>) pour alimenter moteurs, relais ou rubans LED.
    </div>
  </section>
</div>
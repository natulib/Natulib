---
title: Modules
layout: default
bare: true
nav_order: 3
has_children: true
---
{% assign nl_base = site.baseurl | default: '/Natulib' %}
<link rel="stylesheet" href="{{ nl_base }}/assets/css/natulib-pages.css">
<section class="nl-catalog" id="nl-catalog">
  <header class="nl-catalog-hero"><p class="nl-eyebrow">Catalogue matériel</p><h1>🧱 Modules Natulib</h1><p class="nl-catalog-intro">Explorez les briques matérielles de Natulib : recherche, famille, statut et informations pratiques en un coup d’œil.</p></header>
  <div class="nl-catalog-toolbar">
    <input id="nl-module-search" class="nl-catalog-search" type="search" placeholder="Rechercher un module, une interface, une référence…" aria-label="Rechercher des modules">
    <div class="nl-filters" aria-label="Filtrer par famille">
      <button class="nl-filter" data-family="all" aria-pressed="true">Tous</button>
      <button class="nl-filter" data-family="core" aria-pressed="false">🔴 Core</button>
      <button class="nl-filter" data-family="displays" aria-pressed="false">📺 Displays</button>
      <button class="nl-filter" data-family="sensors" aria-pressed="false">🌡️ Sensors</button>
      <button class="nl-filter" data-family="actuators" aria-pressed="false">⚡ Actuators</button>
      <button class="nl-filter" data-family="power" aria-pressed="false">🔋 Power</button>
      <button class="nl-filter" data-family="enclosures" aria-pressed="false">📦 Enclosures</button>
      <button class="nl-filter" data-family="connectivity" aria-pressed="false">📡 Connectivity</button>
    </div>
  </div>
  <p id="nl-catalog-count" aria-live="polite" class="nl-section-heading"><span>Catalogue des modules</span></p>
  <div class="nl-module-grid" id="nl-module-grid">
  {% assign modules = site.pages | where_exp: 'item', "item.path contains 'modules/'" | sort: 'ref' %}
  {% for mod in modules %}
  {% assign module_ref = mod.ref | default: mod.reference %}
  {% unless module_ref == nil or module_ref contains 'xxx' or mod.path contains 'TEMPLATE' %}
    {% assign module_status = mod.etat | default: mod.statut %}
    {% assign module_montage = mod.montage | default: mod.soudure %}
    {% assign module_temps = mod.temps | default: mod.duree %}
    <a href="{{ mod.url | relative_url }}" class="nl-module-card" data-family="{{ mod.famille | downcase | escape }}">
      <span class="nl-module-top"><span class="nl-module-ref">{{ module_ref | escape }}</span><span class="nl-module-family">{{ mod.famille | default: mod.categorie | escape }}</span></span>
      <span class="nl-module-title">{{ mod.title | escape }}</span>
      {% if mod.description %}<span class="nl-module-desc">{{ mod.description | escape }}</span>{% endif %}
      <span class="nl-chips">
        {% case module_status %}{% when 'valide' %}<span class="nl-chip">🟢 Validé</span>{% when 'test' %}<span class="nl-chip">🟡 En test</span>{% when 'planifie' %}<span class="nl-chip">⚪ Planifié</span>{% when 'Validé' %}<span class="nl-chip">🟢 Validé</span>{% when 'En test' %}<span class="nl-chip">🟡 En test</span>{% when 'Planifié' %}<span class="nl-chip">⚪ Planifié</span>{% else %}{% if module_status %}<span class="nl-chip">{{ module_status | escape }}</span>{% endif %}{% endcase %}
        {% if mod.interface %}<span class="nl-chip">🔌 {{ mod.interface | escape }}</span>{% endif %}
        {% case module_montage %}{% when 'sans_outil' %}<span class="nl-chip">🟢 Sans outil</span>{% when 'sans_soudure' %}<span class="nl-chip">🟢 Sans soudure</span>{% when 'soudure' %}<span class="nl-chip">🟠 Soudure</span>{% else %}{% if module_montage %}<span class="nl-chip">🟠 {{ module_montage | escape }}</span>{% endif %}{% endcase %}
        {% if module_temps %}<span class="nl-chip">⏱️ {% if mod.duree %}{{ mod.duree | escape }}{% else %}{{ mod.temps | escape }} min{% endif %}</span>{% endif %}
        {% if mod.niveau %}<span class="nl-chip">👤 {{ mod.niveau | replace: 'debutant','Débutant' | replace: 'intermediaire','Intermédiaire' | replace: 'avance','Avancé' | escape }}</span>{% endif %}
        {% if mod.prix %}{% assign prix_txt = mod.prix | append: '' %}<span class="nl-chip">💶 {{ prix_txt | escape }}{% unless prix_txt contains '€' %} €{% endunless %}</span>{% endif %}
      </span>
    </a>
  {% endunless %}
  {% endfor %}
  </div>
  <p id="nl-catalog-empty" class="nl-empty" hidden>Aucun module ne correspond à cette recherche.</p>
  <section class="nl-catalog-note"><h2>🔌 GPIO et brochage</h2><p>Chaque fiche module propose un GPIO recommandé pour un montage isolé. Dans une station, le câblage final est documenté dans les <a href="{{ nl_base }}/Projets.html">projets</a>. Les périphériques I²C peuvent partager SDA/SCL si leurs adresses ne sont pas en conflit ; les modules SPI partagent certaines lignes mais nécessitent une sélection adaptée.</p><p><strong>⚡ Sécurité électrique :</strong> les GPIO de l’ESP32-C6 fonctionnent en 3,3 V. Pour commander des charges, utilisez des circuits de puissance adaptés, notamment les modules <a href="{{ nl_base }}/hardware/NL-401A-PowerSwitch.html">NL-401A</a> ou <a href="{{ nl_base }}/hardware/NL-402A-Mosfet-PWM.html">NL-402A</a>.</p></section>
</section>
<script defer src="{{ nl_base }}/assets/js/natulib-catalogue.js"></script>

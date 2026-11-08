---
title: Modules
layout: default
bare: true
nav_order: 3
has_children: true
---
{% comment %}Liens construits par Jekyll : compatibles GitHub Pages et site local.{% endcomment %}
<link rel="stylesheet" href="{{ '/assets/css/natulib-pages.css' | relative_url }}">
<style>
/* Galerie des vignettes du catalogue : n'affecte pas les fiches individuelles. */
#nl-catalog .nl-module-media-gallery {
  position: relative;
  min-width: 0;
  isolation: isolate;
}
#nl-catalog .nl-module-gallery-arrow {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid rgba(255,255,255,.5);
  border-radius: 50%;
  background: rgba(17,24,39,.76);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.18);
  font: 32px/1 Arial, sans-serif;
  cursor: pointer;
  touch-action: manipulation;
  transition: background-color .15s ease, box-shadow .15s ease;
}
#nl-catalog .nl-module-gallery-prev { left: 8px; }
#nl-catalog .nl-module-gallery-next { right: 8px; }
#nl-catalog .nl-module-gallery-arrow:hover { background: rgba(17,24,39,.95); }
#nl-catalog .nl-module-gallery-arrow:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}
#nl-catalog .nl-module-gallery-count {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  padding: 3px 9px;
  border-radius: 20px;
  background: rgba(17,24,39,.72);
  color: #fff;
  font: 600 12px/1.5 system-ui, sans-serif;
  pointer-events: none;
  white-space: nowrap;
}
@media (max-width: 480px) {
  #nl-catalog .nl-module-gallery-arrow { width: 32px; height: 32px; font-size: 29px; }
}
</style>
<section class="nl-catalog" id="nl-catalog">
  <header class="nl-catalog-hero"><p class="nl-eyebrow">Catalogue matériel</p><h1>🧱 Modules Natulib</h1><p class="nl-catalog-intro">Explorez les briques matérielles de Natulib : recherche, famille, statut et informations pratiques en un coup d’œil.</p></header>
  <div class="nl-catalog-toolbar nl-compact-toolbar">
    <div class="nl-quick-filters">
    <input id="nl-module-search" class="nl-catalog-search" type="search" placeholder="Rechercher un module, une interface, une référence…" aria-label="Rechercher des modules">
    <div class="nl-capability-filter">
      <label for="nl-capability-select">Capacité</label>
      <select id="nl-capability-select" aria-label="Filtrer par capacité"><option value="">Toutes les capacités</option></select>
      <button type="button" id="nl-filter-reset" class="nl-filter">Effacer les filtres</button>
    </div>
    </div>
    <details class="nl-filter-drawer" id="nl-filter-drawer"><summary>⚙️ Filtres avancés <span id="nl-filter-badge" class="nl-filter-badge" hidden></span></summary>
    <div class="nl-advanced-filters" aria-label="Filtres et tri détaillés">
      <label>Statut<select id="nl-status-select"><option value="">Tous</option></select></label>
      <label>Niveau<select id="nl-level-select"><option value="">Tous</option></select></label>
      <label>Montage / soudure<select id="nl-mount-select"><option value="">Tous</option></select></label>
      <label>Interface<select id="nl-interface-select"><option value="">Toutes</option></select></label>
      <label>Alimentation<select id="nl-power-select"><option value="">Toutes</option></select></label>
      <label>Durée max (min)<input id="nl-max-time" type="number" min="0" step="1" placeholder="Sans limite"></label>
      <label>Prix max (€)<input id="nl-max-price" type="number" min="0" step="0.5" placeholder="Sans limite"></label>
      <label>Trier par<select id="nl-sort"><option value="reference">Référence</option><option value="name">Nom A → Z</option><option value="name-desc">Nom Z → A</option><option value="status">Statut</option><option value="level">Niveau</option><option value="mount">Soudure / montage</option><option value="interface">Interface</option><option value="time">Durée croissante</option><option value="time-desc">Durée décroissante</option><option value="price">Prix croissant</option><option value="price-desc">Prix décroissant</option></select></label>
    </div>
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
    </details>
    <div id="nl-active-filters" class="nl-active-filters" aria-label="Filtres actifs" aria-live="polite"></div>
  </div>
  <div class="nl-catalog-display">
  <p id="nl-catalog-count" aria-live="polite" class="nl-section-heading"><span>Catalogue des modules</span></p>
  <div class="nl-view-switch" role="group" aria-label="Mode d’affichage du catalogue">
    <button class="nl-view-button" type="button" data-view="cards" aria-pressed="true" title="Vue cartes">▦ <span>Cartes</span></button>
    <button class="nl-view-button" type="button" data-view="list" aria-pressed="false" title="Vue liste">☰ <span>Liste</span></button>
  </div>
</div>
  <div class="nl-module-grid" id="nl-module-grid" data-view="cards">
  {% comment %}Fiches récentes en priorité ; ancien dossier hardware/ en repli. Une seule carte par référence.{% endcomment %}
  {% assign nouvelles_fiches = site.pages | where_exp: 'item', "item.path contains 'modules/'" | sort: 'ref' %}
  {% assign anciennes_fiches = site.pages | where_exp: 'item', "item.path contains 'hardware/'" | sort: 'ref' %}
  {% assign modules = nouvelles_fiches | concat: anciennes_fiches %}
  {% assign refs_deja_vues = '' | split: ',' %}
  {% for mod in modules %}
  {% assign module_ref = mod.ref | default: mod.reference %}
  {% unless module_ref == nil or module_ref contains 'xxx' or mod.path contains 'TEMPLATE' or mod.path contains '-demo' or refs_deja_vues contains module_ref %}
    {% assign refs_deja_vues = refs_deja_vues | push: module_ref %}
    {% assign module_family = mod.famille | default: mod.categorie %}
    {% assign module_status = mod.etat | default: mod.statut %}
    {% assign module_montage = mod.montage | default: mod.soudure %}
    {% assign module_temps = mod.temps | default: mod.duree %}
    {% assign module_caps = mod.elements | default: mod.fonctions %}
    {% assign module_alim = mod.alimentation | default: mod.tension %}
    <article class="nl-module-card" data-name="{{ mod.title | downcase | escape }}" data-ref="{{ module_ref | escape }}" data-status="{{ module_status | downcase | escape }}" data-level="{{ mod.niveau | downcase | escape }}" data-mount="{{ module_montage | downcase | escape }}" data-interface="{{ mod.interface | downcase | escape }}" data-power="{{ module_alim | downcase | escape }}" data-time="{{ module_temps | escape }}" data-price="{{ mod.prix | escape }}" data-family="{{ module_family | downcase | escape }}" data-famille="{{ module_family | downcase | escape }}" data-capacities="{% for elem in module_caps %}{% assign c = elem.label | default: elem %}{{ c | slugify }} {% endfor %}">
      <span class="nl-module-top">
        <a class="nl-module-ref nl-card-filter-link" data-nl-filter-link data-nl-filter-key="recherche" data-nl-filter-value="{{ module_ref | escape }}" href="{{ '/Modules.html' | relative_url }}?recherche={{ module_ref | url_encode }}" title="Filtrer par référence">{{ module_ref | escape }}</a>
        <a class="nl-module-family nl-card-filter-link" data-nl-filter-link data-nl-filter-key="famille" data-nl-filter-value="{{ module_family | downcase | escape }}" href="{{ '/Modules.html' | relative_url }}?famille={{ module_family | downcase | url_encode }}" title="Voir les modules {{ module_family | escape }}">{{ module_family | escape }}</a>
      </span>
      {% comment %}Une galerie par module, uniquement si plusieurs images sont renseignées.{% endcomment %}
      {% assign first_image = mod.images | first %}
      {% assign image_count = 0 %}
      {% for gallery_image in mod.images %}
        {% if gallery_image.fichier %}{% assign image_count = image_count | plus: 1 %}{% endif %}
      {% endfor %}
      <div class="nl-module-media-gallery" data-nl-gallery data-nl-gallery-title="{{ mod.title | escape }}">
        <a class="nl-module-media" href="{{ mod.url | relative_url }}" tabindex="-1" aria-hidden="true">
          {% if first_image and first_image.fichier %}
            <img src="{{ first_image.fichier | relative_url }}" alt="" loading="lazy" decoding="async" onerror="this.hidden=true;this.parentNode.classList.add('nl-media-unavailable')">
          {% endif %}
          <span class="nl-module-media-fallback" aria-hidden="true">{% case mod.famille %}{% when 'displays' %}📺{% when 'sensors' %}🌡️{% when 'power' %}🔋{% when 'actuators' %}⚡{% when 'connectivity' %}📡{% when 'enclosures' %}📦{% else %}🧩{% endcase %}</span>
        </a>
        {% if image_count > 1 %}
          {% comment %}Les images suivantes ne sont chargées que lorsqu'on les affiche.{% endcomment %}
          <div class="nl-module-gallery-sources" hidden>
            {% for gallery_image in mod.images %}
              {% if gallery_image.fichier %}
                <span data-nl-gallery-src="{{ gallery_image.fichier | relative_url }}"></span>
              {% endif %}
            {% endfor %}
          </div>
          <button type="button" class="nl-module-gallery-arrow nl-module-gallery-prev" data-nl-gallery-step="-1" aria-label="Image précédente : {{ mod.title | escape }}" title="Image précédente">&#8249;</button>
          <button type="button" class="nl-module-gallery-arrow nl-module-gallery-next" data-nl-gallery-step="1" aria-label="Image suivante : {{ mod.title | escape }}" title="Image suivante">&#8250;</button>
          <span class="nl-module-gallery-count" aria-live="polite" aria-atomic="true">1 / {{ image_count }}</span>
        {% endif %}
      </div>
      <div class="nl-module-info">
      <a class="nl-module-title nl-card-main-link" href="{{ mod.url | relative_url }}">{{ mod.title | escape }}</a>
      {% if mod.description %}<span class="nl-module-desc">{{ mod.description | escape }}</span>{% endif %}
      {% if module_caps and module_caps.size > 0 %}
      <span class="nl-capacity-chips" aria-label="Capacités du module">
      {% for elem in module_caps %}
        {% assign c = elem.label | default: elem %}
        {% assign cl = c | remove_first: '🌡️ ' | remove_first: '💧 ' | remove_first: '🌦️ ' | remove_first: '🧠 ' | remove_first: '📡 ' | remove_first: '📶 ' | remove_first: '🔌 ' | remove_first: '📺 ' | remove_first: '☀️ ' | remove_first: '🚶 ' | remove_first: '📍 ' | remove_first: '👆 ' | remove_first: '⚡ ' | remove_first: '🔋 ' | remove_first: '🌧️ ' %}
        <a class="nl-chip nl-capacity-chip" data-nl-filter-link data-nl-filter-key="capacite" data-nl-filter-value="{{ cl | slugify | escape }}" href="{{ '/Modules.html' | relative_url }}?capacite={{ cl | slugify }}" title="Filtrer : {{ cl | escape }}">{{ c | escape }}</a>
      {% endfor %}
      </span>
      {% endif %}
      <span class="nl-chips">
        {% assign status_key = module_status | downcase %}
        {% case status_key %}{% when 'valide' %}{% assign status_label = '🟢 Validé' %}{% when 'validé' %}{% assign status_label = '🟢 Validé' %}{% when 'test' %}{% assign status_label = '🟡 En test' %}{% when 'en test' %}{% assign status_label = '🟡 En test' %}{% when 'planifie' %}{% assign status_label = '⚪ Planifié' %}{% when 'planifié' %}{% assign status_label = '⚪ Planifié' %}{% else %}{% assign status_label = module_status %}{% endcase %}
        {% if module_status %}<a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="statut" data-nl-filter-value="{{ module_status | escape }}" href="{{ '/Modules.html' | relative_url }}?statut={{ module_status | url_encode }}" title="Filtrer par statut">{{ status_label | escape }}</a>{% endif %}
        {% if mod.niveau %}<a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="niveau" data-nl-filter-value="{{ mod.niveau | escape }}" href="{{ '/Modules.html' | relative_url }}?niveau={{ mod.niveau | url_encode }}" title="Filtrer par niveau">👤 {{ mod.niveau | replace: 'debutant','Débutant' | replace: 'intermediaire','Intermédiaire' | replace: 'avance','Avancé' | escape }}</a>{% endif %}
        {% if module_montage %}
          {% assign mount_key = module_montage | downcase %}
          {% case mount_key %}{% when 'sans_outil' %}{% assign mount_label = '🟢 Sans outil' %}{% when 'sans-outil' %}{% assign mount_label = '🟢 Sans outil' %}{% when 'sans_soudure' %}{% assign mount_label = '🟢 Sans soudure' %}{% when 'sans-soudure' %}{% assign mount_label = '🟢 Sans soudure' %}{% when 'soudure' %}{% assign mount_label = '🟠 Soudure' %}{% else %}{% assign mount_label = module_montage %}{% endcase %}
          <a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="montage" data-nl-filter-value="{{ module_montage | escape }}" href="{{ '/Modules.html' | relative_url }}?montage={{ module_montage | url_encode }}" title="Filtrer par montage">{{ mount_label | escape }}</a>
        {% endif %}
        {% if mod.interface %}<a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="interface" data-nl-filter-value="{{ mod.interface | escape }}" href="{{ '/Modules.html' | relative_url }}?interface={{ mod.interface | url_encode }}" title="Filtrer par interface">🔌 {{ mod.interface | escape }}</a>{% endif %}
        {% if module_alim %}<a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="alimentation" data-nl-filter-value="{{ module_alim | escape }}" href="{{ '/Modules.html' | relative_url }}?alimentation={{ module_alim | url_encode }}" title="Filtrer par alimentation">⚡ {{ module_alim | escape }}</a>{% endif %}
        {% if module_temps %}<a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="temps_max" data-nl-filter-value="{{ module_temps | escape }}" href="{{ '/Modules.html' | relative_url }}?temps_max={{ module_temps | url_encode }}" title="Voir les modules avec une installation aussi rapide ou plus rapide">⏱️ {% if mod.duree %}{{ mod.duree | escape }}{% else %}{{ mod.temps | escape }} min{% endif %}</a>{% endif %}
        {% if mod.prix %}{% assign prix_txt = mod.prix | append: '' %}<a class="nl-chip nl-chip-filter" data-nl-filter-link data-nl-filter-key="prix_max" data-nl-filter-value="{{ mod.prix | escape }}" href="{{ '/Modules.html' | relative_url }}?prix_max={{ mod.prix | url_encode }}" title="Voir les modules à ce prix ou moins">💶 {{ prix_txt | escape }}{% unless prix_txt contains '€' %} €{% endunless %}</a>{% endif %}
      </span>
      </div>
    </article>
  {% endunless %}
  {% endfor %}
  </div>
  <p id="nl-catalog-empty" class="nl-empty" hidden>Aucun module ne correspond à cette recherche.</p>
  <section class="nl-catalog-note"><h2>🔌 GPIO et brochage</h2><p>Chaque fiche module propose un GPIO recommandé pour un montage isolé. Dans une station, le câblage final est documenté dans les <a href="{{ '/Projets.html' | relative_url }}">projets</a>. Les périphériques I²C peuvent partager SDA/SCL si leurs adresses ne sont pas en conflit ; les modules SPI partagent certaines lignes mais nécessitent une sélection adaptée.</p><p><strong>⚡ Sécurité électrique :</strong> les GPIO de l’ESP32-C6 fonctionnent en 3,3 V. Pour commander des charges, utilisez des circuits de puissance adaptés, notamment les modules <a href="{{ '/hardware/NL-401A-PowerSwitch.html' | relative_url }}">NL-401A</a> ou <a href="{{ '/hardware/NL-402A-Mosfet-PWM.html' | relative_url }}">NL-402A</a>.</p></section>
</section>
<script>
/* Navigation indépendante dans chaque carte ; les autres liens et filtres restent intacts. */
(function () {
  var catalog = document.getElementById('nl-catalog');
  if (!catalog) return;

  catalog.addEventListener('click', function (event) {
    var button = event.target.closest('[data-nl-gallery-step]');
    if (!button || !catalog.contains(button)) return;
    event.preventDefault();
    event.stopPropagation();

    var gallery = button.closest('[data-nl-gallery]');
    if (!gallery) return;
    var image = gallery.querySelector('.nl-module-media img');
    var link = gallery.querySelector('.nl-module-media');
    var sources = gallery.querySelectorAll('[data-nl-gallery-src]');
    var count = gallery.querySelector('.nl-module-gallery-count');
    if (!image || !link || !count || sources.length < 2) return;

    var current = Number(gallery.dataset.nlGalleryIndex || 0);
    var step = Number(button.dataset.nlGalleryStep || 1);
    var next = (current + step + sources.length) % sources.length;
    var src = sources[next].getAttribute('data-nl-gallery-src');
    if (!src) return;

    gallery.dataset.nlGalleryIndex = String(next);
    link.classList.remove('nl-media-unavailable');
    image.hidden = false;
    image.src = src;
    count.textContent = (next + 1) + ' / ' + sources.length;
    count.setAttribute('aria-label', 'Image ' + (next + 1) + ' sur ' + sources.length + ' : ' + (gallery.dataset.nlGalleryTitle || 'module'));
  });
})();
</script>
<script defer src="{{ '/assets/js/natulib-catalogue.js' | relative_url }}?v=20261029-panneau-ferme"></script>

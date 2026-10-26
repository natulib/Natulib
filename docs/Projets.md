---
layout: default
title: Projets
bare: true
nav_order: 4
has_children: true
---
{% assign nl_base = site.baseurl | default: '/Natulib' %}
<link rel="stylesheet" href="{{ nl_base }}/assets/css/natulib-pages.css">
<section class="nl-catalog" id="nl-project-catalog">
  <header class="nl-catalog-hero"><p class="nl-eyebrow">Réalisations Natulib</p><h1>🏗️ Projets Natulib</h1><p class="nl-catalog-intro">Des stations combinant plusieurs modules. Explorez les réalisations, leur état d'avancement et leur documentation.</p></header>
  <div class="nl-catalog-toolbar nl-compact-toolbar">
    <div class="nl-quick-filters">
      <input id="nl-project-search" class="nl-catalog-search" type="search" placeholder="Rechercher un projet…" aria-label="Rechercher un projet">
      <label class="nl-quick-select">Statut <select id="nl-project-status"><option value="">Tous</option></select></label>
    </div>
    <details class="nl-filter-drawer"><summary>⚙️ Filtres et tri</summary><div class="nl-advanced-filters">
      <label>Trier par<select id="nl-project-sort"><option value="name">Nom A → Z</option><option value="name-desc">Nom Z → A</option><option value="status">Statut</option></select></label>
    </div></details>
    <div id="nl-project-active" class="nl-active-filters" aria-label="Filtres actifs"></div>
  </div>
  <div class="nl-catalog-display"><p id="nl-project-count" class="nl-section-heading" aria-live="polite">Projets</p>
    <div class="nl-view-switch" role="group" aria-label="Affichage des projets"><button type="button" class="nl-view-button" data-view="cards" aria-pressed="true">▦ Cartes</button><button type="button" class="nl-view-button" data-view="list" aria-pressed="false">☰ Liste</button></div>
  </div>
  <div class="nl-module-grid nl-project-grid" id="nl-project-grid" data-view="cards">
  {% assign projets = site.pages | where_exp: 'item', "item.path contains 'projects/'" | sort: 'title' %}
  {% for projet in projets %}
    {% unless projet.path contains 'TEMPLATE' or projet.title == nil %}
    {% assign status_raw = projet.statut | default: 'a_venir' %}
    {% assign status_key = status_raw | downcase | slugify %}
    {% assign proj_img = projet.image | default: projet.cover | default: projet.photo %}
    <article class="nl-module-card nl-project-card" data-name="{{ projet.title | downcase | escape }}" data-status="{{ status_key | escape }}">
      <span class="nl-module-top"><span class="nl-module-ref">PROJET NATULIB</span><span class="nl-module-family">{{ projet.parent | default: 'Projets' | escape }}</span></span>
      <a href="{{ projet.url | relative_url }}" class="nl-module-media" tabindex="-1" aria-hidden="true">
        {% if proj_img %}<img src="{{ proj_img | relative_url }}" alt="" loading="lazy" onerror="this.hidden=true;this.parentNode.classList.add('nl-media-unavailable')">{% endif %}
        <span class="nl-module-media-fallback" aria-hidden="true">🏗️</span>
      </a>
      <div class="nl-module-info">
        <a class="nl-module-title nl-card-main-link" href="{{ projet.url | relative_url }}">{{ projet.title | escape }}</a>
        {% assign excerpt = projet.description | default: projet.resume | default: projet.excerpt %}
        {% if excerpt %}<span class="nl-module-desc">{{ excerpt | strip_html | strip_newlines | truncate: 150 | escape }}</span>{% endif %}
        <span class="nl-chips"><span class="nl-chip">{% case status_key %}{% when 'planifie' %}🔵 Planifié{% when 'redaction' %}📝 En rédaction{% when 'valide' %}🟢 Validé{% when 'test' %}🟡 En test{% when 'a-venir' %}⚪ À venir{% else %}{{ status_raw | escape }}{% endcase %}</span></span>
      </div>
    </article>
    {% endunless %}
  {% endfor %}
  </div>
  <p class="nl-empty" id="nl-project-empty" hidden>Aucun projet ne correspond à cette recherche.</p>
  <section class="nl-catalog-note"><h2>✍️ Créer un projet</h2><p>Chaque projet documente le câblage de sa combinaison de modules. Pour contribuer, consultez le <a href="{{ nl_base }}/projects/TEMPLATE-projet.html">gabarit projet</a> et le <a href="{{ nl_base }}/contribute/projet.html">guide de contribution</a>.</p></section>
</section>
<script defer src="{{ nl_base }}/assets/js/natulib-projets.js"></script>

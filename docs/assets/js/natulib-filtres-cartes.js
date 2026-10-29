/* Natulib — Correctif autonome pour les pastilles cliquables dans Modules.html.
   Il pilote les filtres EXISTANTS du catalogue : pas de double moteur de filtrage.
   Compatible avec la vue Cartes et la vue Liste. */
(() => {
  'use strict';

  function init() {
    const catalog = document.querySelector('#nl-catalog');
    const grid = catalog?.querySelector('#nl-module-grid, .nl-module-grid');
    if (!grid || grid.dataset.nlCardFiltersReady === 'true') return;
    grid.dataset.nlCardFiltersReady = 'true';

    const chipSelector = [
      '.nl-module-family', '.nl-module-ref', '.nl-capacity-chip',
      '.nl-chips .nl-chip', '.nl-chip-filter', '[data-nl-filter-link]'
    ].join(', ');
    const validParams = new Set([
      'famille', 'capacite', 'recherche', 'statut', 'niveau', 'montage',
      'interface', 'alimentation', 'temps_max', 'prix_max'
    ]);
    const filterIds = {
      capacite: 'nl-capability-select',
      statut: 'nl-status-select',
      niveau: 'nl-level-select',
      montage: 'nl-mount-select',
      interface: 'nl-interface-select',
      alimentation: 'nl-power-select'
    };
    const norm = value => String(value ?? '').trim().toLocaleLowerCase('fr')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[_\s]+/g, '-');
    const valueWithoutIcon = value => String(value ?? '')
      .replace(/^[^\p{L}\p{N}]+/u, '').trim();
    const numeric = value => {
      const match = String(value ?? '').replace(',', '.').match(/\d+(?:\.\d+)?/);
      return match ? match[0] : '';
    };

    function extract(chip) {
      const href = chip.getAttribute('href');
      if (href && href.includes('?')) {
        try {
          const target = new URL(href, location.href);
          // Ne pas intercepter les liens d'un autre site.
          if (target.origin !== location.origin) return null;
          for (const [key, value] of target.searchParams) {
            if (validParams.has(key) && value) return { key, value };
          }
        } catch (_) { /* La classe peut encore indiquer le filtre. */ }
      }
      const requested = chip.dataset.filterParam || chip.dataset.filter || '';
      const value = chip.dataset.filterValue || chip.dataset.value || valueWithoutIcon(chip.textContent);
      if (validParams.has(requested) && value) return { key: requested, value };
      if (chip.classList.contains('nl-module-family')) return { key: 'famille', value };
      if (chip.classList.contains('nl-module-ref')) return { key: 'recherche', value };
      if (chip.classList.contains('nl-capacity-chip')) return { key: 'capacite', value: norm(value) };
      const text = (chip.textContent || '').trim();
      const key = text.startsWith('🔌') ? 'interface'
        : text.startsWith('⚡') ? 'alimentation'
        : text.startsWith('⏱️') ? 'temps_max'
        : text.startsWith('💶') ? 'prix_max'
        : text.startsWith('👤') ? 'niveau'
        : /valid|test|planifi/i.test(value) ? 'statut'
        : /soudure|outil/i.test(value) ? 'montage' : '';
      return key && value ? { key, value } : null;
    }

    function apply({ key, value }) {
      if (key === 'famille') {
        const button = [...catalog.querySelectorAll('.nl-filter[data-family]')]
          .find(b => norm(b.dataset.family) === norm(value));
        if (button) { button.click(); return true; }
        return false;
      }
      if (key === 'recherche') {
        const input = catalog.querySelector('#nl-module-search');
        if (!input) return false;
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
      }
      if (key === 'temps_max' || key === 'prix_max') {
        const input = catalog.querySelector(key === 'temps_max' ? '#nl-max-time' : '#nl-max-price');
        const number = numeric(value);
        if (!input || !number) return false;
        input.value = number;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
      }
      const select = catalog.querySelector('#' + (filterIds[key] || ''));
      if (!select) return false;
      const option = [...select.options].find(o => o.value && (
        norm(o.value) === norm(value) || norm(o.textContent) === norm(value)
      ));
      if (!option) return false;
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }

    // Capture : une autre logique de clic sur les cartes ne peut pas absorber la pastille.
    grid.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const chip = event.target.closest?.(chipSelector);
      if (!chip || !grid.contains(chip)) return;
      const filter = extract(chip);
      if (!filter) return;
      // Les filtres appliqués en place gardent la recherche et les autres critères.
      if (apply(filter)) {
        event.preventDefault();
        event.stopPropagation();
      }
      // Sinon, laisser le lien normal agir : le catalogue peut lire ?filtre=valeur.
    }, true);

    // Support clavier pour d'anciennes pastilles <span role="button">.
    grid.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const chip = event.target.closest?.(chipSelector);
      if (!chip || !grid.contains(chip) || chip.tagName === 'A') return;
      event.preventDefault();
      chip.click();
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

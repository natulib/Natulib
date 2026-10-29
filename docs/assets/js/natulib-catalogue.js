/**
 * Natulib — moteur UNIQUE des filtres du catalogue Modules.
 *
 * Sources des filtres :
 *  1) URL (?famille=core, ?capacite=..., etc.) depuis une fiche détaillée ;
 *  2) Liens des cartes data-nl-filter-key / data-nl-filter-value ;
 *  3) Contrôles du catalogue (boutons, menus, recherche, durée/prix).
 *
 * Aucun script supplémentaire de « correctif des filtres » ne doit être chargé.
 */
(() => {
  'use strict';
  const root = document.getElementById('nl-catalog');
  if (!root) return;

  const get = id => root.querySelector('#' + id);
  const grid = get('nl-module-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.nl-module-card'));
  const search = get('nl-module-search');
  const capabilities = get('nl-capability-select');
  const familyButtons = Array.from(root.querySelectorAll('.nl-filter[data-family]'));
  const activeBar = get('nl-active-filters');
  const count = get('nl-catalog-count');
  const empty = get('nl-catalog-empty');
  const badge = get('nl-filter-badge');
  const drawer = get('nl-filter-drawer');
  const reset = get('nl-filter-reset');
  const sort = get('nl-sort');
  const maxTime = get('nl-max-time');
  const maxPrice = get('nl-max-price');
  const viewButtons = Array.from(root.querySelectorAll('.nl-view-button'));
  const controls = {
    status: get('nl-status-select'),
    level: get('nl-level-select'),
    mount: get('nl-mount-select'),
    interface: get('nl-interface-select'),
    power: get('nl-power-select')
  };

  // Valeur normalisée unique pour liens, données des cartes et menus.
  const canon = value => String(value ?? '').trim().toLocaleLowerCase('fr')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/²/g, '2')
    .replace(/[\s_]+/g, '-');
  const number = value => {
    const match = String(value ?? '').replace(',', '.').match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  };
  const labels = {
    status: {valide:'Validé',test:'En test', 'en-test':'En test',planifie:'Planifié'},
    level: {debutant:'Débutant',intermediaire:'Intermédiaire',avance:'Avancé'},
    mount: {'sans-outil':'Sans outil','sans-soudure':'Sans soudure',soudure:'Soudure'}
  };
  const display = (field, raw) => labels[field]?.[canon(raw)] || String(raw).replace(/[_-]/g, ' ');
  const queryNames = {
    famille: 'family', capacite: 'capacity', recherche: 'search',
    statut: 'status', niveau: 'level', montage: 'mount',
    interface: 'interface', alimentation: 'power',
    temps_max: 'time', prix_max: 'price'
  };
  const current = {
    family: 'all'
  };

  // La taille du titre des mini-cartes ne dépend plus du script des fiches.
  cards.forEach(card => {
    const title = card.querySelector('.nl-module-title');
    if (!title || title.hasAttribute('data-title-len')) return;
    const len = title.textContent.trim().length;
    title.dataset.titleLen = len > 36 ? 'xl' : len > 22 ? 'long' : 'normal';
  });

  // Construire les options à partir du catalogue affiché, sans valeurs inventées.
  const capacityNames = new Map();
  cards.forEach(card => {
    card._nlCapacities = new Set();
    card.querySelectorAll('.nl-capacity-chip').forEach(link => {
      let raw = link.dataset.nlFilterValue;
      if (!raw && link.getAttribute('href')) {
        try { raw = new URL(link.href, location.href).searchParams.get('capacite'); }
        catch (_) { /* lien sans URL exploitable */ }
      }
      if (!raw) return;
      const key = canon(raw);
      card._nlCapacities.add(key);
      if (!capacityNames.has(key)) capacityNames.set(key, link.textContent.trim());
    });
    // Compatibilité avec les anciennes cartes utilisant data-capacities.
    if (!card._nlCapacities.size) {
      for (const key of (card.dataset.capacities || '').split(/\s+/).filter(Boolean)) {
        card._nlCapacities.add(canon(key));
      }
    }
  });
  if (capabilities) {
    [...capacityNames.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], 'fr'))
      .forEach(([key, label]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = label;
        capabilities.append(option);
      });
  }

  Object.entries(controls).forEach(([field, control]) => {
    if (!control) return;
    const distinct = new Map();
    cards.forEach(card => {
      const raw = card.dataset[field];
      if (raw && !distinct.has(canon(raw))) distinct.set(canon(raw), raw);
    });
    [...distinct].sort((a, b) => display(field,a[1]).localeCompare(display(field,b[1]),'fr'))
      .forEach(([key, raw]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = display(field,raw);
        control.append(option);
      });
  });

  function ensureOption(select, raw, label) {
    if (!select) return;
    const value = canon(raw);
    if (!value) { select.value = ''; return; }
    if (!Array.from(select.options).some(o => o.value === value)) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label || String(raw);
      select.append(option);
    }
    select.value = value;
  }
  function setFamily(raw) {
    current.family = !raw || canon(raw) === 'all' ? 'all' : canon(raw);
    familyButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(canon(button.dataset.family) === current.family));
    });
  }
  function setFilter(name, value) {
    const field = queryNames[name];
    if (!field) return false;
    if (field === 'family') setFamily(value);
    else if (field === 'capacity') ensureOption(capabilities, value, capacityNames.get(canon(value)) || value);
    else if (field === 'search' && search) search.value = value || '';
    else if (field === 'time' && maxTime) maxTime.value = Number.isFinite(number(value)) ? number(value) : '';
    else if (field === 'price' && maxPrice) maxPrice.value = Number.isFinite(number(value)) ? number(value) : '';
    else if (controls[field]) ensureOption(controls[field],value,display(field,value));
    return true;
  }
  function clearFilters() {
    if (search) search.value = '';
    if (capabilities) capabilities.value = '';
    setFamily('all');
    Object.values(controls).forEach(control => { if (control) control.value = ''; });
    if (maxTime) maxTime.value = '';
    if (maxPrice) maxPrice.value = '';
  }
  function readURL() {
    clearFilters();
    const params = new URLSearchParams(location.search);
    for (const key of Object.keys(queryNames)) {
      if (params.has(key)) setFilter(key, params.get(key));
    }
    // Le panneau « Filtres avancés » reste dans l'état choisi par l'utilisateur.
    // L'arrivée depuis une fiche (?famille=displays, ?statut=valide, etc.)
    // applique le filtre et affiche sa pastille active SANS ouvrir le panneau.
  }
  function writeURL(mode) {
    if (mode === 'none') return;
    const url = new URL(location.href);
    Object.keys(queryNames).forEach(key => url.searchParams.delete(key));
    if (current.family !== 'all') url.searchParams.set('famille', current.family);
    if (capabilities?.value) url.searchParams.set('capacite',capabilities.value);
    if (search?.value.trim()) url.searchParams.set('recherche', search.value.trim());
    const byField = {status:'statut',level:'niveau',mount:'montage',interface:'interface',power:'alimentation'};
    Object.entries(byField).forEach(([field,key]) => {
      if (controls[field]?.value) url.searchParams.set(key,controls[field].value);
    });
    if (maxTime?.value) url.searchParams.set('temps_max',maxTime.value);
    if (maxPrice?.value) url.searchParams.set('prix_max',maxPrice.value);
    const next = url.pathname + url.search + url.hash;
    if (next === location.pathname + location.search + location.hash) return;
    if (mode === 'push') history.pushState(null,'',next);
    else history.replaceState(null,'',next);
  }
  function render(mode='replace') {
    const q = canon(search?.value);
    const cap = canon(capabilities?.value);
    let shown = 0;
    cards.forEach(card => {
      const matchFamily = current.family === 'all' || canon(card.dataset.family) === current.family;
      const matchCapacity = !cap || card._nlCapacities.has(cap);
      const matchSearch = !q || canon(card.textContent).includes(q) || canon(card.dataset.ref).includes(q);
      const matchFields = Object.entries(controls).every(([field,control]) =>
        !control?.value || canon(card.dataset[field]) === control.value);
      const matchTime = !maxTime?.value || number(card.dataset.time) <= Number(maxTime.value);
      const matchPrice = !maxPrice?.value || number(card.dataset.price) <= Number(maxPrice.value);
      card.hidden = !(matchFamily && matchCapacity && matchSearch && matchFields && matchTime && matchPrice);
      if (!card.hidden) shown++;
    });

    const sorting = sort?.value || 'reference';
    const reverse = sorting.endsWith('-desc');
    const field = reverse ? sorting.slice(0,-5) : sorting;
    const order = {debutant:0,intermediaire:1,avance:2};
    const statusOrder = {valide:0,test:1,'en-test':1,planifie:2};
    cards.slice().sort((a,b) => {
      let x = field === 'reference' ? a.dataset.ref : a.dataset[field];
      let y = field === 'reference' ? b.dataset.ref : b.dataset[field];
      if (field === 'level') { x = order[canon(x)] ?? 99; y = order[canon(y)] ?? 99; }
      if (field === 'status') { x = statusOrder[canon(x)] ?? 99; y = statusOrder[canon(y)] ?? 99; }
      if (field === 'price' || field === 'time') { x = number(x); y = number(y); }
      const diff = typeof x === 'number' && typeof y === 'number'
        ? (Number.isNaN(x) ? Infinity : x) - (Number.isNaN(y) ? Infinity : y)
        : String(x ?? '').localeCompare(String(y ?? ''),'fr',{numeric:true});
      return (reverse ? -1 : 1) * diff;
    }).forEach(card => grid.append(card));

    const selected = [];
    if (search?.value.trim()) selected.push(['Recherche : '+search.value.trim(), () => { search.value = ''; }]);
    if (capabilities?.value) selected.push(['Capacité : '+(capabilities.selectedOptions[0]?.textContent || cap), () => { capabilities.value = ''; }]);
    if (current.family !== 'all') {
      const familyName = familyButtons.find(b => canon(b.dataset.family) === current.family)?.textContent.trim() || current.family;
      selected.push(['Famille : '+familyName, () => setFamily('all')]);
    }
    Object.entries(controls).forEach(([field,control]) => {
      if (!control?.value) return;
      const label = {status:'Statut',level:'Niveau',mount:'Montage',interface:'Interface',power:'Alimentation'}[field];
      selected.push([label + ' : ' + (control.selectedOptions[0]?.textContent || control.value),() => {control.value = '';}]);
    });
    if (maxTime?.value) selected.push(['Durée ≤ '+maxTime.value+' min',() => {maxTime.value = '';}]);
    if (maxPrice?.value) selected.push(['Prix ≤ '+maxPrice.value+' €',() => {maxPrice.value = '';}]);
    if (activeBar) {
      activeBar.replaceChildren();
      selected.forEach(([text, clear]) => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'nl-active-chip';
        button.textContent = text + ' ×';
        button.setAttribute('aria-label', 'Retirer le filtre ' + text);
        button.addEventListener('click', () => {clear();render('push');});
        activeBar.append(button);
      });
    }
    const advancedCount = selected.length - (search?.value.trim() ? 1 : 0) - (capabilities?.value ? 1 : 0);
    if (badge) { badge.hidden = advancedCount <= 0; if (advancedCount > 0) badge.textContent = advancedCount; }
    if (count) count.textContent = shown+' module'+(shown === 1 ? '' : 's')+' affiché'+(shown === 1 ? '' : 's');
    if (empty) empty.hidden = shown !== 0;
    writeURL(mode);
  }

  // Clic sur une pastille : le lien décrit EXPLICITEMENT la valeur.
  // Aucune comparaison entre /Modules/, /Modules.html et le chemin courant.
  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const link = target?.closest('.nl-module-card a[data-nl-filter-key]');
    if (!link || !root.contains(link)) return;
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const name = link.dataset.nlFilterKey;
    const value = link.dataset.nlFilterValue;
    if (!(name in queryNames) || !value) return; // Un vrai lien reste un repli fonctionnel.
    event.preventDefault();
    event.stopPropagation();
    setFilter(name,value);
    render('push');
  }, true);

  familyButtons.forEach(button => button.addEventListener('click',() => {setFamily(button.dataset.family);render('push');}));
  if (search) search.addEventListener('input',() => render('replace'));
  if (capabilities) capabilities.addEventListener('change',() => render('push'));
  Object.values(controls).forEach(control => control?.addEventListener('change',() => render('push')));
  [maxTime,maxPrice].forEach(control => control?.addEventListener('input',() => render('replace')));
  sort?.addEventListener('change',() => render('none'));
  reset?.addEventListener('click',() => {clearFilters();if (sort) sort.value='reference';render('push');});
  viewButtons.forEach(button => button.addEventListener('click',() => {
    setView(button.dataset.view);
  }));
  function setView(value) {
    const view = value === 'list' ? 'list' : 'cards';
    grid.dataset.view = view;
    viewButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.view === view)));
    try {localStorage.setItem('natulib.catalog.view',view);} catch (_) {}
  }
  let initialView = 'cards';
  try {initialView = localStorage.getItem('natulib.catalog.view') || 'cards';} catch (_) {}
  setView(initialView);

  readURL();
  render('none'); // Ne modifie pas l'URL de la page à l'ouverture.
  window.addEventListener('popstate',() => {readURL();render('none');});
})();

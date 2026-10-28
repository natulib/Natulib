/* Natulib — Catalogue modules : filtres par URL et liens cliquables dans les cartes. */
(() => {
  'use strict';
  const root = document.getElementById('nl-catalog');
  if (!root) return;
  const $ = id => root.querySelector('#' + id);
  const search = $('nl-module-search');
  const grid = $('nl-module-grid');
  const cards = [...grid.querySelectorAll('.nl-module-card')];
  const buttons = [...root.querySelectorAll('.nl-filter[data-family]')];
  const count = $('nl-catalog-count');
  const empty = $('nl-catalog-empty');
  const capSelect = $('nl-capability-select');
  const reset = $('nl-filter-reset');
  const activeBar = $('nl-active-filters');
  const filterBadge = $('nl-filter-badge');
  const drawer = $('nl-filter-drawer');
  const viewButtons = [...root.querySelectorAll('.nl-view-button')];
  const controls = {
    status: $('nl-status-select'), level: $('nl-level-select'),
    mount: $('nl-mount-select'), interface: $('nl-interface-select'),
    power: $('nl-power-select')
  };
  const maxTime = $('nl-max-time'), maxPrice = $('nl-max-price'), sort = $('nl-sort');
  const urlParams = {
    famille: 'family', capacite: 'capacity', recherche: 'search',
    statut: 'status', niveau: 'level', montage: 'mount',
    interface: 'interface', alimentation: 'power',
    temps_max: 'time', prix_max: 'price'
  };
  const clean = str => String(str ?? '').trim().toLocaleLowerCase('fr');
  const canon = str => {
    let s = clean(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[_\s]+/g, '-');
    if (s === 'en-test') s = 'test';
    if (s === 'planifiee') s = 'planifie';
    return s;
  };
  const numeric = value => {
    const str = String(value ?? '').replace(',', '.');
    const match = str.match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : Infinity;
  };
  const labels = {status: {'valide':'Validé','test':'En test','planifie':'Planifié'},
    level: {'debutant':'Débutant','intermediaire':'Intermédiaire','avance':'Avancé'},
    mount: {'sans-outil':'Sans outil','sans-soudure':'Sans soudure','soudure':'Soudure requise'}};
  const labelFor = (field, raw) => labels[field]?.[canon(raw)] || String(raw).replace(/[-_]/g, ' ');

  // Capacités : les liens des cartes constituent la source de vérité des slugs.
  const capacityLabels = new Map();
  cards.forEach(card => card.querySelectorAll('.nl-capacity-chip[href]').forEach(link => {
    const slug = new URL(link.href, location.href).searchParams.get('capacite');
    if (!slug) return;
    (card._nlCapacites ||= new Set()).add(slug);
    if (!capacityLabels.has(slug)) capacityLabels.set(slug, link.textContent.trim());
  }));
  [...capacityLabels.entries()].sort((a,b) => a[1].localeCompare(b[1],'fr')).forEach(([slug,label]) => {
    const opt = document.createElement('option'); opt.value = slug; opt.textContent = label;
    capSelect.append(opt);
  });
  Object.entries(controls).forEach(([field,select]) => {
    const distinct = new Map();
    cards.forEach(card => {
      const raw = card.dataset[field];
      if (raw && !distinct.has(canon(raw))) distinct.set(canon(raw), raw);
    });
    [...distinct.entries()].sort((a,b) => labelFor(field,a[1]).localeCompare(labelFor(field,b[1]),'fr'))
      .forEach(([value,raw]) => {
        const opt = document.createElement('option'); opt.value = value;
        opt.textContent = labelFor(field,raw); select.append(opt);
      });
  });
  let activeFamily = 'all';
  let view = 'cards';
  try { view = localStorage.getItem('natulib.catalog.view') || 'cards'; } catch (_) {}
  function setView(next) {
    view = next === 'list' ? 'list' : 'cards';
    grid.dataset.view = view;
    viewButtons.forEach(b => b.setAttribute('aria-pressed',String(b.dataset.view === view)));
    try { localStorage.setItem('natulib.catalog.view',view); } catch (_) {}
  }
  viewButtons.forEach(b => b.addEventListener('click',() => setView(b.dataset.view)));
  setView(view);

  function selectOption(select,value) {
    const v = canon(value);
    if (v && ![...select.options].some(o => o.value === v)) {
      const option = document.createElement('option'); option.value = v;
      option.textContent = labelFor(Object.keys(controls).find(k => controls[k] === select),value);
      select.append(option);
    }
    select.value = v;
  }
  function setFamily(v) {
    activeFamily = v && v !== 'all' ? canon(v) : 'all';
    buttons.forEach(b => b.setAttribute('aria-pressed',String(canon(b.dataset.family) === activeFamily)));
  }
  // Applique les paramètres en arrivant depuis une fiche module.
  function readURL(replaceAll = true) {
    const params = new URLSearchParams(location.search);
    if (replaceAll) {
      search.value = ''; capSelect.value = ''; setFamily('all');
      Object.values(controls).forEach(c => c.value = '');
      maxTime.value = ''; maxPrice.value = '';
    }
    for (const [param,field] of Object.entries(urlParams)) {
      if (!params.has(param)) continue;
      const raw = params.get(param);
      if (field === 'family') setFamily(raw);
      else if (field === 'capacity') {
        if (raw && ![...capSelect.options].some(o => o.value === raw)) {
          const option = document.createElement('option'); option.value = raw; option.textContent = raw; capSelect.append(option);
        }
        capSelect.value = raw;
      } else if (field === 'search') search.value = raw;
      else if (field === 'time') maxTime.value = Number.isFinite(numeric(raw)) ? numeric(raw) : '';
      else if (field === 'price') maxPrice.value = Number.isFinite(numeric(raw)) ? numeric(raw) : '';
      else selectOption(controls[field],raw);
    }
    // Le filtre activé reste visible, même si le panneau avancé était fermé.
    if ([...params.keys()].some(k => ['famille','statut','niveau','montage','interface','alimentation','temps_max','prix_max'].includes(k))) drawer.open = true;
  }
  function writeURL() {
    const url = new URL(location.href);
    Object.keys(urlParams).forEach(k => url.searchParams.delete(k));
    if (activeFamily !== 'all') url.searchParams.set('famille',activeFamily);
    if (capSelect.value) url.searchParams.set('capacite',capSelect.value);
    if (search.value.trim()) url.searchParams.set('recherche',search.value.trim());
    Object.entries({status:'statut',level:'niveau',mount:'montage',interface:'interface',power:'alimentation'})
      .forEach(([field,key]) => {if (controls[field].value) url.searchParams.set(key,controls[field].value);});
    if (maxTime.value) url.searchParams.set('temps_max',maxTime.value);
    if (maxPrice.value) url.searchParams.set('prix_max',maxPrice.value);
    history.replaceState(null,'',url.pathname + url.search + url.hash);
  }
  function update() {
    const q = clean(search.value), cap = capSelect.value;
    let shown = 0;
    cards.forEach(card => {
      const caps = card._nlCapacites || new Set((card.dataset.capacities || '').split(/\s+/));
      const ok = (activeFamily === 'all' || canon(card.dataset.family) === activeFamily)
        && (!cap || caps.has(cap)) && (!q || clean(card.textContent).includes(q))
        && Object.entries(controls).every(([field,c]) => !c.value || canon(card.dataset[field]) === c.value)
        && (!maxTime.value || numeric(card.dataset.time) <= Number(maxTime.value))
        && (!maxPrice.value || numeric(card.dataset.price) <= Number(maxPrice.value));
      card.hidden = !ok; if (ok) shown++;
    });
    const field = sort.value, desc = field.endsWith('-desc');
    const base = desc ? field.slice(0,-5) : field;
    const order = {debutant:0,intermediaire:1,avance:2};
    const statusOrder = {valide:0,test:1,planifie:2};
    cards.slice().sort((a,b) => {
      let x = a.dataset[base] || '', y = b.dataset[base] || '';
      if (base === 'reference') {x = a.dataset.ref || '';y = b.dataset.ref || '';}
      if (base === 'level') {x = order[canon(x)] ?? 99;y = order[canon(y)] ?? 99;}
      if (base === 'status') {x = statusOrder[canon(x)] ?? 99;y = statusOrder[canon(y)] ?? 99;}
      if (base === 'time' || base === 'price') {x = numeric(x);y = numeric(y);}
      const cmp = typeof x === 'number' && typeof y === 'number' ? x-y : String(x).localeCompare(String(y),'fr',{numeric:true});
      return (desc ? -1 : 1) * cmp;
    }).forEach(card => grid.append(card));
    const selected = [];
    if (q) selected.push(['Recherche : '+search.value.trim(),() => {search.value='';}]);
    if (cap) selected.push(['Capacité : '+(capSelect.selectedOptions[0]?.textContent || cap),() => {capSelect.value='';}]);
    if (activeFamily !== 'all') selected.push(['Famille : '+(buttons.find(b => canon(b.dataset.family) === activeFamily)?.textContent.trim() || activeFamily),() => setFamily('all')]);
    Object.entries(controls).forEach(([field,c]) => {
      if (c.value) selected.push([c.parentElement.textContent.trim().split('\n')[0]+' : '+(c.selectedOptions[0]?.textContent || c.value),() => {c.value='';}]);
    });
    if (maxTime.value) selected.push(['Durée ≤ '+maxTime.value+' min',() => {maxTime.value='';}]);
    if (maxPrice.value) selected.push(['Prix ≤ '+maxPrice.value+' €',() => {maxPrice.value='';}]);
    activeBar.replaceChildren();
    selected.forEach(([text,clear]) => {
      const btn = document.createElement('button');btn.type='button';btn.className='nl-active-chip';btn.textContent=text+' ×';
      btn.title = 'Retirer le filtre';btn.addEventListener('click',() => {clear();update();});activeBar.append(btn);
    });
    const advCount = selected.length - (q?1:0) - (cap?1:0);
    filterBadge.hidden = advCount === 0;
    if (advCount) filterBadge.textContent = advCount;
    count.textContent = shown+' module'+(shown!==1?'s':'')+' affiché'+(shown!==1?'s':'');
    empty.hidden = shown > 0;
    writeURL();
  }
  // Un clic sur une pastille depuis le listing ajoute le filtre SANS rechargement.
  root.addEventListener('click',event => {
    const a = event.target.closest('a[data-nl-filter-link]');
    if (!a || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(a.href,location.href);
    if (destination.origin !== location.origin || destination.pathname !== location.pathname) return;
    event.preventDefault();
    const params = destination.searchParams;
    for (const [name,field] of Object.entries(urlParams)) {
      if (!params.has(name)) continue;
      const value = params.get(name);
      if (field === 'family') setFamily(value);
      else if (field === 'capacity') capSelect.value = value;
      else if (field === 'search') search.value = value;
      else if (field === 'time') maxTime.value = numeric(value);
      else if (field === 'price') maxPrice.value = numeric(value);
      else selectOption(controls[field],value);
    }
    update();
  });
  buttons.forEach(b => b.addEventListener('click',() => {setFamily(b.dataset.family);update();}));
  search.addEventListener('input',update);
  capSelect.addEventListener('change',update);
  Object.values(controls).forEach(c => c.addEventListener('change',update));
  [maxTime,maxPrice].forEach(c => c.addEventListener('input',update));
  sort.addEventListener('change',update);
  reset.addEventListener('click',() => {
    search.value='';capSelect.value='';setFamily('all');
    Object.values(controls).forEach(c => c.value='');
    maxTime.value='';maxPrice.value='';sort.value='reference';update();
  });
  readURL();update();
  window.addEventListener('popstate',() => {readURL();update();});
})();

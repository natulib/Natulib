/* Natulib — Collection TCG : galerie, partage, starter guide, titres adaptatifs & pastilles filtrantes. */
(() => {
  'use strict';

  // 1. Adaptation automatique des titres longs (Fiche + Catalogue)
  document.querySelectorAll('.nl-module-title').forEach(titleEl => {
    if (titleEl.hasAttribute('data-title-len')) return;
    const len = (titleEl.textContent || '').trim().length;
    if (len > 36) titleEl.setAttribute('data-title-len', 'xl');
    else if (len > 22) titleEl.setAttribute('data-title-len', 'long');
  });

  // 2. Logique de la Fiche Module Détaillée ([data-nl-module])
  document.querySelectorAll('[data-nl-module]').forEach(root => {
    const slides = [...root.querySelectorAll('.nl-gallery-slide')];
    const thumbs = [...root.querySelectorAll('.nl-gallery-thumb')];
    const counter = root.querySelector('[data-nl-count]');
    const swipeZone = root.querySelector('[data-nl-swipe-zone]');
    let activePhoto = 0;

    function setPhoto(index) {
      if (!slides.length) return;
      activePhoto = (index + slides.length) % slides.length;
      slides.forEach((el, i) => { el.hidden = i !== activePhoto; });
      thumbs.forEach((el, i) => { el.setAttribute('aria-pressed', String(i === activePhoto)); });
      if (counter) counter.textContent = `${activePhoto + 1} / ${slides.length}`;
    }

    thumbs.forEach((b, i) => b.addEventListener('click', () => setPhoto(i)));
    root.querySelector('[data-nl-prev]')?.addEventListener('click', () => setPhoto(activePhoto - 1));
    root.querySelector('[data-nl-next]')?.addEventListener('click', () => setPhoto(activePhoto + 1));

    if (slides.length > 1) {
      document.addEventListener('keydown', e => {
        if (e.target.matches('input, textarea, select')) return;
        if (e.key === 'ArrowLeft') setPhoto(activePhoto - 1);
        if (e.key === 'ArrowRight') setPhoto(activePhoto + 1);
      });

      let touchStartX = 0;
      swipeZone?.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      swipeZone?.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 40) {
          setPhoto(diff > 0 ? activePhoto - 1 : activePhoto + 1);
        }
      }, { passive: true });
    }
    setPhoto(0);

    // Bouton Partager / Copier le lien
    const copyBtn = root.querySelector('[data-nl-copy-link]');
    copyBtn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const original = copyBtn.textContent;
        copyBtn.textContent = '✅ Lien copié !';
        setTimeout(() => { copyBtn.textContent = original; }, 1800);
      } catch (_) {}
    });

    // Découpage automatique du Starter Guide et des Accordéons
    const source = root.querySelector('[data-nl-document]');
    const starterTarget = root.querySelector('[data-nl-starter-target]');
    const starterWrapper = root.querySelector('[data-nl-starter-wrapper]');
    const advancedTarget = root.querySelector('[data-nl-advanced-target]');
    const advancedWrapper = root.querySelector('[data-nl-advanced-wrapper]');
    const normalize = str => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').trim();
    const configured = (source?.dataset.nlStarterSections || '').split('|').map(normalize).filter(Boolean);
    const isStarter = title => {
      const t = normalize(title);
      if (configured.length) return configured.some(name => t === name || t.includes(name));
      return /\b(materiel necessaire|branchement|cablage|installation|mise en service|prise en main|demarrage|starter guide|guide rapide|premiers pas)\b/.test(t)
        && !/\b(detaille|avanc|historique|json|diagnostic)\b/.test(t);
    };

    if (source && starterTarget && advancedTarget) {
      const nodes = [...source.childNodes];
      let destination = null;
      let selectedStarter = 0;
      let intro = null;
      const rest = [];
      for (const node of nodes) {
        if (node.nodeType === 1 && node.tagName === 'H2') {
          const title = node.textContent.trim();
          const sectionNodes = { title, heading: node, content: [] };
          rest.push(sectionNodes);
          destination = sectionNodes;
        } else if (destination) {
          destination.content.push(node);
        } else if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          if (!intro) intro = document.createElement('div');
          intro.append(node);
        }
      }
      const hasStarter = rest.some(x => isStarter(x.title));
      if (intro?.textContent.trim()) {
        intro.className = 'nl-guide-preface';
        intro.dataset.nlPrintable = '';
        intro.dataset.nlPrintLabel = 'Notes importantes';
        starterTarget.append(intro);
      }
      rest.forEach((entry, index) => {
        const starter = isStarter(entry.title) || (!hasStarter && index === 0);
        if (starter) {
          const section = document.createElement('section');
          section.className = 'nl-starter-step';
          section.dataset.nlPrintable = '';
          section.dataset.nlPrintLabel = entry.title;
          const heading = document.createElement('h3');
          heading.innerHTML = entry.heading.innerHTML;
          if (entry.heading.id) heading.id = entry.heading.id;
          section.append(heading, ...entry.content);
          starterTarget.append(section);
          selectedStarter++;
        } else {
          const details = document.createElement('details');
          details.className = 'nl-accordion nl-advanced-topic';
          details.dataset.nlPrintable = '';
          details.dataset.nlPrintLabel = entry.title;
          details.dataset.nlPrintAdvanced = '';
          const summary = document.createElement('summary');
          summary.innerHTML = entry.heading.innerHTML;
          if (entry.heading.id) summary.id = entry.heading.id;
          const body = document.createElement('div');
          body.className = 'nl-accordion-content markdown-body';
          body.append(...entry.content);
          details.append(summary, body);
          advancedTarget.append(details);
        }
      });
      if (!rest.length && !intro?.textContent.trim()) {
        for (const node of [...source.childNodes]) starterTarget.append(node);
      }
      source.hidden = true;
      if (starterWrapper) starterWrapper.hidden = selectedStarter === 0 && !intro?.textContent.trim() && !starterTarget.textContent.trim();
    }
    if (advancedWrapper) advancedWrapper.hidden = !advancedTarget?.querySelector('.nl-accordion');

    function revealAnchor() {
      if (!location.hash) return;
      let target;
      try { target = root.querySelector('#' + CSS.escape(decodeURIComponent(location.hash.slice(1)))); }
      catch (_) { return; }
      const details = target?.closest('details');
      if (details) details.open = true;
    }
    revealAnchor();
    window.addEventListener('hashchange', revealAnchor);

    // Impression sélective à la carte
    const dialog = root.querySelector('[data-nl-print-dialog]');
    const choices = root.querySelector('[data-nl-print-choices]');
    const printables = [...root.querySelectorAll('[data-nl-printable]')];
    const options = printables.map((el, index) => ({
      el, id: `nl-print-${index}`, label: el.dataset.nlPrintLabel || `Section ${index + 1}`,
      advanced: el.hasAttribute('data-nl-print-advanced')
    }));
    options.forEach(opt => {
      opt.el.dataset.nlPrintId = opt.id;
      if (!choices) return;
      const label = document.createElement('label');
      label.className = 'nl-print-choice';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = opt.id;
      checkbox.checked = !opt.advanced;
      const span = document.createElement('span');
      span.textContent = opt.label;
      label.append(checkbox, span);
      choices.append(label);
    });
    const getSelected = () => new Set([...choices?.querySelectorAll('input:checked') || []].map(el => el.value));
    function preset(all) {
      choices?.querySelectorAll('input').forEach(el => {
        const opt = options.find(o => o.id === el.value);
        el.checked = all || !opt?.advanced;
      });
    }
    root.querySelector('[data-nl-print-open]')?.addEventListener('click', () => {
      if (dialog?.showModal) dialog.showModal(); else dialog?.setAttribute('open', '');
    });
    root.querySelector('[data-nl-print-essential]')?.addEventListener('click', () => preset(false));
    root.querySelector('[data-nl-print-all]')?.addEventListener('click', () => preset(true));

    let customPrinting = false;
    let openedBeforePrint = [];
    function preparePrint() {
      const selected = customPrinting ? getSelected() : new Set(options.filter(x => !x.advanced).map(x => x.id));
      openedBeforePrint = [...root.querySelectorAll('details[open]')];
      options.forEach(item => {
        item.el.dataset.nlPrintIgnore = selected.has(item.id) ? 'false' : 'true';
        if (item.advanced && selected.has(item.id)) {
          item.el.open = true;
          item.el.querySelectorAll('details').forEach(nested => { nested.open = true; });
        }
      });
      if (advancedWrapper) advancedWrapper.hidden = !options.some(x => x.advanced && selected.has(x.id));
      root.classList.add('nl-print-active');
    }
    function cleanupPrint() {
      options.forEach(item => delete item.el.dataset.nlPrintIgnore);
      root.querySelectorAll('details').forEach(el => { el.open = openedBeforePrint.includes(el); });
      if (advancedWrapper) advancedWrapper.hidden = !advancedTarget?.querySelector('.nl-accordion');
      root.classList.remove('nl-print-active');
      customPrinting = false;
    }
    root.querySelector('[data-nl-print-launch]')?.addEventListener('click', () => {
      customPrinting = true;
      if (dialog?.open) dialog.close();
      window.print();
    });
    window.addEventListener('beforeprint', preparePrint);
    window.addEventListener('afterprint', cleanupPrint);
  });

  // =========================================================================
  // 3. CATALOGUE (Modules.html) : Clic sur Famille, Capacités & Caractéristiques
  // Fonctionne que les pastilles soient des <a> ou des <span> !
  // =========================================================================
  const catalogGrid = document.querySelector('.nl-module-grid');
  if (catalogGrid) {
    const cleanValue = str => (str || '')
      .replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\s]+/gu, '')
      .trim();

    const norm = str => cleanValue(str)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Attribuer data-famille sur chaque carte pour la couleur TCG
    catalogGrid.querySelectorAll('.nl-module-card').forEach(card => {
      const famEl = card.querySelector('.nl-module-family');
      if (famEl && !card.hasAttribute('data-famille')) {
        card.setAttribute('data-famille', norm(famEl.textContent));
      }
      card.querySelectorAll('.nl-module-family, .nl-module-ref, .nl-capacity-chip, .nl-chips .nl-chip, .nl-card-filter-link, .nl-chip-filter').forEach(chip => {
        if (chip.tagName !== 'A') {
          chip.setAttribute('role', 'button');
          chip.setAttribute('tabindex', '0');
        }
      });
    });

    // Délégation d'événement en phase de CAPTURE (true) pour intercepter le clic
    // avant qu'un script tiers ne le bloque sans filtrer.
    catalogGrid.addEventListener('click', e => {
      const chip = e.target.closest('.nl-module-family, .nl-module-ref, .nl-capacity-chip, .nl-chips .nl-chip, .nl-card-filter-link, .nl-chip-filter');
      if (!chip) return;

      // Ne pas intercepter le clic sur le titre principal ou l'image du module
      if (chip.classList.contains('nl-card-main-link') || chip.classList.contains('nl-module-media')) return;

      let param = '';
      let val = '';

      // A. Si la pastille est un lien <a href="?famille=displays"> ou data-filter-*
      const href = chip.getAttribute('href');
      if (href && href.includes('?')) {
        try {
          const parsedUrl = new URL(href, window.location.origin);
          for (const [k, v] of parsedUrl.searchParams.entries()) {
            param = k;
            val = v;
            break;
          }
        } catch (_) {}
      }

      // B. Si des attributs data-* existent sur la pastille
      if (!param) {
        param = chip.dataset.filterParam || chip.dataset.filter || chip.dataset.type || '';
        val = chip.dataset.filterValue || chip.dataset.value || '';
      }

      // C. Déduction depuis le texte et la classe de la pastille
      const rawText = (chip.textContent || '').trim();
      if (!val) val = cleanValue(rawText);
      if (!param) {
        if (chip.classList.contains('nl-module-family')) param = 'famille';
        else if (chip.classList.contains('nl-module-ref')) param = 'recherche';
        else if (chip.classList.contains('nl-capacity-chip')) param = 'capacite';
        else if (rawText.startsWith('🔌')) param = 'interface';
        else if (rawText.startsWith('⚡')) param = 'alimentation';
        else if (rawText.startsWith('⏱️')) param = 'temps_max';
        else if (rawText.startsWith('💶')) param = 'prix_max';
        else if (rawText.startsWith('👤')) param = 'niveau';
        else if (/valid|test|planifi/i.test(val)) param = 'statut';
        else if (/soudure|outil/i.test(val)) param = 'montage';
        else param = 'recherche';
      }

      if (!val) return;
      e.preventDefault();
      e.stopPropagation();

      const targetNorm = norm(val);

      // 1. Essayer de piloter un bouton de filtre de famille (.nl-filter) présent sur la page
      if (param === 'famille') {
        const filterBtn = [...document.querySelectorAll('.nl-filter')].find(btn => {
          const bVal = norm(btn.dataset.famille || btn.dataset.filter || btn.dataset.value || btn.textContent);
          return bVal === targetNorm;
        });
        if (filterBtn) {
          if (filterBtn.getAttribute('aria-pressed') !== 'true') filterBtn.click();
          filterBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }
      }

      // 2. Essayer de piloter un menu déroulant <select> correspondant dans la barre d'outils
      const allSelects = [...document.querySelectorAll('.nl-catalog select, .nl-compact-toolbar select, .nl-advanced-filters select, .nl-capability-filter select')];
      for (const select of allSelects) {
        const matchingOption = [...select.options].find(opt => {
          const optVal = norm(opt.value);
          const optTxt = norm(opt.textContent);
          return optVal && (optVal === targetNorm || optTxt === targetNorm || optTxt.includes(targetNorm));
        });
        if (matchingOption) {
          select.value = matchingOption.value;
          const drawer = select.closest('details.nl-filter-drawer');
          if (drawer) drawer.open = true;
          select.dispatchEvent(new Event('input', { bubbles: true }));
          select.dispatchEvent(new Event('change', { bubbles: true }));
          return;
        }
      }

      // 3. Fallback garanti : naviguer avec le paramètre d'URL (?famille=displays)
      // puisque votre page Modules.html applique déjà les filtres URL au chargement !
      const targetUrl = new URL(window.location.href);
      targetUrl.search = ''; // Remplace le filtre précédent par la catégorie cliquée
      targetUrl.searchParams.set(param, param === 'famille' ? targetNorm : val);
      window.location.href = targetUrl.toString();
    }, true);
  }
})();

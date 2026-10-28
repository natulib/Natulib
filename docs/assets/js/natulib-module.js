(() => {
  'use strict';
  document.querySelectorAll('[data-nl-module]').forEach(root => {
    // Galerie : une seule image active, à l'écran comme à l'impression.
    const slides = Array.from(root.querySelectorAll('.nl-gallery-slide'));
    const thumbs = Array.from(root.querySelectorAll('.nl-gallery-thumb'));
    const counter = root.querySelector('[data-nl-count]');
    let activePhoto = 0;
    function setPhoto(n) {
      if (!slides.length) return;
      activePhoto = (n + slides.length) % slides.length;
      slides.forEach((el, i) => { el.hidden = i !== activePhoto; });
      thumbs.forEach((el, i) => { el.setAttribute('aria-pressed', String(i === activePhoto)); });
      if (counter) counter.textContent = `${activePhoto + 1} / ${slides.length}`;
    }
    thumbs.forEach((b, i) => b.addEventListener('click', () => setPhoto(i)));
    root.querySelector('[data-nl-prev]')?.addEventListener('click', () => setPhoto(activePhoto - 1));
    root.querySelector('[data-nl-next]')?.addEventListener('click', () => setPhoto(activePhoto + 1));
    setPhoto(0);

    // Les titres ## sont des sections structurées, PAS tous des accordéons.
    // On cache seulement les rubriques réellement facultatives.
    const source = root.querySelector('[data-nl-document]');
    const essentialTarget = root.querySelector('[data-nl-essential-target]');
    const advancedTarget = root.querySelector('[data-nl-advanced-target]');
    const advancedWrapper = root.querySelector('[data-nl-advanced-wrapper]');
    const normalize = str => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const advancedTitle = title => /pour aller plus loin|json|configuration d.usine|configuration et donnees|details? techniques?|brochage exhaustif|cablage detaille|historique|evolutions? possibles?|ameliorations?|developpement|driver interne|code source|ressources complementaires|annexes?/.test(normalize(title));
    if (source && essentialTarget && advancedTarget) {
      const nodes = Array.from(source.childNodes);
      let section = null;
      let advancedCount = 0;
      for (const node of nodes) {
        if (node.nodeType === 1 && node.tagName === 'H2') {
          const title = node.textContent.trim();
          const isAdvanced = advancedTitle(title);
          if (isAdvanced) {
            const details = document.createElement('details');
            details.className = 'nl-accordion nl-advanced-topic';
            details.dataset.nlPrintable = '';
            details.dataset.nlPrintLabel = title;
            details.dataset.nlPrintAdvanced = '';
            const summary = document.createElement('summary');
            if (node.id) summary.id = node.id;
            summary.textContent = title;
            const body = document.createElement('div');
            body.className = 'nl-accordion-content markdown-body';
            details.append(summary, body);
            advancedTarget.append(details);
            section = body;
            advancedCount++;
          } else {
            const article = document.createElement('section');
            article.className = 'nl-guide-topic';
            article.dataset.nlPrintable = '';
            article.dataset.nlPrintLabel = title;
            const h2 = document.createElement('h2');
            h2.innerHTML = node.innerHTML;
            if (node.id) h2.id = node.id;
            article.append(h2);
            essentialTarget.append(article);
            section = article;
          }
          node.remove();
        } else if (section) {
          section.append(node);
        } else if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          // Contenu avant le premier titre ## : utile et visible.
          if (!essentialTarget.querySelector('.nl-document-intro')) {
            const intro = document.createElement('div');
            intro.className = 'nl-document-intro';
            intro.dataset.nlPrintable = '';
            intro.dataset.nlPrintLabel = 'Informations importantes';
            essentialTarget.prepend(intro);
          }
          essentialTarget.querySelector('.nl-document-intro').append(node);
        }
      }
      if (advancedCount && advancedWrapper) advancedWrapper.hidden = false;
      // Un contenu sans ## n'est jamais masqué.
      if (!essentialTarget.children.length && source.childNodes.length) {
        const p = document.createElement('div');
        p.className = 'nl-guide-topic';
        p.dataset.nlPrintable = '';
        p.dataset.nlPrintLabel = 'Notice';
        while (source.firstChild) p.append(source.firstChild);
        essentialTarget.append(p);
      }
    }

    // Les liens profonds ouvrent leur annexe s'ils pointent vers un titre caché.
    function revealAnchor() {
      if (!location.hash) return;
      const raw = decodeURIComponent(location.hash.slice(1));
      let target;
      try { target = root.querySelector('#' + CSS.escape(raw)); } catch (_) { return; }
      const details = target?.closest('details');
      if (details) details.open = true;
    }
    revealAnchor();
    window.addEventListener('hashchange', revealAnchor);

    // Impression sélective, sans toucher au contenu des fichiers Markdown.
    const dlg = root.querySelector('[data-nl-print-dialog]');
    const choices = root.querySelector('[data-nl-print-choices]');
    const printable = Array.from(root.querySelectorAll('[data-nl-printable]'));
    const printOptions = printable.map((el, i) => ({
      el, id: `nl-part-${i}`, label: el.dataset.nlPrintLabel || `Section ${i + 1}`,
      advanced: el.hasAttribute('data-nl-print-advanced')
    }));
    if (choices) {
      printOptions.forEach(item => {
        item.el.dataset.nlPrintId = item.id;
        const label = document.createElement('label');
        label.className = 'nl-print-choice';
        const input = document.createElement('input');
        input.type = 'checkbox'; input.value = item.id;
        input.checked = !item.advanced;
        const span = document.createElement('span');
        span.textContent = item.label;
        label.append(input, span);
        choices.append(label);
      });
    }
    const getSelected = () => new Set(Array.from(choices?.querySelectorAll('input:checked') || []).map(x => x.value));
    const setPreset = all => choices?.querySelectorAll('input').forEach(i => {
      const item = printOptions.find(x => x.id === i.value);
      i.checked = all || !item?.advanced;
    });
    root.querySelector('[data-nl-print-open]')?.addEventListener('click', () => {
      if (dlg?.showModal) dlg.showModal(); else if (dlg) dlg.setAttribute('open', '');
    });
    root.querySelector('[data-nl-print-essential]')?.addEventListener('click', () => setPreset(false));
    root.querySelector('[data-nl-print-all]')?.addEventListener('click', () => setPreset(true));

    let customPrinting = false;
    let savedOpen = [];
    function preparePrint() {
      const selected = customPrinting ? getSelected() : new Set(printOptions.filter(x => !x.advanced).map(x => x.id));
      savedOpen = Array.from(root.querySelectorAll('.nl-advanced-topic')).filter(el => el.open);
      printOptions.forEach(item => {
        const include = selected.has(item.id);
        item.el.dataset.nlPrintIgnore = include ? 'false' : 'true';
        if (item.advanced && include) item.el.open = true;
      });
      root.classList.add('nl-print-active');
      if (advancedWrapper) advancedWrapper.hidden = !printOptions.some(x => x.advanced && selected.has(x.id));
    }
    function cleanupPrint() {
      printOptions.forEach(item => delete item.el.dataset.nlPrintIgnore);
      root.querySelectorAll('.nl-advanced-topic').forEach(el => { el.open = savedOpen.includes(el); });
      if (advancedWrapper) advancedWrapper.hidden = !printOptions.some(x => x.advanced);
      root.classList.remove('nl-print-active');
      customPrinting = false;
    }
    root.querySelector('[data-nl-print-launch]')?.addEventListener('click', () => {
      customPrinting = true;
      if (dlg?.open) dlg.close();
      window.print();
    });
    window.addEventListener('beforeprint', preparePrint);
    window.addEventListener('afterprint', cleanupPrint);
  });
})();

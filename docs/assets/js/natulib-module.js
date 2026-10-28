/* Natulib — Collection épurée : galerie, starter guide, accordéons illimités, impression sélective. */
(() => {
  'use strict';
  document.querySelectorAll('[data-nl-module]').forEach(root => {
    const slides = [...root.querySelectorAll('.nl-gallery-slide')];
    const thumbs = [...root.querySelectorAll('.nl-gallery-thumb')];
    const counter = root.querySelector('[data-nl-count]');
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
    setPhoto(0);

    const source = root.querySelector('[data-nl-document]');
    const starterTarget = root.querySelector('[data-nl-starter-target]');
    const starterWrapper = root.querySelector('[data-nl-starter-wrapper]');
    const advancedTarget = root.querySelector('[data-nl-advanced-target]');
    const advancedWrapper = root.querySelector('[data-nl-advanced-wrapper]');
    const normalize = str => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').trim();
    // Le YAML starter_sections permet de remplacer cette sélection automatique.
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
      // Si les titres existants n'ont aucun lien avec le montage, garder le premier
      // visible au lieu de laisser le guide vide. Tous les suivants sont des accordéons.
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
      // Contenu simple sans ## : ne jamais le perdre.
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
})();

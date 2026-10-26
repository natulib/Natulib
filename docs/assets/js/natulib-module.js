(() => {
  'use strict';
  document.querySelectorAll('[data-nl-module]').forEach(module => {
    const slides = [...module.querySelectorAll('.nl-gallery-slide')];
    module.querySelectorAll('.nl-gallery-thumb').forEach(button => {
      button.addEventListener('click', () => {
        const selected = Number(button.dataset.slide);
        slides.forEach((slide, index) => { slide.hidden = index !== selected; });
        module.querySelectorAll('.nl-gallery-thumb').forEach(thumb => {
          thumb.setAttribute('aria-pressed', String(Number(thumb.dataset.slide) === selected));
        });
      });
    });
    const source = module.querySelector('[data-nl-document]');
    if (!source) return;
    // Convertit les H2 Markdown rendus en accordéons, sans modifier le fichier Markdown.
    // Conserve le contenu avant le premier H2 en texte libre visible.
    const nodes = [...source.childNodes];
    let details = null;
    for (const node of nodes) {
      if (node.nodeType === 1 && node.tagName === 'H2') {
        details = document.createElement('details');
        details.className = 'nl-accordion';
        const summary = document.createElement('summary');
        // Garder l'identifiant sur le summary pour les liens d'ancrage.
        if (node.id) summary.id = node.id;
        summary.innerHTML = node.innerHTML;
        details.append(summary);
        const body = document.createElement('div');
        body.className = 'nl-accordion-content';
        details.append(body);
        source.insertBefore(details, node);
        node.remove();
      } else if (details) {
        details.lastElementChild.append(node);
      }
    }
    const openAnchor = () => {
      if (!location.hash) return;
      let target;
      try { target = source.querySelector('#' + CSS.escape(decodeURIComponent(location.hash.slice(1)))); }
      catch { return; }
      if (!target) return;
      const accordion = target.closest('details');
      if (accordion) accordion.open = true;
    };
    openAnchor();
    window.addEventListener('hashchange', openAnchor);
    // L'impression doit montrer toutes les sections, même repliées.
    let openedBeforePrint = [];
    window.addEventListener('beforeprint', () => {
      openedBeforePrint = [...source.querySelectorAll('details[open]')];
      source.querySelectorAll('details').forEach(item => { item.open = true; });
    });
    window.addEventListener('afterprint', () => {
      source.querySelectorAll('details').forEach(item => { item.open = openedBeforePrint.includes(item); });
    });
  });
})();

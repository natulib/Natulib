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

    // Conservation du contenu intégral : seules les sections annexes deviennent des accordéons.
    // Les H2 usuels de la notice restent visibles, même sans JavaScript.
    const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    const isOptional = title => {
      const t = normalize(title);
      return /^(configuration json|configuration avancee|pour aller plus loin|historique|ressources complementaires|details techniques|cablage detaille|documentation technique|annexes?|diagnostic avance|informations complementaires|evolutions possibles|parametres internes|architecture|brochage detaille|code source)/.test(t);
    };
    const nodes = [...source.childNodes];
    let body = null;
    let optionalBlock = false;
    for (const node of nodes) {
      if (node.nodeType === 1 && node.tagName === 'H2') {
        optionalBlock = isOptional(node.textContent);
        if (optionalBlock) {
          const details = document.createElement('details');
          details.className = 'nl-accordion nl-optional';
          const summary = document.createElement('summary');
          if (node.id) summary.id = node.id;
          summary.innerHTML = node.innerHTML;
          details.append(summary);
          body = document.createElement('div');
          body.className = 'nl-accordion-content';
          details.append(body);
          source.insertBefore(details, node);
        } else {
          const section = document.createElement('section');
          section.className = 'nl-essential-section';
          source.insertBefore(section, node);
          body = section;
        }
        if (optionalBlock) node.remove();
        else body.append(node);
      } else if (body) {
        body.append(node);
      }
    }
    const openAnchor = () => {
      if (!location.hash) return;
      try {
        const target = source.querySelector('#' + CSS.escape(decodeURIComponent(location.hash.slice(1))));
        const accordion = target && target.closest('details');
        if (accordion) accordion.open = true;
      } catch (_) {}
    };
    openAnchor();
    window.addEventListener('hashchange', openAnchor);

    module.querySelectorAll('[data-nl-print]').forEach(btn => {
      btn.addEventListener('click', () => {
        module.dataset.printMode = btn.dataset.nlPrint === 'complete' ? 'complete' : 'essential';
        window.print();
      });
    });
    let wasOpen = [];
    window.addEventListener('beforeprint', () => {
      wasOpen = [...source.querySelectorAll('details[open]')];
      if (module.dataset.printMode === 'complete') source.querySelectorAll('details').forEach(d => d.open = true);
    });
    window.addEventListener('afterprint', () => {
      source.querySelectorAll('details').forEach(d => { d.open = wasOpen.includes(d); });
      module.dataset.printMode = 'essential';
    });
  });
})();

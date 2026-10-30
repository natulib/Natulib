/* Natulib Projet : galerie et sections de documentation repliables, sans dépendance. */
(()=>{'use strict';
 const root=document.querySelector('[data-nl-project]');if(!root)return;
 const slides=[...root.querySelectorAll('.nl-project-gallery .nl-gallery-slide')];
 const thumbs=[...root.querySelectorAll('.nl-project-gallery .nl-gallery-thumb')];
 function photo(i){slides.forEach((s,j)=>s.hidden=j!==i);thumbs.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));}
 thumbs.forEach((b,i)=>b.addEventListener('click',()=>photo(i)));
 if(slides.length)photo(0);
 const doc=root.querySelector('[data-nl-project-doc]');if(!doc)return;
 let current=null,body=null;
 [...doc.childNodes].forEach(node=>{
   if(node.nodeType===1&&node.tagName==='H2'){
     const label=node.textContent.trim();
     const details=document.createElement('details');details.className='nl-project-section';
     // La présentation reste visible ; les sections longues restent facultatives.
     if(/^présentation$/i.test(label))details.open=true;
     const summary=document.createElement('summary');summary.innerHTML=node.innerHTML;
     if(node.id)summary.id=node.id;
     body=document.createElement('div');body.className='nl-project-section-body markdown-body';
     details.append(summary,body);doc.append(details);current=details;node.remove();
   }else if(current){body.append(node)}
 });
 // Impression papier complète, sans modifier durablement l'état des rubriques.
 let prior=[];
 window.addEventListener('beforeprint',()=>{prior=[...doc.querySelectorAll('details')].map(x=>x.open);doc.querySelectorAll('details').forEach(x=>x.open=true)});
 window.addEventListener('afterprint',()=>{doc.querySelectorAll('details').forEach((x,i)=>x.open=!!prior[i])});
 // Ouvre une rubrique ciblée par une ancre, si elle existe.
 function reveal(){if(!location.hash)return;let el;try{el=doc.querySelector('#'+CSS.escape(decodeURIComponent(location.hash.slice(1))))}catch(_){}const section=el?.closest('details');if(section)section.open=true}
 window.addEventListener('hashchange',reveal);reveal();
})();

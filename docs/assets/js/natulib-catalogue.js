(function(){'use strict';
const root=document.getElementById('nl-catalog');if(!root)return;
const search=root.querySelector('#nl-module-search'),cards=Array.from(root.querySelectorAll('.nl-module-card')),
filters=Array.from(root.querySelectorAll('.nl-filter[data-family]')),count=root.querySelector('#nl-catalog-count'),
empty=root.querySelector('#nl-catalog-empty'), select=root.querySelector('#nl-capability-select'),reset=root.querySelector('#nl-filter-reset');
let active='all';
const grid=root.querySelector('#nl-module-grid'),viewButtons=Array.from(root.querySelectorAll('.nl-view-button'));
let initialView='cards';
try{initialView=window.localStorage.getItem('natulib.catalog.view')||'cards'}catch(err){}
function setView(view){const chosen=view==='list'?'list':'cards';grid.dataset.view=chosen;viewButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===chosen)));try{window.localStorage.setItem('natulib.catalog.view',chosen)}catch(err){}}
viewButtons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
setView(initialView);

const labelMap=new Map();
root.querySelectorAll('.nl-capacity-chip').forEach(a=>{const u=new URL(a.href);const slug=u.searchParams.get('capacite');if(slug&&!labelMap.has(slug))labelMap.set(slug,a.textContent.trim().replace(/^[^\p{L}\p{N}]+/u,''));});
Array.from(labelMap.entries()).sort((a,b)=>a[1].localeCompare(b[1],'fr')).forEach(([slug,label])=>{const opt=document.createElement('option');opt.value=slug;opt.textContent=label;select.append(opt)});
const url=new URL(window.location.href);let param=url.searchParams.get('capacite')||'';
// A direct link from any module can activate a capacity on arrival.
if(labelMap.has(param))select.value=param;
function update(){const q=search.value.trim().toLocaleLowerCase('fr'),cap=select.value;let shown=0;
cards.forEach(card=>{const caps=new Set((card.dataset.capacities||'').split(/\s+/));const match=(active==='all'||card.dataset.family===active)&&(!cap||caps.has(cap))&&card.textContent.toLocaleLowerCase('fr').includes(q);card.hidden=!match;if(match)shown++});
count.textContent=shown+' module'+(shown!==1?'s':'')+' affiché'+(shown!==1?'s':'');empty.hidden=shown!==0;
const next=new URL(window.location.href);if(cap)next.searchParams.set('capacite',cap);else next.searchParams.delete('capacite');history.replaceState(null,'',next.pathname+next.search+next.hash);
}
filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.family;filters.forEach(item=>item.setAttribute('aria-pressed',String(item===btn)));update()}));
search.addEventListener('input',update);select.addEventListener('change',update);
reset.addEventListener('click',()=>{search.value='';select.value='';active='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.family==='all')));update()});
update();
})();

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
const controls={status:root.querySelector('#nl-status-select'),level:root.querySelector('#nl-level-select'),mount:root.querySelector('#nl-mount-select'),interface:root.querySelector('#nl-interface-select'),power:root.querySelector('#nl-power-select')};
const maxTime=root.querySelector('#nl-max-time'),maxPrice=root.querySelector('#nl-max-price'),sort=root.querySelector('#nl-sort');
const activeBar=root.querySelector('#nl-active-filters'),filterBadge=root.querySelector('#nl-filter-badge');
const clean=s=>(s||'').toString().trim().toLocaleLowerCase('fr');
const numeric=v=>{const n=parseFloat(String(v||'').replace(',','.').replace(/[^0-9.]/g,''));return Number.isFinite(n)?n:Infinity};
Object.entries(controls).forEach(([key,sel])=>{
 const vals=[...new Set(cards.map(c=>clean(c.dataset[key])).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr'));
 vals.forEach(v=>{const option=document.createElement('option');option.value=v;option.textContent=v.replace(/_/g,' ');sel.append(option)});
});
const url=new URL(window.location.href);let param=url.searchParams.get('capacite')||'';
// A direct link from any module can activate a capacity on arrival.
if(labelMap.has(param))select.value=param;
function update(){const q=search.value.trim().toLocaleLowerCase('fr'),cap=select.value;let shown=0;
cards.forEach(card=>{const caps=new Set((card.dataset.capacities||'').split(/\s+/));const match=(active==='all'||card.dataset.family===active)&&(!cap||caps.has(cap))&&card.textContent.toLocaleLowerCase('fr').includes(q)
&&Object.entries(controls).every(([key,sel])=>!sel.value||clean(card.dataset[key])===sel.value)
&&(!maxTime.value||numeric(card.dataset.time)<=Number(maxTime.value))
&&(!maxPrice.value||numeric(card.dataset.price)<=Number(maxPrice.value));card.hidden=!match;if(match)shown++});
const field=sort.value, desc=field.endsWith('-desc');
const base=desc?field.slice(0,-5):field;
const order={debutant:0,intermediaire:1,avance:2};
const statusOrder={valide:0,'validé':0,test:1,'en test':1,planifie:2,'planifié':2};
const items=cards.slice().sort((a,b)=>{
 let va=a.dataset[base]||'',vb=b.dataset[base]||'';
 if(base==='reference'){va=a.dataset.ref||'';vb=b.dataset.ref||''}
 if(base==='level'){va=order[clean(va)]??99;vb=order[clean(vb)]??99}
 if(base==='status'){va=statusOrder[clean(va)]??99;vb=statusOrder[clean(vb)]??99}
 if(base==='price'||base==='time'){va=numeric(va);vb=numeric(vb)}
 const result=(typeof va==='number'&&typeof vb==='number')?va-vb:String(va).localeCompare(String(vb),'fr',{numeric:true});
 return (desc?-1:1)*result;
 });
 items.forEach(card=>grid.append(card));
 const selected=[];
 if(search.value.trim())selected.push(['Recherche : '+search.value.trim(),()=>{search.value=''}]);
 if(select.value)selected.push(['Capacité : '+select.options[select.selectedIndex].text,()=>{select.value=''}]);
 if(active!=='all')selected.push(['Famille : '+(filters.find(b=>b.dataset.family===active)?.textContent||active),()=>{active='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.family==='all')))}]);
 Object.entries(controls).forEach(([key,control])=>{if(control.value)selected.push([control.parentElement.textContent.trim().split('\n')[0]+ ' : '+control.options[control.selectedIndex].text,()=>{control.value=''}])});
 if(maxTime.value)selected.push(['Durée ≤ '+maxTime.value+' min',()=>{maxTime.value=''}]);
 if(maxPrice.value)selected.push(['Prix ≤ '+maxPrice.value+' €',()=>{maxPrice.value=''}]);
 activeBar.replaceChildren(); selected.forEach(([label,clear])=>{const b=document.createElement('button');b.type='button';b.className='nl-active-chip';b.textContent=label+' ×';b.title='Retirer le filtre '+label;b.addEventListener('click',()=>{clear();update()});activeBar.append(b)});
 const extra=selected.length-(select.value?1:0)-(search.value.trim()?1:0);
 filterBadge.hidden=extra<=0;if(extra>0)filterBadge.textContent=extra;
 count.textContent=shown+' module' +(shown!==1?'s':'')+' affiché'+(shown!==1?'s':'');empty.hidden=shown!==0;
const next=new URL(window.location.href);if(cap)next.searchParams.set('capacite',cap);else next.searchParams.delete('capacite');history.replaceState(null,'',next.pathname+next.search+next.hash);
}
filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.family;filters.forEach(item=>item.setAttribute('aria-pressed',String(item===btn)));update()}));
search.addEventListener('input',update);select.addEventListener('change',update);Object.values(controls).forEach(x=>x.addEventListener('change',update));[maxTime,maxPrice].forEach(x=>x.addEventListener('input',update));sort.addEventListener('change',update);
reset.addEventListener('click',()=>{search.value='';select.value='';Object.values(controls).forEach(x=>x.value='');maxTime.value='';maxPrice.value='';sort.value='reference';active='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.family==='all')));update()});
update();
})();

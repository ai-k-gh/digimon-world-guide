(()=>{const N=JSON.parse(document.getElementById('mapdata').textContent);const svg=document.getElementById('dwmap'),info=document.getElementById('ninfo'),ts=document.getElementById('tsel');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function upd(){document.querySelectorAll('.mapf input[data-c]').forEach(c=>svg.querySelectorAll('.'+c.dataset.c).forEach(e=>e.style.display=c.checked?'':'none'));
const t=ts.value;svg.querySelectorAll('.m-time,.m-sight').forEach(e=>{const ok=t=='all'||e.dataset.t.includes(t)||e.dataset.t.includes('both');if(!ok)e.style.display='none'});
svg.querySelectorAll('g.n').forEach(g=>{const n=N[g.dataset.n];let hit=false;if(t!='all'){hit=n.time.some(x=>x[2]==t||x[2]=='both')||n.sight.some(s=>(s[0]=='白天')==(t=='day'))}g.classList.toggle('hl',hit)})}
function show(k){const n=N[k];let h=`<h3>${esc(n.z)} <small lang="en">${esc(k)}</small></h3><p><small>地區：${esc(n.rg)}</small></p>`;const t=ts.value;
if(n.rec.length)h+=`<p><img src="img/ui/recruit.svg" width="18" alt=""> 招募：${n.rec.map(r=>(r[2]?`<img src="${r[2]}" width="22" alt="">`:'')+esc(r[0])).join('、')}</p>`;
if(n.gym)h+=`<p><img src="img/ui/gym.svg" width="18" alt=""> 訓練：${esc(n.gym)}</p>`;if(n.shop)h+=`<p><img src="img/ui/shop.svg" width="18" alt=""> ${esc(n.shop)}</p>`;if(n.wc)h+='<p><img src="img/ui/toilet.svg" width="18" alt=""> 有廁所</p>';
const tm=n.time.filter(x=>t=='all'||x[2]==t||x[2]=='both');if(tm.length)h+='<p><img src="img/ui/clock.svg" width="18" alt=""> '+tm.map(x=>esc(x[0])+' '+esc(x[1])).join('；')+'</p>';
const si=n.sight.filter(s=>t=='all'||(s[0]=='白天')==(t=='day'));if(si.length)h+='<p>學技敵人：'+si.map(s=>(s[0]=='白天'?'☀️':'🌙')+esc(s[1])+' → '+esc(s[2])).join('；')+'</p>';
h+=`<p><small>相連：${n.nb.map(esc).join('、')}</small></p>`;info.innerHTML=h;
svg.querySelectorAll('g.n').forEach(g=>g.classList.toggle('sel',g.dataset.n==k))}
svg.addEventListener('click',e=>{const g=e.target.closest('g.n');if(g)show(g.dataset.n)});svg.addEventListener('keydown',e=>{if(e.key=='Enter'){const g=e.target.closest('g.n');if(g)show(g.dataset.n)}});
document.querySelectorAll('.mapf input,#tsel').forEach(c=>c.onchange=upd);upd()})();
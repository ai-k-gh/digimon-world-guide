(()=>{const R=JSON.parse(document.getElementById('recdata').textContent);const K='dw1_recruited';let S=new Set(JSON.parse(localStorage.getItem(K)||'[]'));
const g=document.getElementById('prosgrid'),bar=document.getElementById('prosbar');
function draw(){let p=0;R.forEach(r=>{if(S.has(r.n))p+=r.p});const max=R.reduce((a,r)=>a+r.p,0);
bar.innerHTML=`<div class="pb"><div style="width:${p/max*100}%"></div></div><p><b>繁榮度：${p} / ${max}</b>（已招 ${S.size} / ${R.length} 隻）</p>`;
document.querySelectorAll('#mile li').forEach(li=>{const v=+li.dataset.p;li.classList.toggle('ok',p>=v);li.dataset.t=p>=v?' ✓':'（差 '+(v-p)+'）'});
localStorage.setItem(K,JSON.stringify([...S]))}
g.innerHTML=R.map(r=>`<div><label><input type="checkbox" data-n="${r.n}" ${S.has(r.n)?'checked':''}> ${r.ic?`<img src="${r.ic}" width="32" alt="">`:''}<br><b>${r.n}</b><br><small>${r.hk?'港 '+r.hk:''}${r.tw?' 台 '+r.tw:''}</small><br>${r.st} +${r.p}</label></div>`).join('');
g.onchange=e=>{const n=e.target.dataset.n;if(!n)return;e.target.checked?S.add(n):S.delete(n);draw()};
document.getElementById('prosall').onclick=()=>{R.forEach(r=>S.add(r.n));g.querySelectorAll('input').forEach(i=>i.checked=true);draw()};
document.getElementById('prosnone').onclick=()=>{S.clear();g.querySelectorAll('input').forEach(i=>i.checked=false);draw()};draw()})();
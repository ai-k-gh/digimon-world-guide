document.getElementById('hb').onclick=()=>document.getElementById('nav').classList.toggle('open');
const q=document.getElementById('q');q.oninput=()=>{const v=q.value.trim().toLowerCase();document.querySelectorAll('main tbody tr, main .card, main .grid>div, main li').forEach(e=>e.classList.toggle('hide',v&&!e.textContent.toLowerCase().includes(v)))};
(()=>{const st=document.getElementById('pwa-status');const show=(t,c)=>{if(!st)return;st.hidden=false;st.textContent=t;st.className=c||''};
if(!('serviceWorker' in navigator)||location.protocol==='file:'){if(location.protocol==='file:'&&st){show('📁 而家係本機檔案模式（file://），離線下載功能唔適用；所有頁面照用得。','')}return}
const done=()=>show('✅ 已下載晒，可以離線用（可以加至主畫面）','ok');
if(localStorage.getItem('dw1_offline'))done();else show('⏳ 下載緊離線版本…','busy');
navigator.serviceWorker.addEventListener('message',e=>{const d=e.data||{};if(d.type==='precached'){localStorage.setItem('dw1_offline',d.ver);self.DW1_VER=d.ver;done()}else if(d.type==='precache-fail'){show('⚠️ 離線下載未完成（網絡問題），下次開會再試。','')}});
window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js',{scope:'./'}).then(r=>{fetch('sw-version.txt',{cache:'no-store'}).then(x=>x.text()).then(v=>{self.DW1_VER=v.trim();if(localStorage.getItem('dw1_offline')===self.DW1_VER)done();else{if(localStorage.getItem('dw1_offline'))show('⏳ 有新版本，下載緊更新…','busy')}if(r.active&&!r.installing&&!r.waiting){caches.has('dw1-'+self.DW1_VER).then(h=>{if(h){localStorage.setItem('dw1_offline',self.DW1_VER);done()}})}}).catch(()=>{caches.keys().then(k=>{if(k.some(x=>x.startsWith('dw1-')))done()})})}).catch(()=>show('⚠️ 離線功能啟動唔到（瀏覽器限制），網站照常用得。',''))});
window.addEventListener('offline',()=>show('📴 而家離線中，用緊已下載嘅版本','ok'));})();

(()=>{const EV=JSON.parse(document.getElementById('evdata').textContent);const $=id=>document.getElementById(id);const v=id=>+$(id).value||0;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SN=['HP','MP','攻擊','防禦','速度','智力'];
const names=Object.keys(EV);const cur=$('ev_cur');cur.innerHTML=names.filter(n=>EV[n].to.length).map(n=>`<option>${n}</option>`).join('');cur.value='Agumon';
const opok=(o,x)=>!o?null:(o[0].includes('≤')||o[0]=='<'?x<=o[1]:o[0].includes('≥')||o[0]=='>'?x>=o[1]:x==o[1]);
$('ev_go').onclick=()=>{const n=cur.value,st=[v('ev_hp'),v('ev_mp'),v('ev_of'),v('ev_de'),v('ev_sp'),v('ev_br')];const s10=[st[0]/10,st[1]/10,st[2],st[3],st[4],st[5]];
let hi=0;s10.forEach((x,i)=>{if(x>s10[hi])hi=i});const toRookie=EV[n].stage=='In-Training';
let best=null,bestS=-1,cS=0,cN=0;const rows=[];
for(const t of EV[n].to){const e=EV[t];if(!e||!e.c){rows.push([t,'—','—','—','—','（冇條件資料）','']);continue}const c=e.c;
const req=c.st.map((r,i)=>r==null?null:r);let sOK=req.every((r,i)=>r==null||st[i]>=r)&&req.some(r=>r!=null);
if(toRookie)sOK=sOK&&req[hi]!=null;
const wOK=c.w?(v('ev_w')>=c.w[0]&&v('ev_w')<=(c.w[1]??c.w[0])):false;const mOK=c.mi?opok(c.mi,v('ev_mi')):false;
const bl=[];if(c.ha)bl.push(opok(c.ha,v('ev_ha')));if(c.di)bl.push(opok(c.di,v('ev_di')));if(c.ba)bl.push(opok(c.ba,v('ev_ba')));if(c.te)bl.push(opok(c.te,v('ev_te')));if(c.key.length)bl.push(c.key.includes(n));
const bOK=bl.some(x=>x);const cnt=[sOK,wOK,mOK,bOK].filter(x=>x).length;const en=cnt>=3;let sc='';
if(en){let score;if(toRookie){score=cnt}else{let sum=0,k=0;req.forEach((r,i)=>{if(r!=null){sum+=i<2?st[i]/10:st[i];k++}});score=(sum+cS)/(k+cN);if(score>bestS){cS=0;cN=0}else{cS=score;cN=k+cN}}
sc=toRookie?score+' 組':score.toFixed(1);if(score>bestS){bestS=score;best=t}}
rows.push([t,sOK?'✔':'✘',wOK?'✔':'✘',mOK?'✔':'✘',bOK?'✔':'✘',en?'有資格':'未夠 3 組',sc])}
$('ev_out').innerHTML=`<p>${toRookie?'而家最高能力：<b>'+SN[hi]+'</b>（HP/MP ÷10 比較）<br>':''}預測結果：<b style="font-size:1.2em;color:#ffd166">${best?esc(best):'唔會自然進化（或者會變 Numemon 等特殊進化）'}</b></p><div class="tw"><table><thead><tr><th>候選（遊戲次序）</th><th>能力</th><th>體重</th><th>失誤</th><th>獎勵</th><th>結果</th><th>優先分</th></tr></thead><tbody>${rows.map(r=>`<tr${r[0]==best?' class="win"':''}><td>${esc(r[0])}</td>${r.slice(1).map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`};
// planner
const ST={'GG':['Green Gym',{HP:{HP:80,OF:2},MP:{MP:80,DE:2},OF:{OF:8,SP:2},DE:{DE:8,BR:2},SP:{SP:8,HP:10},BR:{BR:8,MP:10}},1],'BL':['Beetle Land',{HP:{HP:120},OF:{OF:12},DE:{DE:12},SP:{SP:12}},0],'IS':['Ice Sanctuary',{DE:{DE:12,SP:2},HP:{HP:120,DE:2}},0],'LG':['Leomon 訓練場',{OF:{OF:8,HP:10},SP:{SP:8,HP:10}},0],'TM':['Trash Mountain',{MP:{MP:150}},0],'CH':['Cherrymon',{BR:{BR:8,MP:10}},1]};
const K=['HP','MP','OF','DE','SP','BR'],KZ={HP:'HP',MP:'MP',OF:'攻',DE:'防',SP:'速',BR:'智'},TIRE={HP:10,MP:7,OF:9,DE:9,SP:8,BR:6};
const ex=$('pl_ex');ex.innerHTML=Object.entries(ST).flatMap(([k,s])=>Object.keys(s[1]).map(e=>`<option value="${k}:${e}">${s[0]}－${KZ[e]}</option>`)).join('');
const pd=$('pl_d');pd.innerHTML='<option value="">（自選）</option>'+names.map(n=>`<option>${n}</option>`).join('');pd.onchange=()=>{const e=EV[pd.value];if(e){$('pl_p').value=e.pers;$('pl_l').value={'Fresh':'-0.1','In-Training':'-0.1','Rookie':'0','Champion':'0.1','Ultimate':'0.2'}[e.stage];run()}};
let Q=[];const TH=[150,250,350,450,550,650,750,800,850,900,950];
function fac(stat,st){const p=$('pl_p').value;let f=1;const pm={HP_DEFENSE:{HP:.1,DE:.1,OF:-.1,SP:-.1},MP_BRAINS:{MP:.1,BR:.1,HP:-.1,DE:-.1},OFFENSE_SPEED:{OF:.1,SP:.1,MP:-.1,BR:-.1}};
if(p=='FILTH')f*=0.8;else if(pm[p]&&pm[p][stat])f*=1+pm[p][stat];f*=1+(+$('pl_l').value);if($('pl_man').checked)f*=1.1;
if(ST[st][2]){if($('pl_kuw').checked&&['MP','OF','BR'].includes(stat))f*=1.2;if($('pl_kab').checked&&['HP','DE','SP'].includes(stat))f*=1.2;if($('pl_fr').checked)f*=1.2}return f}
function itf(stat){const i=$('pl_it').value;return i=='p'?1.5:i=='c'&&['MP','OF','BR'].includes(stat)?1.2:i=='r'&&['HP','DE','SP'].includes(stat)?1.2:1}
function run(){let s={HP:v('pl_hp'),MP:v('pl_mp'),OF:v('pl_of'),DE:v('pl_de'),SP:v('pl_sp'),BR:v('pl_br')},ti=v('pl_ti'),h=v('pl_h');const rows=[];
Q.forEach((q,qi)=>{const [st,e]=q.k.split(':');const base=ST[st][1][e];const g={};
for(const k in base){let x=Math.floor(base[k]*fac(k,st)+1e-9);x=Math.floor(x*itf(k)+1e-9);x=Math.floor(x*q.b+1e-9);if(ti>=100)x=Math.min(x,1);g[k]=x}
const oldB=s.BR;for(const k in g)s[k]=Math.min(999,s[k]+g[k]);const warn=[];if(ti>=80)warn.push('😓出汗：−4 快樂 −3 紀律');
ti=Math.min(100,ti+TIRE[e]);if(e=='BR'){const hit=TH.filter(t=>oldB<t&&s.BR>=t);if(hit.length||(s.BR==999&&oldB<999))warn.push('🎓學技判定（智力 '+(hit.join('/')||999)+'）');if([100,200,300,400,500].some(t=>oldB<t&&s.BR>=t))warn.push('📣學到指令（今次唔判定學技）')}
rows.push([`${String(h%24).padStart(2,'0')}:00`,ST[st][0]+'－'+KZ[e]+(q.b!=1?` ×${q.b}`:''),Object.entries(g).map(([k,x])=>KZ[k]+'+'+x).join(' '),K.map(k=>s[k]).join(' / '),ti,warn.join('；'),qi]);h++});
$('pl_out').innerHTML=Q.length?`<div class="tw"><table><thead><tr><th>時間</th><th>訓練</th><th>增加</th><th>HP/MP/攻/防/速/智</th><th>疲勞</th><th>提示</th><th>Bonus</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td><select data-i="${r[6]}">${[1,0.5,2,4,10].map(b=>`<option value="${b}" ${Q[r[6]].b==b?'selected':''}>×${b}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div>`:'<p>未加訓練。</p>'}
$('pl_add').onclick=()=>{for(let i=0;i<Math.max(1,v('pl_n'));i++)Q.push({k:ex.value,b:1});run()};$('pl_clr').onclick=()=>{Q=[];run()};
$('pl_out').onchange=e=>{const i=e.target.dataset.i;if(i!=null){Q[i].b=+e.target.value;run()}};document.querySelectorAll('[id^=pl_]').forEach(el=>{if(el.tagName!='BUTTON'&&el.id!='pl_d'&&el.id!='pl_ex'&&el.id!='pl_n')el.addEventListener('change',run)});run();
// record
const RK='dw1_records';let R=JSON.parse(localStorage.getItem(RK)||'[]');$('dlist').innerHTML=names.map(n=>`<option value="${n}">`).join('');
const F=['day','gen','name','hp','mp','of','de','sp','br','w','mi','ba','te','note'];
function rd(){localStorage.setItem(RK,JSON.stringify(R));$('rc_out').innerHTML=R.length?`<div class="tw"><table class="stack"><thead><tr><th>日</th><th>代</th><th>數碼暴龍</th><th>HP/MP/攻/防/速/智</th><th>體重</th><th>失誤</th><th>勝場</th><th>技能</th><th>備註</th><th></th></tr></thead><tbody>${R.map((r,i)=>`<tr><td data-l="日">${esc(r.day)}</td><td data-l="代">${esc(r.gen)}</td><td data-l="數碼暴龍">${esc(r.name)}</td><td data-l="能力">${[r.hp,r.mp,r.of,r.de,r.sp,r.br].map(esc).join(' / ')}</td><td data-l="體重">${esc(r.w)}</td><td data-l="失誤">${esc(r.mi)}</td><td data-l="勝場">${esc(r.ba)}</td><td data-l="技能">${esc(r.te)}</td><td data-l="備註">${esc(r.note)}</td><td><button data-del="${i}">刪除</button></td></tr>`).join('')}</tbody></table></div>`:'<p>未有紀錄。</p>'}
$('rc_add').onclick=()=>{const o={};F.forEach(f=>o[f]=$('rc_'+f).value);R.push(o);rd()};$('rc_out').onclick=e=>{const i=e.target.dataset.del;if(i!=null&&confirm('刪除呢筆紀錄？')){R.splice(+i,1);rd()}};
$('rc_exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(R,null,1)],{type:'application/json'}));a.download='dw1_records.json';a.click()};
$('rc_imp').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{const d=JSON.parse(t);if(Array.isArray(d)){R=d;rd()}}catch(x){alert('JSON 格式唔啱')}})};rd()})();
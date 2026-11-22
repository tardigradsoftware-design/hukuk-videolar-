// Video sayfası: arka plan, başlık, görsel öğeler, altyazı, maskot (tarayıcıda çalışır)
// Öğeler kelime zamanlarına bağlıdır; frame(t) her karede çağrılır.
const fs = require('fs'), path = require('path');

const CSS = (W, H, L) => `
*{box-sizing:border-box}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#F4F4F2;font-family:'Inter Display','Inter',sans-serif;-webkit-font-smoothing:antialiased}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.07)),radial-gradient(#d2d2d2 1.7px,transparent 1.7px) 0 0/26px 26px}
#title{position:absolute;left:${L.title[0]}px;top:${L.title[1]}px;width:${L.title[2]}px;font-weight:900;font-size:${L.titleSize}px;line-height:1.0;color:#151515;letter-spacing:-.5px}
#title .alt{color:#E8402F}
#title .satir{display:block;transform-origin:left center}
#stage{position:absolute;left:${L.mascot[0]}px;top:${L.mascot[1]}px;width:${L.mascot[2]}px;height:${L.mascot[2]}px}
#sub{position:absolute;left:${L.sub[0]}px;top:${L.sub[1]}px;width:${L.sub[2]}px;text-align:center;white-space:nowrap}
#sub span{display:inline-block;margin:0 5px;padding:4px 14px 6px;font-weight:900;font-size:${L.subSize}px;border-radius:10px;letter-spacing:-.3px}
#sub .on{background:#E8402F;color:#fff;box-shadow:4px 4px 0 #151515}#sub .off{color:#b3b3b3;background:#fff}
.o{position:absolute;transform-origin:center;will-change:transform}
.kart{background:#fff;border:4px solid #151515;border-radius:20px;box-shadow:7px 7px 0 #151515}
.em{font-family:'Noto Color Emoji';line-height:1}
/* e-Devlet kartı */
.ed{width:470px;overflow:hidden}.ed .hd{background:#E8402F;color:#fff;font-weight:900;font-size:26px;padding:14px 20px;border-bottom:4px solid #151515;display:flex;align-items:center;gap:10px}
.ed .row{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;font-weight:800;font-size:25px;color:#151515;border-bottom:3px dashed #e2e2e2}
.ed .row:last-child{border-bottom:0}.ed .muted{color:#9a9a9a;font-weight:700}
.rz{display:inline-block;padding:5px 14px;border-radius:9px;border:3px solid #151515;font-weight:900;font-size:22px;color:#fff;background:#1E9E6A;box-shadow:3px 3px 0 #151515}
/* liste */
.ls{min-width:520px;padding:10px 10px 10px 0;white-space:nowrap}.ls .it{display:flex;align-items:center;gap:16px;padding:12px 22px;font-weight:900;font-size:28px;color:#151515}
.ls .it .em{font-size:44px}
/* damga */
.dm{padding:10px 26px;border:7px solid #E8402F;border-radius:14px;color:#E8402F;font-weight:900;font-size:58px;background:rgba(255,255,255,.92);letter-spacing:1px}
/* ikon kartı */
.ik{display:flex;flex-direction:column;align-items:center;gap:6px}.ik .kutu{width:150px;height:150px;display:flex;align-items:center;justify-content:center}.ik .kutu .em{font-size:84px}
.ik b{font-weight:900;font-size:24px;color:#151515;text-transform:uppercase}
/* ok */
.ok svg{display:block}
/* yorum */
.yr{width:520px;padding:18px}.yr .ust{display:flex;align-items:center;gap:12px;font-weight:800;font-size:22px;color:#777;margin-bottom:12px}
.yr .av{width:46px;height:46px;border-radius:50%;background:#E8402F;border:3px solid #151515;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900}
.yr .in{display:flex;align-items:center;gap:10px}.yr .kutu{flex:1;border:3px solid #151515;border-radius:12px;padding:12px 16px;font-weight:900;font-size:34px;color:#151515;min-height:64px}
.yr .gon{background:#2F5BFF;color:#fff;border:3px solid #151515;border-radius:12px;padding:14px 18px;font-weight:900;font-size:22px}
.yr .imlec{display:inline-block;width:3px;height:34px;background:#E8402F;vertical-align:-5px;margin-left:2px}
/* rozet */
.pl{padding:10px 22px;border-radius:14px;border:4px solid #151515;font-weight:900;font-size:30px;box-shadow:5px 5px 0 #151515;white-space:nowrap}
.pl.k{background:#E8402F;color:#fff}.pl.s{background:#151515;color:#fff}.pl.y{background:#F6B92B;color:#151515}.pl.g{background:#1E9E6A;color:#fff}.pl.b{background:#fff;color:#151515}
/* adım */
.ad{display:flex;align-items:center;gap:16px}.ad .no{width:96px;height:96px;border-radius:24px;background:#E8402F;border:4px solid #151515;box-shadow:6px 6px 0 #151515;color:#fff;font-weight:900;font-size:58px;display:flex;align-items:center;justify-content:center}
.ad b{font-weight:900;font-size:40px;color:#151515;line-height:1.05}
/* soru / yorum çağrısı */
.sr{display:flex;align-items:center;gap:14px;padding:16px 22px 16px 16px;max-width:620px}
.sr .ic{font-size:46px}.sr .tx{font-weight:900;font-size:28px;line-height:1.15;color:#151515}.sr .tx small{display:block;font-size:20px;color:#E8402F;font-weight:900;letter-spacing:.5px}
/* ilerleme */
#bar{position:absolute;left:0;top:0;height:10px;background:#E8402F;z-index:9}
#adimlar{position:absolute;right:60px;top:56px;display:flex;gap:10px;z-index:9}
#adimlar i{font-style:normal;width:58px;height:58px;border-radius:16px;border:4px solid #151515;background:#fff;color:#151515;font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center;box-shadow:4px 4px 0 #151515}
#adimlar i.on{background:#E8402F;color:#fff;transform:scale(1.12)}#adimlar i.ok{background:#1E9E6A;color:#fff}
#cam{position:absolute;inset:0;transform-origin:50% 45%}
/* PORTAL (temsili) */
.pt{position:relative;background:#f3f5f8;border:4px solid #151515;border-radius:18px;box-shadow:8px 8px 0 #151515;overflow:hidden;font-family:'Inter',sans-serif}
.pt-bar{height:44px;background:#e4e7ec;border-bottom:2px solid #c9ced6;display:flex;align-items:center;gap:8px;padding:0 14px}
.pt-bar i{width:13px;height:13px;border-radius:50%;background:#ff5f57}.pt-bar i+i{background:#febc2e}.pt-bar i+i+i{background:#28c840}
.pt-url{margin-left:14px;flex:1;height:28px;background:#fff;border-radius:8px;display:flex;align-items:center;gap:8px;padding:0 12px;font-size:16px;color:#333;font-weight:600}
.pt-url .em{font-size:13px}
.pt-hd{height:58px;background:#22304a;color:#fff;display:flex;align-items:center;padding:0 22px;font-size:22px;font-weight:800;gap:8px}
.pt-hd .lg{width:34px;height:34px;border-radius:9px;background:#d7262e;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px}
.pt-hd .us{margin-left:auto;font-size:15px;font-weight:600;opacity:.8}
.pt-body{position:absolute;left:0;right:0;top:102px;bottom:0}
.sc{position:absolute;inset:0;padding:22px 28px;opacity:0}
.pt h3{margin:0 0 14px;font-size:24px;font-weight:900;color:#22304a}
.pt .fl{margin-bottom:14px}.pt .fl label{display:block;font-size:15px;font-weight:700;color:#55627a;margin-bottom:6px}
.pt .in{height:48px;background:#fff;border:2px solid #c9ced6;border-radius:10px;display:flex;align-items:center;padding:0 14px;font-size:20px;font-weight:700;color:#151515;letter-spacing:.5px}
.pt .in.fo{border-color:#2f6fe0;box-shadow:0 0 0 3px rgba(47,111,224,.18)}
.pt .in .ph{color:#a3abb9;font-weight:600}
.pt .bt{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 26px;border-radius:10px;background:#d7262e;color:#fff;font-weight:900;font-size:19px}
.pt .bt.ik{background:#22304a}
.pt .lgn{width:420px;margin:6px auto 0;background:#fff;border-radius:14px;padding:22px 24px;box-shadow:0 3px 10px rgba(0,0,0,.08)}
.pt .lgn .bt{width:100%}
.pt .ara{height:58px;font-size:21px;border-radius:12px}
.pt .rs{margin-top:10px;background:#fff;border-radius:12px;box-shadow:0 6px 16px rgba(0,0,0,.1);overflow:hidden;opacity:0}
.pt .rs .r{padding:14px 18px;border-bottom:1px solid #edf0f4;display:flex;flex-direction:column;gap:3px}
.pt .rs .r b{font-size:19px;color:#22304a}.pt .rs .r span{font-size:14px;color:#7a8599;font-weight:600}
.pt .rs .r.hv{background:#eef4ff}
.pt table{width:100%;border-collapse:separate;border-spacing:0;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.06)}
.pt th{background:#22304a;color:#fff;font-size:15px;text-align:left;padding:12px 14px;font-weight:800}
.pt td{font-size:17px;padding:12px 14px;border-bottom:1px solid #edf0f4;font-weight:700;color:#283449}
.pt tr.hl td{background:#fff3c4}
.pt .ch{display:inline-block;padding:4px 10px;border-radius:8px;font-size:14px;font-weight:900;background:#ffe3d6;color:#c24614}
.pt .ch.g{background:#d9f4e6;color:#13794c}
.pt .tst{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);background:#13794c;color:#fff;font-weight:900;font-size:19px;padding:14px 22px;border-radius:12px;opacity:0;white-space:nowrap}
.pt-cur{position:absolute;left:0;top:0;width:34px;height:34px;z-index:5;pointer-events:none}
.pt-rip{position:absolute;width:60px;height:60px;margin:-30px 0 0 -30px;border-radius:50%;border:4px solid #2f6fe0;opacity:0;z-index:4}
.pt-tag{position:absolute;right:12px;bottom:10px;font-size:12px;font-weight:800;color:#8b95a8;letter-spacing:1px;background:rgba(255,255,255,.8);padding:3px 8px;border-radius:6px;z-index:6}
/* arama çubuğu */
.ar{min-width:560px;padding:16px 22px 16px 18px;white-space:nowrap;display:flex;align-items:center;gap:12px}.ar .em{font-size:30px}.ar .tx{font-family:'JetBrains Mono',monospace;font-weight:800;font-size:24px;color:#151515}
.ar .ph{color:#aaa}
`;

// Öğe tipleri → HTML. data-* alanları frame() içindeki animasyonlarda kullanılır.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function ekranHTML(id, e) {
  const fld = f => `<div class="fl"><label>${esc(f.label)}</label><div class="in" data-id="${f.id}"><span data-val></span><span class="ph">${esc(f.ph || '')}</span></div></div>`;
  let h = '';
  if (e.tur === 'giris') h = `<div class="lgn"><h3>${esc(e.baslik || 'Giriş Yap')}</h3>${e.alanlar.map(fld).join('')}<div class="bt" data-id="${e.buton.id}">${esc(e.buton.t)}</div></div>`;
  if (e.tur === 'arama') h = `<h3>${esc(e.baslik || 'Hizmet Ara')}</h3><div class="in ara" data-id="${e.alan}"><span class="em" style="font-size:20px;margin-right:10px">🔍</span><span data-val></span><span class="ph">${esc(e.ph || 'Hizmet veya kurum ara…')}</span></div>
    <div class="rs" data-rs="${e.alan}">${e.sonuclar.map((r, i) => `<div class="r" data-id="${r.id || 'r' + i}"><b>${esc(r.t)}</b>${r.s ? `<span>${esc(r.s)}</span>` : ''}</div>`).join('')}</div>`;
  if (e.tur === 'tablo') h = `<h3>${esc(e.baslik)}</h3><table><tr>${e.kolonlar.map(k => `<th>${esc(k)}</th>`).join('')}</tr>${e.satirlar.map((r, i) => `<tr data-id="row${i}">${r.map((c, j) => `<td>${j === r.length - 1 && e.durum ? `<span class="ch ${e.durumRenk || ''}">${esc(c)}</span>` : esc(c)}</td>`).join('')}</tr>`).join('')}</table>`;
  if (e.tur === 'form') h = `<h3>${esc(e.baslik)}</h3>${(e.ust || []).map(b => `<div class="bt ik" data-id="${b.id}" style="margin-bottom:16px">${esc(b.t)}</div>`).join('')}${e.alanlar.map(fld).join('')}${e.butonlar.map(b => `<div class="bt" data-id="${b.id}">${esc(b.t)}</div>`).join(' ')}${e.toast ? `<div class="tst" data-id="${e.toast.id}">${esc(e.toast.t)}</div>` : ''}`;
  return `<div class="sc" data-sc="${id}">${h}</div>`;
}

const TIPLER = {
  portal: p => `<div class="pt" style="width:${p.w}px;height:${p.h}px"><div class="pt-bar"><i></i><i></i><i></i><div class="pt-url"><span class="em">🔒</span><span data-url></span></div></div>
    <div class="pt-hd"><span class="lg">e</span>e-Devlet Kapısı<span class="us">${esc(p.kullanici || '')}</span></div>
    <div class="pt-body">${Object.entries(p.ekranlar).map(([id, e]) => ekranHTML(id, e)).join('')}</div>
    <div class="pt-rip"></div><svg class="pt-cur" viewBox="0 0 34 34"><path d="M5 3 L5 27 L11 21 L15 31 L20 29 L16 19 L25 19 Z" fill="#fff" stroke="#151515" stroke-width="2.5" stroke-linejoin="round"/></svg>
    <div class="pt-tag">TEMSİLİ GÖRÜNTÜ</div></div>`,
  soru: p => `<div class="kart sr"><span class="em ic">${p.e || '💬'}</span><div class="tx"><small>${esc(p.ust || 'YORUMLARA YAZ 👇')}</small>${esc(p.yazi)}</div></div>`,
  edevlet: p => `<div class="kart ed"><div class="hd"><span class="em">🇹🇷</span>${esc(p.baslik || 'e-Devlet Kapısı')}</div>${(p.satirlar || []).map((r, i) => `<div class="row" data-sub="${i}"><span>${esc(r.t)}</span>${r.rozet ? `<span class="rz" data-rz="${i}">${esc(r.rozet)}</span>` : `<span class="muted">${esc(r.sag || '')}</span>`}</div>`).join('')}</div>`,
  liste: p => `<div class="kart ls">${p.ogeler.map((r, i) => `<div class="it" data-sub="${i}"><span class="em">${r.e}</span>${esc(r.t)}</div>`).join('')}</div>`,
  damga: p => `<div class="dm">${esc(p.yazi)}</div>`,
  ikon: p => `<div class="ik"><div class="kart kutu"><span class="em">${p.e}</span></div>${p.yazi ? `<b>${esc(p.yazi)}</b>` : ''}</div>`,
  rozet: p => `<div class="pl ${p.renk || 'k'}">${p.e ? `<span class="em">${p.e}</span> ` : ''}${esc(p.yazi)}</div>`,
  ok: p => `<div class="ok"><svg width="${p.w || 120}" height="60" viewBox="0 0 120 60"><path d="M6 30 H96" stroke="#151515" stroke-width="10" stroke-linecap="round"/><path d="M80 10 L108 30 L80 50" fill="none" stroke="#151515" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`,
  yorum: p => `<div class="kart yr"><div class="ust"><div class="av">S</div>Yorum ekle…</div><div class="in"><div class="kutu"><span data-yaz="${esc(p.yazi)}"></span><span class="imlec"></span></div><div class="gon">GÖNDER</div></div></div>`,
  adim: p => `<div class="ad"><div class="no">${p.no}</div><b>${esc(p.yazi)}</b></div>`,
  arama: p => `<div class="kart ar"><span class="em">🔍</span><span class="tx" data-yaz="${esc(p.yazi)}"></span><span class="imlec" style="display:inline-block;width:3px;height:26px;background:#E8402F"></span></div>`,
};

function sayfa({ W, H, L, tl }) {
  const dosya = fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8');
  const ogeler = tl.ogeler.map((o, i) => `<div class="o" id="o${i}" style="left:${o.x}px;top:${o.y}px;opacity:0">${TIPLER[o.tip](o)}</div>`).join('\n');
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>${CSS(W, H, L)}</style></head><body>
<div id="bg"></div><div id="cam"><div id="title"></div>${ogeler}<div id="sub"></div><div id="stage"></div></div><div id="bar"></div>${tl.adimSayisi ? `<div id="adimlar">${Array.from({ length: tl.adimSayisi }, (_, i) => `<i>${i + 1}</i>`).join('')}</div>` : ''}
<script>${dosya}</script>
<script>
const TL = ${JSON.stringify(tl)};
const MS = ${L.mascot[2]}, OS = ${L.ogeScale || 1};
const backOut = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const cl = (v,a,b) => Math.max(a, Math.min(b, v));
document.querySelectorAll('.o').forEach((el,i)=>{ const r = el.getBoundingClientRect(); el.dataset.w = r.width; el.dataset.h = r.height; });
// portal hedef noktalarını ölç (dönüşümsüz haldeyken)
const PT = {};
TL.ogeler.forEach((o,i)=>{ if (o.tip!=='portal') return; const el=document.getElementById('o'+i), pt=el.querySelector('.pt'), pr=pt.getBoundingClientRect(), pos={};
  pt.querySelectorAll('[data-id]').forEach(n=>{ const r=n.getBoundingClientRect(); pos[n.dataset.id]=[r.left-pr.left+Math.min(r.width*.5, 60), r.top-pr.top+r.height*.55]; });
  PT[i]={pos, w:pr.width, h:pr.height}; });
const easeIO = k => k<.5 ? 2*k*k : 1-Math.pow(-2*k+2,2)/2;
function portal(o, i, el, t){
  const P = PT[i], acts = o.akis;
  // ekran
  let scr = Object.keys(o.ekranlar)[0], scrT = -9;
  acts.forEach(a=>{ if (a.yap==='ekran' && a.T<=t) { scr=a.ad; scrT=a.T; } });
  el.querySelectorAll('.sc').forEach(sc=>{ const on = sc.dataset.sc===scr, k=cl((t-scrT)/.25,0,1); sc.style.opacity = on ? k : 0; sc.style.transform = on ? 'translateX('+((1-easeIO(k))*40)+'px)' : 'none'; });
  // yazı alanları, adres
  const typed = {};
  acts.forEach(a=>{ if (a.yap==='yaz' || a.yap==='url') { const n = Math.floor(cl((t-a.T)*(a.hiz||14),0,a.yazi.length)); if (t>=a.T) typed[a.yap==='url'?'__url':a.alan] = { s:a.yazi.slice(0,n), done:n>=a.yazi.length, act: t < a.T + a.yazi.length/(a.hiz||14) + .4 }; } });
  el.querySelector('[data-url]').textContent = typed.__url ? typed.__url.s : '';
  el.querySelectorAll('.in[data-id]').forEach(n=>{ const v = typed[n.dataset.id]; n.querySelector('[data-val]').textContent = v ? v.s : ''; n.querySelector('.ph').style.display = v && v.s ? 'none':'inline'; n.classList.toggle('fo', !!(v && v.act)); });
  el.querySelectorAll('[data-rs]').forEach(n=>{ const v = typed[n.dataset.rs]; n.style.opacity = v && v.s.length >= 4 ? 1 : 0; });
  // vurgula / göster / hover
  el.querySelectorAll('tr[data-id],.r[data-id]').forEach(n=>n.classList.remove('hl','hv'));
  acts.forEach(a=>{ if (t<a.T) return; const n = el.querySelector('[data-id="'+a.hedef+'"]'); if (!n) return;
    if (a.yap==='vurgula') n.classList.add('hl');
    if (a.yap==='tikla' && n.classList.contains('r')) n.classList.add('hv'); });
  acts.forEach(a=>{ if (a.yap!=='goster') return; const n = el.querySelector('[data-id="'+a.hedef+'"]'); if (n) { const k=cl((t-a.T)/.3,0,1); n.style.opacity=k; } });
  // fare imleci: hedefler arasında yumuşak hareket, tıklamada dalga
  const way = [{T:-9, p:[P.w*.82, P.h*.85]}];
  acts.forEach(a=>{ if (['tikla','yaz','vurgula'].includes(a.yap) && P.pos[a.hedef||a.alan]) way.push({T: a.T - (a.yap==='yaz'?.15:0), p:P.pos[a.hedef||a.alan], click:a.yap==='tikla'||a.yap==='yaz'}); });
  let cur = way[0].p;
  for (let j=1;j<way.length;j++){ const w=way[j], pv=way[j-1]; if (t>=w.T) cur=w.p; else { const st=w.T-.55; if (t>st){ const k=easeIO(cl((t-st)/.55,0,1)); cur=[pv.p[0]+(w.p[0]-pv.p[0])*k, pv.p[1]+(w.p[1]-pv.p[1])*k - Math.sin(k*Math.PI)*30]; } break; } }
  const c = el.querySelector('.pt-cur'); c.style.transform='translate('+(cur[0]-6)+'px,'+(cur[1]-4)+'px)';
  const rip = el.querySelector('.pt-rip'); let rk = -1; way.forEach(w=>{ if (w.click && t>=w.T && t<w.T+.4) rk=(t-w.T)/.4; });
  rip.style.opacity = rk<0 ? 0 : 1-rk; rip.style.left=cur[0]+'px'; rip.style.top=cur[1]+'px'; rip.style.transform='scale('+(.3+rk*.9)+')';
  acts.forEach(a=>{ if (a.yap==='tikla') { const n = el.querySelector('[data-id="'+a.hedef+'"]'); if (n && n.classList.contains('bt')) n.style.transform = (t>=a.T && t<a.T+.15) ? 'scale(.94)' : 'none'; } });
}
let lastTitle = -1;
function frame(t){
  // başlık
  const bi = TL.basliklar.reduce((a,b,i)=> b.t<=t ? i : a, -1);
  const T = document.getElementById('title');
  if (bi !== lastTitle) { lastTitle = bi; T.innerHTML = bi<0 ? '' : '<span class="satir">'+TL.basliklar[bi].ust+'</span><span class="satir alt">'+TL.basliklar[bi].alt+'</span>'; }
  if (bi>=0) { const k = cl((t-TL.basliklar[bi].t)/.3,0,1); [...T.children].forEach((s,j)=>{ const kk = cl(k*1.3 - j*.3,0,1); s.style.transform='translateX('+((1-backOut(kk))*-40)+'px)'; s.style.opacity=kk; }); }
  // öğeler
  TL.ogeler.forEach((o,i)=>{
    const el = document.getElementById('o'+i), w = +el.dataset.w, h = +el.dataset.h;
    const lt = t - o.t0, out = o.t1 != null ? t - o.t1 : -1;
    let s = 0, op = 0, rot = o.rot || 0;
    if (lt >= 0) { const k = cl(lt/.38,0,1); s = .55 + .45*backOut(k); op = cl(lt/.12,0,1); }
    if (o.tip === 'damga' && lt >= 0) { const k = cl(lt/.22,0,1); s = 1.9 - .9*k*k; op = cl(lt/.08,0,1); }
    if (out >= 0) { const k = cl(out/.25,0,1); s *= 1 - .25*k; op *= 1-k; }
    el.style.opacity = op;
    el.style.transform = 'translate('+(-w/2)+'px,'+(-h/2)+'px) scale('+(s*OS)+') rotate('+rot+'deg)';
    if (op <= 0) return;
    // alt parçalar (liste satırları, rozetler) kendi kelimelerinde belirir
    el.querySelectorAll('[data-sub]').forEach(sub => { const st = (o.altT||[])[+sub.dataset.sub]; const k = st==null ? 1 : cl((t-st)/.3,0,1); sub.style.opacity = k; sub.style.transform = 'translateX('+((1-backOut(k))*30)+'px)'; });
    el.querySelectorAll('[data-rz]').forEach(rz => { const st = (o.rozetT||[])[+rz.dataset.rz]; const k = st==null ? 1 : cl((t-st)/.3,0,1); rz.style.opacity = k; rz.style.transform = 'scale('+(st==null?1:.4+.6*backOut(k))+')'; });
    if (o.tip === 'portal') portal(o, i, el, t);
    el.querySelectorAll('[data-yaz]').forEach(y => { const txt = y.dataset.yaz, st = o.yazT ?? o.t0 + .3, n = Math.floor(cl((t-st)*(o.hiz||9),0,txt.length)); y.textContent = txt.slice(0,n); });
  });
  // altyazı: iki kelimelik pencere, konuşulan kelime vurgulu
  const W = TL.kelimeler, sub = document.getElementById('sub');
  let w = W.findIndex(k => t>=k.t0 && t<k.t1);
  if (w < 0) { const p = W.findIndex(k => k.t0 > t); w = (p>0 && t - W[p-1].t1 < .35) ? p-1 : -1; }
  if (w < 0) sub.innerHTML = '';
  else { const pair = w % 2 === 0 ? [w, w+1] : [w-1, w]; sub.innerHTML = pair.filter(i=>W[i]).map(i=>'<span class="'+(i===w?'on':'off')+'">'+W[i].w.replace(/[,.!?;:"]/g,'').toLocaleUpperCase('tr')+'</span>').join(''); }
  // kamera
  let zs = 1, sx = 0, sy = 0;
  if (bi >= 0) { const d = t - TL.basliklar[bi].t; if (d < .45) zs = 1 + .045 * Math.pow(1 - d/.45, 2); }
  TL.ogeler.forEach(o => { if (o.tip === 'damga') { const d = t - o.t0 - .2; if (d >= 0 && d < .28) { const a = (1 - d/.28) * 9; sx = Math.sin(d*90)*a; sy = Math.cos(d*77)*a; } } });
  document.getElementById('cam').style.transform = 'translate('+sx+'px,'+sy+'px) scale('+zs+')';
  document.getElementById('bar').style.width = (100 * cl(t / TL.duration, 0, 1)) + '%';
  const AD = document.getElementById('adimlar');
  if (AD) { const cur = bi >= 0 ? TL.basliklar[bi].adim || 0 : 0; [...AD.children].forEach((c, j) => { c.className = j + 1 === cur ? 'on' : (j + 1 < cur ? 'ok' : ''); }); AD.style.opacity = cur ? 1 : 0; }
  // maskot
  document.getElementById('stage').innerHTML = Dosya.svg(Dosya.stateAt(TL, t), 'f', MS, MS);
}
</script></body></html>`;
}
module.exports = { sayfa };

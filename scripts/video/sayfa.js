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
/* arama çubuğu */
.ar{min-width:560px;padding:16px 22px 16px 18px;white-space:nowrap;display:flex;align-items:center;gap:12px}.ar .em{font-size:30px}.ar .tx{font-family:'JetBrains Mono',monospace;font-weight:800;font-size:24px;color:#151515}
.ar .ph{color:#aaa}
`;

// Öğe tipleri → HTML. data-* alanları frame() içindeki animasyonlarda kullanılır.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const TIPLER = {
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
<div id="bg"></div><div id="title"></div>${ogeler}<div id="sub"></div><div id="stage"></div>
<script>${dosya}</script>
<script>
const TL = ${JSON.stringify(tl)};
const MS = ${L.mascot[2]}, OS = ${L.ogeScale || 1};
const backOut = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const cl = (v,a,b) => Math.max(a, Math.min(b, v));
document.querySelectorAll('.o').forEach((el,i)=>{ const r = el.getBoundingClientRect(); el.dataset.w = r.width; el.dataset.h = r.height; });
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
    el.querySelectorAll('[data-yaz]').forEach(y => { const txt = y.dataset.yaz, st = o.yazT ?? o.t0 + .3, n = Math.floor(cl((t-st)*(o.hiz||9),0,txt.length)); y.textContent = txt.slice(0,n); });
  });
  // altyazı: iki kelimelik pencere, konuşulan kelime vurgulu
  const W = TL.kelimeler, sub = document.getElementById('sub');
  let w = W.findIndex(k => t>=k.t0 && t<k.t1);
  if (w < 0) { const p = W.findIndex(k => k.t0 > t); w = (p>0 && t - W[p-1].t1 < .35) ? p-1 : -1; }
  if (w < 0) sub.innerHTML = '';
  else { const pair = w % 2 === 0 ? [w, w+1] : [w-1, w]; sub.innerHTML = pair.filter(i=>W[i]).map(i=>'<span class="'+(i===w?'on':'off')+'">'+W[i].w.replace(/[,.!?;:"]/g,'').toLocaleUpperCase('tr')+'</span>').join(''); }
  // maskot
  document.getElementById('stage').innerHTML = Dosya.svg(Dosya.stateAt(TL, t), 'f', MS, MS);
}
</script></body></html>`;
}
module.exports = { sayfa };

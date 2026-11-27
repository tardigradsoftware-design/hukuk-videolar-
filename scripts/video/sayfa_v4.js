// v4 "Sinematik Dosya" sayfası: aynı plan/öğe/altyazı/maskot; yeni görsel dünya ve hareket dili.
// Zemin: kâğıt dokusu + gezen anahtar ışık + paralaks nokta ızgarası + film greni + vinyet (ölü kare yok).
// Hareket: girişte softLand (yavaşlayarak iniş) + odak netleşmesi, çıkışta accelExit; başlık maske arkasından çıkar;
// sahne geçişi hız eşlemeli içe dalış (çıkan büyür+bulanır, gelen uzaktan netleşir); kamera sürekli nefes alır.
// Deterministik: Math.random/Date yok; gren LCG tohumu kare numarası.
const fs = require('fs'), path = require('path');
const { CSS, TIPLER, STIL_V3 } = require('./sayfa');

const V4 = (W, H) => `
html,body{background:#EFE9DD}
#bg{display:none}
#kagit{position:absolute;inset:-6%;background:#EFE9DD;filter:url(#doku)}
#isik{position:absolute;inset:0;mix-blend-mode:soft-light}
#nokta{position:absolute;inset:-60px;background:radial-gradient(#cbbfa9 1.6px,transparent 1.7px) 0 0/30px 30px;opacity:.55}
#vin{position:absolute;inset:0;pointer-events:none;z-index:7;background:radial-gradient(ellipse at 50% 42%,transparent 48%,rgba(40,24,10,.20) 100%)}
#gren{position:absolute;inset:0;width:${W}px;height:${H}px;pointer-events:none;z-index:9;mix-blend-mode:overlay;opacity:.5}
#kirmizi{position:absolute;inset:0;pointer-events:none;z-index:6;opacity:0;background:radial-gradient(ellipse at 50% 45%,transparent 35%,rgba(232,64,47,.55) 100%)}
#cam{position:absolute;inset:0;transform-origin:50% 42%}
#title .satir{display:block;overflow:hidden;padding:0 4px 6px;margin-bottom:-6px}
#title .satir>i{display:inline-block;font-style:normal;will-change:transform}
#title .alt>i{color:#E8402F}
#title .cz{display:block;height:9px;width:0;background:#151515;border-radius:6px;margin-top:6px;transform-origin:left}
.kart,.pl,.ad .no{border:5px solid #151515!important;border-radius:22px!important;
  box-shadow:6px 6px 0 #151515,0 34px 50px -18px rgba(60,35,10,.45),0 10px 18px -8px rgba(60,35,10,.25)!important}
.pl{border-radius:16px!important}
.kart{position:relative;overflow:hidden}
.gl{position:absolute;top:-20%;bottom:-20%;width:38%;left:0;pointer-events:none;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.75) 45%,rgba(255,255,255,.0) 70%);transform:translateX(-160%) skewX(-14deg)}
.dm{background:rgba(255,250,240,.95)!important;box-shadow:0 30px 60px -20px rgba(120,20,10,.55)}
.o{perspective:900px}
#stage{z-index:5}
`;

function sayfa({ W, H, L, tl }) {
  const dosya = fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8');
  const kaynak = fs.readFileSync(path.join(__dirname, 'sayfa.js'), 'utf8');
  // v3 ile ortak: portal ölçümü/oynatıcısı ve otomatik KONTROL (birebir aynı kalsın)
  const ortak = kaynak.slice(kaynak.indexOf('const PT = {};'), kaynak.indexOf('function frame(t){'));
  const ogeler = tl.ogeler.map((o, i) => `<div class="o" id="o${i}" style="left:${o.x}px;top:${o.y}px;opacity:0">${TIPLER[o.tip](o).replace(/^<div class="kart([^"]*)">/, '<div class="kart$1"><i class="gl"></i>')}</div>`).join('\n');
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>${CSS(W, H, L)}${STIL_V3()}${V4(W, H)}:root{--ts:${L.titleSize}px;--ss:${L.subSize}px}</style></head><body>
<svg width="0" height="0" style="position:absolute"><filter id="doku"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .93  0 0 0 0 .91  0 0 0 0 .86  0 0 0 -.9 1.1"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="multiply"/></filter></svg>
<div id="kagit"></div><div id="nokta"></div><div id="isik"></div><div id="bg"></div><div id="flas"></div>
<div id="cam"><div id="title"></div>${ogeler}</div><div id="stage"></div><div id="sub"></div>
<div id="kirmizi"></div><div id="vin"></div><canvas id="gren" width="${W >> 1}" height="${H >> 1}"></canvas>
<script>${dosya}</script>
<script>
const TL = ${JSON.stringify(tl)};
const MS = ${L.mascot[2]}, OS = ${L.ogeScale || 1}, MX = ${L.mascot[0]}, MY = ${L.mascot[1]};
const backOut = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const YT = true;
const cl = (v,a,b) => Math.max(a, Math.min(b, v));
const softLand = k => 1 - Math.pow(1 - cl(k,0,1), 4);           // yavaşlayarak iniş
const accelExit = k => Math.pow(cl(k,0,1), 3);                     // hızlanarak çıkış
const snap = k => { k = cl(k,0,1); return 1 + Math.pow(2, -10 * k) * Math.sin((k * 10 - .75) * 2.094) * -.0 - Math.pow(1 - k, 5); };
const nz = (t, s) => Math.sin(t * 1.13 + s) * .6 + Math.sin(t * .71 + s * 2.3) * .4;   // yumuşak deterministik gürültü
document.querySelectorAll('.o').forEach((el,i)=>{ const r = el.getBoundingClientRect(); el.dataset.w = r.width; el.dataset.h = r.height; });
${ortak}
// --- film greni: kare numarasıyla tohumlanan LCG (her render aynı)
const G = document.getElementById('gren'), gx = G.getContext('2d'), GI = gx.createImageData(G.width, G.height);
function gren(f){ let s = (f * 2654435761) >>> 0; const d = GI.data;
  for (let i = 0; i < d.length; i += 4) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; const v = 96 + (s >>> 24) * .25; d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255; }
  gx.putImageData(GI, 0, 0); }
const SAH = TL.basliklar.map(b => b.t);
function frame(t){
  MST = Dosya.stateAt(TL, t);
  const bi = TL.basliklar.reduce((a,b,i)=> b.t<=t ? i : a, -1);
  // --- başlık: maske arkasından satır satır çıkar, kırmızı satırın altına çizgi süpürülür
  const T = document.getElementById('title');
  if (bi !== lastTitle) { lastTitle = bi; T.innerHTML = bi<0 ? '' : '<span class="satir"><i>'+TL.basliklar[bi].ust+'</i></span><span class="satir alt"><i>'+TL.basliklar[bi].alt+'</i></span><span class="cz"></span>'; }
  if (bi>=0) { const d = t - TL.basliklar[bi].t;
    [...T.querySelectorAll('.satir>i')].forEach((s,j)=>{ const k = softLand((d - .06 - j*.09)/.5); s.style.transform = 'translateY('+((1-k)*112)+'%) rotate('+((1-k)*4)+'deg)'; });
    const cz = T.querySelector('.cz'), kc = softLand((d - .32)/.45); cz.style.width = (kc*140)+'px'; }
  // --- öğeler
  TL.ogeler.forEach((o,i)=>{
    const el = document.getElementById('o'+i), w = +el.dataset.w, h = +el.dataset.h;
    const lt = t - o.t0, out = o.t1 != null ? t - o.t1 : -1;
    let s = 1, op = 0, rot = o.rot || 0, dx = 0, dy = 0, bl = 0, rx = 0;
    if (lt >= 0) { const k = softLand(lt/.5); op = cl(lt/.14,0,1); dy = (1-k)*60; s = .94 + .06*k; bl = (1-k)*8; rx = (1-k)*22; }
    if (o.tip === 'damga' && lt >= 0) { const k = cl(lt/.2,0,1); s = 2.3 - 1.3*k*k; op = cl(lt/.06,0,1); dy = 0; bl = (1-k)*4; rx = 0;
      if (lt > .2) s = 1 + .05*Math.exp(-(lt-.2)*14)*Math.cos((lt-.2)*40); }
    const rig2page = (x, y) => [MX + MS * x / 600, MY + MS * (y + 40 + (MST.bob || 0) - (MST.jump || 0)) / 600];
    if (o.firlat === 'el' && lt >= -.32 && lt < 0) { const hp = Dosya.elKonum(MST.armR), [px, py] = rig2page(hp[0], hp[1] - 18); dx = px - o.x; dy = py - o.y; s = .32; op = 1; rot = (o.rot || 0) - 10; bl = 0; rx = 0; }
    if (o.firlat && lt >= 0 && lt < .6) {
      const k = softLand(lt / .6), src = o.firlat === 'el' ? rig2page(405, 52) : rig2page(300, 190);
      const px = src[0] + (o.x - src[0]) * k, py = src[1] + (o.y - src[1]) * k - Math.sin(k * Math.PI) * (o.firlat === 'el' ? 170 : 270);
      dx = px - o.x; dy = py - o.y; s = (o.firlat === 'el' ? .32 : .2) + (o.firlat === 'el' ? .68 : .8) * k; op = o.firlat === 'el' ? 1 : cl(lt / .06, 0, 1);
      rot = (o.rot || 0) + (1 - k) * (o.firlat === 'el' ? 200 : 340); bl = Math.sin(k * Math.PI) * 3; rx = 0;
    } else if (o.firlat && lt >= .6) { const k = cl((lt - .6) / .3, 0, 1); s = 1 + .07 * Math.sin(k * Math.PI); }
    if (out >= 0) { const k = accelExit(out/.24); dy -= k*70; s *= 1 - .08*k; op *= 1-k; bl += k*10; }
    el.style.opacity = op;
    el.style.transform = 'translate('+(dx - w/2)+'px,'+(dy - h/2)+'px) scale('+(s*OS)+') rotate('+rot+'deg) rotateX('+rx+'deg)';
    el.style.filter = bl > .3 ? 'blur('+bl.toFixed(1)+'px)' : 'none';
    if (op <= 0) return;
    const gl = el.querySelector('.gl'); if (gl) { const k = cl((lt - .35)/.7, 0, 1); gl.style.transform = 'translateX('+(-160 + 460*k)+'%) skewX(-14deg)'; }
    el.querySelectorAll('[data-sub]').forEach(sub => { const st = (o.altT||[])[+sub.dataset.sub]; const k = st==null ? 1 : softLand((t-st)/.4); sub.style.opacity = cl(k*1.6,0,1); sub.style.transform = 'translateY('+((1-k)*26)+'px)'; sub.style.filter = k < .98 ? 'blur('+((1-k)*5).toFixed(1)+'px)' : 'none'; });
    el.querySelectorAll('[data-rz]').forEach(rz => { const st = (o.rozetT||[])[+rz.dataset.rz]; if (st==null) return; const lk = t-st, k = cl(lk/.22,0,1); rz.style.opacity = k; rz.style.transform = 'scale('+(lk<.22 ? 1.6-.6*k*k : 1+.06*Math.exp(-(lk-.22)*12)*Math.cos((lk-.22)*36))+')'; });
    if (o.tip === 'portal') portal(o, i, el, t);
    el.querySelectorAll('[data-yaz]').forEach(y => { const txt = y.dataset.yaz, st = o.yazT ?? o.t0 + .3, hz = Math.max(o.hiz||9, txt.length/1.2), n = Math.floor(cl((t-st)*hz,0,txt.length)); y.textContent = txt.slice(0,n); });
    el.querySelectorAll('[data-kl]').forEach(m => { const st = (o.altT||[])[+m.dataset.kl]; const k = st==null ? 1 : cl((t-st)/.25,0,1); m.style.opacity = .35 + .65*k; m.classList.toggle('ok', st!=null && t >= st + .1); });
  });
  // --- altyazı (v3 ile birebir aynı stil): 2–3 kelimelik parça, konuşulan kelime siyah kutu
  const W = TL.kelimeler, sub = document.getElementById('sub');
  const P = TL.parcalar.find(p => t >= p.t0 && t < p.t1);
  if (!P) { sub.innerHTML = ''; sub.dataset.p = ''; }
  else {
    if (sub.dataset.p !== String(P.i0)) { sub.dataset.p = P.i0; sub.innerHTML = W.slice(P.i0, P.i1 + 1).map(k => '<span>' + k.w.replace(/[,.!?;:"“”()…]/g,'').toLocaleUpperCase('tr') + '</span>').join(''); }
    const kk = cl((t - P.t0) / .14, 0, 1); sub.style.opacity = kk; sub.style.transform = 'translateY(' + ((1 - kk) * 14) + 'px)';
    let aw = -1; for (let i = P.i0; i <= P.i1; i++) if (t >= W[i].t0 - .02) aw = i;
    [...sub.children].forEach((sp, j) => { const i = P.i0 + j, on = i === aw; sp.classList.toggle('on', on);
      const d = t - W[i].t0; sp.style.transform = on ? 'scale(' + (1 + .07 * Math.exp(-d * 7) * Math.cos(d * 18) + .03) + ')' : 'none'; });
  }
  // --- kamera: sürekli nefes (itme + sürüklenme) + hız eşlemeli içe dalış geçişi
  const s0 = bi >= 0 ? SAH[bi] : 0, s1 = SAH[bi + 1] ?? TL.duration;
  const ks = cl((t - s0) / Math.max(1, s1 - s0), 0, 1);
  let zs = 1 + .045 * ks, tx = nz(t * .6, 1) * 7, ty = nz(t * .5, 4) * 5, blur = 0;
  const dOut = s1 - t;                                   // çıkan sahne: büyür ve bulanır (accelExit)
  if (bi + 1 < SAH.length && dOut < .2) { const k = accelExit(1 - dOut / .2); zs *= 1 + .28 * k; blur = 12 * k; }
  const dIn = t - s0;                                    // gelen sahne: uzaktan yaklaşıp netleşir (softLand)
  if (bi > 0 && dIn < .36) { const k = softLand(dIn / .36); zs *= .84 + .16 * k; blur = Math.max(blur, 12 * (1 - k)); }
  let sx = 0, sy = 0, kir = 0;
  TL.ogeler.forEach(o => { if (o.tip === 'damga') { const d = t - o.t0 - .2; if (d >= 0 && d < .32) { const a = (1 - d/.32) * 11; sx = Math.sin(d*90)*a; sy = Math.cos(d*77)*a; kir = Math.max(kir, 1 - d/.32); } } });
  const cam = document.getElementById('cam');
  cam.style.transform = 'translate('+(tx+sx)+'px,'+(ty+sy)+'px) scale('+zs+')';
  cam.style.filter = blur > .3 ? 'blur('+blur.toFixed(1)+'px)' : 'none';
  document.getElementById('kirmizi').style.opacity = kir * .8;
  // --- zemin: paralaks nokta ızgarası (kameranın yarı hızı), gezen sıcak anahtar ışık
  document.getElementById('nokta').style.transform = 'translate('+(tx*.5 - t*6 % 30)+'px,'+(ty*.5)+'px) scale('+(1 + (zs-1)*.4)+')';
  const lx = 50 + nz(t*.3, 2)*16, ly = 32 + nz(t*.27, 5)*10;
  document.getElementById('isik').style.background = 'radial-gradient(circle at '+lx+'% '+ly+'%, rgba(255,214,150,.95), rgba(255,190,120,.25) 38%, rgba(40,20,0,.35) 85%)';
  gren(Math.round(t * 30));
  // --- maskot (kameradan bağımsız; hafif paralaks)
  const st = document.getElementById('stage'); st.style.transform = 'translate('+(tx*.35)+'px,'+(ty*.35)+'px)';
  st.innerHTML = Dosya.svg(MST, 'f', MS, MS);
}
</script></body></html>`;
}
module.exports = { sayfa };

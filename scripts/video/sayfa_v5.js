// v5 "Kâğıt Kinetik" (maskotsuz). Kaynak yönerge: prompt-motion.com "Paper-style product launch film" promptu:
// açık kâğıt zemin, kendini çizen keçeli kalem notları, dev kinetik yazı (Anton), sert açık/koyu geçişler,
// ~1,5 sn'de bir yeni fikir, her vuruşta ses, gerçek fizik (squash/stretch, stagger, overlap, smear, follow-through).
// Kural: arayüz süsü yok (zaman kodu, başlık şeridi), uydurma rakam yok, emoji yok (Phosphor ikon).
// Deterministik: rastgelelik yok; titrek kalem çizgileri sabit tohumlu.
const fs = require('fs'), path = require('path');
const IK = require('./ikonlar');
const CZ = require('./cizimler');   // kendi 2B SVG çizimlerimiz (emoji/ikon kütüphanesi yok)
const FN = (p) => 'file://' + path.join(__dirname, '..', '..', 'node_modules', '@fontsource', p);
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function sayfa({ W, H, L, tl }) {
  const V = tl.vurus || [];
  const ink = b => b.koyu ? '#F2EEE6' : '#151515', acc = '#E8402F';
  const harf = (s, vurgu, cp) => [...s].map(c => `<b class="h${vurgu ? ' v' : ''}${cp && c !== ' ' ? ' c' : ''}">${c === ' ' ? '&nbsp;' : esc(c)}</b>`).join('');
  const html = V.map((b, i) => {
    let ic = b.ikon ? `<div class="ik" id="ik${i}">${CZ.svg(b.ikon, 210)}</div>` : '';
    let x = '';
    if (b.tip === 'dev' || b.tip === 'yorum') x += `<div class="dev" id="dv${i}">${(b.satir || []).map(s => `<div class="sat">${s.split(' ').map(w => harf(w + ' ', w.replace(/["']/g, '') === (b.vurgu || ''), w === b.carpi)).join('')}</div>`).join('')}</div>`;
    if (b.tip === 'not') x += `<div class="not" id="nt${i}"><span>${esc(b.yazi)}</span></div>`;
    if (b.etiketler) x += b.etiketler.map((e, j) => `<div class="etk" id="et${i}_${j}">${esc(e)}</div>`).join('');
    if (b.tip === 'ui') x += `<div class="ui" id="ui${i}"><div class="uh"><span>e-Devlet</span><small>TEMSİLİ GÖRÜNTÜ</small></div>
      <div class="ur"><span class="lk">${CZ.svg('kilit', 58)}</span><div class="ut"><b>${esc(b.baslik)}</b><small>${esc(b.alt1 || '')}</small></div><div class="tg"><i></i></div></div></div>`;
    if (b.tip === 'gazete') x += `<div class="gz" id="gz${i}"><div class="gm"><span>${esc(b.ust || '')}</span><span>TEMSİLİ</span></div><h3>${esc(b.baslik)}</h3>${b.satirlar.map((r, j) => `<div class="gr${j === b.hl ? ' hlr' : ''}"><i class="hl"></i><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>`;
    if (b.tip === 'karisim') x += `<div class="ks" id="ks${i}"><small>${esc(b.ust || '')}</small><div class="kx">${[...b.yazi].map(c => `<b data-c="${esc(c)}">${esc(c)}</b>`).join('')}</div></div>`;
    if (b.tip === 'telefon') x += `${b.not ? `<div class="not tn" id="nt${i}"><span>${esc(b.not)}</span></div>` : ''}<div class="tf" id="tf${i}"><div class="tb"><span>9:41</span><span>●●● ▮</span></div>${b.ekranlar.map((e, j) => e.basarili
        ? `<div class="sc ok"><div class="ck">${CZ.svg('tik', 120)}</div><b>${esc(e.basarili)}</b><small>${esc(e.alt || '')}</small></div>`
        : `<div class="sc"><h4>${esc(e.baslik)}</h4>${e.satirlar.map((r, q) => `<div class="rw${q === e.hedef ? ' hd' : ''}${/iptal/i.test(r) ? ' kr' : ''}">${esc(r)}<i>›</i></div>`).join('')}</div>`).join('')}
      <div class="rp"></div><div class="im">${CZ.svg('el', 76)}</div></div>`;
    if (b.tip === 'grafik' && b.rm) x += `<div class="rm" id="rm${i}" style="left:${(W - b.rm.w) / 2}px;width:${b.rm.w}px;height:${b.rm.h}px;top:${b.top ?? 140}px">${Array.from({ length: b.rm.n }, (_, q) => `<img src="file://${b.rm.dir}/element-${String(q).padStart(String(b.rm.n - 1).length, '0')}.png">`).join('')}</div>`;
    if (b.tip === 'yorum') x += `<div class="yr" id="yr${i}"><div class="av">S</div><div class="kt"><span class="yz"></span><i class="cr"></i></div><div class="gn">${CZ.svg('ucak', 40)}</div></div>`;
    return `<div class="vb" id="vb${i}" data-koyu="${b.koyu ? 1 : 0}">${ic}${x}<svg class="cz" id="cz${i}" width="${W}" height="${H}"><path d="" /></svg></div>`;
  }).join('\n');
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>
@font-face{font-family:Arc;src:url('${FN('../@fontsource-variable/archivo/files/archivo-latin-ext-standard-normal.woff2')}') format('woff2');font-weight:100 900;font-stretch:62% 125%;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Arc;src:url('${FN('../@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2')}') format('woff2');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:Geist;src:url('${FN('../@fontsource-variable/geist/files/geist-latin-ext-wght-normal.woff2')}') format('woff2');font-weight:100 900;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Geist;src:url('${FN('../@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}') format('woff2');font-weight:100 900}
@font-face{font-family:GM;src:url('${FN('../@fontsource-variable/geist-mono/files/geist-mono-latin-ext-wght-normal.woff2')}') format('woff2');font-weight:100 900;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:GM;src:url('${FN('../@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')}') format('woff2');font-weight:100 900}
@font-face{font-family:Anton;src:url('${FN('anton/files/anton-latin-ext-400-normal.woff2')}') format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Anton;src:url('${FN('anton/files/anton-latin-400-normal.woff2')}') format('woff2')}
@font-face{font-family:Caveat;src:url('${FN('caveat/files/caveat-latin-ext-700-normal.woff2')}') format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Caveat;src:url('${FN('caveat/files/caveat-latin-700-normal.woff2')}') format('woff2')}
*{box-sizing:border-box}html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#FFFFFF;font-family:Geist,sans-serif}
#zemin{position:absolute;inset:0;background:#FFFFFF}
#doku{display:none}
#vin{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 40%,transparent 70%,rgba(0,0,0,.05))}
#koyu{position:absolute;inset:0;background:#1B1A19;display:none}body.k #doku{opacity:.25}body.k #vin{background:radial-gradient(ellipse at 50% 40%,transparent 45%,rgba(0,0,0,.55))}
#gren{position:absolute;inset:0;width:${W}px;height:${H}px;mix-blend-mode:multiply;opacity:.06;pointer-events:none;z-index:9}
#cam{position:absolute;inset:0;transform-origin:50% 45%}
.vb{position:absolute;inset:0;pointer-events:none}
.dev{position:absolute;left:0;right:0;top:150px;text-align:center}
.sat{display:block;width:max-content;margin:0 auto;font-family:Arc,sans-serif;font-weight:900;font-stretch:62%;line-height:.92;white-space:nowrap;color:#151515;letter-spacing:.005em}
.vb[data-koyu="1"] .sat{color:#F2EEE6}
.h{display:inline-block;font-weight:900;will-change:transform;transform-origin:50% 100%}.h.v{color:#E8402F}
.ik{position:absolute;left:${W / 2 - 105}px;top:560px;width:210px;height:210px;transform-origin:50% 100%}
.ik .cz-il{filter:drop-shadow(0 16px 10px rgba(40,25,10,.22))}
.not{position:absolute;left:30px;right:30px;top:430px;text-align:center;font-family:Caveat,cursive;font-size:84px;line-height:1;color:#E8402F;white-space:nowrap}
.not span{display:inline-block}
.etk{position:absolute;top:0;left:0;font-family:Arc;font-weight:900;font-stretch:68%;font-size:68px;padding:6px 28px 4px;border-radius:14px;background:#151515;color:#F2EEE6;box-shadow:0 18px 20px -12px rgba(40,25,10,.5);transform-origin:50% 100%}
.etk:nth-of-type(odd){background:#E8402F;color:#fff}
.ui{position:absolute;left:50px;width:620px;top:500px;background:#fff;border-radius:26px;box-shadow:0 0 0 3px #151515,8px 8px 0 #151515,0 40px 50px -24px rgba(40,25,10,.45);overflow:hidden}
.uh{display:flex;justify-content:space-between;align-items:center;background:#151515;color:#fff;padding:14px 22px;font-weight:900;font-size:26px}.uh small{font-size:15px;letter-spacing:.1em;color:#F6B92B}
.ur{position:relative;display:flex;align-items:center;gap:16px;padding:26px 22px}
.lk{position:absolute;left:22px;top:50%;margin-top:-27px}.ut{margin-left:72px;flex:1}.ut b{display:block;font-weight:900;font-size:29px;color:#151515}.ut small{font-size:22px;color:#8B8E95;font-weight:700}
.tg{width:96px;height:54px;border-radius:30px;background:#cfc8bc;position:relative;flex:none}.tg i{position:absolute;top:5px;left:5px;width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 3px 6px rgba(0,0,0,.25)}
.yr{position:absolute;left:40px;width:640px;top:520px;display:flex;align-items:center;gap:14px;background:#fff;border-radius:24px;padding:18px;box-shadow:0 0 0 3px #151515,8px 8px 0 #151515}
.yr .av{width:58px;height:58px;border-radius:50%;background:#E8402F;color:#fff;font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center;flex:none}
.yr .kt{flex:1;border:3px solid #d9d2c5;border-radius:14px;height:76px;display:flex;align-items:center;padding:0 18px;font-family:Arc;font-weight:900;font-stretch:72%;font-size:46px;color:#151515}
.yr .cr{display:inline-block;width:4px;height:44px;background:#E8402F;margin-left:4px}
.yr .gn{width:76px;height:76px;border-radius:18px;background:#151515;display:flex;align-items:center;justify-content:center;flex:none}
@font-face{font-family:Playfair;src:url('${FN('playfair-display/files/playfair-display-latin-ext-900-normal.woff2')}') format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Playfair;src:url('${FN('playfair-display/files/playfair-display-latin-900-normal.woff2')}') format('woff2')}
.gz{position:absolute;left:50px;width:620px;top:360px;background:#FFFDF8;padding:26px 34px 30px;box-shadow:0 0 0 2px #151515,0 40px 50px -26px rgba(40,25,10,.5);transform-origin:50% 0}
.gz .gm{display:flex;justify-content:space-between;font:700 17px GM,monospace;letter-spacing:.18em;color:#8B8E95;border-bottom:3px double #151515;padding-bottom:10px}
.gz h3{font:900 58px/1.02 Playfair,'DejaVu Serif',serif;margin:18px 0 14px;color:#151515;letter-spacing:-.01em}
.gr{position:relative;display:flex;justify-content:space-between;font:600 30px Geist,sans-serif;color:#151515;padding:14px 0;border-top:1.5px solid #151515}.gr b{font-family:GM,monospace;font-weight:700}
.gr .hl{position:absolute;left:-10px;right:-10px;top:8px;bottom:8px;background:#F6B92B;transform-origin:left;transform:scaleX(0);z-index:-1;border-radius:4px}.gr{z-index:0}.gz{isolation:isolate}
.ks{position:absolute;left:0;right:0;top:420px;text-align:center}.ks small{display:block;font:700 26px GM,monospace;letter-spacing:.3em;color:#8B8E95;margin-bottom:18px}
.ks .kx{display:inline-block;font:800 124px GM,monospace;color:#F2EEE6;letter-spacing:-.02em}.ks .kx b{display:inline-block}
.tf{position:absolute;left:${W / 2 - 190}px;top:175px;width:380px;height:760px;border-radius:56px;background:#F7F7F9;box-shadow:0 0 0 11px #111,0 0 0 13px #3a3a3e,0 50px 70px -30px rgba(40,25,10,.6);overflow:hidden;transform-origin:50% 0}
.tb{display:flex;justify-content:space-between;padding:20px 34px 6px;font:700 19px Geist;color:#111}
.sc{position:absolute;left:0;right:0;top:56px;bottom:0;padding:14px 20px}.sc h4{font:800 36px Geist;margin:8px 6px 18px;color:#111;letter-spacing:-.02em}
.rw{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:18px;padding:22px 20px;margin-bottom:12px;font:700 24px Geist;color:#151515;box-shadow:0 1px 0 rgba(0,0,0,.06),0 8px 18px -12px rgba(0,0,0,.3)}
.rw i{font-style:normal;color:#aaa;font-size:30px}.rw.kr{color:#E8402F}.rw.sec{background:#151515;color:#fff}
.sc.ok{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px}.sc.ok b{font:800 32px Geist;color:#111;padding:0 20px}.sc.ok small{font:600 22px Geist;color:#666}
.rp{position:absolute;width:90px;height:90px;margin:-45px 0 0 -45px;border-radius:50%;border:4px solid #E8402F;opacity:0}
.im{position:absolute;left:0;top:0;width:76px;height:76px;filter:drop-shadow(0 10px 8px rgba(0,0,0,.3))}
.not.tn{top:96px;font-size:70px}
.rm{position:absolute;transform-origin:50% 50%}.rm img{position:absolute;inset:0;width:100%;height:100%;visibility:hidden}
.cz{position:absolute;left:0;top:0;overflow:visible}.cz path{fill:none;stroke:#E8402F;stroke-width:9;stroke-linecap:round;stroke-linejoin:round}
.vb[data-koyu="1"] .cz path{stroke:#F6B92B}
#sub{position:absolute;left:${L.sub[0]}px;top:${L.sub[1]}px;width:${L.sub[2]}px;text-align:center;white-space:normal;z-index:8}
#sub span{display:inline-block;margin:0 6px;padding:2px 4px 6px;font-family:Arc,sans-serif;font-weight:900;font-stretch:72%;font-size:64px;line-height:1.05;letter-spacing:.01em;color:#151515;border-radius:12px;transform-origin:50% 60%;
  text-shadow:0 2px 0 #fff,0 -2px 0 #fff,2px 0 0 #fff,-2px 0 0 #fff}
#sub span.on{background:#E8402F;color:#fff;text-shadow:none;padding:2px 18px 6px}
body.k #sub span{color:#F2EEE6;text-shadow:none}body.k #sub span.on{background:#E8402F;color:#fff}
</style></head><body>
<svg width="0" height="0" style="position:absolute"><filter id="kg"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .48  0 0 0 0 .38  0 0 0 .22 0"/></filter></svg>
<div id="zemin"></div><div id="doku"></div><div id="koyu"></div><div id="vin"></div>
<div id="cam">${html}</div><div id="sub"></div><canvas id="gren" width="${W >> 1}" height="${H >> 1}"></canvas>
<script>${fs.readFileSync(path.join(__dirname, 'hareket.js'), 'utf8')}</script>
<script>${fs.readFileSync(path.join(__dirname, 'cizimler.js'), 'utf8')}</script>
<script>
const TL = ${JSON.stringify({ vurus: V, kelimeler: tl.kelimeler, parcalar: tl.parcalar, duration: tl.duration })};
const W = ${W}, H = ${H};
const cl = (v,a,b) => Math.max(a, Math.min(b, v));
const eo = k => 1 - Math.pow(1 - cl(k,0,1), 3), ei = k => Math.pow(cl(k,0,1), 3);
const backOut = k => { const c1 = 1.70158, c3 = c1 + 1; k = cl(k,0,1); return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const nz = (t, s) => Math.sin(t * 1.13 + s) * .6 + Math.sin(t * .71 + s * 2.3) * .4;
// sabit tohumlu titrek kalem çizgisi
const sr = s => () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
function daire(cx, cy, rx, ry, sd){ const r = sr(sd); let d = ''; for (let a = 0; a <= 1.12; a += .02) { const an = -2.2 + a * Math.PI * 2, j = 1 + (r() - .5) * .05; d += (a ? ' L' : 'M') + (cx + Math.cos(an) * rx * j).toFixed(1) + ' ' + (cy + Math.sin(an) * ry * j).toFixed(1); } return d; }
function alt(x0, x1, y, sd){ const r = sr(sd); let d = 'M' + x0 + ' ' + y; for (let x = x0; x <= x1; x += 24) d += ' L' + x + ' ' + (y + (r() - .5) * 7 + Math.sin(x / 60) * 3).toFixed(1); return d; }
function ok(x, y0, y1){ return 'M'+x+' '+y0+' C'+(x-40)+' '+((y0+y1)/2)+' '+(x+40)+' '+((y0+y1)/2)+' '+x+' '+y1+' M'+(x-26)+' '+(y1-30)+' L'+x+' '+y1+' L'+(x+26)+' '+(y1-30); }
function hazirla(){
// dev yazıyı genişliğe sığdır
document.querySelectorAll('.sat').forEach(s => { let fs = 210; s.style.fontSize = fs + 'px'; while (s.scrollWidth > W - 70 && fs > 60) { fs -= 4; s.style.fontSize = fs + 'px'; } });
document.querySelectorAll('.not span').forEach(sp => { let fs = parseFloat(getComputedStyle(sp.parentNode).fontSize); while (sp.getBoundingClientRect().width > W - 60 && fs > 40) { fs -= 3; sp.parentNode.style.fontSize = fs + 'px'; } });
document.querySelectorAll('.dev').forEach(d => { const h = d.getBoundingClientRect().height; d.style.top = Math.max(110, 330 - h / 2) + 'px'; });
// çizgileri hazırla (yerleşim ölçüldükten sonra)
TL.vurus.forEach((b, i) => {
  const p = document.querySelector('#cz' + i + ' path'); let d = '';
  const ik = document.getElementById('ik' + i), nt = document.getElementById('nt' + i), dv = document.getElementById('dv' + i), ui = document.getElementById('ui' + i);
  if (b.cizgi === 'daire' && ui) { const r = ui.querySelector('.tg').getBoundingClientRect(); d = daire(r.left + r.width/2, r.top + r.height/2, r.width*.85, r.height*1.05, i*7+3); }
  else if (b.cizgi === 'daire' && ik) { const r = ik.getBoundingClientRect(); d = daire(r.left + r.width/2, r.top + r.height/2, 150, 135, i*7+3); }
  else if (b.cizgi === 'alt' && nt) { const r = nt.querySelector('span').getBoundingClientRect(); d = alt(r.left, r.right, r.bottom + 6, i*5+1); }
  else if (b.cizgi === 'ok' && nt) { const r = nt.querySelector('span').getBoundingClientRect(), yb = document.getElementById('yr' + (i-1)); const y1 = yb ? yb.getBoundingClientRect().top - 18 : r.bottom + 150; d = ok(W/2 + 150, r.bottom + 10, y1); }
  else if (dv && b.carpi) { const c = [...dv.querySelectorAll('.h.c')]; if (c.length) { const a = c[0].getBoundingClientRect(), z = c[c.length-1].getBoundingClientRect(), cx = (a.left + z.right) / 2, cy = (a.top + a.bottom) / 2, rx = (z.right - a.left) / 2 + 14, ry = (a.bottom - a.top) / 2; d = 'M' + (cx - rx) + ' ' + (cy - ry) + ' L' + (cx + rx) + ' ' + (cy + ry) + ' M' + (cx + rx) + ' ' + (cy - ry) + ' L' + (cx - rx) + ' ' + (cy + ry); } }
  else if (dv && b.vurgu) { const v = [...dv.querySelectorAll('.h.v')]; if (v.length) { const a = v[0].getBoundingClientRect(), z = v[v.length-2 >= 0 ? v.length-2 : 0].getBoundingClientRect(); d = alt(a.left, z.right, a.bottom - 6, i*3+2); } }
  p.setAttribute('d', d); p.dataset.L = d ? p.getTotalLength() : 0; p.style.strokeDasharray = p.dataset.L; p.style.strokeDashoffset = p.dataset.L;
});
if (TL.vurus.some(b => b.ikon && b.tip === 'not')) TL.vurus.forEach((b, i) => { if (b.tip === 'not' && b.ikon) { const ik = document.getElementById('ik' + i); ik.style.top = '200px'; } });
// yorum kutusu sonraki nota yer açsın: not üstte, ok kutuya iner
TL.vurus.forEach((b, i) => { const pv = TL.vurus[i-1]; if (b.tip === 'not' && pv && pv.tip === 'yorum') { const nt = document.getElementById('nt' + i); nt.style.top = '250px'; const ik = document.getElementById('ik'+i); if (ik) { ik.style.top = '60px'; ik.style.transform = 'scale(.7)'; } } });
}
let _hz = false;
const G = document.getElementById('gren'), gx = G.getContext('2d'), GI = gx.createImageData(G.width, G.height);
function gren(f){ let s = (f * 2654435761) >>> 0; const d = GI.data; for (let i = 0; i < d.length; i += 4) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; const v = 96 + (s >>> 24) * .25; d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255; } gx.putImageData(GI, 0, 0); }
const N = TL.vurus.length;
const bitis = i => { const b = TL.vurus[i]; if (b.tip === 'yorum') return TL.duration + 9; return i + 1 < N ? TL.vurus[i+1].t : TL.duration + 9; };
function harfler(el, lt, out){
  [...el.querySelectorAll('.h')].forEach((h, j) => {
    const k = (lt - j * .022) / .34;
    let y = 160, sx = .8, sy = 1.3, op = 0;
    if (k >= 0) { op = cl(k * 4, 0, 1);
      if (k < .55) { const q = eo(k / .55); y = 160 - 172 * q; sy = 1.3 - .3 * q; sx = .82 + .18 * q; }
      else if (k < .8) { const q = (k - .55) / .25; y = -12 + 12 * eo(q); sy = 1 - .14 * Math.sin(q * Math.PI); sx = 1 + .1 * Math.sin(q * Math.PI); }
      else { y = 0; sy = 1; sx = 1; } }
    let bl = 0;
    if (out >= 0) { const q = ei((out - (el.querySelectorAll('.h').length - j) * .006) / .18); y -= 300 * q; sy *= 1 + .9 * q; sx *= 1 - .18 * q; op *= 1 - q; bl = 7 * q; }
    h.style.opacity = op; h.style.transform = 'translateY(' + y + 'px) scale(' + sx + ',' + sy + ')'; h.style.filter = bl > .3 ? 'blur(' + bl.toFixed(1) + 'px)' : 'none';
  });
}
function cizgi(i, lt, gec){ const p = document.querySelector('#cz' + i + ' path'), Ln = +p.dataset.L; if (!Ln) return; const k = eo((lt - gec) / .42); p.style.strokeDashoffset = Ln * (1 - k); }
function kontrol(t){
  const out = [], sub = document.getElementById('sub'), S = sub.children.length ? sub.getBoundingClientRect() : null;
  document.querySelectorAll('.vb').forEach(vb => { if (+vb.style.opacity < .6) return; vb.querySelectorAll('.ik,.not span,.etk,.ui,.yr,.sat,.tf,.gz,.kx,.rm').forEach(e => { const st = getComputedStyle(e); if (+st.opacity < .6) return;
    const r = e.getBoundingClientRect(); if (r.width < 2) return; const nt = e.closest('.not'); if (nt && +getComputedStyle(nt).opacity < .9) return; const dusen = /ik|etk|rm/.test(e.className); if ((!/rm/.test(e.className) && (r.left < -4 || r.right > W + 4)) || (!dusen && r.top < -4)) out.push('taşma: ' + (e.className || e.tagName));
    if (S && r.left < S.right && S.left < r.right && r.top < S.bottom - 6 && S.top < r.bottom - 6) out.push('altyazı çakışması: ' + e.className); }); });
  return out;
}
function frame(t){
  if (!_hz) { _hz = true; hazirla(); }
  let koyu = false, shake = 0;
  TL.vurus.forEach((b, i) => {
    const vb = document.getElementById('vb' + i), lt = t - b.t, e = bitis(i), out = t - e + .04;
    const on = lt >= 0 && out < .3; vb.style.opacity = on ? 1 : 0; const czg = document.getElementById('cz' + i); czg.style.opacity = out >= 0 ? 1 - ei(out / .15) : 1; vb.style.display = on ? 'block' : 'none'; if (!on) return;
    if (lt >= 0 && t < e) koyu = !!b.koyu;
    const dv = document.getElementById('dv' + i); if (dv) harfler(dv, lt, b.tip === 'yorum' ? t - (i + 1 < N ? TL.vurus[i+1].t : 99) + .04 : out);
    if (lt >= .16 && lt < .4 && b.tip === 'dev') shake = Math.max(shake, 1 - (lt - .16) / .24);
    const ik = document.getElementById('ik' + i);
    if (ik) { const k = (lt - .18) / .52; let y = -620, sx = 1, sy = 1, r = 0, op = 0;
      if (k >= 0) { op = 1; if (k < .55) { const q = k / .55; y = -620 * (1 - q * q); sy = 1 + .22 * q; sx = 1 - .12 * q; r = -10 * (1 - q); }
        else if (k < .75) { const q = (k - .55) / .2; y = 0; sy = 1 - .26 * Math.sin(q * Math.PI); sx = 1 + .2 * Math.sin(q * Math.PI); }
        else if (k < 1) { const q = (k - .75) / .25; y = -46 * Math.sin(q * Math.PI); r = 5 * Math.sin(q * Math.PI); }
        else { const fl = Math.sin((lt - .7) * 3.2 + i); y = fl * 6; r = fl * 3; } }
      if (out >= 0) { const q = ei(out / .2); y += 340 * q; op *= 1 - q; }
      ik.style.opacity = op; ik.style.transform = (ik.style.transform.includes('scale(.7)') ? 'scale(.7) ' : '') + 'translateY(' + y + 'px) rotate(' + r + 'deg) scale(' + sx + ',' + sy + ')'; }
    const nt = document.getElementById('nt' + i);
    if (nt) { const sp = nt.querySelector('span'), dur = Math.min(.9, (b.yazi || b.not).length * .035), k = eo(lt / dur);
      sp.style.clipPath = 'inset(-20% ' + ((1 - k) * 100) + '% -20% -5%)'; sp.style.transform = 'rotate(-3deg) translateY(' + (Math.sin(lt * 2.4) * 3) + 'px)';
      const q = out >= 0 ? ei(out / .2) : 0; nt.style.opacity = 1 - q; nt.style.transform = 'translateX(' + (-260 * q) + 'px)'; }
    b.etiketler && b.etiketler.forEach((x, j) => { const el = document.getElementById('et' + i + '_' + j), st = b.altT[j] ?? b.t + .2 * j, l = t - st;
      const fx = j ? 470 : 250, fy = 660, w = el.offsetWidth, hh = el.offsetHeight; let y = -900, r = j ? 10 : -9, sy = 1, op = 0;
      if (l >= 0) { op = 1; if (l < .42) { const q = l / .42; y = -900 + 900 * q * q; r *= (1 - q) * 3 + 1; }
        else if (l < .62) { const q = (l - .42) / .2; y = -70 * Math.sin(q * Math.PI); sy = q < .15 ? .75 : 1; }
        else if (l < .74) { const q = (l - .62) / .12; y = -18 * Math.sin(q * Math.PI); } else y = 0; }
      if (out >= 0) { const q = ei(out / .2); y += 500 * q; op *= 1 - q; }
      el.style.opacity = op; el.style.transform = 'translate(' + (fx - w/2) + 'px,' + (fy - hh + y) + 'px) rotate(' + r + 'deg) scaleY(' + sy + ')'; });
    const ui = document.getElementById('ui' + i);
    if (ui) { const k = backOut(lt / .3), q = out >= 0 ? ei(out / .2) : 0; ui.style.opacity = cl(lt / .1, 0, 1) * (1 - q); ui.style.transform = 'translateY(' + ((1 - k) * 260 - 300 * q) + 'px) rotate(' + ((1 - k) * -6) + 'deg)';
      const a = b.acT != null ? cl((t - b.acT) / .22, 0, 1) : 0, ae = eo(a); const tg = ui.querySelector('.tg'); tg.style.background = a > .5 ? '#1E9E6A' : '#cfc8bc'; tg.querySelector('i').style.transform = 'translateX(' + (42 * ae) + 'px) scaleX(' + (1 + .25 * Math.sin(a * Math.PI)) + ')';
      CZ.anim(ui.querySelector('.lk .cz-il'), lt, { kapan: b.acT != null ? b.acT - b.t : 99 });
      if (b.acT != null) cizgi(i, t - b.acT, .1); }
    const rm = document.getElementById('rm' + i);
    if (rm) { const ims = rm.children, q = Math.min(ims.length - 1, Math.max(0, Math.floor(lt * 30))); for (let j = 0; j < ims.length; j++) ims[j].style.visibility = j === q ? 'visible' : 'hidden';
      const k = backOut(lt / .3), o = out >= 0 ? ei(out / .2) : 0; rm.style.opacity = cl(lt / .06, 0, 1) * (1 - o); rm.style.transform = 'translateY(' + ((1 - k) * 120 - 200 * o) + 'px) scale(' + (.9 + .1 * k + .15 * o) + ')'; }
    vb.querySelectorAll('.cz-il').forEach(c => { if (c.closest('.lk')) return; const ik = c.closest('.ik'); CZ.anim(c, ik ? lt - .55 : c.closest('.sc') ? t - (b.ekranT || []).at(-1) : lt); });
    const gz = document.getElementById('gz' + i);
    if (gz) { const k = backOut(lt / .32), q = out >= 0 ? ei(out / .2) : 0; gz.style.opacity = cl(lt / .08, 0, 1) * (1 - q); gz.style.transform = 'translateY(' + ((1 - k) * 220 - 260 * q) + 'px) rotate(' + ((1 - k) * 5 - 2) + 'deg)';
      [...gz.querySelectorAll('.gr')].forEach((r, j) => { const st = (b.altT || [])[j] ?? b.t + .1 * j, kk = cl((t - st) / .22, 0, 1); r.style.opacity = kk; r.style.transform = 'translateX(' + ((1 - backOut(kk)) * -60) + 'px)'; });
      const hl = gz.querySelector('.hlr .hl'); if (hl && b.hlT != null) hl.style.transform = 'scaleX(' + eo((t - b.hlT) / .35) + ')'; }
    const ks = document.getElementById('ks' + i);
    if (ks) { const sd = window.H.tohum(i * 13 + 5), AB = 'ABCDEFGHIJKLMNOPRSTUVYZ#%&?'; const q = out >= 0 ? ei(out / .2) : 0; ks.style.opacity = cl(lt / .06, 0, 1) * (1 - q); ks.style.transform = 'scale(' + (1 + .25 * q) + ')';
      [...ks.querySelectorAll('.kx b')].forEach((c, j) => { const yer = .12 + j * .07; if (lt < yer) { const r = window.H.tohum(Math.floor(lt * 30) * 31 + j * 7)(); c.textContent = AB[Math.floor(r * AB.length)]; c.style.color = '#8B8E95'; c.style.transform = 'translateY(' + ((r - .5) * 20) + 'px)'; } else { c.textContent = c.dataset.c; c.style.color = c.dataset.c === '?' ? '#E8402F' : '#F2EEE6'; const kk = cl((lt - yer) / .2, 0, 1); c.style.transform = 'translateY(' + (-14 * Math.sin(kk * Math.PI)) + 'px) scale(' + (1 + .15 * Math.sin(kk * Math.PI)) + ')'; } }); }
    const tf = document.getElementById('tf' + i);
    if (tf) { const k = backOut(lt / .36), q = out >= 0 ? ei(out / .22) : 0; tf.style.opacity = cl(lt / .08, 0, 1) * (1 - q); tf.style.transform = 'translateY(' + ((1 - k) * 700 + 400 * q) + 'px) scale(.86) rotate(' + ((1 - k) * 8) + 'deg)';
      const E = b.ekranlar, ET = b.ekranT; let cur = 0; ET.forEach((tt, j) => { if (t >= tt) cur = j; });
      const scs = [...tf.querySelectorAll('.sc')]; scs.forEach((sc, j) => { const st = ET[j], kk = j === 0 ? 1 : eo((t - st) / .28); const on = j === cur, prev = j === cur - 1 && t - ET[cur] < .28;
        sc.style.opacity = on || prev ? 1 : 0; sc.style.transform = on ? 'translateX(' + ((1 - kk) * 380) + 'px)' : prev ? 'translateX(' + (-120 * eo((t - ET[cur]) / .28)) + 'px)' : 'none';
        if (E[j].basarili && on) { const ck = sc.querySelector('.ck'); const a = cl((t - st - .1) / .35, 0, 1); ck.style.transform = 'scale(' + (a > 0 ? backOut(a) : 0) + ')'; } });
      // imleç: hedef satıra kay, dokun (bir sonraki ekranı ateşler)
      const im = tf.querySelector('.im'), rp = tf.querySelector('.rp'); let px = 300, py = 640, bas = 0, rk = -1;
      for (let j = 0; j < E.length - 1; j++) { const hd = scs[j].querySelectorAll('.rw')[E[j].hedef]; if (!hd) continue; const tap = ET[j + 1] - .22, gx = 290, gy = 56 + 14 + hd.offsetTop + hd.offsetHeight / 2;
        if (t >= ET[j] && t < ET[j + 1]) { const m = eo((t - Math.max(ET[j], tap - .5)) / .45); px = 300 + (gx - 300) * m; py = 640 + (gy - 640) * m; if (t > tap) { bas = Math.sin(cl((t - tap) / .16, 0, 1) * Math.PI); rk = (t - tap) / .4; hd.classList.add('sec'); } else hd.classList.remove('sec'); } }
      if (E.at(-1).basarili && t >= ET.at(-1)) { px = 300; py = 900; }
      im.style.transform = 'translate(' + (px - 20) + 'px,' + (py - 8) + 'px) scale(' + (1 - .15 * bas) + ')'; rp.style.left = px + 'px'; rp.style.top = py + 'px'; rp.style.opacity = rk >= 0 && rk < 1 ? 1 - rk : 0; rp.style.transform = 'scale(' + (.3 + Math.max(0, rk) * 1.2) + ')'; }
    const yr = document.getElementById('yr' + i);
    if (yr) { const k = backOut((lt - .15) / .3); yr.style.opacity = cl((lt - .15) / .1, 0, 1); yr.style.transform = 'translateY(' + ((1 - k) * 240) + 'px)';
      const st = b.yazT ?? b.t + .3, hz = Math.max(10, b.yaz.length / 1.0), n = Math.floor(cl((t - st) * hz, 0, b.yaz.length)); yr.querySelector('.yz').textContent = b.yaz.slice(0, n);
      yr.querySelector('.cr').style.opacity = Math.floor(t * 3) % 2 ? 1 : .2;
      const gn = yr.querySelector('.gn'), p = t - (st + b.yaz.length / hz + .25); gn.style.transform = p > 0 && p < .15 ? 'scale(.88)' : 'scale(1)'; }
    if (b.tip !== 'ui') cizgi(i, lt, b.carpiT != null ? b.carpiT - b.t : b.tip === 'not' ? Math.min(.9, (b.yazi || '').length * .035) : b.tip === 'telefon' ? 9 : .45);
  });
  // açık↔koyu: renk taşması (prompt-motion: "a black shape floods the whole frame and contracts into the next scene")
  const KY = document.getElementById('koyu'); let kd = null;
  TL.vurus.forEach((b, i) => { const pv = TL.vurus[i - 1]; if (b.koyu && !(pv && pv.koyu)) { let j = i; while (j + 1 < N && TL.vurus[j + 1].koyu) j++; kd = kd && t < kd.t0 ? kd : { t0: b.t - .08, kapan: j + 1 < N ? TL.vurus[j + 1].t - .12 : null }; } });
  if (kd) window.H.tasma(KY, t, { t0: kd.t0, kapan: kd.kapan, ac: .3, x: 360, y: 330, W, H: ${H}, x2: 360, y2: 600 }); else KY.style.display = 'none';
  document.body.classList.toggle('k', !!(kd && t >= kd.t0 + .12 && (kd.kapan == null || t < kd.kapan + .15)));
  // altyazı: v3 ile aynı stil
  const Wd = TL.kelimeler, sub = document.getElementById('sub'), P = TL.parcalar.find(p => t >= p.t0 && t < p.t1);
  if (!P) { sub.innerHTML = ''; sub.dataset.p = ''; }
  else { if (sub.dataset.p !== String(P.i0)) { sub.dataset.p = P.i0; sub.innerHTML = Wd.slice(P.i0, P.i1 + 1).map(k => '<span>' + k.w.replace(/[,.!?;:"“”()…]/g,'').toLocaleUpperCase('tr') + '</span>').join(''); }
    const kk = cl((t - P.t0) / .12, 0, 1); sub.style.opacity = kk; sub.style.transform = 'translateY(' + ((1 - kk) * 14) + 'px)';
    let aw = -1; for (let i = P.i0; i <= P.i1; i++) if (t >= Wd[i].t0 - .02) aw = i;
    [...sub.children].forEach((sp, j) => { const i = P.i0 + j, on = i === aw; sp.classList.toggle('on', on); const d = t - Wd[i].t0; sp.style.transform = on ? 'rotate(-2deg) scale(' + (1 + .07 * Math.exp(-d * 7) * Math.cos(d * 18) + .03) + ')' : 'none'; }); }
  // kamera: sürekli sürüklenme + her vuruşta küçük itme + çarpmada sarsıntı
  const cb = TL.vurus.reduce((a, b) => b.t <= t ? b : a, null), dd = cb ? t - cb.t : 9;
  const zs = 1.02 + .03 * cl(dd / 1.6, 0, 1) + (dd < .2 ? .03 * (1 - dd / .2) : 0);
  const sx = Math.sin(t * 83) * 7 * shake, sy = Math.cos(t * 71) * 7 * shake;
  document.getElementById('cam').style.transform = 'translate(' + (nz(t * .9, 1) * 9 + sx) + 'px,' + (nz(t * .8, 3) * 7 + sy) + 'px) scale(' + zs + ') rotate(' + (nz(t * .5, 7) * .6) + 'deg)';
  document.getElementById('doku').style.transform = 'translate(' + (nz(t * .4, 2) * 10) + 'px,0)';
  gren(Math.round(t * 30));
}
</script></body></html>`;
}
module.exports = { sayfa };

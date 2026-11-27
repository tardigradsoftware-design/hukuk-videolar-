// SAHNE DİLİ 2 — "Pastel Brutal sistem şeması" (prompt-motion: 0xnfrith / Celld'den uyarlama, kopya değil)
// Dil: tek, kesintisiz bir sistem diyagramı. Aynı kartlar (SEN, BANKA, SİGORTA, ŞUBE) sahne boyunca yerinde kalır,
// durum değiştirir: damga, kural notu, kesik çizgi yol, sayaç çubukları. Sol üstte adım hapı + büyük harf başlık daktiloyla değişir.
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const STAR = (c, n) => `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="${n === 1 ? 'M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39Z' : 'M50 0 L58 30 L88 14 L70 42 L100 50 L70 58 L88 86 L58 70 L50 100 L42 70 L12 86 L30 58 L0 50 L30 42 L12 14 L42 30Z'}" fill="${c}" stroke="#151515" stroke-width="4" stroke-linejoin="round"/></svg>`;

const css = `
.c2{background:#FBF6EA}
.c2 .pil{position:absolute;left:70px;top:60px;padding:6px 16px;border-radius:999px;background:#151515;color:#F7D14C;font:800 18px GM;letter-spacing:.16em}
.c2 .bas{position:absolute;left:70px;top:100px;font:900 64px Arc;font-stretch:92%;letter-spacing:-.02em;color:#151515;text-transform:uppercase;white-space:nowrap}
.c2 .bas i{display:inline-block;width:6px;height:.8em;background:#151515;margin-left:6px;vertical-align:-.05em}
.c2 .kt{position:absolute;border:4px solid #151515;border-radius:10px;box-shadow:8px 8px 0 #151515;color:#151515}
.c2 .kt .eti{position:absolute;left:14px;top:-16px;padding:3px 12px;background:#151515;color:#fff;font:800 15px GM;letter-spacing:.14em;border-radius:6px;white-space:nowrap}
.c2 .kt h3{margin:0;font:900 72px Arc;font-stretch:90%;letter-spacing:-.03em;line-height:1}
.c2 .kt .ln{height:9px;background:#151515;border-radius:5px;opacity:.85;margin-top:10px}
.c2 .tab{display:inline-block;margin:0 10px 0 0;padding:8px 18px;border:3px solid #151515;border-radius:999px;font:800 26px Arc;font-stretch:90%;background:#fff;box-shadow:3px 3px 0 #151515}
.c2 .sat{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding:12px 16px;border:3px solid #151515;border-radius:8px;background:#fff;font:700 26px G}
.c2 .sat b{font:800 22px GM}
.c2 .dm{position:absolute;padding:8px 22px;border:5px solid #151515;border-radius:10px;font:900 46px Arc;font-stretch:88%;letter-spacing:-.01em;white-space:nowrap;box-shadow:5px 5px 0 #151515}
.c2 .not{position:absolute;padding:18px 24px 20px;background:#fff;border:3px solid #151515;border-radius:8px;box-shadow:6px 6px 0 #151515;font:700 30px/1.25 G;color:#151515;width:540px}
.c2 .not .k{display:inline-block;padding:2px 10px;border-radius:6px;background:#151515;color:#fff;font:800 15px GM;letter-spacing:.16em;margin-bottom:10px}
.c2 .hl{background:linear-gradient(90deg,#F7D14C var(--p,0%),transparent var(--p,0%));padding:0 .1em}
.c2 .tar{background:repeating-linear-gradient(-45deg,#151515 0 7px,transparent 7px 15px)}
.c2 svg.bag{position:absolute;inset:0;overflow:visible}
.c2 .adm{position:absolute;width:250px;height:110px;padding:12px 14px;border:4px solid #151515;border-radius:10px;box-shadow:6px 6px 0 #151515;font:900 30px/1.05 Arc;font-stretch:90%}
.c2 .adm small{display:block;font:800 15px GM;letter-spacing:.14em;margin-bottom:6px}
.c2 .st{position:absolute}
.c2 .bar{position:absolute;height:60px;border:4px solid #151515;border-radius:8px;background:#fff;overflow:hidden;box-shadow:6px 6px 0 #151515}
.c2 .bar i{position:absolute;top:0;bottom:0;left:0}
.c2 .seg{position:absolute;top:0;bottom:0;border-right:2px solid #151515}
.c2 .say{position:absolute;font:900 120px Arc;font-stretch:88%;letter-spacing:-.03em;color:#151515}
`;

const kart = (r, x, y, w, h, renk, eti, ic) => `<div class="kt" data-r="${r}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${renk};padding:24px 22px"><span class="eti">${esc(eti)}</span>${ic}</div>`;
const ust = s => `<div class="pil" data-r="pil"></div><div class="bas" data-r="bas"></div>
  ${[[1150, 40, '#F7D14C', 1, 90], [1800, 60, '#FF7AC6', 2, 70], [1820, 560, '#A8F08C', 1, 60]].map(([x, y, c, n, b], j) => `<div class="st" data-st="${j}" style="left:${x}px;top:${y}px;width:${b}px;height:${b}px">${STAR(c, n)}</div>`).join('')}
  <div class="tar" style="position:absolute;left:1690px;top:300px;width:110px;height:36px;border:3px solid #151515;border-radius:6px"></div>`;

const mark = {
  c_sistem: s => `${ust(s)}
    <svg class="bag" viewBox="0 0 1920 1080"><path data-r="l1" d="M420 470 L620 470" stroke="#151515" stroke-width="5" fill="none"/><path data-r="l2" d="M1240 470 L1400 470" stroke="#151515" stroke-width="5" fill="none"/>
      <path data-r="l3" d="M290 380 C 520 150, 1300 150, 1520 330" stroke="#151515" stroke-width="5" fill="none" stroke-dasharray="16 12"/>
      <path data-r="l4" d="M1240 600 L1400 690" stroke="#151515" stroke-width="5" fill="none"/></svg>
    <div class="not" data-r="yp" style="left:770px;top:150px;width:auto;padding:8px 18px;font:800 26px G;background:#A8F08C">${esc(s.yolEti)}</div>
    ${kart('sen', 140, 380, 280, 190, '#FF9AD5', 'KULLANICI', '<h3>SEN</h3><div class="ln" style="width:70%"></div><div class="ln" style="width:45%"></div>')}
    ${kart('bk', 620, 300, 620, 360, '#F7D14C', 'BANKA · KREDİ DOSYASI', `<div data-r="tabs">${s.turler.map(([x], j) => `<span class="tab" data-tb="${j}">${esc(x)}</span>`).join('')}</div><div class="sat" data-r="sat"><span>${esc(s.prim)}</span><b>••• TL</b></div><div class="sat" style="opacity:.55"><span>Dosya masrafı</span><b>••• TL</b></div>`)}
    ${kart('sg', 1400, 360, 300, 200, '#BFE3FF', 'SİGORTA ŞİRKETİ', '<h3 style="font-size:58px">POLİÇE</h3><div class="ln" style="width:60%"></div>')}
    ${kart('sb', 1400, 640, 300, 150, '#E4E1DA', 'ŞUBE', '<h3 style="font-size:58px">GİŞE</h3>')}
    <div class="dm" data-r="d1" style="left:700px;top:600px;background:#FF7AC6">${esc(s.damga1)}</div>
    <div class="dm tar" data-r="d2" style="left:1420px;top:690px;background:#fff;font-size:38px"><span style="background:#fff;padding:0 8px">${esc(s.damga2)}</span></div>
    <div class="kt" data-r="para" style="left:0;top:0;width:150px;height:84px;background:#A8F08C;display:flex;align-items:center;justify-content:center;font:900 40px Arc"><span class="eti">İADE</span>₺ •••</div>
    <div class="not" data-r="not" style="left:140px;top:640px"><span class="k">KURAL</span><br>${esc(s.kural[0])} <span class="hl" data-r="hl">${esc(s.kural[1])}</span></div>
    ${s.adimlar.map((a, j) => `<div class="adm" data-ad="${j}" style="left:${140 + j * 280}px;top:720px;background:${['#FF9AD5', '#BFE3FF', '#F7D14C', '#FFB3A7', '#A8F08C'][j]}"><small>ADIM ${j + 1}</small>${esc(a)}</div>`).join('')}
    <div class="kt" data-r="sahte" style="left:0;top:0;width:340px;height:110px;background:#fff;display:flex;align-items:center;justify-content:center;font:900 40px Arc;font-stretch:88%;color:#E8402F"><span class="eti" style="background:#E8402F">BANKA DİYOR Kİ</span>${esc(s.sahte)}</div>
    <div class="dm" data-r="d3" style="left:0;top:0;background:#E8402F;color:#fff;font-size:70px">${esc(s.blof)}</div>`,
  c_zaman: s => `${ust(s)}
    ${kart('a', 140, 230, 330, 150, '#FF9AD5', 'OLAY A', `<h3 style="font-size:44px">${esc(s.aKart[0])}</h3>`)}
    ${kart('b', 520, 230, 420, 150, '#BFE3FF', 'OLAY B', `<h3 style="font-size:44px">${esc(s.b[0])}</h3>`)}
    <div class="kt" data-r="kutu" style="left:140px;top:440px;width:1380px;height:250px;background:#F7D14C;padding:30px 30px"><span class="eti">CAYMA SÜRESİ · 30 GÜN</span>
      <div class="bar" style="left:30px;top:50px;width:1310px"><i data-r="dol" style="background:#151515"></i>${Array.from({ length: 29 }, (_, j) => `<span class="seg" style="left:${(j + 1) / 30 * 100}%"></span>`).join('')}</div>
      <div data-r="gun" style="position:absolute;left:30px;top:130px;font:900 64px Arc;font-stretch:88%">0 / 30 GÜN</div>
      <div class="kt" data-r="c" style="left:700px;top:124px;width:520px;height:90px;background:#A8F08C;padding:18px 20px;font:900 40px Arc;font-stretch:88%;white-space:nowrap"><span class="eti">OLAY C</span>${esc(s.c[0])}</div></div>
    <div class="dm" data-r="d1" style="left:1060px;top:240px;background:#A8F08C">${esc(s.damga)}</div>
    <div class="kt" data-r="iade" style="left:140px;top:440px;width:1380px;height:250px;background:#fff;padding:30px"><span class="eti">PRİM İADESİ</span>
      <div class="bar" style="left:30px;top:50px;width:1000px"><i data-r="id" style="background:#A8F08C"></i></div><div class="say" data-r="ys" style="left:1070px;top:30px">%0</div>
      <div data-r="ia" style="position:absolute;left:30px;top:140px;font:800 34px G">${esc(s.iade)}</div></div>
    <div class="kt" data-r="vade" style="left:140px;top:440px;width:1380px;height:250px;background:#fff;padding:30px"><span class="eti">POLİÇE SÜRESİ</span>
      <div class="bar" style="left:30px;top:50px;width:1310px"><i data-r="ku" style="background:#C9C4BA"></i><i data-r="ka" style="background:#A8F08C"></i></div>
      <div data-r="kut" style="position:absolute;left:30px;top:140px;font:800 30px GM">KULLANILAN</div><div data-r="kat" style="position:absolute;right:40px;top:140px;font:900 44px Arc;font-stretch:88%">${esc(s.kalan)}</div></div>
    <div class="dm" data-r="d2" style="left:1180px;top:380px;background:#FFB3A7">${esc(s.gecti)}</div>`,
};

const rt = `
function c2Ust(el, s, t) { let cur = s.basliklar[0]; s.basliklar.forEach(b => { if (t >= T(b[0])) cur = b; }); const ct = T(cur[0]);
  const be = q(el, '[data-r=bas]'), n = Math.floor(cl((t - ct) / .45, 0, 1) * cur[2].length); be.innerHTML = cur[2].slice(0, Math.max(1, n)).replace(/&/g, '&amp;').replace(/</g, '&lt;') + (Math.floor(t * 3) % 2 || n < cur[2].length ? '<i></i>' : '');
  const pe = q(el, '[data-r=pil]'); pe.textContent = cur[1]; const pk = bo(cl((t - ct) / .3, 0, 1)); pe.style.transform = 'scale(' + (.5 + .5 * pk) + ')';
  qa(el, '[data-st]').forEach((e, j) => { e.style.transform = 'rotate(' + (t * (j % 2 ? -40 : 30) + (t - ct < .4 ? 180 * (1 - eo((t - ct) / .4)) : 0)) + 'deg) scale(' + (1 + .1 * Math.sin(t * 3 + j)) + ')'; }); }
const dmg = (e, t0, t, rot) => { if (t < t0) { e.style.opacity = 0; return; } const k = eo(cl((t - t0) / .2, 0, 1)); e.style.opacity = 1; e.style.transform = 'rotate(' + (rot || -7) + 'deg) scale(' + (1 + 1.6 * Math.pow(1 - k, 2)) + ')'; };
const sars = (t, ts) => ts.reduce((a, x) => { const d = t - x; return d > 0 && d < .35 ? a + Math.sin(d * 80) * 9 * (1 - d / .35) : a; }, 0);
Object.assign(D, {
  c_sistem(s, lt, o, t) { const el = s.el; c2Ust(el, s, t);
    const sh = sars(t, [T(s.dusK), T(s.damga1K), T(s.damga2K), T(s.blofK)]); el.style.translate = sh + 'px 0';
    gir(q(el, '[data-r=sen]'), s.t + .05, t, 'd'); gir(q(el, '[data-r=bk]'), s.t + .2, t, 'd'); gir(q(el, '[data-r=sg]'), T(s.sgK), t, 'd');
    s.turler.forEach(([x, a], j) => gir(q(el, '[data-tb="' + j + '"]'), T(a), t, 's'));
    const sat = q(el, '[data-r=sat]'), dk = T(s.dusK), k = cl((t - dk) / .45, 0, 1); sat.style.opacity = t < dk ? 0 : 1; sat.style.transform = 'translateY(' + (-260 * (1 - bo(k))) + 'px) rotate(' + ((1 - k) * -8) + 'deg)';
    sat.style.background = t > T(s.parlaK) ? (Math.floor(t * 4) % 2 ? '#FF9AD5' : '#fff') : '#fff'; if (t > T(s.damga1K)) sat.style.background = '#FF9AD5';
    dmg(q(el, '[data-r=d1]'), T(s.damga1K), t, -6);
    const L = (r, a) => { const p = q(el, '[data-r=' + r + ']'), Lt = p.getTotalLength(); p.style.strokeDasharray = r === 'l3' ? '16 12' : Lt; if (r !== 'l3') p.style.strokeDashoffset = Lt * (1 - eo(cl((t - a) / .4, 0, 1))); else { p.style.opacity = t > a ? 1 : 0; p.style.strokeDashoffset = -t * 50; p.style.clipPath = 'inset(0 ' + (100 - eo(cl((t - a) / .6, 0, 1)) * 100) + '% 0 0)'; } };
    L('l1', s.t + .3); L('l2', T(s.sgK)); L('l3', T(s.yolK)); L('l4', T(s.sbK));
    gir(q(el, '[data-r=sb]'), T(s.sbK), t, 'x'); const sb = q(el, '[data-r=sb]'); const sbk = cl((t - T(s.adimK)) / .3, 0, 1); q(el, '[data-r=d2]').style.visibility = sbk > 0 ? 'hidden' : 'visible'; q(el, '[data-r=l4]').style.opacity = 1 - sbk; if (sbk > 0) sb.style.opacity = 1 - sbk; if (t > T(s.damga2K)) sb.style.filter = 'grayscale(1) opacity(.7)'; else sb.style.filter = '';
    dmg(q(el, '[data-r=d2]'), T(s.damga2K), t, 5); gir(q(el, '[data-r=yp]'), T(s.yolK) + .3, t, 's');
    const pa = q(el, '[data-r=para]'), pt = T(s.paraK); if (t < pt) pa.style.opacity = 0; else { const p3 = q(el, '[data-r=l3]'), Lt = p3.getTotalLength(), kk = eio(cl((t - pt) / 1.1, 0, 1)), P = p3.getPointAtLength(Lt * (1 - kk)); pa.style.opacity = 1; pa.style.transform = 'translate(' + (P.x - 75) + 'px,' + (P.y - 42 - 80 * kk) + 'px) rotate(' + (Math.sin(kk * 9) * 6) + 'deg)'; }
    const nt = q(el, '[data-r=not]'); gir(nt, T(s.kuralK), t, 'x'); if (t > T(s.kuralBitK)) { const kk = cl((t - T(s.kuralBitK)) / .3, 0, 1); nt.style.opacity = 1 - kk; nt.style.transform = 'translateX(' + (-200 * ei(kk)) + 'px)'; }
    q(el, '[data-r=hl]').style.setProperty('--p', (eo(cl((t - T(s.hlK)) / .4, 0, 1)) * 100) + '%');
    s.adimlar.forEach((a, j) => { const e = q(el, '[data-ad="' + j + '"]'); gir(e, T(s.adimK) + j * .12, t, 'd'); if (j === 3 && t > T(s.dikkatK)) { const kk = bo(cl((t - T(s.dikkatK)) / .3, 0, 1)); e.style.transform = 'translateY(' + (-40 * kk) + 'px) scale(' + (1 + .12 * kk) + ') rotate(' + (Math.sin(t * 20) * (t < T(s.blofK) + .5 ? 2 : 0)) + 'deg)'; e.style.outline = '5px solid #E8402F'; e.style.outlineOffset = '6px'; } });
    const sa = q(el, '[data-r=sahte]'), st = T(s.sahteK), bt = T(s.blofK); if (t < st) sa.style.opacity = 0; else { const kk = bo(cl((t - st) / .4, 0, 1)), d = t > bt ? t - bt : 0; sa.style.opacity = 1; sa.style.transform = 'translate(' + (930 - 150 * kk) + 'px,' + (340 - 120 * kk + 1400 * d * d) + 'px) rotate(' + (-4 + d * 60) + 'deg)'; }
    const d3 = q(el, '[data-r=d3]'); d3.style.left = '900px'; d3.style.top = '150px'; dmg(d3, bt, t, -10); if (t > bt + .9) d3.style.opacity = Math.max(0, 1 - (t - bt - .9) / .3); },
  c_zaman(s, lt, o, t) { const el = s.el; c2Ust(el, s, t); el.style.translate = sars(t, [T(s.cK), T(s.damgaK), T(s.yuzK), T(s.gectiK)]) + 'px 0';
    gir(q(el, '[data-r=a]'), T(s.aKart[1]), t, 'd'); gir(q(el, '[data-r=b]'), T(s.b[1]), t, 'd');
    const ku = q(el, '[data-r=kutu]'), y0 = T(s.yuzK), v0 = T(s.gectiK); gir(ku, s.t + .2, t, 'y'); if (t > y0) { const kk = cl((t - y0) / .3, 0, 1); ku.style.transform = 'translateX(' + (-2000 * ei(kk)) + 'px)'; }
    const h0 = T(s.dolK), h1 = T(s.dolBitK), dk = cl((t - h0) / (h1 - h0), 0, 1); q(el, '[data-r=dol]').style.width = (dk * 100) + '%'; q(el, '[data-r=gun]').textContent = Math.round(dk * 30) + ' / 30 GÜN';
    const c = q(el, '[data-r=c]'), ct = T(s.cK); if (t < ct) c.style.opacity = 0; else { const kk = bo(cl((t - ct) / .45, 0, 1)); c.style.opacity = 1; c.style.transform = 'translate(' + ((1 - kk) * 900) + 'px,' + ((1 - kk) * -300) + 'px) rotate(' + ((1 - kk) * 20) + 'deg)'; }
    dmg(q(el, '[data-r=d1]'), T(s.damgaK), t, -6); if (t > y0) q(el, '[data-r=d1]').style.opacity = Math.max(0, 1 - (t - y0) / .2);
    const ia = q(el, '[data-r=iade]'); if (t < y0) ia.style.opacity = 0; else { const kk = bo(cl((t - y0) / .4, 0, 1)), ck = cl((t - v0) / .3, 0, 1); ia.style.opacity = 1; ia.style.transform = 'translateX(' + ((1 - kk) * 2000 - 2000 * ei(ck)) + 'px)'; }
    const ip = eo(cl((t - y0 - .3) / 1.1, 0, 1)); q(el, '[data-r=id]').style.width = (ip * 100) + '%'; q(el, '[data-r=ys]').textContent = '%' + Math.round(ip * 100); gir(q(el, '[data-r=ia]'), T(s.iadeK), t, 'y');
    const va = q(el, '[data-r=vade]'); if (t < v0) va.style.opacity = 0; else { const kk = bo(cl((t - v0) / .4, 0, 1)); va.style.opacity = 1; va.style.transform = 'translateX(' + ((1 - kk) * 2000) + 'px)'; }
    const kul = 40 * eio(cl((t - v0 - .4) / .9, 0, 1)); q(el, '[data-r=ku]').style.width = kul + '%'; const ka = q(el, '[data-r=ka]'); ka.style.left = kul + '%'; ka.style.width = ((100 - kul) * eo(cl((t - T(s.kalanK)) / .6, 0, 1))) + '%';
    gir(q(el, '[data-r=kat]'), T(s.kalanK), t, 's'); dmg(q(el, '[data-r=d2]'), v0 + .1, t, 6); },
});`;
module.exports = { css, mark, rt };

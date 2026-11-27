// Hareket kütüphanesi (tarayıcıda çalışır; sayfaya <script> olarak gömülür → window.H).
// Kurallar: kutuphane/HAREKET.md. Her fonksiyon zamanın saf fonksiyonudur (seek-safe); rastgelelik yok, tohumlu.
(function (root) {
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  // --- easing
  const eo = k => 1 - Math.pow(1 - cl(k, 0, 1), 3);                 // yavaşlayarak iniş (giriş)
  const ei = k => Math.pow(cl(k, 0, 1), 3);                         // hızlanarak çıkış
  const expo = k => k >= 1 ? 1 : 1 - Math.pow(2, -10 * cl(k, 0, 1));
  const backOut = (k, s = 1.70158) => { k = cl(k, 0, 1); const c3 = s + 1; return 1 + c3 * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2); };
  // "kalan yolun r'si / kare" üstel yaklaşım (30 fps): her çekim zaten hareketle başlar
  const kalanYol = (t, r = .15, fps = 30) => 1 - Math.pow(1 - r, Math.max(0, t) * fps);
  // --- kapalı formda yay (spring): adım tepkisi; zeta<1 aşma yapar
  function yay(t, { w = 18, z = .55 } = {}) {
    if (t <= 0) return 0; if (z >= 1) return 1 - (1 + w * t) * Math.exp(-w * t);
    const wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + z * w / wd * Math.sin(wd * t));
  }
  // hedefi birçok kez değişen değer: her değişim için bir yay → toplam (saf fonksiyon)
  // degisimler: [{t, deger}] (ilk eleman başlangıç değeri)
  function yaylar(t, degisimler, o) {
    let v = degisimler[0].deger;
    for (let i = 1; i < degisimler.length; i++) v += (degisimler[i].deger - degisimler[i - 1].deger) * yay(t - degisimler[i].t, o);
    return v;
  }
  // --- fizik: yukarıdan düş, çarp (squash), sek, gecikmeli takip
  function dus(lt, { h = 620, sure = .52 } = {}) {
    const k = lt / sure; let y = -h, sx = 1, sy = 1, r = 0, op = 0;
    if (k >= 0) { op = 1;
      if (k < .55) { const q = k / .55; y = -h * (1 - q * q); sy = 1 + .22 * q; sx = 1 - .12 * q; r = -10 * (1 - q); }
      else if (k < .75) { const q = (k - .55) / .2, s = Math.sin(q * Math.PI); y = 0; sy = 1 - .26 * s; sx = 1 + .2 * s; }
      else if (k < 1) { const q = (k - .75) / .25, s = Math.sin(q * Math.PI); y = -h * .075 * s; r = 5 * s; }
      else y = 0; }
    return { y, sx, sy, r, op };
  }
  // harf yükselişi (aşağıdan fırla, uzayarak, yere oturunca ez) — k: 0..1
  function harfGiris(k, h = 160) {
    let y = h, sx = .8, sy = 1.3, op = 0;
    if (k >= 0) { op = cl(k * 4, 0, 1);
      if (k < .55) { const q = eo(k / .55); y = h - (h + 12) * q; sy = 1.3 - .3 * q; sx = .82 + .18 * q; }
      else if (k < .8) { const q = (k - .55) / .25, s = Math.sin(q * Math.PI); y = -12 + 12 * eo(q); sy = 1 - .14 * s; sx = 1 + .1 * s; }
      else { y = 0; sy = 1; sx = 1; } }
    return { y, sx, sy, op };
  }
  // smear çıkışı: yön boyunca uza + bulan (q: 0..1)
  const smear = (q, d = 300) => { q = ei(q); return { y: -d * q, sy: 1 + .9 * q, sx: 1 - .18 * q, op: 1 - q, blur: 7 * q }; };
  // --- tohumlu rastgele, yumuşak gürültü
  const tohum = s => () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
  const nz = (t, s) => Math.sin(t * 1.13 + s) * .6 + Math.sin(t * .71 + s * 2.3) * .4;
  // --- keçeli kalem yolları (SVG path d)
  function daire(cx, cy, rx, ry, sd = 1) { const r = tohum(sd); let d = ''; for (let a = 0; a <= 1.12; a += .02) { const an = -2.2 + a * Math.PI * 2, j = 1 + (r() - .5) * .05; d += (a ? ' L' : 'M') + (cx + Math.cos(an) * rx * j).toFixed(1) + ' ' + (cy + Math.sin(an) * ry * j).toFixed(1); } return d; }
  function alt(x0, x1, y, sd = 1) { const r = tohum(sd); let d = 'M' + x0 + ' ' + y; for (let x = x0; x <= x1; x += 24) d += ' L' + x + ' ' + (y + (r() - .5) * 7 + Math.sin(x / 60) * 3).toFixed(1); return d; }
  const ok = (x, y0, y1) => `M${x} ${y0} C${x - 40} ${(y0 + y1) / 2} ${x + 40} ${(y0 + y1) / 2} ${x} ${y1} M${x - 26} ${y1 - 30} L${x} ${y1} L${x + 26} ${y1 - 30}`;
  const tik = (x, y, s = 1) => `M${x - 34 * s} ${y} L${x - 8 * s} ${y + 26 * s} L${x + 40 * s} ${y - 32 * s}`;
  const carpi = (x, y, s = 1) => `M${x - 30 * s} ${y - 30 * s} L${x + 30 * s} ${y + 30 * s} M${x + 30 * s} ${y - 30 * s} L${x - 30 * s} ${y + 30 * s}`;
  // path'i k (0..1) oranında çiz
  function ciz(pathEl, k) { const L = +pathEl.dataset.L || (pathEl.dataset.L = pathEl.getTotalLength()); pathEl.style.strokeDasharray = L; pathEl.style.strokeDashoffset = L * (1 - cl(k, 0, 1)); }
  // --- renk taşması: (x,y) noktasından daire büyür, sonra başka noktaya büzülür. el: tam ekran katman
  function tasma(el, t, { t0, ac = .32, x = 360, y = 640, W = 720, H = 1280, kapan = null, x2 = x, y2 = y }) {
    const R = Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) + 20;
    let r = 0, cx = x, cy = y;
    if (t >= t0) r = R * expo((t - t0) / ac);
    if (kapan != null && t >= kapan) { const q = ei((t - kapan) / ac); r = R * (1 - q); cx = x + (x2 - x) * q; cy = y + (y2 - y) * q; }
    el.style.clipPath = `circle(${r.toFixed(1)}px at ${cx}px ${cy}px)`; el.style.display = r > .5 ? 'block' : 'none';
  }
  // --- daktilo (doğal tuş ritmi, tohumlu küçük sapma)
  function daktilo(metin, t, st, hz = 14, sd = 3) { if (t < st) return ''; const r = tohum(sd); let tt = st, n = 0; for (; n < metin.length; n++) { tt += (1 / hz) * (.7 + r() * .6); if (tt > t) break; } return metin.slice(0, n); }
  // --- film greni (kare numarasıyla tohumlanır)
  function gren(canvas, f, { acik = 96, guc = .25 } = {}) { const gx = canvas._g || (canvas._g = canvas.getContext('2d')); const I = canvas._i || (canvas._i = gx.createImageData(canvas.width, canvas.height)); let s = (f * 2654435761) >>> 0; const d = I.data;
    for (let i = 0; i < d.length; i += 4) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; const v = acik + (s >>> 24) * guc; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; } gx.putImageData(I, 0, 0); }
  // --- kamera: sürekli sürüklenme + vuruşta itme + sarsıntı
  function kamera(t, { vurusT = null, sarsinti = 0, guc = 1 } = {}) {
    const dd = vurusT == null ? 9 : t - vurusT;
    const zs = 1.02 + .03 * cl(dd / 1.6, 0, 1) + (dd < .2 ? .03 * (1 - dd / .2) : 0);
    const sx = Math.sin(t * 83) * 7 * sarsinti, sy = Math.cos(t * 71) * 7 * sarsinti;
    return `translate(${(nz(t * .9, 1) * 9 * guc + sx).toFixed(2)}px,${(nz(t * .8, 3) * 7 * guc + sy).toFixed(2)}px) scale(${zs.toFixed(4)}) rotate(${(nz(t * .5, 7) * .6 * guc).toFixed(3)}deg)`;
  }
  root.H = { cl, eo, ei, expo, backOut, kalanYol, yay, yaylar, dus, harfGiris, smear, tohum, nz, daire, alt, ok, tik, carpi, ciz, tasma, daktilo, gren, kamera };
})(typeof window !== 'undefined' ? window : globalThis);

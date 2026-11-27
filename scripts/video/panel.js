// Gerçekçi TEMSİLİ panel ekranları (resmi logo/birebir kopya yok): masaüstü tarayıcı ve telefon.
// Ekran türleri: ana (arama + öneriler), hizmet (açıklama + buton), tablo (satır seçimi), form (alanlar dolar), liste (telefonda kaydırma), sonuc.
// Node: html(b, i) işaretleme üretir. Tarayıcı: window.PANEL.kare(el, b, t) her karede çağrılır (zamanın saf fonksiyonu).
(function (root) {
  const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const EL = () => `<svg class="pim" viewBox="0 0 200 200" width="64" height="64" style="overflow:visible"><path d="M84 196 L84 112 L70 102 C60 94 66 80 78 84 L92 92 L92 28 C92 14 112 14 112 28 L112 86 L112 72 C112 60 130 60 130 72 L130 90 L130 80 C130 68 148 68 148 80 L148 96 L148 90 C148 80 164 80 164 92 L164 138 C164 168 150 196 120 196Z" fill="#fff" stroke="#151515" stroke-width="7" stroke-linejoin="round"/></svg>`;
  const OK = () => `<svg class="pim" viewBox="0 0 64 64" width="44" height="44" style="overflow:visible"><path d="M8 4 L8 52 L20 40 L28 58 L36 54 L28 37 L45 37Z" fill="#fff" stroke="#151515" stroke-width="4" stroke-linejoin="round"/></svg>`;
  function ekran(e, tel) {
    const ust = tel ? '' : `<div class="pp-yol">Ana Sayfa <i>›</i> Hizmetler <i>›</i> <b>${esc(e.baslik || e.kurum || '')}</b></div>`;
    if (e.tur === 'ana') return `<div class="pp-sc" data-tur="ana">${tel ? '' : '<div class="pp-hero"><h2>Hangi hizmeti arıyorsun?</h2></div>'}<div class="pp-ara" data-id="ara"><span class="pp-ik">⌕</span><span class="pp-az" data-yaz="${esc(e.arama)}"></span><i class="pp-cr"></i></div>
      <div class="pp-on">${(e.oneriler || []).map((o, j) => `<div class="pp-oi" data-id="on${j}"><span class="pp-ik">⌕</span>${esc(o)}<small>${esc((e.kurumlar || [])[j] || '')}</small></div>`).join('')}</div>
      ${tel ? '' : `<div class="pp-pop"><b>Sık kullanılanlar</b>${['Adres Bilgileri', 'Vergi Borcu Sorgulama', 'SGK Hizmet Dökümü', 'Tapu Bilgileri'].map(x => `<span>${x}</span>`).join('')}</div>`}</div>`;
    if (e.tur === 'hizmet') return `<div class="pp-sc" data-tur="hizmet">${ust}<div class="pp-hb"><h3>${esc(e.baslik)}</h3><div class="pp-kur">${esc(e.kurum || '')}</div></div>
      <div class="pp-bilgi">${(e.maddeler || ['Bu hizmeti kullanarak bilgilerinizi görüntüleyebilirsiniz.']).map(m => `<p>${esc(m)}</p>`).join('')}</div><div class="pp-bt" data-id="bt">${esc(e.buton || 'Sorgula')}</div></div>`;
    if (e.tur === 'tablo') return `<div class="pp-sc" data-tur="tablo">${ust}<h3 class="pp-h3">${esc(e.baslik)}</h3><table class="pp-tb"><tr>${(e.kolonlar || []).map(k => `<th>${esc(k)}</th>`).join('')}</tr>
      ${(e.satirlar || []).map((r, j) => `<tr data-id="r${j}">${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table>${e.not ? `<div class="pp-uy">${esc(e.not)}</div>` : ''}</div>`;
    if (e.tur === 'form') return `<div class="pp-sc" data-tur="form">${ust}<h3 class="pp-h3">${esc(e.baslik)}</h3>${(e.alanlar || []).map((a, j) => `<div class="pp-al"><label>${esc(a.ad)}</label><div class="pp-in" data-id="a${j}"><span data-yaz="${esc(a.deger)}"></span><i class="pp-cr"></i></div></div>`).join('')}
      ${e.onay ? `<div class="pp-cb" data-id="cb"><i></i>${esc(e.onay)}</div>` : ''}<div class="pp-bt" data-id="bt">${esc(e.buton || 'Gönder')}</div></div>`;
    if (e.tur === 'liste') return `<div class="pp-sc" data-tur="liste"><h3 class="pp-h3">${esc(e.baslik)}</h3><div class="pp-vp"><div class="pp-kay">${(e.satirlar || []).map((r, j) => `<div class="pp-li${j === e.hedef ? ' hd' : ''}" data-id="l${j}"><span class="pp-nok"></span><div><b>${esc(Array.isArray(r) ? r[0] : r)}</b><small>${esc(Array.isArray(r) ? r[1] || '' : '')}</small></div><i>›</i></div>`).join('')}</div></div></div>`;
    if (e.tur === 'sonuc') return `<div class="pp-sc" data-tur="sonuc">${ust}<div class="pp-son"><div class="pp-tik"><svg viewBox="0 0 100 100" width="120" height="120"><circle cx="50" cy="50" r="44" fill="#1E9E6A"/><path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h3>${esc(e.baslik)}</h3><p>${esc(e.alt || '')}</p>${e.ref ? `<div class="pp-ref">Başvuru no: ${esc(e.ref)}</div>` : ''}</div></div>`;
    return '';
  }
  function html(b, i) {
    const tel = b.cihaz === 'tel';
    const bas = tel ? `<div class="pp-sb"><span>9:41</span><span class="pp-cen"></span><span>●●● ▮</span></div><div class="pp-app">${esc(b.site || 'Uygulama')}<small>TEMSİLİ</small></div>`
      : `<div class="pp-tar"><i></i><i></i><i></i><div class="pp-url"><span class="pp-kil"></span><span data-url="${esc(b.url || '')}"></span></div><small>TEMSİLİ GÖRÜNTÜ</small></div>
         <div class="pp-ust"><span class="pp-amb"></span><b>${esc(b.site || 'Kamu Hizmetleri')}</b><nav><span>Hizmetler</span><span>Kurumlar</span><span>Belediyeler</span><span>Giriş</span></nav></div>`;
    return `<div class="pp${tel ? ' tel' : ''}" id="pp${i}"><div class="pp-z">${bas}<div class="pp-yk"></div><div class="pp-gov">${b.ekranlar.map(e => ekran(e, tel)).join('')}</div></div><div class="pp-dlg"></div><div class="pp-im">${tel ? EL() : OK()}</div></div>`;
  }
  // ---------------- tarayıcı tarafı ----------------
  const cl = (v, a, b) => Math.max(a, Math.min(b, v)), eo = k => 1 - Math.pow(1 - cl(k, 0, 1), 3), eio = k => { k = cl(k, 0, 1); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  const yaz = (s, t, st, hz) => t < st ? '' : s.slice(0, Math.floor(cl((t - st) * hz, 0, s.length)));
  function hedefler(b) {   // ekran başına imleç noktaları: [{T, id, tik}]
    const H = [];
    b.ekranlar.forEach((e, j) => {
      const T0 = b.ekranT[j];
      if (e.tur === 'ana') { H.push({ T: (e.aramaT ?? T0 + .2) - .1, id: 'ara', tik: true, j }); if (e.sec != null) H.push({ T: b.ekranT[j + 1] != null ? b.ekranT[j + 1] - .25 : T0 + 2, id: 'on' + e.sec, tik: true, j }); }
      if (e.tur === 'hizmet') H.push({ T: e.butonT ?? (b.ekranT[j + 1] != null ? b.ekranT[j + 1] - .25 : T0 + 1.5), id: 'bt', tik: true, j });
      if (e.tur === 'tablo' && e.sec != null) H.push({ T: e.secT ?? T0 + 1, id: 'r' + e.sec, tik: true, j });
      if (e.tur === 'form') { (e.alanlar || []).forEach((a, q) => H.push({ T: (e.alanT || [])[q] ?? T0 + .3 + q * .6, id: 'a' + q, tik: true, j })); if (e.onay) H.push({ T: e.onayT ?? T0 + 2, id: 'cb', tik: true, j }); H.push({ T: e.butonT ?? (b.ekranT[j + 1] != null ? b.ekranT[j + 1] - .25 : T0 + 3), id: 'bt', tik: true, j }); }
      if (e.tur === 'liste' && e.hedef != null) H.push({ T: e.tapT ?? (b.ekranT[j + 1] != null ? b.ekranT[j + 1] - .25 : T0 + 2), id: 'l' + e.hedef, tik: true, j });
    });
    return H.sort((a, c) => a.T - c.T);
  }
  function kare(el, b, t) {
    const E = b.ekranlar, ET = b.ekranT; let cur = 0; ET.forEach((x, j) => { if (t >= x) cur = j; });
    const z = el.querySelector('.pp-z'), gov = el.querySelector('.pp-gov'), scs = [...gov.children];
    // url yazılır
    const u = el.querySelector('[data-url]'); if (u) u.textContent = yaz(u.dataset.url, t, b.t + .1, 30);
    // sayfa geçişi: yükleme çizgisi + kayarak giriş
    const yk = el.querySelector('.pp-yk'), dg = t - ET[cur]; yk.style.transform = 'scaleX(' + (dg < .45 ? eo(dg / .45) : 1) + ')'; yk.style.opacity = dg < .55 ? 1 : 0;
    scs.forEach((sc, j) => { const on = j === cur, prev = j === cur - 1 && dg < .3; sc.style.display = on || prev ? 'block' : 'none';
      if (on) { const k = j === 0 ? 1 : eo(dg / .32); sc.style.opacity = k; sc.style.transform = 'translateX(' + ((1 - k) * 60) + 'px)'; } else if (prev) { sc.style.opacity = 1 - dg / .3; sc.style.transform = 'translateX(' + (-40 * dg / .3) + 'px)'; } });
    const sc = scs[cur], e = E[cur];
    // tür bazlı canlılık
    sc.querySelectorAll('[data-yaz]').forEach((y, q) => { const st = e.tur === 'ana' ? (e.aramaT ?? ET[cur] + .2) : ((e.alanT || [])[q] ?? ET[cur] + .3 + q * .6) + .15, hz = Math.max(16, y.dataset.yaz.length / 1.1); y.textContent = yaz(y.dataset.yaz, t, st, hz); });
    if (e.tur === 'ana') { const tx = e.arama || '', st = e.aramaT ?? ET[cur] + .2, bit = st + tx.length / Math.max(16, tx.length / 1.1); sc.querySelectorAll('.pp-oi').forEach((o, q) => { const k = cl((t - bit - .08 * q) / .2, 0, 1); o.style.opacity = k; o.style.transform = 'translateY(' + ((1 - k) * -10) + 'px)'; }); }
    if (e.tur === 'tablo') sc.querySelectorAll('tr[data-id]').forEach((r, q) => { const k = cl((dg - .25 - q * .1) / .2, 0, 1); r.style.opacity = k; });
    if (e.tur === 'form' && e.onay) sc.querySelector('.pp-cb').classList.toggle('ok', t >= (e.onayT ?? ET[cur] + 2) + .1);
    if (e.tur === 'sonuc') { const k = cl((dg - .1) / .35, 0, 1), s = k < 1 ? .3 + .7 * (1 + 2.7 * Math.pow(k - 1, 3) + 1.7 * Math.pow(k - 1, 2)) : 1; sc.querySelector('.pp-tik').style.transform = 'scale(' + s + ')'; }
    // telefonda kaydırma: parmak yukarı iter, liste akar, hedefte durur
    let kay = 0; if (e.tur === 'liste') { const kz = sc.querySelector('.pp-kay'), hd = sc.querySelector('.hd'), st = e.kaydirT ?? ET[cur] + .3, k = eio((t - st) / 1.1); kay = hd ? Math.max(0, hd.offsetTop - 160) * k : 0; kz.style.transform = 'translateY(' + (-kay) + 'px)'; }
    // imleç / parmak: hedefler arasında kayar, tıklar (dalga + basma); tıklanan öğe parlar
    const P = el.__H || (el.__H = hedefler(b)), zr = z.getBoundingClientRect(), pos = id => { const n = gov.querySelector('[data-id="' + id + '"]'); if (!n) return null; const r = n.getBoundingClientRect(), s = (zr.width / z.offsetWidth) || 1; return [(r.left - zr.left) / s + Math.min(r.width / s * .62, 260), (r.top - zr.top) / s + r.height / s * .55]; };
    let p0 = [z.offsetWidth * .82, z.offsetHeight * .9], p = p0, tikK = -1, odak = null;
    for (let q = 0; q < P.length; q++) { const h = P[q]; if (h.j !== cur && !(t < h.T && h.j === cur)) { if (h.j < cur) continue; } const pp = h.j === cur ? pos(h.id) : null; if (!pp) continue;
      if (t >= h.T) { p = pp; p0 = pp; if (t < h.T + .45) { tikK = (t - h.T) / .45; odak = pp; } } else { const m = eio((t - Math.max(h.T - .6, ET[h.j])) / .55); p = [p0[0] + (pp[0] - p0[0]) * m, p0[1] + (pp[1] - p0[1]) * m - Math.sin(m * Math.PI) * 24]; if (h.T - t < .7) odak = pp; break; } }
    if (e.tur === 'liste' && t < (e.tapT ?? 1e9) && t > (e.kaydirT ?? ET[cur] + .3) - .2) { const st = e.kaydirT ?? ET[cur] + .3, k = cl((t - st) / 1.1, 0, 1); p = [z.offsetWidth * .6, z.offsetHeight * (.82 - .4 * Math.sin(k * Math.PI))]; }
    const im = el.querySelector('.pp-im'), bas = tikK >= 0 && tikK < .35 ? Math.sin(tikK / .35 * Math.PI) : 0;
    im.style.transform = 'translate(' + (p[0] - (b.cihaz === 'tel' ? 22 : 6)) + 'px,' + (p[1] - 6) + 'px) scale(' + (1 - .18 * bas) + ')';
    const dl = el.querySelector('.pp-dlg'); dl.style.opacity = tikK >= 0 ? 1 - tikK : 0; dl.style.left = p[0] + 'px'; dl.style.top = p[1] + 'px'; dl.style.transform = 'translate(-50%,-50%) scale(' + (.3 + Math.max(0, tikK) * 1.4) + ')';
    gov.querySelectorAll('.act').forEach(n => n.classList.remove('act')); P.forEach(h => { if (h.j === cur && t >= h.T && t < h.T + .9) { const n = gov.querySelector('[data-id="' + h.id + '"]'); if (n) n.classList.add('act'); } });
    // kamera odağı (saf zaman fonksiyonu): tıklamadan 0,6 sn önce hedefe yaklaş, 0,35 sn sonra açıl — yalnızca masaüstü
    if (b.cihaz !== 'tel') { let zs = 1, ox = z.offsetWidth / 2, oy = z.offsetHeight / 2;
      P.forEach(h => { if (h.j !== cur) return; const k = t < h.T ? eio((t - (h.T - .65)) / .5) : 1 - eio((t - (h.T + .35)) / .45); if (k > 0) { const pp = pos(h.id); if (pp && 1 + .17 * k > zs) { zs = 1 + .17 * k; ox = pp[0]; oy = pp[1]; } } });
      z.style.transformOrigin = ox + 'px ' + oy + 'px'; z.style.transform = 'scale(' + zs.toFixed(4) + ')'; }
  }
  root.PANEL = { html, kare };
  if (typeof module !== 'undefined') module.exports = root.PANEL;
})(typeof window !== 'undefined' ? window : globalThis);

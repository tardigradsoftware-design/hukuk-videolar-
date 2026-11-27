// c_genel sahnelerinden ses efekti listesi türetir (fon müziği yok; seviyeyi miks.py ayarlar).
const SES = { kart: 'thud', damga: 'thud', akis: 'swish', cizgi: 'swish', panel: 'whoosh', dev: 'whoosh', abone: 'ding', yorum: 'pop', ikon: 'pop', not: 'kagit', adimlar: 'pop', zaman: 'swish', liste: 'pop', yigin: 'pop', yol: 'swish', baslik: null };
module.exports = s3 => { const o = []; s3.forEach(sc => { if (sc.tur !== 'c_genel') return; o.push([sc.a, 'whoosh', undefined, 0]);
  sc.ogeler.forEach(x => { const k = Array.isArray(x.k) ? x.k : [x.k, 0]; if (SES[x.t] && k[0] > sc.a) o.push([k[0], SES[x.t], undefined, k[1]]);
    (x.maddeler || []).forEach(([m, mk]) => o.push([mk, 'tik', undefined, 0])); (x.cipler || []).forEach(c => { if (!Array.isArray(c[0])) o.push([c[0], 'pop', undefined, 0]); });
    (x.dugumler || []).forEach(d => o.push([d[2], 'pop', undefined, 0]));
    (x.ekranlar || []).forEach(e => { if (e.aramaK) o.push([e.aramaK, 'key', undefined, 0]); if (e.secK) o.push([e.secK, 'click', undefined, 0]); (e.alanlar || []).forEach(a => o.push([a[2], 'key', undefined, 0])); if (e.buton) o.push([e.buton.k, 'click', undefined, 0]); if (e.ust) o.push([e.ust.k, 'click', undefined, 0]); if (e.sonuc) o.push([e.sonuc.k[0], 'ding', undefined, .4]); }); }); });
  return o; };

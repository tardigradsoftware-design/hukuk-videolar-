// Bir videoyu üretir:  node scripts/video/uret.js VID_001 kisa|uzun
// Girdi: veri/senaryolar.csv, veri/ses/VID_001_short.mp3 | VID_001_uzun.mp3, planlar/VID_001_kisa.js
// Çıktı: cikti/kisa/VID_001 - <başlık>.mp4  |  cikti/uzun/VID_001 - <başlık>.mp4
const fs = require('fs'), path = require('path'), { execFileSync, spawn } = require('child_process');
const { chromium } = require('playwright');
const { sayfa } = process.argv.includes('--stil=s3') ? require('./sayfa_s3') : ((process.argv.includes('--stil=v5') || process.argv.includes('--stil=v6')) ? require('./sayfa_v5') : process.argv.includes('--stil=v4') ? require('./sayfa_v4') : require('./sayfa'));

const KOK = path.join(__dirname, '..', '..');
const [, , ID, TUR = 'kisa'] = process.argv;
const STIL = (process.argv.find(a => a.startsWith('--stil=')) || '').slice(7) || 'v3';   // varsayılan v3 (STIL.md); --stil=klasik | yapaytu
const KISA = TUR === 'kisa';

// --- CSV (tırnaklı alanlar destekli)
function csv(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f.replace(/\r$/, '')); rows.push(row); row = []; f = ''; } else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const head = rows.shift().map(h => h.replace(/^﻿/, '').trim());
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}
const satir = csv(fs.readFileSync(path.join(KOK, 'veri', 'senaryolar.csv'), 'utf8')).find(r => r['video id'] === ID);
if (!satir) throw new Error(ID + ' senaryoda yok');
const _tv2 = path.join(KOK, 'veri', 'tts_v2', `${ID}_${KISA ? 'kisa' : 'uzun'}.txt`);   // yeni metin (v2) varsa onu kullan
const metin = fs.existsSync(_tv2) ? fs.readFileSync(_tv2, 'utf8').trim() : satir[KISA ? 'shorts video tts' : 'uzun video tts'];
const baslik = satir[KISA ? 'shorts video başlığı' : 'uzun video başlığı'];
const AD = `${ID}_${KISA ? 'short' : 'uzun'}`;
const ham = path.join(KOK, 'veri', 'ses_ham', `${AD}.mp3`);
fs.mkdirSync(path.join(KOK, 'veri', 'ses'), { recursive: true });
const ses = path.join(KOK, 'veri', 'ses', `${AD}.wav`);
// hız + ses seviyesi (kısa: 1.25x; uzun: hook 1.25x, sonrası 1.00x)
const info = JSON.parse(execFileSync('python3', [path.join(__dirname, 'ses_hazirla.py'), ham, metin, TUR, ses]).toString());
console.error(`ses: ${info.ham_sure}s → ${info.sure}s` + (info.kesim ? ` (hook ${info.hook_kelime} kelime, ${info.kesim}s'de 1.00x'e geçiş)` : ' (1.25x)'));
const _tv = (process.argv.find(a => a.startsWith('--tema=')) || '').slice(7).replace('karma', '6'), _pt = path.join(KOK, 'planlar', `${ID}_${TUR}_${STIL}_${_tv}.js`);
const _pv = STIL === 's3' && _tv && fs.existsSync(_pt) ? _pt : path.join(KOK, 'planlar', `${ID}_${TUR}_${STIL}.js`);
const _pv5 = path.join(KOK, 'planlar', `${ID}_${TUR}_v5.js`);
const plan = require(fs.existsSync(_pv) ? _pv : STIL === 'v6' && fs.existsSync(_pv5) ? _pv5 : path.join(KOK, 'planlar', `${ID}_${TUR}.js`));

// --- dudak senkronu + kelime zamanları
const dudak = (wav, txt) => JSON.parse(execFileSync('python3', [path.join(__dirname, '..', 'dosya', 'dudak.py'), wav, txt], { maxBuffer: 64 << 20 }).toString());
let d;
if (info.kesim) {
  // hız farklı iki parça ayrı hizalanır, sonra birleştirilir
  const words = metin.split(/\s+/), k = info.hook_kelime, cut = info.kesim;
  const pa = ses.replace('.wav', '.a.wav'), pb = ses.replace('.wav', '.b.wav');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', ses, '-t', String(cut), pa]);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(cut), '-i', ses, pb]);
  const A = dudak(pa, words.slice(0, k).join(' ')), B = dudak(pb, words.slice(k).join(' '));
  const n = Math.round(cut * 100), ev = A.env.values.slice(0, n); while (ev.length < n) ev.push(0);
  d = {
    duration: info.sure,
    cues: [...A.cues.filter(c => c.t < cut), ...B.cues.map(c => ({ t: +(c.t + cut).toFixed(3), v: c.v }))],
    words: [...A.words, ...B.words.map(w => ({ w: w.w, t0: +(w.t0 + cut).toFixed(3), t1: +(w.t1 + cut).toFixed(3) }))],
    env: { rate: 100, values: ev.concat(B.env.values) },
  };
  fs.unlinkSync(pa); fs.unlinkSync(pb);
} else d = dudak(ses, metin);
const kel = d.words; // [{w,t0,t1}]
const T = k => (kel[Math.min(k, kel.length - 1)] || { t0: 0 }).t0 - .05; // kelime indeksinden zaman

// --- plandan zaman çizelgesi
const tl = { cues: d.cues, env: d.env, kelimeler: kel, ifade: [{ t: 0, ad: 'notr' }], jest: [{ t: 0, ad: 'bekle' }], basliklar: [], ogeler: [], zipla: [], yuru: [] };
plan.sahneler.forEach((s, si) => {
  const t0 = si === 0 ? 0 : T(s.k);
  const nxt = plan.sahneler[si + 1];
  const t1 = nxt ? T(nxt.k) - .1 : null;
  tl.basliklar.push({ t: t0, ust: s.baslik[0], alt: s.baslik[1], adim: s.adim || 0 });
  (s.mimik || []).forEach(([k, ifade, jest]) => { const t = Math.max(0, T(k) - .15); if (ifade) tl.ifade.push({ t, ad: ifade }); if (jest) tl.jest.push({ t, ad: jest }); });
  (s.ogeler || []).forEach(o => {
    const e = Object.assign({}, o, { t0: Math.max(t0 + .1, T(o.k ?? s.k)), t1: o.k1 != null ? T(o.k1) : t1 });
    if (o.alt) e.altT = o.alt.map(T);
    if (o.rozetK) e.rozetT = o.rozetK.map(T);
    if (o.yazK != null) e.yazT = T(o.yazK);
    if (o.akis) e.akis = o.akis.map(a => Object.assign({}, a, { T: Math.max(e.t0 + .2, T(a.k) + (a.dt || 0)) }));
    tl.ogeler.push(e);
  });
  (s.zipla || []).forEach(k => tl.zipla.push(T(k)));
});
const son = plan.son || {};
tl.ifade.push({ t: d.duration - .2, ad: son.ifade || 'mutlu' }); tl.jest.push({ t: d.duration - .2, ad: son.jest || 'selam' });
tl.duration = d.duration + (son.uzat ?? 1.2);
const _son = (process.argv.find(a => a.startsWith('--son=')) || '').slice(6); if (_son) tl.duration = Math.min(tl.duration, _son[0] === 'k' ? T(+_son.slice(1)) + .4 : +_son);   // kısmi render (deneme)
tl.adimSayisi = plan.adimSayisi || 0;
tl.parcalar = (() => {
  const P = []; let cur = null;
  kel.forEach((k, i) => {
    const w = k.w.replace(/[,.!?;:"“”()…]/g, '');
    if (!cur) cur = { i0: i, i1: i, n: w.length, t0: k.t0 };
    else if (cur.i1 - cur.i0 + 1 >= 3 || cur.n + 1 + w.length > 18) { P.push(cur); cur = { i0: i, i1: i, n: w.length, t0: k.t0 }; }
    else { cur.i1 = i; cur.n += 1 + w.length; }
    if (/[,.!?;:…]["”']?$/.test(k.w)) { P.push(cur); cur = null; }
  });
  if (cur) P.push(cur);
  P.forEach((p, j) => { const son = kel[p.i1].t1, nx = P[j + 1]; p.t1 = nx && nx.t0 - son < .6 ? nx.t0 : son + .25; });
  return P;
})();
tl.stil = STIL === 'klasik' ? null : STIL;
// çeşitlilik: video ID'sine göre sabit (deterministik) tema — her video farklı görünür
const hs = str => { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } h ^= h >>> 13; h = Math.imul(h, 0x5bd1e995); return (h ^ (h >>> 15)) >>> 0; };
const sec = (arr, ad) => arr[hs(ID + ':' + ad) % arr.length];
tl.tema = Object.assign({ bg: sec(['', 'izgara', 'cizgi', 'leke'], 'bg'), baslik: sec(['kay', 'yaz', 'zoom'], 'baslik'), gecis: sec(['zoom', 'kaydir', 'flas'], 'gecis'), altyazi: '' }, plan.tema || {});
console.error('tema:', JSON.stringify(tl.tema));
tl.aks = plan.aks || null;   // kostüm yok (yalnızca planda aks verilirse)
tl.firlat = tl.ogeler.filter(o => o.firlat === true).map(o => o.t0);
tl.cek = tl.ogeler.filter(o => o.firlat === 'el').map(o => o.t0);

// --- ses olayları (efektler) — sayfadaki animasyon zamanlarıyla birebir
const olay = [];
const ev = (t, tip, v) => olay.push({ t: +t.toFixed(3), tip, ...(v ? { v } : {}) });
tl.basliklar.forEach((b, i) => { if (i > 0) ev(b.t, 'whoosh'); });
tl.ogeler.forEach(o => {
  if (o.firlat === 'el') { ev(o.t0 - .5, 'kagit'); ev(o.t0 - .3, 'tik'); ev(o.t0 + .05, 'whoosh', .7); ev(o.t0 + .58, 'pop'); return; }
  if (o.firlat) { ev(o.t0 - .12, 'kagit'); ev(o.t0, 'whoosh', .8); ev(o.t0 + .58, 'pop'); return; }
  if (o.tip === 'damga') ev(o.t0 + .18, 'thud');
  else if (o.tip === 'portal') ev(o.t0, 'swish');
  else if (o.tip === 'soru') ev(o.t0, 'bildirim');
  else if (o.tip === 'rozet' && o.renk === 'g') { ev(o.t0, 'pop'); ev(o.t0 + .12, 'ding', .7); }
  else ev(o.t0, 'pop');
  (o.altT || []).forEach(t => ev(t, o.tip === 'kontrol' ? 'ding' : 'tik', o.tip === 'kontrol' ? .5 : 1));
  (o.rozetT || []).forEach(t => t != null && ev(t, 'ding', .6));
  const yazTxt = o.tip === 'yorum' || o.tip === 'arama' ? o.yazi : null;
  if (yazTxt) { const st = o.yazT ?? o.t0 + .3, hz = Math.max(o.hiz || 9, yazTxt.length / 1.2); for (let c = 0; c < yazTxt.length; c++) if (yazTxt[c] !== ' ') ev(st + c / hz, 'key'); }
  (o.akis || []).forEach(a => {
    if (a.yap === 'yaz' || a.yap === 'url') { const hz = Math.max(a.hiz || 14, a.yazi.length / 1.2); for (let c = 0; c < a.yazi.length; c++) if (a.yazi[c] !== ' ') ev(a.T + c / hz, 'key'); }
    if (a.yap === 'tikla') ev(a.T, 'click');
    if (a.yap === 'ekran') ev(a.T, 'swish', .6);
    if (a.yap === 'goster') ev(a.T, 'ding', .7);
    if (a.yap === 'vurgula') ev(a.T, 'tik', .8);
  });
});
tl.zipla.forEach(t => ev(t + .1, 'boing'));
(plan.sesler || []).forEach(([k, tip, v, dt]) => ev(T(k) + (dt || 0), tip, v));   // sahne motorları için elle ses vuruşları
if (plan.maskot && !plan.vuruslar && !KISA) tl.mk = { cues: tl.cues, env: tl.env, ifade: tl.ifade, jest: tl.jest, zipla: [], yuru: [], firlat: [], cek: [], aks: null };
if (plan.s3) { tl.planS3 = plan.s3; tl.planDil = !!plan.dil; tl.adimPos = plan.adimPos || null; }
// v5 vuruşları: her vuruşta bir ses
if (plan.vuruslar) {
  tl.vurus = plan.vuruslar.map(b => Object.assign({}, b, { t: Math.max(0, T(b.k)), altT: (b.alt || []).map(T), yazT: b.yazK != null ? T(b.yazK) : null, acT: b.acK != null ? T(b.acK) : null, carpiT: b.carpiK != null ? T(b.carpiK) : null, hlT: b.hlK != null ? T(b.hlK) : null, ekranlar: (b.ekranlar || []).map(e => { const c = Object.assign({}, e); Object.keys(e).forEach(key => { if (!/K$/.test(key) || key === 'k') return; const v = e[key]; c[key.slice(0, -1) + 'T'] = Array.isArray(v) ? v.map(T) : T(v); }); return c; }), ekranT: (b.ekranlar || []).map(e => T(e.k)), aramaT: (b.ekranlar || []).map(e => e.aramaK != null ? T(e.aramaK) : null) }));
  // anahtar kelime kartları (yatay): cümle başı olmayan büyük harfli terimler, sayılar; söylendiği an sağda belirir
  if (!KISA) { const DUR = new Set(['Birinci', 'İkinci', 'Üçüncü', 'Dördüncü', 'Beşinci', 'Şimdi', 'Peki', 'Ama', 'Çoğu', 'Süreç', 'Tek', 'Yazılı']), C = []; let son = -9;
    const temiz = w => w.replace(/[’'](?:[a-zçğıöşü]+)$/i, '').replace(/[,.;:!?"“”()]/g, '');
    for (let i = 0; i < kel.length; i++) { const w = kel[i].w, ilk = i === 0 || /[.!?:;]["”]?$/.test(kel[i - 1].w), tw = temiz(w);
      const buyuk = /^[A-ZÇĞİÖŞÜ]/.test(tw) && !ilk && !DUR.has(tw), sayi = /\d/.test(tw);
      if (!buyuk && !sayi) continue; let ph = [tw], j = i;
      while (j + 1 < kel.length && !/[,.;:!?]$/.test(kel[j].w)) { const n = temiz(kel[j + 1].w); if (/^[A-ZÇĞİÖŞÜ0-9]/.test(n) || (['ve', 'ile', 'iş', 'gün', 'günü', 'ay', 'sayılı'].includes(n) && j + 2 < kel.length && /^[A-ZÇĞİÖŞÜa-zçğıöşü0-9]/.test(temiz(kel[j + 2].w)) && sayi)) { ph.push(n); j++; } else break; }
      if (sayi && j + 1 < kel.length && /^(gün|günü|ay|ayda|yıl|sayılı|iş|TL|lira)$/.test(temiz(kel[j + 1].w))) { ph.push(temiz(kel[j + 1].w)); j++; }
      const x = ph.join(' ').trim(); i = j; if (x.length < 2 || x.length > 34 || kel[i].t0 - son < .9 || C.some(c => c.x === x && kel[i].t0 - c.t < 25)) continue;
      C.push({ t: +kel[i - ph.length + 1].t0.toFixed(2), x }); son = kel[i].t0; }
    tl.cips = C; C.forEach(c => ev(c.t, 'tik', .5)); console.error('anahtar kart:', C.length); }
  tl.vurus.forEach(b => { if (b.tip !== 'panel') return; ev(b.t, 'swish', .8); b.ekranlar.forEach((e, j) => { if (j) ev(b.ekranT[j], 'swish', .5);
      const tikla = [e.aramaT, e.butonT, e.secT, e.onayT, e.tapT, ...(e.alanT || [])].filter(x => x != null); tikla.forEach(x => ev(x - .02, 'click'));
      const yz = [[e.arama, e.aramaT], ...(e.alanlar || []).map((a, q) => [a.deger, (e.alanT || [])[q]])]; yz.forEach(([tx, st]) => { if (!tx || st == null) return; const hz = Math.max(16, tx.length / 1.1); for (let c = 0; c < tx.length; c += 2) ev(st + .15 + c / hz, 'key', .55); });
      if (e.tur === 'sonuc') ev(b.ekranT[j] + .2, 'ding'); if (e.kaydirT != null) ev(e.kaydirT, 'swish', .5); }); });
  if (plan.maskot && !KISA) { const M = b => b.koyu ? ['korkmus', 'eller_yukari'] : b.tip === 'abone' ? ['mutlu', 'selam'] : ['panel', 'telefon', 'gazete', 'kontrol', 'eposta', 'ui'].includes(b.tip) ? ['emin', 'isaret'] : b.tip === 'grafik' ? ['saskin', 'yukari'] : b.ikon === 'tik' ? ['mutlu', 'basparmak'] : b.tam ? ['saskin', 'eller_yukari'] : ['notr', 'anlat'];
    tl.vurus.forEach(b => { const [f, j] = M(b); tl.ifade.push({ t: Math.max(0, b.t - .1), ad: f }); tl.jest.push({ t: Math.max(0, b.t - .1), ad: j }); });
    tl.ifade.sort((a, c) => a.t - c.t); tl.jest.sort((a, c) => a.t - c.t);
    tl.mk = { cues: tl.cues, env: tl.env, ifade: tl.ifade, jest: tl.jest, zipla: [], yuru: [], firlat: [], cek: [], aks: null }; }
  tl.vurus.forEach(b => { if (b.tip === 'abone') { ev(b.t, 'whoosh', .5); ev(b.t + 1.1, 'ding', .8); } });
  { const tv = (process.argv.find(a => a.startsWith('--tema=')) || '').slice(7), TMm = require('./temalar');
    if (tv) tl.tmB = tl.vurus.map(b => tv === 'karma' ? TMm.KARMA[b.adim || 0] : +tv); tl.temaAd = tv ? TMm.ADLAR[tv] : null; }
  // Remotion: sayı/grafik vuruşlarını şeffaf kare dizisine render et (v5'te <img> olarak oynar)
  tl.vurus.forEach((b, i) => { if (b.tip !== 'grafik') return;
    const son = i + 1 < tl.vurus.length ? tl.vurus[i + 1].t : d.duration, n = Math.max(30, Math.min(150, Math.ceil((son - b.t) * 30) + 6));
    const dir = path.join(KOK, 'veri', 'remotion', `${ID}_${TUR}_${i}`);
    const r = JSON.parse(execFileSync('node', [path.join(__dirname, 'remotion_render.mjs'), b.comp, JSON.stringify(b.props || {}), dir, String(n)], { maxBuffer: 64 << 20 }).toString().trim().split('\n').pop());
    b.rm = { dir, n: r.kare, w: r.w, h: r.h }; console.error(`remotion: ${b.comp} → ${r.kare} kare`); });
  tl.vurus.forEach((b, i) => {
    if (b.tip === 'grafik') { ev(b.t, 'whoosh', .6); ev(b.t + .25, 'pop'); if (b.comp === 'Sayac') for (let q = 0; q < 8; q++) ev(b.t + .1 + q * .08, 'tik', .4); }
    if (b.koyu !== undefined && i > 0 && !!b.koyu !== !!tl.vurus[i - 1].koyu) ev(b.t, 'thud', .8);
    if (b.tip === 'dev') { ev(b.t, 'whoosh', .6); ev(b.t + .16, 'pop'); }
    if (b.tip === 'not') ev(b.t, 'kagit');
    if (b.ikon) ev(b.t + .34, 'pop', .8);
    (b.etiketler || []).forEach((e, j) => { const tt = b.altT[j] ?? b.t + .2 * j; ev(tt + .42, 'tik'); ev(tt + .62, 'tik', .5); });
    if (b.tip === 'ui' && b.acT != null) { ev(b.acT, 'click'); ev(b.acT + .15, 'ding', .7); }
    if (b.tip === 'gazete') { ev(b.t, 'swish', .7); (b.altT || []).forEach(t => ev(t, 'tik')); if (b.hlT != null) ev(b.hlT, 'kagit'); }
    if (b.carpiT != null) ev(b.carpiT, 'kagit');
    if (b.tip === 'karisim') { for (let q = 0; q < 6; q++) ev(b.t + .05 + q * .07, 'tik', .5); ev(b.t + .5, 'pop'); }
    if (b.tip === 'telefon') { ev(b.t, 'swish'); b.ekranT.forEach((t, j) => { if (j) { ev(t - .22, 'click'); ev(t, 'swish', .6); } }); if (b.ekranlar.at(-1).basarili) ev(b.ekranT.at(-1) + .2, 'ding'); }
    if (b.tip === 'kontrol') (b.altT || []).forEach(t => ev(t, 'ding', .5));
    if (b.tip === 'eposta') (b.altT || []).forEach((t, j) => { const tx = j < 2 ? [b.kime, b.konu][j] || '' : b.satirlar[j - 2] || ''; const hz = Math.max(30, tx.length / 1.1); for (let c = 0; c < tx.length; c += 2) ev(t + c / hz, 'key', .6); });
    if (b.tip === 'telefon') (b.aramaT || []).forEach((t, j) => { if (t == null) return; const tx = b.ekranlar[j].arama, hz = Math.max(14, tx.length / 1.2); for (let c = 0; c < tx.length; c += 2) ev(t + c / hz, 'key', .6); });
    if (b.yaz) { const st = b.yazT ?? b.t + .3, hz = Math.max(10, b.yaz.length / 1.0); for (let c = 0; c < b.yaz.length; c++) ev(st + c / hz, 'key'); }
  });
}
const olayP = ses.replace('.wav', '.olay.json'), miksP = ses.replace('.wav', tl.stil ? `.${tl.stil}.miks.wav` : '.miks.wav');
fs.writeFileSync(olayP, JSON.stringify({ sure: tl.duration, olaylar: olay }));
const kulak = require('child_process').spawnSync('python3', [path.join(__dirname, 'miks.py'), ses, olayP, TUR, miksP, ...(tl.stil === 'yapaytu' ? ['--muzik', '--sfx-db=-12'] : [])], { encoding: 'utf8' });
if (kulak.status !== 0) throw new Error(kulak.stderr);
console.error(kulak.stderr.trim());
console.error(`ses efektleri: ${olay.length} olay (fon müziği yok)`);
tl.audio = miksP;

// --- yerleşim
const W = KISA ? 720 : 1920, H = KISA ? 1280 : 1080;
const L = KISA
  ? { title: [52, 96, 616], titleSize: 62, sub: [0, 812, 720], subSize: 42, mascot: [170, 840, 400], ogeScale: 1.15 }
  : { title: [90, 70, 1100], titleSize: 76, sub: [0, 940, 1920], subSize: 50, mascot: [1190, 190, 700], ogeScale: 1.35 };
if (tl.stil === 'v5' || tl.stil === 'v6') { L.sub = KISA ? [0, 880, 720] : [0, 950, 1920]; }
tl.mod = tl.stil === 'v6' ? 'top' : null;
if (tl.stil === 'yapaytu' || tl.stil === 'v3' || tl.stil === 'v4') L.mascot = KISA ? [370, 900, 330] : [1310, 440, 580];   // karakter sağ altta
const html = sayfa({ W, H, L, tl });
const META_TXT = (outDir, ad) => fs.writeFileSync(path.join(outDir, ad.replace(/\.mp4$/, '.txt')), require('./meta').yaz({ satir, kisa: KISA, basliklar: tl.basliklar, sure: tl.duration }));

(async () => {
  const outDir = path.join(KOK, 'videolar', TUR); fs.mkdirSync(outDir, { recursive: true });
  const ad = `${ID} - ${baslik.replace(/[\/\\:*?"<>|]/g, '').trim()}${tl.stil === 'yapaytu' ? ' (v2)' : tl.stil === 'v4' ? ' (v4)' : tl.stil === 'v5' ? ' (v5)' : tl.stil === 'v6' ? ' (v6)' : tl.stil === 's3' ? (() => { const v = (process.argv.find(a => a.startsWith('--tema=')) || '').slice(7) || '3'; return ` (sahne stil ${v.replace('karma', '6')} ${({ 1: 'Mavi Ferah', 2: 'Pastel Brutal', 3: 'Kağıt Serif', 4: 'Renkli Hap', 5: 'Turuncu Editoryal', karma: 'Karma' })[v]})`; })() : ''}${tl.temaAd ? ` (stil ${(process.argv.find(a => a.startsWith('--tema=')) || '').slice(7).replace('karma', '6')} ${tl.temaAd})` : ''}${process.argv.includes('--taslak') ? ' (taslak)' : ''}.mp4`;
  const outPath = path.join(outDir, ad);
  if (process.argv.includes('--sadece-meta')) { META_TXT(outDir, ad); console.error('✔ meta: ' + ad.replace(/\.mp4$/, '.txt')); return; }
  const tmp = path.join(outDir, `.${ID}.html`); fs.writeFileSync(tmp, html);
  const browser = await chromium.launch();
  const TASLAK = process.argv.includes('--taslak');   // test: yarım çözünürlük, 15 fps, hızlı kodlama (~5x hızlı)
  const FPS = TASLAK ? 15 : 30, n = Math.ceil(tl.duration * FPS), BLUR = process.argv.includes('--blur') && !TASLAK;   // --blur: 3 alt kare + tmix (gerçek hareket bulanıklığı)
  // paralel render: kareler PAR parçaya bölünür, her parça kendi sayfası + kodlayıcısıyla işlenir, sonra birleştirilir (kayıpsız kopya)
  const PAR = +((process.argv.find(a => a.startsWith('--par=')) || '').slice(6) || Math.max(1, Math.min(3, require('os').cpus().length - 1)));
  const segDir = path.join(KOK, 'veri', 'parca', ID + '_' + TUR); fs.rmSync(segDir, { recursive: true, force: true }); fs.mkdirSync(segDir, { recursive: true });
  const rapor = {}, Q = TASLAK ? 70 : 93; let bitti = 0;
  const parca = async (k) => {
    const a0 = Math.floor(n * k / PAR), a1 = Math.floor(n * (k + 1) / PAR), seg = path.join(segDir, `p${k}.mp4`);
    const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: TASLAK ? .5 : 1 });
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(BLUR ? FPS * 3 : FPS), '-i', '-',
      ...(BLUR ? ['-vf', `tmix=frames=3,select='eq(mod(n\\,3)\\,2)',setpts=N/(${FPS}*TB)`, '-r', String(FPS)] : []),
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '24', '-preset', TASLAK ? 'veryfast' : 'medium', '-tune', 'animation', '-threads', '2', seg], { stdio: ['pipe', 'inherit', 'inherit'] });
    const yaz = async () => { const buf = await p.screenshot({ type: 'jpeg', quality: Q }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); };
    for (let i = a0; i < a1; i++) {
      if (BLUR) { await p.evaluate(t => frame(t), Math.max(0, i / FPS - 1 / 240)); await yaz(); }
      await p.evaluate(t => frame(t), i / FPS);
      if (i % 15 === 0) { const r = await p.evaluate(t => kontrol(t), i / FPS); r.forEach(m => { (rapor[m] = rapor[m] || []).push((i / FPS).toFixed(1)); }); }
      await yaz();
      if (BLUR) { await p.evaluate(t => frame(t), i / FPS + 1 / 240); await yaz(); }
      if (++bitti % 90 === 0) process.stderr.write(`\r${ID} ${TUR}: ${bitti}/${n} (${PAR} paralel)`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); await p.close(); return seg;
  };
  const segler = await Promise.all(Array.from({ length: PAR }, (_, k) => parca(k)));
  fs.writeFileSync(path.join(segDir, 'liste.txt'), segler.map(f => `file '${f}'`).join('\n'));
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(segDir, 'liste.txt'), '-i', tl.audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', String(tl.duration), '-movflags', '+faststart', outPath]);
  fs.rmSync(segDir, { recursive: true, force: true });
  Object.values(rapor).forEach(v => v.sort((x, y) => x - y));
  await browser.close(); fs.unlinkSync(tmp);
  // --- KONTROL: görsel sorunlar, sessizlik, 2 fps kontrol görseli
  const kdir = path.join(KOK, 'kontrol'); fs.mkdirSync(kdir, { recursive: true });
  const kad = `${ID}_${TUR}`;
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', outPath, '-vf', `fps=2,scale=${KISA ? 160 : 320}:-1,tile=${KISA ? 12 : 8}x${Math.ceil(tl.duration * 2 / (KISA ? 12 : 8))}`, '-frames:v', '1', path.join(kdir, kad + '.jpg')]);
  const don = (require('child_process').spawnSync('ffmpeg', ['-i', outPath, '-vf', 'freezedetect=n=0.0015:d=1', '-map', '0:v', '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/freeze_start: [\d.]+/g) || []).map(x => (+x.split(': ')[1]).toFixed(1));
  console.error(don.length ? `  - DONMA (>1 sn hareketsiz): ${don.join(', ')} sn` : '  donma yok (her saniye hareket var)');
  const sil = (require('child_process').spawnSync('ffmpeg', ['-i', ses, '-af', 'silencedetect=n=-38dB:d=0.25', '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/silence_duration: [\d.]+/g) || []).length;
  const satir = Object.entries(rapor).map(([m, ts]) => `  - ${m} @ ${ts.slice(0, 6).join(', ')}${ts.length > 6 ? ' …' : ''}`);
  console.error(`KONTROL ${kad}: ${satir.length ? '\n' + satir.join('\n') : 'görsel sorun yok'}\n  sessizlik (>0.25 sn, seslendirmenin kendi duraklamaları): ${sil}\n  kontrol görseli: kontrol/${kad}.jpg`);
  fs.writeFileSync(path.join(outDir, `.${ID}.json`), JSON.stringify({ dosya: ad, baslik, sure: tl.duration }));
  if (process.argv.includes("--meta")) META_TXT(outDir, ad);   // .txt yalnızca istenirse
  console.error(`\n✔ ${outPath}`);
})();

// Bir videoyu üretir:  node scripts/video/uret.js VID_001 kisa|uzun
// Girdi: veri/senaryolar.csv, veri/ses/VID_001_short.mp3 | VID_001_uzun.mp3, planlar/VID_001_kisa.js
// Çıktı: cikti/kisa/VID_001 - <başlık>.mp4  |  cikti/uzun/VID_001 - <başlık>.mp4
const fs = require('fs'), path = require('path'), { execFileSync, spawn } = require('child_process');
const { chromium } = require('playwright');
const { sayfa } = (process.argv.includes('--stil=v4') ? require('./sayfa_v4') : require('./sayfa'));

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
const metin = satir[KISA ? 'shorts video tts' : 'uzun video tts'];
const baslik = satir[KISA ? 'shorts video başlığı' : 'uzun video başlığı'];
const AD = `${ID}_${KISA ? 'short' : 'uzun'}`;
const ham = path.join(KOK, 'veri', 'ses_ham', `${AD}.mp3`);
fs.mkdirSync(path.join(KOK, 'veri', 'ses'), { recursive: true });
const ses = path.join(KOK, 'veri', 'ses', `${AD}.wav`);
// hız + ses seviyesi (kısa: 1.25x; uzun: hook 1.25x, sonrası 1.00x)
const info = JSON.parse(execFileSync('python3', [path.join(__dirname, 'ses_hazirla.py'), ham, metin, TUR, ses]).toString());
console.error(`ses: ${info.ham_sure}s → ${info.sure}s` + (info.kesim ? ` (hook ${info.hook_kelime} kelime, ${info.kesim}s'de 1.00x'e geçiş)` : ' (1.25x)'));
const plan = require(path.join(KOK, 'planlar', `${ID}_${TUR}.js`));

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
if (tl.stil === 'yapaytu' || tl.stil === 'v3' || tl.stil === 'v4') L.mascot = KISA ? [370, 900, 330] : [1310, 440, 580];   // karakter sağ altta
const html = sayfa({ W, H, L, tl });
const META_TXT = (outDir, ad) => fs.writeFileSync(path.join(outDir, ad.replace(/\.mp4$/, '.txt')), require('./meta').yaz({ satir, kisa: KISA, basliklar: tl.basliklar, sure: tl.duration }));

(async () => {
  const outDir = path.join(KOK, 'videolar', TUR); fs.mkdirSync(outDir, { recursive: true });
  const ad = `${ID} - ${baslik.replace(/[\/\\:*?"<>|]/g, '').trim()}${tl.stil === 'yapaytu' ? ' (v2)' : tl.stil === 'v4' ? ' (v4)' : ''}.mp4`;
  const outPath = path.join(outDir, ad);
  if (process.argv.includes('--sadece-meta')) { META_TXT(outDir, ad); console.error('✔ meta: ' + ad.replace(/\.mp4$/, '.txt')); return; }
  const tmp = path.join(outDir, `.${ID}.html`); fs.writeFileSync(tmp, html);
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
  const FPS = 30, n = Math.ceil(tl.duration * FPS);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-i', tl.audio,
    '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '24', '-preset', 'slow', '-tune', 'animation', '-c:a', 'aac', '-b:a', '192k', '-t', String(tl.duration), '-movflags', '+faststart', outPath], { stdio: ['pipe', 'inherit', 'inherit'] });
  const rapor = {}, kareler = [];
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => frame(t), i / FPS);
    if (i % 15 === 0) { const r = await p.evaluate(t => kontrol(t), i / FPS); r.forEach(m => { (rapor[m] = rapor[m] || []).push((i / FPS).toFixed(1)); }); }
    const buf = await p.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 90 === 0) process.stderr.write(`\r${ID} ${TUR}: ${i}/${n}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close(); fs.unlinkSync(tmp);
  // --- KONTROL: görsel sorunlar, sessizlik, 2 fps kontrol görseli
  const kdir = path.join(KOK, 'kontrol'); fs.mkdirSync(kdir, { recursive: true });
  const kad = `${ID}_${TUR}`;
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', outPath, '-vf', `fps=2,scale=${KISA ? 160 : 320}:-1,tile=${KISA ? 12 : 8}x${Math.ceil(tl.duration * 2 / (KISA ? 12 : 8))}`, '-frames:v', '1', path.join(kdir, kad + '.jpg')]);
  const sil = (require('child_process').spawnSync('ffmpeg', ['-i', ses, '-af', 'silencedetect=n=-38dB:d=0.25', '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/silence_duration: [\d.]+/g) || []).length;
  const satir = Object.entries(rapor).map(([m, ts]) => `  - ${m} @ ${ts.slice(0, 6).join(', ')}${ts.length > 6 ? ' …' : ''}`);
  console.error(`KONTROL ${kad}: ${satir.length ? '\n' + satir.join('\n') : 'görsel sorun yok'}\n  sessizlik (>0.25 sn, seslendirmenin kendi duraklamaları): ${sil}\n  kontrol görseli: kontrol/${kad}.jpg`);
  fs.writeFileSync(path.join(outDir, `.${ID}.json`), JSON.stringify({ dosya: ad, baslik, sure: tl.duration }));
  if (process.argv.includes("--meta")) META_TXT(outDir, ad);   // .txt yalnızca istenirse
  console.error(`\n✔ ${outPath}`);
})();

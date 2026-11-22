// Demo: espeak-ng ile Türkçe ses üretir, dudak senkronu çıkarır, videoyu render eder.
// node scripts/dosya/demo.js  →  maskotlar/dosya/demo.mp4
// Gerçek videolarda espeak yerine senin ses dosyaların kullanılacak.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const out = path.join(__dirname, '..', '..', 'maskotlar', 'dosya');
const tmp = path.join(out, '.demo'); fs.mkdirSync(tmp, { recursive: true });

const SAHNE = [
  { metin: 'Merhaba, ben Dosya!', ifade: 'mutlu', jest: 'selam', baslik: ['MERHABA', 'BEN DOSYA'], zipla: .2 },
  { metin: 'Kira sözleşmeni imzalamadan önce, bunu bilmen lazım.', ifade: 'notr', jest: 'anlat', baslik: ['KİRA', 'SÖZLEŞMESİ'] },
  { metin: 'Ev sahibin depozitonu geri vermiyor mu?', ifade: 'dusunceli', jest: 'dusun', baslik: ['DEPOZİTO', 'GERİ GELMEDİ Mİ?'] },
  { metin: 'Eyvah! Bütün evraklar bende kaldı.', ifade: 'bitkin', jest: 'omuz', baslik: ['EYVAH', 'EVRAKLAR!'] },
  { metin: 'Sakın imzasız ödeme yapma!', ifade: 'kizgin', jest: 'dur', baslik: ['SAKIN', 'İMZASIZ ÖDEME!'] },
  { metin: 'Haklarını birlikte öğrenelim.', ifade: 'mutlu', jest: 'basparmak', baslik: ['HAKLARINI', 'ÖĞREN'] },
];

const tl = { cues: [], env: { rate: 100, values: [] }, ifade: [], jest: [], baslik: [], kelimeler: [], zipla: [], yuru: [] };
const parts = []; let t = .4;
const GAP = .45;
tl.ifade.push({ t: 0, ad: 'notr' }); tl.jest.push({ t: 0, ad: 'bekle' });
SAHNE.forEach((s, i) => {
  const wav = path.join(tmp, `s${i}.wav`);
  execFileSync('espeak-ng', ['-v', 'tr+m3', '-s', '150', '-p', '38', '-w', wav, s.metin]);
  const d = JSON.parse(execFileSync('python3', [path.join(__dirname, 'dudak.py'), wav, s.metin]).toString());
  tl.ifade.push({ t: t - .15, ad: s.ifade }); tl.jest.push({ t: t - .2, ad: s.jest });
  tl.baslik.push({ t: t - .15, ust: s.baslik[0], alt: s.baslik[1] });
  if (s.zipla != null) tl.zipla.push(t + s.zipla);
  d.cues.forEach(c => tl.cues.push({ t: +(t + c.t).toFixed(3), v: c.v }));
  // env: zaman çizelgesine yerleştir
  const start = Math.round(t * 100);
  while (tl.env.values.length < start) tl.env.values.push(0);
  d.env.values.forEach((v, k) => { tl.env.values[start + k] = v; });
  // kelime zamanları: konuşma süresine harf sayısına göre dağıt
  const words = s.metin.replace(/[,.!?]/g, '').split(/\s+/);
  const speech = d.cues.filter(c => c.v !== 'X');
  const t0 = speech.length ? speech[0].t : 0, t1 = d.cues[d.cues.length - 1].t;
  const L = words.reduce((a, w) => a + w.length, 0); let acc = 0;
  words.forEach(w => { tl.kelimeler.push({ k: w, t0: t + t0 + (t1 - t0) * acc / L, t1: t + t0 + (t1 - t0) * (acc + w.length) / L }); acc += w.length; });
  parts.push({ wav, start: t });
  t += d.duration + GAP;
});
tl.cues.push({ t: +(t - GAP + .05).toFixed(3), v: 'X' });
tl.ifade.push({ t: t - .1, ad: 'emin' }); tl.jest.push({ t: t - .1, ad: 'selam' });
tl.duration = t + 1.6;
// sesleri tek dosyada birleştir
const audio = path.join(tmp, 'ses.wav');
const filt = parts.map((p, i) => `[${i}:a]adelay=${Math.round(p.start * 1000)}|${Math.round(p.start * 1000)}[a${i}]`).join(';') + ';' + parts.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${parts.length}:normalize=0,apad=whole_dur=${tl.duration}[o]`;
execFileSync('ffmpeg', ['-y', '-v', 'error', ...parts.flatMap(p => ['-i', p.wav]), '-filter_complex', filt, '-map', '[o]', '-ar', '44100', audio]);
tl.audio = audio;
const tlPath = path.join(tmp, 'zaman.json');
fs.writeFileSync(tlPath, JSON.stringify(tl));
execFileSync('node', [path.join(__dirname, 'render.js'), tlPath, path.join(out, 'demo.mp4')], { stdio: 'inherit' });

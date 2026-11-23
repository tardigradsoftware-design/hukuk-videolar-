// YouTube kapak görseli (1280x720), video başına 3 varyant (Test et ve karşılaştır için).
// node scripts/video/kapak.js VID_XXX   →  videolar/uzun/kapak/VID_XXX_A.png, _B.png, _C.png
// Metinler planlar/VID_XXX_uzun.js içindeki `kapak` alanından: [{ yazi, vurgu, nesne }]
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const D = require('../dosya/dosya');
const KOK = path.join(__dirname, '..', '..');
const ID = process.argv[2];
const plan = require(path.join(KOK, 'planlar', `${ID}_uzun.js`));
const K = plan.kapak;
if (!K) { console.error(`${ID}: planda 'kapak' yok`); process.exit(1); }

const VAR = [
  { ad: 'A', bg: '#16181D', yazi: '#FFFFFF', kontur: '#FFFFFF', vurguBg: '#E8402F', vurguYazi: '#FFFFFF', ifade: 'saskin', jest: 'eller_yukari', desen: 'rgba(255,255,255,.07)' },
  { ad: 'B', bg: '#F6B92B', yazi: '#151515', kontur: '#FFFFFF', vurguBg: '#E8402F', vurguYazi: '#FFFFFF', ifade: 'korkmus', jest: 'omuz', desen: 'rgba(0,0,0,.08)' },
  { ad: 'C', bg: '#F4F4F2', yazi: '#151515', kontur: '#FFFFFF', vurguBg: '#E8402F', vurguYazi: '#FFFFFF', ifade: 'emin', jest: 'isaret', desen: 'rgba(0,0,0,.10)', serit: true },
];

function html(v, k) {
  const s = D.poz({ ifade: v.ifade, jest: v.jest });
  s.fx = Object.assign({}, s.fx, { soru: 0, ofke: 0, parilti: 0 });
  const maskot = D.svg(s, 'k' + v.ad, 640, 640).replace('<svg ', '<svg style="overflow:visible" ');
  const kelimeler = k.yazi.split(' ');
  const satirlar = []; let cur = '';
  kelimeler.forEach(w => { if ((cur + ' ' + w).trim().length > 11 && cur) { satirlar.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
  if (cur) satirlar.push(cur);
  const vurgu = (k.vurgu || '').toLocaleUpperCase('tr');
  const satirHTML = satirlar.map(st => `<div class="s">${st.split(' ').map(w => w.toLocaleUpperCase('tr').replace(/[?!]/g, '') === vurgu.replace(/[?!]/g, '') ? `<span class="v">${w}</span>` : w).join(' ')}</div>`).join('');
  const boy = satirlar.length <= 2 ? 132 : satirlar.length === 3 ? 108 : 90;
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>
  html,body{margin:0;width:1280px;height:720px;overflow:hidden;font-family:'Inter Display','Inter',sans-serif}
  #z{position:absolute;inset:0;background:${v.bg};background-image:radial-gradient(${v.desen} 2.2px,transparent 2.2px);background-size:30px 30px}
  ${v.serit ? '#serit{position:absolute;left:-40px;top:-60px;width:820px;height:900px;background:#E8402F;transform:skewX(-8deg);opacity:.0}' : ''}
  #metin{position:absolute;left:56px;top:46%;transform:translateY(-50%);width:700px}
  .s{font-weight:900;font-size:${boy}px;line-height:.98;letter-spacing:-.03em;color:${v.yazi};text-transform:uppercase;
     -webkit-text-stroke:${v.kontur === '#FFFFFF' ? 0 : 3}px ${v.kontur};paint-order:stroke fill;
     text-shadow:${v.kontur === '#FFFFFF' ? '0 0 0 transparent' : `8px 8px 0 ${v.kontur}`};margin:6px 0}
  .v{display:inline-block;background:${v.vurguBg};color:${v.vurguYazi};-webkit-text-stroke:0;text-shadow:none;padding:2px 18px 10px;border-radius:18px;transform:rotate(-2deg);box-shadow:8px 8px 0 #151515}
  #nesne{position:absolute;right:500px;bottom:40px;z-index:3;font-family:'Noto Color Emoji';font-size:150px;transform:rotate(-12deg);filter:drop-shadow(8px 8px 0 rgba(0,0,0,.35))}
  #m{position:absolute;right:-30px;bottom:-70px;width:640px;height:640px}
  #cer{position:absolute;inset:0;border:14px solid #151515;pointer-events:none}
  </style></head><body><div id="z"></div>${v.serit ? '<div id="serit"></div>' : ''}
  <div id="metin">${satirHTML}</div>${k.nesne ? `<div id="nesne">${k.nesne}</div>` : ''}<div id="m">${maskot}</div><div id="cer"></div></body></html>`;
}

(async () => {
  const out = path.join(KOK, 'videolar', 'uzun', 'kapak'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  for (let i = 0; i < VAR.length; i++) {
    const v = VAR[i], k = K[i % K.length];
    await p.setContent(html(v, k)); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `${ID}_${v.ad}.png`);
    await p.screenshot({ path: f });
    console.log('✔', path.relative(KOK, f), '—', k.yazi);
  }
  await b.close();
})();

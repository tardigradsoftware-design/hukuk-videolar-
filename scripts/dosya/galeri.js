// Dosya maskotu galerisi: ifadeler, ağız şekilleri, hareketler
// node scripts/dosya/galeri.js  →  maskotlar/dosya/galeri.html + svg/
const fs = require('fs'), path = require('path');
const D = require('./dosya');
const out = path.join(__dirname, '..', '..', 'maskotlar', 'dosya');
fs.mkdirSync(path.join(out, 'svg'), { recursive: true });

const IFADE_AD = { notr: 'Nötr', mutlu: 'Mutlu', bitkin: 'Bitkin (referans)', saskin: 'Şaşkın', kizgin: 'Kızgın', dusunceli: 'Düşünceli', korkmus: 'Korkmuş', emin: 'Kendinden emin', uzgun: 'Üzgün' };
const VIS_AD = { X: 'Sessiz', P: 'M · B · P', K: 'Ünsüzler (s,t,k,n,r…)', A: 'A', E: 'E', I: 'I · İ', O: 'O · Ö', U: 'U · Ü', F: 'F · V', L: 'L' };
const JEST_AD = { bekle: 'Bekle', selam: 'Selam', anlat: 'Anlatıyor', isaret: 'İşaret', yukari: 'Yukarı göster', omuz: 'Omuz silkme', basparmak: 'Başparmak', belde: 'Eller belde', dusun: 'Düşünüyor', eller_yukari: 'Eller yukarı', dur: 'Dur!' };
const JEST_IFADE = { selam: 'mutlu', anlat: 'notr', isaret: 'emin', yukari: 'emin', omuz: 'dusunceli', basparmak: 'mutlu', belde: 'kizgin', dusun: 'dusunceli', eller_yukari: 'saskin', dur: 'kizgin' };

let n = 0;
const card = (ad, s, file, vb) => { n++; let svg = D.svg(s, 'g' + n); if (vb) svg = svg.replace('viewBox="0 0 600 600"', `viewBox="${vb}"`).replace('height="600"', 'height="300"'); if (file) fs.writeFileSync(path.join(out, 'svg', file), svg); return `<div class="c">${svg}<b>${ad}</b></div>`; };
const sec = (title, cards) => `<h2>${title}</h2><div class="g">${cards.join('')}</div>`;

const html = `<!DOCTYPE html><html lang="tr"><meta charset="utf-8"><title>Dosya Maskotu</title>
<style>body{margin:0;padding:36px;background:#f4f4f2 radial-gradient(#d6d6d6 1.5px,transparent 1.5px) 0 0/22px 22px;font-family:Arial,sans-serif}
h1{margin:0 0 6px;font:900 46px Arial Black,Arial}h1 em{font-style:normal;color:#E8402F}h2{font:900 26px Arial Black,Arial;margin:34px 0 14px}
.g{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}.c{background:#fff;border:4px solid #1E1414;border-radius:18px;box-shadow:5px 5px 0 #1E1414;padding:6px 8px 12px;text-align:center}
.c svg{width:100%;height:auto}.c b{display:block;font:900 17px Arial Black,Arial}</style>
<h1>DOSYA <em>MASKOT</em></h1>
${sec('Mimikler', Object.keys(D.IFADE).map(k => card(IFADE_AD[k], D.poz({ ifade: k }), `ifade-${k}.svg`)))}
${sec('Hareketler', Object.keys(D.JEST).map(k => card(JEST_AD[k], D.poz({ ifade: JEST_IFADE[k] || 'notr', jest: k }), `jest-${k}.svg`)))}
<div class="v">${sec('Dudak senkronu: ağız şekilleri', Object.keys(D.VISEME).map(k => card(VIS_AD[k], D.poz({ viseme: k }), `agiz-${k}.svg`, '150 280 300 190')))}</div>
</html>`;
fs.writeFileSync(path.join(out, 'galeri.html'), html);
console.log('galeri yazıldı:', n, 'kart');

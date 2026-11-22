// Hukukçu görünüm seçenekleri: node scripts/dosya/hukukcu.js → maskotlar/dosya/hukukcu.png
const fs = require('fs'), path = require('path');
const D = require('./dosya');
const V = [
  ['A', 'Cübbe + beyaz yaka', { cubbe: true }],
  ['B', 'Cübbe + gözlük', { cubbe: true, gozluk: true }],
  ['C', 'Cübbe + rozet + kanun kitabı', { cubbe: true, rozet: true, kitap: true }],
  ['D', 'Cübbe + gözlük + evrak çantası', { cubbe: true, gozluk: true, canta: true }],
  ['E', 'Tam avukat', { cubbe: true, gozluk: true, rozet: true, kitap: true, canta: true }],
  ['F', 'Bordo cübbe + rozet', { cubbe: 'bordo', rozet: true }],
];
const cards = V.map(([k, ad, aks], i) => `<div class="c"><div class="n">${k}</div>${D.svg(D.poz({ ifade: i % 2 ? 'emin' : 'mutlu', aks }), 'h' + i)}<b>${ad}</b></div>`).join('');
const out = path.join(__dirname, '..', '..', 'maskotlar', 'dosya', 'hukukcu.html');
fs.writeFileSync(out, `<!DOCTYPE html><meta charset="utf-8"><style>body{margin:0;padding:28px;background:#f4f4f2;font-family:Arial}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.c{position:relative;background:#fff;border:4px solid #1E1414;border-radius:18px;box-shadow:5px 5px 0 #1E1414;padding:6px 8px 14px;text-align:center}.c svg{width:100%;height:auto}.c b{font:900 20px Arial Black,Arial}.n{position:absolute;top:10px;left:12px;background:#E8402F;color:#fff;font:900 20px Arial Black;padding:3px 12px;border-radius:8px;border:3px solid #1E1414}</style><div class="g">${cards}</div>`);

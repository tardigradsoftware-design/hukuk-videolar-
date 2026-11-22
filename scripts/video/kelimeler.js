// Plan yazarken kelime sıralarını gösterir: node scripts/video/kelimeler.js VID_001 kisa|uzun
const fs = require('fs'), path = require('path');
const [, , ID, TUR = 'kisa'] = process.argv;
const t = fs.readFileSync(path.join(__dirname, '..', '..', 'veri', 'senaryolar.csv'), 'utf8');
const m = t.split(/\n(?=VID_)/).find(r => r.startsWith(ID + ','));
const f = []; let q = false, c = '';
for (const ch of m) { if (ch === '"') q = !q; else if (ch === ',' && !q) { f.push(c); c = ''; } else c += ch; }
console.log(f[TUR === 'kisa' ? 1 : 2].split(/\s+/).map((w, i) => `${i}:${w}`).join(' '));

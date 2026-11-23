// Plan başlıklarını değiştirir: node scripts/video/baslik.js VID_XXX kisa|uzun 'ÜST|ALT' 'ÜST|ALT' ...  ('-' = değiştirme)
const fs = require('fs'), path = require('path');
const [, , ID, TUR, ...B] = process.argv;
const f = path.join(__dirname, '..', '..', 'planlar', `${ID}_${TUR}.js`);
const p = require(f);
B.forEach((b, i) => { if (b !== '-' && p.sahneler[i]) p.sahneler[i].baslik = b.split('|'); });
fs.writeFileSync(f, fs.readFileSync(f, 'utf8').split('\n')[0] + '\nmodule.exports = ' + JSON.stringify(p, null, 1) + ';\n');
p.sahneler.forEach(s => console.log('  ' + s.baslik.join(' / ')));

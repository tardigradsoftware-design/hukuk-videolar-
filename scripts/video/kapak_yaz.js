// Plana kapak metinlerini yazar: node scripts/video/kapak_yaz.js VID_XXX 'YAZI|VURGU|NESNE' x3
const fs = require('fs'), path = require('path');
const [, , ID, ...K] = process.argv;
const f = path.join(__dirname, '..', '..', 'planlar', `${ID}_uzun.js`);
const p = require(f);
p.kapak = K.map(k => { const [yazi, vurgu, nesne] = k.split('|'); return { yazi, vurgu, nesne }; });
fs.writeFileSync(f, fs.readFileSync(f, 'utf8').split('\n')[0].startsWith('//') ? fs.readFileSync(f, 'utf8').split('\n')[0] + '\nmodule.exports = ' + JSON.stringify(p, null, 1) + ';\n' : 'module.exports = ' + JSON.stringify(p, null, 1) + ';\n');

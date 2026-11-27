// Emoji → düz illüstrasyon (Microsoft Fluent Emoji Flat, MIT). Emoji karakteri ya da doğrudan ad ('money-bag') verilebilir.
const I = require('@iconify-json/fluent-emoji-flat/icons.json');
const ad = {}; require('emojibase-data/en/data.json').forEach(e => { ad[e.emoji] = e.label; ad[e.emoji.replace(/️/g, '')] = e.label; });
const anahtar = x => (ad[x] || ad[x.replace(/️/g, '')] || x).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function svg(x, boy = 96) {
  const ic = I.icons[anahtar(x)]; if (!ic) return '';
  const w = ic.width || I.width || 32, h = ic.height || I.height || 32;
  return `<svg class="il" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${boy}" height="${boy}">${ic.body}</svg>`;
}
// metindeki emojileri illüstrasyona çevir (bulunamayan emoji silinir: Noto emoji görünmez)
const RE = /(\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*|\p{Regional_Indicator}{2})/gu;
const degistir = (html, boy = 40) => html.replace(RE, m => svg(m, boy));
module.exports = { svg, degistir };

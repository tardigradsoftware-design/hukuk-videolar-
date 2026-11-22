// Tokmak maskotunun 6 varyasyonu: node scripts/tokmak.js
// Çıktı: maskotlar/tokmak/NN-ad.svg + maskotlar/tokmak/galeri.html
const fs = require('fs');
const path = require('path');
const { O, R, R2, CR, W, G, N, BR, GY, PK, S, S5, shadow, eyes, happyEyes, smile, openSmile, cheeks, hand, glasses, bowtie } = require('./stil');

const BRD = '#7E4A27';   // koyu ahşap
const BRL = '#C4844F';   // açık ahşap

// Tokmak başı: ortada gövde, iki uçta bilezikli başlık
function head({ cx = 200, cy = 140, w = 250, h = 120, fill = BR, cap = BRD, ring = G, grain = true }) {
  const cw = 34, x = cx - w / 2, y = cy - h / 2;
  return `<g id="head">
  <rect x="${x + cw - 6}" y="${y}" width="${w - 2 * cw + 12}" height="${h}" rx="${h * .28}" fill="${fill}" ${S}/>
  ${grain ? `<path d="M${cx + 46} ${y + h * .78} Q${cx + 70} ${y + h * .7} ${x + w - cw - 16} ${y + h * .78}" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round" opacity=".18"/>` : ''}
  <rect x="${x}" y="${y - 10}" width="${cw}" height="${h + 20}" rx="14" fill="${cap}" ${S}/>
  <rect x="${x + w - cw}" y="${y - 10}" width="${cw}" height="${h + 20}" rx="14" fill="${cap}" ${S}/>
  <rect x="${x + cw - 10}" y="${y - 4}" width="12" height="${h + 8}" rx="5" fill="${ring}" ${S5}/>
  <rect x="${x + w - cw - 2}" y="${y - 4}" width="12" height="${h + 8}" rx="5" fill="${ring}" ${S5}/>
  <path d="M${x + 8} ${y + 4} V${y + h - 4}" stroke="${W}" stroke-width="5" stroke-linecap="round" opacity=".35"/></g>`;
}
const handle = (y1, y2, fill = BR, w = 30) => `<rect x="${200 - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${w / 2 - 2}" fill="${fill}" ${S}/>`;
const arm = (x1, y1, x2, y2, f = BR) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 10} ${x2} ${y2}" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/><path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 10} ${x2} ${y2}" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round"/>${hand(x2, y2, f, 15)}`;
const feet = (f = BRD) => `<ellipse cx="172" cy="352" rx="24" ry="13" fill="${f}" ${S}/><ellipse cx="228" cy="352" rx="24" ry="13" fill="${f}" ${S}/>`;
const block = (y = 340, f = BRD) => `<ellipse cx="200" cy="${y + 14}" rx="120" ry="20" fill="${f}" ${S}/><path d="M80 ${y + 14} V${y} Q200 ${y - 34} 320 ${y} V${y + 14}" fill="${f}" ${S}/><ellipse cx="200" cy="${y}" rx="120" ry="20" fill="${BRL}" ${S}/>`;
const book = (x, y, a = -8) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 34}" y="${y - 40}" width="68" height="84" rx="8" fill="${R}" ${S5}/><path d="M${x - 24} ${y - 38} V${y + 42}" stroke="${R2}" stroke-width="6"/><rect x="${x - 16}" y="${y - 24}" width="40" height="14" rx="3" fill="${CR}"/></g>`;

const V = [];
const add = (slug, ad, aciklama, body) => V.push({ slug, ad, aciklama, body });

add('klasik', 'Klasik Tosun', 'Ahşap tokmak; sapı gövde, küçük ayaklı. Ana maskot adayı.', `
${shadow(150)}${feet()}
${handle(190, 352)}
${arm(186, 250, 132, 266)}${arm(214, 250, 268, 266)}
${head({})}
${eyes(200, 134, 60, 13)}${openSmile(200, 164, 30)}${cheeks(200, 160, 116)}`);

add('kirmizi', 'Kırmızı Tosun', 'Marka kırmızısı tokmak, altlığının üstünde el sallıyor.', `
${shadow(250)}${block(330)}
${handle(190, 334, BRD)}
${arm(186, 246, 140, 290, R)}${arm(214, 236, 336, 226, R)}
${head({ fill: R, cap: R2, grain: false })}
${eyes(200, 132, 62, 14)}${smile(200, 164, 30)}${cheeks(200, 158, 118)}`);

add('cubbeli', 'Cübbeli Tosun', 'Hakim cübbesi ve beyaz yakalı; elinde kanun kitabı.', `
${shadow(170)}${feet(O)}
<path d="M148 220 Q200 200 252 220 L276 350 H124 Z" fill="${O}" ${S}/>
<path d="M200 214 V350" stroke="#3a3a3a" stroke-width="4"/>
<path d="M176 210 L200 254 L224 210" fill="${W}" ${S5}/><path d="M200 254 V230" stroke="${O}" stroke-width="3"/>
${book(264, 280)}${hand(240, 296, BR, 15)}${hand(150, 290, BR, 15)}
${head({})}
${eyes(200, 132, 60, 13)}${smile(200, 162, 28)}${cheeks(200, 158, 116)}`);

add('ekran', 'Dijital Tosun', 'Ekran yüzlü teknolojik tokmak; yapay zekâ ve hukuk içerikleri için.', `
${shadow(150)}${feet(O)}
${handle(190, 352, O)}
${arm(186, 250, 134, 270, R)}${arm(214, 250, 266, 270, R)}
${head({ fill: R, cap: O, ring: G, grain: false })}
<rect x="138" y="100" width="124" height="80" rx="24" fill="${O}"/>
<g id="eyes"><rect x="164" y="122" width="16" height="30" rx="8" fill="${W}"/><rect x="220" y="122" width="16" height="30" rx="8" fill="${W}"/></g>
<path id="mouth" d="M190 164 Q200 170 210 164" fill="none" stroke="${R}" stroke-width="4" stroke-linecap="round"/>`);

add('karar', 'Karar Anı', 'Altlığa vurduğu an: hareket çizgileri, ağzı açık. "Karar verildi!" sahneleri için.', `
${shadow(250)}${block(326)}
<g stroke="${O}" stroke-width="6" stroke-linecap="round"><path d="M88 286 L60 270 M96 262 L74 236 M312 286 L340 270 M304 262 L326 236"/></g>
<g transform="rotate(-24 200 250)">
${handle(196, 318)}
${arm(186, 250, 140, 284)}${arm(214, 250, 262, 286)}
${head({ cy: 150 })}
${happyEyes(200, 140, 60, 13)}${openSmile(200, 166, 38)}${cheeks(200, 162, 118)}
</g>
<g fill="${G}" ${S5}><path d="M330 150 l8 -22 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 Z"/></g>`);

add('bilge', 'Bilge Tosun', 'Gözlüklü, papyonlu, bıyıklı; ağırbaşlı danışman havası.', `
${shadow(150)}${feet()}
${handle(190, 352)}
${bowtie(200, 214, R)}
${arm(186, 260, 132, 276)}${arm(214, 260, 270, 250)}
${head({ fill: BRL, cap: BR })}
${eyes(200, 134, 64, 11)}${glasses(200, 134, 64, 22)}
<path d="M174 166 Q186 154 200 164 Q214 154 226 166 Q212 174 200 168 Q188 174 174 166 Z" fill="${O}"/>
${cheeks(200, 162, 130)}`);

const outDir = path.join(__dirname, '..', 'maskotlar', 'tokmak');
fs.mkdirSync(outDir, { recursive: true });
const cards = V.map((m, i) => {
  const n = String(i + 1).padStart(2, '0');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">\n<!-- ${m.ad}: ${m.aciklama} -->\n${m.body.trim()}\n</svg>\n`;
  fs.writeFileSync(path.join(outDir, `${n}-${m.slug}.svg`), svg);
  return `<div class="c"><div class="n">T${n}</div>${svg}<b>${m.ad}</b><span>${m.aciklama}</span></div>`;
});
fs.writeFileSync(path.join(outDir, 'galeri.html'), `<!DOCTYPE html><html lang="tr"><meta charset="utf-8"><title>Tokmak Varyasyonları</title>
<style>body{margin:0;padding:40px;background:#f4f4f2 radial-gradient(#d6d6d6 1.5px,transparent 1.5px) 0 0/22px 22px;font-family:Arial,sans-serif}
h1{margin:0 0 30px;font:900 44px Arial Black,Arial}h1 em{font-style:normal;color:#F0442C}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.c{position:relative;background:#fff;border:4px solid #161616;border-radius:20px;box-shadow:6px 6px 0 #161616;padding:12px 16px 18px;text-align:center}
.c svg{width:100%;height:auto}.c b{display:block;font:900 22px Arial Black,Arial}.c span{display:block;font-size:14px;color:#555;margin-top:6px}
.n{position:absolute;top:10px;left:12px;background:#F0442C;color:#fff;font:900 15px Arial Black,Arial;padding:3px 9px;border-radius:8px;border:3px solid #161616}</style>
<h1>TOKMAK <em>TOSUN</em> · 6 VARYASYON</h1><div class="g">${cards.join('\n')}</div></html>`);
console.log(`${V.length} tokmak varyasyonu üretildi.`);

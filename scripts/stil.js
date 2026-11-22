// Ortak çizim stili ve yardımcılar (tüm maskotlar)
const O = '#161616', R = '#F0442C', R2 = '#C2321D', CR = '#FFF4DA', W = '#FFFFFF',
  G = '#F6B92B', N = '#26324F', GR = '#1E9E6A', BL = '#2F5BFF', SK = '#FFD2AE',
  BR = '#A8693E', GY = '#D9D9D9', PK = '#FF8A8A', PU = '#6B3FA0';
const S = `stroke="${O}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
const S5 = `stroke="${O}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;

const shadow = (w = 160) => `<ellipse cx="200" cy="374" rx="${w / 2}" ry="11" fill="#000" opacity=".13"/>`;
const eyes = (cx, cy, d = 38, r = 10) => `<g id="eyes">
  <circle cx="${cx - d / 2}" cy="${cy}" r="${r}" fill="${O}"/><circle cx="${cx + d / 2}" cy="${cy}" r="${r}" fill="${O}"/>
  <circle cx="${cx - d / 2 + r * .35}" cy="${cy - r * .35}" r="${r * .33}" fill="${W}"/><circle cx="${cx + d / 2 + r * .35}" cy="${cy - r * .35}" r="${r * .33}" fill="${W}"/></g>`;
const happyEyes = (cx, cy, d = 38, w = 11, c = O) => `<g id="eyes" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round">
  <path d="M${cx - d / 2 - w} ${cy + 4} Q${cx - d / 2} ${cy - 12} ${cx - d / 2 + w} ${cy + 4}"/>
  <path d="M${cx + d / 2 - w} ${cy + 4} Q${cx + d / 2} ${cy - 12} ${cx + d / 2 + w} ${cy + 4}"/></g>`;
const smile = (cx, cy, w = 20, c = O) => `<path id="mouth" d="M${cx - w / 2} ${cy} Q${cx} ${cy + w * .6} ${cx + w / 2} ${cy}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
const openSmile = (cx, cy, w = 26) => `<path id="mouth" d="M${cx - w / 2} ${cy} Q${cx} ${cy + w * .9} ${cx + w / 2} ${cy} Z" fill="${R2}" ${S5}/>`;
const cheeks = (cx, cy, d = 70) => `<ellipse cx="${cx - d / 2}" cy="${cy}" rx="10" ry="6" fill="${PK}" opacity=".7"/><ellipse cx="${cx + d / 2}" cy="${cy}" rx="10" ry="6" fill="${PK}" opacity=".7"/>`;
const hand = (x, y, f = R, r = 17) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${S}/>`;
const glasses = (cx, cy, d = 40, r = 17) => `<g fill="none" ${S5}><circle cx="${cx - d / 2}" cy="${cy}" r="${r}"/><circle cx="${cx + d / 2}" cy="${cy}" r="${r}"/><path d="M${cx - d / 2 + r} ${cy} H${cx + d / 2 - r}"/></g>`;
const gavel = (x, y, a = -30, s = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
  <rect x="-6" y="-4" width="12" height="70" rx="5" fill="${BR}" ${S5}/>
  <rect x="-30" y="-26" width="60" height="30" rx="8" fill="${BR}" ${S5}/>
  <rect x="-36" y="-29" width="10" height="36" rx="4" fill="${G}" ${S5}/><rect x="26" y="-29" width="10" height="36" rx="4" fill="${G}" ${S5}/></g>`;
const tie = (x, y, c = R) => `<path d="M${x - 10} ${y} H${x + 10} L${x + 6} ${y + 10} L${x + 14} ${y + 46} L${x} ${y + 60} L${x - 14} ${y + 46} L${x - 6} ${y + 10} Z" fill="${c}" ${S5}/>`;
const bowtie = (x, y, c = R) => `<path d="M${x} ${y} L${x - 26} ${y - 14} V${y + 14} Z M${x} ${y} L${x + 26} ${y - 14} V${y + 14} Z" fill="${c}" ${S5}/><circle cx="${x}" cy="${y}" r="7" fill="${c}" ${S5}/>`;
const scalesIcon = (x, y, s = 1, c = G) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round">
  <path d="M0 -22 V22 M-14 22 H14 M-24 -14 H24"/><path d="M-24 -14 L-32 4 H-16 Z M24 -14 L16 4 H32 Z" fill="${c}"/></g>`;
const legs = (x1, x2, y, f = R, h = 26) => `<rect x="${x1 - 13}" y="${y}" width="26" height="${h}" rx="10" fill="${f}" ${S}/><rect x="${x2 - 13}" y="${y}" width="26" height="${h}" rx="10" fill="${f}" ${S}/>`;
const screenFace = (x, y, w, h, happy = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * .32}" fill="${O}"/>` +
  (happy ? happyEyes(x + w / 2, y + h / 2, w * .36, 10, W)
    : `<g id="eyes"><rect x="${x + w * .3 - 8}" y="${y + h / 2 - 16}" width="16" height="30" rx="8" fill="${W}"/><rect x="${x + w * .7 - 8}" y="${y + h / 2 - 16}" width="16" height="30" rx="8" fill="${W}"/></g>`);

module.exports = { O, R, R2, CR, W, G, N, GR, BL, SK, BR, GY, PK, PU, S, S5, shadow, eyes, happyEyes, smile, openSmile, cheeks, hand, glasses, gavel, tie, bowtie, scalesIcon, legs, screenFace };

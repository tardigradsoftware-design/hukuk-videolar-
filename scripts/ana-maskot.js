// Ana maskot (referans: maskotlar/ana/referans.png) — birebir vektör + ifade/poz seti
// node scripts/ana-maskot.js  →  maskotlar/ana/*.svg + galeri.html
const fs = require('fs');
const path = require('path');

const K = {
  line: '#121212', top: '#C3834C', low: '#A66839', cap: '#784B28', gold: '#F5BD2C',
  cheek: '#FF9595', hand: '#A66839', shadow: '#000',
};
const st = w => `stroke="${K.line}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// ---- parçalar (640x640 tuval) ----
const shadow = () => `<ellipse id="shadow" cx="320" cy="578" rx="157" ry="12.5" fill="${K.shadow}" opacity=".13"/>`;

const legs = () => `<g id="legs">
  <rect x="278" y="440" width="14" height="92" fill="${K.line}"/>
  <rect x="349" y="440" width="14" height="92" fill="${K.line}"/>
  <rect x="244" y="526" width="62" height="33" rx="16.5" fill="${K.line}"/>
  <rect x="335" y="526" width="63" height="33" rx="16.5" fill="${K.line}"/>
</g>`;

const handle = () => `<rect id="handle" x="302.5" y="225" width="36" height="226" rx="16" fill="${K.low}" ${st(9)}/>`;

const head = () => `<g id="head">
  <rect x="140" y="43" width="360" height="194" fill="${K.low}"/>
  <rect x="140" y="43" width="360" height="60" fill="${K.top}"/>
  <rect x="177" y="43" width="15" height="194" fill="${K.gold}"/>
  <rect x="447" y="43" width="15" height="194" fill="${K.gold}"/>
  <rect x="140" y="43" width="360" height="194" fill="none" ${st(8)}/>
  <rect x="100" y="31" width="56.5" height="217.5" rx="27" fill="${K.cap}" ${st(10)}/>
  <rect x="484.5" y="31" width="56" height="217.5" rx="27" fill="${K.cap}" ${st(10)}/>
</g>`;

// kol: kapaktan ele düz çizgi (referanstaki gibi ince)
function arm(id, sx, sy, ex, ey) {
  return `<g id="${id}">
  <path d="M${sx} ${sy} L${ex} ${ey}" stroke="${K.line}" stroke-width="9" stroke-linecap="round"/>
  <circle cx="${ex}" cy="${ey}" r="17" fill="${K.hand}" ${st(9)}/>
</g>`;
}
// omuz: el yukarıdaysa kapağın üst kısmından, aşağıdaysa alt kısmından çıkar
const shoulder = (side, ey) => [side === 'l' ? 98 : 542, ey < 150 ? 104 : 184];
const ARMS = {
  // referans pozu: sol aşağıda, sağ yukarıda el sallıyor
  merhaba: [[58, 219], [582, 68]],
  yanlar: [[56, 230], [584, 230]],
  ikiYukari: [[56, 60], [584, 60]],
  isaret: [[58, 219], [606, 150]],
  belde: [[70, 250], [570, 250]],
};

// ---- yüz ----
const EYE = [[272.5, 124], [367.5, 124]];
const BROW = [[246, 293, 69], [346, 393, 69]];
const TILT = [3, -2, -2, 3]; // referanstaki hafif eğim
function brows(kind = 'normal') {
  const [l, r] = BROW;
  const d = { normal: [0, 0, 0, 0], kalkik: [-10, -10, -10, -10], kizgin: [-4, 8, 8, -4], uzgun: [8, -4, -4, 8], soru: [-12, -12, 0, 0] }[kind];
  return `<g id="brows" stroke="${K.line}" stroke-width="10" stroke-linecap="butt">
  <path d="M${l[0]} ${l[2] + d[0] + TILT[0]} L${l[1]} ${l[2] + d[1] + TILT[1]}"/><path d="M${r[0]} ${r[2] + d[2] + TILT[2]} L${r[1]} ${r[2] + d[3] + TILT[3]}"/></g>`;
}
function eyes(kind = 'normal') {
  const open = ([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14.5" ry="21" fill="${K.line}"/><circle cx="${x + 5}" cy="${y - 11}" r="4.5" fill="#fff"/>`;
  const closed = ([x, y]) => `<path d="M${x - 14} ${y + 2} Q${x} ${y - 14} ${x + 14} ${y + 2}" fill="none" stroke="${K.line}" stroke-width="8" stroke-linecap="round"/>`;
  const blink = ([x, y]) => `<path d="M${x - 14} ${y + 4} H${x + 14}" stroke="${K.line}" stroke-width="8" stroke-linecap="round"/>`;
  const big = ([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="25" fill="${K.line}"/><circle cx="${x + 6}" cy="${y - 13}" r="5.5" fill="#fff"/>`;
  const m = {
    normal: EYE.map(open), mutlu: EYE.map(closed), kirp: EYE.map(blink),
    gozkirp: [open(EYE[0]), closed(EYE[1])], sasirmis: EYE.map(big),
  }[kind];
  return `<g id="eyes">${m.join('')}</g>`;
}
function mouth(kind = 'gulumse') {
  const m = {
    gulumse: `<path d="M302 197 Q320 210 338 197" fill="none" stroke="${K.line}" stroke-width="10" stroke-linecap="round"/>`,
    acik: `<path d="M300 193 Q320 226 340 193 Z" fill="${K.line}" ${st(6)}/>`,
    konus: `<ellipse cx="320" cy="203" rx="12" ry="10" fill="${K.line}"/>`,
    o: `<ellipse cx="320" cy="205" rx="9" ry="12" fill="${K.line}"/>`,
    duz: `<path d="M305 203 H335" stroke="${K.line}" stroke-width="10" stroke-linecap="round"/>`,
    uzgun: `<path d="M302 209 Q320 195 338 209" fill="none" stroke="${K.line}" stroke-width="10" stroke-linecap="round"/>`,
  }[kind];
  return `<g id="mouth">${m}</g>`;
}
const cheeks = () => `<g id="cheeks"><ellipse cx="249" cy="164.5" rx="17" ry="10" fill="${K.cheek}"/><ellipse cx="391" cy="164.5" rx="17" ry="10" fill="${K.cheek}"/></g>`;

function mascot({ arms = 'merhaba', brow = 'normal', eye = 'normal', mth = 'gulumse', extra = '' } = {}) {
  const [L, R] = ARMS[arms];
  return [shadow(), legs(), handle(), arm('arm-l', ...shoulder('l', L[1]), ...L), arm('arm-r', ...shoulder('r', R[1]), ...R),
    head(), cheeks(), brows(brow), eyes(eye), mouth(mth), extra].join('\n');
}
const wrap = (body, note) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">\n<!-- ${note} -->\n${body}\n</svg>\n`;

// ---- set ----
const SET = [
  ['ana', 'Ana (referans)', 'Varsayılan: el sallıyor, gülümsüyor', {}],
  ['konusuyor', 'Konuşuyor', 'Seslendirme sırasında ağız açık kare', { mth: 'konus' }],
  ['goz-kirpma', 'Göz kırpma', 'Animasyon: göz kırpma karesi', { eye: 'kirp' }],
  ['mutlu', 'Mutlu', 'Güzel haber, çözüm', { arms: 'ikiYukari', eye: 'mutlu', mth: 'acik', brow: 'kalkik' }],
  ['saskin', 'Şaşkın', '"Bunu bilmiyordun!"', { arms: 'ikiYukari', eye: 'sasirmis', mth: 'o', brow: 'kalkik' }],
  ['anlatiyor', 'Anlatıyor', 'İçeriği işaret eder', { arms: 'isaret', mth: 'konus', brow: 'kalkik' }],
  ['dusunuyor', 'Düşünüyor', '"Peki bu yasal mı?"', { arms: 'belde', brow: 'soru', mth: 'duz' }],
  ['kizgin', 'Ciddi / Uyarı', 'Cezalar, "sakın yapma"', { arms: 'belde', brow: 'kizgin', mth: 'duz' }],
  ['uzgun', 'Üzgün', 'Hak kaybı, kötü senaryo', { arms: 'yanlar', brow: 'uzgun', mth: 'uzgun' }],
  ['goz-kirpan', 'Göz kırpan', 'Kapanış, "takip et"', { eye: 'gozkirp', mth: 'acik' }],
];
const out = path.join(__dirname, '..', 'maskotlar', 'ana');
fs.mkdirSync(out, { recursive: true });
const cards = SET.map(([slug, ad, not, o], i) => {
  const n = String(i + 1).padStart(2, '0');
  const svg = wrap(mascot(o), `Ana maskot — ${ad}: ${not}`);
  fs.writeFileSync(path.join(out, `${n}-${slug}.svg`), svg);
  return `<div class="c"><div class="n">${n}</div>${svg}<b>${ad}</b><span>${not}</span></div>`;
});
fs.writeFileSync(path.join(out, 'galeri.html'), `<!DOCTYPE html><html lang="tr"><meta charset="utf-8"><title>Ana Maskot</title>
<style>body{margin:0;padding:40px;background:#f4f4f2 radial-gradient(#d6d6d6 1.5px,transparent 1.5px) 0 0/22px 22px;font-family:Arial,sans-serif}
h1{margin:0 0 30px;font:900 44px Arial Black,Arial}h1 em{font-style:normal;color:#F0442C}
.g{display:grid;grid-template-columns:repeat(5,1fr);gap:22px}.c{position:relative;background:#fff;border:4px solid #121212;border-radius:20px;box-shadow:6px 6px 0 #121212;padding:40px 12px 16px;text-align:center}
.c svg{width:100%;height:auto}.c b{display:block;font:900 19px Arial Black,Arial}.c span{display:block;font-size:13px;color:#555;margin-top:4px}
.n{position:absolute;top:10px;left:12px;background:#F0442C;color:#fff;font:900 15px Arial Black,Arial;padding:3px 9px;border-radius:8px;border:3px solid #121212}</style>
<h1>ANA <em>MASKOT</em> · İFADE SETİ</h1><div class="g">${cards.join('\n')}</div></html>`);
module.exports = { mascot, wrap };
console.log(`${SET.length} dosya üretildi.`);

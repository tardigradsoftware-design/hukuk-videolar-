// Ana maskot (referans: maskotlar/ana/referans.png) — birebir vektör + ifade/poz seti
// node scripts/ana-maskot.js  →  maskotlar/ana/*.svg + galeri.html
const fs = require('fs');
const path = require('path');

const K = {
  line: '#121212', top: '#C3834C', low: '#A66839', cap: '#784B28', gold: '#F5BD2C',
  cheek: '#FF9595', hand: '#A66839', shadow: '#000',
  face: '#FFFFFF', // yüz organları (göz, kaş, ağız, bıyık) beyaz
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
  return `<g id="brows" stroke="${K.face}" stroke-width="10" stroke-linecap="butt">
  <path d="M${l[0]} ${l[2] + d[0] + TILT[0]} L${l[1]} ${l[2] + d[1] + TILT[1]}"/><path d="M${r[0]} ${r[2] + d[2] + TILT[2]} L${r[1]} ${r[2] + d[3] + TILT[3]}"/></g>`;
}
function eyes(kind = 'normal') {
  const open = ([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14.5" ry="21" fill="${K.face}"/>`;
  const closed = ([x, y]) => `<path d="M${x - 14} ${y + 2} Q${x} ${y - 14} ${x + 14} ${y + 2}" fill="none" stroke="${K.face}" stroke-width="8" stroke-linecap="round"/>`;
  const blink = ([x, y]) => `<path d="M${x - 14} ${y + 4} H${x + 14}" stroke="${K.face}" stroke-width="8" stroke-linecap="round"/>`;
  const big = ([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="25" fill="${K.face}"/>`;
  const m = {
    normal: EYE.map(open), mutlu: EYE.map(closed), kirp: EYE.map(blink),
    gozkirp: [open(EYE[0]), closed(EYE[1])], sasirmis: EYE.map(big),
  }[kind];
  return `<g id="eyes">${m.join('')}</g>`;
}
function mouth(kind = 'gulumse') {
  const m = {
    gulumse: `<path d="M302 197 Q320 210 338 197" fill="none" stroke="${K.face}" stroke-width="10" stroke-linecap="round"/>`,
    acik: `<path d="M300 193 Q320 226 340 193 Z" fill="${K.face}"/>`,
    konus: `<ellipse cx="320" cy="203" rx="12" ry="10" fill="${K.face}"/>`,
    o: `<ellipse cx="320" cy="205" rx="9" ry="12" fill="${K.face}"/>`,
    duz: `<path d="M305 203 H335" stroke="${K.face}" stroke-width="10" stroke-linecap="round"/>`,
    uzgun: `<path d="M302 209 Q320 195 338 209" fill="none" stroke="${K.face}" stroke-width="10" stroke-linecap="round"/>`,
  }[kind];
  return `<g id="mouth">${m}</g>`;
}
const cheeks = () => `<g id="cheeks"><ellipse cx="249" cy="164.5" rx="17" ry="10" fill="${K.cheek}"/><ellipse cx="391" cy="164.5" rx="17" ry="10" fill="${K.cheek}"/></g>`;

// ---- erkek detayları ----
const collar = () => `<g id="collar" transform="translate(320.5 238) scale(1.7) translate(-320.5 -238)"><path d="M300 236 L320 262 L292 270 Z M341 236 L321 262 L349 270 Z" fill="#fff" ${st(6)}/></g>`;
const necktie = (c = '#D6322A') => `<g id="tie" transform="translate(320.5 244) scale(1.5) translate(-320.5 -244)">
  <path d="M311 244 H330 L327 262 H314 Z" fill="${c}" ${st(6)}/>
  <path d="M314 262 H327 L337 322 L320.5 340 L304 322 Z" fill="${c}" ${st(6)}/>
  <path d="M316 280 L333 298" stroke="#fff" stroke-width="4" opacity=".35"/></g>`;
const bowtie = (c = '#D6322A') => `<g id="bowtie" transform="translate(320.5 268) scale(1.5) translate(-320.5 -252)">
  <path d="M320 252 L284 234 V272 Z M321 252 L357 234 V272 Z" fill="${c}" ${st(6)}/>
  <rect x="309" y="241" width="23" height="22" rx="6" fill="${c}" ${st(6)}/></g>`;
const mustache = () => `<g id="mustache" transform="translate(320 176) scale(1.05 .9) translate(-320 -184)"><path d="M320 178 Q304 168 290 174 Q280 180 284 190 Q292 184 302 188 Q312 192 320 186 Q328 192 338 188 Q348 184 356 190 Q360 180 350 174 Q336 168 320 178 Z" fill="${K.face}"/></g>`;

function mascot({ arms = 'merhaba', brow = 'normal', eye = 'normal', mth = 'gulumse', extra = '', giyim = null, biyik = false, yanak = true } = {}) {
  const [L, R] = ARMS[arms];
  return [shadow(), legs(), handle(), arm('arm-l', ...shoulder('l', L[1]), ...L), arm('arm-r', ...shoulder('r', R[1]), ...R),
    giyim === 'kravat' ? collar() + necktie() : '', giyim === 'papyon' ? bowtie() : '',
    head(), yanak ? cheeks() : '', `<g id="face" filter="url(#kontur)">`, brows(brow), eyes(eye), biyik ? mustache() : '', mouth(mth), '</g>', extra].join('\n');
}
// beyaz yüz organlarının çevresine ince siyah kontur
const DEFS = `<defs><filter id="kontur" x="-20%" y="-20%" width="140%" height="140%">
  <feMorphology in="SourceAlpha" operator="dilate" radius="3.5" result="d"/>
  <feFlood flood-color="${K.line}"/><feComposite in2="d" operator="in" result="o"/>
  <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
const wrap = (body, note) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">\n<!-- ${note} -->\n${DEFS}\n${body}\n</svg>\n`;

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

if (process.argv[2] === 'erkek') {
  const V = [
    ['A', 'Kravatlı', { giyim: 'kravat' }],
    ['B', 'Kravat + bıyık', { giyim: 'kravat', biyik: true, yanak: false }],
    ['C', 'Papyon + bıyık', { giyim: 'papyon', biyik: true, yanak: false }],
    ['D', 'Papyonlu', { giyim: 'papyon', yanak: false }],
  ];
  const html = V.map(([k, ad, o]) => `<div class="c"><div class="n">${k}</div>${wrap(mascot(o), ad)}<b>${ad}</b></div>`).join('');
  fs.writeFileSync(path.join(out, 'erkek-secenekler.html'), `<!DOCTYPE html><meta charset="utf-8"><style>body{margin:0;padding:30px;background:#f4f4f2;font-family:Arial}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.c{position:relative;background:#fff;border:4px solid #121212;border-radius:20px;box-shadow:6px 6px 0 #121212;padding:40px 10px 14px;text-align:center}.c svg{width:100%;height:auto}.c b{font:900 22px Arial Black,Arial}.n{position:absolute;top:10px;left:12px;background:#F0442C;color:#fff;font:900 18px Arial Black;padding:3px 11px;border-radius:8px;border:3px solid #121212}</style><div class="g">${html}</div>`);
}
console.log(`${SET.length} dosya üretildi.`);

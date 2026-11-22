// Tokmak Tosun — ana maskot, poz seti: node scripts/tosun.js
// Çıktı: maskotlar/tosun/NN-poz.svg + galeri.html
const fs = require('fs');
const path = require('path');

const O = '#1A1A1A';
const C = {
  woodTop: '#C98A55', wood: '#A8693E', woodDark: '#7A4524', capHi: '#9A5B33',
  gold: '#F6B92B', goldHi: '#FFE08A', cheek: '#FF8E8E', red: '#F0442C', green: '#1E9E6A',
  white: '#FFFFFF', blue: '#4FA8FF', mouth: '#7A1F14', tongue: '#FF6B5E',
};
const st = (w = 6) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// ---------- parçalar ----------
const shadow = () => `<ellipse cx="200" cy="384" rx="84" ry="10" fill="#000" opacity=".12"/>`;

function head() {
  return `<g id="head">
  <rect x="100" y="66" width="200" height="104" rx="20" fill="${C.wood}"/>
  <rect x="100" y="66" width="200" height="44" rx="20" fill="${C.woodTop}"/>
  <rect x="100" y="96" width="200" height="14" fill="${C.woodTop}"/>
  <path d="M150 160 Q176 155 198 160 M232 162 Q248 158 262 162" fill="none" stroke="${C.woodDark}" stroke-width="3.5" stroke-linecap="round" opacity=".45"/>
  <rect x="100" y="66" width="200" height="104" rx="20" fill="none" ${st(7)}/>
  <rect x="112" y="64" width="13" height="108" rx="4" fill="${C.gold}" ${st(5)}/>
  <rect x="275" y="64" width="13" height="108" rx="4" fill="${C.gold}" ${st(5)}/>
  <path d="M116 72 V100 M279 72 V100" stroke="${C.goldHi}" stroke-width="3" stroke-linecap="round"/>
  ${[66, 294].map(x => `
  <rect x="${x}" y="54" width="40" height="128" rx="17" fill="${C.woodDark}" ${st(7)}/>
  <rect x="${x + 8}" y="64" width="7" height="58" rx="3.5" fill="${C.capHi}"/>`).join('')}
  </g>`;
}

function body() {
  return `<g id="body">
  <rect x="188" y="168" width="24" height="122" rx="11" fill="${C.wood}" ${st(6)}/>
  <rect x="194" y="176" width="5" height="70" rx="2.5" fill="${C.woodTop}"/>
  <path d="M190 172 H210" stroke="${O}" stroke-width="4" opacity=".25"/>
  </g>`;
}

function legs(pose = 'stand') {
  const L = pose === 'jump' ? [[192, 284, 170, 334], [208, 284, 232, 330]] : [[193, 284, 180, 348], [207, 284, 220, 348]];
  const shoe = (x, y, dir) => `
  <path d="M${x - 16 * (dir < 0 ? 1.35 : 1)} ${y + 12} Q${x - 18 * (dir < 0 ? 1.35 : 1)} ${y - 6} ${x} ${y - 6} Q${x + 18 * (dir > 0 ? 1.35 : 1)} ${y - 6} ${x + 18 * (dir > 0 ? 1.35 : 1)} ${y + 12} Z" fill="${O}" ${st(4)}/>
  <path d="M${x - 6 + dir * 6} ${y - 1} Q${x + dir * 10} ${y - 3} ${x + dir * 16} ${y + 2}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;
  return `<g id="legs">
  ${L.map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2 - 6}" stroke="${O}" stroke-width="9" stroke-linecap="round"/>`).join('')}
  ${shoe(L[0][2], L[0][3], -1)}${shoe(L[1][2], L[1][3], 1)}
  </g>`;
}

// kol: omuzdan (kapak dışı) eğri ile ele
function arm(side, cx, cy, ex, ey) {
  const sx = side === 'l' ? 68 : 332, sy = 132;
  return `<g id="arm-${side}">
  <path d="M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}" fill="none" stroke="${O}" stroke-width="11" stroke-linecap="round"/>
  <path d="M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}" fill="none" stroke="${C.woodDark}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="${ex}" cy="${ey}" r="15" fill="${C.wood}" ${st(6)}/>
  <circle cx="${ex - 5}" cy="${ey - 5}" r="4" fill="${C.woodTop}"/>
  </g>`;
}

// ---------- yüz ----------
const EX = [170, 230], EY = 118;
function brows(kind) {
  const t = { normal: [0, 0, 0], up: [-8, -8, 0], worry: [-6, -6, 1], angry: [2, 2, -1], think: [-10, 0, 0], happy: [-4, -4, 0] }[kind];
  const [dl, dr, tilt] = t;
  const b = (x, d, s) => `<path d="M${x - 13} ${98 + d + tilt * 6 * s} Q${x} ${92 + d} ${x + 13} ${98 + d - tilt * 6 * s}" fill="none" stroke="${O}" stroke-width="6.5" stroke-linecap="round"/>`;
  return `<g id="brows">${b(EX[0], dl, -1)}${b(EX[1], dr, 1)}</g>`;
}
function eyes(kind) {
  const open = (x, dx = 0, dy = 0) => `<ellipse cx="${x + dx}" cy="${EY + dy}" rx="8.5" ry="11.5" fill="${O}"/><circle cx="${x + dx + 3}" cy="${EY + dy - 4.5}" r="3.6" fill="#fff"/><circle cx="${x + dx - 3}" cy="${EY + dy + 5}" r="1.6" fill="#fff"/>`;
  const arc = x => `<path d="M${x - 11} ${EY + 3} Q${x} ${EY - 11} ${x + 11} ${EY + 3}" fill="none" stroke="${O}" stroke-width="6.5" stroke-linecap="round"/>`;
  const wide = x => `<circle cx="${x}" cy="${EY}" r="14" fill="#fff" ${st(5)}/><circle cx="${x}" cy="${EY + 1}" r="6.5" fill="${O}"/><circle cx="${x + 2}" cy="${EY - 2}" r="2" fill="#fff"/>`;
  const g = {
    normal: open(EX[0]) + open(EX[1]),
    happy: arc(EX[0]) + arc(EX[1]),
    wide: wide(EX[0]) + wide(EX[1]),
    wink: open(EX[0]) + arc(EX[1]),
    up: open(EX[0], 3, -3) + open(EX[1], 3, -3),
    side: open(EX[0], 4) + open(EX[1], 4),
  }[kind];
  return `<g id="eyes">${g}</g>`;
}
function mouth(kind) {
  const m = {
    smile: `<path d="M188 146 Q200 157 212 146" fill="none" stroke="${O}" stroke-width="6" stroke-linecap="round"/>`,
    big: `<path d="M184 143 Q200 168 216 143 Z" fill="${C.mouth}" ${st(5)}/><path d="M192 154 Q200 150 208 154 Q204 161 200 161 Q196 161 192 154 Z" fill="${C.tongue}"/>`,
    talk: `<ellipse cx="200" cy="150" rx="10" ry="8" fill="${C.mouth}" ${st(5)}/><path d="M194 153 Q200 150 206 153" stroke="${C.tongue}" stroke-width="4" stroke-linecap="round"/>`,
    o: `<ellipse cx="200" cy="152" rx="7" ry="9" fill="${C.mouth}" ${st(5)}/>`,
    flat: `<path d="M190 150 H210" stroke="${O}" stroke-width="6" stroke-linecap="round"/>`,
    smirk: `<path d="M188 150 Q202 154 213 143" fill="none" stroke="${O}" stroke-width="6" stroke-linecap="round"/>`,
  }[kind];
  return `<g id="mouth">${m}</g>`;
}
const cheeks = (o = .75) => `<g id="cheeks" opacity="${o}"><ellipse cx="148" cy="138" rx="11" ry="6.5" fill="${C.cheek}"/><ellipse cx="252" cy="138" rx="11" ry="6.5" fill="${C.cheek}"/></g>`;

// ---------- aksesuarlar ----------
const wave = (x, y) => `<g stroke="${O}" stroke-width="5" stroke-linecap="round" fill="none"><path d="M${x + 22} ${y - 26} q8 8 6 18"/><path d="M${x + 32} ${y - 36} q12 12 9 28"/></g>`;
const question = (x, y) => `<g><circle cx="${x}" cy="${y}" r="26" fill="#fff" ${st(5)}/><path d="M${x - 20} ${y + 18} l-10 12 l18 -4" fill="#fff" ${st(5)}/><circle cx="${x}" cy="${y}" r="22" fill="#fff"/><text x="${x}" y="${y + 12}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="34" fill="${C.red}">?</text></g>`;
const sweat = (x, y) => `<path d="M${x} ${y} Q${x + 12} ${y + 16} ${x + 6} ${y + 24} Q${x} ${y + 30} ${x - 6} ${y + 24} Q${x - 12} ${y + 16} ${x} ${y} Z" fill="${C.blue}" ${st(4)}/>`;
const sign = (x, y) => `<g><path d="M${x} ${y} V${y - 46}" ${st(6)}/><rect x="${x - 34}" y="${y - 96}" width="68" height="56" rx="12" fill="${C.red}" ${st(6)}/><text x="${x}" y="${y - 54}" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="38" fill="#fff">!</text></g>`;
const check = (x, y) => `<g><circle cx="${x}" cy="${y}" r="26" fill="${C.green}" ${st(6)}/><path d="M${x - 12} ${y + 1} l8 9 l16 -18" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const spark = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z" fill="${C.gold}" ${st(4)}/>`;
const lines = (x, y) => `<g stroke="${O}" stroke-width="5" stroke-linecap="round"><path d="M${x} ${y - 16} h16 M${x + 4} ${y} h22 M${x} ${y + 16} h16"/></g>`;

// ---------- pozlar ----------
const P = [];
const pose = (slug, ad, kullanim, o) => P.push({ slug, ad, kullanim, ...o });

pose('merhaba', 'Merhaba', 'Açılış, selamlama, "takip et" kapanışı', {
  arms: [['l', 40, 160, 46, 214], ['r', 372, 120, 360, 64]], brows: 'happy', eyes: 'normal', mouth: 'big',
  extra: wave(360, 64),
});
pose('anlatiyor', 'Anlatıyor', 'Konu anlatırken içeriği işaret eder (varsayılan konuşma pozu)', {
  arms: [['l', 46, 170, 60, 220], ['r', 360, 140, 382, 168]], brows: 'up', eyes: 'side', mouth: 'talk',
  extra: '',
});
pose('dusunuyor', 'Düşünüyor', '"Peki bu yasal mı?" soru anları', {
  arms: [['l', 70, 236, 198, 184], ['r', 356, 176, 346, 226]], brows: 'think', eyes: 'up', mouth: 'smirk',
  extra: question(352, 34), back: ['l'],
});
pose('saskin', 'Şaşkın', 'Şok edici bilgi, "bunu bilmiyordun!" anları', {
  arms: [['l', 26, 90, 40, 52], ['r', 374, 90, 360, 52]], brows: 'worry', eyes: 'wide', mouth: 'o', cheeks: .35,
  extra: sweat(318, 30), legs: 'jump',
});
pose('dikkat', 'Dikkat', 'Uyarılar, cezalar, "sakın yapma" sahneleri', {
  arms: [['l', 44, 170, 58, 222], ['r', 384, 150, 364, 120]], brows: 'angry', eyes: 'normal', mouth: 'flat', cheeks: .3,
  extra: sign(364, 132), handOver: true,
});
pose('onayliyor', 'Onaylıyor', 'Doğru bilgi, çözüm, "haklısın" anları', {
  arms: [['l', 40, 170, 52, 222], ['r', 384, 136, 368, 76]], brows: 'happy', eyes: 'wink', mouth: 'big',
  extra: check(56, 50) + spark(316, 34, .8) + spark(104, 26, .55),
});

function render(p) {
  const armSvg = p.arms.map(a => arm(...a));
  const back = armSvg.filter((_, i) => (p.back || []).includes(p.arms[i][0]));
  const front = armSvg.filter((_, i) => !(p.back || []).includes(p.arms[i][0]));
  const face = brows(p.brows) + eyes(p.eyes) + mouth(p.mouth) + cheeks(p.cheeks ?? .75);
  // düşünme pozunda el yüzün önünde (çenede) dursun
  const layers = p.back
    ? [shadow(), legs(p.legs), body(), head(), face, ...back, ...front, p.extra]
    : [shadow(), legs(p.legs), body(), ...(p.handOver ? [arm(...p.arms[0])] : front), head(), face, p.extra,
       p.handOver ? arm(...p.arms[1]) : ''];
  return layers.join('\n');
}

const outDir = path.join(__dirname, '..', 'maskotlar', 'tosun');
fs.mkdirSync(outDir, { recursive: true });
const cards = P.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">\n<!-- Tokmak Tosun — ${p.ad}: ${p.kullanim} -->\n${render(p)}\n</svg>\n`;
  fs.writeFileSync(path.join(outDir, `${n}-${p.slug}.svg`), svg);
  return `<div class="c"><div class="n">P${n}</div>${svg}<b>${p.ad}</b><span>${p.kullanim}</span></div>`;
});
fs.writeFileSync(path.join(outDir, 'galeri.html'), `<!DOCTYPE html><html lang="tr"><meta charset="utf-8"><title>Tokmak Tosun — Poz Seti</title>
<style>body{margin:0;padding:40px;background:#f4f4f2 radial-gradient(#d6d6d6 1.5px,transparent 1.5px) 0 0/22px 22px;font-family:Arial,sans-serif}
h1{margin:0 0 30px;font:900 44px Arial Black,Arial}h1 em{font-style:normal;color:#F0442C}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.c{position:relative;background:#fff;border:4px solid #1A1A1A;border-radius:20px;box-shadow:6px 6px 0 #1A1A1A;padding:12px 16px 18px;text-align:center}
.c svg{width:100%;height:auto}.c b{display:block;font:900 22px Arial Black,Arial}.c span{display:block;font-size:14px;color:#555;margin-top:6px}
.n{position:absolute;top:10px;left:12px;background:#F0442C;color:#fff;font:900 15px Arial Black,Arial;padding:3px 9px;border-radius:8px;border:3px solid #1A1A1A}</style>
<h1>TOKMAK <em>TOSUN</em> · POZ SETİ</h1><div class="g">${cards.join('\n')}</div></html>`);
console.log(`${P.length} poz üretildi.`);

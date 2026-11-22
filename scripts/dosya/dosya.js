// "Dosya" maskotu: vektör rig + animasyon motoru
// Hem Node'da (require) hem tarayıcıda (window.Dosya) çalışır.
(function (root) {
  'use strict';
  const C = {
    red: '#E8402F', redDark: '#C93224', redBack: '#A8251B', redHi: '#F47A63',
    line: '#1E1414', paper: '#FFFFFF', paperLine: '#D9D9D9', paperEdge: '#F1F1F1',
    pupil: '#1E1414', mouth: '#4A1212', tongue: '#F07272', teeth: '#FFFFFF',
    blue: '#7CCBFF', blush: '#FF9C8C', gold: '#F6B92B', bg: '#F4F4F2',
  };
  const R = n => Math.round(n * 10) / 10;
  const rad = d => d * Math.PI / 180;
  const deg = r => r * 180 / Math.PI;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;

  // köşeleri yuvarlatılmış çokgen
  function roundedPoly(pts, r) {
    const n = pts.length; let d = '';
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
      const rr = Array.isArray(r) ? r[i] : r;
      const v1 = [p0[0] - p1[0], p0[1] - p1[1]], v2 = [p2[0] - p1[0], p2[1] - p1[1]];
      const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
      const a = [p1[0] + v1[0] / l1 * rr, p1[1] + v1[1] / l1 * rr];
      const b = [p1[0] + v2[0] / l2 * rr, p1[1] + v2[1] / l2 * rr];
      d += (i === 0 ? `M${R(a[0])} ${R(a[1])}` : `L${R(a[0])} ${R(a[1])}`) + `Q${p1[0]} ${p1[1]} ${R(b[0])} ${R(b[1])}`;
    }
    return d + 'Z';
  }
  const ST = w => `stroke="${C.line}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  // ---------------- GÖVDE ----------------
  const FRONT = roundedPoly([[120, 165], [246, 165], [272, 192], [480, 192], [480, 430], [120, 430]], [18, 8, 8, 18, 22, 22]);
  const BACK = roundedPoly([[136, 150], [262, 150], [288, 176], [496, 176], [496, 418], [136, 418]], [18, 8, 8, 18, 22, 22]);

  function paper(x, y, w, h, rot) {
    return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${C.paper}" ${ST(5)}/>
      <path d="M${x + 22} ${y + 20} H${x + w - 40} M${x + 22} ${y + 36} H${x + w - 70}" stroke="${C.paperLine}" stroke-width="6" stroke-linecap="round"/></g>`;
  }
  function body(flap = 0) {
    const f = R(flap * 30);
    return `
    <path d="${BACK}" fill="${C.redBack}" ${ST(7)}/>
    <g transform="translate(0 ${-f})">${paper(150, 134, 310, 220, -4 - flap * 6)}</g><g transform="translate(0 ${R(-f * .7)})">${paper(170, 146, 300, 220, 3 + flap * 5)}</g>${paper(160, 158, 312, 220, -1)}
    ${flap > .05 ? `<g opacity="${R(flap)}" stroke="${C.gold}" stroke-width="6" stroke-linecap="round"><path d="M300 ${120 - f} V${92 - f * 1.6} M250 ${128 - f} L232 ${104 - f * 1.4} M350 ${128 - f} L368 ${104 - f * 1.4}"/></g>` : ''}
    <!--ON-->
    <path d="${FRONT}" fill="${C.red}" ${ST(7)}/>
    <path d="M128 404 Q128 422 146 422 H454 Q472 422 472 404 V396 H128 Z" fill="${C.redDark}"/>
    <path d="M136 182 V176 Q136 173 140 173 H240 M282 202 H462" stroke="${C.redHi}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="${FRONT}" fill="none" ${ST(7)}/>`;
  }

  // ---------------- HUKUKÇU AKSESUARLARI ----------------
  // a: { cubbe: true|'bordo', yaka: true, gozluk: true, rozet: true, kitap: true, canta: true }
  function cubbe(a) {
    if (!a || !a.cubbe) return '';
    const col = a.cubbe === 'bordo' ? '#5A1A22' : '#1B1B22';
    const L = 'M116 196 Q150 188 192 206 L214 432 H116 Z';
    const Rr = 'M484 196 Q450 188 408 206 L386 432 H484 Z';
    const fold = '<path d="M150 260 Q160 340 150 420 M450 260 Q440 340 450 420" stroke="#3a3a44" stroke-width="4" fill="none" stroke-linecap="round"/>';
    const yaka = a.yaka !== false ? `<path d="M192 206 L214 432" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M408 206 L386 432" stroke="#fff" stroke-width="9" stroke-linecap="round"/>` : '';
    return `<g id="cubbe"><path d="${L}" fill="${col}" ${ST(6)}/><path d="${Rr}" fill="${col}" ${ST(6)}/>${fold}${yaka}
      ${a.rozet ? `<g transform="translate(152 248)"><circle r="17" fill="${C.gold}" ${ST(4)}/><path d="M0 -9 V9 M-7 9 H7 M-11 -5 H11 M-11 -5 L-14 2 H-8 Z M11 -5 L8 2 H14 Z" stroke="${C.line}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}</g>`;
  }
  function gozluk(a) {
    if (!a || !a.gozluk) return '';
    return `<g id="gozluk" fill="none" stroke="${C.line}" stroke-width="7"><circle cx="${EYE.l[0]}" cy="${EYE.l[1]}" r="45"/><circle cx="${EYE.r[0]}" cy="${EYE.r[1]}" r="45"/><path d="M287 292 Q300 284 313 292"/><path d="M197 290 L172 282 M403 290 L428 282" stroke-linecap="round"/></g>`;
  }
  function elde(side, a, hx, hy) {
    if (!a) return '';
    if (side === 'r' && a.canta) return `<g transform="translate(${R(hx)} ${R(hy + 12)})"><path d="M-12 0 V-10 Q-12 -16 -6 -16 H6 Q12 -16 12 -10 V0" fill="none" stroke="${C.line}" stroke-width="6"/><rect x="-36" y="0" width="72" height="52" rx="9" fill="#7A4A2A" ${ST(5)}/><path d="M-36 18 H36" stroke="${C.line}" stroke-width="4"/><rect x="-7" y="12" width="14" height="12" rx="3" fill="${C.gold}" ${ST(3)}/></g>`;
    if (side === 'l' && a.kitap) return `<g transform="translate(${R(hx)} ${R(hy + 10)}) rotate(-8)"><rect x="-30" y="-8" width="60" height="74" rx="6" fill="${C.redBack}" ${ST(5)}/><path d="M-21 -6 V64" stroke="#7d1a12" stroke-width="5"/><rect x="-12" y="6" width="34" height="13" rx="2" fill="${C.gold}"/><text x="5" y="16" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="9" fill="${C.line}">KANUN</text></g>`;
    return '';
  }

  // ---------------- YÜZ ----------------
  const EYE = { l: [242, 296], r: [358, 296] }, ERX = 37, ERY = 35;
  function eye(side, s, id) {
    const [cx, cy] = EYE[side], sg = side === 'l' ? 1 : -1;
    const lid = clamp(s.lid, 0, 1), low = clamp(s.lowLid, 0, 1);
    const px = cx + s.look[0] * 13, py = cy + s.look[1] * 11, pr = s.pupil * 1.2;
    const lidY = cy - ERY - 2 + (2 * ERY + 4) * lid;
    const lowY = cy + ERY + 2 - (2 * ERY + 4) * low * .62;
    const tilt = s.lidTilt * sg;
    return `<clipPath id="${id}c${side}"><ellipse cx="${cx}" cy="${cy}" rx="${ERX}" ry="${ERY}"/></clipPath>
    <ellipse cx="${cx}" cy="${cy}" rx="${ERX}" ry="${ERY}" fill="#fff"/>
    <g clip-path="url(#${id}c${side})">
      <circle cx="${R(px)}" cy="${R(py)}" r="${pr}" fill="${C.pupil}"/>
      <circle cx="${R(px + pr * .35)}" cy="${R(py - pr * .4)}" r="${R(pr * .3)}" fill="#fff"/>
      ${lid > .01 ? `<g transform="rotate(${tilt} ${cx} ${cy})"><rect x="${cx - 48}" y="${cy - 60}" width="96" height="${R(lidY - cy + 60)}" fill="${C.red}"/>
        <path d="M${cx - 48} ${R(lidY)} Q${cx} ${R(lidY + 7 * (1 - lid))} ${cx + 48} ${R(lidY)}" fill="none" stroke="${C.line}" stroke-width="5"/></g>` : ''}
      ${low > .01 ? `<rect x="${cx - 48}" y="${R(lowY)}" width="96" height="70" fill="${C.red}"/>
        <path d="M${cx - 48} ${R(lowY + 5)} Q${cx} ${R(lowY - 7)} ${cx + 48} ${R(lowY + 5)}" fill="none" stroke="${C.line}" stroke-width="5"/>` : ''}
    </g>
    <ellipse cx="${cx}" cy="${cy}" rx="${ERX}" ry="${ERY}" fill="none" stroke="${C.line}" stroke-width="5"/>`;
  }
  function brow(side, b) {
    const [cx, cy] = EYE[side], sg = side === 'l' ? 1 : -1;
    return `<path transform="translate(${cx + sg * 2} ${R(cy - 56 + b.y)}) rotate(${R(b.r * sg)})" d="M-32 4 Q0 -8 32 4" fill="none" stroke="${C.line}" stroke-width="13" stroke-linecap="round"/>`;
  }
  // parametrik ağız: w yarı genişlik, h açıklık, c köşe (+ gülümseme), round yuvarlaklık
  function mouth(m, id) {
    return `<g transform="translate(300 378) scale(1.35) translate(-300 -366)">${mouthRaw(m, id)}</g>`;
  }
  function mouthRaw(m, id) {
    const cx = 300 + (m.side || 0), cy = 366;
    const w = m.w, h = Math.max(0, m.h), c = m.c, kx = .55 + .5 * clamp(m.round || 0, 0, 1);
    const uy = (8 * (-.3 * h) + 2 * c) / 6, ly = (8 * (.7 * h) + 2 * c) / 6;
    if (h < 2.5) {
      const u0 = (2 * c) / 6;
      return `<path d="M${R(cx - w)} ${R(cy - c)} C${R(cx - w * kx)} ${R(cy + u0)} ${R(cx + w * kx)} ${R(cy + u0)} ${R(cx + w)} ${R(cy - c)}" fill="none" stroke="${C.line}" stroke-width="${m.press ? 8 : 7}" stroke-linecap="round"/>`;
    }
    const d = `M${R(cx - w)} ${R(cy - c)} C${R(cx - w * kx)} ${R(cy + uy)} ${R(cx + w * kx)} ${R(cy + uy)} ${R(cx + w)} ${R(cy - c)} C${R(cx + w * kx)} ${R(cy + ly)} ${R(cx - w * kx)} ${R(cy + ly)} ${R(cx - w)} ${R(cy - c)}Z`;
    const top = cy - .3 * h - Math.abs(c) * .4, bot = cy + .7 * h;
    const th = clamp(h * .3, 4, 12);
    return `<clipPath id="${id}m"><path d="${d}"/></clipPath>
    <path d="${d}" fill="${C.mouth}"/>
    <g clip-path="url(#${id}m)">
      ${m.tongue ? `<ellipse cx="${cx}" cy="${R(m.tongueUp ? top + h * .45 : bot - 2)}" rx="${R(w * .6)}" ry="${R(h * .38)}" fill="${C.tongue}"/>` : ''}
      ${m.teeth ? `<rect x="${cx - w - 5}" y="${R(top - 12)}" width="${2 * w + 10}" height="${R(th + 12 + Math.max(0, c) * .3)}" fill="${C.teeth}"/>` : ''}
      ${m.lowTeeth ? `<rect x="${cx - w - 5}" y="${R(bot - th - 2)}" width="${2 * w + 10}" height="${R(th + 12)}" fill="${C.teeth}"/>` : ''}
    </g>
    <path d="${d}" fill="none" stroke="${C.line}" stroke-width="6" stroke-linejoin="round"/>`;
  }

  // ---------------- KOLLAR / ELLER ----------------
  const SH = { l: [124, 318], r: [476, 318] };
  function hand(pose, hx, hy, dirDeg, sg) {
    const T = `translate(${R(hx)} ${R(hy)}) rotate(${R(dirDeg - 90)})`;
    const F = C.line, hi = `<path d="M-6 4 Q-2 -1 4 1" stroke="#5a4a4a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (pose === 'basparmak') {
      return `<g transform="translate(${R(hx)} ${R(hy)})"><rect x="-6" y="-34" width="13" height="30" rx="6.5" fill="${F}"/><circle cx="0" cy="0" r="16" fill="${F}"/>
        <path d="M-9 -4 H9 M-9 4 H9" stroke="#4a3a3a" stroke-width="2.5" stroke-linecap="round"/></g>`;
    }
    const thumbX = -12 * sg;
    let g = '';
    if (pose === 'acik') g = `<ellipse cx="0" cy="15" rx="14" ry="18" fill="${F}"/><ellipse cx="${thumbX}" cy="8" rx="6" ry="10" fill="${F}" transform="rotate(${-35 * sg} ${thumbX} 8)"/>`;
    if (pose === 'yumruk') g = `<circle cx="0" cy="13" r="15" fill="${F}"/><circle cx="${thumbX}" cy="8" r="6.5" fill="${F}"/>`;
    if (pose === 'isaret') g = `<circle cx="0" cy="12" r="14" fill="${F}"/><rect x="-5" y="14" width="11" height="32" rx="5.5" fill="${F}"/><circle cx="${thumbX}" cy="7" r="6" fill="${F}"/>`;
    return `<g transform="${T}">${g}</g>`;
  }
  function tokmakElde(hx, hy, dir) {
    return `<g transform="translate(${R(hx)} ${R(hy)}) rotate(${R(dir)})">
      <rect x="-12" y="-7" width="74" height="14" rx="6" fill="#A8693E" ${ST(5)}/>
      <rect x="52" y="-44" width="40" height="88" rx="11" fill="#A8693E" ${ST(6)}/>
      <rect x="49" y="-50" width="46" height="15" rx="6" fill="${C.gold}" ${ST(5)}/><rect x="49" y="35" width="46" height="15" rx="6" fill="${C.gold}" ${ST(5)}/>
      <path d="M60 -28 V24" stroke="#C98A55" stroke-width="5" stroke-linecap="round"/></g>`;
  }
  function arm(side, a, aks, tut) {
    const [sx, sy] = SH[side], sg = side === 'l' ? -1 : 1, st = a[3] || 1, L1 = 56 * st, L2 = 50 * st;
    const r1 = rad(a[0]), r2 = rad(a[0] + a[1]);
    const ex = sx + sg * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
    const hx = ex + sg * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
    const dir = deg(Math.atan2(hy - ey, hx - ex));
    return `<path d="M${sx} ${sy} L${R(ex)} ${R(ey)} L${R(hx)} ${R(hy)}" fill="none" ${ST(10)}/>${elde(side, aks, hx, hy)}${tut === 'tokmak' && side === 'r' ? tokmakElde(hx, hy, dir) : ''}${hand(a[2], hx, hy, dir, sg)}`;
  }

  // ---------------- BACAKLAR (2 kemikli IK) ----------------
  function ik(hip, foot, L1, L2, bend) {
    const dx = foot[0] - hip[0], dy = foot[1] - hip[1];
    const d = clamp(Math.hypot(dx, dy), 1, L1 + L2 - .5);
    const a = Math.atan2(dy, dx), b = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const k = a + bend * b;
    return [hip[0] + Math.cos(k) * L1, hip[1] + Math.sin(k) * L1];
  }
  function leg(side, hip, foot, lift) {
    const sg = side === 'l' ? -1 : 1;
    const knee = ik(hip, foot, 44, 44, side === 'l' ? 1 : -1);
    return `<path d="M${R(hip[0])} ${R(hip[1])} L${R(knee[0])} ${R(knee[1])} L${R(foot[0])} ${R(foot[1])}" fill="none" ${ST(10)}/>
    <g transform="translate(${R(foot[0])} ${R(foot[1])}) rotate(${R(-lift * sg)})"><ellipse cx="${8 * sg}" cy="2" rx="24" ry="12" fill="${C.line}"/>
    <path d="M${-2 * sg} -5 Q${10 * sg} -9 ${20 * sg} -4" stroke="#6a5a5a" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
  }

  // ---------------- EFEKTLER ----------------
  const drop = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -16 Q12 0 10 7 A10 10 0 1 1 -10 7 Q-12 0 0 -16Z" fill="${C.blue}" ${ST(4)}/><path d="M-4 4 Q-5 9 -1 11" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  const spark = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5Z" fill="${C.gold}" ${ST(4)}/>`;
  function fx(f, t) {
    let o = '';
    const op = v => clamp(v, 0, 1);
    if (f.ter > .01) o += `<g opacity="${op(f.ter)}" transform="translate(0 ${R(Math.sin(t * 6) * 2)})">${drop(408, 238, 1)}${drop(424, 286, .8)}</g>`;
    if (f.yanak > .01) o += `<g opacity="${op(f.yanak) * .75}"><ellipse cx="218" cy="344" rx="20" ry="10" fill="${C.blush}"/><ellipse cx="382" cy="344" rx="20" ry="10" fill="${C.blush}"/></g>`;
    if (f.soru > .01) o += `<g opacity="${op(f.soru)}" transform="translate(470 120) rotate(${R(Math.sin(t * 3) * 6)})"><circle r="30" fill="#fff" ${ST(5)}/><text y="13" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="38" fill="${C.red}">?</text></g>`;
    if (f.parilti > .01) { const s = .8 + Math.sin(t * 8) * .15; o += `<g opacity="${op(f.parilti)}">${spark(100, 150, s)}${spark(500, 120, s * .7)}${spark(520, 230, s * .5)}</g>`; }
    if (f.ofke > .01) o += `<g opacity="${op(f.ofke)}" transform="translate(470 130) scale(${R(1 + Math.sin(t * 10) * .08)})"><path d="M-22 -8 Q-8 -8 -8 -22 M8 -22 Q8 -8 22 -8 M22 8 Q8 8 8 22 M-8 22 Q-8 8 -22 8" fill="none" stroke="${C.red}" stroke-width="9" stroke-linecap="round"/></g>`;
    if (f.gozyasi > .01) o += `<g opacity="${op(f.gozyasi)}">${drop(228, 336 + (t * 40) % 30, .7)}${drop(372, 336 + (t * 40 + 15) % 30, .7)}</g>`;
    return o;
  }

  // ---------------- ÇİZİM ----------------
  // s: tam durum nesnesi (bkz. NOTR)
  function draw(s, id = 'd') {
    const by = s.bob, lean = s.lean, sq = s.squash || 0, jump = s.jump || 0;
    const hipY = 430 + 40 + by - jump;
    const hips = { l: [262 + Math.sin(rad(lean)) * 0, hipY], r: [338, hipY] };
    const feet = s.feet || { l: [244, 548], r: [356, 548] };
    const lift = s.footLift || [0, 0];
    const fL = [feet.l[0], feet.l[1] - (s.footUp ? s.footUp[0] : 0) - jump * .7];
    const fR = [feet.r[0], feet.r[1] - (s.footUp ? s.footUp[1] : 0) - jump * .7];
    const face = `${brow('l', s.brows.l)}${brow('r', s.brows.r)}${eye('l', s, id)}${eye('r', s, id)}${gozluk(s.aks)}${mouth(s.mouth, id)}`;
    return `<ellipse cx="300" cy="556" rx="${R(130 - jump * .5)}" ry="12" fill="#000" opacity="${R(.13 - jump * .0006)}"/>
    ${leg('l', hips.l, fL, lift[0])}${leg('r', hips.r, fR, lift[1])}
    <g transform="translate(0 ${R(40 + by - jump)}) rotate(${R(lean)} 300 430) translate(300 430) scale(${R(1 + sq * .5)} ${R(1 - sq)}) translate(-300 -430)">
      ${(() => { const [bk, fr] = body(s.flap || 0).split('<!--ON-->'); return bk + (s.armBehind ? arm('r', s.armR, s.aks, s.tut) : '') + fr; })()}${cubbe(s.aks)}
      <g id="face">${face}</g>
      ${arm('l', s.armL, s.aks)}${s.armBehind ? '' : arm('r', s.armR, s.aks, s.tut)}
    </g>
    <g transform="translate(0 ${R(40 + by - jump)})">${fx(s.fx, s.t || 0)}</g>`;
  }
  const svg = (s, id, w = 600, h = 600, bg = null) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="${w}" height="${h}">${bg ? `<rect width="600" height="600" fill="${bg}"/>` : ''}${draw(s, id)}</svg>`;

  // sağ elin konumu (rig koordinatı)
  function elKonum(a, side = 'r') {
    const [sx, sy] = SH[side], sg = side === 'l' ? -1 : 1, st = a[3] || 1;
    const r1 = rad(a[0]), r2 = rad(a[0] + a[1]);
    return [sx + sg * (Math.sin(r1) * 56 * st + Math.sin(r2) * 50 * st), sy + Math.cos(r1) * 56 * st + Math.cos(r2) * 50 * st];
  }
  function tokmakBas(a) {
    const [sx, sy] = SH.r, st = a[3] || 1, r1 = rad(a[0]), r2 = rad(a[0] + a[1]);
    const ex = sx + Math.sin(r1) * 56 * st, ey = sy + Math.cos(r1) * 56 * st;
    const hx = ex + Math.sin(r2) * 50 * st, hy = ey + Math.cos(r2) * 50 * st;
    const d = Math.atan2(hy - ey, hx - ex);
    return [hx + Math.cos(d) * 72, hy + Math.sin(d) * 72];
  }
  // sağ kolu (tx,ty) noktasına uzat: [omuz açısı, dirsek, el, esneme]
  function kolIK(tx, ty, hand, side = 'r') {
    const [sx, sy] = SH[side], dx = (side === 'l' ? -1 : 1) * (tx - sx), dy = ty - sy, d = Math.hypot(dx, dy);
    const reach = 106, st = Math.max(1, d / (reach * .97)), L1 = 56 * st, L2 = 50 * st;
    const phi = Math.atan2(dx, dy), al = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const a1 = phi + al, ex = Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
    const a2 = Math.atan2(dx - ex, (ty - ey)) - a1;
    return [deg(a1), deg(a2), hand, st];
  }

  // ================== PRESETLER ==================
  const FX0 = { ter: 0, yanak: 0, soru: 0, parilti: 0, ofke: 0, gozyasi: 0 };
  const M = (w, h, c, o = {}) => Object.assign({ w, h, c, round: 0, teeth: false, tongue: false, tongueUp: false, lowTeeth: false, press: false, side: 0 }, o);

  // İfadeler (mimikler)
  const IFADE = {
    notr: { brows: { l: { y: 0, r: 0 }, r: { y: 0, r: 0 } }, lid: .12, lidTilt: 0, lowLid: 0, look: [0, 0], pupil: 13, mouth: M(26, 0, 3), fx: {} },
    mutlu: { brows: { l: { y: -8, r: -4 }, r: { y: -8, r: -4 } }, lid: 0, lidTilt: 0, lowLid: .26, look: [0, 0], pupil: 13, mouth: M(40, 24, 10, { teeth: true, tongue: true }), fx: { yanak: 1 } },
    bitkin: { brows: { l: { y: 4, r: -16 }, r: { y: 4, r: -16 } }, lid: .48, lidTilt: -6, lowLid: .1, look: [0, .5], pupil: 13, mouth: M(24, 18, -7, { tongue: true, teeth: true }), fx: { ter: 1 } },
    saskin: { brows: { l: { y: -18, r: 0 }, r: { y: -18, r: 0 } }, lid: 0, lidTilt: 0, lowLid: 0, look: [0, 0], pupil: 9, mouth: M(17, 32, 0, { round: 1 }), fx: {} },
    kizgin: { brows: { l: { y: 6, r: 18 }, r: { y: 6, r: 18 } }, lid: .32, lidTilt: 12, lowLid: .15, look: [0, 0], pupil: 12, mouth: M(30, 10, -6, { teeth: true, lowTeeth: true }), fx: { ofke: 1 } },
    dusunceli: { brows: { l: { y: -12, r: -6 }, r: { y: 3, r: 6 } }, lid: .2, lidTilt: 0, lowLid: .1, look: [.7, -.7], pupil: 13, mouth: M(16, 0, -2, { side: 14 }), fx: { soru: 1 } },
    korkmus: { brows: { l: { y: -10, r: -18 }, r: { y: -10, r: -18 } }, lid: 0, lidTilt: 0, lowLid: 0, look: [0, 0], pupil: 8, mouth: M(34, 16, -8, { teeth: true, lowTeeth: true }), fx: { ter: 1 } },
    emin: { brows: { l: { y: -2, r: 8 }, r: { y: -10, r: -4 } }, lid: .3, lidTilt: 0, lowLid: .2, look: [0, 0], pupil: 13, mouth: M(30, 0, 9, { side: 6 }), fx: { parilti: 1 } },
    uzgun: { brows: { l: { y: 0, r: -18 }, r: { y: 0, r: -18 } }, lid: .35, lidTilt: -10, lowLid: 0, look: [0, .6], pupil: 13, mouth: M(24, 0, -10), fx: { gozyasi: 1 } },
  };
  // Ağız şekilleri (viseme) — konuşma sırasında
  const VISEME = {
    X: M(26, 0, 3),                                            // sessiz
    P: M(24, 0, 1, { press: true }),                           // m b p
    K: M(30, 11, 1, { teeth: true }),                          // çoğu ünsüz: s z ş c ç j t d n k g h y r
    A: M(32, 40, 2, { teeth: true, tongue: true }),            // a
    E: M(38, 24, 4, { teeth: true, tongue: true }),            // e
    I: M(36, 14, 5, { teeth: true }),                          // ı i
    O: M(20, 30, 0, { round: 1, tongue: true }),               // o ö
    U: M(13, 17, 0, { round: 1 }),                             // u ü
    F: M(30, 7, 0, { teeth: true, lowTeeth: false }),          // f v
    L: M(30, 22, 2, { teeth: true, tongue: true, tongueUp: true }), // l
  };
  // Hareketler (kol pozları): [omuz açısı, dirsek bükümü, el]
  const JEST = {
    bekle: { L: [22, -12, 'acik'], R: [22, -12, 'acik'] },
    selam: { L: [22, -12, 'acik'], R: [148, 14, 'acik'], osc: { arm: 'R', i: 1, amp: 26, hz: 2.6 } },
    anlat: { L: [44, 58, 'acik'], R: [44, 58, 'acik'], beat: 18 },
    isaret: { L: [22, -12, 'acik'], R: [92, -6, 'isaret'] },
    yukari: { L: [22, -12, 'acik'], R: [160, 0, 'isaret'], osc: { arm: 'R', i: 0, amp: 4, hz: 2 } },
    omuz: { L: [62, 92, 'acik'], R: [62, 92, 'acik'] },
    basparmak: { L: [22, -12, 'acik'], R: [118, 62, 'basparmak'] },
    belde: { L: [42, -128, 'yumruk'], R: [42, -128, 'yumruk'] },
    dusun: { L: [22, -12, 'acik'], R: [150, 128, 'yumruk'] },
    eller_yukari: { L: [158, -12, 'acik'], R: [158, -12, 'acik'], osc: { arm: 'B', i: 1, amp: 8, hz: 5 } },
    dur: { L: [22, -12, 'acik'], R: [100, 58, 'acik'] },
  };

  const deepLerp = (a, b, k) => {
    if (typeof a === 'number' && typeof b === 'number') return lerp(a, b, k);
    if (Array.isArray(a) && Array.isArray(b)) return a.map((v, i) => typeof v === 'number' ? lerp(v, b[i], k) : (k < .5 ? v : b[i]));
    if (a && b && typeof a === 'object') { const o = {}; for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) o[key] = key in a && key in b ? deepLerp(a[key], b[key], k) : (key in b ? (typeof b[key] === 'number' ? lerp(0, b[key], k) : b[key]) : (typeof a[key] === 'number' ? lerp(a[key], 0, k) : a[key])); return o; }
    return k < .5 ? a : b;
  };
  const ifadeState = name => { const e = IFADE[name] || IFADE.notr; return JSON.parse(JSON.stringify(Object.assign({}, e, { fx: Object.assign({}, FX0, e.fx) }))); };

  // Statik poz (galeri için)
  function poz({ ifade = 'notr', jest = 'bekle', viseme = null, t = 0, aks = null } = {}) {
    const s = ifadeState(ifade);
    if (viseme) s.mouth = Object.assign({}, VISEME[viseme], { c: VISEME[viseme].c + (s.mouth.c > 0 ? s.mouth.c * .4 : s.mouth.c * .5) });
    const j = JEST[jest];
    return Object.assign(s, { armL: j.L.slice(), armR: j.R.slice(), bob: 0, lean: 0, t, aks });
  }

  // ================== ZAMAN ÇİZELGESİ ==================
  // tl: { cues:[{t,v}], env:{rate,values}, ifade:[{t,ad}], jest:[{t,ad}], yuru:[{t0,t1}], zipla:[t] }
  function at(list, t) { let cur = null, prev = null; for (const e of list || []) { if (e.t <= t) { prev = cur; cur = e; } } return [prev, cur]; }
  function blendTrack(list, t, dur, fn, fallback) {
    const [prev, cur] = at(list, t);
    if (!cur) return fn(fallback);
    const k = ease(clamp((t - cur.t) / dur, 0, 1));
    return deepLerp(fn(prev ? prev.ad : fallback), fn(cur.ad), k);
  }
  const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  function stateAt(tl, t) {
    const s = blendTrack(tl.ifade, t, .28, ifadeState, 'notr');
    // ---- konuşma / dudak senkronu
    const amp = tl.env ? (tl.env.values[Math.min(tl.env.values.length - 1, Math.floor(t * tl.env.rate))] || 0) : 0;
    const [pc, cc] = at(tl.cues, t);
    const speaking = cc && cc.v !== 'X';
    if (cc) {
      const nextIdx = tl.cues.indexOf(cc) + 1;
      const nxt = tl.cues[nextIdx];
      const len = nxt ? nxt.t - cc.t : .2;
      const k = ease(clamp((t - cc.t) / Math.min(.07, len * .6), 0, 1));
      const vm = deepLerp(VISEME[pc ? pc.v : 'X'], VISEME[cc.v], k);
      if (speaking || (pc && pc.v !== 'X' && t - cc.t < .07)) {
        const ec = s.mouth.c;
        vm.c += ec > 0 ? ec * .45 : ec * .55;
        vm.h *= clamp(.55 + amp * .8, .5, 1.3);
        vm.side = (s.mouth.side || 0) * .3;
        s.mouth = vm;
      }
    }
    // ---- göz kırpma
    for (let k = 0; k < 400; k++) {
      const bt = .8 + k * 3.2 + hash(k) * 1.6;
      if (bt > t + 1) break;
      const d = t - bt;
      if (d >= 0 && d < .16) s.lid = Math.max(s.lid, 1 - Math.abs(d - .08) / .08 * .9);
    }
    // ---- bakış (küçük göz hareketleri)
    const seg = Math.floor(t / 1.7);
    s.look = [s.look[0] + (hash(seg) - .5) * .35, s.look[1] + (hash(seg + 99) - .5) * .25];
    // ---- kollar
    const arms = blendTrack(tl.jest, t, .35, n => { const j = JEST[n] || JEST.bekle; return { L: j.L.slice(), R: j.R.slice() }; }, 'bekle');
    const [, jc] = at(tl.jest, t); const jd = JEST[jc ? jc.ad : 'bekle'] || JEST.bekle;
    const jk = jc ? ease(clamp((t - jc.t) / .35, 0, 1)) : 1;
    if (jd.osc) { const o = jd.osc, v = Math.sin(t * Math.PI * 2 * o.hz) * o.amp * jk; if (o.arm === 'R' || o.arm === 'B') arms.R[o.i] += v; if (o.arm === 'L' || o.arm === 'B') arms.L[o.i] -= v; }
    if (jd.beat && speaking) { arms.L[1] += amp * jd.beat * Math.sin(t * 7); arms.R[1] += amp * jd.beat * Math.sin(t * 7 + 1.3); }
    arms.L[0] += Math.sin(t * 2.1) * 2.5; arms.R[0] += Math.sin(t * 2.1 + 1) * 2.5;
    s.armL = arms.L; s.armR = arms.R;
    // ---- gövde
    s.bob = Math.sin(t * Math.PI * 2 * .55) * 2.5;
    s.lean = Math.sin(t * Math.PI * 2 * .27) * 1.2 + (speaking ? amp * 1.6 : 0);
    s.squash = Math.sin(t * Math.PI * 2 * .55) * .006;
    // ---- yürüme
    for (const w of tl.yuru || []) if (t >= w.t0 && t <= w.t1) {
      const p = (t - w.t0) * Math.PI * 2 * 1.6;
      s.footUp = [Math.max(0, Math.sin(p)) * 22, Math.max(0, Math.sin(p + Math.PI)) * 22];
      s.feet = { l: [244 + Math.cos(p) * 14, 548], r: [356 + Math.cos(p + Math.PI) * 14, 548] };
      s.footLift = [Math.sin(p) * 10, Math.sin(p + Math.PI) * 10];
      s.bob += Math.abs(Math.sin(p)) * -5; s.lean += Math.sin(p) * 2.5;
    }
    // ---- zıplama
    for (const z of tl.zipla || []) {
      const d = t - z;
      if (d >= 0 && d < .75) {
        if (d < .12) s.squash += Math.sin(d / .12 * Math.PI) * .08;
        else if (d < .62) { const k = (d - .12) / .5; s.jump = Math.sin(k * Math.PI) * 70; s.squash -= Math.sin(k * Math.PI) * .04; }
        else s.squash += Math.sin((d - .62) / .13 * Math.PI) * .07;
      }
    }
    // ---- dosyadan nesne fırlatma: kâğıtlar kalkar, gövde hafif esner
    s.flap = 0;
    for (const f of tl.firlat || []) {
      const d = t - f + .15;
      if (d >= 0 && d < .7) { const k = Math.sin(d / .7 * Math.PI); s.flap = Math.max(s.flap, k); s.squash -= k * .035; }
    }
    // ---- elle çıkarma: el dosyaya girer, nesneyi tutup çeker, fırlatır
    s.armBehind = false;
    for (const T0 of tl.cek || []) {
      const d = t - T0;
      if (d < -1.0 || d > .45) continue;
      const nat = elKonum(s.armR), A = [400, 140], B = [395, 215], Cc = [405, 70];
      const lerp2 = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
      let p, hand = 'acik';
      if (d < -.6) p = lerp2(nat, A, ease((d + 1.0) / .4));
      else if (d < -.42) { p = lerp2(A, B, ease((d + .6) / .18)); s.armBehind = (d > -.5); }
      else if (d < -.05) { p = lerp2(B, Cc, ease((d + .42) / .37)); hand = 'yumruk'; s.armBehind = d < -.32; }
      else if (d < .1) { p = Cc; hand = 'yumruk'; }
      else { p = lerp2(Cc, nat, ease((d - .1) / .35)); }
      s.armR = kolIK(p[0], p[1], hand);
      if (d > -.55 && d < 0) s.flap = Math.max(s.flap, Math.sin((d + .55) / .55 * Math.PI));
      s.look = [.4, -.8];
    }
    s.t = t; s.aks = tl.aks || null;
    return s;
  }

  const api = { C, draw, svg, poz, stateAt, elKonum, tokmakBas, kolIK, ifadeState, IFADE, VISEME, JEST };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Dosya = api;
})(this);

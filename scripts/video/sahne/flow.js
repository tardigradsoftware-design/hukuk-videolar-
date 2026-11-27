// SAHNE DİLİ 5 — "Nokta matrisi editoryal" (prompt-motion: manuelogomigo / Flowdrive'dan uyarlama, kopya değil)
// Dil: kırık beyaz zemin + ince çizgi çerçeve ve mono etiketler; nesneler turuncu noktalardan kurulur (dosya, yükleme çubuğu, katmanlar);
// büyük serif yazı + sayaç; koyu ve tam turuncu bölümler; parçacık yolu; adres çubuğu daktilosu.
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = `
.f5{background:#F2F0EC}.f5.koyu{background:#0E0D0C}.f5.tur{background:#E8551F}
.f5 .cr{position:absolute;inset:0;pointer-events:none}.f5 .cr i{position:absolute;background:rgba(21,21,21,.14)}.f5.koyu .cr i,.f5.tur .cr i{background:rgba(255,255,255,.16)}
.f5 .cr b{position:absolute;font:500 14px GM;letter-spacing:.22em;color:#8B8E95;font-weight:500}.f5.koyu .cr b{color:#6F6A63}.f5.tur .cr b{color:rgba(255,255,255,.7)}
.f5 canvas{position:absolute;left:0;top:0;width:1920px;height:1080px}
.f5 .sf{position:absolute;font:400 124px/1 IS;letter-spacing:-.02em;color:#151515;white-space:nowrap}.f5 .sf em{font-style:italic;color:#E8551F}
.f5.koyu .sf{color:#F2F0EC}.f5.tur .sf{color:#fff}.f5.tur .sf em{color:#151515}
.f5 .sf .msk{display:inline-block;overflow:hidden;padding-bottom:.1em;vertical-align:top}.f5 .sf .msk>span{display:inline-block}
.f5 .mo{position:absolute;font:600 24px GM;letter-spacing:.24em;color:#8B8E95;text-transform:uppercase;white-space:nowrap}.f5 .mo b{color:#E8551F;font-weight:700;margin-right:14px}
.f5.koyu .mo{color:#8B857C}.f5.tur .mo{color:rgba(255,255,255,.85)}.f5.tur .mo b{color:#151515}
.f5 .url{position:absolute;height:92px;border-radius:999px;background:#fff;box-shadow:0 0 0 1.5px rgba(21,21,21,.18),0 30px 50px -30px rgba(0,0,0,.3);display:flex;align-items:center;gap:18px;padding:0 34px;font:500 34px GM;color:#151515;white-space:nowrap}
.f5 .url em{font-style:normal;color:#E8551F}.f5 .url svg{width:34px;height:34px}
.f5 .ft{position:absolute;display:flex;align-items:center;gap:14px;font:600 20px GM;letter-spacing:.18em;color:#151515}.f5 .ft i{width:12px;height:12px;border-radius:50%;background:#E8551F}
.f5 .say{position:absolute;font:400 200px/1 IS;letter-spacing:-.03em;color:#151515}.f5 .say em{font-style:normal;color:#E8551F;font-size:.6em}.f5.koyu .say{color:#F2F0EC}
.f5 .tk{position:absolute;width:2px;height:28px;background:#fff}.f5 .tl{position:absolute;font:600 17px GM;letter-spacing:.16em;color:#fff;white-space:nowrap;transform:translateX(-50%)}
.f5 .gl{position:absolute}
`;
const krom = (no, ad) => `<div class="cr"><i style="left:60px;right:60px;top:70px;height:1px"></i><i style="left:60px;right:60px;bottom:70px;height:1px"></i><i style="left:120px;top:40px;bottom:40px;width:1px"></i><i style="right:120px;top:40px;bottom:40px;width:1px"></i>
  <b style="left:140px;top:42px">HAK DOSYASI — ${esc(no)}</b><b style="right:140px;top:42px">${esc(ad)}</b><b style="left:140px;bottom:42px">TEMSİLİ ANLATIM</b><b data-tc="1" style="right:140px;bottom:42px"></b></div>`;
const sf = (satir, x, y, fs) => `<div class="sf" style="left:${x}px;top:${y}px${fs ? ';font-size:' + fs + 'px' : ''}">${satir.map(([w, a, it]) => `<span class="msk" data-a="${a}"><span>${it ? `<em>${esc(w)}</em>` : esc(w)}&nbsp;</span></span>`).join('')}</div>`;
const mark = {
  f_dosya: s => `<canvas data-r="cv" width="1920" height="1080"></canvas>${krom('01', 'KREDİ')}
    <div data-r="g1">${sf(s.s1, 140, 300)}</div><div data-r="g2">${sf(s.s2, 140, 300)}</div>
    ${s.turler.map(([x, a], j) => `<div class="mo" data-t="${j}" style="left:150px;top:${520 + j * 56}px"><b>0${j + 1}</b>${esc(x)}</div>`).join('')}
    <div class="mo" data-r="fl" style="left:1110px;top:760px">${esc(s.dosya)}</div><div class="mo" data-r="pl" style="left:1480px;top:640px;color:#E8551F">${esc(s.prim)}</div>`,
  f_koyu: s => `<canvas data-r="cv" width="1920" height="1080"></canvas>${krom('02', 'BANKA')}
    ${s.gruplar.map((g, j) => `<div data-g="${j}">${g.ust ? `<div class="mo" style="left:150px;top:250px">${esc(g.ust)}</div>` : ''}${sf(g.s1, 140, 300, 116)}${sf(g.s2, 140, 430, 116)}</div>`).join('')}
    ${s.katman.map((x, j) => `<div class="mo" data-km="${j}" style="left:1640px;top:${360 + j * 130}px"><b>0${j + 1}</b>${esc(x)}</div>`).join('')}`,
  f_url: s => `<canvas data-r="cv" width="1920" height="1080"></canvas>${krom('03', 'ONLINE')}
    ${sf(s.s1, 0, 230)}
    <div class="url" data-r="url" style="left:420px;top:470px;width:1080px"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" data-r="kb" fill="#151515"/><path data-r="ky" d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="#151515" stroke-width="2.2"/></svg><span data-r="ut"></span></div>
    ${s.ozellik.map(([x, a], j) => `<div class="ft" data-f="${j}" style="left:${470 + j * 360}px;top:620px"><i></i>${esc(x)}</div>`).join('')}`,
  f_turuncu: s => `<canvas data-r="cv" width="1920" height="1080"></canvas>${krom('04', '5 ADIM')}
    ${sf(s.s1, 0, 150)}
    <i style="position:absolute;left:220px;right:420px;top:760px;height:2px;background:rgba(255,255,255,.6)" data-r="ln"></i>
    ${s.adimlar.map((a, j) => `<i class="tk" data-tk="${j}" style="left:${220 + j * 320}px;top:746px"></i><div class="tl" data-tl="${j}" style="left:${220 + j * 320}px;top:800px">0${j + 1} ${esc(a)}</div>`).join('')}
    <div class="sf" data-r="fz" style="left:1100px;top:400px;font-size:84px">${esc(s.sahte)}</div>
    ${[0, 1, 2].map(j => `<div class="sf gl" data-gl="${j}" style="left:1180px;top:500px;font-size:150px;${j === 1 ? 'color:#151515' : j === 2 ? 'color:#FFD3BF' : ''}"><em style="color:inherit">${esc(s.blof)}</em></div>`).join('')}`,
  f_yukle: s => `<canvas data-r="cv" width="1920" height="1080"></canvas>${krom('05', 'ADIM 1')}
    ${sf(s.s1, 140, 170)}
    <div class="say" data-r="sy" style="left:1270px;top:300px"></div><div class="mo" style="left:1280px;top:270px">GÜN</div>
    ${s.maddeler.map(([x, a], j) => `<div class="mo" data-m="${j}" style="left:150px;top:${680 + j * 50}px;color:#151515"><b>●</b>${esc(x)}</div>`).join('')}`,
  f_yuzde: s => `<div data-r="ko" style="position:absolute;inset:0;background:#0E0D0C;opacity:0"></div><canvas data-r="cv" width="1920" height="1080"></canvas>${krom('06', 'İADE')}
    <div data-r="g1">${sf(s.s1, 140, 190)}<div class="say" data-r="sy" style="left:1250px;top:150px"></div><div class="mo" data-r="al" style="left:150px;top:640px">${esc(s.alt)}</div></div>
    <div data-r="g2">${sf(s.s2, 140, 190, 116)}<div class="mo" data-r="kl" style="left:150px;top:640px">KULLANILAN</div><div class="mo" data-r="kr" style="left:auto;right:440px;top:640px;color:#E8551F">${esc(s.kalan)}</div></div>`,
};
const rt = `
const f5c = el => { const c = q(el, '[data-r=cv]'), g = c.getContext('2d'); g.clearRect(0, 0, 1920, 1080); return g; };
function f5ort(el, s, t) { const tc = q(el, '[data-tc]'); if (tc) tc.textContent = 'TC ' + new Date(t * 1000).toISOString().slice(14, 22); qa(el, '.sf .msk[data-a]').forEach(m => { const a = T(+m.dataset.a), k = bo(cl((t - a) / .45, 0, 1)); m.firstChild.style.transform = 'translateY(' + ((1 - k) * 110) + '%)'; }); }
function nokta(g, x, y, r, c) { g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
function yarim(g, x, y, w, sat, oran, renk, bos) { const st = 14, n = Math.floor(w / st); for (let j = 0; j < n; j++) for (let r = 0; r < sat; r++) { const f = j / n, on = f < oran; nokta(g, x + j * st, y + r * st, on ? 4.6 : 3, on ? (typeof renk === 'function' ? renk(f) : renk) : (bos || 'rgba(21,21,21,.16)')); } }
Object.assign(D, {
  f_dosya(s, lt, o, t) { const el = s.el; f5ort(el, s, t); const g = f5c(el), ay = T(s.ayrK), ak = eio(cl((t - ay) / .7, 0, 1)), ck = T(s.s2[0][1]);
    const X0 = 1110, Y0 = 200, st = 22, C = 18, R = 24; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { if (c > C - 6 && r < 5 && (c - (C - 6)) > r) continue; const i = r * C + c, d = .9 * hs(i), k = eio(cl((lt - d * .5) / .7, 0, 1));
      let tx = X0 + c * st, ty = Y0 + r * st; const prim = r >= 16 && r <= 19; if (prim && t > ay) { tx += 330 * ak; ty += -60 * ak + Math.sin(t * 3 + c) * 2 * ak; }
      const sx = 960 + (hs(i + 5) - .5) * 2400, sy = 540 + (hs(i + 9) - .5) * 1400, x = sx + (tx - sx) * k, y = sy + (ty - sy) * k; const play = Math.abs(c - 8) + Math.abs(r - 9) * .9 < 4 && c >= 6;
      nokta(g, x, y, prim && t > T(s.isaretK) ? 6.8 + Math.sin(t * 8) * .6 : 5.8, prim && t > T(s.isaretK) ? '#B3260F' : play ? '#F2F0EC' : '#E8551F'); }
    const g1 = q(el, '[data-r=g1]'), g2 = q(el, '[data-r=g2]'); g1.style.opacity = 1 - cl((t - ck + .1) / .2, 0, 1); g1.style.transform = 'translateY(' + (-60 * ei(cl((t - ck + .1) / .2, 0, 1))) + 'px)'; g2.style.display = t > ck - .1 ? 'block' : 'none';
    s.turler.forEach(([x, a], j) => gir(q(el, '[data-t="' + j + '"]'), T(a), t, '-x')); gir(q(el, '[data-r=fl]'), s.t + .8, t, 'y'); gir(q(el, '[data-r=pl]'), ay + .4, t, 'x'); },
  f_koyu(s, lt, o, t) { const el = s.el; f5ort(el, s, t); document.body.classList.add('k'); const g = f5c(el);
    for (let L = 0; L < 3; L++) { const yo = 380 + L * 130 + Math.sin(t * 1.3 + L) * 10 * (1 + L), ek = eo(cl((lt - L * .15) / .6, 0, 1)); for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) { const ix = (a - b) * 22, iy = (a + b) * 11, x = 1250 + ix, y = yo + iy - 120 + (1 - ek) * 300;
        const pulse = .5 + .5 * Math.sin(t * 3 - (a + b) * .35 + L), c = L === s.vurguL && t > T(s.vurguK) ? 'rgba(232,85,31,' + (.6 + .4 * pulse) + ')' : 'rgba(232,85,31,' + (.3 + .35 * pulse) * ek + ')'; nokta(g, x, y, 3.4, c); } }
    for (let j = 0; j < 90; j++) { const p = ((t * .35 + hs(j)) % 1), x = 1300 + (hs(j + 3) - .5) * 300 - p * 900 * cl((t - T(s.akisK)) / .6, 0, 1), y = 330 - p * 120 + (hs(j + 6) - .5) * 220; if (t > T(s.akisK)) nokta(g, x, y, 2 + 2 * (1 - p), 'rgba(232,85,31,' + (1 - p) + ')'); }
    s.gruplar.forEach((gr, j) => { const e = q(el, '[data-g="' + j + '"]'), a = T(gr.a), son = gr.son != null ? T(gr.son) : 1e9, ck = cl((t - son) / .25, 0, 1); e.style.display = t >= a - .05 && t < son + .3 ? 'block' : 'none'; e.style.opacity = 1 - ck; e.style.transform = 'translateY(' + (-50 * ei(ck)) + 'px)'; });
    s.katman.forEach((x, j) => gir(q(el, '[data-km="' + j + '"]'), s.t + .3 + j * .12, t, 'x')); },
  f_url(s, lt, o, t) { const el = s.el; f5ort(el, s, t); const g = f5c(el); q(el, '.sf').style.cssText += ';left:0;right:0;text-align:center';
    for (let ri = 0; ri < 5; ri++) { const R = 260 + ri * 70, n = 40 + ri * 14; for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2 + t * (ri % 2 ? .12 : -.1); nokta(g, 960 + Math.cos(a) * R * 1.9, 520 + Math.sin(a) * R * .9, 2.2, 'rgba(232,85,31,' + (.08 + .1 * Math.sin(t * 2 + j * .3 + ri)) + ')'); } }
    const u = q(el, '[data-r=url]'); gir(u, s.t + .15, t, 's'); const full = s.url, n = Math.floor(cl((t - s.t - .35) / 1.1, 0, 1) * full.length), sh = full.slice(0, n), vi = full.indexOf(s.vurgu);
    q(el, '[data-r=ut]').innerHTML = (vi >= 0 && n > vi ? esc2(sh.slice(0, vi)) + '<em>' + esc2(sh.slice(vi)) + '</em>' : esc2(sh)) + (n < full.length && Math.floor(t * 4) % 2 ? '|' : '');
    const ac = t > T(s.kilitK), ck = eo(cl((t - T(s.kilitK)) / .3, 0, 1)); q(el, '[data-r=kb]').setAttribute('fill', ac ? '#2FA86A' : '#151515'); q(el, '[data-r=ky]').setAttribute('stroke', ac ? '#2FA86A' : '#151515'); q(el, '[data-r=ky]').setAttribute('transform', 'translate(0 ' + (-3 * (1 - ck)) + ')');
    s.ozellik.forEach(([x, a], j) => gir(q(el, '[data-f="' + j + '"]'), T(a), t, 'y')); },
  f_turuncu(s, lt, o, t) { const el = s.el; f5ort(el, s, t); const g = f5c(el); q(el, '.sf').style.cssText += ';left:0;right:0;text-align:center';
    const L = (p) => { const a = p * Math.PI * 2, d = 1 + Math.sin(a) * Math.sin(a); return [960 + 620 * Math.cos(a) / d, 470 + 300 * Math.sin(a) * Math.cos(a) / d]; };
    const head = (t * .22) % 1; for (let j = 0; j < 520; j++) { const p = j / 520, [x, y] = L(p), dd = ((head - p) + 1) % 1, b = dd < .3 ? 1 - dd / .3 : 0; nokta(g, x, y, 1.6 + 3.4 * b, 'rgba(255,255,255,' + (.18 + .82 * b) * cl(lt / .5, 0, 1) + ')'); }
    for (let j = 0; j < 60; j++) { const p = (head - hs(j) * .05 + 1) % 1, [x, y] = L(p); nokta(g, x + (hs(j + 2) - .5) * 40 * (1 + Math.sin(t * 5 + j)), y + (hs(j + 4) - .5) * 40, 1.6, 'rgba(255,255,255,.6)'); }
    q(el, '[data-r=ln]').style.transform = 'scaleX(' + eo(cl((t - T(s.adimK)) / .6, 0, 1)) + ')'; q(el, '[data-r=ln]').style.transformOrigin = 'left';
    s.adimlar.forEach((a, j) => { const tk = q(el, '[data-tk="' + j + '"]'), tl = q(el, '[data-tl="' + j + '"]'), at = T(s.adimK) + .1 + j * .12; gir(tl, at, t, 'y'); tl.style.transform += ' translateX(-50%)'; tk.style.opacity = t > at ? 1 : 0;
      if (j === 3 && t > T(s.dikkatK)) { const k = bo(cl((t - T(s.dikkatK)) / .35, 0, 1)); tk.style.width = (2 + 30 * k) + 'px'; tk.style.height = (28 + 4 * k) + 'px'; tk.style.borderRadius = '50%'; tk.style.marginLeft = (-15 * k) + 'px'; tk.style.background = '#fff'; tl.style.color = '#151515'; tl.style.fontSize = '22px'; } else if (t > T(s.dikkatK)) tl.style.opacity = .45; });
    const fz = q(el, '[data-r=fz]'), bt = T(s.blofK); gir(fz, T(s.sahteK), t, 'x'); if (t > bt) fz.style.opacity = 1 - cl((t - bt) / .2, 0, 1);
    qa(el, '[data-gl]').forEach((e, j) => { if (t < bt) { e.style.opacity = 0; return; } const d = t - bt, jit = d < .6 ? (Math.floor(t * 30) % 3 - 1) * (j ? 12 : 0) * (1 - d / .6) : 0; e.style.opacity = j ? (d < .6 ? .8 : 0) : 1; e.style.transform = 'translate(' + (jit + (j === 1 ? -6 : j === 2 ? 6 : 0) * (d < .6 ? 1 : 0)) + 'px,' + (j ? jit * .3 : 0) + 'px) scale(' + (d < .15 ? 1.3 - 2 * d : 1) + ')'; }); },
  f_yukle(s, lt, o, t) { const el = s.el; f5ort(el, s, t); const g = f5c(el), h0 = T(s.dolK), h1 = T(s.dolBitK), dk = eio(cl((t - h0) / (h1 - h0), 0, 1));
    yarim(g, 150, 520, 1420, 6, dk, f => 'rgb(' + Math.round(232 - 30 * f) + ',' + Math.round(85 + 10 * f) + ',31)');
    for (let j = 0; j < 30; j++) { const x = 150 + j * (1420 / 30); g.fillStyle = 'rgba(21,21,21,.35)'; g.fillRect(x, 490, 1, j % 5 ? 8 : 16); }
    const sy = q(el, '[data-r=sy]'); sy.innerHTML = String(Math.round(dk * 30)).padStart(2, '0') + '<em> / 30</em>'; sy.style.opacity = cl(lt / .3, 0, 1);
    s.maddeler.forEach(([x, a], j) => gir(q(el, '[data-m="' + j + '"]'), T(a), t, '-x'));
    if (dk >= 1) nokta(g, 1590, 562, 12 + Math.sin(t * 6) * 1.5, '#2FA86A'); },
  f_yuzde(s, lt, o, t) { const el = s.el; f5ort(el, s, t); const g = f5c(el), v0 = T(s.ikiK), vk = cl((t - v0) / .35, 0, 1);
    q(el, '[data-r=ko]').style.opacity = eio(vk); el.classList.toggle('koyu', t > v0 + .15); document.body.classList.toggle('k', t > v0 + .15);
    const g1 = q(el, '[data-r=g1]'), g2 = q(el, '[data-r=g2]'); g1.style.opacity = 1 - vk; g2.style.display = t > v0 ? 'block' : 'none';
    if (t < v0 + .2) { const p = eo(cl((t - T(s.sayK)) / 1, 0, 1)); q(el, '[data-r=sy]').innerHTML = Math.round(p * 100) + '<em>%</em>'; yarim(g, 150, 520, 1420, 6, p, '#E8551F'); if (p >= 1) nokta(g, 1590, 562, 12, '#2FA86A'); gir(q(el, '[data-r=al]'), T(s.altK), t, 'y'); }
    else { const ku = .4 * eio(cl((t - v0 - .4) / .9, 0, 1)), kk = eo(cl((t - T(s.kalanK)) / .6, 0, 1)); yarim(g, 150, 520, 1420, 6, 1, f => f < ku ? 'rgba(242,240,236,.35)' : f < ku + (1 - ku) * kk ? '#E8551F' : 'rgba(242,240,236,.12)', 'rgba(242,240,236,.12)'); gir(q(el, '[data-r=kl]'), v0 + .5, t, 'y'); gir(q(el, '[data-r=kr]'), T(s.kalanK), t, 'x'); } },
});`;
module.exports = { css, mark, rt };

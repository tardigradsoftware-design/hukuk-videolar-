// SAHNE DİLİ 4 — "Ürün turu" (prompt-motion: sudo-kiran-6609ed / DistilBook 2'den uyarlama, kopya değil)
// Dil: dağınık kâğıt yığını + kırmızı hap kelime; koyu ara sahne; numaralı sekmeli ürün kartları + büyük eğik onay damgası;
// üstü çizilip yerine yazılan cümle; tam mavi takvim ızgarası; koyu zeminde degrade dev rakam + nokta küresi.
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = `
.d4{background:#EEEAE3}.d4 .hd{position:absolute;font:900 112px/1 G;letter-spacing:-.06em;color:#17171C;white-space:nowrap}
.d4 .hp4{display:inline-block;padding:0 .16em .05em;border-radius:.2em;background:#E8402F;color:#fff;vertical-align:top;height:1.06em;overflow:hidden}
.d4 .hp4 span{display:block;height:1.06em}
.d4 .kg4{position:absolute;width:300px;height:390px;background:#fff;border-radius:6px;box-shadow:0 30px 50px -24px rgba(40,30,20,.45),0 0 0 1px rgba(0,0,0,.06);padding:34px 26px}
.d4 .kg4 i{display:block;height:10px;border-radius:5px;background:#D9D5CD;margin-bottom:16px}.d4 .kg4 em{display:inline-block;padding:4px 10px;border-radius:6px;background:#E8402F;color:#fff;font:800 18px G;font-style:normal;margin-bottom:22px}
.d4 .dmg{position:absolute;padding:8px 20px;border:5px solid #8A8577;color:#8A8577;border-radius:10px;font:800 40px GM;letter-spacing:.08em;white-space:nowrap}
.d4 .fn{position:absolute;font:500 20px GM;color:#8A8577}
.d4.koyu{background:#0F1015}.d4 .tus{position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.06),transparent 60%),repeating-linear-gradient(0deg,transparent 0 86px,rgba(255,255,255,.04) 86px 90px),repeating-linear-gradient(90deg,transparent 0 86px,rgba(255,255,255,.04) 86px 90px)}
.d4 .kd{position:absolute;color:#fff;font:900 96px/1.02 G;letter-spacing:-.055em}.d4 .kd .w{display:inline-block;margin-right:.22em}
.d4 .ui{position:absolute;background:#fff;border-radius:22px;box-shadow:0 50px 80px -30px rgba(20,20,40,.55);padding:26px 30px;color:#17171C}
.d4 .ui .ust{display:flex;justify-content:space-between;font:700 18px GM;color:#8A8577;letter-spacing:.1em;margin-bottom:20px}
.d4 .ui .row{display:flex;justify-content:space-between;padding:14px 0;border-top:1.5px solid #EEE;font:700 28px G}
.d4.lav{background:#ECEEFB}.d4 .tabr{position:absolute;display:flex;gap:16px;font:800 22px G;color:#17171C}.d4 .tabr span{display:flex;align-items:center;gap:10px}.d4 .tabr b{width:30px;height:30px;border-radius:8px;color:#fff;font:800 15px GM;display:flex;align-items:center;justify-content:center}
.d4 .lnh{display:block;height:13px;border-radius:6px;background:#E1E2EA;margin-bottom:18px;position:relative;overflow:hidden}.d4 .lnh u{position:absolute;inset:0;background:#FFD84D;transform-origin:left}
.d4 .ty{font:700 38px/1.3 G;color:#17171C;min-height:150px}.d4 .ty .yes{background:#D7F5E5;color:#0C7A47;border-radius:6px;padding:0 6px}
.d4 .bdm{position:absolute;padding:16px 36px;border:7px solid #12A15E;color:#12A15E;border-radius:18px;font:900 68px G;letter-spacing:-.03em;background:rgba(255,255,255,.92);white-space:nowrap}
.d4 .imlec{position:absolute;width:48px;height:48px;z-index:9}
.d4 .cz{position:absolute;height:12px;background:#E8402F;border-radius:6px;transform-origin:left}
.d4 .stab{position:absolute;width:250px;height:210px;background:#fff;border-radius:20px;box-shadow:0 30px 60px -26px rgba(40,30,20,.45);padding:20px}
.d4 .stab b{display:inline-flex;width:40px;height:40px;border-radius:10px;align-items:center;justify-content:center;color:#fff;font:800 18px GM}
.d4 .stab div{margin-top:16px;font:900 34px/1.02 G;letter-spacing:-.04em}.d4 .stab i{display:block;height:8px;border-radius:4px;background:#E7E3DB;margin-top:12px}
.d4.mavi{background:#3D5AFE}.d4 .gr{position:absolute;display:grid;grid-template-columns:repeat(6,92px);gap:12px}.d4 .gr div{height:76px;border:3px solid rgba(255,255,255,.7);border-radius:12px;display:flex;align-items:center;justify-content:center}
.d4 .gr div svg{width:44px;height:44px}.d4 .wh{position:absolute;color:#fff;font:900 170px/1 G;letter-spacing:-.06em}.d4 .wh small{display:block;font:700 30px G;letter-spacing:0;opacity:.85;margin-top:14px}
.d4 .fl{position:absolute;color:#fff;font:700 40px G;letter-spacing:-.02em;white-space:nowrap}.d4 .fl b{display:inline-flex;width:44px;height:44px;border-radius:50%;background:#fff;color:#3D5AFE;align-items:center;justify-content:center;font:900 24px G;margin-right:16px;vertical-align:-6px}
.d4.gece{background:#0B0C1A}.d4 .gl{position:absolute;border-radius:50%;filter:blur(60px)}
.d4 .rk{position:absolute;font:900 360px/1 G;letter-spacing:-.07em;background:linear-gradient(180deg,#fff 10%,#B7A6FF 60%,#7B5CFF);-webkit-background-clip:text;background-clip:text;color:transparent}
.d4 .rk2{position:absolute;color:#fff;font:900 90px G;letter-spacing:-.05em}.d4 .rk2 em{font-style:normal;color:#7B5CFF}
.d4 .orb{position:absolute;padding:10px 22px;border-radius:999px;font:800 26px G;color:#fff;white-space:nowrap}
.d4 .cb{position:absolute;height:70px;border-radius:18px;background:rgba(255,255,255,.1);overflow:hidden;box-shadow:inset 0 0 0 2px rgba(255,255,255,.25)}.d4 .cb i{position:absolute;top:0;bottom:0;border-radius:18px}
`;
const TIK = '<svg viewBox="0 0 24 24"><path d="M5 12.5 L10 17 L19 7" fill="none" stroke="#3D5AFE" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const mark = {
  d_kagit: s => `${Array.from({ length: 9 }, (_, j) => `<div class="kg4" data-k="${j}" style="left:${[1080, 1260, 1450, 1150, 1380, 980, 1560, 1240, 1320][j]}px;top:${[160, 120, 210, 430, 470, 380, 420, 640, 300][j]}px">${j === 8 ? `<em>${esc(s.kagit)}</em>` : ''}${Array.from({ length: 9 }, (_, n) => `<i style="width:${50 + (n * 37 + j * 13) % 50}%"></i>`).join('')}</div>`).join('')}
    <div class="dmg" data-r="dm" style="left:1330px;top:560px">${esc(s.damga)}</div>
    <div class="hd" data-r="h1" style="left:110px;top:300px">${esc(s.s1)}<br><span class="hp4" data-r="hp"><span data-r="hr">${s.turler.map(x => `<span>${esc(x[0])}</span>`).join('')}</span></span></div>
    <div class="hd" data-r="h2" style="left:110px;top:560px">${esc(s.s2)} <span class="hp4" style="background:#17171C">${esc(s.s2hap)}</span></div>
    <div class="fn" data-r="fn" style="left:116px;top:250px">${esc(s.dosya)}</div>`,
  d_koyu: s => `<div class="tus"></div>
    <div class="ui" data-r="ui" style="left:1060px;top:170px;width:640px"><div class="ust"><span>KREDİ ÖZETİ</span><span>TEMSİLİ</span></div>${s.satirlar.map((r, j) => `<div class="row" data-rw="${j}" style="${j === s.hl ? 'color:#E8402F' : ''}"><span>${esc(r)}</span><b style="font-family:GM">•••</b></div>`).join('')}</div>
    <div class="kd" style="left:110px;top:560px">${s.yazi.map((l, j) => `<div>${l.split(' ').map(w => `<span class="w">${esc(w)}</span>`).join('')}</div>`).join('')}</div>`,
  d_urun: s => `<div class="tabr" data-r="tb" style="left:150px;top:150px">${s.sekmeler.map(([x], j) => `<span data-sk="${j}"><b style="background:${['#3D5AFE', '#E8402F', '#12A15E'][j]}">0${j + 1}</b>${esc(x)}</span>`).join('')}</div>
    <div class="ui" data-r="u1" style="left:150px;top:220px;width:560px;height:520px"><div class="ust"><span>${esc(s.belge)}</span><span>TEMSİLİ</span></div><em style="display:inline-block;padding:4px 10px;border-radius:6px;background:#E8402F;color:#fff;font:800 18px G;font-style:normal;margin-bottom:24px">MEVZUAT</em>${Array.from({ length: 10 }, (_, j) => `<span class="lnh" style="width:${60 + (j * 29) % 40}%"><u data-u="${j}"></u></span>`).join('')}</div>
    <div class="ui" data-r="u2" style="left:770px;top:220px;width:760px;height:520px"><div class="ust"><span>SONUÇ</span><span style="color:#12A15E">● CANLI</span></div><div class="ty" data-r="ty"></div></div>
    <div class="bdm" data-r="bd" style="left:900px;top:560px">${esc(s.damga)}</div>
    <svg class="imlec" data-r="im" viewBox="0 0 24 24"><path d="M3 2 L20 12 L12 13.5 L8 21 Z" fill="#17171C" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  d_cizik: s => `<div class="hd" data-r="a1" style="left:0;right:0;top:170px;text-align:center;font-size:120px;color:#8A8577"><span style="position:relative;display:inline-block">${esc(s.eski)}<i class="cz" data-r="cz" style="left:-10px;right:-10px;top:64px"></i></span></div>
    <div class="hd" data-r="a2" style="left:0;right:0;top:320px;text-align:center;font-size:120px">${esc(s.yeni)} <span class="hp4" style="background:#3D5AFE">▶ ${esc(s.yeniHap)}</span></div>
    ${s.adimlar.map((a, j) => `<div class="stab" data-st="${j}" style="left:${150 + j * 280}px;top:560px"><b style="background:${['#3D5AFE', '#7B5CFF', '#12A15E', '#E8402F', '#F6B92B'][j]}">0${j + 1}</b><div>${esc(a)}</div><i style="width:70%"></i><i style="width:45%"></i></div>`).join('')}
    <div class="hd" data-r="f1" style="left:1060px;top:470px;font-size:64px;color:#8A8577"><span style="position:relative;display:inline-block">${esc(s.sahte)}<i class="cz" data-r="cz2" style="left:-6px;right:-6px;top:34px;height:8px"></i></span></div>
    <div class="hd" data-r="f2" style="left:1280px;top:440px;font-size:64px"><span class="hp4">${esc(s.blof)}</span></div>`,
  d_takvim: s => `<div class="wh" data-r="w" style="left:150px;top:120px">${esc(s.buyuk)}<small>${esc(s.kucuk)}</small></div>
    <div class="gr" data-r="gr" style="left:150px;top:440px">${Array.from({ length: 30 }, (_, j) => `<div data-g="${j}">${TIK}</div>`).join('')}</div>
    <svg data-r="sa" style="position:absolute;left:1450px;top:110px;width:260px;height:260px" viewBox="0 0 100 100"><circle cx="50" cy="54" r="40" fill="none" stroke="#fff" stroke-width="5"/><rect x="44" y="4" width="12" height="8" rx="2" fill="#fff"/><path data-r="el" d="M50 54 L50 24" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path data-r="yay" d="" fill="rgba(255,255,255,.25)"/></svg>
    ${s.maddeler.map(([x, a], j) => `<div class="fl" data-m="${j}" style="left:900px;top:${450 + j * 90}px"><b>${j + 1}</b><span>${esc(x)}</span>${j === s.cizM ? `<i class="cz" data-r="cz" style="left:60px;width:${s.cizW}px;top:24px;background:#fff"></i><span data-r="yok" style="margin-left:18px;padding:2px 14px;border-radius:10px;background:#fff;color:#3D5AFE">${esc(s.yok)}</span>` : ''}</div>`).join('')}`,
  d_rakam: s => `<div class="gl" style="left:1100px;top:120px;width:600px;height:600px;background:rgba(123,92,255,.45)"></div><div class="gl" style="left:200px;top:500px;width:500px;height:400px;background:rgba(61,90,254,.35)"></div>
    <canvas data-r="kure" width="760" height="760" style="position:absolute;left:1060px;top:90px;width:760px;height:760px"></canvas>
    ${s.orb.map(([x, c], j) => `<div class="orb" data-o="${j}" style="left:0;top:0;background:${c}">${esc(x)}</div>`).join('')}
    <div class="rk" data-r="rk" style="left:110px;top:150px"></div><div class="rk2" data-r="ia" style="left:130px;top:520px">${esc(s.iade)}</div>
    <div class="rk2" data-r="v1" style="left:130px;top:150px;font-size:110px">${esc(s.v1)} <em>${esc(s.v2)}</em></div>
    <div class="cb" data-r="cb" style="left:130px;top:440px;width:1380px"><i data-r="ku" style="left:0;background:rgba(255,255,255,.3)"></i><i data-r="ka" style="background:linear-gradient(90deg,#7B5CFF,#B7A6FF)"></i></div>
    <div class="orb" data-r="kl" style="left:130px;top:540px;background:rgba(255,255,255,.12)">KULLANILAN</div><div class="orb" data-r="kr" style="left:auto;right:410px;top:540px;background:#7B5CFF">${esc(s.kalan)}</div>`,
};
const rt = `
Object.assign(D, {
  d_kagit(s, lt, o, t) { const el = s.el; qa(el, '.kg4').forEach((k, j) => { const a = .05 * j, kk = bo(cl((lt - a) / .45, 0, 1)), r = (hs(j + 4) - .5) * 30;
      k.style.opacity = cl((lt - a) / .08, 0, 1); k.style.transform = 'translate(' + ((1 - kk) * (hs(j) - .5) * 900) + 'px,' + ((1 - kk) * -900 + Math.sin(t * 1.2 + j) * 6) + 'px) rotate(' + (r + (1 - kk) * 40 + Math.sin(t * .8 + j) * 1.5) + 'deg)'; });
    const dm = q(el, '[data-r=dm]'), dt = T(s.damgaK); dm.style.opacity = t < dt ? 0 : 1; dm.style.transform = 'rotate(-12deg) scale(' + (t < dt ? 2 : 1 + Math.pow(1 - eo(cl((t - dt) / .22, 0, 1)), 2) * 1.3) + ')';
    gir(q(el, '[data-r=h1]'), s.t + .1, t, 'y'); gir(q(el, '[data-r=fn]'), s.t + .3, t, 'y'); gir(q(el, '[data-r=h2]'), T(s.s2K), t, 'y');
    let ri = 0, rs = 0; s.turler.forEach((x, j) => { if (t >= T(x[1])) { ri = j; rs = T(x[1]); } }); const rk = eo(cl((t - rs) / .25, 0, 1)), hp = q(el, '[data-r=hp]');
    q(el, '[data-r=hr]').style.transform = 'translateY(' + (-1.06 * (ri - 1 + rk)) + 'em)'; hp.style.transform = 'scale(' + (1 + .08 * Math.sin(cl((t - rs) / .25, 0, 1) * Math.PI)) + ')'; },
  d_koyu(s, lt, o, t) { const el = s.el; const ui = q(el, '[data-r=ui]'), k = bo(cl(lt / .5, 0, 1));
    ui.style.transform = 'perspective(1400px) rotateY(' + (-24 + (1 - k) * -40) + 'deg) rotateX(' + (10 + Math.sin(t) * 2) + 'deg) translateY(' + ((1 - k) * 200) + 'px)'; ui.style.opacity = cl(lt / .1, 0, 1);
    qa(el, '[data-rw]').forEach((r, j) => { r.style.opacity = cl((lt - .2 - j * .1) / .15, 0, 1); if (j === s.hl) r.style.background = 'linear-gradient(90deg,rgba(232,64,47,.12) ' + (eo(cl((lt - .7) / .4, 0, 1)) * 100) + '%,transparent 0)'; });
    qa(el, '.w').forEach((w, j) => { const kk = bo(cl((lt - .15 - j * .07) / .3, 0, 1)); w.style.opacity = cl((lt - .15 - j * .07) / .1, 0, 1); w.style.transform = 'translateY(' + ((1 - kk) * 60) + 'px)'; }); document.body.classList.add('k'); },
  d_urun(s, lt, o, t) { const el = s.el; s.sekmeler.forEach(([x, a], j) => { const e = q(el, '[data-sk="' + j + '"]'); gir(e, T(a), t, 's'); });
    gir(q(el, '[data-r=u1]'), s.t + .05, t, 'y'); gir(q(el, '[data-r=u2]'), T(s.sekmeler[1][1]), t, 'x');
    qa(el, '[data-u]').forEach((u, j) => { u.style.transform = 'scaleX(' + eo(cl((t - s.t - .4 - j * .22) / .3, 0, 1)) + ')'; });
    const ty = q(el, '[data-r=ty]'), y0 = T(s.yazK), full = s.yazi, n = Math.floor(cl((t - y0) / 1.1, 0, 1) * full.length), vi = full.indexOf(s.vurgu);
    const part = full.slice(0, n); ty.innerHTML = t < y0 ? '' : (n > vi && vi >= 0 ? esc2(part.slice(0, vi)) + '<span class="yes">' + esc2(part.slice(vi, Math.min(n, vi + s.vurgu.length))) + '</span>' + esc2(part.slice(vi + s.vurgu.length)) : esc2(part)) + (n < full.length ? '|' : '');
    const bd = q(el, '[data-r=bd]'), bt = T(s.damgaK); bd.style.opacity = t < bt ? 0 : 1; bd.style.transform = 'rotate(-8deg) scale(' + (t < bt ? 2.6 : 1 + 1.6 * Math.pow(1 - eo(cl((t - bt) / .22, 0, 1)), 2)) + ')';
    el.style.translate = (t > bt && t < bt + .3 ? Math.sin((t - bt) * 90) * 10 * (1 - (t - bt) / .3) : 0) + 'px 0';
    const im = q(el, '[data-r=im]'), kk = eio(cl((t - bt + .7) / .65, 0, 1)); im.style.left = (1700 - 560 * kk) + 'px'; im.style.top = (950 - 300 * kk) + 'px'; im.style.opacity = t < bt - .7 ? 0 : 1; im.style.transform = 'scale(' + (t > bt - .05 && t < bt + .12 ? .8 : 1) + ')'; },
  d_cizik(s, lt, o, t) { const el = s.el, up = T(s.adimK), uk = eio(cl((t - up) / .4, 0, 1));
    const a1 = q(el, '[data-r=a1]'), a2 = q(el, '[data-r=a2]'); gir(a1, s.t, t, 'y'); a1.style.transform += ' translateY(' + (-90 * uk) + 'px) scale(' + (1 - .35 * uk) + ')';
    q(el, '[data-r=cz]').style.transform = 'scaleX(' + eo(cl((t - T(s.cizK)) / .3, 0, 1)) + ')'; gir(a2, T(s.yeniK), t, 'y'); a2.style.transform += ' translateY(' + (-150 * uk) + 'px) scale(' + (1 - .3 * uk) + ')';
    s.adimlar.forEach((a, j) => { const e = q(el, '[data-st="' + j + '"]'); gir(e, up + j * .1, t, 'd'); const dk = T(s.dikkatK); if (j === 3 && t > dk) { const kk = bo(cl((t - dk) / .35, 0, 1)); e.style.transform = 'translateY(' + (-70 * kk) + 'px) scale(' + (1 + .15 * kk) + ')'; e.style.boxShadow = '0 0 0 6px #E8402F,0 40px 60px -20px rgba(232,64,47,.6)'; } else if (j !== 3 && t > dk) e.style.opacity = 1 - .5 * cl((t - dk) / .3, 0, 1); });
    const f1 = q(el, '[data-r=f1]'), f2 = q(el, '[data-r=f2]'), ft = T(s.sahteK), bt = T(s.blofK); gir(f1, ft, t, 'x'); f1.style.top = '390px'; f1.style.left = '1120px';
    q(el, '[data-r=cz2]').style.transform = 'scaleX(' + eo(cl((t - bt) / .25, 0, 1)) + ')'; f2.style.top = '370px'; f2.style.left = '1500px'; gir(f2, bt + .1, t, 's'); if (t > bt) f2.style.transform += ' rotate(-6deg)'; },
  d_takvim(s, lt, o, t) { const el = s.el; gir(q(el, '[data-r=w]'), s.t, t, 'y'); document.body.classList.add('k');
    const h0 = T(s.dolK), hd = (T(s.dolBitK) - h0) / 30; qa(el, '[data-g]').forEach((g, j) => { const on = t >= h0 + j * hd, k = bo(cl((t - h0 - j * hd) / .25, 0, 1)); g.style.background = on ? '#fff' : 'transparent'; g.querySelector('svg').style.transform = 'scale(' + (on ? k : 0) + ')'; g.style.transform = 'scale(' + (cl(lt / .3 - j * .02, 0, 1) * (1 + .12 * Math.sin(cl((t - h0 - j * hd) / .25, 0, 1) * Math.PI))) + ')'; });
    const an = cl((t - h0) / (T(s.dolBitK) - h0), 0, 1) * Math.PI * 2 + t * .3; q(el, '[data-r=el]').setAttribute('d', 'M50 54 L' + (50 + Math.sin(an) * 30) + ' ' + (54 - Math.cos(an) * 30)); const aa = cl((t - h0) / (T(s.dolBitK) - h0), 0, 1) * Math.PI * 2 * .999;
    q(el, '[data-r=yay]').setAttribute('d', 'M50 54 L50 14 A40 40 0 ' + (aa > Math.PI ? 1 : 0) + ' 1 ' + (50 + Math.sin(aa) * 40) + ' ' + (54 - Math.cos(aa) * 40) + ' Z'); q(el, '[data-r=sa]').style.transform = 'rotate(' + Math.sin(t * 2) * 4 + 'deg)';
    s.maddeler.forEach(([x, a], j) => gir(q(el, '[data-m="' + j + '"]'), T(a), t, 'x')); const cz = q(el, '[data-r=cz]'); if (cz) { cz.style.transform = 'scaleX(' + eo(cl((t - T(s.cizK)) / .3, 0, 1)) + ')'; gir(q(el, '[data-r=yok]'), T(s.cizK) + .3, t, 's'); } },
  d_rakam(s, lt, o, t) { const el = s.el, v0 = T(s.ikiK); document.body.classList.add('k');
    const cv = q(el, '[data-r=kure]'), g = cv.getContext('2d'); g.clearRect(0, 0, 760, 760); for (let j = 0; j < 420; j++) { const u = hs(j) * 2 - 1, th = hs(j + 999) * Math.PI * 2 + t * .4, r = Math.sqrt(1 - u * u), x = r * Math.cos(th), z = r * Math.sin(th), y = u, sc = 300; const a = .25 + .75 * (z + 1) / 2; g.fillStyle = 'rgba(200,190,255,' + a + ')'; g.beginPath(); g.arc(380 + x * sc, 380 + y * sc, 1.5 + 2 * (z + 1) / 2, 0, 7); g.fill(); }
    cv.style.opacity = cl(lt / .4, 0, 1) * (1 - .7 * cl((t - v0) / .4, 0, 1));
    s.orb.forEach(([x, c, a], j) => { const e = q(el, '[data-o="' + j + '"]'), an = t * .6 + j * 2.1, k = bo(cl((t - T(a)) / .35, 0, 1)); e.style.opacity = cl((t - T(a)) / .1, 0, 1) * (1 - cl((t - v0) / .3, 0, 1)); e.style.transform = 'translate(' + (1440 + Math.cos(an) * 330 - 100) + 'px,' + (470 + Math.sin(an) * 140) + 'px) scale(' + k + ')'; });
    const rk = q(el, '[data-r=rk]'); rk.textContent = '%' + say(t, T(s.sayK), .9, 0, 100); const kk = bo(cl(lt / .45, 0, 1)), ck = cl((t - v0) / .3, 0, 1);
    rk.style.opacity = cl(lt / .1, 0, 1) * (1 - ck); rk.style.transform = 'translateY(' + ((1 - kk) * 150 - 200 * ei(ck)) + 'px)'; gir(q(el, '[data-r=ia]'), T(s.iadeK), t, 'y'); if (t > v0) q(el, '[data-r=ia]').style.opacity = 1 - ck;
    gir(q(el, '[data-r=v1]'), v0 + .1, t, 'y'); gir(q(el, '[data-r=cb]'), v0 + .3, t, 'y'); gir(q(el, '[data-r=kl]'), v0 + .5, t, 'y'); gir(q(el, '[data-r=kr]'), T(s.kalanK), t, 's');
    const ku = 40 * eio(cl((t - v0 - .6) / .9, 0, 1)); q(el, '[data-r=ku]').style.width = ku + '%'; const ka = q(el, '[data-r=ka]'); ka.style.left = ku + '%'; ka.style.width = ((100 - ku) * eo(cl((t - T(s.kalanK)) / .6, 0, 1))) + '%'; },
});`;
module.exports = { css, mark, rt };

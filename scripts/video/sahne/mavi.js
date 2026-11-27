// SAHNE DİLİ 1 — "Mavi Ferah" (prompt-motion: thismacapital / BlueVisa'dan uyarlama, kopya değil)
// Dil: solda dev, kelime kelime yükselen başlık + tek kahraman nesne; nesnenin üstünde sırayla değişen onay çipi ve n/N nokta sayacı;
// araya tam mavi ekran kinetik yazı (yörünge çizgisi + kâğıt uçak); sonda rakam sayacı.
const CZ = require('../cizimler');
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const msk = (txt, cls, a) => `<span class="msk" data-a="${a}"><span${cls ? ` class="${cls}"` : ''}>${esc(txt)}</span></span>`;

const css = `
.m1{background:#fff}.m1 .isik{position:absolute;inset:0;background:radial-gradient(circle at 74% 52%,#DCEAFF 0,rgba(220,234,255,0) 42%)}
.m1 .lbl{position:absolute;font:700 20px GM;letter-spacing:.24em;color:#1E7BF2;text-transform:uppercase}
.m1 .hd{position:absolute;font:800 150px/.9 G;letter-spacing:-.065em;color:#0E1726}.m1 .hd .b{color:#1E7BF2}.m1 .hd .msk{display:block}.m1 .hd.yt .msk{display:inline-block}
.m1 .msk{display:inline-block;overflow:hidden;padding:0 .04em .1em 0;vertical-align:top}.m1 .msk>span{display:inline-block}
.m1 .bilet{position:absolute;width:720px;height:340px;background:#fff;border-radius:28px;box-shadow:0 60px 90px -36px rgba(30,100,220,.5),0 0 0 1px rgba(30,110,230,.14);overflow:hidden}
.m1 .bilet .ust{height:66px;background:#1E7BF2;color:#fff;font:700 18px GM;letter-spacing:.22em;display:flex;align-items:center;justify-content:space-between;padding:0 30px}
.m1 .alan{position:absolute;font:600 15px GM;letter-spacing:.2em;color:#8A94A6}.m1 .alan b{display:block;margin-top:10px;height:62px;overflow:hidden;font:800 54px/62px G;letter-spacing:-.045em;color:#0E1726}
.m1 .alan b span{display:block}
.m1 .perf{position:absolute;left:480px;top:86px;bottom:22px;border-left:3px dashed #D5DEEE}
.m1 .barkod{position:absolute;left:520px;top:112px;width:160px;height:180px;background:repeating-linear-gradient(90deg,#0E1726 0 4px,transparent 4px 7px,#0E1726 7px 9px,transparent 9px 15px)}
.m1 .dmg{position:absolute;padding:12px 26px;border:5px solid #1E7BF2;color:#1E7BF2;border-radius:14px;font:800 40px G;letter-spacing:-.03em;background:rgba(255,255,255,.9);white-space:nowrap}
.m1.mavi{background:#1E7BF2}.m1 .kin{position:absolute;left:0;right:0;text-align:center;color:#fff;font:800 150px/1.02 G;letter-spacing:-.06em}
.m1 .kin .c{display:inline-block;white-space:pre}.m1 .kin small{display:block;font:700 22px GM;letter-spacing:.26em;margin-bottom:26px;opacity:.85}
.m1 .pw{display:inline-block;border-radius:.16em;padding:0 .1em .04em}
.m1 .chip{position:absolute;display:flex;align-items:center;gap:20px;height:100px;padding:0 24px 0 22px;background:#fff;border-radius:24px;box-shadow:0 30px 60px -24px rgba(30,100,220,.55),0 0 0 2px rgba(30,123,242,.22);font:700 36px G;letter-spacing:-.02em;color:#0E1726;white-space:nowrap;transform-origin:50% 100%}
.m1 .chip i{width:58px;height:58px;border-radius:16px;background:#E8F1FF;display:flex;align-items:center;justify-content:center;font:800 28px G;color:#1E7BF2;font-style:normal}
.m1 .chip em{font:700 21px G;font-style:normal;padding:9px 18px;border-radius:999px;background:#1E7BF2;color:#fff}
.m1 .chip.kirmizi i{background:#FFE6E3;color:#E8402F}.m1 .chip.kirmizi em{background:#E8402F}
.m1 .dots{position:absolute;display:flex;gap:12px;align-items:center;font:600 20px GM;color:#8A94A6;letter-spacing:.12em}.m1 .dots b{width:16px;height:16px;border-radius:50%;background:#D5DEEE}.m1 .dots b.on{background:#1E7BF2}
.m1 .kahr{position:absolute;display:flex;align-items:center;justify-content:center}
.m1 .hlk{position:absolute;border-radius:50%;border:3px solid #1E7BF2}
.m1 .yk{position:absolute;padding:22px 30px;background:#fff;border-radius:24px;box-shadow:0 30px 60px -26px rgba(30,100,220,.45),0 0 0 1px rgba(30,110,230,.14);font:700 30px G;color:#0E1726;white-space:nowrap}
.m1 .yk small{display:block;font:600 15px GM;letter-spacing:.2em;color:#8A94A6;margin-bottom:8px}
.m1 .ciz{position:absolute;height:6px;background:#E8402F;border-radius:3px;transform-origin:left}
.m1 .tkv{position:absolute;width:700px;padding:28px;background:#fff;border-radius:28px;box-shadow:0 60px 90px -36px rgba(30,100,220,.5),0 0 0 1px rgba(30,110,230,.14)}
.m1 .tkv h5{margin:0 0 18px;font:700 17px GM;letter-spacing:.22em;color:#8A94A6;display:flex;justify-content:space-between}
.m1 .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.m1 .gn{height:66px;border-radius:14px;background:#F1F5FC;font:700 24px G;color:#8A94A6;display:flex;align-items:center;justify-content:center;position:relative}
.m1 .gn.on{background:#1E7BF2;color:#fff}.m1 .gn .bay{position:absolute;top:-40px;left:-6px;font:700 15px GM;letter-spacing:.12em;color:#fff;background:#0E1726;padding:5px 10px;border-radius:8px;white-space:nowrap}
.m1 .imlec{position:absolute;width:44px;height:44px;z-index:5}
.m1 .dev{position:absolute;color:#fff;font:800 330px/1 G;letter-spacing:-.07em}.m1 .dev small{font-size:.45em}
.m1 .cubuk{position:absolute;height:84px;border-radius:22px;background:#EEF3FB;overflow:hidden;box-shadow:inset 0 0 0 2px #D5DEEE}.m1 .cubuk i{position:absolute;top:0;bottom:0;border-radius:22px}
`;

const mark = {
  m_giris: s => `<div class="isik"></div><div class="lbl" style="left:110px;top:150px">${esc(s.lbl)}</div>
    <div class="hd" style="left:100px;top:200px">${s.satir.map(([x, a, b]) => `<span class="msk" data-a="${a}"><span${b ? ' class="b"' : ''}>${esc(x)}</span></span>`).join('')}</div>
    <div class="bilet" data-r="bil" style="left:1050px;top:300px"><div class="ust"><span>${esc(s.bilet.ust)}</span><span>TEMSİLİ</span></div>
      <div class="alan" style="left:34px;top:96px">KREDİ TÜRÜ<b><span data-r="rul">${s.turler.map(x => `<span>${esc(x[0])}</span>`).join('')}</span></b></div>
      <div class="alan" style="left:34px;top:212px">TUTAR<b>••• TL</b></div><div class="alan" style="left:260px;top:212px">VADE<b>•• ay</b></div>
      <div class="perf"></div><div class="barkod"></div></div>
    <div class="dmg" data-r="dmg" style="left:1180px;top:560px">${esc(s.damga)}</div>`,
  m_mavi: s => `<svg style="position:absolute;inset:0" viewBox="0 0 1920 1080"><ellipse data-r="yor" cx="960" cy="470" rx="820" ry="330" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="3" stroke-dasharray="10 16"/>
      <ellipse cx="960" cy="470" rx="640" ry="250" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2" stroke-dasharray="4 12"/>${[0, 1].map(j => `<path data-u="${j}" d="M0 -16 L34 0 L0 16 L8 0 Z" fill="#fff"/>`).join('')}</svg>
    ${s.gruplar.map((g, j) => `<div class="kin" data-g="${j}" style="top:${g.ust ? 250 : 300}px">${g.ust ? `<small>${esc(g.ust)}</small>` : ''}${g.s.map(l => `<div>${l.split(' ').map(w => `<span class="pw"${w === g.pill ? ' data-pill="1"' : ''}>${[...w].map(c => `<span class="c">${esc(c)}</span>`).join('')}</span>`).join('<span class="c"> </span>')}</div>`).join('')}</div>`).join('')}`,
  m_hero: s => `<div class="isik" style="background:radial-gradient(circle at 50% 62%,#DCEAFF 0,rgba(220,234,255,0) 38%)"></div>
    <div class="lbl" data-r="l1" style="left:0;right:0;top:92px;text-align:center;color:#8A94A6">${esc(s.ust)}</div>
    <div class="hd yt" style="left:0;right:0;top:130px;text-align:center;font-size:104px">${s.satir.map(([x, a, b]) => `<span class="msk" data-a="${a}"><span${b ? ' class="b"' : ''}>${esc(x)}&nbsp;</span></span>`).join('')}</div>
    ${[0, 1, 2].map(j => `<div class="hlk" data-h="${j}" style="left:${960 - 200}px;top:${740 - 60}px;width:400px;height:120px"></div>`).join('')}
    <div class="kahr" data-r="kh" style="left:770px;top:400px;width:380px;height:380px">${CZ.svg(s.kahraman, 380)}</div>
    <div class="chip" data-r="cp" style="left:960px;top:330px"><i></i><span></span><em></em></div>
    <div class="dots" data-r="dt" style="left:0;right:0;top:830px;justify-content:center">${s.cipler.filter(c => c[4]).map(() => '<b></b>').join('')}<span></span></div>
    <div class="yk" data-r="y1" style="left:150px;top:470px"><small>${esc(s.sol[0])}</small>${esc(s.sol[1])}<i class="ciz" data-r="c1" style="left:24px;right:24px;top:62px"></i></div>
    <div class="kahr" data-r="bk" style="left:200px;top:590px;width:150px;height:150px">${CZ.svg('banka', 150)}</div>
    <div class="yk" data-r="y2" style="left:1370px;top:470px"><small>${esc(s.sag[0])}</small>${esc(s.sag[1])}</div>
    <div class="kahr" data-r="pr" style="left:1440px;top:590px;width:150px;height:150px">${CZ.svg('para', 150)}</div>`,
  m_takvim: s => `<div class="isik"></div><div class="lbl" style="left:110px;top:170px">${esc(s.lbl)}</div>
    <div class="hd" style="left:100px;top:220px;font-size:160px">${s.satir.map(([x, a, b]) => `<span class="msk" data-a="${a}"><span${b ? ' class="b"' : ''}>${esc(x)}</span></span>`).join('')}</div>
    <div class="tkv" data-r="tk" style="left:900px;top:330px"><h5><span>POLİÇE TAKVİMİ</span><span>TEMSİLİ</span></h5><div class="grid">${Array.from({ length: 30 }, (_, j) => `<div class="gn" data-g="${j}">${j + 1}</div>`).join('')}</div></div>
    <div class="chip" data-r="cp" style="left:1250px;top:200px"><i></i><span></span><em></em></div>
    <div class="dots" data-r="dt" style="left:900px;top:300px">${s.cipler.map(() => '<b></b>').join('')}<span></span></div>
    <svg class="imlec" data-r="im" viewBox="0 0 24 24"><path d="M3 2 L20 12 L12 13.5 L8 21 Z" fill="#0E1726" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  m_yuzde: s => `<div data-r="mv" style="position:absolute;inset:0;background:#1E7BF2"></div>
    <div class="dev" data-r="dv" style="left:150px;top:150px"><span data-r="sy">0</span><small>%</small></div>
    <div class="kin" data-r="ia" style="left:auto;right:170px;top:300px;text-align:right;font-size:120px"><span class="pw" style="background:#fff;color:#1E7BF2">${esc(s.pill)}</span><small style="margin:26px 0 0">${esc(s.alt)}</small></div>
    <div data-r="ac" style="position:absolute;left:0;right:0;top:0;height:0;background:#fff"></div>
    <div class="hd yt" data-r="h2" style="left:150px;top:220px;font-size:120px">${s.satir2.map(([x, a, b]) => `<span class="msk" data-a="${a}"><span${b ? ' class="b"' : ''}>${esc(x)}&nbsp;</span></span>`).join('')}</div>
    <div class="lbl" data-r="cl" style="left:160px;top:470px;color:#8A94A6">POLİÇE SÜRESİ</div>
    <div class="cubuk" data-r="cb" style="left:150px;top:510px;width:1320px"><i data-r="ku" style="left:0;background:#C9D3E3"></i><i data-r="ka" style="background:#1E7BF2"></i></div>
    <div class="lbl" data-r="kl" style="left:160px;top:620px;color:#8A94A6">KULLANILAN</div><div class="lbl" data-r="kr" style="left:auto;right:460px;top:620px">KALAN GÜNLER → GÜN BAZLI İADE</div>`,
};

const rt = `
const cipSec = (L, t) => { let i = -1; L.forEach((c, j) => { const ct = Array.isArray(c[0]) ? T(c[0][0]) + c[0][1] : T(c[0]); if (t >= ct) i = j; }); const c = L[i]; return { i, c, ct: c ? (Array.isArray(c[0]) ? T(c[0][0]) + c[0][1] : T(c[0])) : 0 }; };
function cipCiz(el, L, t, x, y, dotsEl, toplam) { const { i, c, ct } = cipSec(L, t); if (!c) { el.style.opacity = 0; return i; }
  if (el.dataset.i !== String(i)) { el.dataset.i = i; el.children[0].textContent = c[1]; el.children[1].textContent = c[2]; el.children[2].textContent = c[3]; el.className = 'chip' + (c[5] ? ' ' + c[5] : ''); }
  const d = t - ct, k = bo(cl(d / .3, 0, 1)); el.style.opacity = cl(d / .08, 0, 1); el.style.left = x + 'px'; el.style.top = y + 'px';
  el.style.transform = 'translate(-50%,0) translateY(' + ((1 - k) * 46) + 'px) rotateX(' + ((1 - k) * 50) + 'deg) scale(' + (.9 + .1 * k + .015 * Math.sin(t * 3)) + ')';
  if (dotsEl) { let n = 0; L.forEach((cc, j) => { if (j <= i && cc[4]) n++; }); const B = dotsEl.querySelectorAll('b'); B.forEach((b, j) => b.className = j < n ? 'on' : ''); dotsEl.querySelector('span').textContent = n + '/' + (toplam || B.length) + ' ' + (dotsEl.dataset.ek || ''); dotsEl.style.opacity = n ? 1 : 0; }
  return i; }
function hdCiz(el, t) { qa(el, '.msk[data-a]').forEach(m => { const a = T(+m.dataset.a), k = bo(cl((t - a) / .42, 0, 1)); m.firstChild.style.transform = 'translateY(' + ((1 - k) * 110) + '%)'; }); }
Object.assign(D, {
  m_giris(s, lt, o, t) { const el = s.el; hdCiz(el, t); q(el, '.lbl').style.opacity = cl(lt / .3, 0, 1);
    const bil = q(el, '[data-r=bil]'), k = bo(cl((lt - .15) / .5, 0, 1)), dm = T(s.damgaK);
    bil.style.opacity = cl((lt - .15) / .1, 0, 1); bil.style.transform = 'translateX(' + ((1 - k) * 700) + 'px) rotate(' + (-7 + (1 - k) * 20 + Math.sin(t * 1.1) * 1.2) + 'deg) translateY(' + (Math.sin(t * 1.4) * 8 + (t > dm ? 10 * Math.exp(-(t - dm) * 9) * Math.cos((t - dm) * 50) : 0)) + 'px)';
    let ri = 0; s.turler.forEach((x, j) => { if (t >= T(x[1])) ri = j; }); const rs = s.turler.reduce((a, x, j) => t >= T(x[1]) ? T(x[1]) : a, 0), rk = eo(cl((t - rs) / .28, 0, 1));
    q(el, '[data-r=rul]').style.transform = 'translateY(' + (-62 * (ri - 1 + rk)) + 'px)';
    const d = q(el, '[data-r=dmg]'); d.style.opacity = t < dm ? 0 : 1; d.style.transform = 'rotate(-9deg) scale(' + (t < dm ? 2.4 : 1 + 1.4 * Math.pow(1 - eo(cl((t - dm) / .22, 0, 1)), 2)) + ')'; },
  m_mavi(s, lt, o, t) { const el = s.el; s.gruplar.forEach((g, j) => { const ge = q(el, '[data-g="' + j + '"]'), a = T(g.a), son = g.son != null ? T(g.son) : 1e9;
      ge.style.display = t >= a - .05 && t < son + .3 ? 'block' : 'none'; if (t < a - .05) return; const ck = cl((t - son) / .3, 0, 1);
      ge.style.transform = 'translateY(' + (-120 * ei(ck)) + 'px)'; ge.style.opacity = 1 - ck;
      qa(ge, '.c').forEach((c, n) => { const k = bo(cl((t - a - n * .016) / .3, 0, 1)); c.style.opacity = cl((t - a - n * .016) / .08, 0, 1); c.style.transform = 'translateY(' + ((1 - k) * 70) + 'px) rotate(' + ((1 - k) * 14) + 'deg)'; });
      const pe = q(ge, '[data-pill]'); if (pe) { const pk = eo(cl((t - T(g.pillK)) / .3, 0, 1)); pe.style.background = 'linear-gradient(90deg,#fff ' + (pk * 100) + '%,transparent ' + (pk * 100) + '%)'; pe.style.color = pk > .5 ? '#1E7BF2' : '#fff'; } });
    q(el, '[data-r=yor]').style.strokeDashoffset = -t * 60;
    qa(el, '[data-u]').forEach((u, j) => { const a = t * .55 + j * Math.PI, x = 960 + Math.cos(a) * 820, y = 470 + Math.sin(a) * 330, an = Math.atan2(Math.cos(a) * 330, -Math.sin(a) * 820) * 180 / Math.PI; u.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + an + ')'); }); },
  m_hero(s, lt, o, t) { const el = s.el; hdCiz(el, t); q(el, '[data-r=l1]').style.opacity = cl(lt / .3, 0, 1);
    const kh = q(el, '[data-r=kh]'), k = bo(cl(lt / .5, 0, 1)); kh.style.transform = 'translateY(' + ((1 - k) * 200 + Math.sin(t * 2) * 10) + 'px) scale(' + (.6 + .4 * k) + ')'; kh.style.opacity = cl(lt / .1, 0, 1);
    qa(el, '[data-h]').forEach((h, j) => { const p = ((t * .7 + j / 3) % 1); h.style.transform = 'scale(' + (.6 + p * 1.1) + ')'; h.style.opacity = (1 - p) * .7 * cl(lt / .5, 0, 1); });
    const ci = cipCiz(q(el, '[data-r=cp]'), s.cipler, t, 960, 250 + 0 * lt, q(el, '[data-r=dt]'), 5); q(el, '[data-r=cp]').style.top = '290px';
    [['y1', s.sol[2]], ['y2', s.sag[2]]].forEach(([r, a]) => gir(q(el, '[data-r=' + r + ']'), T(a), t, r === 'y1' ? '-x' : 'x'));
    q(el, '[data-r=c1]').style.transform = 'scaleX(' + eo(cl((t - T(s.sol[3])) / .3, 0, 1)) + ')';
    gir(q(el, '[data-r=bk]'), T(s.sol[2]) + .1, t, 's'); gir(q(el, '[data-r=pr]'), T(s.sag[2]) + .1, t, 's');
    qa(el, '.cz-il').forEach(c => CZ.anim(c, lt)); },
  m_takvim(s, lt, o, t) { const el = s.el; hdCiz(el, t); q(el, '.lbl').style.opacity = cl(lt / .3, 0, 1);
    const tk = q(el, '[data-r=tk]'), k = bo(cl((lt - .1) / .5, 0, 1)); tk.style.opacity = cl((lt - .1) / .1, 0, 1); tk.style.transform = 'translateY(' + ((1 - k) * 260) + 'px) rotate(' + ((1 - k) * 6 + Math.sin(t * .9) * .6) + 'deg)';
    const h0 = T(s.dolK), h1 = T(s.dolBitK), hd = (h1 - h0) / 30;
    qa(el, '.gn').forEach((g, j) => { const on = t >= h0 + j * hd; g.classList.toggle('on', on); const pk = cl((t - h0 - j * hd) / .2, 0, 1); g.style.transform = 'scale(' + (1 + .18 * Math.sin(pk * Math.PI)) + ')';
      if (j === 0) { let b = g.querySelector('.bay'); if (!b) { b = document.createElement('span'); b.className = 'bay'; b.textContent = s.birGun; g.appendChild(b); } b.style.opacity = cl((t - T(s.birGunK)) / .2, 0, 1); g.classList.toggle('on', on || t >= T(s.birGunK)); } });
    cipCiz(q(el, '[data-r=cp]'), s.cipler, t, 1250, 190, q(el, '[data-r=dt]'));
    const im = q(el, '[data-r=im]'), ta = T(s.tikK); if (t < ta - .6) im.style.opacity = 0; else { const kk = eio(cl((t - ta + .6) / .6, 0, 1)), x = 1700 + (1330 - 1700) * kk, y = 900 + (640 - 900) * kk, pr = t > ta && t < ta + .15 ? .82 : 1; im.style.opacity = 1; im.style.left = x + 'px'; im.style.top = y + 'px'; im.style.transform = 'scale(' + pr + ')'; } },
  m_yuzde(s, lt, o, t) { const el = s.el, t0 = s.t, t2 = T(s.ikiK);
    q(el, '[data-r=sy]').textContent = say(t, T(s.sayK), .9, 0, 100); const dv = q(el, '[data-r=dv]'), kk = bo(cl(lt / .4, 0, 1)); dv.style.transform = 'translateY(' + ((1 - kk) * 120) + 'px) scale(' + (1 + .02 * Math.sin(t * 2)) + ')'; dv.style.opacity = cl(lt / .1, 0, 1);
    gir(q(el, '[data-r=ia]'), T(s.pillK), t, 'x');
    const ac = q(el, '[data-r=ac]'), ak = eio(cl((t - t2) / .5, 0, 1)); ac.style.height = (ak * 1080) + 'px';
    const h2 = q(el, '[data-r=h2]'); h2.style.display = t > t2 ? 'block' : 'none'; hdCiz(h2, t);
    ['cl', 'cb', 'kl'].forEach(r => gir(q(el, '[data-r=' + r + ']'), t2 + .35, t, 'y')); gir(q(el, '[data-r=kr]'), T(s.kalanK), t, 'x');
    const ku = 38 * eio(cl((t - t2 - .7) / 1, 0, 1)); q(el, '[data-r=ku]').style.width = ku + '%'; const ka = q(el, '[data-r=ka]'); ka.style.left = ku + '%'; ka.style.width = ((100 - ku) * eo(cl((t - T(s.kalanK)) / .7, 0, 1))) + '%';
    document.body.classList.toggle('k', t < t2 + .25); },
});`;
module.exports = { css, mark, rt };

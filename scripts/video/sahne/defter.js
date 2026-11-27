// SAHNE DİLİ 7 — "Defter tarifi" (prompt-motion: ror-fly-9950f1 Negroni tarifinden uyarlama, kopya değil)
// Dil: çizgili defter sayfası; tek kahraman nesne (önce kredi fişi, sonra "İptal ve İade Dosyası") adım adım dolar;
// sağda "ADIM n/5" ölçü kartı + ilerleme çubuğu; altta 1–5 adım çizelgesi; "malzemeler" (çizimler, eskiz ekranlar) gelir, dosyaya döker, çıkar.
// Kalem titreşimi (SVG feTurbulence tohumu kare kare değişir), kırmızı kalem daire/damga, el yazısı (Caveat) notlar. Ciddi, sade palet.
const path = require('path');
const CZ = require('../cizimler');
const FN = p => 'file://' + path.join(__dirname, '..', '..', '..', 'node_modules', p);
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = `
@font-face{font-family:Cav;src:url('${FN('@fontsource/caveat/files/caveat-latin-ext-700-normal.woff2')}');font-weight:700;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Cav;src:url('${FN('@fontsource/caveat/files/caveat-latin-700-normal.woff2')}');font-weight:700}
.df{background:#FBF8F1;--ink:#1F2A44;--kir:#C8433A;--mav:#2F5DA8;--sar:#F2D06B}
.df .sayfa{position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 47px,#CFDCEE 47px 49px);background-position:0 18px}
.df .kenar{position:absolute;left:170px;top:0;bottom:0;width:3px;background:#E3A6A0}
.df .delik{position:absolute;left:62px;width:34px;height:34px;border-radius:50%;background:#E9E4D8;box-shadow:inset 3px 3px 6px rgba(0,0,0,.18)}
.df .kl{filter:url(#kalem)}
.df .bas{position:absolute;left:0;right:0;top:46px;text-align:center}
.df .bas h1{margin:0;display:inline-block;position:relative;font:900 76px Arc;font-stretch:84%;letter-spacing:-.01em;color:var(--ink);text-transform:uppercase}
.df .bas h1 i{position:absolute;left:-10px;right:-10px;bottom:2px;height:10px;background:var(--kir);opacity:.85;border-radius:6px;transform-origin:left}
.df .bas p{margin:2px 0 0;font:700 40px Cav;color:var(--mav)}
.df .el{font-family:Cav;font-weight:700}
.df .fis,.df .form{position:absolute;background:#fff;border:3px solid var(--ink);border-radius:10px;box-shadow:8px 10px 0 rgba(31,42,68,.12)}
.df .fis{left:330px;top:250px;width:560px;padding:26px 30px}
.df .fis h4,.df .form h4{margin:0 0 14px;font:700 18px GM;letter-spacing:.2em;color:#6B7280;display:flex;justify-content:space-between}
.df .fis .s{display:flex;justify-content:space-between;padding:14px 4px;border-top:2px dashed #C9CED8;font:600 30px G;color:var(--ink);position:relative}
.df .fis .s b{font:600 26px GM}
.df .daire{position:absolute;left:-14px;right:-14px;top:-6px;bottom:-6px;overflow:visible}
.df .form{left:330px;top:220px;width:600px;height:600px;padding:22px 30px;overflow:hidden}
.df .form .klips{position:absolute;left:50%;top:-4px;width:150px;height:34px;margin-left:-75px;background:#9AA3B5;border:3px solid var(--ink);border-radius:0 0 12px 12px}
.df .form h3{margin:22px 0 4px;font:900 40px Arc;font-stretch:86%;color:var(--ink);text-transform:uppercase}
.df .ozet{display:flex;align-items:center;gap:12px;padding:6px 0;font:700 30px Cav;color:var(--ink);white-space:nowrap}
.df .ozet i{width:30px;height:30px;border:2.5px solid var(--ink);border-radius:6px;display:flex;align-items:center;justify-content:center;font:700 24px G;font-style:normal;color:#fff;background:var(--mav)}
.df .bol{margin-top:10px;padding-top:10px;border-top:2.5px solid var(--ink)}
.df .bol h5{margin:0 0 6px;font:700 17px GM;letter-spacing:.18em;color:var(--kir)}
.df .al{display:flex;gap:14px;align-items:baseline;padding:4px 0 2px;border-bottom:2px solid #D7DEEA;white-space:nowrap}
.df .al span{font:600 18px GM;letter-spacing:.08em;color:#6B7280;flex:none;min-width:150px}
.df .al b{font:700 36px Cav;color:var(--mav);display:inline-block;clip-path:inset(0 100% 0 0)}
.df .dol{position:absolute;left:250px;top:240px;width:44px;height:560px;border:3px solid var(--ink);border-radius:10px;background:#fff;overflow:hidden}
.df .dol i{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(180deg,#5E86C8,#2F5DA8)}
.df .dol svg{position:absolute;left:0;width:44px;height:16px}
.df .olc{position:absolute;left:190px;font:600 16px GM;color:#6B7280;letter-spacing:.06em;white-space:nowrap}
.df .olc:after{content:'';position:absolute;right:-26px;top:9px;width:18px;height:2px;background:var(--ink)}
.df .kart{position:absolute;left:1040px;top:250px;width:520px;padding:24px 30px 26px;background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:8px 10px 0 rgba(31,42,68,.12)}
.df .kart:before{content:'';position:absolute;left:0;right:0;top:0;height:10px;background:var(--kir);border-radius:9px 9px 0 0}
.df .kart small{display:block;margin-top:6px;font:700 18px GM;letter-spacing:.2em;color:var(--kir)}
.df .kart .b{font:900 92px/1 Arc;font-stretch:84%;color:var(--ink);margin-top:8px;white-space:nowrap}
.df .kart .a{font:800 32px G;letter-spacing:-.02em;color:var(--ink);margin-top:4px}
.df .kart .n{font:700 30px Cav;color:#4B5563;margin-top:2px}
.df .kart .pb{position:relative;margin-top:18px;height:16px;border:2.5px solid var(--ink);border-radius:9px;overflow:hidden;background:#fff}.df .kart .pb i{position:absolute;left:0;top:0;bottom:0;background:var(--kir)}
.df .kart .pe{display:flex;justify-content:space-between;margin-top:8px;font:600 17px GM;color:#6B7280}
.df .kart .ek{margin-top:16px;padding-top:12px;border-top:2px dashed #C9CED8}
.df .adm{position:absolute;left:300px;top:872px;width:1180px;height:60px}
.df .adm .ln{position:absolute;left:0;right:0;top:22px;height:3px;background:#C9CED8}.df .adm .ln i{position:absolute;left:0;top:0;bottom:0;background:var(--kir)}
.df .adm .d{position:absolute;top:0;width:46px;height:46px;margin-left:-23px;border:3px solid var(--ink);border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font:800 22px G;color:var(--ink)}
.df .adm .d.on{border-color:var(--kir);color:var(--kir)}.df .adm .d.ok{background:var(--kir);border-color:var(--kir);color:#fff}
.df .adm .e{position:absolute;top:52px;transform:translateX(-50%);font:700 15px GM;letter-spacing:.14em;color:#6B7280;white-space:nowrap}.df .adm .e.on{color:var(--kir)}
.df .mz{position:absolute;left:0;top:0;width:200px;height:200px}
.df .kirinti{position:absolute;width:14px;height:10px;border:2px solid var(--ink);border-radius:2px;background:#fff}
.df .ekr{position:absolute;left:1040px;top:560px;width:520px;height:270px;background:#fff;border:3px solid var(--ink);border-radius:10px;overflow:hidden}
.df .ekr .tb{height:34px;border-bottom:2.5px solid var(--ink);display:flex;align-items:center;gap:8px;padding:0 12px;background:#F1EEE6}
.df .ekr .tb i{width:11px;height:11px;border:2px solid var(--ink);border-radius:50%}.df .ekr .tb span{flex:1;height:18px;border:2px solid var(--ink);border-radius:9px;margin-left:8px;font:500 12px GM;padding:0 8px;line-height:15px;color:#555}
.df .ekr .tb em{font:700 11px GM;font-style:normal;letter-spacing:.12em;color:#6B7280}
.df .ekr h6{margin:12px 16px 8px;font:800 24px G;color:var(--ink)}
.df .ekr .ar{margin:0 16px;height:44px;border:2.5px solid var(--ink);border-radius:8px;padding:0 12px;font:700 26px Cav;color:var(--mav);display:flex;align-items:center;white-space:nowrap;overflow:hidden}
.df .ekr .sr{margin:8px 16px 0;padding:6px 10px;border:2px solid var(--ink);border-radius:6px;font:600 20px G;display:flex;justify-content:space-between;white-space:nowrap}
.df .ekr .sr.hl{background:#FCEFC0}
.df .not{position:absolute;font:700 40px/1.05 Cav;color:var(--kir);white-space:nowrap}
.df .not svg{position:absolute;left:0;top:0;overflow:visible}
.df .dmg{position:absolute;padding:6px 26px 8px;border:4px solid var(--kir);border-radius:12px;font:900 50px Arc;font-stretch:84%;color:var(--kir);letter-spacing:.02em;text-transform:uppercase;white-space:nowrap;background:rgba(251,248,241,.85)}
.df .bal{position:absolute;padding:20px 26px;background:#fff;border:3px solid var(--ink);border-radius:22px;font:700 44px/1.05 Cav;color:var(--ink);max-width:560px}
.df .bal:after{content:'';position:absolute;left:60px;bottom:-22px;width:30px;height:30px;background:#fff;border-right:3px solid var(--ink);border-bottom:3px solid var(--ink);transform:rotate(45deg)}
.df .bal small{display:block;font:700 16px GM;letter-spacing:.18em;color:#6B7280;margin-bottom:4px}
.df .bal s{text-decoration:none;position:relative}.df .bal s i{position:absolute;left:-6px;right:-6px;top:50%;height:6px;background:var(--kir);transform-origin:left;border-radius:3px}
.df .pst{position:absolute;width:420px;padding:28px 30px 34px;background:#F6E27A;box-shadow:6px 12px 20px rgba(0,0,0,.16);font:700 46px/1.05 Cav;color:var(--ink)}
.df .pst:before{content:'';position:absolute;left:50%;top:-14px;width:120px;height:28px;margin-left:-60px;background:rgba(255,255,255,.55);transform:rotate(-3deg)}
.df .pst b{color:var(--kir)}.df .pst small{display:block;margin-top:8px;font:700 30px Cav;color:#4B5563}
.df .kalem{position:absolute;width:70px;height:70px;z-index:6}
`;
const mark = {
  df_ana: s => `<div class="sayfa"></div><div class="kenar"></div>${[180, 520, 860].map(y => `<i class="delik" style="top:${y}px"></i>`).join('')}
    <svg width="0" height="0" style="position:absolute"><filter id="kalem"><feTurbulence data-r="tur" type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter></svg>
    <div class="bas" data-r="bas"><h1>${esc(s.baslik.ust)}<i data-r="bci"></i></h1><p data-r="bp"></p></div>
    <div class="fis kl" data-r="fis"><h4><span>${esc(s.fis.ust)}</span><span>TEMSİLİ</span></h4>${s.fis.satirlar.map(([a, b], j) => `<div class="s" data-fs="${j}"><span>${esc(a)}</span><b>${esc(b)}</b>${j === s.fis.daire ? '<svg class="daire" data-r="fd" viewBox="0 0 600 70" preserveAspectRatio="none"><path d="M30 38 C 40 6, 560 2, 584 30 C 600 58, 60 70, 22 46 C 6 36, 40 14, 90 10" fill="none" stroke="#C8433A" stroke-width="5" stroke-linecap="round"/></svg>' : ''}</div>`).join('')}</div>
    <div class="dol kl" data-r="dol"><i data-r="sv"></i><svg data-r="dalga" viewBox="0 0 44 16"><path d="" fill="#5E86C8"/></svg></div>
    ${s.adimlar.map((a, j) => `<span class="olc" data-ol="${j}" style="top:${800 - (j + 1) * 112 - 8}px">${j + 1}/5</span>`).join('')}
    <div class="form kl" data-r="form"><i class="klips"></i><h3>${esc(s.form.baslik)}</h3><h4><span>${esc(s.form.ust)}</span><span>TEMSİLİ</span></h4>
      <div data-r="ozt">${s.adimlar.map(([a], j) => `<div class="ozet" data-oz="${j}"><i>✓</i>${j + 1} · ${esc(s.form.ozetler[j])}</div>`).join('')}</div>
      ${s.adimlar.map(([a], j) => `<div class="bol" data-bl="${j}"><h5>${j + 1} · ${esc(a)}</h5>${(s.form.alanlar[j] || []).map(([e, d], n) => `<div class="al"><span>${esc(e)}</span><b data-al="${j}_${n}">${esc(d)}</b></div>`).join('')}</div>`).join('')}</div>
    <svg class="kalem" data-r="kalem" viewBox="0 0 70 70"><path d="M8 62 L16 44 L52 8 L62 18 L26 54 Z" fill="#F2D06B" stroke="#1F2A44" stroke-width="3.5" stroke-linejoin="round"/><path d="M8 62 L16 44 L26 54 Z" fill="#1F2A44"/></svg>
    <div class="kart kl" data-r="kart"><small data-r="ku"></small><div class="b" data-r="kb"></div><div class="a" data-r="ka"></div><div class="n" data-r="kn"></div><div data-r="kbar"><div class="pb"><i data-r="kpi"></i></div><div class="pe"><span data-r="kp0"></span><span data-r="kp1"></span></div></div><div class="ek" data-r="kek"></div></div>
    ${(s.ekranlar || []).map((e, j) => `<div class="ekr kl" data-ek="${j}"><div class="tb"><i></i><i></i><span>${esc(e.url || '')}</span><em>TEMSİLİ</em></div><h6>${esc(e.baslik)}</h6>${e.arama ? `<div class="ar" data-ea="${j}"></div>` : ''}${(e.satirlar || []).map(([x, k, hl], n) => `<div class="sr" data-es="${j}_${n}"><span>${esc(x)}</span><span>${esc(e.sag || '')}</span></div>`).join('')}</div>`).join('')}
    ${(s.malzemeler || []).map((m, j) => `<div class="mz kl" data-mz="${j}">${CZ.svg(m.ad, 200)}</div>${Array.from({ length: 8 }, (_, n) => `<i class="kirinti" data-kr="${j}_${n}"></i>`).join('')}`).join('')}
    ${(s.notlar || []).map((n, j) => `<div class="not" data-nt="${j}" style="left:${n.x}px;top:${n.y}px;${n.renk ? 'color:' + n.renk : ''}">${esc(n.metin)}${n.ok ? `<svg width="10" height="10"><path data-no="${j}" d="M0 0" fill="none" stroke="${n.renk || '#C8433A'}" stroke-width="4" stroke-linecap="round"/></svg>` : ''}</div>`).join('')}
    ${(s.balonlar || []).map((b, j) => `<div class="bal kl" data-bl2="${j}" style="left:${b.x}px;top:${b.y}px"><small>${esc(b.ust)}</small>${b.ciz ? `<s>${esc(b.metin)}<i></i></s>` : esc(b.metin)}</div>`).join('')}
    ${(s.damgalar || []).map((d, j) => `<div class="dmg kl" data-dm="${j}" style="left:${d.x}px;top:${d.y}px">${esc(d.metin)}</div>`).join('')}
    ${(s.yapiskan || []).map((p, j) => `<div class="pst" data-ps="${j}" style="left:${p.x}px;top:${p.y}px">${p.metin}<small>${esc(p.alt || '')}</small></div>`).join('')}
    <div class="adm" data-r="adm"><div class="ln"><i data-r="ali"></i></div>${s.adimlar.map(([a], j) => `<div class="d" data-ad="${j}" style="left:${j / 4 * 100}%">${j + 1}</div><div class="e" data-ae="${j}" style="left:${j / 4 * 100}%">${esc(a)}</div>`).join('')}</div>`,
};
const rt = `
function dfOn(t, k, c) { return t >= KT(k) - .05 && (c == null || t < KT(c) + .35); }
function dfGir(e, k, c, t, m) { if (!dfOn(t, k, c)) { e.style.display = 'none'; return -1; } e.style.display = ''; gir(e, KT(k), t, m || 'y'); if (c != null && t > KT(c)) { const z = cl((t - KT(c)) / .35, 0, 1); e.style.opacity = 1 - z; e.style.transform += ' translateY(' + (-40 * ei(z)) + 'px)'; } return t - KT(k); }
Object.assign(D, {
  df_ana(s, lt, o, t) { const el = s.el; q(el, '[data-r=tur]').setAttribute('seed', 1 + Math.floor(t * 8) % 5);
    // başlık
    const bas = q(el, '[data-r=bas]'); gir(bas, s.t, t, 'y'); q(el, '[data-r=bci]').style.transform = 'scaleX(' + eo(cl((t - s.t - .3) / .6, 0, 1)) + ')';
    const alt = s.baslik.alt; let ai = 0; alt.forEach((a, j) => { if (t >= KT(a[1])) ai = j; }); const at = KT(alt[ai][1]); q(el, '[data-r=bp]').textContent = alt[ai][0].slice(0, Math.floor(cl((t - at) / .7, 0, 1) * alt[ai][0].length));
    // fiş (giriş kahramanı)
    const fis = q(el, '[data-r=fis]'), fc = KT(s.fis.cik); if (t < fc + .5) { fis.style.display = ''; gir(fis, s.t + .2, t, 'y'); if (t > fc) { const z = eio(cl((t - fc) / .5, 0, 1)); fis.style.transform = 'translateX(' + (-900 * z) + 'px) rotate(' + (-10 * z) + 'deg)'; }
      qa(fis, '[data-fs]').forEach((r, j) => { const k = KT(s.fis.satirlar[j][2]); r.style.opacity = t < k ? 0 : 1; r.style.transform = 'translateX(' + ((1 - bo(cl((t - k) / .3, 0, 1))) * -30) + 'px)'; });
      const fd = q(fis, '[data-r=fd] path'); if (fd) { const L = fd.getTotalLength(); fd.style.strokeDasharray = L; fd.style.strokeDashoffset = L * (1 - eo(cl((t - KT(s.fis.daireK)) / .6, 0, 1))); } } else fis.style.display = 'none';
    // form + dolum çubuğu
    const ft = KT(s.form.k), form = q(el, '[data-r=form]'), dol = q(el, '[data-r=dol]'); let cur = -1; s.adimlar.forEach((a, j) => { if (t >= KT(a[1])) cur = j; });
    if (t < ft - .05) { form.style.display = dol.style.display = 'none'; qa(el, '[data-ol]').forEach(x => x.style.display = 'none'); } else { form.style.display = dol.style.display = ''; const k = bo(cl((t - ft) / .5, 0, 1)); form.style.opacity = dol.style.opacity = cl((t - ft) / .1, 0, 1); form.style.transform = 'translateY(' + ((1 - k) * 160) + 'px) rotate(' + ((1 - k) * 4 + Math.sin(t * .7) * .4) + 'deg)';
      qa(el, '[data-ol]').forEach((x, j) => { x.style.display = ''; x.style.opacity = cl((t - ft - .3 - j * .08) / .2, 0, 1); x.style.color = j <= cur ? '#C8433A' : '#6B7280'; });
      // seviye: tamamlanan adım + o adımda dolan alan oranı
      let lev = 0; s.adimlar.forEach((a, j) => { const al = s.form.alanlar[j] || []; if (j < cur) lev += 1; else if (j === cur) { const n = al.reduce((z, x) => z + eio(cl((t - KT(x[2])) / .8, 0, 1)), 0); lev += .2 * eio(cl((t - KT(a[1])) / .6, 0, 1)) + (al.length ? .8 * n / al.length : .8); } });
      const v = lev / 5; const sv = q(el, '[data-r=sv]'); sv.style.height = (v * 100) + '%';
      const dg = q(el, '[data-r=dalga]'); dg.style.bottom = 'calc(' + (v * 100) + '% - 8px)'; let d = 'M0 16 '; for (let x = 0; x <= 44; x += 4) d += 'L' + x + ' ' + (8 + Math.sin(t * 5 + x * .3) * 3) + ' '; dg.querySelector('path').setAttribute('d', d + 'L44 16 Z');
      // bölümler: geçmiş adımlar özet satırı, güncel adım açık
      qa(form, '[data-oz]').forEach((x, j) => { x.style.display = j < cur ? 'flex' : 'none'; if (j < cur) { const kk = bo(cl((t - KT(s.adimlar[j + 1][1])) / .35, 0, 1)); x.style.transform = 'scale(' + (.7 + .3 * kk) + ')'; x.style.transformOrigin = 'left'; } });
      qa(form, '[data-bl]').forEach((x, j) => { x.style.display = j === cur ? 'block' : 'none'; });
      let yaz = null; (s.form.alanlar[cur] || []).forEach(([e, dd, k], n) => { const b = q(form, '[data-al="' + cur + '_' + n + '"]'), kk = cl((t - KT(k)) / .7, 0, 1); b.style.clipPath = 'inset(0 ' + ((1 - kk) * 100) + '% 0 0)'; if (kk > 0 && kk < 1) yaz = [b, kk]; });
      const kl = q(el, '[data-r=kalem]'); if (yaz) { const r = yaz[0].getBoundingClientRect(), fr = el.getBoundingClientRect(), sc = fr.width / el.offsetWidth; kl.style.display = ''; kl.style.left = ((r.left - fr.left) / sc + yaz[0].offsetWidth * yaz[1] - 6) + 'px'; kl.style.top = ((r.top - fr.top) / sc - 46 + Math.sin(t * 30) * 3) + 'px'; } else kl.style.display = 'none'; }
    // ölçü kartı
    const ka = q(el, '[data-r=kart]'); let ki = -1; s.kartlar.forEach((c, j) => { if (t >= KT(c.k)) ki = j; }); if (ki < 0) ka.style.display = 'none'; else { const c = s.kartlar[ki], ct = KT(c.k), k = bo(cl((t - ct) / .35, 0, 1)); ka.style.display = '';
      if (ka.dataset.i !== String(ki)) { ka.dataset.i = ki; q(ka, '[data-r=ku]').textContent = c.ust; q(ka, '[data-r=kb]').textContent = c.buyuk; q(ka, '[data-r=ka]').textContent = c.alt || ''; q(ka, '[data-r=kn]').textContent = c.not || ''; q(ka, '[data-r=kbar]').style.display = c.bar ? '' : 'none'; q(ka, '[data-r=kek]').innerHTML = c.ek || ''; q(ka, '[data-r=kek]').style.display = c.ek ? '' : 'none'; if (c.bar) { q(ka, '[data-r=kp0]').textContent = c.bar[2]; q(ka, '[data-r=kp1]').textContent = c.bar[3]; } }
      ka.style.transform = 'rotateX(' + ((1 - k) * 70) + 'deg) translateY(' + ((1 - k) * 30) + 'px) rotate(' + (Math.sin(t * .6) * .4) + 'deg)'; ka.style.transformOrigin = '50% 0'; ka.style.opacity = cl((t - ct) / .08, 0, 1);
      if (c.bar) { const p = eio(cl((t - KT(c.bar[0])) / Math.max(.3, KT(c.bar[1]) - KT(c.bar[0])), 0, 1)); q(ka, '[data-r=kpi]').style.width = (p * 100) + '%'; if (c.bar[4]) q(ka, '[data-r=kp1]').textContent = c.bar[4](p); } }
    // eskiz ekranlar
    (s.ekranlar || []).forEach((e, j) => { const x = q(el, '[data-ek="' + j + '"]'); if (dfGir(x, e.k, e.cik, t, 'x') < 0) return; const a = q(x, '[data-ea="' + j + '"]'); if (a) { const n = Math.floor(cl((t - KT(e.arama[1])) / 1, 0, 1) * e.arama[0].length); a.textContent = e.arama[0].slice(0, n) + (n < e.arama[0].length && Math.floor(t * 4) % 2 ? '|' : ''); }
      (e.satirlar || []).forEach(([m, k, hl], n) => { const r = q(x, '[data-es="' + j + '_' + n + '"]'); r.style.opacity = t < KT(k) ? 0 : 1; r.style.transform = 'translateY(' + ((1 - eo(cl((t - KT(k)) / .25, 0, 1))) * 12) + 'px)'; r.classList.toggle('hl', hl != null && t >= KT(hl)); }); });
    // malzemeler: gelir → durur → döker → çıkar
    (s.malzemeler || []).forEach((m, j) => { const x = q(el, '[data-mz="' + j + '"]'), k0 = KT(m.k), k1 = KT(m.cik), kd = m.dok != null ? KT(m.dok) : null; if (t < k0 - .05 || t > k1 + .6) { x.style.display = 'none'; qa(el, '[data-kr^="' + j + '_"]').forEach(z => z.style.display = 'none'); return; } x.style.display = '';
      const gk = eo(cl((t - k0) / .55, 0, 1)), ck = ei(cl((t - k1) / .5, 0, 1)), tx = m.x, ty = m.y; let X = tx + 700 * (1 - gk) + 700 * ck, Y = ty - 500 * (1 - gk) * (1 - gk) - 200 * ck, R = 25 * (1 - gk) + 30 * ck;
      const dd = kd != null ? cl((t - kd) / 1, 0, 1) : 0, eg = Math.sin(Math.min(1, dd * 1.4) * Math.PI / 2) * (dd < .85 ? 1 : 1 - (dd - .85) / .15); R += -55 * eg; X += -60 * eg; x.style.transform = 'translate(' + X + 'px,' + (Y + Math.sin(t * 2 + j) * 5) + 'px) rotate(' + R + 'deg) scale(' + (m.boy || 1) + ')'; x.style.transformOrigin = '50% 50%'; x.style.opacity = 1 - ck;
      const c = x.querySelector('.cz-il'); if (c) CZ.anim(c, t - k0); qa(el, '[data-kr^="' + j + '_"]').forEach((z, n) => { if (kd == null || dd <= 0 || dd >= 1) { z.style.display = 'none'; return; } z.style.display = ''; const p = ((dd * 2.2 + n / 8) % 1), sx = X + 40, sy = Y + 120, ex = 640 + (hs(n + j) - .5) * 200, ey = 520; z.style.transform = 'translate(' + (sx + (ex - sx) * p) + 'px,' + (sy + (ey - sy) * p - Math.sin(p * Math.PI) * 120) + 'px) rotate(' + (p * 400 * (hs(n) - .5)) + 'deg)'; z.style.opacity = Math.sin(p * Math.PI); }); });
    // notlar (el yazısı + ok)
    (s.notlar || []).forEach((n, j) => { const x = q(el, '[data-nt="' + j + '"]'); if (!dfOn(t, n.k, n.cik)) { x.style.display = 'none'; return; } x.style.display = ''; const k = cl((t - KT(n.k)) / .6, 0, 1); x.style.clipPath = 'inset(-40px ' + ((1 - k) * 100) + '% -200px -40px)'; x.style.opacity = n.cik != null && t > KT(n.cik) ? 1 - cl((t - KT(n.cik)) / .35, 0, 1) : 1; x.style.transform = 'rotate(' + (n.rot || -3) + 'deg)';
      if (n.ok) { const p = q(x, '[data-no="' + j + '"]'), w = x.offsetWidth; p.setAttribute('d', 'M' + (n.ok[0] > 0 ? w + 10 : -10) + ' 26 Q ' + (n.ok[0] / 2 + (n.ok[0] > 0 ? w : 0)) + ' ' + (n.ok[1] / 2 - 30) + ' ' + (n.ok[0] + (n.ok[0] > 0 ? w : 0)) + ' ' + n.ok[1] + ' m -14 -6 l 14 6 l -4 -14'); const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - eo(cl((t - KT(n.k) - .4) / .4, 0, 1))); } });
    (s.balonlar || []).forEach((b, j) => { const x = q(el, '[data-bl2="' + j + '"]'); if (dfGir(x, b.k, b.cik, t, 's') < 0) return; const ci = x.querySelector('s i'); if (ci) ci.style.transform = 'scaleX(' + eo(cl((t - KT(b.ciz)) / .35, 0, 1)) + ')'; });
    (s.damgalar || []).forEach((d, j) => { const x = q(el, '[data-dm="' + j + '"]'); if (!dfOn(t, d.k, d.cik)) { x.style.display = 'none'; return; } x.style.display = ''; const k = eo(cl((t - KT(d.k)) / .2, 0, 1)); x.style.opacity = d.cik != null && t > KT(d.cik) ? 1 - cl((t - KT(d.cik)) / .35, 0, 1) : 1; x.style.transform = 'rotate(' + (d.rot || -6) + 'deg) scale(' + (1 + 1.3 * Math.pow(1 - k, 2)) + ')'; });
    (s.yapiskan || []).forEach((p, j) => { const x = q(el, '[data-ps="' + j + '"]'); if (dfGir(x, p.k, p.cik, t, 'd') < 0) return; x.style.transform += ' rotate(' + (p.rot || 3) + 'deg)'; });
    // adım çizelgesi
    const adm = q(el, '[data-r=adm]'); gir(adm, KT(s.adimK), t, 'y'); q(el, '[data-r=ali]').style.width = (cur < 0 ? 0 : cur / 4 * 100) + '%';
    qa(el, '[data-ad]').forEach((x, j) => { const on = j === cur, ok = j < cur || (s.bitK != null && t >= KT(s.bitK)); x.className = 'd' + (ok ? ' ok' : on ? ' on' : ''); x.textContent = ok ? '✓' : j + 1; const pk = j === cur ? bo(cl((t - KT(s.adimlar[j][1])) / .3, 0, 1)) : 1; x.style.transform = 'scale(' + (.6 + .4 * pk) + ')'; q(el, '[data-ae="' + j + '"]').className = 'e' + (on ? ' on' : ''); });
    // kamera odakları
    let cz = null; (s.odak || []).forEach(z => { if (t >= KT(z.k) && t < KT(z.cik) + .5) cz = z; }); if (cz) { const a = eio(cl((t - KT(cz.k)) / .6, 0, 1)) * (1 - eio(cl((t - KT(cz.cik)) / .5, 0, 1))); el.style.transformOrigin = cz.x + 'px ' + cz.y + 'px'; el.style.scale = String(1 + (cz.s - 1) * a); } else el.style.scale = '1'; },
});`;
module.exports = { css, mark, rt };

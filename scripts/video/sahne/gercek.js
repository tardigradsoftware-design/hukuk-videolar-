// SAHNE DİLİ 8 — "Gerçek ekran" (uzun videolar): altyazısız, ciddi, okunaklı.
// g_ekran: büyük, gerçekçi TEMSİLİ tarayıcı/telefon (panel.js) + kamera tıklanan yere yaklaşır + alt bilgi bandı + ekran görüntüsü simülasyonu.
// g_slayt: sade başlık + gerçekçi belge (ödeme planı, poliçe, sözleşme) + maddeler / alıntı / zaman çizelgesi.
const PANEL = require('../panel'), PCSS = require('../panel_css');
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = PCSS + `
.gr{background:radial-gradient(circle at 40% 35%,#F4F5F7 0,#E6E8EC 70%,#DADDE3 100%);--lac:#0F1B33;--mav:#1A56DB;--kir:#C8102E;--gri:#5F6673}
.gr .pp{left:0;top:0;transform-origin:0 0;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 40px 80px -30px rgba(15,27,51,.45),0 12px 24px -12px rgba(15,27,51,.25)!important;border-radius:14px}
.gr .pp.tel{box-shadow:0 0 0 13px #111,0 0 0 15px #3A3A3A,0 50px 90px -30px rgba(15,27,51,.55)!important}
.gr .pp-tar small{opacity:.55}
.gr .ab{position:absolute;left:110px;bottom:110px;max-width:1300px;display:flex;align-items:stretch;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 30px 60px -24px rgba(15,27,51,.5),0 0 0 1px rgba(15,27,51,.08);z-index:30}
.gr .ab b{display:flex;align-items:center;padding:0 26px;background:var(--lac);color:#fff;font:700 22px GM;letter-spacing:.14em;white-space:nowrap}
.gr .ab span{padding:20px 30px;font:700 40px/1.15 G;letter-spacing:-.02em;color:var(--lac)}
.gr .ab.uy b{background:var(--kir)}
.gr .ray{position:absolute;right:60px;top:90px;width:300px}
.gr .ray .st{font:700 18px GM;letter-spacing:.2em;color:var(--gri)}
.gr .ray .an{margin-top:8px;font:800 46px/1.05 G;letter-spacing:-.03em;color:var(--lac)}
.gr .ray .ad{display:flex;gap:8px;margin-top:18px}.gr .ray .ad i{flex:1;height:8px;border-radius:4px;background:#C9CDD5}.gr .ray .ad i.on{background:var(--mav)}.gr .ray .ad i.ok{background:var(--lac)}
.gr .ray .kt{margin-top:26px;padding:20px 22px;background:#fff;border-radius:12px;box-shadow:0 20px 40px -24px rgba(15,27,51,.45);font:600 28px/1.25 G;color:var(--lac)}
.gr .ray .kt small{display:block;margin-bottom:6px;font:700 15px GM;letter-spacing:.18em;color:var(--mav)}
.gr .fl{position:absolute;inset:0;background:#fff;z-index:40;pointer-events:none}
.gr .th{position:absolute;right:70px;bottom:90px;width:360px;height:220px;border-radius:12px;background:#fff;border:6px solid #fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.45);z-index:41;overflow:hidden}
.gr .th i{display:block;height:20px;background:#1C1D21}.gr .th em{display:block;margin:10px;height:24px;border-radius:6px;background:#E8EBF1}.gr .th u{display:block;margin:8px 10px;height:12px;border-radius:6px;background:#EEF0F4}
.gr .tst{position:absolute;right:70px;bottom:40px;padding:10px 18px;border-radius:999px;background:rgba(15,27,51,.92);color:#fff;font:600 22px G;z-index:41;white-space:nowrap}
.gr .sl{position:absolute;inset:0}
.gr .sl .ust{position:absolute;left:140px;top:120px;font:700 22px GM;letter-spacing:.22em;color:var(--mav)}
.gr .sl h1{position:absolute;left:140px;top:160px;margin:0;font:800 84px/1.02 G;letter-spacing:-.045em;color:var(--lac);max-width:1400px}
.gr .sl.bl .ust,.gr .sl.bl h1{left:880px;max-width:700px}.gr .sl.bl h1{font-size:70px}
.gr .bel{position:absolute;left:130px;top:140px;width:640px;height:860px;background:#fff;border-radius:6px;box-shadow:0 2px 0 #eee,0 40px 70px -30px rgba(15,27,51,.5),0 0 0 1px rgba(15,27,51,.06);padding:46px 50px;color:var(--lac)}
.gr .bel .bh{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:18px;border-bottom:2px solid var(--lac)}
.gr .bel .bh b{font:800 30px G;letter-spacing:-.02em}.gr .bel .bh small{font:600 14px GM;letter-spacing:.14em;color:var(--gri);text-align:right}
.gr .bel .bm{margin-top:18px;font:500 17px/1.6 G;color:#7A808C}
.gr .bel .rw{position:relative;display:flex;justify-content:space-between;padding:16px 10px;border-bottom:1px solid #E3E6EC;font:600 26px G}
.gr .bel .rw em{font-style:normal;font:600 24px GM}.gr .bel .rw i{position:absolute;inset:4px -4px;border-radius:6px;background:rgba(255,213,79,.55);transform-origin:left;z-index:-1}
.gr .bel .ln{height:10px;border-radius:5px;background:#EEF0F4;margin:14px 0}
.gr .bel .dm{position:absolute;right:40px;bottom:60px;padding:6px 18px;border:4px solid var(--kir);color:var(--kir);border-radius:8px;font:800 30px G;transform:rotate(-8deg);opacity:.85}
.gr .md{position:absolute;left:140px;display:flex;gap:22px;align-items:flex-start;max-width:1380px;font:600 40px/1.25 G;letter-spacing:-.02em;color:var(--lac)}
.gr .sl.bl .md{left:880px;max-width:700px;font-size:36px}
.gr .md i{flex:none;width:54px;height:54px;border-radius:12px;background:var(--mav);color:#fff;font:800 28px G;font-style:normal;display:flex;align-items:center;justify-content:center;margin-top:-2px}
.gr .md.uy i{background:var(--kir)}.gr .md.ok i{background:#127A4A}
.gr .md mark{background:linear-gradient(90deg,rgba(255,213,79,.7) var(--p,0%),transparent var(--p,0%));color:inherit;padding:0 .08em}
.gr .al{position:absolute;left:140px;top:330px;max-width:1300px;padding:34px 40px;background:#fff;border-left:10px solid var(--kir);border-radius:10px;box-shadow:0 30px 60px -30px rgba(15,27,51,.45);font:700 56px/1.15 G;letter-spacing:-.03em;color:var(--lac)}
.gr .al small{display:block;margin-bottom:10px;font:700 20px GM;letter-spacing:.2em;color:var(--kir)}
.gr .al s{text-decoration:none;position:relative}.gr .al s i{position:absolute;left:-6px;right:-6px;top:52%;height:8px;background:var(--kir);transform-origin:left;border-radius:4px}
.gr .al.cv{border-left-color:#127A4A}.gr .al.cv small{color:#127A4A}
.gr .zm{position:absolute;left:140px;width:1380px}
.gr .zm .et{display:flex;justify-content:space-between;font:700 24px G;color:var(--gri);margin-bottom:12px}.gr .zm .et b{color:var(--lac);font:800 34px G}
.gr .zm .ax{position:relative;height:56px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px #D5D9E0;overflow:hidden}.gr .zm .ax i{position:absolute;top:0;bottom:0;border-radius:12px;background:var(--mav)}
.gr .zm .tk{display:flex;justify-content:space-between;margin-top:10px;font:600 20px GM;color:var(--gri)}
.gr .kart{position:absolute;left:140px;top:300px;width:1380px;padding:36px 44px;background:#fff;border:0;color:var(--lac);border-radius:16px;box-shadow:0 40px 80px -36px rgba(15,27,51,.5)}
.gr .kart h3{margin:0 0 10px;font:700 22px GM;letter-spacing:.2em;color:var(--mav)}
.gr .kart .r{display:flex;gap:20px;align-items:center;padding:16px 0;border-top:1px solid #E3E6EC;font:600 36px G;color:var(--lac)}.gr .kart .r i{width:40px;height:40px;border-radius:50%;background:#127A4A;color:#fff;font:800 24px G;font-style:normal;display:flex;align-items:center;justify-content:center;flex:none}
.gr .ab3{position:absolute;display:flex;align-items:center;gap:26px;padding:22px 30px;background:#fff;border-radius:16px;box-shadow:0 30px 60px -26px rgba(15,27,51,.5)}
.gr .ab3 b{display:block;font:800 40px G;letter-spacing:-.03em;color:var(--lac)}.gr .ab3 small{font:600 24px G;color:var(--gri)}.gr .ab3 em{font-style:normal;padding:14px 26px;border-radius:999px;background:var(--kir);color:#fff;font:800 28px G}
`;
const ss = j => `<i class="fl" data-fl="${j}"></i><div class="th" data-th="${j}"><i></i><em></em><u></u><u style="width:70%"></u><u style="width:80%"></u><u style="width:55%"></u></div><div class="tst" data-ts="${j}">Ekran görüntüsü kaydedildi</div>`;
const ray = s => `<div class="ray"><div class="st">${esc(s.rayUst || '')}</div><div class="an">${esc(s.rayAd || '')}</div><div class="ad">${[0, 1, 2, 3, 4].map(n => `<i class="${n + 1 === s.adim ? 'on' : n + 1 < (s.adim || 0) ? 'ok' : ''}"></i>`).join('')}</div>${(s.yan || []).map((y, n) => `<div class="kt" data-yn="${n}"><small>${esc(y[1])}</small>${esc(y[2])}</div>`).join('')}</div>`;
const BELGE = {
  plan: b => `<div class="bh"><b>${esc(b.baslik || 'Kredi Ödeme Planı')}</b><small>TEMSİLİ<br>••• BANKASI</small></div><div class="bm">Müşteri: ••• ••• · Kredi no: •••••••</div>${b.satirlar.map(([a, c, k, v], n) => `<div class="rw" data-rw="${n}">${v != null ? '<i></i>' : ''}<span>${esc(a)}</span><em>${esc(c)}</em></div>`).join('')}${Array.from({ length: 6 }, (_, n) => `<div class="ln" style="width:${90 - n * 9}%"></div>`).join('')}${b.damga ? `<div class="dm" data-bd="1">${esc(b.damga)}</div>` : ''}`,
};
BELGE.police = BELGE.plan; BELGE.sozlesme = BELGE.plan;
const mark = {
  g_ekran: s => `${PANEL.html(Object.assign({}, s.panel, { tip: 'panel' }), 'g' + s.a)}${ray(s)}${(s.altbant || []).map((a, n) => `<div class="ab${a.uy ? ' uy' : ''}" data-ab="${n}"><b>${esc(a.ust)}</b><span>${esc(a.metin)}</span></div>`).join('')}${(s.ss || []).map((k, n) => ss(n)).join('')}`,
  g_slayt: s => `<div class="sl${s.belge ? ' bl' : ''}">${s.belge ? `<div class="bel" data-r="bel">${BELGE[s.belge.tur || 'plan'](s.belge)}</div>` : ''}
    <div class="ust" data-r="u">${esc(s.ust || '')}</div><h1 data-r="h">${esc(s.baslik || '')}</h1>
    ${(s.maddeler || []).map(([m, k, v, tip], n) => `<div class="md${tip ? ' ' + tip : ''}" data-md="${n}" style="top:${(s.mdY || 400) + n * (s.mdAra || 110)}px"><i>${tip === 'uy' ? '!' : tip === 'ok' ? '✓' : n + 1}</i><span>${v ? esc(m).replace(esc(v), '<mark>' + esc(v) + '</mark>') : esc(m)}</span></div>`).join('')}
    ${s.alinti ? `<div class="al" data-r="al"><small>${esc(s.alinti.ust)}</small><s>${esc(s.alinti.metin)}<i></i></s></div>` : ''}
    ${s.cevap ? `<div class="al cv" data-r="cv" style="top:${s.cevap.y || 620}px"><small>${esc(s.cevap.ust)}</small>${esc(s.cevap.metin)}</div>` : ''}
    ${(s.zaman || []).map((z, n) => `<div class="zm" data-zm="${n}" style="top:${z.y}px"><div class="et"><span>${esc(z.sol)}</span><b>${esc(z.orta)}</b><span>${esc(z.sag)}</span></div><div class="ax"><i data-zi="${n}" style="left:${z.a / z.n * 100}%"></i></div><div class="tk">${Array.from({ length: z.n + 1 }, (_, m) => m % (z.adim || 1) === 0 ? `<span>${m}</span>` : '').join('')}</div></div>`).join('')}
    ${s.kart ? `<div class="kart" data-r="kt"><h3>${esc(s.kart.ust)}</h3>${s.kart.satirlar.map(([m, k], n) => `<div class="r" data-kr="${n}"><i>✓</i>${esc(m)}</div>`).join('')}</div>` : ''}
    ${s.abone ? `<div class="ab3" data-r="abn" style="left:${s.abone.x || 140}px;top:${s.abone.y || 760}px"><div><b>${esc(s.abone.yazi)}</b><small>${esc(s.abone.ek)}</small></div><em>Abone ol</em></div>` : ''}
    ${ray(Object.assign({}, s, { yan: [] })).replace('class="ray"', 'class="ray" style="display:' + (s.adim ? 'block' : 'none') + '"')}
    ${(s.altbant || []).map((a, n) => `<div class="ab${a.uy ? ' uy' : ''}" data-ab="${n}"><b>${esc(a.ust)}</b><span>${esc(a.metin)}</span></div>`).join('')}
    ${(s.ss || []).map((k, n) => ss(n)).join('')}</div>`,
};
const rt = `
function gKT(x) { return x == null ? null : Array.isArray(x) ? T(x[0]) + x[1] : T(x); }
function gPanel(s) { if (s.__b) return s.__b; const b = JSON.parse(JSON.stringify(s.panel)); b.t = s.t; b.ekranT = b.ekranlar.map(e => gKT(e.k)); b.ekranlar.forEach(e => { Object.keys(e).forEach(k => { if (/K$/.test(k) && e[k] != null && k !== 'alanK') e[k.slice(0, -1) + 'T'] = gKT(e[k]); }); if (e.alanK) e.alanT = e.alanK.map(gKT); }); return (s.__b = b); }
function gOrtak(s, el, t) {
  (s.altbant || []).forEach((a, n) => { const e = q(el, '[data-ab="' + n + '"]'); const t0 = gKT(a.k), t1 = a.cik != null ? gKT(a.cik) : 1e9; if (t < t0 - .05 || t > t1 + .4) { e.style.display = 'none'; return; } e.style.display = ''; const k = eo(cl((t - t0) / .35, 0, 1)), z = ei(cl((t - t1) / .35, 0, 1)); e.style.opacity = Math.min(cl((t - t0) / .12, 0, 1), 1 - z); e.style.transform = 'translateX(' + ((1 - k) * -80 - z * 60) + 'px)'; e.style.clipPath = 'inset(0 ' + ((1 - k) * 100) + '% 0 0)'; });
  (s.yan || []).forEach((y, n) => { const e = q(el, '[data-yn="' + n + '"]'); if (e) gir(e, gKT(y[0]), t, 'x'); });
  (s.ss || []).forEach((k, n) => { const t0 = gKT(k), d = t - t0, fl = q(el, '[data-fl="' + n + '"]'), th = q(el, '[data-th="' + n + '"]'), ts = q(el, '[data-ts="' + n + '"]');
    fl.style.opacity = d < 0 ? 0 : Math.max(0, .85 - d / .3); const v = d >= 0 && d < 2.4; th.style.display = ts.style.display = v ? '' : 'none'; if (!v) return;
    const k1 = eio(cl(d / .45, 0, 1)), out = ei(cl((d - 1.9) / .5, 0, 1)); th.style.transform = 'translate(' + (-(1 - k1) * 700 + out * 420) + 'px,' + (-(1 - k1) * 380) + 'px) scale(' + (2.4 - 1.4 * k1) + ') rotate(' + (-(1 - k1) * 2) + 'deg)'; th.style.opacity = 1 - out; ts.style.opacity = cl((d - .4) / .2, 0, 1) * (1 - out); });
}
Object.assign(D, {
  g_ekran(s, lt, o, t) { const el = s.el, pp = el.querySelector('.pp'), b = gPanel(s), tel = s.panel.cihaz === 'tel';
    const sc = s.olcek || (tel ? 1.05 : 1.3), x0 = s.x != null ? s.x : (tel ? 520 : 70), y0 = s.y != null ? s.y : (tel ? 80 : 70), k = eio(cl(lt / .55, 0, 1));
    pp.style.transform = 'translate(' + x0 + 'px,' + (y0 + (1 - k) * 80) + 'px) scale(' + (sc * (.94 + .06 * k)) + ')'; pp.style.opacity = cl(lt / .2, 0, 1); window.PANEL.kare(pp, b, t); gOrtak(s, el, t);
    const ray = q(el, '.ray'); ray.style.opacity = cl((lt - .2) / .3, 0, 1); },
  g_slayt(s, lt, o, t) { const el = s.el; gir(q(el, '[data-r=u]'), s.t, t, 'y'); gir(q(el, '[data-r=h]'), s.t + .08, t, 'y');
    const bel = q(el, '[data-r=bel]'); if (bel) { const k = eio(cl(lt / .6, 0, 1)); bel.style.transform = 'translateY(' + ((1 - k) * 140) + 'px) rotate(' + (-1.5 + (1 - k) * -4 + Math.sin(t * .5) * .3) + 'deg)'; bel.style.opacity = cl(lt / .2, 0, 1);
      (s.belge.satirlar || []).forEach(([a, c, kk, v], n) => { const r = q(bel, '[data-rw="' + n + '"]'); r.style.opacity = t < gKT(kk) ? .0 : 1; const hi = r.querySelector('i'); if (hi) hi.style.transform = 'scaleX(' + eo(cl((t - gKT(v)) / .5, 0, 1)) + ')'; });
      const bd = q(bel, '[data-bd]'); if (bd) { const t0 = gKT(s.belge.damgaK); bd.style.opacity = t < t0 ? 0 : .85; bd.style.transform = 'rotate(-8deg) scale(' + (t < t0 ? 1.8 : 1 + .8 * Math.pow(1 - eo(cl((t - t0) / .22, 0, 1)), 2)) + ')'; } }
    (s.maddeler || []).forEach(([m, kk, v], n) => { const e = q(el, '[data-md="' + n + '"]'); gir(e, gKT(kk), t, 'y'); const mk = e.querySelector('mark'); if (mk) mk.style.setProperty('--p', (eo(cl((t - gKT(s.vurguK && s.vurguK[n] != null ? s.vurguK[n] : kk) - .2) / .5, 0, 1)) * 100) + '%'); });
    const al = q(el, '[data-r=al]'); if (al) { gir(al, gKT(s.alinti.k), t, 'y'); al.querySelector('s i').style.transform = 'scaleX(' + eo(cl((t - gKT(s.alinti.cizK)) / .35, 0, 1)) + ')'; if (s.alinti.cik != null && t > gKT(s.alinti.cik)) { const z = cl((t - gKT(s.alinti.cik)) / .4, 0, 1); al.style.transform += ' translateY(' + (-150 * eio(z)) + 'px) scale(' + (1 - .25 * eio(z)) + ')'; al.style.opacity = 1 - .5 * z; } }
    const cv = q(el, '[data-r=cv]'); if (cv) gir(cv, gKT(s.cevap.k), t, 'y');
    (s.zaman || []).forEach((z, n) => { gir(q(el, '[data-zm="' + n + '"]'), gKT(z.k), t, 'y'); const p = eio(cl((t - gKT(z.dolK)) / 1, 0, 1)); q(el, '[data-zi="' + n + '"]').style.width = ((z.b - z.a) / z.n * 100 * p) + '%'; });
    const kt = q(el, '[data-r=kt]'); if (kt) { gir(kt, gKT(s.kart.k), t, 'y'); s.kart.satirlar.forEach(([m, kk], n) => { const r = q(kt, '[data-kr="' + n + '"]'); r.style.opacity = t < gKT(kk) ? .25 : 1; r.querySelector('i').style.transform = 'scale(' + (t < gKT(kk) ? 0 : bo(cl((t - gKT(kk)) / .3, 0, 1))) + ')'; }); if (s.kart.cik != null && t > gKT(s.kart.cik)) { const z = eio(cl((t - gKT(s.kart.cik)) / .4, 0, 1)); kt.style.opacity = 1 - z; } }
    const ab = q(el, '[data-r=abn]'); if (ab) gir(ab, gKT(s.abone.k), t, 'y');
    gOrtak(s, el, t); },
});`;
module.exports = { css, mark, rt };

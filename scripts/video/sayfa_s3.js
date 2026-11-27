// Stil 3 SAHNE MOTORU (DistilBook ruhu: gece, zarif serif, neon yapılar, uçuşan sayfalar, bilgi diyagramları).
// Renk kostümü değil: her sahne konuya özel kurulur. Sahneler plan.s3 içinde: [{ tur, a: kelimeIndeksi, ...veri }].
// Amaç: izleyici ANLASIN — kural, süre, oran görsel olarak kurulur. Deterministik; her kare zamanın saf fonksiyonu.
const fs = require('fs'), path = require('path');
const FN = p => 'file://' + path.join(__dirname, '..', '..', 'node_modules', p);
const MOD = ['mavi', 'celld', 'distil', 'flow', 'sema'].map(n => require('./sahne/' + n));
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// --- sahne stilleri (prompt-motion referanslarından uyarlama): renk + yazı + kart dili + geçiş + dekor
// 1 Mavi Ferah (BlueVisa) · 2 Pastel Brutal (Celld) · 3 Kâğıt Serif (DistilBook, açık) · 4 Renkli Hap (DistilBook 2) · 5 Turuncu Editoryal (Flowdrive)
const RENK = { 1: ['#1E7BF2', '#9CC7FF', '#12B76A'], 2: ['#5B6CFF', '#F7D14C', '#2FB863'], 3: ['#2F6BFF', '#F6B92B', '#12B76A'], 4: ['#7B5CFF', '#FFB4E0', '#12B76A'], 5: ['#E8551F', '#F2C14E', '#2E7D5B'] };
const KARMA_S3 = { acilis: 4, banka: 1, kitap: 5, yol: 2, cayma: 1 };
const boya = (x, n) => { const [a, b, c] = RENK[n] || RENK[3]; return x.replace(/#2F6BFF/g, a).replace(/#F6B92B/g, b).replace(/#12B76A/g, c).replace(/rgba\(47,107,255/g, 'rgba(' + [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)).join(',')); };
function sayfa({ W, H, L, tl }) {
  const plan = tl.planS3 || [];
  const tv = (process.argv.find(a => a.startsWith('--tema=')) || '').slice(7) || '3', karma = tv === 'karma';
  const tem = plan.map(sc => tl.planDil ? 0 : karma ? (KARMA_S3[sc.tur] || 3) : +tv);
  const S = plan.map((sc, i) => `<div class="sh t${tem[i]} ${sc.sinif || ''}" id="sh${i}" data-tur="${sc.tur}" data-tm="${tem[i]}">${MARK[sc.tur] ? boya(MARK[sc.tur](sc, i), tem[i]) : ''}</div>`).join('\n');
  const rtTema = tem[tem.length - 1] || 3;
  return boya(`<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>
@font-face{font-family:IS;src:url('${FN('@fontsource/instrument-serif/files/instrument-serif-latin-ext-400-normal.woff2')}');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:IS;src:url('${FN('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2')}')}
@font-face{font-family:IS;font-style:italic;src:url('${FN('@fontsource/instrument-serif/files/instrument-serif-latin-ext-400-italic.woff2')}');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:IS;font-style:italic;src:url('${FN('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}')}
@font-face{font-family:G;src:url('${FN('@fontsource-variable/geist/files/geist-latin-ext-wght-normal.woff2')}');font-weight:100 900;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:G;src:url('${FN('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}');font-weight:100 900}
@font-face{font-family:GM;src:url('${FN('@fontsource-variable/geist-mono/files/geist-mono-latin-ext-wght-normal.woff2')}');font-weight:100 900;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:GM;src:url('${FN('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')}');font-weight:100 900}
@font-face{font-family:Arc;src:url('${FN('@fontsource-variable/archivo/files/archivo-latin-ext-standard-normal.woff2')}') format('woff2');font-weight:100 900;font-stretch:62% 125%;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Arc;src:url('${FN('@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2')}') format('woff2');font-weight:100 900;font-stretch:62% 125%}
${TEMA_CSS}
${MOD.map(m => m.css).join('\n')}
body.k #sub span{color:#fff}
:root{--ink:#151515;--mint:#12B76A;--mavi:#2F6BFF;--pemb:#E8402F;--sicak:#F6B92B;--kirm:#E8402F}
*{box-sizing:border-box}html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#fff;color:var(--ink);font-family:G,sans-serif}
#bg{position:absolute;inset:0;background:#fff radial-gradient(#E3E5EB 1.6px,transparent 1.8px) 0 0/36px 36px}
#toz{position:absolute;inset:0}
#cam{position:absolute;inset:0;transform-origin:50% 45%}
.sh{position:absolute;inset:0;display:none}
.serif{font-family:IS;font-weight:400;letter-spacing:-.015em;line-height:.95}.it{font-style:italic}
.glow{}
.msk{display:block;overflow:hidden;padding-bottom:.12em}.msk>span{display:inline-block}
.etk{font:600 22px GM;letter-spacing:.28em;color:#6B7280;text-transform:uppercase}
.hap{position:absolute;padding:14px 34px 16px;border-radius:999px;font:500 46px IS;font-style:italic;border:2px solid currentColor;box-shadow:5px 5px 0 currentColor;background:#fff;border-width:3px}
.kg{position:absolute;left:0;top:0;width:150px;height:200px;margin:-100px 0 0 -75px;border-radius:6px;background:#fff;border:2.5px solid #151515;box-shadow:6px 6px 0 #151515;overflow:hidden}
.kg i{display:block;height:7px;margin:14px 14px 0;border-radius:4px;background:#C9CBD3}.kg i:nth-child(odd){width:60%}.kg b{display:block;height:46px;margin:14px;border-radius:4px;background:#DDE3F5}
.kart{position:absolute;background:#FFFDF8;border:3px solid #151515;color:#151515;border-radius:22px;box-shadow:8px 8px 0 #151515}
.dk{left:560px;top:250px;width:800px;padding:34px 44px}.dk h4{margin:0 0 6px;font:600 20px GM;letter-spacing:.2em;color:#6B7280}.dk h3{margin:0 0 18px;font:400 58px IS;color:#151515}
.dk .r{display:flex;justify-content:space-between;padding:18px 16px;border-top:1.5px solid #D8D6CF;font:600 30px G;border-radius:10px}.dk .r b{font:700 28px GM}
.dk .r.hl{background:linear-gradient(90deg,rgba(246,185,43,.0),rgba(246,185,43,.0))}
.cip{position:absolute;left:0;top:0;padding:16px 34px;border-radius:999px;background:#F6B92B;color:#151515;border:3px solid #151515;font:700 40px G;white-space:nowrap;box-shadow:5px 5px 0 #151515}
svg.nn{position:absolute;inset:0;overflow:visible}svg.nn .ln{fill:none;stroke-linecap:round;stroke-linejoin:round}
.dug{position:absolute;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:400 64px IS;color:#151515;background:#fff;border:4px solid #151515;box-shadow:5px 5px 0 #151515}
.dug small{position:absolute;top:132px;font:600 22px GM;letter-spacing:.2em;color:#6B7280;white-space:nowrap}
.hc{position:absolute;width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:16px;border:2px solid rgba(21,21,21,.25);display:flex;align-items:center;justify-content:center;font:600 22px GM;color:#6B7280}
.bar{position:absolute;height:64px;border-radius:16px;background:#F1F2F5;border:3px solid #151515;overflow:hidden}.bar i{position:absolute;top:0;bottom:0;left:0;border-radius:16px}
.bl{position:absolute;font:600 22px GM;letter-spacing:.14em;color:#6B7280;white-space:nowrap}
#adim{position:absolute;left:70px;top:46px;display:flex;align-items:center;gap:14px;opacity:0}#adim i{width:44px;height:44px;border-radius:50%;border:2.5px solid #151515;font:400 26px IS;font-style:normal;display:flex;align-items:center;justify-content:center;color:var(--ink)}
#adim i.on{background:var(--mavi);border-color:var(--mavi);color:#fff}#adim i.ok{background:#151515;color:#fff}#adim span{margin-left:10px;font:600 22px GM;letter-spacing:.2em;color:var(--ink)}
#sub{position:absolute;left:0;right:0;top:${H - 128}px;text-align:center;z-index:8}
#sub span{display:inline-block;margin:0 5px;padding:6px 14px 8px;border-radius:14px;font:600 44px G;letter-spacing:-.02em;color:#151515}
#sub span.on{color:#fff;background:#E8402F;transform:rotate(-2deg)}
#stage{position:absolute;left:1600px;top:730px;width:300px;height:300px;z-index:7;transform:scaleX(-1);filter:drop-shadow(0 14px 18px rgba(0,0,0,.18))}
#vin{display:none}
#gren{position:absolute;inset:0;width:${W}px;height:${H}px;mix-blend-mode:multiply;opacity:.05;pointer-events:none}
</style></head><body>
<div id="bg"></div><div id="deko">${DEKO}</div><canvas id="toz" width="${W >> 1}" height="${H >> 1}"></canvas>
<div id="cam">${S}</div>
<div id="adim">${[1, 2, 3, 4, 5].map(n => `<i>${n}</i>`).join('')}<span></span></div>
<div id="vin"></div><i id="wl"></i><div id="sub"></div>${tl.mk ? '<div id="stage"></div>' : ''}<canvas id="gren" width="${W >> 1}" height="${H >> 1}"></canvas>
${tl.mk ? `<script>${fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8')}</script>` : ''}<script>${fs.readFileSync(path.join(__dirname, 'cizimler.js'), 'utf8')}</script>
<script>
const TL = ${JSON.stringify({ adimPos: tl.adimPos || null, tem, s3: plan, kelimeler: tl.kelimeler, parcalar: tl.parcalar, duration: tl.duration, mk: tl.mk || null })};
const W = ${W}, H = ${H};
${RUNTIME}
${MOD.map(m => m.rt).join('\n')}
</script></body></html>`, rtTema);
}

const TEMA_CSS = `
#deko{position:absolute;inset:0;overflow:hidden;pointer-events:none}#deko>*{position:absolute;display:none}
#wl{position:absolute;left:0;right:0;height:8px;background:#E8551F;z-index:6;display:none;box-shadow:0 0 0 2px #151515}
/* 1 MAVİ FERAH: yumuşak mavi ışık, Geist kalın küçük harf, gölgeli yuvarlak kartlar */
body.b1 #bg{background:radial-gradient(circle at 30% 45%,#E3EEFF 0,#F6F9FF 40%,#fff 75%)}
.t1 .serif{font-family:G;font-weight:800;letter-spacing:-.055em;text-transform:lowercase;line-height:1}.t1 .serif .it{font-style:normal;color:#1E7BF2}
.t1 .hap{font:700 40px G;font-style:normal;background:#1E7BF2;color:#fff!important;border:0;box-shadow:0 20px 40px -14px rgba(30,123,242,.6)!important}
.t1 :is(.kart,.kg,.dug,.cip,.bar,.hc){border:0!important;box-shadow:0 0 0 1px rgba(30,110,230,.14),0 30px 60px -24px rgba(30,100,220,.5)!important}.t1 .kart{border-radius:28px}.t1 .cip{background:#1E7BF2;color:#fff}
.t1 [data-r=ktp]>div{border:0!important;box-shadow:0 40px 80px -30px rgba(30,100,220,.45)!important}
body.b1 #sub span.on{background:#1E7BF2;transform:none;border-radius:999px}body.b1 #adim i.on{background:#1E7BF2;border-color:#1E7BF2}
/* 2 PASTEL BRUTAL: krem zemin, Archivo geniş siyah, pastel dolgulu kalın kontur kartlar, sert kayma + sarsıntı */
body.b2 #bg{background:#FBF6EA}
.t2 .serif{font-family:Arc;font-weight:900;font-stretch:96%;letter-spacing:-.035em;line-height:.92}.t2 .serif .it{font-style:normal;background:#F7D14C;padding:0 .08em;box-shadow:inset 0 -.12em 0 #151515}
.t2 .hap{font:900 40px Arc;font-style:normal;font-stretch:90%;color:#151515!important;border:4px solid #151515!important;box-shadow:6px 6px 0 #151515!important;border-radius:12px}
.t2 .hap[data-hap="0"]{background:#A8F08C}.t2 .hap[data-hap="1"]{background:#FFB4E0}.t2 .hap[data-hap="2"]{background:#BFE3FF}
.t2 :is(.kart,.kg,.dug,.cip,.bar){border:4px solid #151515!important;box-shadow:9px 9px 0 #151515!important;border-radius:10px!important}.t2 .kart{background:#FFF0A8}.t2 .kg{background:#D9F7E4}.t2 .kg:nth-child(3n){background:#FFE3F2}.t2 .kg:nth-child(3n+1){background:#E2EEFF}
.t2 .dug{border-radius:14px!important}.t2 [data-r=ktp]>div{border:4px solid #151515!important;box-shadow:9px 9px 0 #151515!important}.t2 [data-r=yuz] .it{color:#151515!important}.t4 [data-r=yuz] .it{color:#fff!important}.t1 [data-r=yuz] .it{color:#12B76A!important}
body.b2 #sub span.on{background:#FF7AC6;color:#151515;border:3px solid #151515}body.b2 #adim i.on{background:#FF7AC6;color:#151515}
/* 4 RENKLİ HAP: lila-gri zemin, Geist 900 sıkı, renkli hap vurgular, dairesel açılış */
body.b4 #bg{background:radial-gradient(circle at 70% 25%,#F3EEFF 0,#EEEEF3 60%)}
.t4 .serif{font-family:G;font-weight:900;letter-spacing:-.06em;line-height:.98}.t4 .serif .it{font-style:normal;color:#fff;background:#7B5CFF;padding:0 .14em .04em;border-radius:.4em}
.t4 .hap{font:800 42px G;font-style:normal;color:#fff!important;border:0!important;box-shadow:0 20px 40px -16px rgba(70,40,140,.6)!important}.t4 .hap[data-hap="0"]{background:#E8402F}.t4 .hap[data-hap="1"]{background:#7B5CFF}.t4 .hap[data-hap="2"]{background:#12B76A}
.t4 :is(.kart,.kg,.dug,.cip,.bar){border:0!important;box-shadow:0 26px 50px -20px rgba(70,40,140,.45),0 0 0 1px rgba(70,40,140,.1)!important}.t4 .kart{border-radius:30px}.t4 .kg{border-radius:18px}.t4 .cip{background:#7B5CFF;color:#fff}
.t4 [data-r=ktp]>div{border:0!important;box-shadow:0 30px 60px -24px rgba(70,40,140,.5)!important}
body.b4 #sub span.on{background:#7B5CFF;transform:none;border-radius:999px}body.b4 #adim i{border-radius:999px}body.b4 #adim i.on{background:#7B5CFF;border-color:#7B5CFF}
/* 5 TURUNCU EDİTORYAL: noktalı kırık beyaz, Instrument Serif + mono, ince çizgi, köşe çerçevesi, perde geçişi */
body.b5 #bg{background:#F4F2EE radial-gradient(#D8D2C8 1.4px,transparent 1.6px) 0 0/34px 34px}
.t5 .serif .it{color:#E8551F}.t5 .hap{font:600 26px GM;font-style:normal;letter-spacing:.16em;text-transform:uppercase;border:1.5px solid #151515!important;color:#151515!important;box-shadow:none!important;background:#F4F2EE;border-radius:4px}
.t5 :is(.kart,.kg,.dug,.cip,.bar){border:1.5px solid #151515!important;box-shadow:0 30px 50px -34px rgba(0,0,0,.45)!important;border-radius:6px!important}.t5 .dug{border-radius:50%!important}.t5 .cip{background:#E8551F;color:#fff}
.t5 [data-r=ktp]>div{border:1.5px solid #151515!important;box-shadow:0 30px 50px -34px rgba(0,0,0,.45)!important}
body.b5 #sub span.on{background:#E8551F;transform:none;border-radius:4px}body.b5 #adim i{font-family:GM;font-size:18px}body.b5 #adim i.on{background:#E8551F;border-color:#E8551F}
#deko .ko{inset:0}#deko .ko b{position:absolute;width:30px;height:30px;border:0 solid #151515;opacity:.55}#deko .ko i{position:absolute;font:600 15px GM;letter-spacing:.22em;color:#8B8E95;font-style:normal}`;
const DEKO = [0, 1, 2].map(n => `<div data-dk="1" data-n="${n}" style="left:${[120, 1300, 700][n]}px;top:${[150, 520, 700][n]}px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(30,123,242,.16),transparent 65%)"></div>`).join('')
  + [0, 1, 2, 3].map(n => `<div data-dk="2" data-n="${n}" style="left:${[60, 1790, 1750, 90][n]}px;top:${[70, 80, 560, 640][n]}px;width:${[90, 70, 110, 60][n]}px;height:${[90, 70, 110, 60][n]}px">${n % 2 ? '<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39Z" fill="#F7D14C" stroke="#151515" stroke-width="5"/></svg>' : '<div style="width:100%;height:100%;background:repeating-linear-gradient(-45deg,#151515 0 7px,transparent 7px 16px);border:4px solid #151515;border-radius:12px"></div>'}</div>`).join('')
  + [0, 1, 2, 3, 4, 5].map(n => `<div data-dk="4" data-n="${n}" style="left:${[80, 1780, 300, 1600, 40, 1840][n]}px;top:0;width:${[60, 90, 36, 50, 80, 40][n]}px;height:${[24, 34, 36, 20, 30, 40][n]}px;border-radius:999px;background:${['#E8402F', '#7B5CFF', '#12B76A', '#F6B92B', '#7B5CFF', '#E8402F'][n]};opacity:.5"></div>`).join('')
  + `<div data-dk="5" data-n="0" class="ko"><b style="left:34px;top:34px;border-left-width:2px;border-top-width:2px"></b><b style="right:34px;top:34px;border-right-width:2px;border-top-width:2px"></b><b style="left:34px;bottom:34px;border-left-width:2px;border-bottom-width:2px"></b><b style="right:34px;bottom:34px;border-right-width:2px;border-bottom-width:2px"></b><i style="right:80px;top:42px">HAK DOSYASI · REHBER</i><i style="left:80px;bottom:42px">TEMSİLİ ANLATIM</i><i data-saat="1" style="right:80px;bottom:42px"></i></div>`;

// ---------------- işaretleme (sahne türleri) ----------------
const MARK = {
  // uçuşan sayfalar + başlık + neon haplar + ödeme planı kartı
  acilis: s => `${Array.from({ length: 46 }, (_, j) => `<div class="kg" data-j="${j}"><i></i><i></i><b></b><i></i><i></i><i></i></div>`).join('')}
    <div class="serif glow" data-r="bas" style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:120px"><span class="msk"><span>${esc(s.baslik)}</span></span></div>
    ${(s.haplar || []).map((h, j) => `<div class="hap" data-hap="${j}" style="color:${['var(--mint)', 'var(--mavi)', 'var(--pemb)'][j % 3]}">${esc(h[0])}</div>`).join('')}
    <div class="kart dk" data-r="dk"><h4>${esc(s.kart.ust)}</h4><h3>${esc(s.kart.baslik)}</h3>${s.kart.satirlar.map((r, j) => `<div class="r${j === s.kart.hl ? ' hl' : ''}" data-row="${j}"><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>`,
  // prim çipi bankaya girer, "zorunda değilsin" ile geri fırlar
  banka: s => `<svg class="nn" viewBox="0 0 1920 1080"><g data-r="bk" transform="translate(1180 180) scale(1.5)"><path class="ln" d="M0 140 L170 40 L340 140 Z M20 160 H320 M40 170 V330 M110 170 V330 M230 170 V330 M300 170 V330 M10 340 H330" stroke="#2F6BFF" stroke-width="6" stroke-dasharray="2400" stroke-dashoffset="2400" style="filter:drop-shadow(0 0 12px #2F6BFF)"/></g>
    <circle data-r="sen" cx="520" cy="430" r="0" fill="#151515"/><text data-r="sent" x="520" y="600" text-anchor="middle" font-family="GM" font-size="24" letter-spacing="5" fill="#6B7280" opacity="0">SEN</text>
    <text data-r="bkt" x="1435" y="720" text-anchor="middle" font-family="GM" font-size="24" letter-spacing="5" fill="#6B7280" opacity="0">BANKA</text></svg>
    <div class="cip" data-r="cip">${esc(s.cip)}</div>
    <div class="serif it glow" data-r="soz" style="position:absolute;left:0;right:0;top:760px;text-align:center;font-size:120px"><span class="msk"><span>${esc(s.soz)}</span></span></div>`,
  // açılan kitap, altı çizilen satır
  kitap: s => `<div class="etk" data-r="ust" style="position:absolute;left:0;right:0;top:100px;text-align:center">${esc(s.ust)}</div>
    <div data-r="ktp" style="position:absolute;left:460px;top:250px;width:1000px;height:600px;perspective:1600px">
      <div style="position:absolute;left:0;top:0;width:500px;height:600px;background:#F3F1EC;border:3px solid #151515;border-radius:16px 0 0 16px;box-shadow:inset -30px 0 40px -30px rgba(0,0,0,.4),0 40px 90px rgba(0,0,0,.6);padding:60px 50px">${Array.from({ length: 9 }, (_, j) => `<div style="height:9px;margin:0 0 24px;border-radius:5px;background:#C9C3B4;width:${70 + (j * 17) % 30}%"></div>`).join('')}</div>
      <div data-r="sag" style="position:absolute;left:500px;top:0;width:500px;height:600px;background:#FFFDF8;border:3px solid #151515;border-radius:0 16px 16px 0;transform-origin:left center;box-shadow:0 40px 90px rgba(0,0,0,.6);padding:60px 50px;color:#151515">
        <div style="font:600 18px GM;letter-spacing:.22em;color:#8B8E95">${esc(s.madde)}</div>
        <div style="margin-top:26px;font:400 46px/1.1 IS">${esc(s.metin)}</div>
        <div data-r="vur" style="position:relative;display:inline-block;margin-top:30px;font:400 76px IS;font-style:italic">${esc(s.vurgu)}<i data-r="cz" style="position:absolute;left:-6px;right:-6px;bottom:6px;height:22px;background:#12B76A;z-index:-1;transform-origin:left;transform:scaleX(0);border-radius:6px"></i></div>
        ${Array.from({ length: 3 }, (_, j) => `<div style="height:9px;margin:30px 0 0;border-radius:5px;background:#D9D4C7;width:${80 - j * 15}%"></div>`).join('')}</div></div>`,
  // Sen → 5 durak → Paran yol diyagramı; şube üstü çizilir; 4. durakta faiz blöfü kırılır
  yol: s => `<div class="serif glow" data-r="bas" style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:86px"><span class="msk"><span>${esc(s.baslik)}</span></span></div>
    <svg class="nn" viewBox="0 0 1920 1080"><path data-r="yol" class="ln" d="M250 600 C520 420 700 760 960 600 S1400 420 1670 600" stroke="#2F6BFF" stroke-width="7" style="filter:drop-shadow(0 0 14px #2F6BFF)"/>
      <g data-r="sube" transform="translate(860 230)" opacity="0"><path class="ln" d="M0 60 L100 0 L200 60 Z M20 70 V170 M70 70 V170 M130 70 V170 M180 70 V170 M0 180 H200" stroke="#6B7280" stroke-width="5"/><text x="100" y="225" text-anchor="middle" font-family="GM" font-size="22" letter-spacing="5" fill="#6B7280">ŞUBE</text>
      <path data-r="cizik" class="ln" d="M-20 -10 L220 200" stroke="#E8402F" stroke-width="12" stroke-dasharray="330" stroke-dashoffset="330"/></g>
      <g data-r="faiz" transform="translate(1450 250)" opacity="0"><path class="ln" d="M0 200 L60 150 L110 170 L170 60 L230 10" stroke="#E8402F" stroke-width="10" stroke-dasharray="420" stroke-dashoffset="420"/><path class="ln" d="M200 0 L232 8 L226 40" stroke="#E8402F" stroke-width="10"/><text x="20" y="-20" font-family="GM" font-size="28" fill="#E8402F" letter-spacing="3">FAİZ ↑</text></g></svg>
    <div class="dug" data-r="sen" style="left:250px;top:600px">●<small>SEN</small></div><div class="dug" data-r="para" style="left:1670px;top:600px">₺<small>PARAN</small></div>
    ${[0, 1, 2, 3, 4].map(j => `<div class="dug" data-d="${j}" style="width:84px;height:84px;margin:-42px 0 0 -42px;font-size:44px">${j + 1}<small style="top:100px;font:400 34px IS;font-style:italic;letter-spacing:0;color:#151515">${esc((s.duraklar || [])[j] || '')}</small></div>`).join('')}
    ${Array.from({ length: 22 }, (_, j) => `<i data-p="${j}" style="position:absolute;left:0;top:0;width:${10 + (j * 7) % 18}px;height:${6 + (j * 5) % 12}px;background:#E8402F;border-radius:2px;opacity:0"></i>`).join('')}
    ${[0, 1, 2].map(j => `<i data-tk="${j}" style="position:absolute;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:#F6B92B;box-shadow:0 0 30px #F6B92B,0 0 60px #F6B92B;opacity:0"></i>`).join('')}
    <div class="serif it" data-r="blof" style="position:absolute;left:1480px;top:190px;font-size:110px;color:#E8402F;opacity:0;text-shadow:none">blöf</div>`,
  // 1. adım: 30 hücreli halka + %100 iade + poliçe süresi çubuğu
  cayma: s => `
    <div data-r="halka" style="position:absolute;left:470px;top:520px">${Array.from({ length: 30 }, (_, j) => { const a = -Math.PI / 2 + j / 30 * Math.PI * 2; return `<div class="hc" data-h="${j}" style="left:${Math.cos(a) * 300}px;top:${Math.sin(a) * 300}px;transform:rotate(${j / 30 * 360}deg)"></div>`; }).join('')}
      <div class="serif glow" data-r="sayi" style="position:absolute;left:-200px;width:400px;top:-110px;text-align:center;font-size:190px">0</div><div class="etk" style="position:absolute;left:-200px;width:400px;top:90px;text-align:center">GÜN · CAYMA</div></div>
    <div class="serif" data-r="cb" style="position:absolute;left:1000px;top:160px;font-size:108px;white-space:nowrap"><span class="msk"><span>${esc(s.baslik[0])} <span class="it" style="color:var(--mavi);text-shadow:none">${esc(s.baslik[1])}</span></span></span></div>
    ${(s.liste || []).map((l, j) => `<div data-li="${j}" style="position:absolute;left:1010px;top:${330 + j * 104}px;display:flex;align-items:center;gap:22px;font:500 40px G;opacity:0"><i style="width:54px;height:54px;border-radius:50%;border:2px solid #12B76A;display:flex;align-items:center;justify-content:center;font:700 24px GM;color:#12B76A;font-style:normal">${j + 1}</i><span>${esc(l[1])}</span></div>`).join('')}
    <div class="serif" data-r="yuz" style="position:absolute;left:1000px;top:200px;white-space:nowrap;font-size:170px;opacity:0"><span class="it" style="color:var(--mint);text-shadow:none">%100</span> <span style="font-size:80px">iade</span></div>
    <div class="bar" data-r="b1" style="left:1010px;top:440px;width:800px;opacity:0"><i style="background:linear-gradient(90deg,#12B76A,#2F6BFF);box-shadow:0 0 40px #12B76A"></i></div>
    <div class="bl" data-r="b1l" style="left:1010px;top:520px;opacity:0">İLK 30 GÜN İÇİNDE İPTAL → PRİMİN TAMAMI</div>
    <div data-r="vade" style="position:absolute;left:1010px;top:640px;width:800px;opacity:0"><div class="bl" style="position:relative;top:0;margin-bottom:14px">POLİÇE SÜRESİ</div>
      <div class="bar" style="position:relative;width:800px"><i data-r="kul" style="background:rgba(21,21,21,.18)"></i><i data-r="kal" style="background:linear-gradient(90deg,#F6B92B,#12B76A);box-shadow:0 0 30px #12B76A"></i><b data-r="imlec" style="position:absolute;top:-16px;bottom:-16px;width:6px;background:#151515;border-radius:3px"></b></div>
      <div style="display:flex;justify-content:space-between;margin-top:14px"><span class="bl" style="position:relative" data-r="kult">KULLANILAN</span><span class="bl" style="position:relative;color:#12B76A" data-r="kalt">KALAN GÜNLER → İADE</span></div></div>`,
};

// ---------------- tarayıcı çalışma zamanı ----------------
MOD.forEach(m => Object.assign(MARK, m.mark));
const RUNTIME = `
const cl = (v, a, b) => Math.max(a, Math.min(b, v)), eo = k => 1 - Math.pow(1 - cl(k, 0, 1), 3), ei = k => Math.pow(cl(k, 0, 1), 3), eio = k => { k = cl(k, 0, 1); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const bo = k => { k = cl(k, 0, 1); const c = 1.70158; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
const hs = n => { let h = (n * 2654435761) >>> 0; h ^= h >>> 15; h = Math.imul(h, 2246822519) >>> 0; return (h >>> 8) / 16777216; };
const nz = (t, s) => Math.sin(t * 1.13 + s) * .6 + Math.sin(t * .71 + s * 2.3) * .4;
const K = TL.kelimeler, T = k => (K[Math.min(k, K.length - 1)] || { t0: 0 }).t0;
const SC = TL.s3.map((s, i) => { const o = Object.assign({}, s, { i, tm: TL.tem[i], t: T(s.a), el: document.getElementById('sh' + i) }); Object.keys(s).forEach(k => { if (/K$/.test(k) && typeof s[k] === 'number') o[k.slice(0, -1) + 'T'] = T(s[k]); }); return o; });
SC.forEach((s, i) => { s.son = i + 1 < SC.length ? SC[i + 1].t : TL.duration + 1; });
const q = (el, sel) => el.querySelector(sel), qa = (el, sel) => [...el.querySelectorAll(sel)];
const maske = (el, k) => { const sp = el && el.querySelector('.msk>span'); if (sp) sp.style.transform = 'translateY(' + ((1 - bo(k)) * 110) + '%)'; };
const esc2 = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const say = (t, t0, d, a, b) => Math.round(a + (b - a) * eo(cl((t - t0) / d, 0, 1)));
function gir(el, t0, t, m, d) { if (!el) return 0; d = d || .32; const k = cl((t - t0) / d, 0, 1), b = bo(k); el.style.opacity = t < t0 ? 0 : cl(k * 2.5, 0, 1); let tr;
  if (m === 'x') tr = 'translateX(' + (1 - b) * 160 + 'px)'; else if (m === '-x') tr = 'translateX(' + (b - 1) * 160 + 'px)'; else if (m === 's') tr = 'scale(' + (t < t0 ? 0 : .4 + .6 * b) + ')'; else if (m === 'd') tr = 'translateY(' + (1 - b) * -240 + 'px) rotate(' + ((1 - k) * -6) + 'deg)'; else tr = 'translateY(' + (1 - b) * 80 + 'px)';
  el.style.transform = tr; return k; }
// sahne çizimleri: lt = sahne başından beri sn, o = çıkış (0..1)
const D = {
  acilis(s, lt, o, t) { const el = s.el;
    qa(el, '.kg').forEach((k, j) => { const z0 = -1700 + hs(j) * 1900, sp = 160 + hs(j + 50) * 120, z = ((z0 + t * sp + 1900) % 1900) - 1700, x = (hs(j + 7) - .5) * 2000, y = (hs(j + 13) - .5) * 1100, f = 900 / (900 - z);
      const dag = s.kartT != null ? eo((t - s.kartT) / .6) : 0, xx = W / 2 + x * f * (1 + dag * 1.2), yy = H / 2 + y * f * (1 + dag * 1.2);
      k.style.transform = 'translate(' + xx + 'px,' + yy + 'px) scale(' + (f * .9) + ') rotate(' + ((hs(j + 3) - .5) * 60 + t * 8 * (hs(j) - .5)) + 'deg)'; k.style.opacity = cl((z + 1700) / 400, 0, 1) * (1 - o) * (1 - .6 * dag); k.style.filter = 'blur(' + Math.min(8, Math.abs(z + 300) / 160).toFixed(1) + 'px)'; k.style.zIndex = Math.round(z + 2000); });
    const bas = q(el, '[data-r=bas]'); maske(bas, lt / .5); bas.style.opacity = 1 - o; bas.style.transform = 'translateY(' + (s.kartT != null ? -60 * eo((t - s.kartT) / .5) : 0) + 'px) scale(' + (s.kartT != null ? 1 - .35 * eo((t - s.kartT) / .5) : 1) + ')';
    (s.haplar || []).forEach((h, j) => { const p = q(el, '[data-hap="' + j + '"]'), ht = T(h[1]), k = bo((t - ht) / .35), xs = [520, 960, 1400][j], dg = s.kartT != null ? eo((t - s.kartT) / .5) : 0;
      p.style.opacity = cl((t - ht) / .1, 0, 1) * (1 - o) * (1 - dg); p.style.transform = 'translate(' + (xs - 120 + Math.sin(t * 1.5 + j) * 6) + 'px,' + (430 + (1 - k) * 80 + Math.cos(t * 1.3 + j) * 6 - dg * 200) + 'px) scale(' + (.6 + .4 * k) + ')'; });
    const dk = q(el, '[data-r=dk]'), kt = s.kartT; if (kt != null) { const k = cl((t - kt) / .45, 0, 1), sc = t < kt ? 0 : k < 1 ? 2.2 - 1.2 * k * k : 1 + .03 * Math.exp(-(t - kt - .45) * 8) * Math.cos((t - kt) * 40);
      dk.style.opacity = t < kt ? 0 : cl(k * 3, 0, 1) * (1 - o); dk.style.transform = 'scale(' + sc + ') rotate(' + ((1 - k) * -6 + Math.sin(t * 1.2) * .6) + 'deg) translateY(' + (Math.sin(t * 1.7) * 5) + 'px)';
      qa(dk, '.r').forEach((r, j) => { const rk = cl((t - kt - .3 - j * .12) / .25, 0, 1); r.style.opacity = rk; r.style.transform = 'translateX(' + ((1 - rk) * -30) + 'px)'; });
      const hl = q(dk, '.hl'); if (hl && s.hlT != null) { const hk = eo((t - s.hlT) / .4); hl.style.background = 'linear-gradient(90deg,rgba(246,185,43,' + (.55 * hk) + ') ' + (hk * 100) + '%,transparent ' + (hk * 100) + '%)'; hl.style.boxShadow = hk > .9 ? '0 0 0 2px #E8402F,0 0 30px rgba(246,185,43,.6)' : 'none'; } } else dk.style.opacity = 0; },
  banka(s, lt, o, t) { const el = s.el, bk = q(el, '[data-r=bk] path');
    bk.style.strokeDashoffset = 2400 * (1 - eo(lt / .9)); q(el, '[data-r=bk]').setAttribute('transform', 'translate(1180 ' + (180 + Math.sin(t * 1.4) * 6) + ') scale(1.5)'); q(el, '[data-r=bkt]').setAttribute('opacity', cl(lt / .5, 0, 1));
    const sr = 110 * bo((lt - .1) / .4); q(el, '[data-r=sen]').setAttribute('r', Math.max(0, sr + Math.sin(t * 3) * 2)); q(el, '[data-r=sent]').setAttribute('opacity', cl(lt / .5, 0, 1));
    const ci = q(el, '[data-r=cip]'), gir = s.t + .25, cik = T(s.cikK); let x, y, sc = 1;
    if (t < gir + .7) { const k = eio((t - gir) / .7); x = 560 + (1430 - 560) * k; y = 430 - Math.sin(k * Math.PI) * 200 + (1 - k) * 0; sc = 1 - .5 * k; } else if (t < cik) { x = 1430; y = 470; sc = .5 + .05 * Math.sin(t * 9); } else { const k = eio((t - cik) / .65); x = 1430 + (560 - 1430) * k; y = 470 - Math.sin(k * Math.PI) * 260; sc = .5 + .7 * k; }
    ci.style.opacity = t < gir ? 0 : 1 - o; ci.style.transform = 'translate(' + (x - 200) + 'px,' + (y - 40) + 'px) scale(' + sc + ')';
    const soz = q(el, '[data-r=soz]'); maske(soz, (t - cik) / .45); soz.style.opacity = t < cik ? 0 : 1 - o; },
  kitap(s, lt, o, t) { const el = s.el; const kk = eo(lt / .6); q(el, '[data-r=ktp]').style.transform = 'translateY(' + ((1 - kk) * 120 + Math.sin(t * 1.2) * 6) + 'px) rotateX(' + ((1 - kk) * 30) + 'deg) scale(' + (1.18 + .03 * cl(lt / 4, 0, 1) - o * .1) + ')'; q(el, '[data-r=ktp]').style.opacity = cl(lt / .2, 0, 1) * (1 - o);
    q(el, '[data-r=sag]').style.transform = 'rotateY(' + (-150 * (1 - eio((lt - .15) / .8))) + 'deg)'; q(el, '[data-r=ust]').style.opacity = cl(lt / .3, 0, 1) * (1 - o);
    q(el, '[data-r=cz]').style.transform = 'scaleX(' + eo((t - T(s.vurguK)) / .5) + ')'; q(el, '[data-r=vur]').style.textShadow = t > T(s.vurguK) + .3 ? 'none' : 'none'; },
  yol(s, lt, o, t) { const el = s.el, yl = q(el, '[data-r=yol]'), L = +yl.dataset.L || (yl.dataset.L = yl.getTotalLength());
    maske(q(el, '[data-r=bas]'), lt / .5); q(el, '[data-r=bas]').style.opacity = 1 - o;
    const ky = eio((lt - .1) / 1.1); yl.style.strokeDasharray = L; yl.style.strokeDashoffset = L * (1 - ky); yl.style.opacity = 1 - o;
    ['sen', 'para'].forEach((n, j) => { const d = q(el, '[data-r=' + n + ']'), k = bo((lt - (j ? 1.1 : .05)) / .4); d.style.transform = 'scale(' + Math.max(0, k) + ')'; d.style.opacity = 1 - o; });
    const dT = T(s.durakK);
    qa(el, '[data-d]').forEach((d, j) => { const p = yl.getPointAtLength(L * (.17 + j * .165)), k = bo((t - dT - j * .12) / .35), dor = s.vurguD === j && s.vurguK != null ? eo((t - T(s.vurguK)) / .4) : 0;
      d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.style.transform = 'scale(' + (Math.max(0, k) * (1 + .5 * dor + .03 * Math.sin(t * 4 + j))) + ')'; d.style.opacity = 1 - o; d.style.background = dor > .5 ? '#E8402F' : '#fff'; d.style.color = dor > .5 ? '#fff' : '#151515'; d.style.boxShadow = dor > .5 ? '5px 5px 0 #151515,0 0 40px rgba(232,64,47,.5)' : ''; });
    qa(el, '[data-tk]').forEach((d, j) => { const ph = ((t - dT) / 2.6 + j / 3) % 1, p = yl.getPointAtLength(L * ph); d.style.left = p.x + 'px'; d.style.top = p.y + 'px'; d.style.opacity = t < dT + .5 ? 0 : Math.sin(ph * Math.PI) * (1 - o); });
    const sb = q(el, '[data-r=sube]'); sb.setAttribute('opacity', cl((t - T(s.subeK)) / .3, 0, 1) * (1 - o)); q(el, '[data-r=cizik]').style.strokeDashoffset = 330 * (1 - eo((t - T(s.cizK)) / .35));
    const fz = q(el, '[data-r=faiz]'), fk = s.faizK != null ? t - T(s.faizK) : -1, kir = s.blofK != null ? t - T(s.blofK) : -1;
    fz.setAttribute('opacity', fk < 0 ? 0 : (kir > 0 ? Math.max(0, 1 - kir / .15) : 1) * (1 - o)); q(fz, 'path').style.strokeDashoffset = 420 * (1 - eo(fk / .6));
    qa(el, '[data-p]').forEach((p, j) => { if (kir < 0) { p.style.opacity = 0; return; } const a = hs(j) * Math.PI * 2, v = 300 + hs(j + 9) * 500, x = 1560 + Math.cos(a) * v * kir, y = 440 + Math.sin(a) * v * kir + 900 * kir * kir; p.style.opacity = Math.max(0, 1 - kir / 1.4) * (1 - o); p.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + (kir * 600 * (hs(j + 2) - .5)) + 'deg)'; });
    const bf = q(el, '[data-r=blof]'); bf.style.opacity = kir < 0 ? 0 : cl(kir / .1, 0, 1) * (1 - o); bf.style.transform = 'scale(' + (kir < 0 ? 1 : 1.6 - .6 * cl(kir / .25, 0, 1)) + ') rotate(-6deg)'; },
  cayma(s, lt, o, t) { const el = s.el, hT = T(s.halkaK), y1 = T(s.yuzK), vT = T(s.vadeK), hD = (T(s.halkaBitK) - hT) / 30;
    const cb = q(el, '[data-r=cb]'); maske(cb, lt / .5); cb.style.opacity = (1 - cl((t - y1 + .2) / .25, 0, 1)) * (1 - o);
    (s.liste || []).forEach((l, j) => { const d = q(el, '[data-li="' + j + '"]'), lk = T(l[0]), k = bo((t - lk) / .3); d.style.opacity = cl((t - lk) / .1, 0, 1) * (1 - cl((t - y1 + .2) / .25, 0, 1)) * (1 - o); d.style.transform = 'translateX(' + ((1 - k) * 80) + 'px)';
      const c = q(d, 'i'), on = t > lk + .25; c.style.background = on ? '#12B76A' : 'transparent'; c.style.color = on ? '#fff' : '#12B76A'; c.style.boxShadow = on ? '3px 3px 0 #151515' : 'none'; c.textContent = on ? '✓' : j + 1; });
    qa(el, '[data-h]').forEach((c, j) => { const on = t > hT + j * hD, k = cl((t - hT - j * hD) / .2, 0, 1), sonra = t > vT; c.style.background = on ? (sonra ? 'rgba(18,183,106,.16)' : '#2F6BFF') : 'transparent'; c.style.borderColor = on ? '#151515' : 'rgba(21,21,21,.22)';
      c.style.boxShadow = on && !sonra ? '3px 3px 0 #151515' : 'none'; c.style.color = on ? (sonra ? '#151515' : '#fff') : '#6B7280'; c.style.scale = String(.5 + .5 * bo(cl(lt / .4 - j * .015, 0, 1)) + .15 * Math.sin(k * Math.PI)); c.textContent = on ? j + 1 : ''; });
    q(el, '[data-r=sayi]').textContent = Math.min(30, Math.max(0, Math.floor((t - hT) / hD) + (t >= hT ? 1 : 0)));
    q(el, '[data-r=halka]').style.transform = 'translate(' + (t > vT ? -40 * eo((t - vT) / .6) : 0) + 'px,0) scale(' + (t > vT ? 1 - .25 * eo((t - vT) / .6) : 1) + ') rotate(' + (Math.sin(t * .6) * 2) + 'deg)';
    const yz = q(el, '[data-r=yuz]'), k = bo((t - y1) / .5); yz.style.opacity = cl((t - y1) / .15, 0, 1) * (1 - o); yz.style.transform = 'translateX(' + ((1 - k) * 120) + 'px)';
    const b1 = q(el, '[data-r=b1]'); b1.style.opacity = cl((t - y1 - .2) / .2, 0, 1) * (1 - o); q(b1, 'i').style.width = (eio((t - y1 - .3) / 1.2) * 100) + '%'; q(el, '[data-r=b1l]').style.opacity = cl((t - y1 - .6) / .3, 0, 1) * (1 - o);
    const vd = q(el, '[data-r=vade]'), vk = eo((t - vT) / .5); vd.style.opacity = cl((t - vT) / .2, 0, 1) * (1 - o); vd.style.transform = 'translateY(' + ((1 - vk) * 60) + 'px)';
    const ilk = t < vT + .6 ? 0 : eio((t - vT - .6) / 1.6), kul = 35 * ilk; q(el, '[data-r=kul]').style.width = kul + '%'; const kal = q(el, '[data-r=kal]'), kk = eo((t - T(s.kalanK)) / .8); kal.style.left = kul + '%'; kal.style.width = ((100 - kul) * kk) + '%';
    q(el, '[data-r=imlec]').style.left = 'calc(' + kul + '% - 3px)'; q(el, '[data-r=kalt]').style.opacity = cl((t - T(s.kalanK)) / .3, 0, 1); },
};
// toz/yıldız katmanı + gren (tohumlu)
const TZ = document.getElementById('toz'), tx = TZ.getContext('2d');
function toz(t) { tx.clearRect(0, 0, TZ.width, TZ.height); for (let j = 0; j < 140; j++) { const x = (hs(j) * TZ.width + t * (6 + hs(j + 1) * 14)) % TZ.width, y = (hs(j + 2) * TZ.height + Math.sin(t * .3 + j) * 6), a = .25 + .5 * Math.abs(Math.sin(t * (.6 + hs(j + 3)) + j)); tx.fillStyle = 'rgba(21,21,21,' + (a * .25) + ')'; tx.beginPath(); tx.arc(x, y, .6 + hs(j + 4) * 1.4, 0, 7); tx.fill(); } }
const G = document.getElementById('gren'), gx = G.getContext('2d'), GC = [];
function gren(f) { const c = f % 6; if (!GC[c]) { const I = gx.createImageData(G.width, G.height); let s = (c + 1) * 2654435761 >>> 0; for (let i = 0; i < I.data.length; i += 4) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; const v = s >>> 24; I.data[i] = I.data[i + 1] = I.data[i + 2] = v; I.data[i + 3] = 255; } GC[c] = I; } gx.putImageData(GC[c], 0, 0); }
function deko(t, cur) { const tm = cur.tm;
  qa(document, '#deko [data-dk]').forEach((e, j) => { const own = +e.dataset.dk; e.style.display = own === tm ? 'block' : 'none'; if (own !== tm) return; const n = +e.dataset.n;
    if (own === 1) e.style.transform = 'translate(' + (Math.sin(t * .4 + n * 2) * 160) + 'px,' + (Math.cos(t * .33 + n) * 110) + 'px) scale(' + (1 + .12 * Math.sin(t * .7 + n)) + ')';
    else if (own === 2) e.style.transform = 'rotate(' + (t * (n % 2 ? 30 : -24) + n * 40) + 'deg) scale(' + (1 + .08 * Math.sin(t * 2 + n)) + ')';
    else if (own === 4) e.style.transform = 'translate(' + (Math.sin(t * .6 + n * 1.7) * 40) + 'px,' + (((t * (18 + n * 4) + n * 140) % 1300) * -1 + 1200) + 'px) rotate(' + (Math.sin(t + n) * 20) + 'deg)';
    else if (own === 5) { if (e.dataset.saat) e.textContent = 'T+' + t.toFixed(2).padStart(6, '0') + ' · ' + String(cur.i + 1).padStart(2, '0') + '/' + String(SC.length).padStart(2, '0'); } });
  if (tm === 2) { const imp = SC.reduce((a, s) => (t >= s.t && t - s.t < .3 ? t - s.t : a), -1); document.getElementById('cam').style.translate = imp >= 0 ? (Math.sin(imp * 90) * 10 * (1 - imp / .3)) + 'px 0' : '0 0'; } else document.getElementById('cam').style.translate = '0 0'; }
function kontrol(t) { return []; }
['400 100px IS', 'italic 400 100px IS', '800 100px G', '900 100px G', '500 40px G', '900 100px Arc', '600 20px GM'].forEach(f => document.fonts.load(f, 'Aağşİ%0'));
let hazir = false;
function sigdir() { const F = [['[data-r=bas]', 1400], ['[data-r=soz]', 1400], ['[data-r=cb]', 860], ['[data-r=yuz]', 860], ['[data-r=vur]', 400], ['.kart h3', 700]];
  SC.forEach(s => { s.el.style.display = 'block'; F.forEach(([sel, mx]) => qa(s.el, sel).forEach(el => { const m = el.querySelector('.msk>span') || el; let fs = parseFloat(getComputedStyle(el).fontSize), n = 0; while (m.offsetWidth > mx && n++ < 30) { fs *= .94; el.style.fontSize = fs + 'px'; } })); s.el.style.display = 'none'; }); }
function frame(t) {
  if (!hazir) { hazir = true; sigdir(); }
  let cs0 = SC[0]; SC.forEach(s => { if (t >= s.t) cs0 = s; }); const bc = 'b' + cs0.tm + (cs0.koyu ? ' k' : ''); if (document.body.className !== bc) document.body.className = bc;
  SC.forEach(s => { const on = t >= s.t - .05 && t < s.son + .45; s.el.style.display = on ? 'block' : 'none'; if (!on) return; const lt = t - s.t, nx = SC[s.i + 1], ntm = nx ? nx.tm : s.tm;
    let f = 'none', tr = 'none', cp = 'none', op = 1;
    if (t > s.son) { const o = cl((t - s.son) / .4, 0, 1);   // çıkış: SONRAKİ sahnenin stiline göre
      if (ntm === 2) tr = 'translateX(' + (-eio(o) * W) + 'px) rotate(' + (-o * 3) + 'deg)';
      else if (ntm === 1 || ntm === 3) { f = o > .02 ? 'blur(' + (ei(o) * 14).toFixed(1) + 'px)' : 'none'; tr = 'scale(' + (1 + ei(o) * .25) + ')'; op = 1 - ei(o); }
      else tr = 'scale(' + (1 - .08 * eo(o)) + ')'; }
    if (lt < .45 && s.i > 0) { const k = lt / .45;   // giriş
      const gm = s.gir || ({ 1: 'zoom', 2: 'kay', 4: 'daire', 5: 'perde' })[s.tm];
      if (gm === 'kay') tr = 'translateX(' + ((1 - bo(k)) * W) + 'px) rotate(' + ((1 - eo(k)) * 4) + 'deg)';
      else if (gm === 'daire') cp = 'circle(' + (eo(k) * 130) + '% at 50% 55%)';
      else if (gm === 'perde') cp = 'inset(0 0 ' + ((1 - eio(k)) * 100) + '% 0)';
      else if (gm === 'zoom') { tr = 'scale(' + (.92 + .08 * eo(k)) + ')'; op = eo(k * 1.6); } }
    s.el.style.filter = f; s.el.style.transform = tr; s.el.style.clipPath = cp; s.el.style.opacity = op; s.el.style.zIndex = s.i;
    const ln = document.getElementById('wl'); if ((s.gir || (s.tm === 5 ? 'perde' : '')) === 'perde' && lt < .45 && s.i > 0) { ln.style.display = 'block'; ln.style.top = (eio(lt / .45) * H) + 'px'; } else if (s === cs0) ln.style.display = 'none';
    D[s.tur] && D[s.tur](s, lt, 0, t); });
  deko(t, cs0);
  // adım göstergesi
  const A = document.getElementById('adim'); if (TL.adimPos) { A.style.left = TL.adimPos[0] + 'px'; A.style.top = TL.adimPos[1] + 'px'; } let cur = 0, ad = ''; SC.forEach(s => { if (s.adim && t >= s.t) { cur = s.adim; ad = s.adimAd || ad; } }); A.style.opacity = cur ? 1 : 0; [...A.querySelectorAll('i')].forEach((c, j) => c.className = j + 1 === cur ? 'on' : j + 1 < cur ? 'ok' : ''); A.querySelector('span').textContent = ad;
  // altyazı
  const Wd = K, sub = document.getElementById('sub'), P = TL.parcalar.find(p => t >= p.t0 && t < p.t1);
  if (!P) { sub.innerHTML = ''; sub.dataset.p = ''; } else { if (sub.dataset.p !== String(P.i0)) { sub.dataset.p = P.i0; sub.innerHTML = Wd.slice(P.i0, P.i1 + 1).map(k => '<span>' + k.w.replace(/[,.!?;:"“”()…]/g, '') + '</span>').join(''); }
    const kk = cl((t - P.t0) / .12, 0, 1); sub.style.opacity = kk; sub.style.transform = 'translateY(' + ((1 - kk) * 12) + 'px)'; let aw = -1; for (let i = P.i0; i <= P.i1; i++) if (t >= Wd[i].t0 - .02) aw = i; [...sub.children].forEach((sp, j) => sp.classList.toggle('on', P.i0 + j === aw)); }
  // kamera: sürekli nefes + sahne başında küçük itme
  const cs = SC.reduce((a, s) => s.t <= t ? s : a, SC[0]), dd = t - cs.t;
  document.getElementById('cam').style.transform = 'translate(' + (nz(t * .7, 1) * 10) + 'px,' + (nz(t * .6, 3) * 8) + 'px) scale(' + (1.01 + .03 * cl(dd / 6, 0, 1) + (dd < .3 ? .03 * (1 - dd / .3) : 0)) + ') rotate(' + (nz(t * .4, 5) * .4) + 'deg)';
  toz(t); gren(Math.round(t * 30));
  if (TL.mk) document.getElementById('stage').innerHTML = Dosya.svg(Dosya.stateAt(TL.mk, t), 'mk', 300, 300);
}`;
module.exports = { sayfa };

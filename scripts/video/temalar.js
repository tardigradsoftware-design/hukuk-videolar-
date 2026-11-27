// v5 için tema katmanları (prompt-motion.com referanslarından uyarlandı, kopya değil):
// tm1 Mavi Ferah (BlueVisa) · tm2 Pastel Brutal (Celld) · tm3 Gece Serif (DistilBook) · tm4 Renkli Hap (DistilBook 2) · tm5 Turuncu Editoryal (Flowdrive)
// body.tmN sınıfı ile uygulanır; karma modda sınıf vuruşa göre değişir.
const path = require('path');
const FN = p => 'file://' + path.join(__dirname, '..', '..', 'node_modules', '@fontsource', p);
const ADLAR = { 1: 'Mavi Ferah', 2: 'Pastel Brutal', 3: 'Gece Serif', 4: 'Renkli Hap', 5: 'Turuncu Editoryal', karma: 'Karma' };
const KART = '.gz,.ui,.yr,.kl5,.ep5,.tf';
const CSS = () => `
@font-face{font-family:ISerif;src:url('${FN('instrument-serif/files/instrument-serif-latin-ext-400-normal.woff2')}') format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:ISerif;src:url('${FN('instrument-serif/files/instrument-serif-latin-400-normal.woff2')}') format('woff2')}
@font-face{font-family:ISerif;font-style:italic;src:url('${FN('instrument-serif/files/instrument-serif-latin-ext-400-italic.woff2')}') format('woff2');unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:ISerif;font-style:italic;src:url('${FN('instrument-serif/files/instrument-serif-latin-400-italic.woff2')}') format('woff2')}
#kose{position:absolute;inset:0;pointer-events:none;z-index:7;display:none}
/* ---------- 1 · MAVİ FERAH ---------- */
body.tm1 #zemin{background:radial-gradient(circle at 30% 48%,#DCEBFF 0,#F4F8FF 38%,#FFFFFF 70%)}
body.tm1 .sat{font-family:Geist;font-weight:800;font-stretch:normal;letter-spacing:-.05em;text-transform:lowercase}
body.tm1 .h.v{color:#1E7BF2}body.tm1 .cz path{stroke:#1E7BF2;stroke-width:8}
body.tm1 :is(${KART}){box-shadow:0 0 0 1px rgba(30,110,230,.14),0 40px 70px -28px rgba(30,100,220,.45)!important;border-radius:22px}
body.tm1 #koyu{background:#1E7BF2}body.tm1 .not{font-family:Geist;font-weight:700;color:#1E7BF2}
body.tm1 .ik{background:radial-gradient(circle,#D6E8FF 0,rgba(214,232,255,0) 68%)}
body.tm1 #sub span.on{background:#1E7BF2}body.tm1 #adim i{border-color:#1E7BF2;color:#1E7BF2}body.tm1 #adim i.on{background:#1E7BF2;color:#fff}body.tm1 #adim i.ok{background:#BFD9FF;border-color:#BFD9FF;color:#1E7BF2}
/* ---------- 2 · PASTEL BRUTAL ---------- */
body.tm2 #zemin{background:#FBF6EA}
body.tm2 .sat{font-family:Arc;font-weight:900;font-stretch:96%;letter-spacing:-.025em}
body.tm2 .h.v{color:#151515}body.tm2 .cz path{stroke:#F7D14C;stroke-width:30;stroke-linecap:butt;opacity:.9}
body.tm2 :is(${KART}){border-radius:10px!important;box-shadow:0 0 0 4px #151515,9px 9px 0 4px #151515!important}
body.tm2 .gz{background:#FFF0A8}body.tm2 .kl5{background:#D9F7E4}body.tm2 .ep5{background:#FFE3F2}body.tm2 .ui,body.tm2 .yr{background:#E2EEFF}
body.tm2 :is(.gz,.kl5,.ep5,.ui)::after{content:'';position:absolute;right:-30px;bottom:-30px;width:120px;height:40px;background:repeating-linear-gradient(-45deg,#151515 0 6px,transparent 6px 13px);z-index:-1}
body.tm2 #koyu{background:#A8F08C}body.tm2.k #sub span{color:#151515}body.tm2 .vb[data-koyu="1"] .sat{color:#151515}
body.tm2 .not span{background:#151515;color:#fff;padding:4px 22px 8px;border-radius:999px;font-family:Geist;font-weight:800;font-size:.62em;transform:rotate(-2deg)!important}
body.tm2 #sub span.on{background:#FF7AC6;color:#151515}body.tm2 #adim i.on{background:#FF7AC6;border-color:#151515;color:#151515}body.tm2 #adim span{background:#151515;color:#fff;padding:4px 14px;border-radius:999px}
body.tm2 .ik{background:radial-gradient(circle,#FFE36E 0 45%,transparent 46%)}
/* ---------- 3 · GECE SERİF ---------- */
body.tm3 #zemin{background:radial-gradient(circle at 50% 38%,#1A2557 0,#0B1029 55%,#05070F 100%)}body.tm3 #vin{background:none}
body.tm3 .sat{font-family:ISerif;font-weight:400;font-stretch:normal;letter-spacing:-.01em;color:#F4F1EA;text-transform:none}
body.tm3 .h.v{font-style:italic;color:#9FC1FF;text-shadow:0 0 30px rgba(140,180,255,.55)}body.tm3 .cz path{stroke:#7CF5B4;stroke-width:4}
body.tm3 :is(${KART}){box-shadow:0 0 0 1px rgba(255,255,255,.25),0 0 80px rgba(110,150,255,.35)!important;border-radius:18px}
body.tm3 .ik{background:radial-gradient(circle,#F4F1EA 0 44%,transparent 46%)}
body.tm3 .not{font-family:ISerif;font-style:italic;color:#C9D6FF}
body.tm3 #sub span{color:#F4F1EA;text-shadow:none}body.tm3 #sub span.on{background:#9FC1FF;color:#05070F}
body.tm3 #adim i{background:transparent;color:#F4F1EA;border-color:#F4F1EA}body.tm3 #adim i.on{background:#9FC1FF;color:#05070F;border-color:#9FC1FF}body.tm3 #adim i.ok{background:#F4F1EA;color:#05070F}body.tm3 #adim span{color:#F4F1EA}
body.tm3 #koyu{background:#F4F1EA}body.tm3.k #sub span{color:#05070F}body.tm3 .vb[data-koyu="1"] .sat{color:#05070F}body.tm3 .ks .kx{color:#05070F}
body.tm3 #gren{opacity:.12;mix-blend-mode:screen}
body.tm3 .rm{background:#F4F1EA;border-radius:32px;box-shadow:0 0 0 1px rgba(255,255,255,.3),0 0 90px rgba(110,150,255,.4)}
/* ---------- 4 · RENKLİ HAP ---------- */
body.tm4 #zemin{background:radial-gradient(circle at 70% 30%,#F3EEFF 0,#EEEEF3 60%)}
body.tm4 .sat{font-family:Geist;font-weight:900;font-stretch:normal;letter-spacing:-.055em}
body.tm4 .h.v{color:#fff;background:#E8402F;padding:0 .02em}body.tm4 .vb:nth-child(even) .h.v{background:#7B5CFF}body.tm4 .cz path{stroke:#151515;stroke-width:6}
body.tm4 :is(${KART}){border-radius:26px!important;box-shadow:0 26px 50px -20px rgba(70,40,140,.38),0 0 0 1px rgba(70,40,140,.08)!important}
body.tm4 #koyu{background:#3D5AFE}body.tm4 .not{font-family:Geist;font-weight:800;color:#7B5CFF}
body.tm4 #sub span.on{background:#7B5CFF}body.tm4 #adim i{border-radius:999px}body.tm4 #adim i.on{background:#7B5CFF;border-color:#7B5CFF}
/* ---------- 5 · TURUNCU EDİTORYAL ---------- */
body.tm5 #zemin{background:#F4F2EE radial-gradient(#D8D2C8 1.4px,transparent 1.6px) 0 0/34px 34px}
body.tm5 .sat{font-family:ISerif;font-weight:400;font-stretch:normal;letter-spacing:-.02em;text-transform:none}
body.tm5 .h.v{color:#E8551F}body.tm5 .cz path{stroke:#E8551F;stroke-width:3}
body.tm5 :is(${KART}){border-radius:14px!important;box-shadow:0 0 0 1px rgba(0,0,0,.14),0 40px 60px -34px rgba(0,0,0,.4)!important}
body.tm5 #koyu{background:#E8551F}body.tm5 .not{font-family:GM;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#E8551F;font-size:28px!important}
body.tm5 #sub span.on{background:#E8551F}body.tm5 #adim i{border-width:2px;font-family:GM;font-size:18px;border-radius:50%}body.tm5 #adim i.on{background:#E8551F;border-color:#E8551F}
body.tm5 #kose{display:block}
#kose b{position:absolute;width:26px;height:26px;border-color:#151515;border-style:solid;border-width:0;opacity:.5}
#kose .a{left:30px;top:30px;border-left-width:2px;border-top-width:2px}#kose .b{right:30px;top:30px;border-right-width:2px;border-top-width:2px}
#kose .c{left:30px;bottom:30px;border-left-width:2px;border-bottom-width:2px}#kose .d{right:30px;bottom:30px;border-right-width:2px;border-bottom-width:2px}
#kose i{position:absolute;font:600 14px GM;letter-spacing:.2em;color:#8B8E95;font-style:normal}#kose .e{right:70px;top:36px}#kose .f{left:70px;bottom:36px}
`;
const KOSE = `<div id="kose"><b class="a"></b><b class="b"></b><b class="c"></b><b class="d"></b><i class="e">HAK DOSYASI · REHBER</i><i class="f">TEMSİLİ ANLATIM</i></div>`;
// karma: bölümlere göre tema (hook → 4, adım 1 → 1, 2 → 5, 3 → 2, 4 → 3, 5 → 1)
const KARMA = { 0: 4, 1: 1, 2: 5, 3: 2, 4: 3, 5: 1 };
module.exports = { CSS, KOSE, ADLAR, KARMA };

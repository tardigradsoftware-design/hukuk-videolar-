// Video sayfası: arka plan, başlık, görsel öğeler, altyazı, maskot (tarayıcıda çalışır)
// Öğeler kelime zamanlarına bağlıdır; frame(t) her karede çağrılır.
const fs = require('fs'), path = require('path');

const CSS = (W, H, L) => `
*{box-sizing:border-box}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#F4F4F2;font-family:'Inter Display','Inter',sans-serif;-webkit-font-smoothing:antialiased}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.07)),radial-gradient(#d2d2d2 1.7px,transparent 1.7px) 0 0/26px 26px}
#bg.izgara{background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.07)),linear-gradient(#e2e2e0 1.5px,transparent 1.5px) 0 0/44px 44px,linear-gradient(90deg,#e2e2e0 1.5px,transparent 1.5px) 0 0/44px 44px}
#bg.cizgi{background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.07)),repeating-linear-gradient(135deg,transparent 0 26px,rgba(0,0,0,.035) 26px 29px)}
#bg.leke{background:radial-gradient(circle at 12% 18%,rgba(232,64,47,.10),transparent 28%),radial-gradient(circle at 88% 82%,rgba(246,185,43,.14),transparent 30%),radial-gradient(#d6d6d6 1.5px,transparent 1.5px) 0 0/30px 30px}
#flas{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:8}
#sub.cizgi span{background:none!important;box-shadow:none!important;padding:0 4px}
#sub.cizgi .on{color:#151515;border-bottom:9px solid #E8402F;border-radius:0}#sub.cizgi .off{color:#bdbdbd}
#title{position:absolute;left:${L.title[0]}px;top:${L.title[1]}px;width:${L.title[2]}px;font-weight:900;font-size:${L.titleSize}px;line-height:1.0;color:#151515;letter-spacing:-.5px}
#title .alt{color:#E8402F}
#title .satir{display:block;transform-origin:left center}
#stage{position:absolute;left:${L.mascot[0]}px;top:${L.mascot[1]}px;width:${L.mascot[2]}px;height:${L.mascot[2]}px}
#sub{position:absolute;left:${L.sub[0]}px;top:${L.sub[1]}px;width:${L.sub[2]}px;text-align:center;white-space:nowrap}
#sub span{display:inline-block;margin:0 5px;padding:4px 14px 6px;font-weight:900;font-size:${L.subSize}px;border-radius:10px;letter-spacing:-.3px}
#sub .on{background:#E8402F;color:#fff;box-shadow:4px 4px 0 #151515}#sub .off{color:#b3b3b3;background:#fff}
.o{position:absolute;transform-origin:center;will-change:transform}
.kart{background:#fff;border:4px solid #151515;border-radius:20px;box-shadow:7px 7px 0 #151515}
.em{font-family:'Noto Color Emoji';line-height:1}
/* e-Devlet kartı */
.ed{width:470px;overflow:hidden}.ed .hd{background:#E8402F;color:#fff;font-weight:900;font-size:26px;padding:14px 20px;border-bottom:4px solid #151515;display:flex;align-items:center;gap:10px}
.ed .row{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;font-weight:800;font-size:25px;color:#151515;border-bottom:3px dashed #e2e2e2}
.ed .row:last-child{border-bottom:0}.ed .muted{color:#9a9a9a;font-weight:700}
.rz{display:inline-block;padding:5px 14px;border-radius:9px;border:3px solid #151515;font-weight:900;font-size:22px;color:#fff;background:#1E9E6A;box-shadow:3px 3px 0 #151515}
/* liste */
.ls{min-width:520px;padding:10px 10px 10px 0;white-space:nowrap}.ls .it{display:flex;align-items:center;gap:16px;padding:12px 22px;font-weight:900;font-size:28px;color:#151515}
.ls .it .em{font-size:44px}
/* damga */
.dm{padding:10px 26px;border:7px solid #E8402F;border-radius:14px;color:#E8402F;font-weight:900;font-size:58px;background:rgba(255,255,255,.92);letter-spacing:1px}
/* ikon kartı */
.ik{display:flex;flex-direction:column;align-items:center;gap:6px}.ik .kutu{width:150px;height:150px;display:flex;align-items:center;justify-content:center}.ik .kutu .em{font-size:84px}
.ik b{font-weight:900;font-size:24px;color:#151515;text-transform:uppercase}
/* ok */
.ok svg{display:block}
/* yorum */
.yr{width:520px;padding:18px}.yr .ust{display:flex;align-items:center;gap:12px;font-weight:800;font-size:22px;color:#777;margin-bottom:12px}
.yr .av{width:46px;height:46px;border-radius:50%;background:#E8402F;border:3px solid #151515;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900}
.yr .in{display:flex;align-items:center;gap:10px}.yr .kutu{flex:1;border:3px solid #151515;border-radius:12px;padding:12px 16px;font-weight:900;font-size:34px;color:#151515;min-height:64px}
.yr .gon{background:#2F5BFF;color:#fff;border:3px solid #151515;border-radius:12px;padding:14px 18px;font-weight:900;font-size:22px}
.yr .imlec{display:inline-block;width:3px;height:34px;background:#E8402F;vertical-align:-5px;margin-left:2px}
/* rozet */
.pl{padding:10px 22px;border-radius:14px;border:4px solid #151515;font-weight:900;font-size:30px;box-shadow:5px 5px 0 #151515;white-space:nowrap}
.pl.k{background:#E8402F;color:#fff}.pl.s{background:#151515;color:#fff}.pl.y{background:#F6B92B;color:#151515}.pl.g{background:#1E9E6A;color:#fff}.pl.b{background:#fff;color:#151515}
/* adım */
.ad{display:flex;align-items:center;gap:16px}.ad .no{width:96px;height:96px;border-radius:24px;background:#E8402F;border:4px solid #151515;box-shadow:6px 6px 0 #151515;color:#fff;font-weight:900;font-size:58px;display:flex;align-items:center;justify-content:center}
.ad b{font-weight:900;font-size:40px;color:#151515;line-height:1.05}
/* soru / yorum çağrısı */
.sr{display:flex;align-items:center;gap:14px;padding:16px 22px 16px 16px;max-width:620px}
.sr .ic{font-size:46px}.sr .tx{font-weight:900;font-size:28px;line-height:1.15;color:#151515}.sr .tx small{display:block;font-size:20px;color:#E8402F;font-weight:900;letter-spacing:.5px}
/* ilerleme */
#bar{position:absolute;left:0;top:0;height:10px;background:#E8402F;z-index:9}
#adimlar{position:absolute;right:60px;top:56px;display:flex;gap:10px;z-index:9}
#adimlar i{font-style:normal;width:58px;height:58px;border-radius:16px;border:4px solid #151515;background:#fff;color:#151515;font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center;box-shadow:4px 4px 0 #151515}
#adimlar i.on{background:#E8402F;color:#fff;transform:scale(1.12)}#adimlar i.ok{background:#1E9E6A;color:#fff}
#cam{position:absolute;inset:0;transform-origin:50% 45%}
/* PORTAL (temsili) */
.pt{position:relative;background:#f3f5f8;border:4px solid #151515;border-radius:18px;box-shadow:8px 8px 0 #151515;overflow:hidden;font-family:'Inter',sans-serif}
.pt-bar{height:44px;background:#e4e7ec;border-bottom:2px solid #c9ced6;display:flex;align-items:center;gap:8px;padding:0 14px}
.pt-bar i{width:13px;height:13px;border-radius:50%;background:#ff5f57}.pt-bar i+i{background:#febc2e}.pt-bar i+i+i{background:#28c840}
.pt-url{margin-left:14px;flex:1;height:28px;background:#fff;border-radius:8px;display:flex;align-items:center;gap:8px;padding:0 12px;font-size:16px;color:#333;font-weight:600}
.pt-url .em{font-size:13px}
.pt-hd{height:58px;background:#22304a;color:#fff;display:flex;align-items:center;padding:0 22px;font-size:22px;font-weight:800;gap:8px}
.pt-hd .lg{width:34px;height:34px;border-radius:9px;background:#d7262e;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px}
.pt-hd .us{margin-left:auto;font-size:15px;font-weight:600;opacity:.8}
.pt-body{position:absolute;left:0;right:0;top:102px;bottom:0}
.sc{position:absolute;inset:0;padding:22px 28px;opacity:0}
.pt h3{margin:0 0 14px;font-size:24px;font-weight:900;color:#22304a}
.pt .fl{margin-bottom:14px}.pt .fl label{display:block;font-size:15px;font-weight:700;color:#55627a;margin-bottom:6px}
.pt .in{height:48px;background:#fff;border:2px solid #c9ced6;border-radius:10px;display:flex;align-items:center;padding:0 14px;font-size:20px;font-weight:700;color:#151515;letter-spacing:.5px}
.pt .in.fo{border-color:#2f6fe0;box-shadow:0 0 0 3px rgba(47,111,224,.18)}
.pt .in .ph{color:#a3abb9;font-weight:600}
.pt .bt{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 26px;border-radius:10px;background:#d7262e;color:#fff;font-weight:900;font-size:19px}
.pt .bt.ik{background:#22304a}
.pt .lgn{width:420px;margin:6px auto 0;background:#fff;border-radius:14px;padding:22px 24px;box-shadow:0 3px 10px rgba(0,0,0,.08)}
.pt .lgn .bt{width:100%}
.pt .ara{height:58px;font-size:21px;border-radius:12px}
.pt .rs{margin-top:10px;background:#fff;border-radius:12px;box-shadow:0 6px 16px rgba(0,0,0,.1);overflow:hidden;opacity:0}
.pt .rs .r{padding:14px 18px;border-bottom:1px solid #edf0f4;display:flex;flex-direction:column;gap:3px}
.pt .rs .r b{font-size:19px;color:#22304a}.pt .rs .r span{font-size:14px;color:#7a8599;font-weight:600}
.pt .rs .r.hv{background:#eef4ff}
.pt table{width:100%;border-collapse:separate;border-spacing:0;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.06)}
.pt th{background:#22304a;color:#fff;font-size:15px;text-align:left;padding:10px 14px;font-weight:800}
.pt td{font-size:17px;padding:9px 14px;border-bottom:1px solid #edf0f4;font-weight:700;color:#283449}
.pt tr.hl td{background:#fff3c4}
.pt .ch{display:inline-block;padding:4px 10px;border-radius:8px;font-size:14px;font-weight:900;background:#ffe3d6;color:#c24614}
.pt .ch.g{background:#d9f4e6;color:#13794c}
.pt .tst{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);background:#13794c;color:#fff;font-weight:900;font-size:19px;padding:14px 22px;border-radius:12px;opacity:0;white-space:nowrap}
.pt-cur{position:absolute;left:0;top:0;width:34px;height:34px;z-index:5;pointer-events:none}
.pt-rip{position:absolute;width:60px;height:60px;margin:-30px 0 0 -30px;border-radius:50%;border:4px solid #2f6fe0;opacity:0;z-index:4}
.pt-tag{position:absolute;right:12px;bottom:10px;font-size:12px;font-weight:800;color:#8b95a8;letter-spacing:1px;background:rgba(255,255,255,.8);padding:3px 8px;border-radius:6px;z-index:6}
/* arama çubuğu */
.ar{min-width:560px;padding:16px 22px 16px 18px;white-space:nowrap;display:flex;align-items:center;gap:12px}.ar .em{font-size:30px}.ar .tx{font-family:'JetBrains Mono',monospace;font-weight:800;font-size:24px;color:#151515}
.ar .ph{color:#aaa}
`;

// Öğe tipleri → HTML. data-* alanları frame() içindeki animasyonlarda kullanılır.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function ekranHTML(id, e) {
  const fld = f => `<div class="fl"><label>${esc(f.label)}</label><div class="in" data-id="${f.id}"><span data-val></span><span class="ph">${esc(f.ph || '')}</span></div></div>`;
  let h = '';
  if (e.tur === 'giris') h = `<div class="lgn"><h3>${esc(e.baslik || 'Giriş Yap')}</h3>${e.alanlar.map(fld).join('')}<div class="bt" data-id="${e.buton.id}">${esc(e.buton.t)}</div></div>`;
  if (e.tur === 'arama') h = `<h3>${esc(e.baslik || 'Hizmet Ara')}</h3><div class="in ara" data-id="${e.alan}"><span class="em" style="font-size:20px;margin-right:10px">🔍</span><span data-val></span><span class="ph">${esc(e.ph || 'Hizmet veya kurum ara…')}</span></div>
    <div class="rs" data-rs="${e.alan}">${e.sonuclar.map((r, i) => `<div class="r" data-id="${r.id || 'r' + i}"><b>${esc(r.t)}</b>${r.s ? `<span>${esc(r.s)}</span>` : ''}</div>`).join('')}</div>`;
  if (e.tur === 'tablo') h = `<h3>${esc(e.baslik)}</h3><table><tr>${e.kolonlar.map(k => `<th>${esc(k)}</th>`).join('')}</tr>${e.satirlar.map((r, i) => `<tr data-id="row${i}">${r.map((c, j) => `<td>${j === r.length - 1 && e.durum ? `<span class="ch ${e.durumRenk || ''}">${esc(c)}</span>` : esc(c)}</td>`).join('')}</tr>`).join('')}</table>`;
  if (e.tur === 'form') h = `<h3>${esc(e.baslik)}</h3>${(e.ust || []).map(b => `<div class="bt ik" data-id="${b.id}" style="margin-bottom:16px">${esc(b.t)}</div>`).join('')}${e.alanlar.map(fld).join('')}${e.butonlar.map(b => `<div class="bt" data-id="${b.id}">${esc(b.t)}</div>`).join(' ')}${e.toast ? `<div class="tst" data-id="${e.toast.id}">${esc(e.toast.t)}</div>` : ''}`;
  return `<div class="sc" data-sc="${id}">${h}</div>`;
}

// Dosyadan çıkan nesneler (SVG)
const NESNE = {
  tokmak: `<svg width="190" height="150" viewBox="0 0 190 150"><g transform="rotate(-28 95 75)"><rect x="86" y="58" width="18" height="84" rx="8" fill="#A8693E" stroke="#151515" stroke-width="6"/><rect x="40" y="18" width="110" height="52" rx="14" fill="#A8693E" stroke="#151515" stroke-width="6"/><rect x="30" y="12" width="20" height="64" rx="8" fill="#F6B92B" stroke="#151515" stroke-width="6"/><rect x="140" y="12" width="20" height="64" rx="8" fill="#F6B92B" stroke="#151515" stroke-width="6"/><path d="M60 28 H120" stroke="#C98A55" stroke-width="6" stroke-linecap="round"/></g></svg>`,
  belge: `<svg width="150" height="180" viewBox="0 0 150 180"><path d="M18 8 H102 L134 40 V170 H18 Z" fill="#fff" stroke="#151515" stroke-width="6" stroke-linejoin="round"/><path d="M102 8 V40 H134" fill="#eee" stroke="#151515" stroke-width="6" stroke-linejoin="round"/><path d="M36 60 H114 M36 82 H114 M36 104 H96" stroke="#cfcfcf" stroke-width="7" stroke-linecap="round"/><circle cx="104" cy="138" r="20" fill="#E8402F" stroke="#151515" stroke-width="5"/><path d="M95 138 l6 7 l12 -14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  kitap: `<svg width="150" height="180" viewBox="0 0 150 180"><rect x="26" y="10" width="110" height="160" rx="10" fill="#fff4da" stroke="#151515" stroke-width="6"/><rect x="14" y="4" width="110" height="160" rx="10" fill="#C93224" stroke="#151515" stroke-width="6"/><path d="M34 6 V162" stroke="#8d1d14" stroke-width="8"/><rect x="46" y="36" width="64" height="26" rx="5" fill="#F6B92B" stroke="#151515" stroke-width="4"/><text x="78" y="55" text-anchor="middle" font-family="Inter Display,Arial" font-weight="900" font-size="15" fill="#151515">KANUN</text><path d="M78 90 V128 M64 128 H92 M58 98 H98 M58 98 L50 114 H66 Z M98 98 L90 114 H106 Z" stroke="#F6B92B" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const TIPLER = {
  nesne: p => `<div class="ik">${NESNE[p.ad] || `<span class="em" style="font-size:120px">${p.ad}</span>`}${p.yazi ? `<b>${esc(p.yazi)}</b>` : ''}</div>`,
  portal: p => `<div class="pt" style="width:${p.w}px;height:${p.h}px"><div class="pt-bar"><i></i><i></i><i></i><div class="pt-url"><span class="em">🔒</span><span data-url></span></div></div>
    <div class="pt-hd"><span class="lg">e</span>e-Devlet Kapısı<span class="us">${esc(p.kullanici || '')}</span></div>
    <div class="pt-body">${Object.entries(p.ekranlar).map(([id, e]) => ekranHTML(id, e)).join('')}</div>
    <div class="pt-rip"></div><svg class="pt-cur" viewBox="0 0 34 34"><path d="M5 3 L5 27 L11 21 L15 31 L20 29 L16 19 L25 19 Z" fill="#fff" stroke="#151515" stroke-width="2.5" stroke-linejoin="round"/></svg>
    <div class="pt-tag">TEMSİLİ GÖRÜNTÜ</div></div>`,
  soru: p => `<div class="kart sr"><span class="em ic">${p.e || '💬'}</span><div class="tx"><small>${esc(p.ust || 'YORUMLARA YAZ 👇')}</small>${esc(p.yazi)}</div></div>`,
  edevlet: p => `<div class="kart ed"><div class="hd"><span class="em">🇹🇷</span>${esc(p.baslik || 'e-Devlet Kapısı')}</div>${(p.satirlar || []).map((r, i) => `<div class="row" data-sub="${i}"><span>${esc(r.t)}</span>${r.rozet ? `<span class="rz" data-rz="${i}">${esc(r.rozet)}</span>` : `<span class="muted">${esc(r.sag || '')}</span>`}</div>`).join('')}</div>`,
  liste: p => `<div class="kart ls">${p.ogeler.map((r, i) => `<div class="it" data-sub="${i}"><span class="em">${r.e}</span>${esc(r.t)}</div>`).join('')}</div>`,
  damga: p => `<div class="dm">${esc(p.yazi)}</div>`,
  ikon: p => `<div class="ik"><div class="kart kutu"><span class="em">${p.e}</span></div>${p.yazi ? `<b>${esc(p.yazi)}</b>` : ''}</div>`,
  rozet: p => `<div class="pl ${p.renk || 'k'}">${p.e ? `<span class="em">${p.e}</span> ` : ''}${esc(p.yazi)}</div>`,
  ok: p => `<div class="ok"><svg width="${p.w || 120}" height="60" viewBox="0 0 120 60"><path d="M6 30 H96" stroke="#151515" stroke-width="10" stroke-linecap="round"/><path d="M80 10 L108 30 L80 50" fill="none" stroke="#151515" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`,
  yorum: p => `<div class="kart yr"><div class="ust"><div class="av">S</div>Yorum ekle…</div><div class="in"><div class="kutu"><span data-yaz="${esc(p.yazi)}"></span><span class="imlec"></span></div><div class="gon">GÖNDER</div></div></div>`,
  adim: p => `<div class="ad"><div class="no">${p.no}</div><b>${esc(p.yazi)}</b></div>`,
  arama: p => `<div class="kart ar"><span class="em">🔍</span><span class="tx" data-yaz="${esc(p.yazi)}"></span><span class="imlec" style="display:inline-block;width:3px;height:26px;background:#E8402F"></span></div>`,
};

const FONT_DIR = path.join(__dirname, '..', '..', 'assets', 'fonts');
const STIL_YAPAYTU = () => `
@font-face{font-family:'Unbounded';font-weight:900;src:url('file://${FONT_DIR}/unbounded-latin-900-normal.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Unbounded';font-weight:900;src:url('file://${FONT_DIR}/unbounded-latin-ext-900-normal.woff2') format('woff2');unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
html,body{background:#FFFFFF}
#bg,#bg.izgara,#bg.cizgi,#bg.leke{background:radial-gradient(#ededed 1.5px,transparent 1.5px) 0 0/28px 28px}
.kart,.pt,.ad .no{border:7px solid #0E0E10!important;border-radius:30px!important;box-shadow:14px 14px 0 #0E0E10!important}
.pl{border:6px solid #0E0E10;border-radius:22px;box-shadow:10px 10px 0 #0E0E10}
#title,#sub span,.pl,.ik b,.ad b,.dm,.sr .tx,.ls .it,.ed .hd{font-family:'Unbounded',sans-serif!important;font-weight:900;letter-spacing:-.035em}
#title{color:#0E0E10;font-size:calc(var(--ts)*.86)}#title .alt{color:#0E0E10}
#sub span{font-size:calc(var(--ss)*.82)}
#sub .on{background:#FF4D2E;box-shadow:5px 5px 0 #0E0E10}#sub .off{color:#8B8E95;background:#fff}
#sub.cizgi .on{border-bottom-color:#FF4D2E}
.pl.k{background:#0E0E10;color:#fff}.pl.y{background:#FCC033;color:#0E0E10}.pl.g{background:#0E0E10;color:#fff}
.dm{border-color:#FF4D2E;color:#FF4D2E;font-size:40px;padding:8px 20px}
.ik b{font-size:18px}.pl{font-size:24px}.ls .it{font-size:24px}.sr .tx{font-size:22px}.sr .tx small{font-size:15px}
.ad .no{background:#0E0E10}.ed .hd{background:#0E0E10}.ed .muted{color:#8B8E95}.rz{background:#FCC033;color:#0E0E10}
.yr .av{background:#0E0E10}.yr .gon{background:#FF4D2E}.sr .tx small{color:#8B8E95}
#adimlar i{border:5px solid #0E0E10;box-shadow:6px 6px 0 #0E0E10;font-family:'Unbounded'}#adimlar i.on{background:#FF4D2E}#adimlar i.ok{background:#0E0E10}
`;

function sayfa({ W, H, L, tl }) {
  const dosya = fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8');
  const ogeler = tl.ogeler.map((o, i) => `<div class="o" id="o${i}" style="left:${o.x}px;top:${o.y}px;opacity:0">${TIPLER[o.tip](o)}</div>`).join('\n');
  const yt = tl.stil === 'yapaytu';
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>${CSS(W, H, L)}${yt ? STIL_YAPAYTU() : ''}:root{--ts:${L.titleSize}px;--ss:${L.subSize}px}</style></head><body>
<div id="bg" class="${(tl.tema || {}).bg || ''}"></div><div id="flas"></div><div id="cam"><div id="title"></div>${ogeler}<div id="sub" class="${(tl.tema || {}).altyazi || ''}"></div><div id="stage"></div></div>${tl.adimSayisi ? `<div id="adimlar">${Array.from({ length: tl.adimSayisi }, (_, i) => `<i>${i + 1}</i>`).join('')}</div>` : ''}
<script>${dosya}</script>
<script>
const TL = ${JSON.stringify(tl)};
const MS = ${L.mascot[2]}, OS = ${L.ogeScale || 1}, MX = ${L.mascot[0]}, MY = ${L.mascot[1]};
const backOut = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const YT = TL.stil === 'yapaytu';
const yay = s => 1 - Math.exp(-s * 9) * Math.cos(s * 21);   // yaylı (spring) giriş, s = saniye
const cl = (v,a,b) => Math.max(a, Math.min(b, v));
document.querySelectorAll('.o').forEach((el,i)=>{ const r = el.getBoundingClientRect(); el.dataset.w = r.width; el.dataset.h = r.height; });
// portal hedef noktalarını ölç (dönüşümsüz haldeyken)
const PT = {};
TL.ogeler.forEach((o,i)=>{ if (o.tip!=='portal') return; const el=document.getElementById('o'+i), pt=el.querySelector('.pt'), pr=pt.getBoundingClientRect(), pos={};
  pt.querySelectorAll('[data-id]').forEach(n=>{ const r=n.getBoundingClientRect(); pos[n.dataset.id]=[r.left-pr.left+Math.min(r.width*.5, 60), r.top-pr.top+r.height*.55]; });
  PT[i]={pos, w:pr.width, h:pr.height}; });
const easeIO = k => k<.5 ? 2*k*k : 1-Math.pow(-2*k+2,2)/2;
function portal(o, i, el, t){
  const P = PT[i], acts = o.akis;
  // ekran
  let scr = Object.keys(o.ekranlar)[0], scrT = -9;
  acts.forEach(a=>{ if (a.yap==='ekran' && a.T<=t) { scr=a.ad; scrT=a.T; } });
  el.querySelectorAll('.sc').forEach(sc=>{ const on = sc.dataset.sc===scr, k=cl((t-scrT)/.25,0,1); sc.style.opacity = on ? k : 0; sc.style.transform = on ? 'translateX('+((1-easeIO(k))*40)+'px)' : 'none'; });
  // yazı alanları, adres
  const typed = {};
  acts.forEach(a=>{ if (a.yap==='yaz' || a.yap==='url') { const n = Math.floor(cl((t-a.T)*(a.hiz||14),0,a.yazi.length)); if (t>=a.T) typed[a.yap==='url'?'__url':a.alan] = { s:a.yazi.slice(0,n), done:n>=a.yazi.length, act: t < a.T + a.yazi.length/(a.hiz||14) + .4 }; } });
  el.querySelector('[data-url]').textContent = typed.__url ? typed.__url.s : '';
  el.querySelectorAll('.in[data-id]').forEach(n=>{ const v = typed[n.dataset.id]; n.querySelector('[data-val]').textContent = v ? v.s : ''; n.querySelector('.ph').style.display = v && v.s ? 'none':'inline'; n.classList.toggle('fo', !!(v && v.act)); });
  el.querySelectorAll('[data-rs]').forEach(n=>{ const v = typed[n.dataset.rs]; n.style.opacity = v && v.s.length >= 4 ? 1 : 0; });
  // vurgula / göster / hover
  el.querySelectorAll('tr[data-id],.r[data-id]').forEach(n=>n.classList.remove('hl','hv'));
  acts.forEach(a=>{ if (t<a.T) return; const n = el.querySelector('[data-id="'+a.hedef+'"]'); if (!n) return;
    if (a.yap==='vurgula') n.classList.add('hl');
    if (a.yap==='tikla' && n.classList.contains('r')) n.classList.add('hv'); });
  acts.forEach(a=>{ if (a.yap!=='goster') return; const n = el.querySelector('[data-id="'+a.hedef+'"]'); if (n) { const k=cl((t-a.T)/.3,0,1); n.style.opacity=k; } });
  // fare imleci: hedefler arasında yumuşak hareket, tıklamada dalga
  const way = [{T:-9, p:[P.w*.82, P.h*.85]}];
  acts.forEach(a=>{ if (['tikla','yaz','vurgula'].includes(a.yap) && P.pos[a.hedef||a.alan]) way.push({T: a.T - (a.yap==='yaz'?.15:0), p:P.pos[a.hedef||a.alan], click:a.yap==='tikla'||a.yap==='yaz'}); });
  let cur = way[0].p;
  for (let j=1;j<way.length;j++){ const w=way[j], pv=way[j-1]; if (t>=w.T) cur=w.p; else { const st=w.T-.55; if (t>st){ const k=easeIO(cl((t-st)/.55,0,1)); cur=[pv.p[0]+(w.p[0]-pv.p[0])*k, pv.p[1]+(w.p[1]-pv.p[1])*k - Math.sin(k*Math.PI)*30]; } break; } }
  const c = el.querySelector('.pt-cur'); c.style.transform='translate('+(cur[0]-6)+'px,'+(cur[1]-4)+'px)';
  const rip = el.querySelector('.pt-rip'); let rk = -1; way.forEach(w=>{ if (w.click && t>=w.T && t<w.T+.4) rk=(t-w.T)/.4; });
  rip.style.opacity = rk<0 ? 0 : 1-rk; rip.style.left=cur[0]+'px'; rip.style.top=cur[1]+'px'; rip.style.transform='scale('+(.3+rk*.9)+')';
  acts.forEach(a=>{ if (a.yap==='tikla') { const n = el.querySelector('[data-id="'+a.hedef+'"]'); if (n && n.classList.contains('bt')) n.style.transform = (t>=a.T && t<a.T+.15) ? 'scale(.94)' : 'none'; } });
}
let lastTitle = -1;
let MST = null;
function frame(t){
  MST = Dosya.stateAt(TL, t);
  // başlık
  const bi = TL.basliklar.reduce((a,b,i)=> b.t<=t ? i : a, -1);
  const T = document.getElementById('title');
  if (bi !== lastTitle) { lastTitle = bi; T.innerHTML = bi<0 ? '' : '<span class="satir">'+TL.basliklar[bi].ust+'</span><span class="satir alt">'+TL.basliklar[bi].alt+'</span>'; }
  const TA = (TL.tema||{}).baslik || 'kay';
  if (bi>=0) { const B=TL.basliklar[bi], k = cl((t-B.t)/.3,0,1);
    [...T.children].forEach((s,j)=>{ const kk = cl(k*1.3 - j*.3,0,1);
      if (TA==='yaz') { const txt = j ? B.alt : B.ust, n = Math.floor(cl((t-B.t-j*.18)*38,0,txt.length)); s.textContent = txt.slice(0,n) || '\u00a0'; s.style.opacity = 1; s.style.transform='none'; }
      else if (TA==='zoom') { s.style.transform='scale('+(1.25-.25*backOut(kk))+')'; s.style.opacity=kk; }
      else { s.style.transform='translateX('+((1-backOut(kk))*-40)+'px)'; s.style.opacity=kk; } }); }
  // öğeler
  TL.ogeler.forEach((o,i)=>{
    const el = document.getElementById('o'+i), w = +el.dataset.w, h = +el.dataset.h;
    const lt = t - o.t0, out = o.t1 != null ? t - o.t1 : -1;
    let s = 0, op = 0, rot = o.rot || 0;
    if (lt >= 0) { const k = cl(lt/.38,0,1); s = YT ? .5 + .5*yay(lt) : .55 + .45*backOut(k); op = cl(lt/.12,0,1); }
    if (o.tip === 'damga' && lt >= 0) { const k = cl(lt/.22,0,1); s = 1.9 - .9*k*k; op = cl(lt/.08,0,1); }
    let dx = 0, dy = 0;
    if (YT && lt > .5 && o.tip !== 'portal' && o.tip !== 'damga') { dy = Math.sin(t * 2.1 + i * 1.7) * 4; rot += Math.sin(t * 1.4 + i) * .7; }   // hiçbir şey 2 sn'den uzun durmasın
    // rig koordinatından sayfa koordinatına
    const rig2page = (x, y) => [MX + MS * x / 600, MY + MS * (y + 40 + (MST.bob || 0) - (MST.jump || 0)) / 600];
    if (o.firlat === 'el' && lt >= -.32 && lt < 0) {
      // nesne elde: maskotun yumruğunda küçük halde yukarı çıkıyor
      const hp = Dosya.elKonum(MST.armR), [px, py] = rig2page(hp[0], hp[1] - 18);
      dx = px - o.x; dy = py - o.y; s = .32; op = 1; rot = (o.rot || 0) - 10;
    }
    if (o.firlat && lt >= 0 && lt < .6) {
      // dosyanın içinden (veya elden) kavis çizerek fırla, dönerek yerine otur
      const k = easeIO(cl(lt / .6, 0, 1));
      const src = o.firlat === 'el' ? rig2page(405, 52) : rig2page(300, 190), sxp = src[0], syp = src[1];
      const px = sxp + (o.x - sxp) * k, py = syp + (o.y - syp) * k - Math.sin(k * Math.PI) * (o.firlat === 'el' ? 160 : 260);
      dx = px - o.x; dy = py - o.y; s = (o.firlat === 'el' ? .32 : .2) + (o.firlat === 'el' ? .73 : .85) * k - .05 * Math.sin(k * Math.PI); op = o.firlat === 'el' ? 1 : cl(lt / .06, 0, 1); rot = (o.rot || 0) + (1 - k) * (o.firlat === 'el' ? 200 : 340);
    } else if (o.firlat && lt >= .6) { const k = cl((lt - .6) / .25, 0, 1); s = 1 + .08 * Math.sin(k * Math.PI); }
    if (out >= 0) { const k = cl(out/.25,0,1); s *= 1 - .25*k; op *= 1-k; }
    el.style.opacity = op;
    el.style.transform = 'translate('+(dx - w/2)+'px,'+(dy - h/2)+'px) scale('+(s*OS)+') rotate('+rot+'deg)';
    if (op <= 0) return;
    // alt parçalar (liste satırları, rozetler) kendi kelimelerinde belirir
    el.querySelectorAll('[data-sub]').forEach(sub => { const st = (o.altT||[])[+sub.dataset.sub]; const k = st==null ? 1 : cl((t-st)/.3,0,1); sub.style.opacity = k; sub.style.transform = 'translateX('+((1-backOut(k))*30)+'px)'; });
    el.querySelectorAll('[data-rz]').forEach(rz => { const st = (o.rozetT||[])[+rz.dataset.rz]; const k = st==null ? 1 : cl((t-st)/.3,0,1); rz.style.opacity = k; rz.style.transform = 'scale('+(st==null?1:.4+.6*backOut(k))+')'; });
    if (o.tip === 'portal') portal(o, i, el, t);
    el.querySelectorAll('[data-yaz]').forEach(y => { const txt = y.dataset.yaz, st = o.yazT ?? o.t0 + .3, n = Math.floor(cl((t-st)*(o.hiz||9),0,txt.length)); y.textContent = txt.slice(0,n); });
  });
  // altyazı: iki kelimelik pencere, konuşulan kelime vurgulu
  const W = TL.kelimeler, sub = document.getElementById('sub');
  let w = W.findIndex(k => t>=k.t0 && t<k.t1);
  if (w < 0) { const p = W.findIndex(k => k.t0 > t); w = (p>0 && t - W[p-1].t1 < .35) ? p-1 : -1; }
  if (w < 0) sub.innerHTML = '';
  else { const pair = w % 2 === 0 ? [w, w+1] : [w-1, w]; sub.innerHTML = pair.filter(i=>W[i]).map(i=>'<span class="'+(i===w?'on':'off')+'">'+W[i].w.replace(/[,.!?;:"]/g,'').toLocaleUpperCase('tr')+'</span>').join(''); }
  // kamera
  let zs = 1, sx = 0, sy = 0;
  const GC = (TL.tema||{}).gecis || 'zoom';
  let tx = 0; document.getElementById('flas').style.opacity = 0;
  if (bi > 0) { const d = t - TL.basliklar[bi].t;
    if (GC==='zoom' && d < .45) zs = 1 + .045 * Math.pow(1 - d/.45, 2);
    if (GC==='kaydir' && d < .4) tx = 70 * Math.pow(1 - d/.4, 3);
    if (GC==='flas' && d < .25) document.getElementById('flas').style.opacity = .55 * (1 - d/.25); }
  let blur = 0;
  if (YT && bi > 0) { const d = t - TL.basliklar[bi].t; zs = 1; tx = 0; document.getElementById('flas').style.opacity = 0;
    if (d < 7/30) { const k = d / (7/30); zs = 1.16 - .16 * (1 - Math.pow(1 - k, 3)); blur = 10 * (1 - k); } }   // içe dalış: zoom + bulanıklık, 7 kare
  TL.ogeler.forEach(o => { if (o.tip === 'damga') { const d = t - o.t0 - .2; if (d >= 0 && d < .28) { const a = (1 - d/.28) * 9; sx = Math.sin(d*90)*a; sy = Math.cos(d*77)*a; } } });
  document.getElementById('cam').style.transform = 'translate('+(sx+tx)+'px,'+sy+'px) scale('+zs+')';
  document.getElementById('cam').style.filter = blur > .2 ? 'blur('+blur+'px)' : 'none';
  const AD = document.getElementById('adimlar');
  if (AD) { const cur = bi >= 0 ? TL.basliklar[bi].adim || 0 : 0; [...AD.children].forEach((c, j) => { c.className = j + 1 === cur ? 'on' : (j + 1 < cur ? 'ok' : ''); }); AD.style.opacity = cur ? 1 : 0; }
  // maskot
  document.getElementById('stage').innerHTML = Dosya.svg(MST, 'f', MS, MS);
}
</script></body></html>`;
}
module.exports = { sayfa };

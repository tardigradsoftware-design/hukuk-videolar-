// Kapanış animasyonu (deneme): BEĞEN / PAYLAŞ / ABONE OL — maskot tokmakla ABONE OL'a vurur.
// node scripts/video/kapanis.js kisa|uzun  →  maskotlar/kapanis/kapanis_<tur>.mp4
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const D = require('../dosya/dosya');
const KOK = path.join(__dirname, '..', '..');
const TUR = process.argv[2] || 'uzun', KISA = TUR === 'kisa';

const W = KISA ? 720 : 1920, H = KISA ? 1280 : 1080, FPS = 30;
const M = { s: KISA ? 400 : 680 };
const RB = KISA ? 108 : 150;                      // ABONE düğmesi yarıçapı
const CX = W / 2 + (KISA ? 45 : 0), CY = KISA ? 700 : 520;   // ekranın ortası (kısa: maskot sığsın diye hafif sağ)
// zaman çizelgesi (sn)
const Z = KISA
  ? { sure: 2.2, btn: [.05, .15, .25], cekBas: null, kaldir: [.22, .5], vur: [.5, .62] }
  : { sure: 3.4, btn: [.1, .28, .46], cekBas: .45, kaldir: [1.15, 1.42], vur: [1.42, 1.57] };
const IMPACT = Z.vur[1];
const KALKIK = [172, 18, 'yumruk', 1], VURUS = [80, 0, 'yumruk', 1];

// ABONE OL düğmesi tokmağın vuruş noktasına yerleşir
const bas = D.tokmakBas(VURUS);                          // tokmak başının merkezi (rig)
// tokmak başının alt vurma yüzü: baş merkezi + 46 * (önkola dik, aşağı yön)
const fa = (VURUS[0] + VURUS[1]) * Math.PI / 180, v = [Math.sin(fa), Math.cos(fa)];
const yuz = [bas[0] - 46 * v[1], bas[1] + 46 * v[0]];
M.x = CX - M.s * yuz[0] / 600; M.y = CY - RB - M.s * (yuz[1] + 40) / 600 + 4;
const BTN = [
  { id: 'a', x: CX, y: CY, r: RB, ikon: '🔔', t: 'ABONE OL' },
  ...(KISA ? [{ id: 'b', x: CX - 170, y: CY + 200, r: 66, ikon: '👍', t: 'BEĞEN' }, { id: 'p', x: CX + 120, y: CY + 200, r: 66, ikon: '📤', t: 'PAYLAŞ' }]
           : [{ id: 'b', x: CX + 330, y: CY - 90, r: 78, ikon: '👍', t: 'BEĞEN' }, { id: 'p', x: CX + 330, y: CY + 110, r: 78, ikon: '📤', t: 'PAYLAŞ' }]),
];
const ax = CX, ay = CY - RB;   // çarpma noktası (patlama efekti)
const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
const easeIn = k => k * k * k;
const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const lerpA = (p, q, k) => p.map((v, i) => typeof v === 'number' ? v + (q[i] - v) * k : (k < .5 ? v : q[i]));

function durum(t) {
  const s = D.ifadeState(t < IMPACT ? 'emin' : 'mutlu');
  const j = D.JEST.bekle;
  Object.assign(s, { armL: j.L.slice(), armR: j.R.slice(), bob: Math.sin(t * 3.4) * 2.5, lean: 0, squash: 0, t, flap: 0, armBehind: false, tut: null, aks: null });
  s.look = [.5, .2];
  const nat = D.elKonum(s.armR);
  // 1) uzun: elini dosyaya sokup tokmağı çıkarır
  if (Z.cekBas != null && t >= Z.cekBas && t < Z.kaldir[0]) {
    const d = t - Z.cekBas, A = [400, 140], B = [395, 215], C = [405, 70];
    const L2 = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
    let p, hand = 'acik';
    if (d < .3) p = L2(nat, A, ease(d / .3));
    else if (d < .43) { p = L2(A, B, ease((d - .3) / .13)); s.armBehind = d > .36; }
    else { p = L2(B, C, ease((d - .43) / .27)); hand = 'yumruk'; s.armBehind = d < .55; s.tut = 'tokmak'; }
    s.armR = D.kolIK(p[0], p[1], hand);
    if (d > .25 && d < .7) s.flap = Math.sin((d - .25) / .45 * Math.PI);
    s.look = [.4, -.8];
  }
  // 2) tokmağı kaldır (hazırlık)
  if (t >= Z.kaldir[0] && t < Z.vur[0]) {
    const from = Z.cekBas != null ? D.kolIK(405, 70, 'yumruk') : D.JEST.bekle.R.concat([1]);
    s.armR = lerpA(from, KALKIK, ease(cl((t - Z.kaldir[0]) / (Z.kaldir[1] - Z.kaldir[0]), 0, 1)));
    s.tut = 'tokmak'; s.lean = -3 * ease(cl((t - Z.kaldir[0]) / .25, 0, 1)); s.look = [.8, .3];
    s.brows.l.y -= 4; s.brows.r.y -= 4;
  }
  // 3) vuruş (hızlanarak)
  if (t >= Z.vur[0] && t < IMPACT) { s.armR = lerpA(KALKIK, VURUS, easeIn(cl((t - Z.vur[0]) / (IMPACT - Z.vur[0]), 0, 1))); s.tut = 'tokmak'; s.lean = 4; }
  // 4) çarpma + kutlama
  if (t >= IMPACT) {
    const d = t - IMPACT;
    s.tut = 'tokmak'; s.armR = VURUS.slice();
    s.squash = d < .18 ? Math.sin(d / .18 * Math.PI) * .07 : 0; s.lean = 4 * (1 - cl(d / .4, 0, 1));
    const sel = [150, 14 + Math.sin(d * Math.PI * 2 * 2.6) * 24, 'acik']; s.armL = d < .25 ? j.L.slice() : lerpA(j.L, sel, ease(cl((d - .25) / .25, 0, 1)));
    s.fx.parilti = cl((d - .15) / .2, 0, 1);
    s.mouth = Object.assign({}, D.IFADE.mutlu.mouth);
  }
  if (t < IMPACT) s.mouth = Object.assign({}, D.IFADE.emin.mouth);
  return s;
}

const btnCss = `.btn{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:6px solid #151515;border-radius:50%;box-shadow:8px 8px 0 #151515;font-weight:900;background:#fff;color:#151515;text-align:center;line-height:1;transform-origin:center}
.btn .em{font-family:'Noto Color Emoji'}.btn.a{background:#E8402F;color:#fff}.btn.a.ok{background:#e2e2e2;color:#444}
.ring{position:absolute;border:6px solid #E8402F;border-radius:50%;pointer-events:none}`;
const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#F4F4F2;font-family:'Inter Display','Inter',sans-serif}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.07)),radial-gradient(#d2d2d2 1.7px,transparent 1.7px) 0 0/26px 26px}
#cam{position:absolute;inset:0}
#title{position:absolute;left:0;right:0;top:${KISA ? 1010 : 830}px;text-align:center;font-weight:900;font-size:${KISA ? 50 : 70}px;line-height:1.05;color:#151515}#title span{color:#E8402F}
#stage{position:absolute;left:${M.x}px;top:${M.y}px;width:${M.s}px;height:${M.s}px}#stage svg{overflow:visible}
#burst{position:absolute;left:${ax}px;top:${ay}px;width:0;height:0}
${btnCss}</style></head><body><div id="bg"></div><div id="cam">
<div id="title">HAKLARINI ÖĞREN${KISA ? '<br>' : ' • '}<span>TAKİPTE KAL</span></div>
<div class="ring" id="ring"></div>
${BTN.map(b => `<div class="btn ${b.id}" id="btn-${b.id}" style="width:${2 * b.r}px;height:${2 * b.r}px;left:${b.x - b.r}px;top:${b.y - b.r}px"><span class="em" style="font-size:${b.r * .55}px">${b.ikon}</span><span class="tx" style="font-size:${b.r * (b.id === 'a' ? .26 : .22)}px">${b.t}</span></div>`).join('')}
<div id="stage"></div><svg id="burst" style="overflow:visible"></svg></div>
<script>${fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8')}</script>
<script>
const BTN = ${JSON.stringify(BTN)}, BT = ${JSON.stringify(Z.btn)}, IMPACT = ${IMPACT};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)), backOut=k=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2)};
const STATES = {};
function frame(t, s){
  BTN.forEach((b,i)=>{ const el=document.getElementById('btn-'+b.id), k=cl((t-BT[i])/.35,0,1);
    let sx=.4+.6*backOut(k), sy=sx;
    if (b.id==='a' && t<IMPACT && k>=1){ const q=1+.04*Math.sin((t-BT[i])*9); sx*=q; sy*=q; }
    if (b.id==='a' && t>=IMPACT){ const d=t-IMPACT; if (d<.24){ const q=Math.sin(d/.24*Math.PI); sx=1+.12*q; sy=1-.24*q; }
      el.classList.add('ok'); el.querySelector('.tx').innerHTML='ABONE<br>OLUNDU'; el.querySelector('.em').textContent='✅'; }
    el.style.opacity=k; el.style.transformOrigin = b.id==='a' ? '50% 100%' : '50% 50%'; el.style.transform='scale('+sx+','+sy+')'; });
  // vuruştan önce dikkat çeken halka, sonra genişleyen dalga
  const A=BTN[0], rg=document.getElementById('ring'); let rr=0, ro=0;
  if (t<IMPACT && t>BT[0]+.3){ const k=((t-BT[0])*1.6)%1; rr=A.r*(1+.35*k); ro=.6*(1-k); }
  if (t>=IMPACT && t<IMPACT+.5){ const k=(t-IMPACT)/.5; rr=A.r*(1+.9*k); ro=1-k; rg.style.borderColor='#F6B92B'; }
  rg.style.width=rg.style.height=(2*rr)+'px'; rg.style.left=(A.x-rr)+'px'; rg.style.top=(A.y-rr)+'px'; rg.style.opacity=ro;
  // çarpma: yıldız patlaması + sarsıntı
  const d=t-IMPACT, B=document.getElementById('burst');
  if (d>=0 && d<.45){ const k=d/.45; let g=''; for(let i=0;i<10;i++){ const a=i/10*Math.PI*2, r1=30+k*90, r2=r1+26*(1-k); g+='<line x1="'+Math.cos(a)*r1+'" y1="'+Math.sin(a)*r1+'" x2="'+Math.cos(a)*r2+'" y2="'+Math.sin(a)*r2+'" stroke="#F6B92B" stroke-width="'+(9*(1-k)+2)+'" stroke-linecap="round"/>'; } B.innerHTML=g; } else B.innerHTML='';
  const sh = d>=0 && d<.3 ? (1-d/.3)*12 : 0;
  document.getElementById('cam').style.transform='translate('+Math.sin(t*95)*sh+'px,'+Math.cos(t*83)*sh+'px)';
  document.getElementById('title').style.opacity=cl((t-.3)/.3,0,1);
  document.getElementById('stage').innerHTML = Dosya.svg(s,'k',${M.s},${M.s});
}
</script></body></html>`;

(async () => {
  const out = path.join(KOK, 'maskotlar', 'kapanis'); fs.mkdirSync(out, { recursive: true });
  const tmp = path.join(out, `.k_${TUR}.html`); fs.writeFileSync(tmp, html);
  // ses: yalnızca efektler (konuşma yok)
  const sesDir = path.join(out, '.ses'); fs.mkdirSync(sesDir, { recursive: true });
  const sessiz = path.join(sesDir, `${TUR}_sessiz.wav`), olay = path.join(sesDir, `${TUR}_olay.json`), miks = path.join(sesDir, `${TUR}_miks.wav`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', `anullsrc=r=48000:cl=mono`, '-t', String(Z.sure), sessiz]);
  const ev = [...Z.btn.map(t => ({ t, tip: 'pop' }))];
  if (Z.cekBas != null) ev.push({ t: Z.cekBas + .3, tip: 'kagit' }, { t: Z.cekBas + .45, tip: 'tik' });
  else ev.push({ t: Z.kaldir[0], tip: 'pop', v: .7 });
  ev.push({ t: Z.vur[0], tip: 'whoosh' }, { t: IMPACT, tip: 'thud' }, { t: IMPACT, tip: 'click' }, { t: IMPACT + .12, tip: 'bildirim' }, { t: IMPACT + .35, tip: 'ding', v: .7 });
  fs.writeFileSync(olay, JSON.stringify({ sure: Z.sure, olaylar: ev }));
  execFileSync('python3', [path.join(__dirname, 'miks.py'), sessiz, olay, TUR, miks, '--lufs=-18'], { stdio: 'ignore' });

  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
  const dosya = path.join(out, `kapanis_${TUR}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-i', miks, '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'slow', '-tune', 'animation', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', dosya], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.ceil(Z.sure * FPS);
  for (let i = 0; i < n; i++) {
    const t = i / FPS;
    await p.evaluate(([t, s]) => frame(t, s), [t, durum(t)]);
    ff.stdin.write(await p.screenshot({ type: 'jpeg', quality: 93 }));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close(); fs.unlinkSync(tmp);
  console.log('✔', dosya, `(${Z.sure} sn)`);
})();

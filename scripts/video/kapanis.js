// Kapanış (deneme, profesyonel): abone kartı + imleç tıklaması + zil; uzunda "sıradaki video" alanları.
// node scripts/video/kapanis.js kisa|uzun  →  maskotlar/kapanis/kapanis_<tur>.mp4
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const D = require('../dosya/dosya');
const KOK = path.join(__dirname, '..', '..');
const TUR = process.argv[2] || 'uzun', KISA = TUR === 'kisa';

const KANAL = { ad: 'Haklarını Bil', alt: 'Hukuk rehberleri • Her gün yeni video' };
const W = KISA ? 720 : 1920, H = KISA ? 1280 : 1080, FPS = 30;
// zaman çizelgesi (sn)
const Z = KISA
  ? { sure: 2.8, kart: .05, imlecGir: .35, tikAbone: .95, tikZil: 1.55, menu: 1.6 }
  : { sure: 7.0, kart: .15, imlecGir: .8, tikAbone: 1.7, tikZil: 2.6, menu: 2.65 };
const BUTON = KISA ? 'Takip et' : 'Abone ol', BUTON_OK = KISA ? 'Takip ediliyor' : 'Abone olundu';

// avatar: maskotun yüzü (kırpılmış)
const avatar = D.svg(D.poz({ ifade: 'emin' }), 'av').replace('viewBox="0 0 600 600"', 'viewBox="150 200 300 300"').replace(/width="600" height="600"/, 'width="100%" height="100%"');

// küçük maskot: sakin bekleme, sonda el sallama
const MASK = { cues: [], kelimeler: [], ifade: [{ t: 0, ad: 'emin' }, { t: Z.tikAbone + .1, ad: 'mutlu' }], jest: [{ t: 0, ad: 'bekle' }, { t: Z.sure - (KISA ? 1.1 : 2.2), ad: 'selam' }] };
const MS = KISA ? 300 : 360, MPOS = KISA ? [W / 2 - MS / 2, 250] : [120, 600];

const css = `*{box-sizing:border-box}html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#F4F4F2;font-family:'Inter','Inter Display',sans-serif}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.06)),radial-gradient(#d4d4d4 1.6px,transparent 1.6px) 0 0/26px 26px}
#ust{position:absolute;left:0;right:0;top:${KISA ? 150 : 210}px;text-align:center;font-family:'Inter Display';font-weight:900;font-size:${KISA ? 46 : 64}px;color:#151515;letter-spacing:-.5px}
#ust span{color:#E8402F}
#kart{position:absolute;left:${KISA ? 40 : 480}px;top:${KISA ? 590 : 400}px;width:${KISA ? 640 : 880}px;background:#fff;border:4px solid #151515;border-radius:28px;box-shadow:8px 8px 0 #151515;padding:${KISA ? 28 : 36}px;display:flex;align-items:center;gap:${KISA ? 20 : 28}px}
.av{flex:none;width:${KISA ? 110 : 150}px;height:${KISA ? 110 : 150}px;border-radius:50%;background:#FBE3DF;border:4px solid #151515;overflow:hidden}
.bilgi{flex:1;min-width:0}.bilgi b{display:block;font-family:'Inter Display';font-weight:900;font-size:${KISA ? 36 : 48}px;color:#151515;line-height:1.05}
.bilgi span{display:block;margin-top:6px;font-weight:600;font-size:${KISA ? 18 : 24}px;color:#6b6b6b}
.btns{display:flex;align-items:center;gap:12px;margin-top:${KISA ? 16 : 20}px}
.ab{height:${KISA ? 56 : 66}px;padding:0 ${KISA ? 26 : 34}px;border-radius:999px;background:#151515;color:#fff;font-weight:800;font-size:${KISA ? 22 : 28}px;display:flex;align-items:center;gap:8px;transition:none}
.ab.ok{background:#ececec;color:#151515}
.zil{width:${KISA ? 56 : 66}px;height:${KISA ? 56 : 66}px;border-radius:50%;background:#ececec;display:flex;align-items:center;justify-content:center}
.zil svg{width:55%;height:55%}
#menu{position:absolute;background:#fff;border-radius:14px;box-shadow:0 10px 28px rgba(0,0,0,.18);padding:8px 0;font-weight:700;font-size:${KISA ? 19 : 22}px;color:#151515;width:${KISA ? 270 : 320}px;opacity:0}
#menu div{padding:12px 20px;display:flex;justify-content:space-between}#menu div.on{background:#f3f3f3}
#imlec{position:absolute;width:${KISA ? 40 : 46}px;height:${KISA ? 40 : 46}px;z-index:9}
#dalga{position:absolute;width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:50%;border:4px solid #2f6fe0;opacity:0;z-index:8}
.sv{position:absolute;border:4px dashed #b9b9b9;border-radius:22px;display:flex;align-items:flex-end;padding:18px 22px;font-weight:800;font-size:22px;color:#9a9a9a;letter-spacing:1px}
#stage{position:absolute;left:${MPOS[0]}px;top:${MPOS[1]}px;width:${MS}px;height:${MS}px}`;

const ZIL = (dolu) => `<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6z" fill="${dolu ? '#151515' : 'none'}" stroke="#151515" stroke-width="2" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="#151515" stroke-width="2"/></svg>`;
const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>${css}</style></head><body><div id="bg"></div>
<div id="ust">${KISA ? 'Haklarını kaçırma,<br><span>takipte kal</span>' : 'Bir sonraki rehberde <span>görüşmek üzere</span>'}</div>
${KISA ? '' : `<div class="sv" style="left:1450px;top:380px;width:400px;height:225px">SIRADAKİ VİDEO</div><div class="sv" style="left:1450px;top:650px;width:400px;height:225px">ÖNERİLEN</div>`}
<div id="kart"><div class="av">${avatar}</div><div class="bilgi"><b>${KANAL.ad}</b><span>${KANAL.alt}</span>
<div class="btns"><div class="ab" id="ab">${BUTON}</div><div class="zil" id="zil">${ZIL(false)}</div></div></div></div>
<div id="menu"><div>Tüm bildirimler <span id="tik"></span></div><div>Kişiselleştirilmiş</div><div>Hiçbiri</div></div>
<div id="stage"></div><div id="dalga"></div>
<svg id="imlec" viewBox="0 0 34 34"><path d="M5 3 L5 27 L11 21 L15 31 L20 29 L16 19 L25 19 Z" fill="#fff" stroke="#151515" stroke-width="2.5" stroke-linejoin="round"/></svg>
<script>${fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8')}</script>
<script>
const Z = ${JSON.stringify(Z)}, MASK = ${JSON.stringify(MASK)}, MS = ${MS}, ZILD = ${JSON.stringify(ZIL(true))}, ZILB = ${JSON.stringify(ZIL(false))}, BOK = ${JSON.stringify(BUTON_OK)};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)), io=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2, out=k=>1-Math.pow(1-k,3);
const ab=document.getElementById('ab'), zil=document.getElementById('zil'), kart=document.getElementById('kart'), menu=document.getElementById('menu');
const merkez = el => { const r=el.getBoundingClientRect(); return [r.left+r.width*.5, r.top+r.height*.55]; };
const P_AB = merkez(ab), P_ZIL = merkez(zil), P_BAS = [${W} * ${KISA ? .85 : .72}, ${H} * ${KISA ? .95 : .92}];
const zr = zil.getBoundingClientRect(); menu.style.left=(zr.left - ${KISA ? 120 : 40})+'px'; menu.style.top=(zr.bottom+12)+'px';
const MENU_TUM = (()=>{ const r=menu.firstElementChild.getBoundingClientRect(); return [r.left+r.width*.4, r.top+r.height*.5]; })();
function frame(t){
  // kart ve başlık: yumuşak giriş
  const kk = out(cl((t-Z.kart)/.5,0,1));
  kart.style.opacity=kk; kart.style.transform='translateY('+((1-kk)*40)+'px)';
  const uk = out(cl((t-Z.kart-.15)/.5,0,1)); const U=document.getElementById('ust'); U.style.opacity=uk; U.style.transform='translateY('+((1-uk)*-20)+'px)';
  document.querySelectorAll('.sv').forEach((s,i)=>{ const k=out(cl((t-.4-i*.15)/.5,0,1)); s.style.opacity=k; });
  // imleç yolu: giriş → abone düğmesi (tık) → zil (tık) → menü "Tüm bildirimler" (tık)
  const yol=[[Z.imlecGir-.01,P_BAS],[Z.tikAbone,P_AB],[Z.tikZil,P_ZIL],[Z.menu+.45,MENU_TUM]];
  let p=P_BAS; for(let i=1;i<yol.length;i++){ const [t1,p1]=yol[i],[t0,p0]=yol[i-1]; const st=Math.max(t0+.1,t1-.55); if(t>=t1){p=p1;continue;} if(t>st){const k=io((t-st)/(t1-st)); p=[p0[0]+(p1[0]-p0[0])*k,p0[1]+(p1[1]-p0[1])*k];} break; }
  const im=document.getElementById('imlec'), vis=cl((t-Z.imlecGir)/.2,0,1)*(1-cl((t-(Z.menu+.9))/.3,0,1));
  im.style.opacity=vis; im.style.left=(p[0]-6)+'px'; im.style.top=(p[1]-4)+'px';
  // tıklama dalgası
  const D2=document.getElementById('dalga'); let dk=-1, dp=p; [[Z.tikAbone,P_AB],[Z.tikZil,P_ZIL],[Z.menu+.45,MENU_TUM]].forEach(([tt,pp])=>{ if(t>=tt&&t<tt+.4){dk=(t-tt)/.4;dp=pp;} });
  D2.style.opacity=dk<0?0:1-dk; D2.style.left=dp[0]+'px'; D2.style.top=dp[1]+'px'; D2.style.transform='scale('+(.3+dk*.9)+')';
  // düğme durumları
  const basildi = t>=Z.tikAbone;
  ab.classList.toggle('ok',basildi); ab.innerHTML = basildi ? '✓ '+BOK : '${BUTON}';
  ab.style.transform = (t>=Z.tikAbone && t<Z.tikAbone+.12) ? 'scale(.95)' : 'none';
  zil.innerHTML = t>=Z.menu+.45 ? ZILD : ZILB;
  const sal = t>=Z.menu+.45 && t<Z.menu+1.2 ? Math.sin((t-Z.menu-.45)*28)*14*(1-(t-Z.menu-.45)/.75) : 0;
  zil.firstElementChild.style.transform='rotate('+sal+'deg)';
  const mk = cl((t-Z.menu)/.15,0,1)*(1-cl((t-Z.menu-.75)/.2,0,1));
  menu.style.opacity=mk; menu.style.transform='translateY('+((1-mk)*-8)+'px)';
  document.getElementById('tik').textContent = t>=Z.menu+.45 ? '✓' : '';
  menu.firstElementChild.classList.toggle('on', t>=Z.menu+.25);
  // maskot
  const ms = cl((t-.2)/.4,0,1);
  const S=document.getElementById('stage'); S.style.opacity=ms; S.innerHTML=Dosya.svg(Dosya.stateAt(MASK,t),'m',MS,MS);
}
</script></body></html>`;

(async () => {
  const out = path.join(KOK, 'maskotlar', 'kapanis'); fs.mkdirSync(out, { recursive: true });
  const tmp = path.join(out, `.k_${TUR}.html`); fs.writeFileSync(tmp, html);
  const sesDir = path.join(out, '.ses'); fs.mkdirSync(sesDir, { recursive: true });
  const sessiz = path.join(sesDir, `${TUR}_sessiz.wav`), olay = path.join(sesDir, `${TUR}_olay.json`), miks = path.join(sesDir, `${TUR}_miks.wav`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=mono', '-t', String(Z.sure), sessiz]);
  const ev = [{ t: Z.kart, tip: 'swish', v: .7 }, { t: Z.tikAbone, tip: 'click' }, { t: Z.tikAbone + .05, tip: 'ding', v: .6 },
    { t: Z.tikZil, tip: 'click' }, { t: Z.menu + .45, tip: 'click' }, { t: Z.menu + .5, tip: 'bildirim', v: .8 }];
  fs.writeFileSync(olay, JSON.stringify({ sure: Z.sure, olaylar: ev }));
  execFileSync('python3', [path.join(__dirname, 'miks.py'), sessiz, olay, TUR, miks, '--lufs=-20'], { stdio: 'ignore' });
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
  const dosya = path.join(out, `kapanis_${TUR}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-i', miks, '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'slow', '-tune', 'animation', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', dosya], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0, n = Math.ceil(Z.sure * FPS); i < n; i++) {
    await p.evaluate(t => frame(t), i / FPS);
    ff.stdin.write(await p.screenshot({ type: 'jpeg', quality: 93 }));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close(); fs.unlinkSync(tmp);
  console.log('✔', dosya, `(${Z.sure} sn)`);
})();

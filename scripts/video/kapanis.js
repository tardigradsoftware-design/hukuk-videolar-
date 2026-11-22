// Kapanış (deneme): abone kartı; maskot yürüyüp ABONE düğmesine ve zile ELİYLE dokunur.
// node scripts/video/kapanis.js kisa|uzun  →  maskotlar/kapanis/kapanis_<tur>.mp4
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const D = require('../dosya/dosya');
const KOK = path.join(__dirname, '..', '..');
const TUR = process.argv[2] || 'uzun', KISA = TUR === 'kisa';

const KANAL = { ad: 'Haklarını Bil', alt: 'Hukuk rehberleri • Her gün yeni video' };
const W = KISA ? 720 : 1920, H = KISA ? 1280 : 1080, FPS = 30;
const MS = KISA ? 340 : 470;
// zaman çizelgesi (sn): yürü1 → abone dokunuşu → yürü2 → zil dokunuşu → el salla
const Z = KISA
  ? { sure: 3.0, kart: .05, mGir: .1, yuru1: null, abone: .6, yuru2: [.9, 1.25], zil: 1.55, salla: 2.0 }
  : { sure: 7.0, kart: .15, mGir: .35, yuru1: [.75, 1.3], abone: 1.65, yuru2: [2.0, 2.55], zil: 2.9, salla: 3.5 };
const UZAN = .3, BAS = .12, DON = .28;                 // dokunuş: uzan / bas / geri çek
const BUTON = KISA ? 'Takip et' : 'Abone ol', BUTON_OK = KISA ? 'Takip ediliyor' : 'Abone olundu';
const avatar = D.svg(D.poz({ ifade: 'emin' }), 'av').replace('viewBox="0 0 600 600"', 'viewBox="150 200 300 300"').replace(/width="600" height="600"/, 'width="100%" height="100%"');

// maskot zaman çizelgesi (mimik, el sallama, yürüme bacakları)
const MASK = {
  cues: [], kelimeler: [],
  ifade: [{ t: 0, ad: 'emin' }, { t: Z.abone, ad: 'mutlu' }],
  jest: [{ t: 0, ad: 'bekle' }, { t: Z.salla, ad: 'selam' }],
  yuru: [Z.yuru1, Z.yuru2].filter(Boolean).map(([t0, t1]) => ({ t0, t1 })),
};

const css = `*{box-sizing:border-box}html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#F4F4F2;font-family:'Inter','Inter Display',sans-serif}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,0,0,.06)),radial-gradient(#d4d4d4 1.6px,transparent 1.6px) 0 0/26px 26px}
#ust{position:absolute;left:0;right:0;top:${KISA ? 330 : 170}px;text-align:center;font-family:'Inter Display';font-weight:900;font-size:${KISA ? 50 : 64}px;line-height:1.08;color:#151515;letter-spacing:-.5px}
#ust span{color:#E8402F}
#kart{position:absolute;left:${KISA ? 30 : 330}px;top:${KISA ? 560 : 330}px;width:${KISA ? 470 : 940}px;background:#fff;border:4px solid #151515;border-radius:28px;box-shadow:8px 8px 0 #151515;padding:${KISA ? 28 : 36}px;display:flex;align-items:center;gap:${KISA ? 20 : 28}px}
.av{flex:none;width:${KISA ? 110 : 150}px;height:${KISA ? 110 : 150}px;border-radius:50%;background:#FBE3DF;border:4px solid #151515;overflow:hidden}
.bilgi{flex:1;min-width:0}.bilgi b{display:block;font-family:'Inter Display';font-weight:900;font-size:${KISA ? 36 : 48}px;color:#151515;line-height:1.05}
.bilgi span{display:block;margin-top:6px;font-weight:600;font-size:${KISA ? 17 : 24}px;color:#6b6b6b;${KISA ? '' : 'max-width:330px'}}
.btns{display:flex;align-items:center;gap:12px;${KISA ? 'margin-top:14px;justify-content:flex-end' : 'position:absolute;right:36px;top:50%;transform:translateY(-50%)'}}
.ab{height:${KISA ? 56 : 66}px;width:${KISA ? 196 : 258}px;justify-content:center;white-space:nowrap;padding:0;border-radius:999px;background:#151515;color:#fff;font-weight:800;font-size:${KISA ? 20 : 28}px;display:flex;align-items:center;gap:8px}
.ab.ok{background:#ececec;color:#151515}
.zil{width:${KISA ? 56 : 66}px;height:${KISA ? 56 : 66}px;border-radius:50%;background:#ececec;display:flex;align-items:center;justify-content:center}
.zil svg{width:55%;height:55%}
#bildirim{position:absolute;z-index:9;background:#151515;color:#fff;font-weight:800;font-size:${KISA ? 20 : 24}px;padding:12px 18px;border-radius:14px;white-space:nowrap;opacity:0}
#bildirim .em{font-family:'Noto Color Emoji'}
.dalga{position:absolute;width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:50%;border:4px solid #E8402F;opacity:0;z-index:8}
.sv{position:absolute;border:4px dashed #b9b9b9;border-radius:22px;display:flex;align-items:flex-end;padding:18px 22px;font-weight:800;font-size:22px;color:#9a9a9a;letter-spacing:1px}
#stage{position:absolute;width:${MS}px;height:${MS}px;z-index:5}#stage svg{overflow:visible}`;

const ZIL = dolu => `<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6z" fill="${dolu ? '#151515' : 'none'}" stroke="#151515" stroke-width="2" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="#151515" stroke-width="2"/></svg>`;
const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>${css}</style></head><body><div id="bg"></div>
<div id="ust">${KISA ? 'Haklarını kaçırma,<br><span>takipte kal</span>' : 'Bir sonraki rehberde <span>görüşmek üzere</span>'}</div>
${KISA ? '' : `<div class="sv" style="left:330px;top:640px;width:400px;height:225px">SIRADAKİ VİDEO</div><div class="sv" style="left:770px;top:640px;width:400px;height:225px">ÖNERİLEN</div>`}
<div id="kart"><div class="av">${avatar}</div><div class="bilgi"><b>${KANAL.ad}</b><span>${KANAL.alt}</span>
<div class="btns"><div class="ab" id="ab">${BUTON}</div><div class="zil" id="zil">${ZIL(false)}</div></div></div></div>
<div id="bildirim"><span class="em">🔔</span> Bildirimler açık</div>
<div class="dalga" id="d1"></div><div class="dalga" id="d2"></div><div id="stage"></div>
<script>${fs.readFileSync(path.join(__dirname, '..', 'dosya', 'dosya.js'), 'utf8')}</script>
<script>
const Z=${JSON.stringify(Z)}, MASK=${JSON.stringify(MASK)}, MS=${MS}, UZAN=${UZAN}, BAS=${BAS}, DON=${DON};
const ZILD=${JSON.stringify(ZIL(true))}, ZILB=${JSON.stringify(ZIL(false))}, BOK=${JSON.stringify(BUTON_OK)}, BTX=${JSON.stringify(BUTON)};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)), io=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2, out=k=>1-Math.pow(1-k,3);
const ab=document.getElementById('ab'), zil=document.getElementById('zil'), kart=document.getElementById('kart'), bil=document.getElementById('bildirim'), stage=document.getElementById('stage');
const mrk = el => { const r=el.getBoundingClientRect(); return [r.left+r.width*(el===ab?.32:.5), r.top+r.height*.5]; };
const P_AB=mrk(ab), P_ZIL=mrk(zil);
const zr=zil.getBoundingClientRect(), br=bil.getBoundingClientRect(); bil.style.left=(zr.right-br.width)+'px'; bil.style.top=(kart.getBoundingClientRect().top-br.height-14)+'px';
// sol el, hedefe şu rig vektörüyle uzanır (omuzdan sol-yukarı): böylece gövde düğmenin sağında durur
const SOL_OMUZ=[124,318], REACH=[-98,-36];
const durusX = P => P[0] - MS*(SOL_OMUZ[0]+REACH[0])/600;   // maskot sahnesinin sol kenarı
const durusY = P => P[1] - MS*(SOL_OMUZ[1]+REACH[1]+40)/600;
const X_AB=durusX(P_AB), X_ZIL=durusX(P_ZIL), Y0=durusY(P_AB);
function mX(t){
  if (Z.yuru1){ if (t<Z.yuru1[0]) return X_ZIL+MS*.25; if (t<Z.yuru1[1]) return X_ZIL+MS*.25+(X_AB-X_ZIL-MS*.25)*io((t-Z.yuru1[0])/(Z.yuru1[1]-Z.yuru1[0])); }
  if (t<Z.yuru2[0]) return X_AB; if (t<Z.yuru2[1]) return X_AB+(X_ZIL-X_AB)*io((t-Z.yuru2[0])/(Z.yuru2[1]-Z.yuru2[0])); return X_ZIL;
}
// dokunuş: hedefe uzan, bas, geri çek → 0..1 (1 = hedefte)
const dokun = (t,T) => t<T-UZAN||t>T+BAS+DON ? 0 : t<T ? io((t-T+UZAN)/UZAN) : t<T+BAS ? 1 : 1-io((t-T-BAS)/DON);
function frame(t){
  const kk=out(cl((t-Z.kart)/.5,0,1)); kart.style.opacity=kk; kart.style.transform='translateY('+((1-kk)*40)+'px)';
  const U=document.getElementById('ust'), uk=out(cl((t-Z.kart-.15)/.5,0,1)); U.style.opacity=uk; U.style.transform='translateY('+((1-uk)*-20)+'px)';
  document.querySelectorAll('.sv').forEach((s,i)=>{ s.style.opacity=out(cl((t-.4-i*.15)/.5,0,1)); });
  // maskot
  const s=Dosya.stateAt(MASK,t), x=mX(t), y=Y0;
  stage.style.left=x+'px'; stage.style.top=y+'px'; stage.style.opacity=cl((t-Z.mGir)/.3,0,1);
  const toRig=P=>[(P[0]-x)*600/MS, (P[1]-y)*600/MS-40-(s.bob||0)+(s.jump||0)];
  for (const [T,P] of [[Z.abone,P_AB],[Z.zil,P_ZIL]]) {
    const k=dokun(t,T); if (k<=0) continue;
    const nat=Dosya.elKonum(s.armL,'l'), hd=toRig(P), q=[nat[0]+(hd[0]-nat[0])*k, nat[1]+(hd[1]-nat[1])*k];
    s.armL=Dosya.kolIK(q[0],q[1],'acik','l'); s.look=[-.8,-.2]; s.lean=-2*k;
  }
  stage.innerHTML=Dosya.svg(s,'m',MS,MS);
  // düğmeler
  const basildi=t>=Z.abone;
  ab.classList.toggle('ok',basildi); ab.innerHTML=basildi?'✓ '+BOK:BTX;
  ab.style.transform=(t>=Z.abone&&t<Z.abone+BAS)?'scale(.94)':'none';
  zil.innerHTML=t>=Z.zil?ZILD:ZILB;
  zil.style.transform=(t>=Z.zil&&t<Z.zil+BAS)?'scale(.9)':'none';
  const sal=t>=Z.zil&&t<Z.zil+.8?Math.sin((t-Z.zil)*28)*14*(1-(t-Z.zil)/.8):0; zil.firstElementChild.style.transform='rotate('+sal+'deg)';
  const bk=cl((t-Z.zil-.05)/.2,0,1)*(1-cl((t-Z.zil-1.6)/.3,0,1)); bil.style.opacity=bk; bil.style.transform='translateY('+((1-bk)*12)+'px)';
  [[Z.abone,P_AB,'d1'],[Z.zil,P_ZIL,'d2']].forEach(([T,P,id])=>{ const d=document.getElementById(id), k=(t-T)/.45; d.style.opacity=k>=0&&k<1?1-k:0; d.style.left=P[0]+'px'; d.style.top=P[1]+'px'; d.style.transform='scale('+(.4+cl(k,0,1)*1.1)+')'; });
}
</script></body></html>`;

(async () => {
  const out = path.join(KOK, 'maskotlar', 'kapanis'); fs.mkdirSync(out, { recursive: true });
  const tmp = path.join(out, `.k_${TUR}.html`); fs.writeFileSync(tmp, html);
  const sesDir = path.join(out, '.ses'); fs.mkdirSync(sesDir, { recursive: true });
  const sessiz = path.join(sesDir, `${TUR}_sessiz.wav`), olay = path.join(sesDir, `${TUR}_olay.json`), miks = path.join(sesDir, `${TUR}_miks.wav`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=mono', '-t', String(Z.sure), sessiz]);
  const ev = [{ t: Z.kart, tip: 'swish', v: .7 }, { t: Z.abone, tip: 'click' }, { t: Z.abone + .05, tip: 'ding', v: .6 },
    { t: Z.zil, tip: 'click' }, { t: Z.zil + .05, tip: 'bildirim', v: .8 }];
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

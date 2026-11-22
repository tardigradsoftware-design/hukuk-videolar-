// Zaman çizelgesinden MP4 üretir (720x1280, 30 fps)
// node scripts/dosya/render.js zaman.json cikti.mp4
const fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const { chromium } = require('playwright');

const [, , tlPath, outPath] = process.argv;
const tl = JSON.parse(fs.readFileSync(tlPath, 'utf8'));
const W = 720, H = 1280, FPS = 30;

const page = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><style>
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#F4F4F2;font-family:'Arial Black',Arial,sans-serif}
#bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,transparent 55%,rgba(0,0,0,.06)),radial-gradient(#d4d4d4 1.6px,transparent 1.6px) 0 0/24px 24px}
#title{position:absolute;top:120px;left:56px;right:56px;font-weight:900;font-size:64px;line-height:1.02;color:#151515;text-transform:uppercase}
#title em{display:block;font-style:normal;color:#E8402F}
#stage{position:absolute;left:0;top:300px;width:720px;height:720px}
#sub{position:absolute;left:0;right:0;top:1040px;text-align:center}
#sub span{display:inline-block;margin:0 6px;padding:6px 16px;font-weight:900;font-size:40px;border-radius:10px;text-transform:uppercase}
#sub .on{background:#E8402F;color:#fff;box-shadow:4px 4px 0 #151515}#sub .off{color:#b9b9b9;background:#fff}
</style></head><body><div id="bg"></div><div id="title"></div><div id="stage"></div><div id="sub"></div>
<script>${fs.readFileSync(path.join(__dirname, 'dosya.js'), 'utf8')}</script>
<script>
const TL = ${JSON.stringify(tl)};
function frame(t){
  document.getElementById('stage').innerHTML = Dosya.svg(Dosya.stateAt(TL, t), "f", 720, 720);
  const tt = (TL.baslik||[]).filter(b=>b.t<=t).pop();
  document.getElementById('title').innerHTML = tt ? tt.ust + '<em>' + tt.alt + '</em>' : '';
  // altyazı: o anki kelime vurgulu, yanındaki kelime soluk
  const w = (TL.kelimeler||[]).findIndex(k => t>=k.t0 && t<k.t1);
  const sub = document.getElementById('sub');
  if (w<0) { sub.innerHTML=''; return; }
  const pair = w % 2 === 0 ? [w, w+1] : [w-1, w];
  sub.innerHTML = pair.filter(i=>TL.kelimeler[i]).map(i=>'<span class="'+(i===w?'on':'off')+'">'+TL.kelimeler[i].k+'</span>').join('');
}
</script></body></html>`;

(async () => {
  const tmp = path.join(path.dirname(outPath), '.render.html');
  fs.writeFileSync(tmp, page);
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + path.resolve(tmp));
  const args = ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-'];
  if (tl.audio) args.push('-i', tl.audio);
  args.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium');
  if (tl.audio) args.push('-c:a', 'aac', '-b:a', '160k', '-shortest');
  args.push(outPath);
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.ceil(tl.duration * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => frame(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) process.stderr.write(`\r${i}/${n} kare`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  fs.unlinkSync(tmp);
  console.error(`\n${outPath} hazır (${tl.duration.toFixed(1)} sn)`);
})();

// Remotion kompozisyonunu şeffaf PNG kare dizisine render eder (v5'e gömülür).
// node scripts/video/remotion_render.mjs <Comp> '<propsJSON>' <cikisKlasoru> [kareSayisi]
import { bundle } from '@remotion/bundler';
import { selectComposition, renderFrames } from '@remotion/renderer';
import path from 'node:path'; import fs from 'node:fs';
const [, , id, props = '{}', out, n] = process.argv;
const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const cache = path.join(KOK, 'veri', 'remotion', '.bundle');
let serveUrl = cache;
if (!fs.existsSync(path.join(cache, 'index.html')) || fs.statSync(path.join(KOK, 'remotion', 'index.jsx')).mtimeMs > fs.statSync(path.join(cache, 'index.html')).mtimeMs)
  serveUrl = await bundle({ entryPoint: path.join(KOK, 'remotion', 'index.jsx'), outDir: cache });
const inputProps = JSON.parse(props), browserExecutable = '/opt/pw-browsers/chromium_headless_shell';
const comp = await selectComposition({ serveUrl, id, inputProps, browserExecutable });
if (n) comp.durationInFrames = +n;
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
await renderFrames({ composition: comp, serveUrl, inputProps, imageFormat: 'png', outputDir: out, browserExecutable, onStart: () => {}, onFrameUpdate: () => {}, chromiumOptions: { gl: 'swangle' } });
console.log(JSON.stringify({ kare: fs.readdirSync(out).filter(f => f.endsWith('.png')).length, w: comp.width, h: comp.height }));

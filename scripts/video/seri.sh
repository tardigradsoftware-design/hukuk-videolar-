#!/bin/bash
# Seri üretim: bash scripts/video/seri.sh VID_004 VID_005 ...   (başlık/kapak: veri/seri.json)
cd "$(dirname "$0")/../.."
for ID in "$@"; do
  node -e "
const S=require('./veri/seri.json')['$ID']||{};const {execFileSync:x}=require('child_process');
for (const [t,key] of [['kisa','k'],['uzun','u']]) { if (t==='kisa' && !S.k) continue;
  x('node',['scripts/video/planla.js','$ID',t,'--uzerine']);
  if (S[key]) x('node',['scripts/video/baslik.js','$ID',t,...S[key]]); }
if (S.kp) { x('node',['scripts/video/kapak_yaz.js','$ID',...S.kp]); x('node',['scripts/video/kapak.js','$ID']); }"
  if node -e "process.exit(require('./veri/seri.json')['$ID'].k?0:1)"; then node scripts/video/uret.js $ID kisa 2>&1 | tr '\r' '\n' | grep -A6 "KONTROL" | grep -v "görseli\|^$"; fi
  node scripts/video/uret.js $ID uzun 2>&1 | tr '\r' '\n' | grep -A6 "KONTROL" | grep -v "görseli\|^$"
done

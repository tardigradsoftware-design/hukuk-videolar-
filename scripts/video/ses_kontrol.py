#!/usr/bin/env python3
"""Ses dosyası metnin tamamını içeriyor mu? (hece oranı)  python3 ses_kontrol.py VID_XXX"""
import csv, subprocess, sys
import numpy as np
ID = sys.argv[1]; V = set('aeıioöuüâîûAEIİOÖUÜ')
r = [x for x in csv.DictReader(open('veri/senaryolar.csv', encoding='utf-8-sig')) if x['video id'] == ID][0]
for ad, col in [('short', 'shorts video tts'), ('uzun', 'uzun video tts')]:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'veri/ses_ham/{ID}_{ad}.mp3', '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768; n = 160; fr = len(x) // n
    e = np.convolve(np.sqrt((x[:fr * n].reshape(fr, n) ** 2).mean(1)), np.ones(7) / 7, 'same'); e /= np.percentile(e, 95)
    pk = [i for i in range(1, fr - 1) if e[i] > e[i - 1] and e[i] >= e[i + 1] and e[i] > .25]
    p2 = [];
    for i in pk:
        if not p2 or i - p2[-1] > 8: p2.append(i)
    oran = len(p2) / max(1, sum(c in V for c in r[col]))
    print(f'{ID} {ad}: {len(x)/16000:.1f} sn, hece oranı {oran:.2f} ' + ('OK' if .55 <= oran <= .9 else '⚠ KONTROL ET (kesik/yanlış olabilir)'))

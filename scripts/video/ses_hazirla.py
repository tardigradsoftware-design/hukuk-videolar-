#!/usr/bin/env python3
"""Ham sesi videoya hazırlar: hız + ses seviyesi.

kisa: tamamı 1.25x hızda.
uzun: hook (giriş) kısmı 1.25x, "Birinci adım" ile başlayan ana içerik 1.00x.
      Hook bitişi metinden bulunur ve sesteki en yakın duraklamaya oturtulur.
Ses -14 LUFS'a normalize edilir (YouTube standardı). Ton değişmez (atempo).

Kullanım: python3 ses_hazirla.py ham.mp3 "metin" kisa|uzun cikti.wav  → JSON (stdout)
"""
import json, re, subprocess, sys
import numpy as np

HIZ = 1.25        # kısa: tamamı; uzun: hook
HIZ_ANA = 1.00    # uzun: hook sonrası
SR = 48000
V = set('aeıioöuüâîûAEIİOÖUÜÂÎÛ')


def sure(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                capture_output=True, text=True, check=True).stdout)


def sessizlikler(p):
    out = subprocess.run(['ffmpeg', '-i', p, '-af', 'silencedetect=n=-35dB:d=0.12', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    birlesik = []
    for a, b in zip(st, en):  # aradaki nefes/klik (<0.2 sn) ile bölünmüş duraklamaları birleştir
        if birlesik and a - birlesik[-1][1] < 0.2: birlesik[-1][1] = b
        else: birlesik.append([a, b])
    return birlesik


def hook_kelime(metin):
    """Hook'tan sonraki ilk kelimenin sırası: 'Birinci/İlk adım' veya '1.' ile başlayan ilk cümle."""
    words = metin.split()
    for i, w in enumerate(words):
        prev_end = i == 0 or re.search(r'[.!?…:]["”\']?$', words[i - 1])
        if prev_end and re.match(r'^(Birinci|İlk|1\.|Öncelikle)', w):
            return i
    # bulunamazsa: ilk 3 cümle hook kabul edilir
    n = 0
    for i, w in enumerate(words):
        if re.search(r'[.!?…]$', w):
            n += 1
            if n == 3: return i + 1
    return 0


def main():
    ham, metin, tur, cikti = sys.argv[1:5]
    T = sure(ham)
    norm = 'loudnorm=I=-14:TP=-1.5:LRA=11'
    info = {'ham_sure': round(T, 3), 'tur': tur}
    if tur == 'kisa':
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', ham, '-af', f'atempo={HIZ},{norm}', '-ar', str(SR), '-ac', '1', cikti], check=True)
        info.update(hook_kelime=None, kesim_ham=None, kesim=None)
    else:
        k = hook_kelime(metin)
        words = metin.split()
        hece = lambda ws: sum(c in V for c in ' '.join(ws))
        tahmin = T * hece(words[:k]) / max(1, hece(words))
        adaylar = [((s + e) / 2, abs((s + e) / 2 - tahmin)) for s, e in sessizlikler(ham)]
        yakin = [a for a in adaylar if a[1] < 3.0]
        kesim = min(yakin, key=lambda a: a[1])[0] if yakin else tahmin
        f = (f'[0:a]atrim=0:{kesim:.3f},asetpts=PTS-STARTPTS,atempo={HIZ}[a];'
             f'[0:a]atrim={kesim:.3f},asetpts=PTS-STARTPTS,atempo={HIZ_ANA}[b];[a][b]concat=n=2:v=0:a=1,{norm}[o]')
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', ham, '-filter_complex', f, '-map', '[o]', '-ar', str(SR), '-ac', '1', cikti], check=True)
        info.update(hook_kelime=k, hook_metin=' '.join(words[:k])[-80:], kesim_ham=round(kesim, 3),
                    kesim=round(kesim / HIZ, 3), tahmin_ham=round(tahmin, 3))
    info['sure'] = round(sure(cikti), 3)
    print(json.dumps(info, ensure_ascii=False))


if __name__ == '__main__':
    main()

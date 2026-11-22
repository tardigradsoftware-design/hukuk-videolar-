#!/usr/bin/env python3
"""Türkçe dudak senkronu: ses + metin -> ağız şekli zamanlaması (JSON).

Kullanım:  python3 dudak.py ses.wav "Konuşmanın metni" > cues.json
Metin verilmezse yalnızca sesin şiddetine göre ağız açıp kapatır.

Yöntem: Türkçe yazıldığı gibi okunur, bu yüzden her harf doğrudan bir ağız
şekline (viseme) çevrilir. Sesteki konuşma bölümleri (sessizlikler hariç)
bulunur, harfler tipik sürelerine göre bu bölümlere dağıtılır. Ağzın ne kadar
açılacağı da sesin anlık şiddetinden (zarf/envelope) alınır.
"""
import json, re, subprocess, sys
import numpy as np

SR = 16000
HOP = 0.01  # 10 ms

VIS = {}
for ch in 'a': VIS[ch] = ('A', 1.0)
for ch in 'e': VIS[ch] = ('E', 1.0)
for ch in 'ıi': VIS[ch] = ('I', .9)
for ch in 'oö': VIS[ch] = ('O', 1.0)
for ch in 'uü': VIS[ch] = ('U', .9)
for ch in 'mbp': VIS[ch] = ('P', .8)
for ch in 'fv': VIS[ch] = ('F', .7)
for ch in 'l': VIS[ch] = ('L', .65)
for ch in 'szşcçjtdnkghyr': VIS[ch] = ('K', .6)
VIS['ğ'] = (None, .45)  # önceki ünlüyü uzatır


def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0


def envelope(x):
    n = int(SR * HOP)
    frames = len(x) // n
    rms = np.sqrt(np.mean(x[:frames * n].reshape(frames, n) ** 2, axis=1) + 1e-12)
    ref = np.percentile(rms, 95) or 1.0
    env = np.clip(rms / ref, 0, 1.2)
    k = np.ones(5) / 5
    return np.convolve(env, k, mode='same')


def voiced_segments(env, thr=.12, gap=.12, minlen=.06):
    on = env > thr
    segs, start = [], None
    for i, v in enumerate(on):
        if v and start is None: start = i
        if not v and start is not None: segs.append([start * HOP, i * HOP]); start = None
    if start is not None: segs.append([start * HOP, len(on) * HOP])
    merged = []
    for s in segs:
        if merged and s[0] - merged[-1][1] < gap: merged[-1][1] = s[1]
        else: merged.append(s)
    return [s for s in merged if s[1] - s[0] >= minlen]


def tr_lower(t):
    return t.replace('İ', 'i').replace('I', 'ı').lower()


def phonemes(text):
    out = []
    for ch in tr_lower(text):
        if ch in VIS:
            v, w = VIS[ch]
            if v is None:
                if out: out[-1][1] += w
                continue
            out.append([v, w])
        elif ch in 'âîû':
            out.append([{'â': 'A', 'î': 'I', 'û': 'U'}[ch], 1.0])
    return out


def distribute(ph, segs):
    """Harfleri konuşma bölümlerine ağırlıklarına göre yayar."""
    total = sum(e - s for s, e in segs)
    W = sum(w for _, w in ph) or 1
    cues, si, pos = [], 0, segs[0][0]
    for v, w in ph:
        d = w / W * total
        while d > 1e-6 and si < len(segs):
            s, e = segs[si]
            take = min(d, e - pos)
            cues.append((pos, v))
            pos += take; d -= take
            if pos >= e - 1e-6:
                cues.append((e, 'X')); si += 1
                if si < len(segs): pos = segs[si][0]
    return cues


def align(text, segs):
    # Cümle/virgül sayısı sessizlik sayısıyla uyuşuyorsa parça parça hizala (daha isabetli)
    phrases = [p for p in re.split(r'[,.!?;:…]+', text) if phonemes(p)]
    if text and len(phrases) == len(segs) and len(segs) > 1:
        cues = []
        for p, s in zip(phrases, segs): cues += distribute(phonemes(p), [s])
        return cues
    return distribute(phonemes(text), segs)


def amp_only(env, segs):
    cues = [(0.0, 'X')]
    for s, e in segs:
        t = s
        while t < e:
            a = env[min(len(env) - 1, int(t / HOP))]
            cues.append((t, 'A' if a > .75 else 'E' if a > .5 else 'K' if a > .25 else 'P'))
            t += .09
        cues.append((e, 'X'))
    return cues


def main():
    path = sys.argv[1]
    text = sys.argv[2] if len(sys.argv) > 2 else ''
    x = load(path)
    env = envelope(x)
    segs = voiced_segments(env)
    if not segs: cues = [(0.0, 'X')]
    elif text.strip(): cues = [(0.0, 'X')] + align(text, segs)
    else: cues = amp_only(env, segs)
    # aynı şekli birleştir, P (dudak kapanışı) en az 40 ms görünsün
    clean = []
    for t, v in sorted(cues, key=lambda c: c[0]):
        if clean and clean[-1]['v'] == v: continue
        if clean and abs(clean[-1]['t'] - t) < 1e-4: clean[-1]['v'] = v; continue
        clean.append({'t': round(t, 3), 'v': v})
    json.dump({'duration': round(len(x) / SR, 3), 'cues': clean,
               'env': {'rate': int(1 / HOP), 'values': [round(float(v), 3) for v in env]}}, sys.stdout)


if __name__ == '__main__':
    main()

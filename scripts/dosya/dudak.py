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


def phonemes(text, word_base=0):
    out = []
    wi = word_base - 1
    prev_space = True
    for ch in tr_lower(text):
        if ch.isspace():
            prev_space = True
            continue
        if prev_space:
            wi += 1
            prev_space = False
        if ch in VIS:
            v, w = VIS[ch]
            if v is None:
                if out: out[-1][1] += w
                continue
            out.append([v, w, wi])
        elif ch in 'âîû':
            out.append([{'â': 'A', 'î': 'I', 'û': 'U'}[ch], 1.0, wi])
    return out


def distribute(ph, segs):
    """Harfleri konuşma bölümlerine ağırlıklarına göre yayar."""
    total = sum(e - s for s, e in segs)
    W = sum(p[1] for p in ph) or 1
    cues, si, pos = [], 0, segs[0][0]
    for v, w, wi in ph:
        d = w / W * total
        while d > 1e-6 and si < len(segs):
            s, e = segs[si]
            take = min(d, e - pos)
            cues.append((pos, v, wi))
            pos += take; d -= take
            if pos >= e - 1e-6:
                cues.append((e, 'X', None)); si += 1
                if si < len(segs): pos = segs[si][0]
    return cues


def align(text, segs):
    """Çapa (anchor) yöntemi: noktalama sonrası duraklamalar sesteki sessizliklerle
    eşleştirilir; aradaki harfler o parçanın konuşma süresine yayılır. Böylece uzun
    seslerde bile kayma birikmez."""
    words = text.split()
    ph = phonemes(text)
    if not ph: return []
    W = sum(p[1] for p in ph)
    cum, c = {}, 0
    for v, w, wi in ph:
        c += w; cum[wi] = c
    bounds = [(wi, cum[wi] / W, 2 if re.search(r'[.!?…]["”\']?$', words[wi]) else 1)
              for wi in range(len(words) - 1) if wi in cum and re.search(r'[,.!?;:…]["”\']?$', words[wi])]
    lens = [e - s for s, e in segs]
    D = sum(lens)
    E, acc = [], 0
    for L in lens:
        acc += L; E.append(acc)
    anchors, last_k, last_E, last_f = [], -1, 0.0, 0.0
    for wi, frac, strength in bounds:
        if last_k >= len(segs) - 2: break
        target = last_E + (frac - last_f) / max(1e-6, 1 - last_f) * (D - last_E)
        cands = [(abs(E[k] - target), k) for k in range(last_k + 1, len(segs) - 1)]
        if not cands: break
        d, k = min(cands)
        if d < (0.9 if strength == 2 else 0.45):
            anchors.append((wi, k)); last_k, last_E, last_f = k, E[k], frac
    cues, w0, k0 = [], 0, 0
    for wi, k in anchors + [(len(words) - 1, len(segs) - 1)]:
        sub = [p for p in ph if w0 <= p[2] <= wi]
        if sub: cues += distribute(sub, segs[k0:k + 1])
        w0, k0 = wi + 1, k + 1
    return cues


def amp_only(env, segs):
    cues = [(0.0, 'X', None)]
    for s, e in segs:
        t = s
        while t < e:
            a = env[min(len(env) - 1, int(t / HOP))]
            cues.append((t, 'A' if a > .75 else 'E' if a > .5 else 'K' if a > .25 else 'P', None))
            t += .09
        cues.append((e, 'X', None))
    return cues


def main():
    path = sys.argv[1]
    text = sys.argv[2] if len(sys.argv) > 2 else ''
    x = load(path)
    env = envelope(x)
    segs = voiced_segments(env)
    if not segs: cues = [(0.0, 'X', None)]
    elif text.strip(): cues = [(0.0, 'X', None)] + align(text, segs)
    else: cues = amp_only(env, segs)
    # aynı şekli birleştir, P (dudak kapanışı) en az 40 ms görünsün
    # kelime zamanları
    words = text.split()
    wt = {}
    for t, v, wi in cues:
        if wi is None: continue
        a = wt.setdefault(wi, [t, t])
        a[0] = min(a[0], t); a[1] = max(a[1], t)
    starts = sorted(wt)
    wlist = []
    for k, wi in enumerate(starts):
        nxt = [t for t, v, w2 in cues if t > wt[wi][1] and (w2 != wi)]
        end = nxt[0] if nxt else wt[wi][1] + .2
        if wi < len(words): wlist.append({'w': words[wi], 't0': round(wt[wi][0], 3), 't1': round(end, 3)})
    clean = []
    for t, v, _ in sorted(cues, key=lambda c: c[0]):
        if clean and clean[-1]['v'] == v: continue
        if clean and abs(clean[-1]['t'] - t) < 1e-4: clean[-1]['v'] = v; continue
        clean.append({'t': round(t, 3), 'v': v})
    json.dump({'duration': round(len(x) / SR, 3), 'cues': clean, 'words': wlist,
               'env': {'rate': int(1 / HOP), 'values': [round(float(v), 3) for v in env]}}, sys.stdout)


if __name__ == '__main__':
    main()

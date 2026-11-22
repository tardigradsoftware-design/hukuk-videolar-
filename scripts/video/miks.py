#!/usr/bin/env python3
"""Ses miksajı: seslendirme + sentezlenmiş ses efektleri (fon müziği kapalı; --muzik ile açılır).

Tüm efektler ve müzik kodla üretilir (telifsiz). Müzik konuşma sırasında kısılır (ducking).
Kullanım: python3 miks.py ses.wav olaylar.json kisa|uzun cikti.wav
olaylar.json: {"sure": 17.4, "olaylar": [{"t": 1.2, "tip": "pop"}, ...]}
"""
import json, subprocess, sys
import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0


def env(n, a=0.002, d=0.1):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
    return e


def tone(f0, f1, dur, wave='sine'):
    n = int(dur * SR); t = np.arange(n) / SR
    f = np.linspace(f0, f1, n)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) if wave == 'sine' else np.sign(np.sin(ph)) * .5 + np.sin(ph) * .5


def noise(dur):
    return rng.standard_normal(int(dur * SR)).astype(np.float32)


def lp(x, k):  # basit alçak geçiren
    if k <= 1: return x
    return np.convolve(x, np.ones(k) / k, mode='same')


def bp(x, lo, hi):
    return lp(x, max(1, int(SR / hi))) - lp(x, max(1, int(SR / lo)))


# ---------------- EFEKTLER ----------------
def fx_pop():
    d = .09; return tone(900, 320, d) * env(int(d * SR), .001, .03) * .9
def fx_tik():
    d = .05; return tone(1500, 900, d) * env(int(d * SR), .0005, .012) * .5
def fx_whoosh():
    d = .42; n = noise(d); e = np.sin(np.linspace(0, np.pi, len(n))) ** 2
    sw = np.concatenate([bp(n[:len(n)//2], 300, 1200), bp(n[len(n)//2:], 900, 4000)])
    return sw * e * 1.4
def fx_swish():
    d = .22; n = noise(d); e = np.sin(np.linspace(0, np.pi, len(n))) ** 3
    return bp(n, 1500, 6000) * e * .9
def fx_key():
    d = .035; n = bp(noise(d), 1800, 7000) * env(int(d * SR), .0003, .006)
    body = tone(rng.uniform(180, 260), 120, d) * env(int(d * SR), .0005, .01) * .5
    return (n * 1.2 + body) * rng.uniform(.6, 1.0)
def fx_click():
    d = .06; a = bp(noise(d), 2000, 8000) * env(int(d * SR), .0002, .004)
    b = tone(2400, 1800, d) * env(int(d * SR), .0002, .008) * .4
    return a * 1.5 + b
def fx_thud():
    d = .35; k = tone(140, 45, d) * env(int(d * SR), .001, .09)
    s = lp(noise(d), 8) * env(int(d * SR), .001, .03) * .6
    return (k + s) * 1.1
def fx_ding():
    d = .9; t = np.arange(int(d * SR)) / SR
    x = (np.sin(2 * np.pi * 1318.5 * t) + .5 * np.sin(2 * np.pi * 1975.5 * t) + .25 * np.sin(2 * np.pi * 2637 * t))
    x2 = np.concatenate([np.zeros(int(.08 * SR)), x[:-int(.08 * SR)] * 0]) if False else 0
    return x * env(len(t), .002, .25) * .35
def fx_boing():
    d = .3; return tone(220, 520, d) * env(int(d * SR), .005, .12) * .45
def fx_bildirim():
    a = fx_ding()[:int(.3 * SR)] * .8
    t = np.arange(int(.45 * SR)) / SR
    b = np.sin(2 * np.pi * 1760 * t) * env(len(t), .002, .15) * .3
    out = np.zeros(int(.6 * SR)); out[:len(a)] += a; out[int(.12 * SR):int(.12 * SR) + len(b)] += b
    return out

FX = {'pop': fx_pop, 'tik': fx_tik, 'whoosh': fx_whoosh, 'swish': fx_swish, 'key': fx_key, 'click': fx_click,
      'thud': fx_thud, 'ding': fx_ding, 'boing': fx_boing, 'bildirim': fx_bildirim}
SEV = {'pop': .30, 'tik': .22, 'whoosh': .20, 'swish': .14, 'key': .16, 'click': .30, 'thud': .45, 'ding': .25, 'boing': .2, 'bildirim': .3}


# ---------------- MÜZİK (telifsiz, sentez) ----------------
def muzik(dur, bpm):
    n = int(dur * SR); out = np.zeros(n, np.float32)
    beat = 60 / bpm
    # Am - F - C - G (her akor 1 ölçü = 4 vuruş)
    chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
    hz = lambda m: 440 * 2 ** ((m - 69) / 12)
    bar = 4 * beat
    t = 0.0; i = 0
    while t < dur:
        ch = chords[i % 4]
        L = int(bar * SR); tt = np.arange(L) / SR
        pad = sum(np.sin(2 * np.pi * hz(m) * tt) + .3 * np.sin(2 * np.pi * hz(m) * 2 * tt) for m in ch)
        pad *= np.minimum(1, tt / .3) * np.minimum(1, (bar - tt) / .3) * .07
        # arpej
        for s in range(8):
            m = ch[s % 3] + 12
            st = int((s * beat / 2) * SR); ln = int(beat / 2 * SR)
            if st + ln > L: break
            ta = np.arange(ln) / SR
            pad[st:st + ln] += np.sin(2 * np.pi * hz(m) * ta) * np.exp(-ta / .12) * .05
        # bas
        bas = np.sin(2 * np.pi * hz(ch[0] - 12) * tt) * .09 * np.minimum(1, tt / .02)
        seg = pad + bas
        # davul: kick 1&3, hat her yarım vuruş
        for b in range(4):
            st = int(b * beat * SR)
            if b in (0, 2):
                k = tone(120, 45, .25) * env(int(.25 * SR), .001, .07) * .35
                seg[st:st + len(k)] += k[:max(0, L - st)]
            for h in (0, .5):
                sh = int((b + h) * beat * SR)
                hh = bp(noise(.04), 6000, 12000) * env(int(.04 * SR), .0005, .01) * .08
                seg[sh:sh + len(hh)] += hh[:max(0, L - sh)]
        a = int(t * SR); e = min(n, a + L)
        out[a:e] += seg[:e - a]
        t += bar; i += 1
    # giriş/çıkış yumuşatma
    f = int(.8 * SR); out[:f] *= np.linspace(0, 1, f); out[-f:] *= np.linspace(1, 0, f)
    return out


def main():
    ses_p, olay_p, tur, cikti = sys.argv[1:5]
    o = json.load(open(olay_p))
    dur = o['sure']; n = int(dur * SR)
    voice = load(ses_p)[:n]
    mix = np.zeros(n, np.float32); mix[:len(voice)] += voice
    sfx = np.zeros(n, np.float32)
    cache = {}
    for ev in o['olaylar']:
        tip = ev['tip']
        if tip not in FX: continue
        x = FX[tip]() if tip == 'key' else cache.setdefault(tip, FX[tip]())
        a = int(ev['t'] * SR)
        if a < 0 or a >= n: continue
        e = min(n, a + len(x))
        sfx[a:e] += x[:e - a] * SEV[tip] * ev.get('v', 1)
    mix += sfx
    if '--muzik' in sys.argv:  # fon müziği varsayılan olarak KAPALI
        m = muzik(dur, 112 if tur == 'kisa' else 92)
        k = int(.05 * SR)
        ve = np.sqrt(np.convolve(np.pad(voice, (0, n - len(voice))) ** 2, np.ones(k) / k, mode='same'))
        ve = np.convolve(ve, np.ones(int(.3 * SR)) / int(.3 * SR), mode='same')
        duck = 1 - .6 * np.clip(ve / (np.percentile(ve, 90) + 1e-6), 0, 1)
        mix += m * duck * (.55 if tur == 'kisa' else .42)
    mix = np.tanh(mix * 1.0)  # yumuşak sınırlayıcı
    pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes()
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', str(SR), cikti], input=pcm, check=True)


if __name__ == '__main__':
    main()

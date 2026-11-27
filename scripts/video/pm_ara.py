#!/usr/bin/env python3
# prompt-motion.com'dan destek: dizinde ara, seçilen girişin promptunu canlı siteden oku.
#   python3 scripts/video/pm_ara.py ara "kinetik yazı" telefon     → eşleşen girişler (ad, url, etiket, teknik)
#   python3 scripts/video/pm_ara.py oku <slug|url>                  → girişin tam promptu (siteden)
#   python3 scripts/video/pm_ara.py yenile                          → dizine sitedeki yeni girişleri ekle
import sys, json, re, subprocess, os
KOK = os.path.join(os.path.dirname(__file__), '..', '..'); DZ = os.path.join(KOK, 'kutuphane', 'prompt_motion_dizin.json')
al = lambda u: subprocess.run(['curl', '-sL', '-m', '30', u], capture_output=True).stdout.decode('utf-8', 'ignore')
rsc = lambda h: ''.join(re.findall(r'self.__next_f.push\(\[1,"(.*?)"\]\)', h, re.S)).encode('latin1', 'ignore').decode('unicode_escape', 'ignore')
def prompt(slug):
    r = rsc(al('https://prompt-motion.com/' + slug)); t = [r[m.end():m.end() + int(m.group(2), 16)] for m in re.finditer(r'([0-9a-f]+):T([0-9a-f]+),', r)]
    t += re.findall(r'"prompt":"(.*?)","translation"', r, re.S)
    t = [x for x in t if not x.lstrip().startswith(('{', '[', '<div', '<!', '<span', '<p '))]
    return max(t, key=len) if t else '(prompt bulunamadı: skill olabilir, sayfaya bakın)'
d = json.load(open(DZ)); k = sys.argv[1] if len(sys.argv) > 1 else 'ara'
if k == 'ara':
    q = [w.lower() for w in sys.argv[2:]]
    for o in sorted(d, key=lambda o: -sum((w in ' '.join([o['ad'], *o['etiket'], *o['teknik']]).lower()) for w in q))[:12]:
        if not q or any(w in ' '.join([o['ad'], *o['etiket'], *o['teknik']]).lower() for w in q): print(f"{o['url']}  | {o['ad']} | {','.join(o['etiket'])} | {','.join(o['teknik'])}")
elif k == 'oku': print(prompt(sys.argv[2].rstrip('/').split('/')[-1]))
elif k == 'yenile':
    s = rsc(al('https://prompt-motion.com/')); var = {o['url'] for o in d}; yeni = 0
    for slug, ad in dict.fromkeys(re.findall(r'"url":"https://prompt-motion.com/([^"]+)","name":"([^"]+)"', s)):
        u = 'https://prompt-motion.com/' + slug
        if u in var: continue
        p = prompt(slug).lower(); d.append({'ad': ad, 'url': u, 'etiket': [], 'yapan': '', 'tur': 'Prompt', 'teknik': [v for kk, v in {'mask': 'maske', 'squash': 'squash/stretch', 'spring': 'yay', 'cursor': 'imleç', 'morph': 'morf', 'kinetic': 'kinetik yazı', 'chart': 'grafik', 'phone': 'telefon', 'particle': 'parçacık', 'handwrit': 'el yazısı'}.items() if kk in p], 'kur': [], 'uzunluk': len(p)}); yeni += 1
    json.dump(d, open(DZ, 'w'), ensure_ascii=False, indent=0); print('yeni giriş:', yeni, '| toplam:', len(d))

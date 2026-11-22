# Dosya maskotu: animasyonlu karakter

Referans: `referans.png`. Karakter tamamen kodla çizilmiş bir vektör rig. Ses verildiğinde konuşur, mimik ve hareket yapar.

| Dosya | Ne işe yarar |
|---|---|
| `scripts/dosya/dosya.js` | Karakter rigi ve animasyon motoru: mimikler, ağız şekilleri, kol/bacak hareketleri, göz kırpma, nefes alma, yürüme, zıplama |
| `scripts/dosya/dudak.py` | Türkçe dudak senkronu: `python3 dudak.py ses.wav "metin"` komutu ağız şekli zamanlamasını JSON olarak verir |
| `scripts/dosya/render.js` | Zaman çizelgesinden 720x1280 MP4 üretir (başlık ve kelime vurgulu altyazı dahil) |
| `scripts/dosya/demo.js` | Örnek video (espeak-ng sesiyle) → `demo.mp4` |
| `scripts/dosya/galeri.js` | Tüm mimik, hareket ve ağız şekilleri → `galeri.html`, `galeri.png`, `svg/` |

**Mimikler:** notr, mutlu, bitkin, saskin, kizgin, dusunceli, korkmus, emin, uzgun
**Hareketler:** bekle, selam, anlat, isaret, yukari, omuz, basparmak, belde, dusun, eller_yukari, dur
**Ağız şekilleri:** X (sessiz), P (m b p), K (ünsüzler), A, E, I, O, U, F (f v), L

Kurulum: `apt-get install espeak-ng` (yalnızca demo sesi için gerekli). Ayrıca Python 3 + numpy, ffmpeg, Node + Playwright.

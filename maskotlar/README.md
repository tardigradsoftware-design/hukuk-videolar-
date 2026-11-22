# Hukuk Maskotları

## ✅ ANA MASKOT: `ana/`

Kullanıcının verdiği referans görsel (`ana/referans.png`) birebir vektöre çevrildi.
- `ana/01-ana.svg`: referansın birebir vektör kopyası, arka planı şeffaf
- `ana/02…10`: ifade ve poz seti (konuşuyor, göz kırpma, mutlu, şaşkın, anlatıyor, düşünüyor, ciddi, üzgün, göz kırpan)
- Katmanlar: `shadow`, `legs`, `handle`, `arm-l`, `arm-r`, `head`, `cheeks`, `brows`, `eyes`, `mouth`
- Yeniden üretmek için: `node scripts/ana-maskot.js` (videoda kullanmak için `mascot({...})` fonksiyonunu dışa aktarır)

---
## Arşiv (önceki denemeler)
20 maskot adayı. Hepsini `galeri.html` dosyasında ya da `galeri.png` görselinde topluca görebilirsin.

- `svg/` klasöründe her maskot ayrı bir SVG dosyası (400x400). Gözler `id="eyes"` grubunda, ağız `id="mouth"` olarak duruyor. Video aşamasında göz kırpma ve konuşma animasyonu bu parçalara eklenecek.
- Yeniden üretmek için: `node scripts/maskotlar.js`

## Tokmak Tosun (seçilen maskot)

`tokmak/` klasöründe 6 varyasyon (T01–T06) var. Hepsini `tokmak/galeri.png` görselinde görebilirsin.
Yeniden üretmek için: `node scripts/tokmak.js`

## Tokmak Tosun: ana maskot ve poz seti

`tosun/` klasöründe ana maskotun 6 pozu (P01–P06) var: Merhaba, Anlatıyor, Düşünüyor, Şaşkın, Dikkat, Onaylıyor.
Her SVG katmanlara ayrılmış durumda: `head`, `body`, `legs`, `arm-l`, `arm-r`, `brows`, `eyes`, `mouth`, `cheeks`. Video aşamasında bu katmanlar ayrı ayrı oynatılacak.
Yeniden üretmek için: `node scripts/tosun.js`

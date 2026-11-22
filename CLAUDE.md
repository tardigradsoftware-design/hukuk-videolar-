# Proje kuralları (hukuk videoları)

## İletişim
- Türkçe, **kısa ve öz** yaz. Uzun açıklama, tablo yığını, gereksiz özet yok.
- Gereksiz araç çağrısı/çıktı yok; ama kod ve video kalitesinden ödün verme.

## Onay gerektirenler
- Maskotun görünümünü (kıyafet, aksesuar, renk) **onaysız değiştirme**. Varsayılan: kostümsüz Dosya.
- Yeni bir görsel/ses kararını varsayılan yapmadan önce sor.

## Girdiler
- Senaryo: Drive `seneryolar/SeneryolarOnaylı.csv` → `veri/senaryolar.csv`
- Sesler: Drive `SesDosyalari/shorts`, `SesDosyalari/uzun` → `veri/ses_ham/VID_XXX_short.mp3` / `VID_XXX_uzun.mp3` (ad sonundaki "(1)" vb. yok sayılır)
- Sesi kullanmadan önce metinle karşılaştır (süre/hece oranı); kesik veya yanlışsa kullanıcıya söyle.
- İçerik doğrulaması istenmiyor.

## Ses
- Kısa: tamamı **1.40x**. Uzun: hook (ilk "Birinci/İlk adım" cümlesine kadar) **1.40x**, sonrası **1.25x**. Ton korunur, -14 LUFS.
- **Fon müziği yok.**
- Efektler duyulur ama konuşmayı bastırmaz (konuşma ortalamasının ~3–5 dB altı). Klavye sesi yumuşak.

## Görsel
- Örnek kanal stili: noktalı açık zemin, siyah+kırmızı kalın başlık, kalın kontur kartlar, kelime vurgulu altyazı.
- **İlerleme çubuğu yok.** Uzun videoda 1–5 adım göstergesi var.
- Dosyadan nesne çıkarma videoda 1–3 kez, kilit anlarda: `firlat: true` (fırlar) veya `firlat: 'el'` (elle çeker).
- Uzun videolarda portal ekranları (imleç, daktilo, tıklama) temsilidir; resmi logo yok, "TEMSİLİ GÖRÜNTÜ" etiketi kalır, kişisel veri/tutar "•••".
- Yorum çağrısı: anahtar kelime ("PARA yaz") + soru CTA'sı.

## Çıktı
- Kısa: 720x1280; uzun: 1920x1080; 30 fps, x264 crf 24 animation.
- `videolar/kisa|uzun/VID_XXX - <başlık>.mp4` → commit + push (branch `ccr-bb0f8884-p7q4dx`).
- Drive'a yükleme yapılamıyor (bağlantı limiti ~3 MB); kullanıcı GitHub'dan indirir.
- `veri/`, `tts/` repoya girmez. Render bitmeden mp4 commit etme.

## Üretim (token tasarruflu)
```
node scripts/video/planla.js VID_XXX kisa|uzun     # otomatik plan → planlar/ (sahne, portal, ikon, damga, mimik, fırlatma)
# yalnızca başlıkları (baslik) elle iyileştir; gerekirse küçük düzeltme
node scripts/video/uret.js VID_XXX kisa|uzun       # render (+ tema: ID'ye göre bg/başlık/geçiş/altyazı)
```
- Her videoyu bir kontrol görseliyle (tile) gözden geçir; uzun okumalar yapma.
- Yayın temposu: YouTube günde 1 shorts + 1 uzun; diğer platformlar günde 1 shorts.
- Para kazanma uyumu (YouTube "özgün olmayan içerik"): her video farklı plan+tema, özgün senaryo; şablon kopyası video üretme.
- Plan öğeleri: edevlet, liste, damga, ikon, nesne (tokmak/belge/kitap), rozet, ok, yorum, adim, arama, portal, soru.
- Mimik: notr, mutlu, bitkin, saskin, kizgin, dusunceli, korkmus, emin, uzgun. Jest: bekle, selam, anlat, isaret, yukari, omuz, basparmak, belde, dusun, eller_yukari, dur.

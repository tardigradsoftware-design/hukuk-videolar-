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
- Kısa: tamamı **1.25x**. Uzun: hook (ilk "Birinci/İlk adım" cümlesine kadar) **1.25x**, sonrası **1.00x**. Ton korunur, -14 LUFS.
- **Fon müziği yok.**
- Efektler duyulur ama konuşmayı bastırmaz (konuşma ortalamasının ~3–5 dB altı). Klavye sesi yumuşak.

## Görsel
- Örnek kanal stili: noktalı açık zemin, siyah+kırmızı kalın başlık, kalın kontur kartlar, kelime vurgulu altyazı.
- **İlerleme çubuğu yok.** Uzun videoda 1–5 adım göstergesi var.
- Dosyadan nesne çıkarma videoda 1–3 kez, kilit anlarda: `firlat: true` (fırlar) veya `firlat: 'el'` (elle çeker).
- Uzun videolarda portal ekranları (imleç, daktilo, tıklama) temsilidir; resmi logo yok, "TEMSİLİ GÖRÜNTÜ" etiketi kalır, kişisel veri/tutar "•••".
- Yorum çağrısı: anahtar kelime ("PARA yaz") + soru CTA'sı.

- **Emoji yok** (Noto/Windows/Fluent çocuksu duruyor; domuz ikonu asla). İkonlar: Phosphor duotone (`scripts/video/ikonlar.js`, MIT), renkli karo içinde.
- Kart girişleri yüksek tempolu (~0,25 sn, yaylı); video asla durgun olmamalı (kamera sürekli hareketli).

## Çıktı
- Kısa: 720x1280; uzun: 1920x1080; 30 fps, x264 crf 24 animation.
- `videolar/kisa|uzun/VID_XXX - <başlık>.mp4` → commit + push (branch `ccr-bb0f8884-p7q4dx`).
- Drive'a yükleme yapılamıyor (bağlantı limiti ~3 MB); kullanıcı GitHub'dan indirir.
- `veri/`, `tts/` repoya girmez. Render bitmeden mp4 commit etme.

## Üretim (token tasarruflu)
```
node scripts/video/planla.js VID_XXX kisa|uzun     # otomatik plan → planlar/ (sahne, portal, ikon, damga, mimik, fırlatma)
# kısa: yalnızca başlıkları (baslik.js) iyileştir
# UZUN: otomatik plan taslaktır; metindeki HER somut detay ekranda karşılık bulmalı (elle zenginleştir)
node scripts/video/uret.js VID_XXX kisa|uzun       # render (+ tema: ID'ye göre bg/başlık/geçiş/altyazı)
```
- Her render otomatik KONTROL raporu + `kontrol/<ID>.jpg` (2 fps) üretir; sorun varsa düzelt, yoksa geç.
- **Varsayılan stil: v3 (`STIL.md`)**. Eski stiller: `--stil=klasik`, `--stil=yapaytu`.
- Altyazı: anlamlı 2–3 kelimelik parçalar (≤18 karakter), titremesiz, konuşulan kelime siyah kutu; stil videodan videoya değişmez.
- Yayın temposu: YouTube günde 1 shorts + 1 uzun; diğer platformlar günde 1 shorts.
- Her video yanında aynı adla `.txt`: başlık, açıklama, bölümler (uzun), etiketler, hashtagler. Render etmeden: `uret.js ... --sadece-meta`.
- Kapak (uzun): kod tabanlı, 3 varyant (A koyu, B sarı, C açık) → `videolar/uzun/kapak/`. Metin: `kapak_yaz.js VID_XXX 'YAZI|VURGU|NESNE' x3` (3–4 kelime, merak boşluğu, başlığı tekrar etme, abartılı vaat yok), sonra `kapak.js VID_XXX`. YouTube'da "Test et ve karşılaştır" ile 3'ü birden yüklenir.
- Para kazanma uyumu (YouTube "özgün olmayan içerik"): her video farklı plan+tema, özgün senaryo; şablon kopyası video üretme.
- Uzun video önceliği: gerçek fayda > efekt. Platform adımları (e-Devlet, mobil uygulama, e-posta, şikâyet kanalları) temsili ekranla; koşullar `karsilastir`, gerekenler `kontrol` (söylendikçe ✓), başvuru metni `eposta` (alanlar söylendikçe dolar).
- Daktilo en fazla 1,2 sn sürer, söylendiği an başlar; önemli detayı geciktirmez. Damga yalnızca gerçek uyarıda, videoda en fazla 2.
- Plan öğeleri: edevlet, liste, damga, ikon, nesne (tokmak/belge/kitap), rozet, ok, yorum, adim, arama, portal (cihaz:'telefon', uygulama, ekran türleri: giris/arama/tablo/form/menu), not, kontrol, karsilastir, eposta, soru.
- Mimik: notr, mutlu, bitkin, saskin, kizgin, dusunceli, korkmus, emin, uzgun. Jest: bekle, selam, anlat, isaret, yukari, omuz, basparmak, belde, dusun, eller_yukari, dur.

## Yaratıcı serbestlik (kullanıcı isteği)
- Tek kalıp yok. Sabit olanlar: ses kuralları, fon müziği yok, kostümsüz maskot, çözünürlük, ilerleme çubuğu yok, altyazı stili, para kazanma uyumu.
- Geri kalan her şey (sahne düzeni, telefon/masaüstü ekranı, bileşen seçimi, efekt, nesne, kapak kurgusu) senaryoya göre serbestçe seçilir; amaç o konuyu en iyi anlatan, akılda kalan video.
- Sayı sınırları (damga ≤2, fırlatma 1–3, daktilo ≤1,2 sn) kalite içindir; gerekçeyle esnetilebilir.

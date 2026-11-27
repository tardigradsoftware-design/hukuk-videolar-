# Hareket Kütüphanesi (evrensel)

Kaynak: [prompt-motion.com](https://prompt-motion.com). Sitedeki 244 girişin 214'ünden prompt ve skill okundu, buradaki kurallar onlardan damıtıldı. Promptlar ve videolar kendi yaratıcılarına aittir; tam metinleri buraya kopyalanmadı. Hangi videoda hangi tekniğin kullanıldığı (dizin, etiket, yapan) `kutuphane/prompt_motion_dizin.json` dosyasında.

Kod karşılıkları `scripts/video/hareket.js` dosyasında. Bu dosyadaki kurallar her video için başlangıç noktasıdır. Senaryoya göre bir stil seçilir; aynı kalıp tekrarlanmaz.

## 1. Değişmez yasalar (neredeyse tüm iyi promptlarda ortak)
1. **Her kare zamanın saf fonksiyonudur.** Her şey `seek(t)` / `frame(t)` içinde t'den hesaplanır. CSS animasyonu, zamanlayıcı, kareler arası durum, `Math.random` ve `Date` kullanılmaz; tohumlu rastgelelik kullanılır.
2. **Ölü an yok.** Her vuruşta bir şey olur; 0,5–1 sn'den uzun donma olmaz. Tek istisna: doruktan önceki kasıtlı tek duraklama.
3. **Sahnede tek fikir, tek kahraman.** Bir geçişte tek ana hareket olur. Kamera da aynı anda tek hamle yapar.
4. **Kesme yerine dönüşüm.** Her sahne bir öncekinden doğar: düğme sayfaya, nokta daireye, kelime arayüze, renk lekesi sonraki sahneye dönüşür.
5. **Çapraz solma yasak.** Yerine maske, morf, renk taşması, eşleşen kesme, kamçı + bulanıklık ya da vuruşa sert kesme kullanılır.
6. **Kamera hiç durmaz.** Her çekim zaten hareketle başlar: "kalan yolun %12–19'u / kare" üstel yavaşlama. Çıkış hızlanarak ya da bulanıklıkla olur. Art arda zum-içeri/zum-dışarı yapılmaz, yön tersine çevrilmez.
7. **Bulanıklık hızı takip eder.** Hızlı harekette yön ve hızla orantılı bulanıklık (hareket bulanıklığı) olur; durunca netleşir.
8. **Uydurma veri yok.** Yalnızca senaryodaki rakam ve iddialar kullanılır. Ekranda animasyon jargonu ("easing", "stagger") yazmaz.
9. **Arayüz süsü yok.** Zaman kodu, fps, ilerleme çubuğu, sahte başlık şeridi, filigran konmaz.
10. **Şablon gibi duran her şey yasak.**

## 2. Sık yasaklananlar (kalite filtresi)
Çapraz solma, bulanık giriş, rastgele parçacık patlaması, her yerde parlama ve neon, lens parlaması, kamera sarsıntısı ve RGB ayrışması (yalnızca bilinçli tek vuruşta), genel gradyan, aşırı zıplayan easing, 3B çevirme kartı, stok arayüz kiti, arayüz yazısında glow, 1 sn'den uzun bekleme, bağlantısız geçiş.

## 3. Zamanlama
- **Tempo ızgarası:** 120–130 BPM (vuruş 0,46–0,5 sn), "her vuruşta bir şey".
  - Bizde müzik yok; ızgara konuşmanın kelime zamanlarıdır. Her yeni fikir bir cümleciğe oturur, ~1,2–1,6 sn.
- **Giriş:** 0,25–0,35 sn, yaylı (küçük aşma). **Çıkış:** 0,15–0,2 sn, hızlanan.
- **Harf/kelime sırası:** 18–30 ms arayla (stagger), çıkışta ters sıra.
- **Kamera hamlesi:** sahne başına bir, yavaş itme 1,5–3 sn. Hızlı kamçı geçiş 0,2–0,35 sn.
- **Yaylar (spring):** kapalı formda yazılır. Hedefi birden çok kez değişen bir değer, her değişim için ayrı bir yayın toplamıdır; böylece hâlâ t'nin saf fonksiyonu olur.
- **Önden giden kenar:** toggle düğmesi, sekme göstergesi gibi öğelerde iki kenar ayrı yaylarla hareket eder; ön kenar arkadakinden önce uzar.

## 4. Fizik ve canlılık (Disney ilkeleri)
- **Squash/stretch:** düşerken dikey uzar, çarpınca yassılaşır (sy .75, sx 1.2), sonra küçük sekme ve gecikmeli takip (follow-through).
- **Smear / onion skin:** hızlı çıkışta hareket yönünde %80–90 uzama ve bulanıklık; arkada 1–2 soluk iz.
- **Overlap:** bir öğe bitmeden sonraki başlar; parçalar farklı gecikmeyle durur.
- **Anticipation:** büyük hareketten önce küçük ters hareket (geri çekilme).
- **Etkileşim:** çarpılan şey hareket eder, yaklaşılan şey aydınlanır. Hareketler yay ya da basit fizikle, asla doğrusal değil.

## 5. Geçiş kataloğu
| Ad | Nasıl | Ne zaman |
|---|---|---|
| maske çizgisi | yazı görünmez bir çizginin altından yükselir | başlık, satır |
| renk taşması | bir nesneden renk dairesi tüm kareyi kaplar, sonra başka nesneye büzülür | açık↔koyu geçiş, bölüm değişimi |
| iris | 6 kanat kapanır ve sonraki görüntüye açılır | vurgu anı |
| eşleşen kesme | son öğe sonraki sahnedeki aynı şekle dönüşür (karo → kart) | sahne bağlama |
| kamçı + bulanıklık | yön bulanıklığıyla hızlı kaydırma | enerji yükseltme |
| bulanık geçiş | yalnızca içerik değişirken kısa bulanıklık; kapsayıcı sabit morf eder | aynı öğede durum değişimi |
| genişleme | düğme sayfaya, hap metin kutusuna büyür | arayüz akışı |
| akordeon | kelime kendi noktasına sıkışır, nokta hap olur | logo/kelime dönüşümü |
| harf karışımı | tohumlu karıştırma, vuruşta yerine oturur | sayı, kod, başlık |
| yarım ton | nokta alanı genişler, siyaha döner, sonraki kartı açar | final |

## 6. Tipografi
- En fazla 2–3 yazı ailesi: **gösteri** (Anton/Archivo Black, sıkı aralık), **arayüz** (Geist/Inter), **mono** (küçük etiketler). İsteğe bağlı vurgu: el yazısı (Caveat, kalemle çizilir) ya da italik serif kuyruk.
- Cümlede tek vurgu kelimesi (renkli); satırda 2–7 kelime.
- Kinetik yazı kelime kelime girer. Yazı mimari rol alabilir: kelime kolon, kiriş, zemin olur.
- Satır uzunluğuna göre otomatik sığdırma; ekran dışına taşma yok.

## 7. Renk ve ışık
- Palet: zemin + mürekkep + 1 vurgu (+1 ikincil), en fazla 3 renk ve siyah-beyaz.
- Açık kâğıt zemin (#F2EEE6 / #F5F5F2) ya da koyu kömür (#1B1A19). Sert açık/koyu geçiş dramatik vuruştur.
- Derinlik: geniş yumuşak gölge, ince odak (önü net, arka hafif bulanık), hafif film greni ve vinyet.
- Cam (liquid glass): yalnızca kontrol öğelerinde: buzlu arka plan, ince kenar ışığı.

## 8. İmleç ve arayüz
- Gerçek imleç her değişimi sürer: kayar, hedefe döner, üstüne gelince büyür, tıklayınca küçülür ve dalga yayar. Tıklama bir sonraki vuruşu ateşler.
- Ekran-stüdyosu zumu: kamera o an olanı kareye doldurur; imleç de kamerayla ölçeklenir.
- Daktilo doğal tuş ritmiyle yazar; gönderme bir dalga ve dönüşüm başlatır.
- Arayüz gerçek ölçüde olur: telefon 428×900 ekran, 11 px çerçeve, 9:41 durum çubuğu.

## 9. Ses
- Her görsel vuruşta bir ses (pop, kalem çiziği, whoosh, tık, alt-darbe). Görsel olmayan yerde sessizlik.
- Efekt dosyanın başına göre değil, ölçülen tepe noktası olaya denk gelecek şekilde yerleştirilir.
- Master -14 LUFS, -2 dBTP; AAC kodlamadan sonra yeniden ölçülür.
- Bizim kanalda fon müziği yok. Efektler konuşmanın ~3–5 dB altında, sesin bastırılmadan duyulduğu seviyede.

## 10. Yapım ve kalite kontrol
1. Önce konsept tek cümle, sonra vuruş vuruş storyboard.
2. Tam render'dan önce her vuruştan bir kare alınıp bakılır: kalabalık, çakışma, okunmazlık, ritim dışı öğe varsa düzeltilir.
3. Gerçek hareket bulanıklığı: her karede t−1/240, t, t+1/240 anlarında 3 alt kare alınır ve ffmpeg `tmix` ile karıştırılır. Bizde: `uret.js ... --blur`.
4. Döngü isteniyorsa son kare ilk kareyle eşleşir.
5. Render sonrası kontrol: taşma, çakışma, okunurluk, ses senkronu, loudness.

## 11. Dikey (9:16) uyarlama notları
- Güvenli alan: üst %10 ve alt %20 platform arayüzüne gider. Kahraman öğe y 150–860, altyazı ~900.
- Dev yazı ekran genişliğinin %90'ına kadar sığdırılır; satırlar 1–2 kelime.
- Kamera hamleleri daha kısa ve sık olur (kısa video temposu).

## 12. Stil reçeteleri (senaryoya göre seç)
- **Kâğıt kinetik (v5):** kâğıt zemin, el yazısı notlar, dev Anton, fizik, sert koyu geçiş. Uyarı ve hak anlatımına uygun.
- **Keynote cam:** beyaz-mavi, buzlu cam kontroller, imleç güdümlü arayüz akışı. Uygulama ve e-Devlet adımları için.
- **Tek şekil morf:** bir şekil bütün durumları gezer (düğme → toggle → grafik → bildirim). Süreç anlatımı için.
- **Tek top / tek nokta:** bir nesne bütün sahneleri bağlar. Kısa ve ritmik anlatım için.
- **Mimari tipografi:** kelimeler yapı taşı olur. Güçlü tek mesaj, manifesto için.
- **Gazete/editoryal:** serif + grotesk, kâğıt, cetvel çizgileri. Kanun ve süre anlatımı için.
- **3B kart koridoru / sayfa uçuşu:** sayfa zeminde yatar, kamera üstünden uçar. Uzun video açılışı için.

## Kullanılabilir hazır skill'ler (siteden)
- `npx skills add Leonxlnx/cinetic` — sinematik yönetmen
- `npx skills add MengTo/Skills --skill html-demo` — tek saatli canlı HTML ürün demosu
- `npx skills add heygen-com/hyperframes-community-skills --skill session-story`
- `Leonxlnx/taste-skill` — tasarım zevki

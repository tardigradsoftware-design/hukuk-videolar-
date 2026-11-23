# Hak Dosyası video stili (v3)

Somut kurallar. Her sahne buna uyar. (`--stil=v3`)

## Zemin ve kartlar
- Zemin açık kâğıt (#F4F4F2), üstünde hafif nokta deseni (#D2D2D2, 26 px aralık).
- Kart beyaz, 6 px siyah kontur (#151515), 24 px köşe.
- Gölge bulanık değil: 10 px sağ alta kaydırılmış düz siyah.

## Renk
- Ana vurgu kırmızı (#E8402F). **Bir sahnede tek bir şey kırmızı:** başlığın ikinci satırı. (Damga anlık istisna.)
- Altyazıda konuşulan kelime siyah kutu, beyaz yazı.
- İkincil etiket sarı (#F6B92B), yazısı siyah. Yeşil (#1E9E6A) yalnızca onay/başarı.
- Gri (#8B8E95) yalnızca ikincil bilgi.

## Yazı
- Başlık ve etiketler: Inter Display 900, sıkı harf aralığı (-0.02em), büyük harf.
- Portal/arama yazıları: JetBrains Mono.
- Altyazı alt-ortada, iki kelime iki kelime, konuşulan kelime vurgulu.

## Hareket
- Kartlar yaylı girer (spring); hiçbir şey düz kaymaz.
- Önemli kelimede damga düşer + hafif ekran sarsıntısı.
- Sahne geçişi: içe dalış (zoom + bulanıklık), 7 kare.
- Ekranda 2 saniyeden uzun hareketsiz bir şey kalmaz (kartlar hafifçe süzülür).
- Her öğe, ilgili kelime söylendiği karede çıkar.

## Karakter
- Dosya maskotu kısa videoda sağ altta, uzun videoda sağda. Görünümü onaysız değişmez.
- Ağız sese göre açılıp kapanır; her sahnede poz/mimik değiştirir.
- Videoda 1–3 kez dosyadan nesne çıkarır (fırlatma veya elle çekme).

## Ses
- Seslendirmeye kesim ya da boşluk eklenmez (yalnızca hız: kısa 1.25x; uzun hook 1.25x, sonrası 1.00x).
- Fon müziği yok.
- Efektler duyulur ama konuşmanın ~3–5 dB altında.

## Kontrol (her render sonrası, otomatik)
- Saniyede 2 kare kontrol görseli.
- Ekrandan taşan öğe, altyazıyla çakışan öğe, birbirine binen kart → rapor.
- Konuşma içinde 0,25 sn'den uzun sessizlik → rapor.

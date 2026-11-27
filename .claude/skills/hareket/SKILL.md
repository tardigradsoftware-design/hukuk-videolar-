---
name: hareket
description: Hukuk videoları için evrensel hareket/motion kütüphanesi (prompt-motion.com'daki 214 prompttan damıtıldı). Yeni video, yeni stil, sahne tasarımı, geçiş, kinetik yazı, fizik, kamera, ses senkronu veya kalite kontrol söz konusu olduğunda yükle.
---
# Hareket kütüphanesi

1. Önce `kutuphane/HAREKET.md` oku: değişmez yasalar, yasaklar, zamanlama, fizik, geçiş kataloğu, tipografi, renk, ses, QA, 9:16 notları, stil reçeteleri.
2. Kod: `scripts/video/hareket.js` (tarayıcıya gömülür → `window.H`): `eo/ei/expo/backOut/kalanYol`, `yay/yaylar` (kapalı form yay), `dus` (squash'lı düşüş), `harfGiris`, `smear`, `daire/alt/ok/tik/carpi` + `ciz` (keçeli kalem), `tasma` (renk taşması geçişi), `daktilo`, `gren`, `kamera`, `tohum/nz`.
3. Örnek uygulama: `scripts/video/sayfa_v5.js` + `planlar/VID_002_kisa_v5.js` (kâğıt kinetik, maskotsuz). Çalıştır: `node scripts/video/uret.js VID_XXX kisa --stil=v5 [--blur]`.
4. Belirli bir stile benzer örnek ararken: `kutuphane/prompt_motion_dizin.json` (ad, url, etiket, teknikler) → ilgili sayfayı prompt-motion.com'dan oku (ağ izni var).
5. Proje kuralları (CLAUDE.md) her zaman önce gelir: ses hızları, fon müziği yok, emoji yok, altyazı stili, para kazanma uyumu.

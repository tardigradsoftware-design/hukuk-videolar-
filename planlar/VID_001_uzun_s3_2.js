// VID_001 uzun — Stil 2 sistem şeması (genel motor: sahne/sema.js) + Stil 4 vurguları (dev koyu ekran, büyük damga).
// Metin: veri/tts_v2/VID_001_uzun.txt (473 kelime). Rakamlar yalnız metinden: 5 adım, 3 kaynak, 10 yıl, 5–15 iş günü. Kişisel veri/tutar •••.
const PEMBE = '#FF9AD5', MAVI = '#BFE3FF', SARI = '#F7D14C', YESIL = '#A8F08C', GRI = '#E4E1DA', SOMON = '#FFB3A7';
const ADLAR = ['SGK ödemeleri', 'BES birikimi', 'Banka hesabı', 'IBAN bağla', 'B planı'];
const URL = 'https://www.turkiye.gov.tr', SITE = 'e-Devlet Kapısı';
const s3 = [
  { tur: 'c_genel', sinif: 'c2', a: 0, basliklar: [[0, 'DURUM', 'ADINA BEKLEYEN ÖDEME OLABİLİR'], [11, 'RİSK', 'ÇEKİLMEZSE DEVLETE GEÇER'], [20, 'KURAL', 'YILDA EN AZ 1 KEZ KONTROL']], ogeler: [
    { t: 'kart', x: 140, y: 330, w: 280, h: 190, renk: PEMBE, eti: 'KULLANICI', yazi: 'SEN', k: 0 },
    { t: 'cizgi', d: 'M420 425 L640 425', ok: 1, k: 1 },
    { t: 'kart', x: 640, y: 260, w: 560, h: 330, renk: MAVI, eti: 'E-DEVLET · TEMSİLİ', yazi: 'ADINA BEKLEYEN', boy: 48, k: [0, .2], alt: [['Ödeme', '••• TL', 8], ['Ödeme', '••• TL', [8, .2]], ['Ödeme', '••• TL', [8, .4]]] },
    { t: 'damga', x: 700, y: 610, yazi: 'HABERİN YOK', renk: SOMON, k: 5 },
    { t: 'cizgi', id: 'c2', d: 'M1200 425 L1400 425', ok: 1, k: 15 },
    { t: 'damga', x: 1120, y: 230, yazi: 'ZAMANAŞIMI', renk: SOMON, rot: 6, k: 15, sars: 1 },
    { t: 'kart', x: 1400, y: 330, w: 300, h: 200, renk: GRI, eti: 'DEVLET', yazi: 'HAZİNE', boy: 52, k: 17, giris: 'x' },
    { t: 'akis', yol: 'c2', yazi: '₺ •••', renk: SOMON, k: 17, sure: 1, kal: 1 },
    { t: 'ikon', ad: 'takvim', x: 180, y: 640, boy: 170, renk: SARI, k: 20 },
    { t: 'not', x: 400, y: 680, w: 760, eti: 'KURAL', metin: 'Yılda', vurgu: 'en az bir kez', son: ' kontrol et.', vurguK: 21, k: 20 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 28, basliklar: [[28, 'PLAN', '5 NET ADIMDA HESABINA'], [44, 'TUZAK', 'ÇOĞU KİŞİ İLK EKRANDA DURUR'], [61, 'ÇÖZÜM', '3 KAYNAK · TEK SEFER · IBAN']], ogeler: [
    { t: 'kart', x: 140, y: 240, w: 520, h: 200, renk: YESIL, eti: 'HEDEF', yazi: 'UNUTULAN ALACAKLAR → HESABINA', boy: 46, k: 29, cik: 40 },
    { t: 'adimlar', x: 140, y: 520, adlar: ADLAR, k: 40, cik: 47 },
    { t: 'kart', x: 140, y: 260, w: 520, h: 300, renk: MAVI, eti: 'İLK EKRAN', yazi: 'SADECE BURAYA BAKIP ÇIKIYOR', boy: 46, k: 47, cik: 61 },
    { t: 'kart', x: 760, y: 260, w: 600, h: 300, renk: GRI, eti: 'ASIL BÜYÜK PARA', yazi: 'BİRİKİMLER + BANKA HESAPLARI', boy: 46, k: 53, cik: 61, durum: [[59, { soluk: 1 }]] },
    { t: 'damga', x: 820, y: 560, yazi: 'GÖZDEN KAÇIYOR', renk: SOMON, k: 59, cik: 61, sars: 1 },
    { t: 'kart', x: 140, y: 230, w: 330, h: 150, renk: PEMBE, eti: 'KAYNAK 1', yazi: 'SGK', k: 62 },
    { t: 'kart', x: 140, y: 430, w: 330, h: 150, renk: SARI, eti: 'KAYNAK 2', yazi: 'BES', k: [62, .15] },
    { t: 'kart', x: 140, y: 630, w: 330, h: 150, renk: MAVI, eti: 'KAYNAK 3', yazi: 'BANKA', k: [62, .3] },
    { t: 'damga', x: 560, y: 230, yazi: 'TEK SEFERDE', renk: SARI, k: 65 },
    { t: 'cizgi', id: 'g1', d: 'M470 305 C 800 305, 900 500, 1180 520', ok: 1, k: 68 },
    { t: 'cizgi', id: 'g2', d: 'M470 505 C 800 505, 900 520, 1180 520', ok: 1, k: [68, .15] },
    { t: 'cizgi', id: 'g3', d: 'M470 705 C 800 705, 900 540, 1180 520', ok: 1, k: [68, .3] },
    { t: 'kart', x: 1180, y: 420, w: 380, h: 200, renk: YESIL, eti: 'DOĞRUDAN', yazi: 'IBAN’IN', k: 72, sars: 1 },
    { t: 'akis', yol: 'g1', yazi: '₺', k: 72, sure: .9 }, { t: 'akis', yol: 'g2', yazi: '₺', k: [72, .2], sure: .9 }, { t: 'akis', yol: 'g3', yazi: '₺', k: [72, .4], sure: .9 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 76, adim: 1, adimAd: 'SGK ŞAHIS ÖDEMELERİ', basliklar: [[76, 'ADIM 1', 'SGK ŞAHIS ÖDEMELERİ'], [83, 'GİRİŞ', 'E-DEVLET’E GİRİŞ YAP'], [95, 'ARA', '“ŞAHIS ÖDEMELERİ SORGULAMA”'], [109, 'TABLO', 'TUTAR · TARİH · DURUM']], ogeler: [
    { t: 'panel', x: 140, y: 200, w: 1060, h: 690, url: URL, site: SITE, k: 76, ekranlar: [
      { k: 76, tur: 'giris', baslik: 'Giriş', alanlar: [['T.C. KİMLİK NO', '•••••••••••', 88], ['ŞİFRE', '••••••••', 92]], buton: { yazi: 'Giriş yap', k: 93 } },
      { k: 95, tur: 'arama', metin: 'Şahıs Ödemeleri Sorgulama', aramaK: 96, oneriler: [['Şahıs Ödemeleri Sorgulama', 'Sosyal Güvenlik Kurumu'], ['Şahıs Ödemeleri Banka Hesabı Tanımlama', 'Sosyal Güvenlik Kurumu']], sec: 0, secK: 107 },
      { k: 109, tur: 'tablo', baslik: 'Şahıs ödemelerim', kolonlar: ['Ödeme türü', 'Tutar', 'Tarih', 'Durum'], durum: 1, hl: [0, 125], satirlar: [
        [['Rapor parası', '••• TL', '••.••.••••', 'Bekliyor'], 111], [['Emzirme ödeneği', '••• TL', '••.••.••••', 'Bekliyor'], 113], [['Yol gideri', '••• TL', '••.••.••••', 'Bekliyor'], 115], [['Cenaze yardımı', '••• TL', '••.••.••••', 'Bekliyor'], 117], [['Fazla prim iadesi', '••• TL', '••.••.••••', 'Bekliyor'], 120]] }] },
    { t: 'kart', x: 1260, y: 220, w: 300, h: 140, renk: SARI, eti: 'GİRİŞ', yazi: 'WEB / MOBİL', boy: 42, k: 83, cik: 95 },
    { t: 'ikon', ad: 'telefon', x: 1320, y: 420, boy: 170, renk: '#fff', k: 85, cik: 95 },
    { t: 'liste', x: 1260, y: 260, w: 300, baslik: 'KONTROL ET', maddeler: [['Tutar', 129], ['Tarih', 130], ['Durum', 132]], k: 109 },
    { t: 'damga', x: 1240, y: 600, yazi: 'KURUŞU KURUŞUNA', renk: YESIL, k: 133, sars: 1 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 136, adim: 2, adimAd: 'BES BİRİKİMLERİ', basliklar: [[136, 'ADIM 2', 'ESKİ İŞYERİ BES BİRİKİMLERİ'], [146, 'ARA', 'BES · DEVLET KATKISI VE BİRİKİM'], [163, 'EKRAN', 'TAKASBANK'], [181, 'ÇEK', 'ÇIKIŞ YA DA BİRLEŞTİRME → IBAN']], ogeler: [
    { t: 'panel', x: 140, y: 200, w: 980, h: 690, url: URL, site: SITE, k: 136, cik: 195, ekranlar: [
      { k: 136, tur: 'arama', metin: 'Bireysel Emeklilik ve Otomatik Katılım… Birikim Sorgulama', aramaK: 147, oneriler: [['BES ve OKS Devlet Katkısı ve Birikim Sorgulama', 'Takasbank']], sec: 0, secK: 163 },
      { k: 165, tur: 'tablo', baslik: 'Birikimlerim', kolonlar: ['Şirket', 'Sistem', 'Birikim', 'Durum'], durum: 1, hl: [0, 177], satirlar: [[['••• Emeklilik', 'Otomatik BES', '••• TL', 'Unutulmuş'], 173], [['••• Emeklilik', 'Otomatik BES', '••• TL', 'Unutulmuş'], [174, .3]]] }] },
    { t: 'kart', x: 1180, y: 210, w: 380, h: 150, renk: PEMBE, eti: 'GEÇMİŞ', yazi: 'ESKİ İŞYERİ', boy: 46, k: 166, cik: 195 },
    { t: 'cizgi', d: 'M1370 362 L1370 440', ok: 1, k: 171, cik: 195 },
    { t: 'kart', x: 1180, y: 440, w: 380, h: 150, renk: SARI, eti: 'KESİP UNUTTUĞUN', yazi: 'OTOMATİK BES', boy: 46, k: 173, cik: 195 },
    { t: 'cizgi', id: 'b2', d: 'M1370 592 L1370 670', ok: 1, k: 181, cik: 195 },
    { t: 'damga', x: 1120, y: 600, yazi: 'ÇIKIŞ', renk: MAVI, rot: -8, k: 186, cik: 195 },
    { t: 'damga', x: 1330, y: 600, yazi: 'BİRLEŞTİR', renk: MAVI, rot: 6, k: 189, cik: 195 },
    { t: 'kart', x: 1180, y: 680, w: 380, h: 130, renk: YESIL, eti: 'HEDEF', yazi: 'IBAN’IN', boy: 50, k: 193, cik: 195, sars: 1 },
    { t: 'dev', ust: 'ÇOĞU KİŞİ DİYOR Kİ', cizik: '“Benim adıma ne para kalmış ki?”', cizikK: 210, alt: 'Yıllar önceki işyerlerinden kalan küçük kesintiler birikerek', vurgu: 'binlerce liraya ulaşabiliyor.', altK: 211, k: 195, cik: 222 },
    { t: 'yigin', x: 140, y: 860, n: 12, k: 214, bitK: 219, z: 21, cik: 222 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 222, adim: 3, adimAd: 'ZAMANAŞIMI HESAPLAR', basliklar: [[222, 'ŞİMDİ', 'EN ÇOK UNUTULAN EKRAN'], [231, 'ADIM 3', 'ZAMANAŞIMINA UĞRAYAN HESAPLAR'], [239, 'ARA', 'MEVDUAT VE KATILIM FONU ZAMANAŞIMI'], [248, 'KURAL', 'SON 10 YIL İŞLEM YOKSA'], [267, 'SÜRE', 'HAZİRAN AYINDAN ÖNCE ŞUBEYE'], [277, 'SORU', 'SENİN TARAMANDA NE ÇIKTI?']], ogeler: [
    { t: 'panel', x: 140, y: 200, w: 1000, h: 690, url: URL, site: SITE, k: 226, cik: 277, ekranlar: [
      { k: 226, tur: 'arama', metin: 'Mevduat ve Katılım Fonu Zamanaşımı Sorgulama', aramaK: 240, oneriler: [['Mevduat ve Katılım Fonu Zamanaşımı Sorgulama', '']], sec: 0, secK: 247 },
      { k: 252, tur: 'tablo', baslik: 'Zamanaşımına uğrayan hesaplar', kolonlar: ['Banka', 'Şube', 'Hesap', 'Tutar'], hl: [0, 263], satirlar: [[['••• Bankası', '••• Şubesi', 'Maaş hesabı', '••• TL'], 255], [['••• Bankası', '••• Şubesi', 'Öğrenci hesabı', '••• TL'], 258]] }] },
    { t: 'zaman', x: 1200, y: 250, w: 360, n: 10, a: 0, b: 10, adim: 5, yazi: '10 YIL', birim: 'İŞLEM YOK', k: 248, dolK: 249, cik: 277 },
    { t: 'damga', x: 1210, y: 420, yazi: 'ZAMANAŞIMI', renk: SOMON, k: 252, cik: 277, sars: 1 },
    { t: 'kart', x: 1200, y: 520, w: 360, h: 150, renk: PEMBE, eti: 'SON TARİH', yazi: 'HAZİRAN’DAN ÖNCE', boy: 40, k: 267, cik: 277 },
    { t: 'ikon', ad: 'kimlik', x: 1200, y: 710, boy: 130, renk: SARI, k: 270, cik: 277 },
    { t: 'ikon', ad: 'banka', x: 1380, y: 710, boy: 130, renk: MAVI, k: 272, cik: 277 },
    { t: 'yorum', x: 260, y: 280, kelime: 'SGK / BES', soru: 'Beklemediğin bir bakiye çıktıysa aşağıya yaz.', k: 278, cik: 300 },
    { t: 'ikon', ad: 'buyutec', x: 1240, y: 240, boy: 200, renk: SARI, k: 280, cik: 300 },
    { t: 'not', x: 260, y: 560, w: 1000, eti: 'NEDEN?', metin: 'Herkes kontrol etmenin', vurgu: 'ne kadar kritik', son: ' olduğunu görsün.', vurguK: 296, k: 292, cik: 300 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 300, adim: 4, adimAd: 'IBAN TANIMLA', basliklar: [[300, 'ADIM 4', 'ÖDEMELERİ HESABINA BAĞLA'], [309, 'ARA', 'BANKA HESABI TANIMLAMA'], [317, 'FORM', 'YENİ HESAP EKLE'], [332, 'SONUÇ', 'PTT SIRASI YOK'], [343, 'ÖZET', 'KRİTİK NOKTALAR TEK KARTTA'], [378, 'HATIRLAT', 'BU REHBERİ KAYBETME']], ogeler: [
    { t: 'panel', x: 140, y: 200, w: 1000, h: 690, url: URL, site: SITE, k: 300, cik: 343, ekranlar: [
      { k: 300, tur: 'arama', metin: 'Şahıs Ödemeleri Banka Hesabı Tanımlama', aramaK: 311, oneriler: [['Şahıs Ödemeleri Banka Hesabı Tanımlama', 'Sosyal Güvenlik Kurumu']], sec: 0, secK: 316 },
      { k: 317, tur: 'form', baslik: 'Banka hesabı tanımlama', ust: { yazi: '+ Yeni hesap ekle', k: 319 }, alanlar: [['HESAP TÜRÜ', 'Vadesiz · TL', 326], ['IBAN', 'TR•• •••• •••• •••• •••• •••• ••', 328]], buton: { yazi: 'Kaydet', k: 331 }, sonuc: { yazi: 'Hesap kaydedildi', k: [331, .4] } }] },
    { t: 'liste', x: 1200, y: 220, w: 360, baslik: 'IBAN KURALI', maddeler: [['Kendi adına', 323], ['Vadesiz', 326], ['TL', 327]], k: 320, cik: 343 },
    { t: 'kart', x: 1200, y: 540, w: 360, h: 130, renk: GRI, eti: 'ESKİ YOL', yazi: 'PTT SIRASI', boy: 46, k: 333, cik: 343, durum: [[336, { soluk: 1 }]] },
    { t: 'damga', x: 1240, y: 610, yazi: 'BEKLEMEDEN', renk: SARI, k: 336, cik: 343, sars: 1 },
    { t: 'kart', x: 1200, y: 710, w: 340, h: 110, renk: YESIL, eti: 'YENİ YOL', yazi: 'HESABINA', boy: 46, k: 340, cik: 343 },
    { t: 'liste', x: 200, y: 230, w: 1100, baslik: 'YILLIK KONTROL KARTI', hepsi: 1, maddeler: [['SGK · Şahıs Ödemeleri Sorgulama', 361], ['Takasbank · BES ve Devlet Katkısı Birikim', 362], ['Mevduat ve Katılım Fonu Zamanaşımı', 363], ['Şahıs Ödemeleri Banka Hesabı Tanımlama', 366]], k: 348, cik: 378 },
    { t: 'ikon', ad: 'telefon', x: 1360, y: 260, boy: 200, renk: SARI, k: 369, cik: 378 },
    { t: 'damga', x: 640, y: 700, yazi: 'EKRAN GÖRÜNTÜSÜ AL', renk: SARI, k: 369, cik: 378, sars: 1 },
    { t: 'not', x: 260, y: 260, w: 1000, eti: 'NEDEN?', metin: 'Hak kaybı yaşadığın an bu rehberi', vurgu: 'tekrar aramak zorunda kalma.', vurguK: 384, k: 378, cik: 392 },
    { t: 'abone', x: 260, y: 520, yazi: 'Şimdi abone ol', ek: 'hak rehberleri elinin altında', k: 389, cik: 392 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 392, adim: 5, adimAd: 'B PLANI', basliklar: [[392, 'SORU', 'PTT’YE AKTARILDI / İADE EDİLDİ?'], [408, 'ADIM 5', 'B PLANI'], [421, 'PTT', 'NÜFUS CÜZDANIYLA ŞUBEYE'], [427, 'SGK', 'SGK MERKEZİNE DİLEKÇE'], [438, 'SÜREÇ', '5–15 İŞ GÜNÜ İÇİNDE HESABINDA']], ogeler: [
    { t: 'kart', x: 140, y: 230, w: 560, h: 300, renk: MAVI, eti: 'ÖDEME DURUMU · TEMSİLİ', yazi: 'GÖRÜNÜYOR AMA…', boy: 46, k: 393, cik: 438, alt: [['PTT’ye aktarıldı', '!', 397], ['Kuruma iade edildi', '!', 401]] },
    { t: 'damga', x: 170, y: 580, yazi: 'PARAN KAYBOLMADI', renk: YESIL, k: 405, cik: 438, sars: 1 },
    { t: 'cizgi', d: 'M700 330 C 820 330, 860 270, 960 270', ok: 1, k: 421, cik: 438 },
    { t: 'kart', x: 960, y: 200, w: 420, h: 150, renk: PEMBE, eti: 'PTT’YE AKTARILDIYSA', yazi: 'PTT ŞUBESİ', boy: 46, k: 421, cik: 438 },
    { t: 'ikon', ad: 'kimlik', x: 1410, y: 200, boy: 140, renk: '#fff', k: 422, cik: 438 },
    { t: 'cizgi', d: 'M700 430 C 820 430, 860 520, 960 520', ok: 1, k: 427, cik: 438 },
    { t: 'kart', x: 960, y: 450, w: 420, h: 150, renk: SARI, eti: 'KURUMA DÖNDÜYSE', yazi: 'SGK MERKEZİ', boy: 46, k: 428, cik: 438 },
    { t: 'ikon', ad: 'belge', x: 1410, y: 450, boy: 140, renk: '#fff', k: 433, cik: 438 },
    { t: 'zaman', x: 220, y: 420, w: 1260, n: 15, a: 5, b: 15, adim: 5, yazi: '5–15 İŞ GÜNÜ', birim: 'İŞ GÜNÜ', etiketler: [[0, 'IBAN TANIMLANDI'], [15, 'HESABINDA']], k: 441, dolK: 450, cik: 460 },
    { t: 'damga', x: 220, y: 680, yazi: 'GENELLİKLE', renk: SARI, k: 449, cik: 460 },
    { t: 'ikon', ad: 'cuzdan', x: 1300, y: 640, boy: 150, renk: YESIL, k: 456, cik: 460 },
  ] },
  { tur: 'c_genel', sinif: 'c2', gir: 'kay', a: 460, basliklar: [[460, 'SON', 'TEK KURUŞUNU SİSTEMDE BIRAKMA']], ogeler: [
    { t: 'adimlar', x: 140, y: 260, adlar: ADLAR, k: 460, tamam: [[460, .5], [460, .7], [460, .9], [460, 1.1], [460, 1.3]] },
    { t: 'abone', x: 300, y: 520, yazi: 'Abone ol', ek: 'yeni hak rehberleri için', k: 467 },
  ] },
];
// ses efektleri öğelerden türetilir (fon müziği yok; seviyeyi miks.py ayarlar)
const SES = { kart: 'thud', damga: 'thud', akis: 'swish', cizgi: 'swish', panel: 'whoosh', dev: 'whoosh', abone: 'ding', yorum: 'pop', ikon: 'pop', not: 'kagit', adimlar: 'pop', zaman: 'swish', liste: 'pop', yigin: 'pop' };
const sesler = [];
s3.forEach(sc => { sesler.push([sc.a, 'whoosh']); sc.ogeler.forEach(o => { const k = Array.isArray(o.k) ? o.k : [o.k, 0]; if (SES[o.t] && k[0] > sc.a) sesler.push([k[0], SES[o.t], undefined, k[1]]);
  (o.maddeler || []).forEach(([m, mk]) => sesler.push([mk, 'tik']));
  (o.ekranlar || []).forEach(e => { if (e.aramaK) sesler.push([e.aramaK, 'key']); if (e.secK) sesler.push([e.secK, 'click']); (e.alanlar || []).forEach(a => sesler.push([a[2], 'key'])); if (e.buton) sesler.push([e.buton.k, 'click']); if (e.ust) sesler.push([e.ust.k, 'click']); if (e.sonuc) sesler.push([e.sonuc.k[0], 'ding', undefined, .4]); }); }); });
module.exports = { maskot: true, dil: 2, adimPos: [70, 1006], s3, sesler: sesler.map(([k, tip, v, dt]) => [k, tip, v, dt || 0]),
  sahneler: [
    { k: 0, baslik: ['UNUTULMUŞ ALACAKLAR', 'E-DEVLET 5 ADIM'], mimik: [[0, 'dusunceli', 'anlat'], [15, 'korkmus', 'eller_yukari'], [20, 'emin', 'isaret'], [44, 'saskin', 'omuz'], [62, 'mutlu', 'anlat']] },
    { k: 76, baslik: ['1. ADIM', 'SGK ŞAHIS ÖDEMELERİ'], adim: 1, mimik: [[76, 'emin', 'isaret'], [109, 'mutlu', 'basparmak']] },
    { k: 136, baslik: ['2. ADIM', 'BES BİRİKİMLERİ'], adim: 2, mimik: [[136, 'dusunceli', 'anlat'], [195, 'kizgin', 'dur'], [216, 'saskin', 'eller_yukari']] },
    { k: 222, baslik: ['3. ADIM', 'ZAMANAŞIMI HESAPLAR'], adim: 3, mimik: [[222, 'emin', 'isaret'], [267, 'korkmus', 'dur'], [277, 'mutlu', 'selam']] },
    { k: 300, baslik: ['4. ADIM', 'IBAN TANIMLA'], adim: 4, mimik: [[300, 'emin', 'anlat'], [331, 'mutlu', 'basparmak'], [389, 'mutlu', 'selam']] },
    { k: 392, baslik: ['5. ADIM', 'B PLANI'], adim: 5, mimik: [[392, 'saskin', 'omuz'], [408, 'emin', 'isaret'], [441, 'mutlu', 'basparmak']] },
    { k: 460, baslik: ['SON', 'ABONE OL'], mimik: [[460, 'mutlu', 'selam']] },
  ] };

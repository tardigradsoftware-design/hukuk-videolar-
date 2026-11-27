// VID_003 uzun (v2 metin) — v5 yatay: solda ekran/çizim/grafik, sağda dev yazı, üstte adım göstergesi. Maskotsuz.
// Kelime indeksleri: veri/tts_v2/VID_003_uzun.txt (491 kelime). Rakamlar yalnızca metinden: 30 gün, %100, 15 iş günü, 2–4 ay, 6502.
module.exports = {
  sahneler: [
    { k: 0, baslik: ['HAYAT SİGORTASI', 'PARAN BANKADA KALMASIN'] },
    { k: 61, baslik: ['1. ADIM', '30 GÜN CAYMA'] },
    { k: 111, baslik: ['2. ADIM', 'POLİÇEYİ BUL'] },
    { k: 186, baslik: ['3. ADIM', 'YAZILI BAŞVURU'] },
    { k: 273, baslik: ['4. ADIM', 'FAİZ BLÖFÜ'] },
    { k: 387, baslik: ['5. ADIM', 'B PLANI'] },
  ],
  vuruslar: [
    // HOOK (1.25x)
    { k: 0, tip: 'gazete', ust: 'KREDİ DOSYASI', baslik: 'Tüketici Kredisi', satirlar: [['Kredi', '••• TL'], ['Dosya masrafı', '••• TL'], ['Hayat sigortası', '••• TL']], alt: [1, 5, 10], hl: 2, hlK: 11, satir: ['HAYAT', 'SİGORTASI'], vurgu: 'SİGORTASI' },
    { k: 14, tip: 'dev', satir: ['BANKADA', 'BIRAKMA'], vurgu: 'BIRAKMA', ikon: 'banka' },
    { k: 17, tip: 'dev', satir: ['ZORUNLU', 'DEĞİL'], vurgu: 'DEĞİL', carpi: 'ZORUNLU', carpiK: 25, ikon: 'terazi' },
    { k: 28, tip: 'dev', satir: ['ŞUBEYE', 'GİTMEDEN'], vurgu: 'GİTMEDEN', ikon: 'telefon' },
    { k: 38, tip: 'dev', tam: true, satir: ['5 NET', 'ADIM'], vurgu: 'ADIM' },
    { k: 43, tip: 'karisim', ust: 'BANKALARIN ÇOĞU', yazi: 'FAİZ BLÖFÜ', koyu: true },
    { k: 52, tip: 'not', tam: true, yazi: 'dördüncü adımda göstereceğim…', koyu: true, cizgi: 'alt' },
    // 1. ADIM
    { k: 61, adim: 1, adimAd: '30 GÜN CAYMA HAKKI', tip: 'grafik', comp: 'Sayac', props: { deger: 30, birim: 'GÜN', ust: 'CAYMA HAKKI' }, satir: ['30 GÜN', 'CAYMA HAKKI'], vurgu: 'HAKKI' },
    { k: 83, adim: 1, tip: 'grafik', comp: 'Sayac', props: { deger: 100, birim: '% İADE', ust: 'İLK 30 GÜN' }, satir: ['TEK KURUŞ', 'KESİNTİ YOK'], vurgu: 'YOK' },
    { k: 95, adim: 1, tip: 'dev', satir: ['GEÇTİYSEN DE', 'KALAN İADE'], vurgu: 'İADE', ikon: 'takvim' },
    // 2. ADIM
    { k: 111, adim: 2, adimAd: 'POLİÇEYİ BUL', tip: 'telefon', cihaz: 'pc', url: 'turkiye.gov.tr', satir: ['POLİÇENİ', 'BUL'], vurgu: 'BUL', ekranlar: [
      { k: 119, baslik: 'e-Devlet Kapısı', arama: 'Hayat Sigortası Poliçe Sorgulama', aramaK: 121, satirlar: ['Hayat Sigortası Poliçe Sorgulama · SBM', 'Kasko Poliçe Sorgulama'], hedef: 0 },
      { k: 136, baslik: 'Poliçelerim', satirlar: ['Kredi hayat sigortası · Aktif', 'Konut sigortası · Pasif'], hedef: 0 },
      { k: 140, baslik: 'Poliçe detayı', satirlar: ['Poliçe no  •••', 'Başlangıç  ••.••.••••', 'Şirket  •••'] } ] },
    { k: 151, adim: 2, tip: 'dev', satir: ['"KREDİ ŞARTI"', 'DERSE'], vurgu: 'DERSE', ikon: 'mesaj' },
    { k: 161, adim: 2, tip: 'not', yazi: '6502 sayılı kanun: zorunlu değil', ikon: 'terazi', cizgi: 'alt' },
    { k: 172, adim: 2, tip: 'dev', satir: ['YAZILI', 'TALEP ET'], vurgu: 'TALEP', ikon: 'imza' },
    // 3. ADIM
    { k: 186, adim: 3, adimAd: 'YAZILI BAŞVURU', tip: 'dev', satir: ['BANKAYI ARAMA', 'YAZILI YAZ'], vurgu: 'YAZ', carpi: 'ARAMA', carpiK: 196, ikon: 'telefon' },
    { k: 200, adim: 3, tip: 'telefon', satir: ['POLİÇE', 'İŞLEMLERİ'], vurgu: 'İŞLEMLERİ', ekranlar: [
      { k: 200, baslik: 'Sigortam', satirlar: ['Poliçe İşlemleri', 'Hasar bildirimi', 'Müşteri hizmetleri'], hedef: 0 },
      { k: 206, baslik: 'Poliçe İşlemleri', satirlar: ['Poliçe iptal talebi', 'Poliçe belgesi indir'], hedef: 0 },
      { k: 213, basarili: 'İptal talep formu', alt: 'ya da müşteri hizmetleri e-postası' } ] },
    { k: 218, adim: 3, tip: 'eposta', kime: 'musterihizmetleri@•••.com.tr', konu: 'Poliçe iptali ve prim iadesi talebi',
      satirlar: ['T.C. kimlik no: •••', 'Poliçe no: •••', '30 gün cayma / erken iptal hakkım kapsamında poliçemin iptalini', 've prim bedelinin adıma kayıtlı IBAN: TR•• hesabıma iadesini talep ederim.'],
      alt: [218, 219, 219, 222, 226, 236], satir: ['METNE', 'BUNLARI YAZ'], vurgu: 'YAZ' },
    { k: 248, adim: 3, tip: 'yorum', satir: ['BANKAN', 'NE DEDİ?'], vurgu: 'DEDİ?', yaz: 'Faiz artar dediler', yazK: 262 },
    // 4. ADIM
    { k: 273, adim: 4, adimAd: 'FAİZ BLÖFÜ', tip: 'dev', satir: ['"FAİZ ARTAR"', 'BLÖFÜ'], vurgu: 'BLÖFÜ', ikon: 'megafon', koyu: true },
    { k: 289, adim: 4, tip: 'dev', satir: ['SÖZLEŞMENİ', 'KONTROL ET'], vurgu: 'KONTROL', ikon: 'belge' },
    { k: 293, adim: 4, tip: 'gazete', ust: 'KREDİ SÖZLEŞMESİ', baslik: 'Faiz oranı', satirlar: [['Sigortalı faiz', '%•••'], ['Sigortasız faiz', 'yazmıyor']], alt: [294, 295], hl: 1, hlK: 298, satir: ['YAZMIYORSA', 'DEĞİŞTİREMEZ'], vurgu: 'DEĞİŞTİREMEZ' },
    { k: 301, adim: 4, tip: 'dev', satir: ['DIŞARIDAN', 'UCUZ POLİÇE'], vurgu: 'UCUZ', ikon: 'kalkan' },
    { k: 321, adim: 4, tip: 'not', yazi: 'dain-i mürtehin şerhiyle bankaya sun', ikon: 'banka', cizgi: 'alt' },
    { k: 326, adim: 4, tip: 'kontrol', baslik: 'KREDİ SİGORTASI İADE · ÖZET', maddeler: ['İlk 30 gün: primin %100’ü iade', '30 gün sonrası: kalan günler iade', 'Poliçe no: e-Devlet › SBM', 'Yazılı başvuru: uygulama / e-posta', 'Faiz farkı yazmıyorsa faiz değişmez'], alt: [336, 339, 342, 346, 352], satir: ['EKRAN', 'GÖRÜNTÜSÜ AL'], vurgu: 'AL' },
    { k: 357, adim: 4, tip: 'abone', yazi: 'Abone ol', ek: 'hak kaybetme, rehberi kaçırma' },
    // 5. ADIM
    { k: 372, adim: 4, tip: 'dev', satir: ['15 İŞ GÜNÜNDE', 'ÖDEMEZSE?'], vurgu: 'ÖDEMEZSE?', ikon: 'saat' },
    { k: 387, adim: 5, adimAd: 'B PLANI', tip: 'dev', tam: true, satir: ['B', 'PLANI'], vurgu: 'PLANI' },
    { k: 408, adim: 5, tip: 'telefon', cihaz: 'pc', url: 'turkiye.gov.tr', satir: ['BDDK', 'E-ŞİKAYET'], vurgu: 'E-ŞİKAYET', ekranlar: [
      { k: 408, baslik: 'e-Devlet Kapısı', arama: 'BDDK e-Şikayet', aramaK: 409, satirlar: ['BDDK e-Şikayet Başvurusu', 'Tüketici Hakem Heyeti Başvurusu'], hedef: 0 },
      { k: 412, basarili: 'Şikayetin alındı', alt: 'Başvuru no •••' } ] },
    { k: 414, adim: 5, tip: 'telefon', cihaz: 'pc', url: 'sigortatahkim.org', satir: ['TAHKİME', 'BAŞVUR'], vurgu: 'BAŞVUR', ekranlar: [
      { k: 414, baslik: 'Sigorta Tahkim Komisyonu', satirlar: ['Online başvuru', 'Başvuru sorgulama'], hedef: 0 },
      { k: 419, basarili: 'Başvurun kaydedildi', alt: 'Bağlayıcı karar süreci başladı' } ] },
    { k: 424, adim: 5, tip: 'grafik', comp: 'Zaman', props: { adimlar: [{ ust: '0', alt: 'yazılı başvuru' }, { ust: '15', alt: 'iş günü: iade' }, { ust: '2–4', alt: 'ay: tahkim kararı' }], vurgu: 1 }, top: 260, satir: ['SÜREÇ', 'TAKVİMİ'], vurgu: 'TAKVİMİ' },
    // KAPANIŞ
    { k: 453, tip: 'dev', satir: ['PARAN', 'BANKADA KALMADI'], vurgu: 'KALMADI', ikon: 'tik' },
    { k: 459, tip: 'dev', satir: ['BES VE SGK', 'PARAN BEKLİYOR'], vurgu: 'BEKLİYOR', ikon: 'cuzdan' },
    { k: 477, tip: 'not', tam: true, yazi: 'sıradaki videoya geç', cizgi: 'ok' },
  ],
  son: { uzat: 6 },
};

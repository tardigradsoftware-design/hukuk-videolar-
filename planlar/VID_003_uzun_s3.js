// VID_003 uzun — STİL 3 sahne motoru (DistilBook ruhu). Kelime indeksleri: veri/tts_v2/VID_003_uzun.txt.
// Rakamlar yalnız metinden (30 gün, %100). Şimdilik hook + 1. adım.
module.exports = {
  maskot: true,
  sahneler: [
    { k: 0, baslik: ['HAYAT SİGORTASI', 'PARAN BANKADA KALMASIN'], mimik: [[0, 'dusunceli', 'anlat'], [13, 'saskin', 'isaret'], [17, 'emin', 'basparmak'], [52, 'kizgin', 'dur'], [57, 'dusunceli', 'dusun']] },
    { k: 61, baslik: ['1. ADIM', '30 GÜN CAYMA'], adim: 1, mimik: [[61, 'emin', 'anlat'], [90, 'mutlu', 'eller_yukari'], [95, 'dusunceli', 'isaret'], [109, 'mutlu', 'basparmak']] },
  ],
  sesler: [[0, 'whoosh'], [1, 'pop'], [2, 'pop'], [4, 'pop'], [7, 'thud'], [10, 'swish'], [13, 'whoosh'], [15, 'boing'], [17, 'kagit'], [25, 'swish'], [28, 'whoosh'], [29, 'tik'], [38, 'pop'], [52, 'ding'], [55, 'swish'], [57, 'thud'],
    [61, 'whoosh'], [69, 'tik'], [72, 'tik'], [74, 'swish'], [80, 'tik'], [83, 'tik'], [90, 'ding'], [95, 'whoosh'], [100, 'swish']],
  s3: [
    { tur: 'acilis', a: 0, baslik: 'Kredi çekerken kesilen o sigorta', haplar: [['ihtiyaç', 1], ['taşıt', 2], ['konut', 4]], kartK: 7, hlK: 10,
      kart: { ust: 'TEMSİLİ · KREDİ ÖDEME PLANI', baslik: 'Kredi kesintileri', satirlar: [['Kredi tutarı', '••• TL'], ['Dosya masrafı', '••• TL'], ['Hayat sigortası primi', '••• TL'], ['Hesaba geçen', '••• TL']], hl: 2 } },
    { tur: 'banka', a: 13, cip: 'Hayat sigortası primi', cikK: 15, soz: 'bırakmak zorunda değilsin' },
    { tur: 'kitap', a: 17, ust: 'SİGORTACILIK MEVZUATI', madde: 'TEMSİLİ · KREDİ HAYAT SİGORTASI', metin: 'Kredi hayat sigortası, yasal olarak', vurgu: 'zorunlu değildir', vurguK: 25 },
    { tur: 'yol', a: 28, baslik: 'Şubeye gitmeden, 5 net adım', subeK: 28, cizK: 29, durakK: 38, vurguD: 3, duraklar: ['30 gün', 'Poliçeyi bul', 'Yazılı başvuru', 'Faiz blöfü', 'B planı'], vurguK: 52, faizK: 55, blofK: 57 },
    { tur: 'cayma', a: 61, adim: 1, adimAd: '30 GÜN CAYMA HAKKI', ust: '1. ADIM · CAYMA HAKKI', baslik: ['30 gün', 'cayma hakkı'],
      halkaK: 74, halkaBitK: 79, liste: [[69, 'Krediyi çektin'], [72, 'Poliçe kesildi → 1. gün'], [80, '30 gün içinde iptal başvurusu'], [83, 'Tek kuruş kesinti yok']],
      yuzK: 90, vadeK: 95, kalanK: 100 },
  ],
};

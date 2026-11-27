// VID_003 uzun — STİL 3 sahne motoru (DistilBook ruhu). Kelime indeksleri: veri/tts_v2/VID_003_uzun.txt.
// Rakamlar yalnız metinden (30 gün, %100). Şimdilik hook + 1. adım.
const DEVAM = require('./VID_003_uzun_devam.js'), SESLER = require('./_ses.js');
module.exports = {
  maskot: true,
  sahneler: [
    { k: 0, baslik: ['HAYAT SİGORTASI', 'PARAN BANKADA KALMASIN'], mimik: [[0, 'dusunceli', 'anlat'], [13, 'saskin', 'isaret'], [17, 'emin', 'basparmak'], [52, 'kizgin', 'dur'], [57, 'dusunceli', 'dusun']] },
    { k: 61, baslik: ['1. ADIM', '30 GÜN CAYMA'], adim: 1, mimik: [[61, 'emin', 'anlat'], [90, 'mutlu', 'eller_yukari'], [95, 'dusunceli', 'isaret'], [109, 'mutlu', 'basparmak']] },
    { k: 111, baslik: ['2. ADIM', 'POLİÇEYİ BUL'], adim: 2, mimik: [[111, 'emin', 'isaret'], [151, 'kizgin', 'dur'], [165, 'emin', 'basparmak']] },
    { k: 186, baslik: ['3. ADIM', 'YAZILI BAŞVURU'], adim: 3, mimik: [[186, 'dusunceli', 'anlat'], [194, 'kizgin', 'dur'], [218, 'emin', 'isaret'], [248, 'saskin', 'omuz']] },
    { k: 273, baslik: ['4. ADIM', 'FAİZ BLÖFÜ'], adim: 4, mimik: [[273, 'kizgin', 'dur'], [298, 'emin', 'basparmak'], [326, 'dusunceli', 'anlat'], [369, 'mutlu', 'selam']] },
    { k: 387, baslik: ['5. ADIM', 'B PLANI'], adim: 5, mimik: [[372, 'saskin', 'omuz'], [387, 'emin', 'isaret'], [424, 'dusunceli', 'anlat'], [453, 'mutlu', 'basparmak'], [487, 'mutlu', 'selam']] },
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
    ...DEVAM.k3,
  ],
};
module.exports.sesler = [...module.exports.sesler, ...SESLER(DEVAM.k3), [165, 'kagit'], [170, 'swish']];

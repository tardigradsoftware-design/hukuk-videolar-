// VID_003 uzun — sahne dili 2 (Pastel Brutal sistem şeması / Celld uyarlaması). İlk ~42 sn.
const base = require('./VID_003_uzun_s3.js');
module.exports = { maskot: true, dil: 2, sahneler: base.sahneler, adimPos: [1360, 40],
  sesler: [[0, 'thud'], [1, 'pop'], [2, 'pop'], [4, 'pop'], [7, 'thud'], [13, 'tik'], [15, 'thud'], [17, 'kagit'], [25, 'swish'], [28, 'pop'], [29, 'thud'], [30, 'swish'], [32, 'ding'], [38, 'pop'], [49, 'tik'], [52, 'boing'], [55, 'pop'], [57, 'thud'],
    [61, 'whoosh'], [69, 'thud'], [72, 'thud'], [74, 'swish'], [80, 'thud'], [83, 'thud'], [90, 'whoosh'], [91, 'ding'], [95, 'thud'], [100, 'swish']],
  s3: [
    { tur: 'c_sistem', sinif: 'c2', a: 0, turler: [['İHTİYAÇ', 1], ['TAŞIT', 2], ['KONUT', 4]], prim: 'Hayat sigortası primi',
      basliklar: [[0, 'DURUM', 'BUGÜN: KREDİ ÇEKİYORSUN'], [7, 'KESİNTİ', 'KESİLEN O SİGORTA'], [13, 'SORU', 'BANKADA MI KALMALI?'], [17, 'KURAL', 'YASAL OLARAK ZORUNLU DEĞİL'], [28, 'ÇÖZÜM', 'ŞUBEYE GİTMEDEN İPTAL'], [38, 'PLAN', '5 NET ADIM'], [49, 'TUZAK', 'BANKALARIN ÇOĞU BLÖF YAPAR']],
      dusK: 7, parlaK: 13, damga1: 'ZORUNDA DEĞİLSİN', damga1K: 15, sgK: 10, kural: ['Kredi hayat sigortası yasal olarak', 'zorunlu değildir.'], kuralK: 17, hlK: 25, kuralBitK: 28,
      sbK: 28, damga2: 'GEREK YOK', damga2K: 29, yolK: 30, yolEti: 'iptal → para geri', paraK: 32,
      adimlar: ['30 GÜN CAYMA', 'POLİÇEYİ BUL', 'YAZILI BAŞVURU', 'FAİZ BLÖFÜ', 'B PLANI'], adimK: 38, dikkatK: 52, sahte: 'FAİZİN ARTAR!', sahteK: 55, blof: 'BLÖF', blofK: 57 },
    { tur: 'c_zaman', sinif: 'c2', gir: 'kay', a: 61, adim: 1, adimAd: '30 GÜN CAYMA HAKKI',
      basliklar: [[61, 'ADIM 1', '30 GÜN CAYMA HAKKI'], [74, 'SÜRE', 'POLİÇE GÜNÜNDEN İTİBAREN 30 GÜN'], [90, 'SONUÇ', 'PRİMİN %100 GERİ'], [95, 'YA GEÇTİYSE?', 'VAZGEÇME: KALAN GÜNLER İADE']],
      aKart: ['KREDİ ÇEKİLDİ', 69], b: ['POLİÇE KESİLDİ · 1. GÜN', 72], c: ['İPTAL BAŞVURUSU', 0], cK: 80, damga: 'KESİNTİ YOK', damgaK: 83, dolK: 74, dolBitK: 79,
      yuzK: 90, iade: 'Ödediğin primin tamamı hesabına yatar.', iadeK: 92, gectiK: 95, gecti: '30 GÜN GEÇTİ', kalan: 'KALAN GÜNLER → İADE', kalanK: 100 },
  ] };

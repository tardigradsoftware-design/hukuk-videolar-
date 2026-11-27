// VID_003 uzun — sahne dili 4 (Ürün turu / DistilBook 2 uyarlaması). İlk ~42 sn.
const base = require('./VID_003_uzun_s3.js');
module.exports = { maskot: true, dil: 4, sahneler: base.sahneler, adimPos: [1480, 46],
  sesler: [[0, 'kagit'], [1, 'pop'], [2, 'pop'], [4, 'pop'], [7, 'thud'], [10, 'pop'], [13, 'whoosh'], [17, 'swish'], [20, 'key'], [25, 'thud'], [28, 'whoosh'], [29, 'swish'], [30, 'pop'], [38, 'pop'], [52, 'boing'], [55, 'pop'], [57, 'swish'],
    [61, 'whoosh'], [69, 'pop'], [72, 'pop'], [74, 'tik'], [80, 'pop'], [83, 'swish'], [90, 'whoosh'], [91, 'ding'], [95, 'whoosh'], [100, 'swish']],
  s3: [
    { tur: 'd_kagit', sinif: 'd4', a: 0, s1: 'Kredi çekerken', turler: [['ihtiyaç', 1], ['taşıt', 2], ['konut', 4]], s2: 'kesilen', s2hap: 'sigorta.', s2K: 7, kagit: 'SİGORTA', damga: 'KESİLDİ', damgaK: 10, dosya: 'kredi_sozlesmesi_SON_v3.pdf' },
    { tur: 'd_koyu', sinif: 'd4 koyu', koyu: true, gir: 'zoom', a: 13, satirlar: ['Kredi tutarı', 'Dosya masrafı', 'Hayat sigortası primi', 'Hesaba geçen'], hl: 2, yazi: ['Bankada bırakmak', 'zorunda değilsin.'] },
    { tur: 'd_urun', sinif: 'd4 lav', gir: 'daire', a: 17, sekmeler: [['Mevzuat', 17], ['Sonuç', 20], ['Onay', 25]], belge: 'SİGORTACILIK MEVZUATI',
      yazi: 'Kredi hayat sigortası yasal olarak zorunlu değildir.', vurgu: 'zorunlu değildir.', yazK: 20, damga: 'ZORUNLU DEĞİL ✓', damgaK: 25 },
    { tur: 'd_cizik', sinif: 'd4', gir: 'daire', a: 28, eski: 'Şubeye git.', cizK: 29, yeni: 'Online iptal et', yeniHap: 'paran geri', yeniK: 30,
      adimlar: ['30 gün cayma', 'Poliçeyi bul', 'Yazılı başvuru', 'Faiz blöfü', 'B planı'], adimK: 38, dikkatK: 52, sahte: 'faizin artar', sahteK: 55, blof: 'blöf.', blofK: 57 },
    { tur: 'd_takvim', sinif: 'd4 mavi', koyu: true, gir: 'daire', a: 61, adim: 1, adimAd: '30 GÜN CAYMA HAKKI', buyuk: '30 gün', kucuk: 'cayma hakkı · 1. adım', dolK: 74, dolBitK: 79,
      maddeler: [['Krediyi çektin', 69], ['Poliçe kesildi → 1. gün', 72], ['İptal başvurusu', 80], ['Kesinti', 83]], cizM: 3, cizW: 160, cizK: 85, yok: 'yok' },
    { tur: 'd_rakam', sinif: 'd4 gece', koyu: true, gir: 'zoom', a: 90, adim: 1, sayK: 90, iade: 'iade · hesabına', iadeK: 92, orb: [['tek kuruş kesintisiz', '#12A15E', 83], ['primin tamamı', '#7B5CFF', 90], ['hesabına', '#3D5AFE', 92]],
      ikiK: 95, v1: '30 günü geçtin mi?', v2: 'Vazgeçme.', kalan: 'KALAN GÜNLER → İADE', kalanK: 100 },
  ] };

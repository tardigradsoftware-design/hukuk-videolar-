// VID_003 uzun — sahne dili 1 (Mavi Ferah / BlueVisa uyarlaması). İlk ~42 sn. Rakamlar yalnız metinden.
const base = require('./VID_003_uzun_s3.js');
module.exports = { maskot: true, dil: 1, sahneler: base.sahneler, adimPos: [1480, 46],
  sesler: [[0, 'whoosh'], [1, 'tik'], [2, 'tik'], [4, 'tik'], [10, 'thud'], [13, 'whoosh'], [15, 'pop'], [17, 'swish'], [25, 'pop'], [28, 'whoosh'], [30, 'pop'], [32, 'pop'], [38, 'tik'], [38, 'tik', .4, .4], [52, 'ding'], [55, 'pop'], [57, 'thud'],
    [61, 'whoosh'], [69, 'pop'], [72, 'pop'], [74, 'swish'], [80, 'click'], [83, 'pop'], [90, 'whoosh'], [91, 'ding'], [95, 'whoosh'], [100, 'swish']],
  s3: [
    { tur: 'm_giris', sinif: 'm1', a: 0, lbl: 'KREDİ DOSYASI · TEMSİLİ', satir: [['Kredi', 0], ['çekerken', 6], ['kesilen', 7], ['sigorta.', 10, 1]],
      bilet: { ust: 'KREDİ SÖZLEŞMESİ' }, turler: [['İhtiyaç', 1], ['Taşıt', 2], ['Konut', 4]], damga: '+ HAYAT SİGORTASI', damgaK: 10 },
    { tur: 'm_mavi', sinif: 'm1 mavi', koyu: true, gir: 'daire', a: 13, gruplar: [{ a: 13, s: ['Bankada bırakmak', 'zorunda değilsin.'], pill: 'değilsin.', pillK: 15, son: 17 }, { a: 17, ust: 'SİGORTACILIK MEVZUATI', s: ['Yasal olarak', 'zorunlu değil.'], pill: 'değil.', pillK: 25 }] },
    { tur: 'm_hero', sinif: 'm1', gir: 'zoom', a: 28, ust: 'ŞUBEYE GİTMEDEN', satir: [['İptal', 30], ['et,', 30], ['paran', 32], ['geri.', 33, 1]], kahraman: 'telefon',
      sol: ['ŞUBE ZİYARETİ', 'Gişe sırası', 28, 29], sag: ['HESABINA', 'Para iadesi', 32],
      cipler: [[30, '1', 'İptal talebi', 'Online'], [32, '₺', 'Para iadesi', 'Hesaba'], [38, '1', '30 gün cayma', 'Adım', 1], [[38, .3], '2', 'Poliçeyi bul', 'Adım', 1], [[38, .6], '3', 'Yazılı başvuru', 'Adım', 1], [[38, .9], '4', 'Faiz blöfü', 'Adım', 1], [[38, 1.2], '5', 'B planı', 'Adım', 1], [49, '!', 'Bankaların çoğu', 'Uyarı', 0, 'kirmizi'], [52, '4', 'Faiz blöfü', '4. adım', 0, 'kirmizi'], [55, '%', 'Faiz artar mı?', 'BLÖF', 0, 'kirmizi']] },
    { tur: 'm_takvim', sinif: 'm1', gir: 'zoom', a: 61, adim: 1, adimAd: '30 GÜN CAYMA HAKKI', lbl: '1. ADIM', satir: [['30 gün', 63], ['cayma', 65], ['hakkı.', 66, 1]],
      dolK: 74, dolBitK: 79, birGun: '1. GÜN', birGunK: 72, tikK: 80,
      cipler: [[69, '1', 'Krediyi çektin', 'Tamam'], [72, '2', 'Poliçe kesildi', '1. gün'], [80, '3', 'İptal başvurusu', '30 gün içinde'], [83, '4', 'Kesinti', 'Yok']] },
    { tur: 'm_yuzde', sinif: 'm1', koyu: true, gir: 'daire', a: 90, adim: 1, sayK: 90, pill: 'iade', pillK: 92, alt: 'PRİMİN TAMAMI · HESABINA', ikiK: 95, satir2: [['30 günü', 95], ['geçtin', 97], ['mi?', 97], ['Vazgeçme.', 99, 1]], kalanK: 100 },
  ] };

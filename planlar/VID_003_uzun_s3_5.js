// VID_003 uzun — sahne dili 5 (Nokta matrisi editoryal / Flowdrive uyarlaması). İlk ~42 sn.
const base = require('./VID_003_uzun_s3.js');
module.exports = { maskot: true, dil: 5, sahneler: base.sahneler, adimPos: [1440, 92],
  sesler: [[0, 'swish'], [1, 'tik'], [2, 'tik'], [4, 'tik'], [7, 'swish'], [10, 'pop'], [13, 'whoosh'], [15, 'tik'], [17, 'swish'], [25, 'tik'], [28, 'whoosh'], [28, 'key', .4, .3], [30, 'click'], [32, 'tik'], [38, 'whoosh'], [52, 'ding'], [55, 'tik'], [57, 'thud'],
    [61, 'whoosh'], [69, 'tik'], [72, 'tik'], [74, 'swish'], [80, 'tik'], [83, 'tik'], [90, 'swish'], [91, 'ding'], [95, 'whoosh'], [100, 'swish']],
  s3: [
    { tur: 'f_dosya', sinif: 'f5', a: 0, s1: [['Kredi', 0], ['çektin.', 5, 1]], s2: [['Kesilen', 7], ['o', 8], ['sigorta.', 10, 1]], turler: [['İHTİYAÇ', 1], ['TAŞIT', 2], ['KONUT', 4]],
      dosya: 'kredi-sozlesmesi.pdf · temsili', prim: 'hayat sigortası primi', isaretK: 10, ayrK: 11 },
    { tur: 'f_koyu', sinif: 'f5 koyu', koyu: true, gir: 'perde', a: 13, katman: ['KREDİ', 'SİGORTA', 'MASRAF'], vurguL: 1, vurguK: 13, akisK: 15,
      gruplar: [{ a: 13, s1: [['Bankada', 13], ['bırakmak', 14]], s2: [['zorunda', 15], ['değilsin.', 16, 1]], son: 17 }, { a: 17, ust: 'SİGORTACILIK MEVZUATI', s1: [['Yasal', 23], ['olarak', 24]], s2: [['zorunlu', 25, 1], ['değil.', 26, 1]] }] },
    { tur: 'f_url', sinif: 'f5', gir: 'perde', a: 28, s1: [['Şubeye', 28], ['gitmeden.', 29, 1]], url: 'https://hizmet.•••/iptal-talebi', vurgu: 'iptal-talebi', kilitK: 30,
      ozellik: [['ONLINE İPTAL', 30], ['PARAN GERİ', 32], ['5 NET ADIM', 38]] },
    { tur: 'f_turuncu', sinif: 'f5 tur', koyu: true, gir: 'perde', a: 38, s1: [['Beş', 38], ['net', 39], ['adım.', 40, 1]], adimlar: ['30 GÜN', 'POLİÇE', 'BAŞVURU', 'FAİZ BLÖFÜ', 'B PLANI'], adimK: 40, dikkatK: 52, sahte: 'faiz artışı?', sahteK: 55, blof: 'blöf.', blofK: 57 },
    { tur: 'f_yukle', sinif: 'f5', gir: 'perde', a: 61, adim: 1, adimAd: '30 GÜN CAYMA HAKKI', s1: [['30', 63], ['gün', 64], ['cayma', 65, 1], ['hakkı.', 66, 1]], dolK: 74, dolBitK: 79,
      maddeler: [['KREDİ ÇEKİLDİ', 69], ['POLİÇE KESİLDİ → GÜN 1', 72], ['İPTAL BAŞVURUSU · 30 GÜN İÇİNDE', 80], ['KESİNTİ: YOK', 83]] },
    { tur: 'f_yuzde', sinif: 'f5', gir: 'perde', a: 90, adim: 1, s1: [['Prim', 90], ['iadesi.', 91, 1]], sayK: 90, alt: 'ÖDEDİĞİN PRİMİN TAMAMI → HESABINA', altK: 92,
      ikiK: 95, s2: [['30', 95], ['günü', 96], ['geçtiysen', 97], ['de', 98], ['vazgeçme.', 99, 1]], kalan: 'KALAN GÜNLER → GÜN BAZLI İADE', kalanK: 100 },
  ] };
